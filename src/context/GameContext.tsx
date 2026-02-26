import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

export interface Settings {
  soundEnabled: boolean;
  timerEnabled: boolean;
  presentationMode: boolean;
  darkMode: boolean;
}

export interface AnswerRecord {
  questionId: string;
  question: string;
  selectedIndex: number;
  correctIndex: number;
  correct: boolean;
  options: string[];
  explanation: string;
}

interface GameState {
  totalScore: number;
  totalCorrect: number;
  totalWrong: number;
  streak: number;
  bestStreak: number;
  badges: Badge[];
  settings: Settings;
}

interface GameContextType extends GameState {
  addScore: (points: number) => void;
  addCorrect: () => void;
  addWrong: () => void;
  resetStreak: () => void;
  incrementStreak: () => void;
  earnBadge: (id: string) => boolean;
  updateSettings: (s: Partial<Settings>) => void;
  resetStats: () => void;
}

const DEFAULT_BADGES: Badge[] = [
  { id: 'bronze_math', name: 'Bronz Matematikçi', icon: '🥉', description: '10 matematik sorusu doğru', earned: false },
  { id: 'silver_math', name: 'Gümüş Matematikçi', icon: '🥈', description: '25 matematik sorusu doğru', earned: false },
  { id: 'gold_math', name: 'Altın Matematikçi', icon: '🥇', description: '50 matematik sorusu doğru', earned: false },
  { id: 'serial_killer', name: 'Seri Katil', icon: '🔥', description: '10 doğru üst üste', earned: false },
  { id: 'speed_master', name: 'Hız Ustası', icon: '⚡', description: '5 saniyeden kısa sürede cevapla', earned: false },
  { id: 'bookworm', name: 'Kitap Kurdu', icon: '📚', description: '10 Türkçe sorusu doğru', earned: false },
  { id: 'scientist', name: 'Bilim İnsanı', icon: '🔬', description: '10 Fen sorusu doğru', earned: false },
  { id: 'historian', name: 'Tarihçi', icon: '🏛️', description: '10 Tarih sorusu doğru', earned: false },
];

const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
  timerEnabled: true,
  presentationMode: false,
  darkMode: false,
};

const STORAGE_KEY = 'quiz-app-state';

function loadState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...parsed,
        badges: DEFAULT_BADGES.map(b => ({
          ...b,
          earned: parsed.badges?.find((pb: Badge) => pb.id === b.id)?.earned || false,
        })),
        settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
      };
    }
  } catch {}
  return {
    totalScore: 0, totalCorrect: 0, totalWrong: 0, streak: 0, bestStreak: 0,
    badges: DEFAULT_BADGES, settings: DEFAULT_SETTINGS,
  };
}

function saveState(state: GameState) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(loadState);

  useEffect(() => { saveState(state); }, [state]);

  useEffect(() => {
    if (state.settings.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [state.settings.darkMode]);

  useEffect(() => {
    if (state.settings.presentationMode) document.documentElement.classList.add('presentation-mode');
    else document.documentElement.classList.remove('presentation-mode');
  }, [state.settings.presentationMode]);

  const addScore = useCallback((points: number) => setState(s => ({ ...s, totalScore: s.totalScore + points })), []);
  const addCorrect = useCallback(() => setState(s => ({ ...s, totalCorrect: s.totalCorrect + 1 })), []);
  const addWrong = useCallback(() => setState(s => ({ ...s, totalWrong: s.totalWrong + 1 })), []);
  const resetStreak = useCallback(() => setState(s => ({ ...s, streak: 0 })), []);
  const incrementStreak = useCallback(() => setState(s => {
    const newStreak = s.streak + 1;
    return { ...s, streak: newStreak, bestStreak: Math.max(newStreak, s.bestStreak) };
  }), []);

  const earnBadge = useCallback((id: string): boolean => {
    let wasNew = false;
    setState(s => {
      const badges = s.badges.map(b => {
        if (b.id === id && !b.earned) { wasNew = true; return { ...b, earned: true }; }
        return b;
      });
      return { ...s, badges };
    });
    return wasNew;
  }, []);

  const updateSettings = useCallback((partial: Partial<Settings>) => {
    setState(s => ({ ...s, settings: { ...s.settings, ...partial } }));
  }, []);

  const resetStats = useCallback(() => {
    setState(s => ({
      totalScore: 0, totalCorrect: 0, totalWrong: 0, streak: 0, bestStreak: 0,
      badges: DEFAULT_BADGES, settings: s.settings,
    }));
  }, []);

  return (
    <GameContext.Provider value={{
      ...state, addScore, addCorrect, addWrong, resetStreak, incrementStreak,
      earnBadge, updateSettings, resetStats,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
