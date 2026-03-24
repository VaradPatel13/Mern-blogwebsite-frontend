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
    { name: 'Home', path: '#hero' },
    { name: 'Community', path: '#community' },
    { name: 'Vision', path: '#vision' },
    { name: 'Studio', path: '#craft' },
    { name: 'Stories', path: '#stories' },
  ];

  const fadeBlur = {
    initial: { opacity: 0, y: -20, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 font-manrope ${isScrolled
          ? 'bg-[var(--background)]/90 backdrop-blur-md py-2 border-b border-[#efeeea] shadow-sm'
          : 'bg-[var(--background)] py-3'
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Left: Logo */}
        <motion.div initial="initial" animate="animate" variants={fadeBlur}>
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 flex items-center justify-center rounded-lg overflow-hidden shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-500">
              <img src="/icon.jpg" alt="Scribloom Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-[16px] font-black tracking-tight text-[#111111] leading-none font-newsreader">
                Scribloom<span className="text-[#a0d1bc]">.</span>
              </span>
            </div>
          </a>
        </motion.div>

        {/* Center: Nav Items */}
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
          className="hidden lg:flex items-center gap-5"
        >
          {navLinks.map((link) => (
            <motion.div key={link.name} variants={fadeBlur}>
              <a
                href={link.path}
                className="text-[12px] font-bold text-[#111111]/70 hover:text-[#111111] transition-colors flex items-center gap-1.5"
              >
                {link.icon && <span className="opacity-50">{link.icon}</span>}
                {link.name}
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          <motion.div initial="initial" animate="animate" variants={fadeBlur} transition={{ delay: 0.4 }}>
            <Link
              to="/register"
              className="hidden md:block bg-[#111] text-white px-4 py-1.5 rounded-full text-[11px] font-bold hover:scale-105 transition-transform shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-1.5 text-[#111] hover:bg-gray-50 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
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
              <a
                key={link.name}
                href={link.path}
                className="text-lg font-semibold text-[#111] hover:text-[#4FD1C5] flex items-center gap-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default LandingNavbar;
