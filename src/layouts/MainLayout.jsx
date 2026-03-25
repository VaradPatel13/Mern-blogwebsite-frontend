import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainNavbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isEditorPage = location.pathname.includes('/create-post') || location.pathname.includes('/edit-post');

  return (
    <div className="w-full flex-grow flex flex-col min-h-screen bg-[var(--background)] selection:bg-[#a0d1bc]/30 selection:text-[#00261b]">
      {!isLanding && !isEditorPage && <MainNavbar />}
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      {!isEditorPage && <Footer />}
    </div>
  );
};

export default MainLayout;
