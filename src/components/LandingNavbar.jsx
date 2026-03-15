import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import landingData from '../data/landingData.json';

const LandingNavbar = () => {
  const { categories } = landingData;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm' 
          : 'bg-white py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Left */}
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-black tracking-tighter text-slate-900">
            MindLoom<span className="text-teal-500">.</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/home" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Our Story</Link>
            <Link to="/home" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Membership</Link>
            <Link to="/home" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Write</Link>
          </div>
        </div>

        {/* Actions Right */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-6 mr-2">
            <Link to="/login" className="text-sm font-bold text-slate-900 hover:text-teal-600 transition-colors">Sign In</Link>
          </div>
          <Link
            to="/register"
            className="px-6 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-2xl hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          >
            Get Started
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            <Link to="/home" className="text-lg font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Our Story</Link>
            <Link to="/home" className="text-lg font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Membership</Link>
            <Link to="/home" className="text-lg font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Write</Link>
          </div>
          <div className="h-px bg-slate-100 w-full my-2"></div>
          <div className="flex flex-col gap-4">
            <Link to="/login" className="text-lg font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
            <Link to="/register" className="w-full py-4 text-center rounded-2xl text-white font-bold bg-slate-900" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
