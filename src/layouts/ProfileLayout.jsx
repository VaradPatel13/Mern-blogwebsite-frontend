// src/layouts/ProfileLayout.jsx (UPDATED)

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileHeader from '../components/ProfileHeader'; // Import the new header

const ProfileLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-amber-50/50">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Header with Hamburger Menu */}
        <ProfileHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar for Desktop and Mobile Sheet */}
          <ProfileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          {/* Main Content */}
          <main className="flex-grow">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;