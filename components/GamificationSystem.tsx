"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { Trophy, Star, Target, Zap, Eye, Satellite } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  category: 'exploration' | 'observation' | 'discovery' | 'mastery';
}

interface UserStats {
  totalObservations: number;
  objectsDiscovered: number;
  alertsReceived: number;
  timeSpent: number;
  streakDays: number;
  lastLogin: Date;
}

interface GamificationContextType {
  achievements: Achievement[];
  stats: UserStats;
  level: number;
  experience: number;
  unlockAchievement: (id: string) => void;
  addExperience: (amount: number) => void;
  updateStats: (updates: Partial<UserStats>) => void;
  getProgress: (achievementId: string) => number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_observation',
    name: 'Primer Vistazo',
    description: 'Realiza tu primera observacion espacial',
    icon: '👁️',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    category: 'exploration'
  },
  {
    id: 'satellite_master',
    name: 'Maestro de Satelites',
    description: 'Observa 100 satelites diferentes',
    icon: '🛰️',
    unlocked: false,
    progress: 0,
    maxProgress: 100,
    category: 'observation'
  },
  {
    id: 'exoplanet_hunter',
    name: 'Cazador de Exoplanetas',
    description: 'Explora 50 exoplanetas',
    icon: '🌍',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    category: 'discovery'
  },
  {
    id: 'collision_alert',
    name: 'Vigilante Espacial',
    description: 'Recibe 10 alertas de colision',
    icon: '🚨',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    category: 'mastery'
  },
  {
    id: 'week_streak',
    name: 'Constante',
    description: 'Usa la app por 7 dias consecutivos',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    category: 'mastery'
  },
  {
    id: 'space_weather_expert',
    name: 'Experto del Clima Espacial',
    description: 'Monitorea 25 eventos de clima espacial',
    icon: '🌞',
    unlocked: false,
    progress: 0,
    maxProgress: 25,
    category: 'observation'
  }
];

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [stats, setStats] = useState<UserStats>({
    totalObservations: 0,
    objectsDiscovered: 0,
    alertsReceived: 0,
    timeSpent: 0,
    streakDays: 0,
    lastLogin: new Date()
  });
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);

  useEffect(() => {
    const savedAchievements = localStorage.getItem('cosmic-eye-achievements');
    const savedStats = localStorage.getItem('cosmic-eye-stats');
    const savedLevel = localStorage.getItem('cosmic-eye-level');
    const savedExp = localStorage.getItem('cosmic-eye-exp');

    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    if (savedLevel) {
      setLevel(parseInt(savedLevel));
    }
    if (savedExp) {
      setExperience(parseInt(savedExp));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cosmic-eye-achievements', JSON.stringify(achievements));
    localStorage.setItem('cosmic-eye-stats', JSON.stringify(stats));
    localStorage.setItem('cosmic-eye-level', level.toString());
    localStorage.setItem('cosmic-eye-exp', experience.toString());
  }, [achievements, stats, level, experience]);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.id === id && !achievement.unlocked) {
        return {
          ...achievement,
          unlocked: true,
          unlockedAt: new Date(),
          progress: achievement.maxProgress
        };
      }
      return achievement;
    }));
  };

  const addExperience = (amount: number) => {
    const newExp = experience + amount;
    const expNeeded = level * 100;
    
    if (newExp >= expNeeded) {
      setLevel(prev => prev + 1);
      setExperience(newExp - expNeeded);
    } else {
      setExperience(newExp);
    }
  };

  const updateStats = (updates: Partial<UserStats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  const getProgress = (achievementId: string): number => {
    const achievement = achievements.find(a => a.id === achievementId);
    return achievement ? (achievement.progress / achievement.maxProgress) * 100 : 0;
  };

  return (
    <GamificationContext.Provider value={{
      achievements,
      stats,
      level,
      experience,
      unlockAchievement,
      addExperience,
      updateStats,
      getProgress
    }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}

export function AchievementsPanel() {
  const { achievements, stats, level, experience } = useGamification();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exploration': return <Eye className="w-4 h-4" />;
      case 'observation': return <Satellite className="w-4 h-4" />;
      case 'discovery': return <Target className="w-4 h-4" />;
      case 'mastery': return <Trophy className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'exploration': return 'text-blue-500';
      case 'observation': return 'text-green-500';
      case 'discovery': return 'text-purple-500';
      case 'mastery': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Sistema de Logros</h3>
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span className="text-white font-semibold">Nivel {level}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{stats.totalObservations}</div>
          <div className="text-sm text-gray-300">Observaciones</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{stats.objectsDiscovered}</div>
          <div className="text-sm text-gray-300">Descubrimientos</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{stats.alertsReceived}</div>
          <div className="text-sm text-gray-300">Alertas</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-white">{stats.streakDays}</div>
          <div className="text-sm text-gray-300">Dias Seguidos</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>Experiencia</span>
          <span>{experience} / {level * 100} XP</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(experience / (level * 100)) * 100}%` }}
          />
        </div>
      </div>

      {unlockedAchievements.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Logros Desbloqueados</h4>
          <div className="space-y-2">
            {unlockedAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-white">{achievement.name}</div>
                  <div className="text-sm text-gray-300">{achievement.description}</div>
                </div>
                <div className={`${getCategoryColor(achievement.category)}`}>
                  {getCategoryIcon(achievement.category)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {lockedAchievements.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Logros Pendientes</h4>
          <div className="space-y-2">
            {lockedAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="text-2xl opacity-50">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-400">{achievement.name}</div>
                  <div className="text-sm text-gray-500">{achievement.description}</div>
                  <div className="mt-1">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progreso</span>
                      <span>{achievement.progress} / {achievement.maxProgress}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-gray-500">
                  {getCategoryIcon(achievement.category)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 