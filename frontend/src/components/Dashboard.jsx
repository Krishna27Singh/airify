
import React, { useState, useEffect } from 'react';
import AQICard from './AQICard';
import PollutantCard from './PollutantCard';
import HealthRecommendations from './HealthRecommendations';
import AQITrendsChart from './AQITrendsChart';
import WeatherCorrelation from './WeatherCorrelation';
import { Wind, Thermometer, Droplets, Eye, Activity, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [currentData, setCurrentData] = useState({
    aqi: 78,
    location: "San Francisco, CA",
    temperature: 22,
    humidity: 65,
    visibility: 8.5,
    windSpeed: 12,
    pollutants: {
      pm25: 15.2,
      pm10: 24.8,
      o3: 45.3,
      no2: 18.7,
      co: 0.6
    },
    lastUpdated: new Date()
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prev => ({
        ...prev,
        aqi: Math.max(0, Math.min(300, prev.aqi + (Math.random() - 0.5) * 10)),
        pollutants: {
          pm25: Math.max(0, prev.pollutants.pm25 + (Math.random() - 0.5) * 2),
          pm10: Math.max(0, prev.pollutants.pm10 + (Math.random() - 0.5) * 3),
          o3: Math.max(0, prev.pollutants.o3 + (Math.random() - 0.5) * 5),
          no2: Math.max(0, prev.pollutants.no2 + (Math.random() - 0.5) * 2),
          co: Math.max(0, prev.pollutants.co + (Math.random() - 0.5) * 0.1)
        },
        lastUpdated: new Date()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Air Quality Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Real-time Environmental Monitoring</p>
          <div className="text-sm text-gray-500 mt-2 flex items-center justify-center gap-2">
            <Activity className="text-green-500" size={16} />
            Last updated: {currentData.lastUpdated.toLocaleTimeString()}
          </div>
        </div>

        {/* Main AQI Display */}
        <div className="mb-8 animate-scale-in">
          <AQICard aqi={currentData.aqi} location={currentData.location} />
        </div>

        {/* Weather Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-orange-100 to-red-100 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-medium">Temperature</p>
                <p className="text-3xl font-bold text-orange-800">{currentData.temperature}°C</p>
                <div className="mt-2 w-full bg-orange-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((currentData.temperature / 40) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <Thermometer className="text-orange-600" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium">Humidity</p>
                <p className="text-3xl font-bold text-blue-800">{currentData.humidity}%</p>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${currentData.humidity}%` }}
                  ></div>
                </div>
              </div>
              <Droplets className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-100 to-slate-100 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-medium">Wind Speed</p>
                <p className="text-3xl font-bold text-gray-800">{currentData.windSpeed} km/h</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-gray-400 to-slate-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((currentData.windSpeed / 30) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <Wind className="text-gray-600" size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-violet-100 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-medium">Visibility</p>
                <p className="text-3xl font-bold text-purple-800">{currentData.visibility} km</p>
                <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-violet-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((currentData.visibility / 15) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <Eye className="text-purple-600" size={32} />
            </div>
          </div>
        </div>

        {/* Charts and Weather Correlation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <AQITrendsChart />
          <WeatherCorrelation currentData={currentData} />
        </div>

        {/* Pollutants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <PollutantCard 
            name="PM2.5" 
            value={currentData.pollutants.pm25.toFixed(1)} 
            unit="μg/m³"
            description="Fine particulate matter"
            color="from-red-400 to-rose-600"
          />
          <PollutantCard 
            name="PM10" 
            value={currentData.pollutants.pm10.toFixed(1)} 
            unit="μg/m³"
            description="Coarse particulate matter"
            color="from-orange-400 to-amber-600"
          />
          <PollutantCard 
            name="O₃" 
            value={currentData.pollutants.o3.toFixed(1)} 
            unit="μg/m³"
            description="Ground-level ozone"
            color="from-blue-400 to-cyan-600"
          />
          <PollutantCard 
            name="NO₂" 
            value={currentData.pollutants.no2.toFixed(1)} 
            unit="μg/m³"
            description="Nitrogen dioxide"
            color="from-yellow-400 to-orange-600"
          />
          <PollutantCard 
            name="CO" 
            value={currentData.pollutants.co.toFixed(1)} 
            unit="mg/m³"
            description="Carbon monoxide"
            color="from-gray-400 to-slate-600"
          />
          <div className="bg-gradient-to-br from-emerald-100 to-green-100 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-emerald-800">Overall Status</h3>
              <TrendingUp className="text-emerald-600" size={24} />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-700 mb-2">
                {currentData.aqi <= 50 ? 'Good' : currentData.aqi <= 100 ? 'Moderate' : 'Unhealthy'}
              </div>
              <p className="text-emerald-600 text-sm">Air quality assessment</p>
            </div>
          </div>
        </div>

        {/* Health Recommendations */}
        <div className="mb-8">
          <HealthRecommendations aqi={currentData.aqi} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
