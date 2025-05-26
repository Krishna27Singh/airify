
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, Filter, TrendingUp } from 'lucide-react';

const AQITrendsChart = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [chartType, setChartType] = useState('line');

  // Mock data for different time ranges
  const generateData = (range) => {
    const data = [];
    let days;
    
    switch (range) {
      case 'day':
        days = 24;
        for (let i = 0; i < days; i++) {
          data.push({
            time: `${i}:00`,
            aqi: Math.floor(Math.random() * 100) + 30,
            pm25: Math.floor(Math.random() * 30) + 10,
            pm10: Math.floor(Math.random() * 50) + 20
          });
        }
        break;
      case 'week':
        days = 7;
        const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        for (let i = 0; i < days; i++) {
          data.push({
            time: weekDays[i],
            aqi: Math.floor(Math.random() * 100) + 30,
            pm25: Math.floor(Math.random() * 30) + 10,
            pm10: Math.floor(Math.random() * 50) + 20
          });
        }
        break;
      case 'month':
        days = 30;
        for (let i = 1; i <= days; i++) {
          data.push({
            time: `${i}`,
            aqi: Math.floor(Math.random() * 100) + 30,
            pm25: Math.floor(Math.random() * 30) + 10,
            pm10: Math.floor(Math.random() * 50) + 20
          });
        }
        break;
      default:
        break;
    }
    return data;
  };

  const data = generateData(timeRange);

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#10b981';
    if (aqi <= 100) return '#f59e0b';
    if (aqi <= 150) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="mr-2 text-blue-500" size={24} />
          <h3 className="text-2xl font-bold text-gray-800">AQI Trends</h3>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="text-gray-600" size={16} />
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="day">Last 24 Hours</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-gray-600" size={16} />
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="line">Line Chart</option>
              <option value="bar">Bar Chart</option>
            </select>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="aqi" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="pm25" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="pm10" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="aqi" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center mt-4 gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">AQI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">PM2.5</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-sm text-gray-600">PM10</span>
        </div>
      </div>
    </div>
  );
};

export default AQITrendsChart;
