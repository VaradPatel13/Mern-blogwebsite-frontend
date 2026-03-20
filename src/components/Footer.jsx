import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden">
      
      <div className="relative max-w-[1200px] mx-auto px-8 grid gap-10 md:grid-cols-12 mb-16 z-10">
        
        {/* Brand */}
        <div className="md:col-span-4 space-y-5">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4L28 28H4L16 4Z" fill="#14b8a6" opacity="0.6"/>
                <path d="M10 10L22 28H-2L10 10Z" fill="#0f766e"/>
              </svg>
            </div>
            <span className="text-[16px] font-bold tracking-tight text-[#111]">MindLoom</span>
          </Link>
          <p className="leading-relaxed max-w-[280px] text-[13px] text-[#999] font-medium">
            Where ideas find their voice. A simple sanctuary for readers and writers.
          </p>
          <div className="flex gap-2 pt-1">
            {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-white border border-[#eee] flex items-center justify-center text-[#999] hover:bg-[#111] hover:text-white hover:border-[#111] transition-all duration-300 shadow-sm"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 hidden md:block"></div>

        {/* Links */}
        <div className="md:col-span-2">
          <h3 className="text-[#111] font-bold text-[11px] mb-5 uppercase tracking-[0.2em]">Platform</h3>
          <ul className="space-y-3 text-[13px] font-medium text-[#999]">
            {['Our Story', 'Membership', 'Creators', 'Write'].map((item) => (
              <li key={item}>
                <Link to="/home" className="hover:text-[#111] transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-[#111] font-bold text-[11px] mb-5 uppercase tracking-[0.2em]">Quick Help</h3>
          <ul className="space-y-3 text-[13px] font-medium text-[#999]">
            {['Support', 'Status', 'Privacy', 'Terms'].map((item) => (
              <li key={item}>
                <Link to="/home" className="hover:text-[#111] transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-2">
          <h3 className="text-[#111] font-bold text-[11px] mb-5 uppercase tracking-[0.2em]">Connect</h3>
          <p className="mb-5 text-[12px] leading-relaxed font-medium text-[#999]">
            Join the newsletter for weekly ideas.
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email"
              className="bg-white border border-[#eee] rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500/30 text-[13px] placeholder-[#ccc] font-medium transition-all"
            />
            <button className="w-full bg-[#111] text-white px-4 py-2.5 rounded-xl text-[12px] font-bold hover:bg-[#222] transition-all shadow-sm">
              Join now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-[#eee] pt-6 px-8 max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center z-10">
        <div className="text-[#ccc] text-[11px] mb-3 md:mb-0 font-medium">
          © {new Date().getFullYear()} MindLoom. Built with precision.
        </div>
        <div className="flex space-x-6 text-[11px] text-[#ccc] font-medium">
          <Link to="/privacy" className="hover:text-[#888] transition">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-[#888] transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
