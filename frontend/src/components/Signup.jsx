
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    
    preExistingConditions: [],
    allergies: [],
    smokingStatus: "",
    fitnessLevel: "",
    pregnancy: "",
    
    commutingPreferences: [],
    useAirFilters: "",
    livingEnvironment: "",
    
    notifications: {
      aqiSummary: false,
      communityReports: false,
      aqiAlerts: false,
      healthTips: false
    }
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (field, value, checked) => {
    if (field === 'notifications') {
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [value]: checked
        }
      });
    } else {
      const currentArray = formData[field];
      if (checked) {
        setFormData({
          ...formData,
          [field]: [...currentArray, value]
        });
      } else {
        setFormData({
          ...formData,
          [field]: currentArray.filter(item => item !== value)
        });
      }
    }
  };

  const handleSelectChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignup = async () => {
    try {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const userData = { ...formData, latitude, longitude };
                console.log('User Data with Coordinates:', userData);

                try {
                    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, userData);
                    alert('Signup successful! Please login.');
                    navigate('/login');
                } catch (error) {
                    alert(error.response?.data?.message || 'Signup failed');
                }
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert('Location permission denied. Please enable location services in your browser.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('Location information is unavailable. Try again later.');
                        break;
                    case error.TIMEOUT:
                        alert('The request to get user location timed out. Please try again.');
                        break;
                    default:
                        alert('An unknown error occurred while fetching location.');
                }
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    } catch (error) {
        alert('An error occurred during signup: ' + (error.response?.data?.message || error.message));
    }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold">Signup</CardTitle>
            <p className="text-green-100 mt-2">Help us provide inforamtion for personalized health recommendations</p>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Enter your age"
                    onChange={handleInputChange}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label>Gender</Label>
                <Select onValueChange={(value) => handleSelectChange('gender', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Health Profile */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Health Profile</h3>
              
              {/* Pre-existing Conditions */}
              <div>
                <Label className="text-base font-medium">Pre-existing Conditions (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {[
                    "Asthma",
                    "COPD",
                    "Cardiovascular diseases",
                    "Respiratory infections",
                    "Diabetes",
                    "None"
                  ].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox
                        id={condition}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('preExistingConditions', condition, checked)
                        }
                      />
                      <Label htmlFor={condition} className="text-sm font-normal">{condition}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <Label className="text-base font-medium">Allergies (Select all that apply)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                  {[
                    "Pollen allergy (hay fever)",
                    "Dust allergy",
                    "Smoke sensitivity",
                    "Chemical sensitivity",
                    "None"
                  ].map((allergy) => (
                    <div key={allergy} className="flex items-center space-x-2">
                      <Checkbox
                        id={allergy}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('allergies', allergy, checked)
                        }
                      />
                      <Label htmlFor={allergy} className="text-sm font-normal">{allergy}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Smoking Status */}
              <div>
                <Label className="text-base font-medium">Smoking Status</Label>
                <RadioGroup 
                  className="mt-3"
                  onValueChange={(value) => handleSelectChange('smokingStatus', value)}
                >
                  {["Smoker", "Non-smoker", "Ex-smoker"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <RadioGroupItem value={status} id={status} />
                      <Label htmlFor={status} className="text-sm font-normal">{status}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Fitness Level */}
              <div>
                <Label className="text-base font-medium">Fitness Level</Label>
                <RadioGroup 
                  className="mt-3"
                  onValueChange={(value) => handleSelectChange('fitnessLevel', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="active" id="active" />
                    <Label htmlFor="active" className="text-sm font-normal">
                      Active (regular exercise, outdoor activities)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate" className="text-sm font-normal">
                      Moderate (occasional physical activity)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sedentary" id="sedentary" />
                    <Label htmlFor="sedentary" className="text-sm font-normal">
                      Sedentary (minimal physical activity)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Pregnancy */}
              <div>
                <Label className="text-base font-medium">Pregnancy Status</Label>
                <RadioGroup 
                  className="mt-3"
                  onValueChange={(value) => handleSelectChange('pregnancy', value)}
                >
                  {[
                    "Currently pregnant",
                    "Planning to become pregnant",
                    "Not applicable"
                  ].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <RadioGroupItem value={status} id={status.replace(/\s+/g, '-')} />
                      <Label htmlFor={status.replace(/\s+/g, '-')} className="text-sm font-normal">
                        {status}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Lifestyle Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Lifestyle Information</h3>
              
              {/* Commuting Preferences */}
              <div>
                <Label className="text-base font-medium">Commuting Preferences (Select all that apply)</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {[
                    "Walking",
                    "Cycling",
                    "Public transport",
                    "Private vehicle"
                  ].map((transport) => (
                    <div key={transport} className="flex items-center space-x-2">
                      <Checkbox
                        id={transport}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('commutingPreferences', transport, checked)
                        }
                      />
                      <Label htmlFor={transport} className="text-sm font-normal">{transport}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Air Filters */}
              <div>
                <Label className="text-base font-medium">Use of Air Filters</Label>
                <RadioGroup 
                  className="mt-3"
                  onValueChange={(value) => handleSelectChange('useAirFilters', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes-home" id="yes-home" />
                    <Label htmlFor="yes-home" className="text-sm font-normal">Yes, at home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes-work" id="yes-work" />
                    <Label htmlFor="yes-work" className="text-sm font-normal">Yes, at work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes-both" id="yes-both" />
                    <Label htmlFor="yes-both" className="text-sm font-normal">Yes, both home and work</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="text-sm font-normal">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Living Environment */}
              <div>
                <Label className="text-base font-medium">Living Environment</Label>
                <RadioGroup 
                  className="mt-3"
                  onValueChange={(value) => handleSelectChange('livingEnvironment', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="urban" id="urban" />
                    <Label htmlFor="urban" className="text-sm font-normal">
                      Urban (city center, high pollution)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="suburban" id="suburban" />
                    <Label htmlFor="suburban" className="text-sm font-normal">Suburban</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rural" id="rural" />
                    <Label htmlFor="rural" className="text-sm font-normal">
                      Rural (low pollution)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Notification Preferences</h3>
              <p className="text-sm text-gray-600">Choose what notifications you'd like to receive via email:</p>
              
              <div className="space-y-3">
                {[
                  { key: 'aqiSummary', label: 'Daily AQI Summary' },
                  { key: 'communityReports', label: 'Community Reports' },
                  { key: 'aqiAlerts', label: 'AQI Alerts (when air quality is poor)' },
                  { key: 'healthTips', label: 'Personalized Health Tips' }
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={notification.key}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('notifications', notification.key, checked)
                      }
                    />
                    <Label htmlFor={notification.key} className="text-sm font-normal">
                      {notification.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleSignup}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 text-lg font-semibold"
            >
              Create Account
            </Button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-green-500 font-medium cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
