import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { ALL_BADGES } from '@/data/badges';
import { toast } from 'sonner';

// Badge thresholds for subject-based correct answers
const SUBJECT_THRESHOLDS: Record<string, number> = {
  bronz: 10,
  demir: 25,
  altin: 50,
  usta: 100,
  sampiyon: 200,
  deha: 500,
};

export function useBadgeChecker() {
  const { user } = useAuth();

  const awardBadge = useCallback(async (badgeId: string) => {
    if (!user) return false;
    // Check if already earned
    const { data: existing } = await supabase
      .from('user_badges')
      .select('id')
      .eq('user_id', user.id)
      .eq('badge_id', badgeId)
      .maybeSingle();

    if (existing) return false;

    const { error } = await supabase
      .from('user_badges')
      .insert({ user_id: user.id, badge_id: badgeId });

    if (!error) {
      const badge = ALL_BADGES.find(b => b.id === badgeId);
      if (badge) {
        toast.success(`🏅 Yeni Rozet: ${badge.icon} ${badge.name}`, {
          description: badge.description,
          duration: 4000,
        });
      }
      return true;
    }
    return false;
  }, [user]);

  const checkAfterQuiz = useCallback(async (params: {
    subject: string;
    correctCount: number;
    totalCount: number;
    streak: number;
    fastAnswer?: boolean; // answered under 5 seconds
  }) => {
    if (!user) return;

    const { subject, correctCount, totalCount, streak, fastAnswer } = params;

    // Get current profile stats
    const { data: profile } = await supabase
      .from('profiles')
      .select('total_correct, total_score')
      .eq('user_id', user.id)
      .single();

    if (!profile) return;

    // Get subject-specific correct count from earned badges to estimate
    // We'll use total_correct as a proxy for now
    const { data: existingBadges } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', user.id);

    const earnedIds = new Set((existingBadges || []).map(b => b.badge_id));

    // --- Subject-based badges ---
    for (const [suffix, threshold] of Object.entries(SUBJECT_THRESHOLDS)) {
      const badgeId = `${subject}_${suffix}`;
      if (!earnedIds.has(badgeId) && profile.total_correct >= threshold) {
        await awardBadge(badgeId);
      }
    }

    // --- Speed badge ---
    if (fastAnswer) {
      const speedBadgeId = `${subject}_hiz`;
      if (!earnedIds.has(speedBadgeId)) {
        await awardBadge(speedBadgeId);
      }
      if (!earnedIds.has('hiz_ustasi')) {
        await awardBadge('hiz_ustasi');
      }
    }

    // --- Streak badges ---
    if (streak >= 5) {
      const seriBadgeId = `${subject}_seri`;
      if (!earnedIds.has(seriBadgeId)) {
        await awardBadge(seriBadgeId);
      }
    }
    if (streak >= 10 && !earnedIds.has('seri_katil')) {
      await awardBadge('seri_katil');
    }

    // --- Perfect quiz ---
    if (correctCount === totalCount && totalCount > 0) {
      const mukemmelBadgeId = `${subject}_mukemmel`;
      if (!earnedIds.has(mukemmelBadgeId)) {
        await awardBadge(mukemmelBadgeId);
      }
      if (!earnedIds.has('profesor')) {
        await awardBadge('profesor');
      }
    }

    // --- First quiz ---
    if (!earnedIds.has('ilk_adim')) {
      await awardBadge('ilk_adim');
    }

    // --- Hardworker: 50+ quizzes (approx by total_correct / avg questions per quiz) ---
    if (profile.total_correct >= 50 && !earnedIds.has('caliskan_ari')) {
      await awardBadge('caliskan_ari');
    }

    // --- Knowledge base: 1000 questions ---
    if (profile.total_correct >= 1000 && !earnedIds.has('bilgi_deposu')) {
      await awardBadge('bilgi_deposu');
    }
  }, [user, awardBadge]);

  return { checkAfterQuiz, awardBadge };
}
