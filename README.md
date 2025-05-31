# 🌬️ **BreatheSafe**

### Breathe Better with BreatheSafe | Combating Air Pollution With Personalized Health Insights

---

## 🌍 Problem Statement

Air pollution is a growing global health crisis, claiming **~7 million lives every year**. Poor air quality triggers or worsens:

- **Respiratory diseases**
- **Cardiovascular conditions**
- **Allergies and asthma**

Vulnerable groups—children, the elderly, and people with pre-existing conditions—bear the brunt.  
While raw air-quality data is widely available, most people still lack **personalized, actionable guidance** to manage their exposure and health risks.

---

## ✨ Our Solution — **BreatheSafe**

**BreatheSafe** is a one-stop platform that transforms real-time pollution data into meaningful health advice and community action.

### 🌫️ Real-Time Air Quality Monitoring
- Fetches live AQI for any location via trusted governmental APIs  
- Provides instant, location-specific pollution alerts

### 🧠 Health Risk Prediction & Anomaly Detection
- ML model blends pollutant levels with personal factors (age, smoking habits, allergies, mask usage, etc.)  
- Outputs a personalized health-risk score  
- GenAI layer converts technical results into simple language

### 💌 Personalized Tips & Daily Newsletter
- Tailored recommendations to reduce exposure and protect your health  
- Optional email digest so you never miss critical air-quality reports

### 👥 Community Engagement
- Group challenges to improve local environments  
- Easy reporting of air-quality issues to authorities 🛠️  
- Discussion forums that foster awareness and collective action

---



## 🔧 Tech Stack

- **MERN**: MongoDB · Express.js · React.js · Node.js  
- **Python**: Flask API (REST) · Pandas · scikit-learn · joblib  
- **Streamlit**: Interactive dashboards & visualizations  
- **Botpress**: Conversational assistant for quick AQI checks and health advice  
- **Architecture**: Microservices

---


_Ready to breathe easy? Join us and make clean air a reality for everyone._

##  ⭐ Feature Highlights

```mermaid
graph TD
    User --> Authentication
    Authentication --> Login
    Authentication --> SignUp
    Authentication --> GoogleAuth
    Login --> VerifyInput
    SignUp --> StoreCredentials --> Database
    StoreCredentials -->|redirect to Login page| Login
    GoogleAuth -->|Google Authentication| VerifyGmail

    Authentication --> Home
    Home --> |NLP Based Intelligent Responses| ChatBot
    Home --> MLModel
    Home --> EducationHub
    Home --> AirQualityDashboard
    Home --> CommunityHub



    EducationHub --> Explore
    EducationHub --> Quizzes
    EducationHub --> Learn
    EducationHub --> AQIReport

    Explore --> Badges
    Explore --> Videos
    Explore --> Scenarios

    Scenarios --> CompleteQuestions --> EarnBadges
    Quizzes --> CompleteQuiz --> EarnBadges

    AQIReport --> CurrentLocationAQI
    AQIReport --> AQIValues
    AQIReport -->  AQIWorldMap
    AQIReport --> WeatherImpact
    AQIReport --> HealthRecommendations

    CurrentLocationAQI --> PM2.5
    CurrentLocationAQI --> PM10
    CurrentLocationAQI --> O3
    CurrentLocationAQI --> CO
    CurrentLocationAQI --> NO2

AQIWorldMap[AQI World Map]


    WeatherImpact --> Temperature
    WeatherImpact --> Humidity
    WeatherImpact --> Visibility
    WeatherImpact --> WindSpeed
    HealthRecommendations --> GeneralTips

    AirQualityDashboard --> Dashboard
    Dashboard --> AQI
    Dashboard -->|send daily AQI report to user via gmail|EmailAutomation


    CommunityHub --> Community
    Community --> Reports
    Reports --> |Users can write their reports in report form|Submit
    Reports --> RecentReports

    Community --> GroupChallenges
    GroupChallenges --> ActiveChallenge --> JoinChallenge
    GroupChallenges --> Completed

    Community --> UserStories
    UserStories --> ShareStory
    UserStories --> OtherStories

  

    MLModel --> PollutionAnomolyDetection
    MLModel --> HealthRiskScorePrediction

  HealthRiskScorePrediction --> |takes factors like age, smoking habits, exposure hours, aqi, pollutants volume etc.| HealthRiskScore--> |Gemini API translates to Layman Terms| RiskCards

PollutionAnomolyDetection --> |takes season, average aqi, city information|Calculates --> | Sets anamoly flag for anomaly detection| 0/1 --> |For anomaly, sends alerts to user| AlertCards 



