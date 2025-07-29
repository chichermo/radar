"use client";

import React, { useState, useEffect, createContext, useContext } from 'react';
import { Trophy, Star, Target, Eye, Camera, Satellite, Zap, Crown, Medal, Award, Gift } from 'lucide-react';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'observations' | 'discoveries' | 'exploration' | 'social' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface UserProfile {
  level: number;
  experience: number;
  experienceToNext: number;
  achievements: Achievement[];
  badges: Badge[];
  totalPoints: number;
  rank: string;
  streak: number;
  lastLogin: Date;
}

interface GamificationContextType {
  userProfile: UserProfile;
  unlockAchievement: (id: string) => void;
  addExperience: (amount: number) => void;
  unlockBadge: (id: string) => void;
  getProgress: () => number;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};

const defaultAchievements: Achievement[] = [
  {
    id: 'first_observation',
    name: 'Primera Observación',
    description: 'Completa tu primera observación astronómica',
    icon: 'Eye',
    category: 'observations',
    rarity: 'common',
    points: 10,
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'discovery_master',
    name: 'Maestro Descubridor',
    description: 'Descubre 10 objetos astronómicos',
    icon: 'Star',
    category: 'discoveries',
    rarity: 'rare',
    points: 50,
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'telescope_expert',
    name: 'Experto Telescópico',
    description: 'Utiliza todos los instrumentos disponibles',
    icon: 'Satellite',
    category: 'exploration',
    rarity: 'epic',
    points: 100,
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'cosmic_explorer',
    name: 'Explorador Cósmico',
    description: 'Explora 50 objetos diferentes',
    icon: 'Satellite',
    category: 'exploration',
    rarity: 'legendary',
    points: 500,
    unlocked: false,
    progress: 0,
    maxProgress: 50
  },
  {
    id: 'photo_enthusiast',
    name: 'Entusiasta Fotográfico',
    description: 'Captura 25 imágenes astronómicas',
    icon: 'Camera',
    category: 'observations',
    rarity: 'rare',
    points: 75,
    unlocked: false,
    progress: 0,
    maxProgress: 25
  },
  {
    id: 'streak_master',
    name: 'Maestro de Racha',
    description: 'Mantén una racha de 7 días',
    icon: 'Zap',
    category: 'social',
    rarity: 'epic',
    points: 150,
    unlocked: false,
    progress: 0,
    maxProgress: 7
  }
];

