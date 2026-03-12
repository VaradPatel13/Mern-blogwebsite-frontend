import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainNavbar from '../components/Navbar';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-teal-100 selection:text-teal-900 flex flex-col">
      {/* Editorial Top Navigation */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
        <MainNavbar />
      </div>

      {/* Main App Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <Outlet />
      </main>

      {/* Simple Footer for the Internal App */}
      <footer className="mt-auto py-8 border-t border-slate-200 bg-white text-center">
        <p className="text-sm font-semibold text-slate-500">
          MindLoom. &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
