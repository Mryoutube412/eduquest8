import { useNavigate } from 'react-router-dom';
import { VOCAB_ACTIVITIES } from '@/data/vocabularyActivities';
import BottomNav from '@/components/BottomNav';

export default function EnglishActivities() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background bg-pattern pb-20">
      <div className="gradient-ingilizce px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate('/')} className="text-primary-foreground/80 hover:text-primary-foreground mb-4 touch-target text-lg">← Ana Sayfa</button>
          <h1 className="text-3xl font-bold text-primary-foreground">🇬🇧 İngilizce Etkinlikleri</h1>
          <p className="text-primary-foreground/80 mt-1">Kelimeleri sürükle, Türkçe karşılıklarına bırak!</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
        {VOCAB_ACTIVITIES.map(activity => (
          <button
            key={activity.id}
            onClick={() => navigate(`/english-activities/${activity.id}`)}
            className="w-full bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover hover:scale-[1.01] transition-all text-left touch-target flex items-center gap-4"
          >
            <span className="text-3xl">📝</span>
            <div className="flex-1">
              <h3 className="font-bold text-card-foreground">{activity.name}</h3>
              <p className="text-sm text-muted-foreground">{activity.units} • {activity.words.length} kelime</p>
            </div>
            <span className="text-muted-foreground text-lg">→</span>
          </button>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
