import React, { useContext } from 'react';
import { Brain, Lightbulb, Play, Trophy, Award, Star, Shield, Target, Zap, Crown, Medal } from 'lucide-react';
import { BadgeContext } from './Explore';

const BadgeSystem = () => {
  const { badges, achievements } = useContext(BadgeContext);

  const availableBadges = [
    {
      id: 'first-quiz',
      name: 'Quiz Starter',
      description: 'Complete your first quiz',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-blue-400 to-blue-600',
      requirement: 'Complete 1 quiz'
    },
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      description: 'Complete 5 quizzes',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-purple-400 to-purple-600',
      requirement: 'Complete 5 quizzes'
    },
    {
      id: 'perfect-score',
      name: 'Perfect Scholar',
      description: 'Get 100% on a quiz',
      icon: <Star className="w-8 h-8" />,
      color: 'from-yellow-400 to-yellow-600',
      requirement: 'Score 100% on any quiz'
    },
    {
      id: 'scenario-solver',
      name: 'Scenario Solver',
      description: 'Complete 3 scenarios',
      icon: <Lightbulb className="w-8 h-8" />,
      color: 'from-orange-400 to-orange-600',
      requirement: 'Complete 3 scenarios'
    },
    {
      id: 'air-quality-expert',
      name: 'Air Quality Expert',
      description: 'Complete all learning modules',
      icon: <Shield className="w-8 h-8" />,
      color: 'from-green-400 to-green-600',
      requirement: 'Read all learning content'
    },
    {
      id: 'video-watcher',
      name: 'Knowledge Seeker',
      description: 'Watch 5 educational videos',
      icon: <Play className="w-8 h-8" />,
      color: 'from-red-400 to-red-600',
      requirement: 'Watch 5 videos'
    },
    {
      id: 'streak-master',
      name: 'Consistency King',
      description: 'Complete activities for 7 days',
      icon: <Target className="w-8 h-8" />,
      color: 'from-indigo-400 to-indigo-600',
      requirement: '7-day learning streak'
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete a quiz in under 2 minutes',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-cyan-400 to-cyan-600',
      requirement: 'Fast quiz completion'
    },
    {
      id: 'pollution-pro',
      name: 'Pollution Pro',
      description: 'Master all quiz categories',
      icon: <Crown className="w-8 h-8" />,
      color: 'from-pink-400 to-pink-600',
      requirement: 'Complete advanced content'
    },
    {
      id: 'environmental-hero',
      name: 'Environmental Hero',
      description: 'Complete everything with excellence',
      icon: <Medal className="w-8 h-8" />,
      color: 'from-emerald-400 to-emerald-600',
      requirement: 'Ultimate achievement'
    }
  ];

  const earnedBadgeIds = badges.map(badge => badge.id);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">🏆 My Badge Collection</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Showcase your air quality knowledge achievements! Keep learning to unlock more badges.
        </p>
        
        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{badges.length}</div>
              <div className="text-sm opacity-90">Badges Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{achievements.quizzesCompleted}</div>
              <div className="text-sm opacity-90">Quizzes Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{achievements.scenariosCompleted}</div>
              <div className="text-sm opacity-90">Scenarios Solved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.round((badges.length / availableBadges.length) * 100)}%</div>
              <div className="text-sm opacity-90">Collection Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      {badges.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
            Earned Badges ({badges.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="bg-white rounded-xl p-6 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-bl-3xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${badge.color} flex items-center justify-center mb-4 mx-auto`}>
                  {badge.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-800 text-center mb-2">{badge.name}</h4>
                <p className="text-gray-600 text-center mb-3">{badge.description}</p>
                <p className="text-xs text-gray-500 text-center">
                  Earned: {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Badges */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Target className="w-6 h-6 text-gray-500 mr-2" />
          Available Badges ({availableBadges.length - badges.length} remaining)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableBadges.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-xl p-6 border-2 transition-all duration-300 ${
                  isEarned
                    ? 'bg-gray-100 border-gray-300'
                    : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg transform hover:-translate-y-1'
                }`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${isEarned ? 'from-gray-300 to-gray-400' : badge.color} flex items-center justify-center mb-4 mx-auto ${!isEarned && 'animate-pulse'}`}>
                  <div className={isEarned ? 'text-gray-500' : 'text-white'}>
                    {badge.icon}
                  </div>
                </div>
                <h4 className={`text-xl font-bold text-center mb-2 ${isEarned ? 'text-gray-500' : 'text-gray-800'}`}>
                  {badge.name}
                </h4>
                <p className={`text-center mb-3 ${isEarned ? 'text-gray-400' : 'text-gray-600'}`}>
                  {badge.description}
                </p>
                <p className={`text-xs text-center ${isEarned ? 'text-gray-400' : 'text-purple-600 font-medium'}`}>
                  {isEarned ? '✓ Completed' : badge.requirement}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BadgeSystem;
