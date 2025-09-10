
// src/components/FeaturesSection.jsx

import React from 'react';
import { Zap, Edit3, Heart } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Blazing Fast",
      description: "Powered by modern technology for an instant, seamless writing experience that never keeps you waiting."
    },
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: "Beautifully Simple",
      description: "A clean, intuitive editor that gets out of your way so you can focus on what matters: your writing."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Engage & Grow",
      description: "Connect with readers through likes, comments, and shares to build a thriving community around your stories."
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why You'll Love MindLoom
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to create, share, and grow your writing community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 rounded-2xl border border-amber-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-amber-50/30">
              <div className="text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-amber-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
    
export default FeaturesSection;
