// src/layouts/MainLayout.jsx (REDESIGNED)

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainNavbar from '../components/Navbar';


const MainLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  return (
    <div className="bg-gray-50/50 min-h-screen">
      {/* 1. UNIFIED FIXED HEADER */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Main Navbar is always present */}
          <MainNavbar />
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      {/* Increased top padding to account for the taller fixed header */}
      <main className="container max-w-7xl mx-auto px-4 py-8 pt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

