
import React from 'react';
import UserReporting from '../components/UserReporting';
import { Users, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

const Community = () => {
  const recentReports = [
    { id: 1, location: "Downtown SF", type: "Industrial Pollution", status: "verified", time: "2 hours ago" },
    { id: 2, location: "Mission District", type: "Vehicle Emissions", status: "pending", time: "4 hours ago" },
    { id: 3, location: "Golden Gate Park", type: "Good Air Quality", status: "verified", time: "6 hours ago" },
    { id: 4, location: "SOMA", type: "Construction Dust", status: "verified", time: "8 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Community Reports
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Help build environmental awareness by sharing air quality observations in your area. 
            Together, we can create a comprehensive picture of our air quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <div className="order-2 lg:order-1">
            <UserReporting />
          </div>

          {/* Recent Reports */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
              <div className="flex items-center mb-6">
                <Users className="mr-2 text-emerald-500" size={24} />
                <h3 className="text-2xl font-bold text-gray-800">Recent Community Reports</h3>
              </div>

              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-gray-500 mt-1" size={16} />
                        <div>
                          <h4 className="font-semibold text-gray-800">{report.location}</h4>
                          <p className="text-gray-600 text-sm">{report.type}</p>
                          <p className="text-gray-500 text-xs mt-1">{report.time}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'verified' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {report.status === 'verified' ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                        {report.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Community Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">1,247</div>
            <div className="text-gray-600">Total Reports</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">892</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-teal-600 mb-2">156</div>
            <div className="text-gray-600">Locations Monitored</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