const defaultBadges: Badge[] = [
  {
    id: 'newcomer',
    name: 'Recién Llegado',
    description: 'Comienza tu viaje astronómico',
    icon: 'Star',
    color: 'text-blue-400',
    unlocked: true,
    unlockedAt: new Date()
  },
  {
    id: 'observer',
    name: 'Observador',
    description: 'Completa 10 observaciones',
    icon: 'Eye',
    color: 'text-green-400',
    unlocked: false
  },
  {
    id: 'discoverer',
    name: 'Descubridor',
    description: 'Haz 5 descubrimientos',
    icon: 'Satellite',
    color: 'text-purple-400',
    unlocked: false
  },
  {
    id: 'explorer',
    name: 'Explorador',
    description: 'Alcanza el nivel 10',
    icon: 'Satellite',
    color: 'text-gold-400',
    unlocked: false
  },
  {
    id: 'master',
    name: 'Maestro',
    description: 'Desbloquea todos los logros',
    icon: 'Crown',
    color: 'text-red-400',
    unlocked: false
  }
];

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    level: 1,
    experience: 0,
    experienceToNext: 100,
    achievements: defaultAchievements,
    badges: defaultBadges,
    totalPoints: 0,
    rank: 'Novato',
    streak: 0,
    lastLogin: new Date()
  });

  const calculateLevel = (experience: number) => {
    return Math.floor(experience / 100) + 1;
  };

  const calculateExperienceToNext = (level: number) => {
    return level * 100;
  };

  const unlockAchievement = (id: string) => {
    setUserProfile(prev => {
      const achievement = prev.achievements.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        const updatedAchievements = prev.achievements.map(a =>
          a.id === id ? { ...a, unlocked: true, unlockedAt: new Date() } : a
        );
        
        const newExperience = prev.experience + achievement.points;
        const newLevel = calculateLevel(newExperience);
        const newExperienceToNext = calculateExperienceToNext(newLevel);
        
        return {
          ...prev,
          achievements: updatedAchievements,
          experience: newExperience,
          level: newLevel,
          experienceToNext: newExperienceToNext,
          totalPoints: prev.totalPoints + achievement.points
        };
      }
      return prev;
    });
  };

  const addExperience = (amount: number) => {
    setUserProfile(prev => {
      const newExperience = prev.experience + amount;
      const newLevel = calculateLevel(newExperience);
      const newExperienceToNext = calculateExperienceToNext(newLevel);
      
      return {
        ...prev,
        experience: newExperience,
        level: newLevel,
        experienceToNext: newExperienceToNext
      };
    });
  };

  const unlockBadge = (id: string) => {
    setUserProfile(prev => {
      const badge = prev.badges.find(b => b.id === id);
      if (badge && !badge.unlocked) {
        const updatedBadges = prev.badges.map(b =>
          b.id === id ? { ...b, unlocked: true, unlockedAt: new Date() } : b
        );
        
        return {
          ...prev,
          badges: updatedBadges
        };
      }
      return prev;
    });
  };

  const getProgress = () => {
    const currentLevelExp = userProfile.experience - ((userProfile.level - 1) * 100);
    const levelExpNeeded = userProfile.experienceToNext - ((userProfile.level - 1) * 100);
    return (currentLevelExp / levelExpNeeded) * 100;
  };

  // Check for achievement unlocks
  useEffect(() => {
    const checkAchievements = () => {
      // Example: Check if user has made observations
      const observationCount = 5; // This would come from actual data
      const achievement = userProfile.achievements.find(a => a.id === 'first_observation');
      
      if (achievement && !achievement.unlocked && observationCount >= 1) {
        unlockAchievement('first_observation');
      }
    };

    checkAchievements();
  }, [userProfile.achievements]);

  return (
    <GamificationContext.Provider
      value={{
        userProfile,
        unlockAchievement,
        addExperience,
        unlockBadge,
        getProgress
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400 bg-gray-400/10';
      case 'rare':
        return 'border-blue-400 bg-blue-400/10';
      case 'epic':
        return 'border-purple-400 bg-purple-400/10';
      case 'legendary':
        return 'border-gold-400 bg-gold-400/10';
      default:
        return 'border-gray-400 bg-gray-400/10';
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye':
        return <Eye className="h-6 w-6" />;
      case 'Star':
        return <Star className="h-6 w-6" />;
      case 'Satellite':
        return <Satellite className="h-6 w-6" />;
      case 'Camera':
        return <Camera className="h-6 w-6" />;
      case 'Zap':
        return <Zap className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border transition-all ${
      achievement.unlocked 
        ? 'opacity-100' 
        : 'opacity-60'
    } ${getRarityColor(achievement.rarity)}`}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          achievement.unlocked ? 'bg-white/20' : 'bg-gray-600/20'
        }`}>
          {getIcon(achievement.icon)}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-white">{achievement.name}</h4>
          <p className="text-xs text-gray-400">{achievement.description}</p>
          {achievement.maxProgress && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Progreso</span>
                <span>{achievement.progress || 0}/{achievement.maxProgress}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1">
                <div 
                  className="bg-blue-500 h-1 rounded-full transition-all"
                  style={{ width: `${((achievement.progress || 0) / achievement.maxProgress) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-white">{achievement.points}</div>
          <div className="text-xs text-gray-400">pts</div>
        </div>
      </div>
    </div>
  );
};

export const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Star':
        return <Star className="h-5 w-5" />;
      case 'Eye':
        return <Eye className="h-5 w-5" />;
      case 'Satellite':
        return <Satellite className="h-5 w-5" />;
      case 'Crown':
        return <Crown className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  return (
    <div className={`p-3 rounded-lg border transition-all ${
      badge.unlocked 
        ? 'opacity-100 border-current' 
        : 'opacity-40 border-gray-600'
    } ${badge.color}`}>
      <div className="text-center">
        <div className="mb-2">
          {getIcon(badge.icon)}
        </div>
        <h4 className="text-xs font-medium">{badge.name}</h4>
        <p className="text-xs opacity-75">{badge.description}</p>
      </div>
    </div>
  );
};

export const GamificationDashboard: React.FC = () => {
  const { userProfile, getProgress } = useGamification();

  return (
    <div className="space-y-6">
      {/* Perfil del usuario */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-gradient-to-r from-gold-600/20 to-yellow-600/20 rounded-xl border border-gold-500/30">
            <Crown className="h-8 w-8 text-gold-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Perfil de Usuario</h2>
            <p className="text-gray-400">Nivel {userProfile.level} • {userProfile.rank}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">{userProfile.level}</div>
            <div className="text-sm text-gray-400">Nivel</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">{userProfile.experience}</div>
            <div className="text-sm text-gray-400">Experiencia</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">{userProfile.totalPoints}</div>
            <div className="text-sm text-gray-400">Puntos</div>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className="text-2xl font-bold text-white">{userProfile.streak}</div>
            <div className="text-sm text-gray-400">Racha</div>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progreso al siguiente nivel</span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-gold-500 to-yellow-500 h-3 rounded-full transition-all"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {userProfile.experience} / {userProfile.experienceToNext} XP
          </div>
        </div>
      </div>

      {/* Logros */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Logros</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProfile.achievements.map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Insignias */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Insignias</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {userProfile.badges.map(badge => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
    </div>
  );
}; 