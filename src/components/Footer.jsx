// src/components/Footer.jsx (FIXED)

import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-amber-50 via-white to-amber-100 border-t border-amber-200/70 mt-auto">
      {/* Floating glow accents */}
      <div className="absolute -top-12 -left-12 w-40 h-40 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12 grid gap-10 md:grid-cols-3">
        {/* Brand / Logo */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            MindLoom
          </h2>
          <p className="mt-3 text-gray-600">
            A place where stories, ideas, and knowledge come alive.
            Read. Write. Share.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-amber-600 transition">Home</Link></li>
            <li><Link to="/categories" className="hover:text-amber-600 transition">Categories</Link></li>
            <li><Link to="/about" className="hover:text-amber-600 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-amber-600 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
          <div className="flex space-x-5 text-gray-600">
            <a href="https://github.com/VaradPatel13/Mern-blogwebsite-frontend" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition">
              <Github size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition">
              <Twitter size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition">
              <Instagram size={22} />
            </a>
            <a href="mailto:varadpatelo355@gmail.com" className="hover:text-amber-600 transition">
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-amber-200/70 py-4 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-amber-600">MindLoom</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
