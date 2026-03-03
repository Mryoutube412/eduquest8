import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SUBJECTS, getTestsForTopic, type TestInfo } from '@/data/questions';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import BottomNav from '@/components/BottomNav';

const COOLDOWN_MS = 15 * 60 * 1000; // 15 minutes
const DIFFICULTY_LABELS: Record<string, { label: string; color: string }> = {
  kolay: { label: '🟢 Kolay', color: 'text-green-600' },
  orta: { label: '🟡 Orta', color: 'text-yellow-600' },
  zor: { label: '🔴 Zor', color: 'text-red-600' },
};

export default function SubjectDetail() {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const subjectInfo = SUBJECTS.find(s => s.id === subject);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [completedTests, setCompletedTests] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    supabase
      .from('completed_tests')
      .select('test_id, completed_at')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, string> = {};
        data.forEach(r => {
          if (!map[r.test_id] || r.completed_at > map[r.test_id]) {
            map[r.test_id] = r.completed_at;
          }
        });
        setCompletedTests(map);
      });
  }, [user]);

  if (!subjectInfo) { navigate('/'); return null; }

  const selectedTopicInfo = subjectInfo.topics.find(t => t.id === selectedTopic);
  const tests = selectedTopic ? getTestsForTopic(subjectInfo.id, selectedTopic) : [];

  const isOnCooldown = (testId: string) => {
    const lastCompleted = completedTests[testId];
    if (!lastCompleted) return false;
    return Date.now() - new Date(lastCompleted).getTime() < COOLDOWN_MS;
  };

  const getCooldownRemaining = (testId: string) => {
    const lastCompleted = completedTests[testId];
    if (!lastCompleted) return '';
    const remaining = COOLDOWN_MS - (Date.now() - new Date(lastCompleted).getTime());
    if (remaining <= 0) return '';
    const min = Math.ceil(remaining / 60000);
    return `${min} dk`;
  };

  const isCompleted = (testId: string) => !!completedTests[testId];

  const handleTestClick = (test: TestInfo) => {
    if (isOnCooldown(test.id)) return;
    navigate(`/quiz/${subject}/${selectedTopic}`, {
      state: { testId: test.id, difficulty: test.difficulty }
    });
  };

  return (
    <div className="min-h-screen bg-background bg-pattern pb-20">
      <div className={`${subjectInfo.gradient} px-4 py-8`}>
        <div className="max-w-2xl mx-auto">
          <button onClick={() => selectedTopic ? setSelectedTopic(null) : navigate('/')} className="text-primary-foreground/80 hover:text-primary-foreground mb-4 touch-target text-lg">← Geri</button>
          <h1 className="text-3xl font-bold text-primary-foreground">{subjectInfo.icon} {subjectInfo.name}</h1>
          <p className="text-primary-foreground/80 mt-1">
            {selectedTopic ? `${selectedTopicInfo?.icon} ${selectedTopicInfo?.name} – Testler` : 'Bir konu seç'}
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
        {!selectedTopic ? (
          // Topic list
          subjectInfo.topics.map(topic => {
            const topicTests = getTestsForTopic(subjectInfo.id, topic.id);
            const completedCount = topicTests.filter(t => isCompleted(t.id)).length;
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className="w-full bg-card rounded-2xl p-5 card-shadow hover:card-shadow-hover hover:scale-[1.01] transition-all text-left touch-target flex items-center gap-4"
              >
                <span className="text-3xl">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-card-foreground">{topic.name}</h3>
                  <p className="text-sm text-muted-foreground">{topicTests.length} test</p>
                </div>
                {completedCount > 0 && (
                  <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full font-medium">
                    {completedCount}/{topicTests.length} ✓
                  </span>
                )}
                <span className="text-muted-foreground text-lg">→</span>
              </button>
            );
          })
        ) : (
          // Test list for selected topic
          <>
            {/* Video konu anlatımı butonu */}
            {selectedTopicInfo?.videoUrl && (
              <a
                href={selectedTopicInfo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 card-shadow hover:card-shadow-hover hover:scale-[1.01] transition-all text-left touch-target flex items-center gap-4 text-white"
              >
                <span className="text-3xl">🎬</span>
                <div className="flex-1">
                  <h3 className="font-bold">Konu Anlatımını İzle</h3>
                  <p className="text-sm text-white/80">YouTube'da video ile öğren</p>
                </div>
                <span className="text-lg">▶️</span>
              </a>
            )}

            {tests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-muted-foreground">Bu konuda henüz test yok</p>
              </div>
            ) : (
              tests.map(test => {
                const completed = isCompleted(test.id);
                const cooldown = isOnCooldown(test.id);
                const remaining = getCooldownRemaining(test.id);
                const diffInfo = DIFFICULTY_LABELS[test.difficulty];

                return (
                  <button
                    key={test.id}
                    onClick={() => handleTestClick(test)}
                    disabled={cooldown}
                    className={`w-full bg-card rounded-2xl p-5 card-shadow text-left touch-target flex items-center gap-4 transition-all
                      ${cooldown ? 'opacity-50 cursor-not-allowed' : 'hover:card-shadow-hover hover:scale-[1.01]'}
                    `}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-card-foreground">{test.name}</h3>
                        <span className={`text-xs font-medium ${diffInfo.color}`}>{diffInfo.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {test.questionCount} soru
                        {test.difficulty === 'zor' && ' • ⏱️ Süresiz'}
                      </p>
                      {cooldown && remaining && (
                        <p className="text-xs text-warning mt-1">⏳ {remaining} sonra tekrar çözebilirsin</p>
                      )}
                    </div>
                    {completed && !cooldown && (
                      <span className="text-success text-xl">✅</span>
                    )}
                    {completed && cooldown && (
                      <span className="text-warning text-xl">⏳</span>
                    )}
                    {!completed && (
                      <span className="text-muted-foreground text-lg">→</span>
                    )}
                  </button>
                );
              })
            )}
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
