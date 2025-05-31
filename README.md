🌍 Problem Statement

Air pollution is a growing global health crisis, affecting millions of people every day and killing an estimated 7 million people every year. 🏥 Poor air quality leads to serious health risks such as respiratory diseases, heart problems, and worsened allergies, especially among vulnerable populations like children 👶, the elderly 👵, and those with pre-existing conditions.

Despite the availability of air quality data, most people lack personalized insights that consider their health status, habits, and environment to effectively manage exposure risks. ❓ What's missing is a system that doesn’t just track pollution — but translates it into meaningful health guidance. Moreover, community awareness and engagement in tackling air pollution remain limited.

That's where our solution, BreatheSafe, comes in. ✨

BreatheSafe is a comprehensive platform that combines real-time environmental monitoring, personalized health risk prediction, and anomaly detection — all through an accessible, user-friendly interface.

💡 Solution
There is an urgent need for a comprehensive, user-friendly solution that not only provides real-time air quality information but also predicts health risks, encourages community participation, and educates users on air pollution and prevention strategies.

🌫️ Real-time Air Quality Monitoring
BreatheSafe fetches live air quality data for any location using reliable governmental APIs, helping users stay informed about pollution levels around them instantly.

🧠 Health Risk Prediction & Pollution Anomaly Detection
An advanced machine learning model analyzes pollutant levels along with personal factors like age, allergies, smoking habits, and mask usage to predict a personalized health risk score. Integrating GenAI to translate the predicted output to layman terms.

💌 Personalized Health Tips & Daily Newsletter to Never Miss Reports
Based on current air quality and individual health profiles, the app provides tailored advice 📝 to help users reduce exposure and protect their health effectively.

👥 Community Engagement
Users can participate in group challenges aimed at improving environmental conditions, report local air quality problems directly to authorities 🛠️, and engage in vibrant discussion forums.

⭐ Features Overview

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

