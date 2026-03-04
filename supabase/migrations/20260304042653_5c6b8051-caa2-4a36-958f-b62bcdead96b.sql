
-- GK scores table for tracking GKP and cooldowns
CREATE TABLE public.gk_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  test_id text NOT NULL,
  gkp_earned integer NOT NULL DEFAULT 0,
  questions_answered integer NOT NULL DEFAULT 0,
  completed_at timestamptz NOT NULL DEFAULT now(),
  withdrew boolean NOT NULL DEFAULT false
);

ALTER TABLE public.gk_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own gk scores" ON public.gk_scores
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gk scores" ON public.gk_scores
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Add gkp column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gkp integer NOT NULL DEFAULT 0;

-- Blocked users table
CREATE TABLE public.blocked_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id uuid NOT NULL,
  blocked_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(blocker_id, blocked_id)
);

ALTER TABLE public.blocked_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own blocks" ON public.blocked_users
FOR SELECT TO authenticated USING (auth.uid() = blocker_id);

CREATE POLICY "Users can block others" ON public.blocked_users
FOR INSERT TO authenticated WITH CHECK (auth.uid() = blocker_id);

CREATE POLICY "Users can unblock others" ON public.blocked_users
FOR DELETE TO authenticated USING (auth.uid() = blocker_id);
