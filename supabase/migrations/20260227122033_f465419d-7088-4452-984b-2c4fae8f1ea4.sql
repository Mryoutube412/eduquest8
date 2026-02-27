
CREATE TABLE public.completed_tests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  test_id text NOT NULL,
  completed_at timestamptz NOT NULL DEFAULT now(),
  score integer NOT NULL DEFAULT 0,
  correct_count integer NOT NULL DEFAULT 0,
  total_count integer NOT NULL DEFAULT 0
);

ALTER TABLE public.completed_tests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own completed tests" ON public.completed_tests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own completed tests" ON public.completed_tests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_completed_tests_user ON public.completed_tests(user_id);
CREATE INDEX idx_completed_tests_test ON public.completed_tests(user_id, test_id);
