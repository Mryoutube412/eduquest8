import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VOCAB_ACTIVITIES, type VocabWord } from '@/data/vocabularyActivities';
import { useSound } from '@/hooks/useSound';
import { useConfetti } from '@/hooks/useConfetti';
import { useGame } from '@/context/GameContext';

export default function VocabActivity() {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();
  const { settings } = useGame();
  const { play, setEnabled } = useSound();
  const { fire, ConfettiOverlay } = useConfetti();

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
  const [draggedWord, setDraggedWord] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'wrong'>>({});
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const touchStartRef = useRef<{ word: string; x: number; y: number } | null>(null);

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
  }, [activity, score, play, fire]);

  if (!activity) {
    navigate('/');
    return null;
  }

  const placedWords = new Set(Object.values(placements));
  const availableWords = shuffledWords.filter(w => !placedWords.has(w.english));

  const handleDragStart = (e: React.DragEvent, word: string) => {
    e.dataTransfer.setData('text/plain', word);
    setDraggedWord(word);
  };

  const handleDragEnd = () => {
    setDraggedWord(null);
  };

  const handleDrop = (e: React.DragEvent, turkish: string) => {
    e.preventDefault();
    const english = e.dataTransfer.getData('text/plain');
    placeWord(english, turkish);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleTouchStart = (word: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { word, x: touch.clientX, y: touch.clientY };
    setDraggedWord(word);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const slot = element?.closest('[data-slot]');
    if (slot) {
      const turkish = slot.getAttribute('data-slot');
      if (turkish) {
        placeWord(touchStartRef.current.word, turkish);
      }
    }
    touchStartRef.current = null;
    setDraggedWord(null);
  };



  const handleRemove = (turkish: string) => {
    if (feedback[turkish] === 'correct') return;
    setPlacements(prev => {
      const copy = { ...prev };
      delete copy[turkish];
      return copy;
    });
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
          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">🇬🇧 İngilizce Kelimeler (Sürükle)</h3>
            <div className="flex flex-wrap gap-2">
              {availableWords.map(w => (
                <div
                  key={w.english}
                  draggable
                  onDragStart={(e) => handleDragStart(e, w.english)}
                  onDragEnd={handleDragEnd}
                  onTouchStart={(e) => handleTouchStart(w.english, e)}
                  onTouchEnd={handleTouchEnd}
                  className={`bg-primary/10 text-primary border border-primary/30 px-3 py-2 rounded-lg font-medium text-sm cursor-grab active:cursor-grabbing select-none touch-target transition-all hover:scale-105 ${
                    draggedWord === w.english ? 'opacity-50 scale-95' : ''
                  }`}
                >
                  {w.english}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">🇹🇷 Türkçe Anlamlar (Bırak)</h3>
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
                    onClick={() => placed && handleRemove(w.turkish)}
                    className={`rounded-xl p-4 border-2 border-dashed transition-all min-h-[60px] flex items-center justify-between ${
                      fb === 'correct'
                        ? 'border-success bg-success/10'
                        : fb === 'wrong'
                        ? 'border-destructive bg-destructive/10 animate-shake'
                        : placed
                        ? 'border-primary/50 bg-primary/5'
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
                      <span className="text-xs text-muted-foreground">buraya bırak</span>
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
