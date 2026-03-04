import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import SubjectGrid from '../components/SubjectGrid';
import BottomNav from '../components/BottomNav';

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('*').eq('user_id', user.id).single().then(({ data }) => setProfile(data));
  }, [user]);

  return (
    <div className="min-h-screen bg-pattern pb-20 bg-secondary">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Merhaba, {profile?.display_name || 'Öğrenci'}! 👋</h1>
          <p className="text-muted-foreground mt-1">Bir dersten soru çöz, Arkadaşlarınla mesajlaş , Rozet topla ve globalde insanarla yarış</p>
          {profile &&
          <div className="flex gap-4 mt-3">
              {[
            { label: 'Puan', value: profile.total_score, icon: '⭐' },
            { label: 'Doğru', value: profile.total_correct, icon: '✅' },
            { label: 'Seri', value: profile.streak, icon: '🔥' }].
            map((s) =>
            <div key={s.label} className="bg-card rounded-xl px-4 py-2 card-shadow flex items-center gap-2">
                  <span>{s.icon}</span>
                  <span className="font-bold text-card-foreground">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
            )}
            </div>
          }
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">📚 Dersler</h2>
          <SubjectGrid />
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">🎮 Etkinlikler</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/genel-kultur')}
              className="w-full bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-5 card-shadow hover:card-shadow-hover hover:scale-[1.01] transition-all text-left touch-target flex items-center gap-4"
            >
              <span className="text-3xl">🏆</span>
              <div className="flex-1">
                <h3 className="font-bold text-primary-foreground">Genel Kültür</h3>
                <p className="text-sm text-primary-foreground/80">Kim Milyoner Olmak İster tarzı</p>
              </div>
              <span className="text-primary-foreground/80 text-lg">→</span>
            </button>
            <button
              onClick={() => navigate('/english-activities')}
              className="w-full bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover hover:scale-[1.01] transition-all text-left touch-target flex items-center gap-4"
            >
              <span className="text-3xl">🇬🇧</span>
              <div className="flex-1">
                <h3 className="font-bold text-card-foreground">İngilizce Kelime Etkinlikleri</h3>
                <p className="text-sm text-muted-foreground">Sürükle-bırak ile kelime eşleştir</p>
              </div>
              <span className="text-muted-foreground text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>);

}