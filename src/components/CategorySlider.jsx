// src/components/CategorySlider.jsx (with arrows + drag scrolling)

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategorySlider = ({ categories, selectedCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  // For dragging
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const slider = scrollRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScroll);
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  // Drag scroll handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1; // speed factor
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200 -mx-4">
      <div className="container mx-auto px-4 relative">
        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto py-3 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap shadow-sm ${
              !selectedCategory
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-amber-100'
            }`}
          >
            For you
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => onSelectCategory(category.slug)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap shadow-sm ${
                selectedCategory === category.slug
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-amber-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Left Arrow */}
        {showLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border rounded-full p-2 shadow-md hover:bg-amber-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Right Arrow */}
        {showRight && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border rounded-full p-2 shadow-md hover:bg-amber-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategorySlider;

