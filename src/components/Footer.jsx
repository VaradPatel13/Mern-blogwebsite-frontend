// src/components/Footer.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden text-zinc-400 border-t border-white/10">
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 grid gap-12 md:grid-cols-12 mb-16 z-10">
        
        {/* Brand / Logo Section */}
        <div className="md:col-span-4 space-y-6">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold tracking-tighter text-white">
            <div className="w-5 h-5 rounded bg-zinc-200"></div>
            MindLoom
          </Link>
          <p className="leading-relaxed max-w-sm text-sm block">
            A minimalist sanctuary where stories, ideas, and knowledge come alive. Build your brand with absolute focus.
          </p>
          <div className="flex space-x-4 pt-4">
            <a href="https://github.com/VaradPatel13/Mern-blogwebsite-frontend" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <Github size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <Twitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <Instagram size={18} />
            </a>
            <a href="mailto:varadpatelo355@gmail.com" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Links Array Spacer */}
        <div className="md:col-span-1 hidden md:block"></div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h3 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">Product</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link to="/integrations" className="hover:text-white transition-colors">Integrations</Link></li>
            <li><Link to="/changelog" className="hover:text-white transition-colors">Changelog</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">Company</h3>
          <ul className="space-y-4 text-sm">
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="md:col-span-3">
          <h3 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">Subscribe</h3>
          <p className="mb-4 text-sm block leading-relaxed">Join our newsletter to get the latest stories and updates.</p>
          <div className="flex bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 focus-within:border-zinc-500 transition-colors">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent text-white px-4 py-2 w-full focus:outline-none text-sm placeholder-zinc-600"
            />
            <button className="bg-white hover:bg-zinc-200 text-black px-4 py-2 text-sm font-medium transition-colors border-l border-zinc-800">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/5 pt-8 mt-8 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center z-10">
        <div className="text-zinc-600 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} MindLoom Inc. All rights reserved.
        </div>
        <div className="flex space-x-6 text-sm text-zinc-600">
          <Link to="/privacy" className="hover:text-zinc-400 transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-zinc-400 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
