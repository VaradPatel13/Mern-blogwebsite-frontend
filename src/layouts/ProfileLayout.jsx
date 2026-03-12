import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileHeader from '../components/ProfileHeader';
import MainNavbar from '../components/Navbar'; // We'll include the main navbar as well

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-100 selection:text-teal-900 flex flex-col">

      {/* Top Navigation */}
      <div className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-200">
        <MainNavbar />
      </div>

      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">

        {/* Mobile Header with Hamburger Menu */}
        <ProfileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar for Desktop and Mobile Sheet */}
          <ProfileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

          {/* Main Content Area */}
          <main className="flex-grow min-w-0">
            <Outlet />
          </main>

        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-slate-200 bg-white text-center">
        <p className="text-sm font-semibold text-slate-500">
          MindLoom. &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ProfileLayout;