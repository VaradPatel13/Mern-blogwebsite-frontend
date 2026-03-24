import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="w-full flex-grow flex flex-col min-h-screen bg-[var(--background)] selection:bg-[#a0d1bc]/30 selection:text-[#00261b]">
      <MainNavbar />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
