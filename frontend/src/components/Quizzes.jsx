import React, { useState, useContext } from 'react';
import { CheckCircle, XCircle, RefreshCw, Trophy, Brain, Timer, Zap } from 'lucide-react';
import { BadgeContext } from './Explore';

const Quizzes = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);

  const { addBadge, updateAchievements, achievements } = useContext(BadgeContext);

  const quizzes = [
    {
      id: 1,
      question: "What does AQI stand for?",
      options: ["Air Quality Index", "Air Quantity Index", "Atmospheric Quality Indicator", "Air Quality Instrument"],
      correct: 0,
      explanation: "AQI stands for Air Quality Index, a standardized way to communicate air pollution levels.",
      category: "basics"
    },
    {
      id: 2,
      question: "What is the diameter of PM2.5 particles?",
      options: ["25 micrometers", "2.5 millimeters", "2.5 micrometers", "0.25 micrometers"],
      correct: 2,
      explanation: "PM2.5 particles have a diameter of 2.5 micrometers or smaller, making them extremely tiny.",
      category: "particles"
    },
    {
      id: 3,
      question: "Which AQI range is considered 'Good' air quality?",
      options: ["0-50", "51-100", "101-150", "151-200"],
      correct: 0,
      explanation: "AQI 0-50 is considered 'Good' - air quality is satisfactory with little or no risk.",
      category: "basics"
    },
    {
      id: 4,
      question: "What type of mask is recommended for air pollution protection?",
      options: ["Surgical mask", "Cloth mask", "N95/N99 mask", "Bandana"],
      correct: 2,
      explanation: "N95/N99 masks can filter out at least 95% of particles and provide proper protection against air pollution.",
      category: "protection"
    },
    {
      id: 5,
      question: "Which pollutant is NOT typically measured in AQI calculations?",
      options: ["PM2.5", "Ozone", "Water vapor", "Carbon monoxide"],
      correct: 2,
      explanation: "Water vapor is not a pollutant measured in AQI. The main pollutants are PM2.5, PM10, ozone, CO, SO2, and NO2.",
      category: "basics"
    },
    {
      id: 6,
      question: "At what AQI level should sensitive groups avoid outdoor activities?",
      options: ["Above 50", "Above 100", "Above 150", "Above 200"],
      correct: 2,
      explanation: "When AQI exceeds 150 (Unhealthy), sensitive groups should avoid outdoor activities.",
      category: "health"
    },
    {
      id: 7,
      question: "What is the main source of PM2.5 in urban areas?",
      options: ["Ocean spray", "Vehicle emissions", "Plant pollen", "Volcanic ash"],
      correct: 1,
      explanation: "Vehicle emissions are a major source of PM2.5 in urban areas, along with industrial processes.",
      category: "sources"
    },
    {
      id: 8,
      question: "How far can PM2.5 particles travel in the body?",
      options: ["Only in nose", "Only in lungs", "Into bloodstream", "Only in throat"],
      correct: 2,
      explanation: "PM2.5 particles are so small they can penetrate deep into lungs and enter the bloodstream.",
      category: "health"
    },
    {
      id: 9,
      question: "Which time of day typically has the highest air pollution in cities?",
      options: ["Early morning", "Rush hours", "Midnight", "Noon"],
      correct: 1,
      explanation: "Rush hours typically have highest pollution due to increased vehicle traffic and emissions.",
      category: "patterns"
    },
    {
      id: 10,
      question: "What does PM10 refer to?",
      options: ["Particles smaller than 10mm", "Particles smaller than 10 micrometers", "10 types of particles", "Pollution measured 10 times"],
      correct: 1,
      explanation: "PM10 refers to particulate matter with diameter of 10 micrometers or smaller.",
      category: "particles"
    },
    {
      id: 11,
      question: "Which health condition is NOT commonly linked to air pollution?",
      options: ["Asthma", "Heart disease", "Broken bones", "Lung cancer"],
      correct: 2,
      explanation: "While air pollution affects many health conditions, broken bones are not directly caused by air pollution.",
      category: "health"
    },
    {
      id: 12,
      question: "What color represents 'Unhealthy' AQI on most scales?",
      options: ["Green", "Yellow", "Orange", "Red"],
      correct: 3,
      explanation: "Red typically represents 'Unhealthy' AQI levels (151-200) on standard color scales.",
      category: "basics"
    },
    {
      id: 13,
      question: "Which indoor activity can improve air quality?",
      options: ["Smoking", "Using air purifiers", "Burning candles", "Cooking without ventilation"],
      correct: 1,
      explanation: "Air purifiers with HEPA filters can significantly improve indoor air quality by removing particles.",
      category: "solutions"
    },
    {
      id: 14,
      question: "What is ozone at ground level considered?",
      options: ["Beneficial", "Harmful pollutant", "Neutral", "Essential for breathing"],
      correct: 1,
      explanation: "Ground-level ozone is a harmful pollutant that can cause respiratory problems, unlike protective ozone in the stratosphere.",
      category: "pollutants"
    },
    {
      id: 15,
      question: "Which weather condition typically improves air quality?",
      options: ["No wind", "High pressure", "Rain", "Hot temperatures"],
      correct: 2,
      explanation: "Rain helps wash pollutants out of the air, typically improving air quality conditions.",
      category: "weather"
    },
    {
      id: 16,
      question: "What is the safe exposure limit for PM2.5 according to WHO?",
      options: ["25 μg/m³", "15 μg/m³", "35 μg/m³", "5 μg/m³"],
      correct: 3,
      explanation: "WHO recommends annual mean PM2.5 levels should not exceed 5 μg/m³.",
      category: "standards"
    },
    {
      id: 17,
      question: "Which pollutant is primarily responsible for smog formation?",
      options: ["Carbon dioxide", "Nitrogen oxides", "Water vapor", "Methane"],
      correct: 1,
      explanation: "Nitrogen oxides (NOx) react with volatile organic compounds in sunlight to form ground-level ozone and smog.",
      category: "pollutants"
    },
    {
      id: 18,
      question: "How long can PM2.5 particles stay airborne?",
      options: ["Minutes", "Hours to days", "Seconds", "Weeks"],
      correct: 1,
      explanation: "PM2.5 particles can remain suspended in air for hours to days due to their small size.",
      category: "particles"
    },
    {
      id: 19,
      question: "What percentage of global deaths are attributed to air pollution?",
      options: ["5%", "10%", "15%", "20%"],
      correct: 2,
      explanation: "According to WHO, air pollution contributes to approximately 15% of global deaths annually.",
      category: "health"
    },
    {
      id: 20,
      question: "Which room in a house typically has the worst air quality?",
      options: ["Bedroom", "Kitchen", "Bathroom", "Living room"],
      correct: 1,
      explanation: "Kitchens often have poor air quality due to cooking emissions, gas stoves, and inadequate ventilation.",
      category: "indoor"
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    if (!startTime) return;
    
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    setTimeSpent(timeTaken);
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === quizzes[currentQuiz].correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setCompletedQuizzes([...completedQuizzes, { id: quizzes[currentQuiz].id, correct: true }]);
    } else {
      setCompletedQuizzes([...completedQuizzes, { id: quizzes[currentQuiz].id, correct: false }]);
    }

    // Badge logic
    const newAchievements = achievements.quizzesCompleted + 1;
    updateAchievements('quizzesCompleted');

    if (newAchievements === 1) {
      addBadge('first-quiz', 'Quiz Starter', 'Complete your first quiz', <Brain className="w-8 h-8" />, 'from-blue-400 to-blue-600');
    }
    
    if (newAchievements === 5) {
      addBadge('quiz-master', 'Quiz Master', 'Complete 5 quizzes', <Trophy className="w-8 h-8" />, 'from-purple-400 to-purple-600');
    }
    
    if (isCorrect && score + 1 === quizzes.length) {
      addBadge('perfect-score', 'Perfect Scholar', 'Get 100% on a quiz', <Star className="w-8 h-8" />, 'from-yellow-400 to-yellow-600');
      updateAchievements('perfectQuizzes');
    }
    
    if (timeTaken < 10) {
      addBadge('speed-demon', 'Speed Demon', 'Complete a quiz in under 10 seconds', <Zap className="w-8 h-8" />, 'from-cyan-400 to-cyan-600');
    }
  };

  const nextQuiz = () => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setStartTime(Date.now());
      setTimeSpent(0);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompletedQuizzes([]);
    setStartTime(Date.now());
    setTimeSpent(0);
  };

  // Start timer when component loads
  React.useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const currentQuizData = quizzes[currentQuiz];
  const isCompleted = currentQuiz === quizzes.length - 1 && showResult;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-800">Air Quality Quiz Challenge</h2>
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <p className="text-gray-600">Test your knowledge and become an air quality expert!</p>
        
        {/* Enhanced Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-800">{achievements.quizzesCompleted}</div>
            <div className="text-xs text-blue-600">Total Completed</div>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-800">{achievements.perfectQuizzes}</div>
            <div className="text-xs text-purple-600">Perfect Scores</div>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-800">{score}/{quizzes.length}</div>
            <div className="text-xs text-green-600">Current Score</div>
          </div>
          <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-800">{timeSpent > 0 ? `${timeSpent.toFixed(1)}s` : '--'}</div>
            <div className="text-xs text-orange-600">Last Answer</div>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="bg-gray-200 rounded-full h-4 mb-6 relative overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 h-4 rounded-full transition-all duration-500 relative"
          style={{ width: `${((currentQuiz + (showResult ? 1 : 0)) / quizzes.length) * 100}%` }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-600">
          {currentQuiz + 1}/{quizzes.length}
        </div>
      </div>

      {/* Timer and Category */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentQuizData.category.toUpperCase()}
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Timer className="w-4 h-4" />
          <span className="text-sm">Question {currentQuiz + 1} of {quizzes.length}</span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500"></div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuizData.question}
          </h3>

          <div className="space-y-3 mb-6">
            {currentQuizData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                  showResult
                    ? index === currentQuizData.correct
                      ? 'bg-green-100 border-green-500 text-green-800 shadow-lg'
                      : index === selectedAnswer
                      ? 'bg-red-100 border-red-500 text-red-800'
                      : 'bg-gray-100 border-gray-300 text-gray-600'
                    : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:from-blue-50 hover:to-purple-50 hover:border-purple-300 hover:scale-105 hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && (
                    <div>
                      {index === currentQuizData.correct && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {index === selectedAnswer && index !== currentQuizData.correct && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  )}
                </div>
                {!showResult && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                )}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 p-4 mb-6 animate-fade-in rounded-lg">
              <p className="text-blue-800 font-medium mb-2 flex items-center">
                {selectedAnswer === currentQuizData.correct ? (
                  <>🎉 Correct! <Zap className="w-4 h-4 ml-2 text-yellow-500" /></>
                ) : (
                  '❌ Incorrect'
                )}
                {timeSpent > 0 && (
                  <span className="ml-auto text-sm">({timeSpent.toFixed(1)}s)</span>
                )}
              </p>
              <p className="text-blue-700">{currentQuizData.explanation}</p>
            </div>
          )}

          {showResult && (
            <div className="flex justify-center">
              {currentQuiz < quizzes.length - 1 ? (
                <button
                  onClick={nextQuiz}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  Next Question →
                </button>
              ) : (
                <button
                  onClick={() => setShowResult(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  View Results
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 rounded-2xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
          <Trophy className="w-20 h-20 mx-auto mb-4 text-yellow-300 animate-bounce" />
          <h3 className="text-3xl font-bold mb-4">Quiz Completed!</h3>
          <p className="text-xl mb-6">
            You scored {score} out of {quizzes.length} questions
          </p>
          <div className="text-lg mb-6">
            {score === quizzes.length && "🌟 Perfect Score! You're an air quality expert!"}
            {score >= quizzes.length * 0.8 && score < quizzes.length && "🎉 Excellent work! You know a lot about air quality!"}
            {score >= quizzes.length * 0.6 && score < quizzes.length * 0.8 && "👍 Good job! Keep learning about air quality!"}
            {score < quizzes.length * 0.6 && "📚 Keep studying! Air quality knowledge is important for your health!"}
          </div>
          <button
            onClick={resetQuiz}
            className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200 flex items-center space-x-2 mx-auto shadow-lg"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Take Quiz Again</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
