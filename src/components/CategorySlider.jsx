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
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (slider) {
        slider.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      }
    };
  }, [categories]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

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
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full py-4 bg-[var(--background)] border-b border-[#efeeea] font-manrope">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center gap-6">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#111]/30 shrink-0">Explore Tags</span>
        
        <div className="relative flex-1 overflow-hidden">
          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex items-center gap-3 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <button
              onClick={() => onSelectCategory(null)}
              className={`whitespace-nowrap px-4 py-1.5 text-[11px] font-bold rounded-full transition-all border ${!selectedCategory
                  ? 'bg-[#111] border-[#111] text-white shadow-lg shadow-black/5'
                  : 'bg-[#efeeea] border-transparent text-[#111]/40 hover:text-[#111] hover:bg-white hover:border-[#efeeea]'
                }`}
            >
              All Topics
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => onSelectCategory(category.slug)}
                className={`whitespace-nowrap px-4 py-1.5 text-[11px] font-bold rounded-full transition-all border ${selectedCategory === category.slug
                    ? 'bg-[#111] border-[#111] text-white shadow-lg shadow-black/5'
                    : 'bg-[#efeeea] border-transparent text-[#111]/40 hover:text-[#111] hover:bg-white hover:border-[#efeeea]'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Fade Gradients & Arrows */}
          <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none transition-opacity duration-300 ${showLeft ? 'opacity-100' : 'opacity-0'}`}></div>
          <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none transition-opacity duration-300 ${showRight ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;

