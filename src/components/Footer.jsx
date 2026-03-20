import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6 md:px-12 relative z-20">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand */}
        <div className="flex items-center gap-3 group mb-2 md:mb-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 rounded-xl border border-gray-100 shadow-sm flex items-center justify-center bg-white group-hover:bg-gray-50 overflow-hidden group-hover:scale-105 transition-all duration-500">
            <img src="/icon.jpg" alt="Scribloom Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-[18px] font-bold tracking-tight text-[#111] group-hover:text-[#4FD1C5] transition-colors">Scribloom</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-[14px] font-medium text-[#777]">
          <Link to="/home" className="hover:text-[#111] transition-colors">Our Story</Link>
          <Link to="/home" className="hover:text-[#111] transition-colors">Membership</Link>
          <Link to="/home" className="hover:text-[#111] transition-colors">Write</Link>
          <Link to="/home" className="hover:text-[#111] transition-colors">Privacy</Link>
          <Link to="/home" className="hover:text-[#111] transition-colors">Terms</Link>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-5 text-[#999]">
          <a href="#" className="hover:text-[#111] transition-colors"><Twitter size={18} /></a>
          <a href="#" className="hover:text-[#111] transition-colors"><Instagram size={18} /></a>
          <a href="#" className="hover:text-[#111] transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="hover:text-[#111] transition-colors"><Github size={18} /></a>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="max-w-[1200px] mx-auto mt-10 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#999] font-medium">
        <p>© {new Date().getFullYear()} Scribloom. All rights reserved.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#111] transition-colors">
          Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
