"use client";

import React, { useState } from 'react';
import { Trophy, Star, Target, Eye, Camera, Satellite, Zap, Crown, Medal, Award, Gift, TrendingUp, Calendar, Users, Activity } from 'lucide-react';
import { GamificationDashboard, useGamification } from '@/components/GamificationSystem';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card2';

export default function GamificationPage() {
  const { userProfile, unlockAchievement, addExperience, unlockBadge } = useGamification();
  const [activeTab, setActiveTab] = useState('overview');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'text-gray-400';
      case 'rare':
        return 'text-blue-400';
      case 'epic':
        return 'text-purple-400';
      case 'legendary':
        return 'text-gold-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRankInfo = (level: number) => {
    if (level < 5) return { name: 'Novato', color: 'text-gray-400', icon: Star };
    if (level < 10) return { name: 'Explorador', color: 'text-blue-400', icon: Eye };
    if (level < 20) return { name: 'Observador', color: 'text-green-400', icon: Satellite };
    if (level < 30) return { name: 'Descubridor', color: 'text-purple-400', icon: Satellite };
    if (level < 50) return { name: 'Maestro', color: 'text-gold-400', icon: Crown };
    return { name: 'Leyenda', color: 'text-red-400', icon: Trophy };
  };

  const rankInfo = getRankInfo(userProfile.level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-gold-600/20 to-yellow-600/20 rounded-xl border border-gold-500/30">
              <Trophy className="h-8 w-8 text-gold-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Gamificación</h1>
              <p className="text-gray-400">Tu progreso y logros en el sistema</p>
            </div>
          </div>
        </div>

        {/* Perfil del usuario */}
        <Card className="bg-gradient-to-r from-gold-600/10 to-yellow-600/10 border-gold-500/30 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-gold-600/20 to-yellow-600/20 rounded-xl border border-gold-500/30">
                  <rankInfo.icon className="h-8 w-8 text-gold-400" />
                </div>
                <div>
                  <CardTitle className="text-white">Perfil de Usuario</CardTitle>
                  <CardDescription className="text-gray-400">
                    Nivel {userProfile.level} • {rankInfo.name}
                  </CardDescription>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{userProfile.totalPoints}</div>
                <div className="text-sm text-gray-400">Puntos totales</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-white">{userProfile.level}</div>
                <div className="text-sm text-gray-400">Nivel</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-white">{userProfile.experience}</div>
                <div className="text-sm text-gray-400">Experiencia</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-white">{userProfile.streak}</div>
                <div className="text-sm text-gray-400">Racha (días)</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <div className="text-3xl font-bold text-white">
                  {userProfile.achievements.filter(a => a.unlocked).length}
                </div>
                <div className="text-sm text-gray-400">Logros</div>
              </div>
            </div>

            {/* Barra de progreso */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progreso al siguiente nivel</span>
                <span>{Math.round((userProfile.experience % 100) / 100 * 100)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-gold-500 to-yellow-500 h-3 rounded-full transition-all"
                  style={{ width: `${(userProfile.experience % 100) / 100 * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {userProfile.experience % 100} / 100 XP para el siguiente nivel
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pestañas */}
        <div className="flex space-x-1 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1">
          {[
            { id: 'overview', name: 'Resumen', icon: Activity },
            { id: 'achievements', name: 'Logros', icon: Trophy },
            { id: 'badges', name: 'Insignias', icon: Medal },
            { id: 'statistics', name: 'Estadísticas', icon: TrendingUp },
            { id: 'leaderboard', name: 'Clasificación', icon: Users }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Contenido de las pestañas */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Logros recientes */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Logros Recientes</CardTitle>
                <CardDescription className="text-gray-400">
                  Últimos logros desbloqueados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userProfile.achievements
                    .filter(a => a.unlocked)
                    .slice(0, 3)
                    .map(achievement => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className={`p-2 rounded-lg ${getRarityColor(achievement.rarity)}`}>
                        <Trophy className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{achievement.name}</div>
                        <div className="text-xs text-gray-400">{achievement.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">{achievement.points}</div>
                        <div className="text-xs text-gray-400">pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Insignias destacadas */}
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Insignias Destacadas</CardTitle>
                <CardDescription className="text-gray-400">
                  Tus insignias más importantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {userProfile.badges
                    .filter(b => b.unlocked)
                    .slice(0, 4)
                    .map(badge => (
                    <div key={badge.id} className="text-center p-3 bg-white/5 rounded-lg">
                      <div className={`mx-auto mb-2 ${badge.color}`}>
                        <Medal className="h-6 w-6" />
                      </div>
                      <div className="text-xs font-medium text-white">{badge.name}</div>
                      <div className="text-xs text-gray-400">{badge.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'achievements' && (
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Todos los Logros</CardTitle>
              <CardDescription className="text-gray-400">
                Desbloquea todos los logros disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userProfile.achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border transition-all ${
                      achievement.unlocked 
                        ? 'opacity-100' 
                        : 'opacity-60'
                    } ${
                      achievement.rarity === 'common' ? 'border-gray-400 bg-gray-400/10' :
                      achievement.rarity === 'rare' ? 'border-blue-400 bg-blue-400/10' :
                      achievement.rarity === 'epic' ? 'border-purple-400 bg-purple-400/10' :
                      'border-gold-400 bg-gold-400/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.unlocked ? 'bg-white/20' : 'bg-gray-600/20'
                      }`}>
                        <Trophy className="h-5 w-5" />
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
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'badges' && (
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Insignias</CardTitle>
              <CardDescription className="text-gray-400">
                Colecciona todas las insignias disponibles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {userProfile.badges.map(badge => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-lg border text-center transition-all ${
                      badge.unlocked 
                        ? 'opacity-100 border-current' 
                        : 'opacity-40 border-gray-600'
                    } ${badge.color}`}
                  >
                    <div className="mb-3">
                      <Medal className="h-8 w-8 mx-auto" />
                    </div>
                    <h4 className="text-sm font-medium mb-1">{badge.name}</h4>
                    <p className="text-xs opacity-75">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'statistics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Progreso General</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Logros completados</span>
                      <span className="text-white">
                        {userProfile.achievements.filter(a => a.unlocked).length}/{userProfile.achievements.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(userProfile.achievements.filter(a => a.unlocked).length / userProfile.achievements.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Insignias obtenidas</span>
                      <span className="text-white">
                        {userProfile.badges.filter(b => b.unlocked).length}/{userProfile.badges.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(userProfile.badges.filter(b => b.unlocked).length / userProfile.badges.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Último login</span>
                    <span className="text-sm text-white">
                      {userProfile.lastLogin.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Racha actual</span>
                    <span className="text-sm text-white">{userProfile.streak} días</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Puntos ganados hoy</span>
                    <span className="text-sm text-white">+25</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white">Rangos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Novato', minLevel: 1, maxLevel: 4, color: 'text-gray-400' },
                    { name: 'Explorador', minLevel: 5, maxLevel: 9, color: 'text-blue-400' },
                    { name: 'Observador', minLevel: 10, maxLevel: 19, color: 'text-green-400' },
                    { name: 'Descubridor', minLevel: 20, maxLevel: 29, color: 'text-purple-400' },
                    { name: 'Maestro', minLevel: 30, maxLevel: 49, color: 'text-gold-400' },
                    { name: 'Leyenda', minLevel: 50, maxLevel: 999, color: 'text-red-400' }
                  ].map(rank => (
                    <div key={rank.name} className="flex items-center justify-between">
                      <span className={`text-sm ${rank.color}`}>{rank.name}</span>
                      <span className="text-sm text-gray-400">
                        {rank.minLevel}-{rank.maxLevel === 999 ? '∞' : rank.maxLevel}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <Card className="bg-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-white">Clasificación Global</CardTitle>
              <CardDescription className="text-gray-400">
                Los mejores usuarios del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Astronauta Elite', level: 45, points: 12500, avatar: '👨‍🚀' },
                  { rank: 2, name: 'Cosmic Explorer', level: 38, points: 9800, avatar: '🔭' },
                  { rank: 3, name: 'Star Gazer', level: 32, points: 8200, avatar: '⭐' },
                  { rank: 4, name: 'Space Pioneer', level: 28, points: 7100, avatar: '🚀' },
                  { rank: 5, name: 'Galaxy Hunter', level: 25, points: 6500, avatar: '🌌' }
                ].map((user, index) => (
                  <div key={user.rank} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl">{user.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-white">{user.name}</span>
                        {index < 3 && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            index === 0 ? 'bg-gold-400/20 text-gold-400' :
                            index === 1 ? 'bg-gray-400/20 text-gray-400' :
                            'bg-orange-400/20 text-orange-400'
                          }`}>
                            #{user.rank}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">Nivel {user.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">{user.points.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">puntos</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 