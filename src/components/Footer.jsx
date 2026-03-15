// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden text-slate-500 border-t border-slate-100">
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid gap-12 md:grid-cols-12 mb-20 z-10">
        
        {/* Brand / Logo Section */}
        <div className="md:col-span-4 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-black tracking-tighter text-slate-900">
            MindLoom<span className="text-teal-500">.</span>
          </Link>
          <p className="leading-relaxed max-w-sm text-sm block font-medium">
            Where ideas find their voice. A simple sanctuary for readers and writers.
          </p>
          <div className="flex space-x-3 pt-2">
            {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Links Array Spacer */}
        <div className="md:col-span-2 hidden md:block"></div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h3 className="text-slate-900 font-bold text-xs mb-6 uppercase tracking-widest">Platform</h3>
          <ul className="space-y-4 text-[13px] font-medium">
            <li><Link to="/home" className="hover:text-teal-600 transition-colors">Our Story</Link></li>
            <li><Link to="/home" className="hover:text-teal-600 transition-colors">Membership</Link></li>
            <li><Link to="/home" className="hover:text-teal-600 transition-colors">Creators</Link></li>
            <li><Link to="/home" className="hover:text-teal-600 transition-colors">Write</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-slate-900 font-bold text-xs mb-6 uppercase tracking-widest">Quick help</h3>
          <ul className="space-y-4 text-[13px] font-medium">
            <li><Link to="/home" className="hover:text-teal-600 transition-colors">Support</Link></li>
            <li><Link to="/home" className="hover:text-teal-600 transition-colors">Status</Link></li>
            <li><Link to="/home" className="hover:text-teal-600 transition-colors">Privacy</Link></li>
            <li><Link to="/home" className="hover:text-teal-600 transition-colors">Terms</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
            <h3 className="text-slate-900 font-bold text-xs mb-6 uppercase tracking-widest">Connect</h3>
            <p className="mb-6 text-xs block leading-relaxed font-medium">Join the weaver newsletter for weekly ideas.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-sm placeholder-slate-400 font-medium"
              />
              <button className="w-full bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-sm">
                Join now
              </button>
            </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-slate-100 pt-8 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center z-10">
        <div className="text-slate-400 text-xs mb-4 md:mb-0 font-medium">
          © {new Date().getFullYear()} MindLoom. Built with precision.
        </div>
        <div className="flex space-x-6 text-xs text-slate-400 font-medium">
          <Link to="/privacy" className="hover:text-slate-600 transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-600 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
