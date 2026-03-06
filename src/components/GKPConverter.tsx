import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface GKPConverterProps {
  gkp: number;
  onConvert: () => void;
}

export default function GKPConverter({ gkp, onConvert }: GKPConverterProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const maxGKP = Math.floor(gkp / 10) * 10; // Round down to nearest 10
  const pointsToGet = Math.floor(amount / 10);

  const handleConvert = async () => {
    if (!user || amount < 10 || amount > gkp) return;
    setLoading(true);
    const convertAmount = Math.floor(amount / 10) * 10; // Ensure multiple of 10
    const points = convertAmount / 10;

    const { data: profile } = await supabase
      .from('profiles')
      .select('gkp, total_score')
      .eq('user_id', user.id)
      .single();

    if (!profile || profile.gkp < convertAmount) {
      setLoading(false);
      return;
    }

    await supabase.from('profiles').update({
      gkp: profile.gkp - convertAmount,
      total_score: profile.total_score + points,
    }).eq('user_id', user.id);

    setSuccess(`${convertAmount} GKP → ${points} Puan dönüştürüldü!`);
    setLoading(false);
    setAmount(10);
    setTimeout(() => {
      setSuccess('');
      setOpen(false);
      onConvert();
    }, 1500);
  };

  if (!open) {
    return (
      <button
        onClick={() => gkp >= 10 && setOpen(true)}
        disabled={gkp < 10}
        className={`bg-white/20 rounded-xl px-3 py-2 flex items-center gap-1 transition-all ${
          gkp >= 10 ? 'hover:bg-white/30 cursor-pointer' : 'opacity-50 cursor-not-allowed'
        }`}
        title={gkp < 10 ? 'En az 10 GKP gerekli' : 'GKP\'yi puana dönüştür'}
      >
        <span>🔄</span>
        <span className="text-xs text-primary-foreground font-medium">Dönüştür</span>
      </button>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-5 card-shadow mt-4 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-card-foreground">💎 GKP → Puan Dönüştürücü</h3>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground text-lg">✕</button>
      </div>

      <p className="text-sm text-muted-foreground mb-3">10 GKP = 1 Puan | Mevcut: <span className="font-bold text-primary">{gkp} GKP</span></p>

      {success ? (
        <div className="bg-success/10 text-success rounded-xl p-4 text-center font-medium animate-fade-in">
          ✅ {success}
        </div>
      ) : (
        <>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-card-foreground block mb-1">Miktar (GKP)</label>
              <input
                type="range"
                min={10}
                max={maxGKP}
                step={10}
                value={Math.min(amount, maxGKP)}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">10</span>
                <span className="font-bold text-primary">{amount} GKP → {pointsToGet} Puan</span>
                <span className="text-muted-foreground">{maxGKP}</span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {[10, 50, 100, maxGKP].filter((v, i, a) => v <= maxGKP && v >= 10 && a.indexOf(v) === i).map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    amount === val
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {val === maxGKP ? 'Tümü' : `${val} GKP`}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleConvert}
            disabled={loading || amount < 10 || amount > gkp}
            className="w-full mt-4 rounded-xl touch-target"
          >
            {loading ? '...' : `${amount} GKP → ${pointsToGet} Puan Dönüştür`}
          </Button>
        </>
      )}
    </div>
  );
}
