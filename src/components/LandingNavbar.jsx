import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';

const LandingNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-300 ${isScrolled ? 'bg-white border-b border-slate-200 shadow-sm' : 'bg-white'
        }`}
    >
      {/* Top micro-bar for subscription/login - Dark and Authoritative */}
      <div className="hidden md:flex justify-between items-center px-4 sm:px-8 py-2.5 bg-slate-900 text-xs font-semibold text-slate-300 uppercase tracking-widest">
        <div className="flex gap-4">
          <span>MindLoom Publishing Platform</span>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
          <Link to="/register" className="text-teal-400 hover:text-teal-300 transition-colors">Create your blog</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">

        {/* Mobile Toggle & Search */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="p-2 -ml-2 text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Search size={20} className="text-slate-600" />
        </div>

        {/* Left Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 w-1/3">
          <Link to="/explore" className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors">Read</Link>
          <Link to="/topics" className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors">Topics</Link>
          <Link to="/authors" className="text-sm font-semibold text-slate-700 hover:text-teal-700 transition-colors">Authors</Link>
        </div>

        {/* Center Brand */}
        <div className="flex-1 md:w-1/3 flex justify-center">
          <Link to="/" className="text-3xl lg:text-4xl font-black font-serif tracking-tight text-slate-900">
            MindLoom.
          </Link>
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-6 w-1/3">
          <button className="text-slate-700 hover:text-teal-700 transition-colors">
            <Search size={20} />
          </button>
          <Link
            to="/register"
            className="px-6 py-2.5 text-sm font-bold text-white bg-teal-700 rounded-full hover:bg-teal-800 transition-colors shadow-sm"
          >
            Subscribe
          </Link>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="hidden md:flex justify-center border-b border-slate-100 py-3 bg-white">
        <div className="flex gap-8 text-sm font-medium text-slate-500">
          {['Technology', 'Culture', 'Design', 'Science', 'Politics', 'Business', 'Health'].map(cat => (
            <a href={`#${cat.toLowerCase()}`} key={cat} className="hover:text-slate-900 hover:underline decoration-teal-700 decoration-2 underline-offset-4 transition-all">{cat}</a>
          ))}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <input type="text" placeholder="Search articles..." className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600" />
          </div>
          <div className="flex flex-col py-2">
            {['Technology', 'Culture', 'Design', 'Science', 'Business'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-6 py-4 text-base font-semibold text-slate-800 border-b border-slate-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-4 p-6 bg-slate-50">
              <Link to="/login" className="w-full py-3 text-center border border-slate-300 rounded-lg text-slate-800 font-semibold bg-white shadow-sm" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Link to="/register" className="w-full py-3 text-center rounded-lg text-white font-semibold bg-teal-700 shadow-sm" onClick={() => setMobileMenuOpen(false)}>Subscribe</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
