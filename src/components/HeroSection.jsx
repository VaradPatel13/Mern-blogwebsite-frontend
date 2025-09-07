// src/components/HeroSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Globe from '@/components/ui/globe';
// import { BackgroundPaths } from '@/components/ui/background-paths'; // 1. Import the new component

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
      {/* 2. Add the BackgroundPaths component with the new color */}
      {/* <BackgroundPaths className="absolute inset-0 z-0 opacity-40 stroke-orange-500" /> */}
      
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-amber-900 leading-tight">
                Share Your Voice{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  with the World
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Bolify is a modern, fast, and beautiful platform to write, publish, and discover amazing stories that inspire the world.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register" className="group bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl">
                Get Started for Free
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-amber-200">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-amber-900">--</div>
                <div className="text-gray-600">Writers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-amber-900">--</div>
                <div className="text-gray-600">Stories</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-amber-900">--</div>
                <div className="text-gray-600">Readers</div>
              </div>
            </div>
          </div>

          {/* Right Content - Globe */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-none">
              <Globe />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
