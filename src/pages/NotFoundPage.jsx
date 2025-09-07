import React, { useState, useEffect } from 'react';
import { Frown, Home, ArrowLeft, Search, MapPin, Coffee, Lightbulb } from 'lucide-react';

const NotFoundPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  // Helpful tips that rotate
  const helpfulTips = [
    "Double-check the URL for typos",
    "Try using the search feature",
    "Visit our homepage for latest content",
    "Check if the page has been moved"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotate tips every 3 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % helpfulTips.length);
    }, 3000);

    return () => clearInterval(tipInterval);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Fallback to home if no history
      window.location.href = '/';
    }
  };

  const handleGoHome = () => {
    window.location.href = '/home';
  };

  const handleSearch = () => {
    // In a real app, this would open a search modal or navigate to search page
    const searchQuery = prompt("What are you looking for?");
    if (searchQuery) {
      console.log(`Searching for: ${searchQuery}`);
      // Implement search functionality here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-amber-100 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-orange-100 rounded-full opacity-20 animate-bounce delay-500"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* 404 Icon and Number */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
          <div className="relative mb-4 sm:mb-0 sm:mr-6">
            <div className="absolute inset-0 bg-amber-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-amber-400 to-amber-600 p-6 rounded-full shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <Frown size={64} className="text-white animate-bounce" strokeWidth={1.5} />
            </div>
          </div>
          
          <div className="relative">
            <h1 className="text-8xl sm:text-9xl font-extrabold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent tracking-wider animate-pulse">
              404
            </h1>
            <div className="absolute inset-0 text-8xl sm:text-9xl font-extrabold text-amber-200 opacity-30 blur-sm -z-10">
              404
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 animate-fadeInUp">
            Oops! Page Not Found
          </h2>
          
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed animate-fadeInUp delay-200">
            The page you're looking for seems to have wandered off into the digital wilderness. 
            Don't worry, it happens to the best of us!
          </p>
        </div>

        {/* Rotating Helpful Tips */}
        <div className="mb-8 h-12 flex items-center justify-center">
          <div className="bg-amber-100 border border-amber-200 rounded-lg px-4 py-2 shadow-sm">
            <div className="flex items-center space-x-2 text-amber-800">
              <Lightbulb size={16} className="text-amber-600" />
              <span className="text-sm font-medium transition-all duration-500">
                💡 {helpfulTips[currentTip]}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={handleGoHome}
            className="group flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Home size={20} className="group-hover:rotate-12 transition-transform duration-200" />
            <span>Go to Homepage</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="group flex items-center space-x-2 bg-white hover:bg-amber-50 text-amber-600 font-semibold px-6 py-3 rounded-lg border-2 border-amber-500 hover:border-amber-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Go Back</span>
          </button>
        </div>

      
        {/* Fun Error Code */}
        <div className="mt-12 text-xs text-gray-400 font-mono bg-gray-100 inline-block px-3 py-1 rounded">
          Error Code: AMBER_404_WANDERED_OFF
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 bg-amber-400 rounded-full animate-bounce`}
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;