import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VOCAB_ACTIVITIES, type VocabWord } from '@/data/vocabularyActivities';
import { useSound } from '@/hooks/useSound';
import { useConfetti } from '@/hooks/useConfetti';
import { useGame } from '@/context/GameContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function VocabActivity() {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const { settings, addScore } = useGame();
  const { play, setEnabled } = useSound();
  const { fire, ConfettiOverlay } = useConfetti();
  const { user } = useAuth();

  const activity = VOCAB_ACTIVITIES.find(a => a.id === activityId);

  const [shuffledWords] = useState<VocabWord[]>(() => {
    if (!activity) return [];
    return [...activity.words].sort(() => Math.random() - 0.5);
  });

  const [shuffledSlots] = useState<VocabWord[]>(() => {
    if (!activity) return [];
    return [...activity.words].sort(() => Math.random() - 0.5);
  });

  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => { setEnabled(settings.soundEnabled); }, [settings.soundEnabled]);

  const placeWord = useCallback((english: string, turkish: string) => {
    if (!activity) return;
    const word = activity.words.find(w => w.turkish === turkish);
    const isCorrect = word?.english === english;

    if (isCorrect) {
      play('correct');
      setPlacements(prev => ({ ...prev, [turkish]: english }));
      setFeedback(prev => ({ ...prev, [turkish]: 'correct' }));
      
      const newScore = score + 1;
      setScore(newScore);
      addScore(1);

      if (user) {
        supabase.from('profiles').select('total_score').eq('user_id', user.id).single().then(({ data }) => {
          if (data) {
            supabase.from('profiles').update({ total_score: data.total_score + 1 }).eq('user_id', user.id).then(() => {});
          }
        });
      }

      if (newScore === activity.words.length) {
        setCompleted(true);
        fire();
      }
    } else {
      play('wrong');
      setFeedback(prev => ({ ...prev, [turkish]: 'wrong' }));
      setTimeout(() => {
        setFeedback(prev => {
          const copy = { ...prev };
          if (copy[turkish] === 'wrong') delete copy[turkish];
          return copy;
        });
      }, 800);
    }
    setSelectedWord(null);
  }, [activity, score, play, fire, user, addScore]);

  if (!activity) {
    navigate('/');
    return null;
  }

  const placedWords = new Set(Object.values(placements));
  const availableWords = shuffledWords.filter(w => !placedWords.has(w.english));

  // Tap-to-select: tap a word, then tap a slot
  const handleWordTap = (english: string) => {
    if (selectedWord === english) {
      setSelectedWord(null);
    } else {
      setSelectedWord(english);
    }
  };

  const handleSlotTap = (turkish: string) => {
    if (placements[turkish]) return; // already placed
    if (selectedWord) {
      placeWord(selectedWord, turkish);
    }
  };

  // Desktop drag still works
  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word);
    setSelectedWord(word);
  };

  const handleDragEnd = () => {
    setSelectedWord(null);
  };

  const handleDrop = (e: React.DragEvent, turkish: string) => {
    e.preventDefault();
    const english = e.dataTransfer.getData('text/plain');
    placeWord(english, turkish);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background bg-pattern pb-6">
      <ConfettiOverlay />
      <div className="bg-card card-shadow px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/english-activities')} className="text-muted-foreground hover:text-foreground transition-colors touch-target text-lg">
            ← Geri
          </button>
          <span className="font-bold text-foreground">🇬🇧 {activity.name} ({activity.units})</span>
          <span className="text-sm font-medium text-muted-foreground">{score}/{activity.words.length}</span>
        </div>
        <div className="max-w-3xl mx-auto mt-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-success transition-all duration-500" style={{ width: `${(score / activity.words.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {completed ? (
        <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-4">
          <p className="text-6xl">🎉</p>
          <h2 className="text-2xl font-bold text-foreground">Tebrikler!</h2>
          <p className="text-muted-foreground">Tüm kelimeleri doğru eşleştirdin!</p>
          <p className="text-lg font-bold text-success">{score}/{activity.words.length} Doğru</p>
          <button
            onClick={() => navigate('/english-activities')}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity touch-target"
          >
            Etkinliklere Dön
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {selectedWord && (
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-3 text-center text-sm font-medium text-primary animate-fade-in">
              ✋ "<strong>{selectedWord}</strong>" seçildi — aşağıdan Türkçe karşılığına dokun
            </div>
          )}

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">🇬🇧 İngilizce Kelimeler {selectedWord ? '(Seçili)' : '(Dokun / Sürükle)'}</h3>
            <div className="flex flex-wrap gap-2">
              {availableWords.map(w => (
                <div
                  key={w.english}
                  draggable
                  onDragStart={(e) => handleDragStart(e, w.english)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleWordTap(w.english)}
                  className={`px-3 py-2 rounded-lg font-medium text-sm cursor-pointer select-none touch-target transition-all hover:scale-105 ${
                    selectedWord === w.english
                      ? 'bg-primary text-primary-foreground scale-105 ring-2 ring-primary ring-offset-2'
                      : 'bg-primary/10 text-primary border border-primary/30'
                  }`}
                >
                  {w.english}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">🇹🇷 Türkçe Anlamlar {selectedWord ? '(Buraya dokun)' : '(Bırak)'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shuffledSlots.map(w => {
                const placed = placements[w.turkish];
                const fb = feedback[w.turkish];
                
                return (
                  <div
                    key={w.turkish}
                    data-slot={w.turkish}
                    onDragOver={handleDragOver}
                    onDrop={(e) => !placed && handleDrop(e, w.turkish)}
                    onClick={() => !placed && handleSlotTap(w.turkish)}
                    className={`rounded-xl p-4 border-2 border-dashed transition-all min-h-[60px] flex items-center justify-between cursor-pointer ${
                      fb === 'correct'
                        ? 'border-success bg-success/10'
                        : fb === 'wrong'
                        ? 'border-destructive bg-destructive/10 animate-shake'
                        : placed
                        ? 'border-primary/50 bg-primary/5'
                        : selectedWord
                        ? 'border-primary/50 bg-primary/5 hover:bg-primary/10'
                        : 'border-muted-foreground/30 bg-card'
                    }`}
                  >
                    <span className="font-medium text-card-foreground">{w.turkish}</span>
                    {placed && (
                      <span className={`text-sm font-bold px-2 py-1 rounded ${
                        fb === 'correct' ? 'text-success' : 'text-primary'
                      }`}>
                        {fb === 'correct' ? `✅ ${placed}` : placed}
                      </span>
                    )}
                    {!placed && (
                      <span className="text-xs text-muted-foreground">
                        {selectedWord ? '👆 dokun' : 'buraya bırak'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}