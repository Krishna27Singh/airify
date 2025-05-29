
import React, { useState } from 'react';
import { Play, ExternalLink, BookOpen, Users, Globe } from 'lucide-react';

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videoCategories = [
    { id: 'all', name: 'All Videos', icon: <Globe className="w-4 h-4" /> },
    { id: 'basics', name: 'Air Quality Basics', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'health', name: 'Health Impact', icon: <Users className="w-4 h-4" /> },
    { id: 'protection', name: 'Protection Methods', icon: <Play className="w-4 h-4" /> }
  ];

  const videos = [
    {
      id: 1,
      title: "What is Air Quality Index (AQI)?",
      description: "Learn the basics of AQI and how it's calculated",
      embedId: "3E0BZmWvhG8",
      duration: "4:32",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/3E0BZmWvhG8/maxresdefault.jpg"
    },
    {
      id: 2,
      title: "PM2.5 Explained: The Invisible Threat",
      description: "Understanding particulate matter and its health effects",
      embedId: "GVBeY1jSG9Y",
      duration: "6:15",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/GVBeY1jSG9Y/maxresdefault.jpg"
    },
    {
      id: 3,
      title: "How Air Pollution Affects Your Health",
      description: "The science behind pollution's impact on human body",
      embedId: "qtOoOI6z6Ag",
      duration: "8:45",
      category: "health",
      thumbnail: "https://img.youtube.com/vi/qtOoOI6z6Ag/maxresdefault.jpg"
    },
    {
      id: 4,
      title: "Protecting Yourself from Air Pollution",
      description: "Practical tips to reduce exposure to harmful air",
      embedId: "V3-waqXOJgQ",
      duration: "5:20",
      category: "protection",
      thumbnail: "https://img.youtube.com/vi/V3-waqXOJgQ/maxresdefault.jpg"
    },
    {
      id: 5,
      title: "Indoor Air Quality vs Outdoor Air Quality",
      description: "Comparing and managing air quality in different environments",
      embedId: "KeSUDNOWn9g",
      duration: "7:10",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/KeSUDNOWn9g/maxresdefault.jpg"
    },
    {
      id: 6,
      title: "Air Pollution and Climate Change",
      description: "Understanding the connection between pollution and climate",
      embedId: "jHLl5VgmvUE",
      duration: "9:30",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/jHLl5VgmvUE/maxresdefault.jpg"
    },
    {
      id: 7,
      title: "The Hidden Health Impacts of Air Pollution",
      description: "Long-term effects on cardiovascular and respiratory systems",
      embedId: "MJl1FNPtCU0",
      duration: "11:20",
      category: "health",
      thumbnail: "https://img.youtube.com/vi/MJl1FNPtCU0/maxresdefault.jpg"
    },
    {
      id: 8,
      title: "Air Purifiers: Do They Really Work?",
      description: "Science-based review of air purification technologies",
      embedId: "kH5APw_SLUU",
      duration: "8:15",
      category: "protection",
      thumbnail: "https://img.youtube.com/vi/kH5APw_SLUU/maxresdefault.jpg"
    },
    {
      id: 9,
      title: "Wildfire Smoke and Air Quality",
      description: "How to protect yourself during wildfire season",
      embedId: "IU27Nr3pbgs",
      duration: "6:45",
      category: "protection",
      thumbnail: "https://img.youtube.com/vi/IU27Nr3pbgs/maxresdefault.jpg"
    },
    {
      id: 10,
      title: "Children and Air Pollution",
      description: "Special considerations for protecting young lungs",
      embedId: "7KJp_Ma3Par",
      duration: "7:55",
      category: "health",
      thumbnail: "https://img.youtube.com/vi/7KJp_Ma3Par/maxresdefault.jpg"
    },
    {
      id: 11,
      title: "N95 vs Surgical Masks for Air Pollution",
      description: "Choosing the right mask for different pollution levels",
      embedId: "7ie0dOucyPw",
      duration: "5:40",
      category: "protection",
      thumbnail: "https://img.youtube.com/vi/7ie0dOucyPw/maxresdefault.jpg"
    },
    {
      id: 12,
      title: "Urban Air Quality Solutions",
      description: "How cities are fighting air pollution",
      embedId: "AZIWGNCxWBU",
      duration: "12:30",
      category: "basics",
      thumbnail: "https://img.youtube.com/vi/AZIWGNCxWBU/maxresdefault.jpg"
    }
  ];

  const [playingVideo, setPlayingVideo] = useState(null);

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const openVideo = (videoId) => {
    setPlayingVideo(videoId);
  };

  const closeVideo = () => {
    setPlayingVideo(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Play className="w-8 h-8 text-red-600" />
          <h2 className="text-3xl font-bold text-gray-800">Educational Videos</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Watch engaging videos to deepen your understanding of air quality and its impact on health
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {videoCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-red-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
            }`}
          >
            {category.icon}
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-red-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            {/* Thumbnail */}
            <div className="relative group cursor-pointer" onClick={() => openVideo(video.id)}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = `https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-red-600 rounded-full p-4 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white fill-current" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {video.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {video.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  video.category === 'basics' ? 'bg-blue-100 text-blue-800' :
                  video.category === 'health' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {videoCategories.find(cat => cat.id === video.category)?.name || 'General'}
                </span>
                
                <button
                  onClick={() => openVideo(video.id)}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                >
                  <Play className="w-4 h-4" />
                  <span>Watch</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {videos.find(v => v.id === playingVideo)?.title}
              </h3>
              <div className="flex items-center space-x-2">
                <a
                  href={`https://www.youtube.com/watch?v=${videos.find(v => v.id === playingVideo)?.embedId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>YouTube</span>
                </a>
                <button
                  onClick={closeVideo}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videos.find(v => v.id === playingVideo)?.embedId}?autoplay=1`}
                title={videos.find(v => v.id === playingVideo)?.title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Keep Learning!</h3>
        <p className="text-red-100 mb-6 max-w-2xl mx-auto">
          Understanding air quality through visual content helps you make better decisions for your health. 
          Share these videos with friends and family to spread awareness!
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">📚 Learn Continuously</h4>
            <p>Stay updated with latest air quality research</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">👥 Share Knowledge</h4>
            <p>Help others understand air quality importance</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">🎯 Take Action</h4>
            <p>Apply what you learn to protect your health</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;
