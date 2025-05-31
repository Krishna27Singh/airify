import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Wind,
  BarChart3,
  Users,
  Shield,
  HeartPulse,
  Mail,
  BookOpenCheck,
  Award,
  BrainCircuit,
  Smartphone,
} from 'lucide-react';

const features = [
  {
    icon: <Wind size={32} className="text-[#319795]" />,
    title: "Real-time Air Quality Data",
    desc: "Stay informed with live AQI updates for your location or anywhere in the world, using reliable data from trusted governmental sources.",
  },
  {
    icon: <HeartPulse size={32} className="text-[#38A169]" />,
    title: "Personalized Health Risk Scores",
    desc: "Get tailored health insights based on pollution levels, your age, health conditions, lifestyle habits, and exposure time.",
  },
  {
    icon: <Mail size={32} className="text-[#4FD1C5]" />,
    title: "Daily Air Quality Summary Email",
    desc: "Receive a detailed daily email with AQI, pollutant levels, forecasts, weather conditions, and health tips to start your day informed.",
  },
  {
    icon: <Users size={32} className="text-[#319795]" />,
    title: "Community Engagement Features",
    desc: "Join environmental challenges, report air quality issues, share user stories, and engage in meaningful discussions.",
  },
  {
    icon: <BookOpenCheck size={32} className="text-[#38A169]" />,
    title: "Educational Resources",
    desc: "Learn about air quality concepts, AQI, PM2.5, and strategies for reducing pollution exposure through videos, quizzes, and scenarios.",
  },
  {
    icon: <Award size={32} className="text-[#ECC94B]" />,
    title: "Gamification & Badges",
    desc: "Earn badges and rewards by completing quizzes, scenarios, and challenges, turning environmental awareness into a fun journey.",
  },
  {
    icon: <BrainCircuit size={32} className="text-[#4FD1C5]" />,
    title: "Advanced Machine Learning",
    desc: "Powered by cutting-edge ML models, BreathSafe predicts pollution anomalies and provides actionable insights to safeguard your health.",
  },
  {
    icon: <Smartphone size={32} className="text-[#319795]" />,
    title: "Cross-platform Accessibility",
    desc: "Available across devices with a responsive UI, ensuring you stay informed anytime, anywhere.",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E6FFFA] via-[#F7FAFC] to-[#EDF2F7] pb-12 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2C7A7B] mb-6 animate-fade-in-slow">
            Breathe Better with <span className="text-[#4FD1C5]">BreatheSafe</span>
          </h1>
          <p className="text-lg md:text-xl text-[#319795] mb-8 max-w-2xl mx-auto animate-fade-in">
            Real-time air quality monitoring, personalized health insights, and a vibrant community for a cleaner, safer tomorrow.
          </p>
          <div className="flex gap-4 justify-center mb-8 animate-fade-in">
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-[#319795] hover:to-[#68D391] transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Dashboard
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/community"
              className="bg-white text-[#38A169] px-8 py-4 rounded-lg font-semibold text-lg border-2 border-[#38A169] hover:bg-[#E6FFFA] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2C7A7B] mb-10 animate-fade-in-slow">
                How much time did you spent outside today ? Get your health risk score now!
            </h2>

           <Link
  to="https://breathesafe.streamlit.app/"
  className="bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] text-white px-6 py-6 rounded-lg font-semibold text-lg hover:from-[#319795] hover:to-[#68D391] transition-all duration-200 flex justify-center items-center text-center shadow-lg hover:shadow-xl transform hover:scale-105"
>
  Health Risk Score Prediction & Pollution Anomaly Detection
</Link>

          </div>
      </section>

      {/* About/Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2C7A7B] mb-10 animate-fade-in-slow">
          Why Choose BreatheSafe?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className="bg-white/90 rounded-2xl p-7 shadow-lg border border-[#EDF2F7] hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-start animate-fade-in"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-[#2C7A7B] mb-2">{f.title}</h3>
              <p className="text-[#319795]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-[#2C7A7B] to-[#4FD1C5] py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Monitoring Your Air Quality Today
          </h2>
          <p className="text-lg md:text-xl text-[#E6FFFA] mb-8">
            Join thousands of users who trust BreatheSafe for accurate, real-time environmental data and health insights.
          </p>
          <Link
            to="/dashboard"
            className="bg-white text-[#2C7A7B] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#E6FFFA] transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Shield size={20} />
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Animations */}
      <style>
        {`
        .animate-fade-in {
          animation: fadeIn 0.8s;
        }
        .animate-fade-in-slow {
          animation: fadeIn 1.6s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        `}
      </style>
    </div>
  );
};

export default Home;