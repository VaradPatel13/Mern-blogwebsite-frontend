import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, User, Search, PenLine, Sparkles, TrendingUp, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#' },
    { name: 'Community', path: '#community', icon: <Sparkles size={14} className="text-[#A13333]" /> },
    { name: 'Top Stories', path: '#' },
    { name: 'Write Story', path: '/create-post', icon: <PenLine size={14} /> },
  ];

  const fadeBlur = {
    initial: { opacity: 0, y: -20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md py-4 border-b border-gray-100/50 shadow-sm'
          : 'bg-white py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left: Logo */}
        <motion.div initial="initial" animate="animate" variants={fadeBlur}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#111] rounded-[10px] group-hover:rotate-12 transition-transform duration-500" />
              <Sparkles size={18} className="text-white relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-black tracking-tight text-[#111111] leading-none">
                MindLoom<span className="text-[#4FD1C5]">.</span>
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Center: Nav Items */}
        <motion.div 
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
          className="hidden lg:flex items-center gap-8"
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={fadeBlur}>
              <Link
                to={link.path}
                className="text-[14px] font-bold text-[#111111]/70 hover:text-[#111111] transition-colors flex items-center gap-2"
              >
                {link.icon && <span className="opacity-50">{link.icon}</span>}
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: CTA */}
        <div className="flex items-center gap-4">
          <motion.div initial="initial" animate="animate" variants={fadeBlur} transition={{ delay: 0.4 }}>
            <Link 
              to="/get-started" 
              className="hidden md:block bg-[#111] text-white px-6 py-2.5 rounded-full text-[13px] font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-[#111] hover:bg-gray-50 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-semibold text-[#111] hover:text-[#4FD1C5] flex items-center gap-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LandingNavbar;
