import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useSound } from '@/hooks/useSound';
import { useConfetti } from '@/hooks/useConfetti';
import { getGKTests, getGKTestById, getGKPForQuestion, getDifficultyLabel, type GKTest } from '@/data/gkQuestions';
import BottomNav from '@/components/BottomNav';
import GKPConverter from '@/components/GKPConverter';

const GK_COOLDOWN_MS = 60 * 60 * 1000; // 60 dakika
const TIMER_SECONDS = 30;

// ─── TEST SEÇİM EKRANI ───
function TestSelection({ onSelectTest }: { onSelectTest: (test: GKTest) => void }) {
  const { user } = useAuth();
  const [cooldowns, setCooldowns] = useState<Record<string, string>>({});
  const [profile, setProfile] = useState<{ gkp: number } | null>(null);
  const tests = getGKTests();

  useEffect(() => {
    if (!user) return;
    supabase.from('gk_scores').select('test_id, completed_at, questions_answered, withdrew')
      .eq('user_id', user.id).then(({ data }) => {
        if (!data) return;
        const map: Record<string, string> = {};
        data.forEach(r => {
          // Cooldown only if answered 5+ questions or failed
          if ((r.questions_answered >= 5 || !r.withdrew) && r.questions_answered > 0) {
            if (!map[r.test_id] || r.completed_at > map[r.test_id]) {
              map[r.test_id] = r.completed_at;
            }
          }
        });
        setCooldowns(map);
      });
    supabase.from('profiles').select('gkp').eq('user_id', user.id).single().then(({ data }) => {
      if (data) setProfile(data as any);
    });
  }, [user]);

  const isOnCooldown = (testId: string) => {
    const last = cooldowns[testId];
    if (!last) return false;
    return Date.now() - new Date(last).getTime() < GK_COOLDOWN_MS;
  };

  const getCooldownRemaining = (testId: string) => {
    const last = cooldowns[testId];
    if (!last) return '';
    const remaining = GK_COOLDOWN_MS - (Date.now() - new Date(last).getTime());
    if (remaining <= 0) return '';
    return `${Math.ceil(remaining / 60000)} dk`;
  };

  return (
    <div className="min-h-screen bg-background bg-pattern pb-20">
      <div className="bg-gradient-to-br from-yellow-500 to-amber-600 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-primary-foreground">🏆 Genel Kültür</h1>
          <p className="text-primary-foreground/80 mt-1">Kim Milyoner Olmak İster tarzı</p>
          {profile && (
            <div className="flex gap-3 mt-3">
              <div className="bg-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
                <span>💎</span>
                <span className="font-bold text-primary-foreground">{profile.gkp}</span>
                <span className="text-xs text-primary-foreground/80">GKP</span>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2 flex items-center gap-2">
                <span>⭐</span>
                <span className="font-bold text-primary-foreground">{Math.floor(profile.gkp / 10)}</span>
                <span className="text-xs text-primary-foreground/80">Puan</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
        <div className="bg-card rounded-2xl p-4 card-shadow mb-4">
          <h3 className="font-bold text-card-foreground mb-2">📋 Kurallar</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 20 soru, 30 saniye süre</li>
            <li>• Kolay: 10 GKP | Orta: 20 GKP | Zor: 30 GKP</li>
            <li>• 10 GKP = 1 Puan (dönüştürebilirsin)</li>
            <li>• İstediğin soruda çekil, puanını al</li>
            <li>• ❌ Yanlış yaparsan her şey sıfırlanır!</li>
            <li>• 5. sorudan sonra çekilirsen 1 saat bekleme süresi</li>
          </ul>
        </div>

        {tests.map(test => {
          const cooldown = isOnCooldown(test.id);
          const remaining = getCooldownRemaining(test.id);
          return (
            <button
              key={test.id}
              onClick={() => !cooldown && onSelectTest(test)}
              disabled={cooldown}
              className={`w-full bg-card rounded-2xl p-5 card-shadow text-left touch-target flex items-center gap-4 transition-all
                ${cooldown ? 'opacity-50 cursor-not-allowed' : 'hover:card-shadow-hover hover:scale-[1.01]'}`}
            >
              <span className="text-3xl">🏆</span>
              <div className="flex-1">
                <h3 className="font-bold text-card-foreground">{test.name}</h3>
                <p className="text-sm text-muted-foreground">20 soru • 30 sn süre</p>
                {cooldown && remaining && (
                  <p className="text-xs text-warning mt-1">⏳ {remaining} sonra tekrar girebilirsin</p>
                )}
              </div>
              {!cooldown && <span className="text-muted-foreground text-lg">→</span>}
              {cooldown && <span className="text-warning text-xl">⏳</span>}
            </button>
          );
        })}
      </div>
      <BottomNav />
    </div>
  );
}

// ─── QUIZ EKRANI ───
export default function GeneralKnowledge() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { play, setEnabled } = useSound();
  const { fire, ConfettiOverlay } = useConfetti();

  const [activeTest, setActiveTest] = useState<GKTest | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [earnedGKP, setEarnedGKP] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState<'wrong' | 'timeout' | 'withdraw' | 'complete' | null>(null);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);

  const answered = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => { setEnabled(true); }, []);

  // Timer
  useEffect(() => {
    if (!activeTest || gameOver || feedback) return;
    setTimeLeft(TIMER_SECONDS);
    answered.current = false;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!answered.current) {
            answered.current = true;
            handleGameOver('timeout');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, activeTest, gameOver, feedback]);

  const handleGameOver = useCallback((reason: 'wrong' | 'timeout' | 'withdraw' | 'complete') => {
    setGameOver(true);
    setGameOverReason(reason);

    const finalGKP = reason === 'wrong' || reason === 'timeout' ? 0 : earnedGKP;

    if (reason === 'wrong' || reason === 'timeout') {
      play('wrong');
    }

    // Save to DB
    if (user && activeTest) {
      supabase.from('gk_scores').insert({
        user_id: user.id,
        test_id: activeTest.id,
        gkp_earned: finalGKP,
        questions_answered: currentIndex + (reason === 'withdraw' ? 0 : 1),
        withdrew: reason === 'withdraw',
      }).then(() => {});

      if (finalGKP > 0) {
        supabase.from('profiles').select('gkp').eq('user_id', user.id).single().then(({ data }) => {
          if (data) {
            supabase.from('profiles').update({ gkp: (data as any).gkp + finalGKP }).eq('user_id', user.id).then(() => {});
          }
        });
      }
    }
  }, [earnedGKP, user, activeTest, currentIndex, play]);

  const handleAnswer = useCallback((index: number) => {
    if (answered.current || gameOver) return;
    answered.current = true;
    clearInterval(timerRef.current);

    const q = activeTest!.questions[currentIndex];
    const isCorrect = index === q.correctIndex;

    setSelectedIndex(index);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      play('correct');
      fire();
      const gkp = getGKPForQuestion(currentIndex);
      const newTotal = earnedGKP + gkp;
      setEarnedGKP(newTotal);

      setTimeout(() => {
        if (currentIndex + 1 >= 20) {
          // Tüm sorular bitti
          setEarnedGKP(newTotal);
          handleGameOver('complete');
        } else {
          setCurrentIndex(i => i + 1);
          setSelectedIndex(null);
          setFeedback(null);
        }
      }, 1500);
    } else {
      play('wrong');
      setTimeout(() => {
        handleGameOver('wrong');
      }, 1500);
    }
  }, [currentIndex, activeTest, earnedGKP, gameOver, play, fire, handleGameOver]);

  const handleWithdraw = () => {
    if (confirmWithdraw) {
      clearInterval(timerRef.current);
      handleGameOver('withdraw');
    } else {
      setConfirmWithdraw(true);
      setTimeout(() => setConfirmWithdraw(false), 3000);
    }
  };

  // Test seçim ekranı
  if (!activeTest) {
    return <TestSelection onSelectTest={setActiveTest} />;
  }

  // Oyun bitti ekranı
  if (gameOver) {
    const finalGKP = gameOverReason === 'wrong' || gameOverReason === 'timeout' ? 0 : earnedGKP;
    return (
      <div className="min-h-screen bg-background bg-pattern flex items-center justify-center p-4">
        <ConfettiOverlay />
        <div className="w-full max-w-md bg-card rounded-2xl p-8 card-shadow text-center space-y-6 animate-fade-in">
          <div className="text-6xl">
            {gameOverReason === 'complete' ? '🎉' : gameOverReason === 'withdraw' ? '🏳️' : '💥'}
          </div>
          <h2 className="text-2xl font-bold text-card-foreground">
            {gameOverReason === 'complete' && 'Tebrikler! Tüm soruları bitirdin!'}
            {gameOverReason === 'withdraw' && 'Çekildin!'}
            {gameOverReason === 'wrong' && 'Yanlış Cevap!'}
            {gameOverReason === 'timeout' && 'Süre Doldu!'}
          </h2>

          <div className="space-y-3">
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Kazanılan GKP</p>
              <p className="text-3xl font-bold text-card-foreground">💎 {finalGKP} GKP</p>
              <p className="text-xs text-muted-foreground mt-1">= {Math.floor(finalGKP / 10)} puan</p>
            </div>
            <div className="bg-secondary rounded-xl p-4">
              <p className="text-sm text-muted-foreground">Cevaplanılan Soru</p>
              <p className="text-xl font-bold text-card-foreground">{currentIndex + (gameOverReason === 'withdraw' ? 0 : 1)} / 20</p>
            </div>
            {(gameOverReason === 'wrong' || gameOverReason === 'timeout') && (
              <p className="text-sm text-destructive font-medium">❌ Yanlış cevap verdiğin için tüm GKP\'lerin silindi!</p>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={() => { setActiveTest(null); setGameOver(false); setCurrentIndex(0); setEarnedGKP(0); setGameOverReason(null); }}
              className="flex-1 bg-primary text-primary-foreground rounded-xl py-3 font-bold touch-target">
              🏆 Teste Dön
            </button>
            <button onClick={() => navigate('/')}
              className="flex-1 bg-secondary text-secondary-foreground rounded-xl py-3 font-bold touch-target">
              🏠 Ana Sayfa
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz ekranı
  const q = activeTest.questions[currentIndex];
  const diffInfo = getDifficultyLabel(currentIndex);
  const gkpForThis = getGKPForQuestion(currentIndex);
  const progress = (timeLeft / TIMER_SECONDS) * 100;

  // Milyoner tarzı puan basamakları
  const milestones = Array.from({ length: 20 }, (_, i) => {
    const gkp = getGKPForQuestion(i);
    return { index: i, gkp };
  }).reverse();

  return (
    <div className="min-h-screen bg-background bg-pattern flex flex-col">
      <ConfettiOverlay />
      {/* Header */}
      <div className="bg-card card-shadow px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={handleWithdraw}
            className="text-muted-foreground hover:text-foreground transition-colors touch-target text-sm font-medium">
            {confirmWithdraw ? '⚠️ Emin misin? Çekil!' : '🏳️ Çekil'}
          </button>
          <div className="text-center">
            <span className="font-bold text-card-foreground">Soru {currentIndex + 1}/20</span>
            <span className={`text-xs ml-2 font-medium ${diffInfo.color}`}>{diffInfo.label}</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-card-foreground">💎 {earnedGKP}</span>
            <span className="text-xs text-muted-foreground ml-1">GKP</span>
          </div>
        </div>
        {/* Timer bar */}
        <div className="max-w-2xl mx-auto mt-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-destructive' : timeLeft <= 10 ? 'bg-warning' : 'bg-success'}`}
              style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-right">{timeLeft}s • +{gkpForThis} GKP</p>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex">
        {/* Milestones sidebar - desktop only */}
        <div className="hidden lg:block w-48 bg-card border-r border-border p-3 overflow-y-auto">
          <p className="text-xs font-bold text-muted-foreground mb-2 uppercase">Basamaklar</p>
          {milestones.map(m => {
            const isCurrent = m.index === currentIndex;
            const isPassed = m.index < currentIndex;
            return (
              <div key={m.index} className={`text-xs py-1.5 px-2 rounded-lg mb-0.5 flex justify-between items-center
                ${isCurrent ? 'bg-primary/20 text-primary font-bold' : isPassed ? 'text-success' : 'text-muted-foreground'}`}>
                <span>{m.index + 1}.</span>
                <span>{isPassed ? '✅' : `+${m.gkp} GKP`}</span>
              </div>
            );
          })}
        </div>

        {/* Question */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl space-y-6 animate-fade-in" key={currentIndex}>
            <div className="bg-card rounded-2xl p-8 card-shadow">
              <div className="flex items-center gap-2 mb-2">
                <p className={`text-xs font-medium uppercase tracking-wider ${diffInfo.color}`}>
                  {diffInfo.label} (+{gkpForThis} GKP)
                </p>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-card-foreground leading-relaxed">{q.question}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, i) => {
                const isSelected = selectedIndex === i;
                const isCorrectOption = i === q.correctIndex;
                let btnClass = 'bg-card hover:bg-secondary card-shadow hover:card-shadow-hover';
                if (feedback) {
                  if (isCorrectOption) btnClass = 'bg-success/20 border-2 border-success glow-success';
                  else if (isSelected && !isCorrectOption) btnClass = 'bg-destructive/20 border-2 border-destructive glow-error animate-shake';
                  else btnClass = 'bg-muted opacity-50';
                }
                return (
                  <button key={i} onClick={() => { play('click'); handleAnswer(i); }} disabled={!!feedback}
                    className={`${btnClass} rounded-xl p-5 text-left font-medium text-card-foreground transition-all duration-200 touch-target disabled:cursor-default ${!feedback ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}`}>
                    <span className="text-muted-foreground mr-2 font-bold">{String.fromCharCode(65 + i)})</span>{opt}
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div className={`rounded-xl p-4 text-center text-sm font-medium animate-fade-in ${feedback === 'correct' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                {feedback === 'correct' ? `✅ Doğru! +${gkpForThis} GKP` : `❌ Yanlış!`} — {q.explanation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
