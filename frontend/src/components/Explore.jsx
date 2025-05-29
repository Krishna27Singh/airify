
import React, { useState, useContext, createContext } from "react";
import { BookOpen, Brain, Lightbulb, Play, Trophy, Award, Star } from "lucide-react";
import Learn from "../components/Learn";
import Quizzes from "../components/Quizzes";
import Scenarios from "../components/Scenarios";
import Videos from "../components/Videos";
import BadgeSystem from "../components/BadgeSystem";

// Create a context for managing badges and achievements
export const BadgeContext = createContext();

const Explore = () => {
  const [activeTab, setActiveTab] = useState('learn');
  const [badges, setBadges] = useState([]);
  const [achievements, setAchievements] = useState({
    quizzesCompleted: 0,
    scenariosCompleted: 0,
    videosWatched: 0,
    perfectQuizzes: 0,
    streakDays: 0
  });

  const addBadge = (badgeId, badgeName, badgeDescription, badgeIcon, badgeColor) => {
    const newBadge = {
      id: badgeId,
      name: badgeName,
      description: badgeDescription,
      icon: badgeIcon,
      color: badgeColor,
      earnedAt: new Date().toISOString()
    };
    
    setBadges(prev => {
      if (prev.find(badge => badge.id === badgeId)) return prev;
      return [...prev, newBadge];
    });
  };

  const updateAchievements = (type, increment = 1) => {
    setAchievements(prev => ({
      ...prev,
      [type]: prev[type] + increment
    }));
  };

  const tabs = [
    { id: 'learn', name: 'Learn', icon: <BookOpen className="w-5 h-5" />, component: Learn },
    { id: 'quizzes', name: 'Quizzes', icon: <Brain className="w-5 h-5" />, component: Quizzes },
    { id: 'scenarios', name: 'Scenarios', icon: <Lightbulb className="w-5 h-5" />, component: Scenarios },
    { id: 'videos', name: 'Videos', icon: <Play className="w-5 h-5" />, component: Videos },
    { id: 'badges', name: 'My Badges', icon: <Trophy className="w-5 h-5" />, component: BadgeSystem }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <BadgeContext.Provider value={{ badges, addBadge, achievements, updateAchievements }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          {/* Enhanced Header */}
          <div className="text-center mb-12 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < achievements.perfectQuizzes ? 'text-yellow-400 fill-current' : 'text-gray-300'} animate-pulse`} style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              🌬️ Air Quality Academy
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
              Master air quality knowledge through interactive learning, challenging quizzes, 
              real-world scenarios, and engaging videos. Earn badges and become an air quality expert!
            </p>
            
            {/* Achievement Summary */}
            <div className="flex justify-center space-x-6 text-sm text-gray-600 bg-white/80 backdrop-blur rounded-xl p-4 inline-block">
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span>{badges.length} Badges</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4 text-purple-500" />
                <span>{achievements.quizzesCompleted} Quizzes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lightbulb className="w-4 h-4 text-orange-500" />
                <span>{achievements.scenariosCompleted} Scenarios</span>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 group ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white shadow-xl scale-105 transform'
                    : 'bg-white/90 backdrop-blur text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:scale-105 hover:shadow-lg'
                }`}
              >
                <div className={`p-1 rounded-lg ${activeTab === tab.id ? 'bg-white/20' : 'bg-gradient-to-r from-blue-100 to-purple-100'}`}>
                  {tab.icon}
                </div>
                <span>{tab.name}</span>
                {tab.id === 'badges' && badges.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {badges.length}
                  </div>
                )}
                <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 ${activeTab === tab.id ? 'shadow-lg shadow-purple-500/25' : ''}`}></div>
              </button>
            ))}
          </div>

          {/* Content Area with Enhanced Animation */}
          <div className="animate-fade-in">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>
    </BadgeContext.Provider>
  );
};

export default Explore;
