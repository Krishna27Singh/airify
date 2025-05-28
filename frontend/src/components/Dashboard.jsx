import React, { useState, useEffect } from 'react';
import AQICard from './AQICard';
import PollutantCard from './PollutantCard';
import HealthRecommendations from './HealthRecommendations';
import AQITrendsChart from './AQITrendsChart';
import WeatherCorrelation from './WeatherCorrelation';
import { Wind, Thermometer, Droplets, Eye, Activity, TrendingUp, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Dashboard = () => {
  const [currentData, setCurrentData] = useState({
    aqi: 0,
    location: "",
    temperature: 0,
    humidity: 0,
    visibility: 0,
    windSpeed: 0,
    pollutants: {
      pm25: 0,
      pm10: 0,
      o3: 0,
      no2: 0,
      co: 0
    },
    lastUpdated: new Date(),
    coordinates: { lat: 0, lng: 0 }
  });

  const [locationInput, setLocationInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasData, setHasData] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const API_TOKEN = '2d0cb996f45520d273a8e6ebc45c7742225d23b0';

  const fetchAirQualityData = async (location) => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Fetching data for location:', location);
      
      // Check if location is coordinates (lat,lng format)
      const coordPattern = /^-?\d+\.?\d*,-?\d+\.?\d*$/;
      const isCoordinates = coordPattern.test(location.replace(/\s/g, ''));
      
      let url;
      if (isCoordinates) {
        const [lat, lng] = location.split(',').map(coord => coord.trim());
        url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${API_TOKEN}`;
      } else {
        url = `https://api.waqi.info/feed/${encodeURIComponent(location)}/?token=${API_TOKEN}`;
      }
      
      console.log('API URL:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API Response:', data);
      
      if (data.status === 'ok' && data.data) {
        const aqiData = data.data;
        
        // Extract pollutant data safely
        const pollutants = {
          pm25: aqiData.iaqi?.pm25?.v || 0,
          pm10: aqiData.iaqi?.pm10?.v || 0,
          o3: aqiData.iaqi?.o3?.v || 0,
          no2: aqiData.iaqi?.no2?.v || 0,
          co: aqiData.iaqi?.co?.v || 0
        };

        // Extract weather data safely
        const temperature = aqiData.iaqi?.t?.v || 0;
        const humidity = aqiData.iaqi?.h?.v || 0;
        const windSpeed = aqiData.iaqi?.w?.v || 0;
        const pressure = aqiData.iaqi?.p?.v || 0;

        // Get coordinates from API data
        const coordinates = aqiData.city?.geo ? 
          { lat: aqiData.city.geo[0], lng: aqiData.city.geo[1] } : 
          { lat: 0, lng: 0 };

        setCurrentData({
          aqi: aqiData.aqi || 0,
          location: aqiData.city?.name || location,
          temperature: temperature,
          humidity: humidity,
          visibility: pressure > 0 ? Math.round(pressure / 100) : 10, // Approximate visibility from pressure
          windSpeed: windSpeed,
          pollutants: pollutants,
          lastUpdated: new Date(),
          coordinates: coordinates
        });
        
        setHasData(true);
        console.log('Data updated successfully');
      } else {
        setError(data.message || 'Failed to fetch air quality data. Please check the location and try again.');
        console.error('API Error:', data);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setGettingLocation(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setGettingLocation(false);
      return;
    }

    console.log('Requesting high-accuracy location...');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log('Location obtained:', { latitude, longitude, accuracy });
        console.log('Accuracy:', accuracy, 'meters');
        
        // Use the coordinates directly for better accuracy
        fetchAirQualityData(`${latitude.toFixed(6)},${longitude.toFixed(6)}`);
        setGettingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to retrieve your location. ';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access and try again.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }
        
        setError(errorMessage + ' Please enter a location manually.');
        setGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000, // Increased timeout
        maximumAge: 60000 // 1 minute cache
      }
    );
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (locationInput.trim()) {
      fetchAirQualityData(locationInput.trim());
    }
  };

  // Get current location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Auto-refresh data every 10 minutes if we have a location
  useEffect(() => {
    if (hasData && currentData.coordinates.lat !== 0) {
      const interval = setInterval(() => {
        fetchAirQualityData(`${currentData.coordinates.lat},${currentData.coordinates.lng}`);
      }, 600000); // 10 minutes

      return () => clearInterval(interval);
    }
  }, [hasData, currentData.coordinates]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            Air Quality Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Real-time Environmental Monitoring</p>
        </div>

        {/* Location Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <form onSubmit={handleLocationSubmit} className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  placeholder="Enter city name (e.g., Mumbai) or coordinates (e.g., 19.0760,72.8777)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !locationInput.trim()}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Loading...' : 'Get Air Quality'}
              </button>
            </form>
            <button
              onClick={getCurrentLocation}
              disabled={gettingLocation || loading}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <MapPin size={20} />
              {gettingLocation ? 'Getting Location...' : 'Use My Location'}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl">
              {error}
            </div>
          )}
        </div>

        {hasData && (
          <>
            {/* Last Updated Info */}
            <div className="text-center mb-6">
              <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
                <Activity className="text-green-500" size={16} />
                Last updated: {currentData.lastUpdated.toLocaleTimeString()}
              </div>
            </div>

            {/* Main AQI Display */}
            <div className="mb-8 animate-scale-in">
              <AQICard aqi={currentData.aqi} location={currentData.location} />
            </div>

            {/* Map Section - Moved here, above Health Recommendations */}
            {currentData.coordinates.lat !== 0 && currentData.coordinates.lng !== 0 && (
              <div className="mb-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 relative z-10">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin className="text-blue-600" size={24} />
                    Air Quality Map - {currentData.location}
                  </h3>
                  <div className="h-96 rounded-xl overflow-hidden relative z-0">
                    <MapContainer
                      center={[currentData.coordinates.lat, currentData.coordinates.lng]}
                      zoom={10}
                      style={{ height: '100%', width: '100%', zIndex: 1 }}
                      scrollWheelZoom={true}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <TileLayer
                        url={`https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${API_TOKEN}`}
                        attribution='Air Quality tiles &copy; <a href="https://waqi.info/">WAQI</a>'
                        opacity={0.7}
                      />
                      <Marker position={[currentData.coordinates.lat, currentData.coordinates.lng]}>
                        <Popup>
                          <div className="text-center">
                            <strong>{currentData.location}</strong><br/>
                            AQI: {currentData.aqi}<br/>
                            {currentData.aqi <= 50 ? 'Good' : currentData.aqi <= 100 ? 'Moderate' : currentData.aqi <= 150 ? 'Unhealthy for Sensitive' : currentData.aqi <= 200 ? 'Unhealthy' : 'Very Unhealthy'}
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                </div>
              </div>
            )}

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
                        style={{ width: `${Math.min(Math.max((currentData.temperature + 10) / 50 * 100, 0), 100)}%` }}
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
                        style={{ width: `${Math.min(currentData.humidity, 100)}%` }}
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
                    {currentData.aqi <= 50 ? 'Good' : currentData.aqi <= 100 ? 'Moderate' : currentData.aqi <= 150 ? 'Unhealthy for Sensitive' : currentData.aqi <= 200 ? 'Unhealthy' : 'Very Unhealthy'}
                  </div>
                  <p className="text-emerald-600 text-sm">Air quality assessment</p>
                </div>
              </div>
            </div>

            {/* Health Recommendations */}
            <div className="mb-8">
              <HealthRecommendations aqi={currentData.aqi} />
            </div>
          </>
        )}

        {!hasData && !loading && !gettingLocation && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              Click "Use My Location" to view your local air quality or enter a city name/coordinates
            </div>
            <div className="text-sm text-gray-400">
              Examples: "Mumbai", "New Delhi", "19.0760,72.8777"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
