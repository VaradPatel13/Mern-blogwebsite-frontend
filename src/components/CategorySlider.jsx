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
      if (slider) slider.removeEventListener('scroll', checkScroll);
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
    <div className="relative w-full border-b border-slate-200 bg-white pt-2 pb-0">
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none px-4 lg:px-0"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <button
          onClick={() => onSelectCategory(null)}
          className={`whitespace-nowrap pb-3 text-sm font-semibold transition-all border-b-2 ${!selectedCategory
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
        >
          For you
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onSelectCategory(category.slug)}
            className={`whitespace-nowrap pb-3 text-sm font-semibold transition-all border-b-2 ${selectedCategory === category.slug
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Fade Gradients & Arrows */}
      {showLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none flex items-center">
          <button onClick={() => handleScroll('left')} className="pointer-events-auto ml-1 p-1 bg-white rounded-full shadow-sm border border-slate-100 text-slate-600 hover:text-slate-900">
            <ChevronLeft size={20} />
          </button>
        </div>
      )}

      {showRight && (
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none flex items-center justify-end">
          <button onClick={() => handleScroll('right')} className="pointer-events-auto mr-1 p-1 bg-white rounded-full shadow-sm border border-slate-100 text-slate-600 hover:text-slate-900">
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySlider;
