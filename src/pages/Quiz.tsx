import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getTestsForTopic, getTestQuestions, type TestInfo, type Question, SUBJECTS } from '../data/questions';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { supabase } from '@/integrations/supabase/client';
import { useSound } from '../hooks/useSound';
import { useConfetti } from '../hooks/useConfetti';
import { useBadgeChecker } from '../hooks/useBadgeChecker';

const POINTS: Record<string, number> = { kolay: 3, orta: 6, zor: 10 };

export default function Quiz() {
  const { subject, topic } = useParams<{ subject: string; topic: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { settings } = useGame();
  const { play, setEnabled } = useSound();
  const { fire, ConfettiOverlay } = useConfetti();
  const { checkAfterQuiz } = useBadgeChecker();

  const locationState = location.state as { testId?: string; difficulty?: string } | null;
  const testId = locationState?.testId;
  const difficulty = locationState?.difficulty;

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(() => settings.timerDuration);
  const [answers, setAnswers] = useState<Array<{ questionId: string; question: string; selectedIndex: number; correctIndex: number; correct: boolean; options: string[]; explanation: string; paragraph?: string }>>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [localStreak, setLocalStreak] = useState(0);
  const [hadFastAnswer, setHadFastAnswer] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const answered = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const answerStartTime = useRef<number>(Date.now());

  const subjectInfo = SUBJECTS.find(s => s.id === subject);
  const topicInfo = subjectInfo?.topics.find(t => t.id === topic);

  // Timer disabled in hard mode
  const timerActive = settings.timerEnabled && difficulty !== 'zor';
  const timerDuration = settings.timerDuration;

  useEffect(() => { setEnabled(settings.soundEnabled); }, [settings.soundEnabled]);

  // Load test questions
  useEffect(() => {
    if (!testId || !subject || !topic) {
      navigate(`/subject/${subject}`);
      return;
    }
    const tests = getTestsForTopic(subject, topic);
    const test = tests.find(t => t.id === testId);
    if (!test) {
      navigate(`/subject/${subject}`);
      return;
    }
    const qs = getTestQuestions(test);
    setQuestions(qs);
  }, [testId, subject, topic]);

  // Reset answered flag on every new question (critical for timer-off modes)
  useEffect(() => {
    if (questions.length === 0) return;
    answered.current = false;
    answerStartTime.current = Date.now();
  }, [currentIndex, questions.length]);

  // Timer
  useEffect(() => {
    if (!timerActive || questions.length === 0 || feedback) return;
    setTimeLeft(timerDuration);
    const localAnswered = answered;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!localAnswered.current) {
            // Trigger timeout answer inline
            localAnswered.current = true;
            const q = questions[currentIndex];
            setSelectedIndex(-1);
            setFeedback('wrong');
            play('wrong');
            setLocalStreak(0);
            const newAnswer = {
              questionId: q.id, question: q.question, selectedIndex: -1,
              correctIndex: q.correctIndex, correct: false, options: [...q.options],
              explanation: q.explanation, paragraph: q.paragraph,
            };
            setAnswers(prev => [...prev, newAnswer]);
            setTimeout(() => {
              if (currentIndex + 1 >= questions.length) {
                navigate('/results', {
                  state: {
                    answers: [...answers, newAnswer], subject, subjectName: subjectInfo?.name,
                    topic, topicName: topicInfo?.name, testId,
                  }
                });
              } else {
                setCurrentIndex(i => i + 1);
                setSelectedIndex(null);
                setFeedback(null);
              }
            }, 1200);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex, questions, timerActive, timerDuration, feedback]);

  const handleAnswer = useCallback((index: number) => {
    if (answered.current) return;
    answered.current = true;
    clearInterval(timerRef.current);

    const q = questions[currentIndex];
    const isCorrect = index === q.correctIndex;
    const answerTime = (Date.now() - answerStartTime.current) / 1000;

    setSelectedIndex(index);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (answerTime < 5 && isCorrect) setHadFastAnswer(true);
    const newLocalStreak = isCorrect ? localStreak + 1 : 0;
    setLocalStreak(newLocalStreak);

    if (isCorrect) { play('correct'); fire(); } else { play('wrong'); }

    const newAnswer = {
      questionId: q.id, question: q.question, selectedIndex: index,
      correctIndex: q.correctIndex, correct: isCorrect, options: [...q.options],
      explanation: q.explanation, paragraph: q.paragraph,
    };

    setAnswers(prev => [...prev, newAnswer]);

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        // Test finished - award points NOW
        const allAnswers = [...answers, newAnswer];
        const totalCorrect = allAnswers.filter(a => a.correct).length;
        const totalScore = allAnswers.reduce((sum, a) => {
          if (!a.correct) return sum;
          const qData = questions.find(q => q.id === a.questionId);
          return sum + (POINTS[qData?.difficulty || 'kolay'] || 3);
        }, 0);

        // Save to DB
        if (user) {
          supabase.from('profiles').select('total_score, total_correct, total_wrong, streak, best_streak').eq('user_id', user.id).single().then(({ data }) => {
            if (!data) return;
            const newStreak = totalCorrect === allAnswers.length ? data.streak + totalCorrect : totalCorrect;
            supabase.from('profiles').update({
              total_score: data.total_score + totalScore,
              total_correct: data.total_correct + totalCorrect,
              total_wrong: data.total_wrong + (allAnswers.length - totalCorrect),
              streak: newStreak,
              best_streak: Math.max(newStreak, data.best_streak),
            }).eq('user_id', user.id).then(() => {});
          });

          // Record test completion
          if (testId) {
            supabase.from('completed_tests').insert({
              user_id: user.id,
              test_id: testId,
              score: totalScore,
              correct_count: totalCorrect,
              total_count: allAnswers.length,
            }).then(() => {});
          }
        }

        // Check badges
        if (subject) {
          checkAfterQuiz({
            subject,
            correctCount: totalCorrect,
            totalCount: allAnswers.length,
            streak: newLocalStreak,
            fastAnswer: hadFastAnswer || (answerTime < 5 && isCorrect),
          });
        }

        navigate('/results', {
          state: {
            answers: allAnswers, subject, subjectName: subjectInfo?.name,
            topic, topicName: topicInfo?.name, testId,
          }
        });
      } else {
        setCurrentIndex(i => i + 1);
        setSelectedIndex(null);
        setFeedback(null);
      }
    }, 1200);
  }, [currentIndex, questions, answers, subject, subjectInfo, user, localStreak, hadFastAnswer, checkAfterQuiz, testId]);

  const handleExit = () => {
    if (confirmExit) {
      // Exit without points
      navigate(`/subject/${subject}`);
    } else {
      setConfirmExit(true);
      setTimeout(() => setConfirmExit(false), 3000);
    }
  };

  if (questions.length === 0) return null;

  const q = questions[currentIndex];
  const progress = timerActive ? (timeLeft / timerDuration) * 100 : 100;

  return (
    <div className="min-h-screen bg-background bg-pattern flex flex-col">
      <ConfettiOverlay />
      {/* Header */}
      <div className="bg-card card-shadow px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={handleExit} className="text-muted-foreground hover:text-foreground transition-colors touch-target text-lg">
            {confirmExit ? '⚠️ Çıkarsan puan gelmez!' : '← Çık'}
          </button>
          <span className="font-bold text-foreground">{topicInfo?.icon} {topicInfo?.name}</span>
          <span className="text-sm font-medium text-muted-foreground">{currentIndex + 1} / {questions.length}</span>
        </div>
        {timerActive && (
          <div className="max-w-2xl mx-auto mt-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? 'bg-destructive' : timeLeft <= 10 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-right">{timeLeft} saniye</p>
          </div>
        )}
        {!timerActive && difficulty === 'zor' && (
          <p className="max-w-2xl mx-auto text-xs text-muted-foreground mt-1">🔴 Zor Mod – Süresiz</p>
        )}
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6 animate-fade-in" key={currentIndex}>
          {/* Paragraph (for yeni nesil / hard questions) */}
          {q.paragraph && (
            <div className="bg-card rounded-2xl p-6 card-shadow border-l-4 border-primary">
              <p className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">📖 Metin</p>
              <p className="text-sm md:text-base text-card-foreground leading-relaxed whitespace-pre-line">{q.paragraph}</p>
            </div>
          )}

          <div className="bg-card rounded-2xl p-8 card-shadow">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {q.difficulty === 'kolay' ? '🟢 Kolay (+3)' : q.difficulty === 'orta' ? '🟡 Orta (+6)' : '🔴 Zor (+10)'}
              </p>
              {q.type === 'yeni_nesil' && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Yeni Nesil</span>
              )}
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
              {feedback === 'correct' ? '✅ Doğru!' : '❌ Yanlış!'} — {q.explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
