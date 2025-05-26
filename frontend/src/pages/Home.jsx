
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wind, BarChart3, Users, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Breathe Better with Airify
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Real-time air quality monitoring, weather insights, and community-driven environmental awareness. 
              Track pollution levels, get health recommendations, and connect with your community.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View Dashboard
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/community"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-100">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Wind className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Real-time Monitoring</h3>
            <p className="text-gray-600">
              Track air quality index, pollutant levels, and weather conditions in real-time for your location.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-purple-100">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Analytics</h3>
            <p className="text-gray-600">
              Comprehensive charts and trends to understand air quality patterns and make informed decisions.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-green-100">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Reports</h3>
            <p className="text-gray-600">
              Share and view community-reported air quality issues to build environmental awareness together.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Monitoring Your Air Quality Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust Airify for accurate, real-time environmental data.
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Shield size={20} />
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
