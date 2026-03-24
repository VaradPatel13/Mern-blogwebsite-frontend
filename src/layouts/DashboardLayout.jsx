import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';
import { 
  Home, 
  LayoutDashboard, 
  PenLine, 
  User, 
  Settings, 
  LogOut
} from 'lucide-react';
import MainNavbar from '../components/Navbar';
import Footer from '../components/Footer';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate('/');
  };

  const navItems = [
    { to: "/home", icon: <Home size={18} strokeWidth={2.5} />, label: "Home" },
    { to: "/dashboard", icon: <LayoutDashboard size={18} strokeWidth={2.5} />, label: "Dashboard" },
    { to: "/create-post", icon: <PenLine size={18} strokeWidth={2.5} />, label: "Write a Story" },
    { to: "/my-profile", icon: <User size={18} strokeWidth={2.5} />, label: "Profile" },
    { to: "/edit-profile", icon: <Settings size={18} strokeWidth={2.5} />, label: "Edit Profile" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfcf9] font-manrope selection:bg-[#a0d1bc]/30 selection:text-[#00261b]">
      
      {/* Top: Full Width Navbar */}
      <div className="w-full shrink-0 z-[100] relative">
        <MainNavbar />
      </div>

      {/* Middle Section (Flex Row) */}
      <div className="flex flex-1 w-full overflow-hidden max-w-[1400px] mx-auto">
        
        {/* Left: Sidebar */}
        <aside className="w-64 shrink-0 bg-[#f4f2ee] border-r border-[#efeeea] flex flex-col pt-8 pb-6 hidden md:flex">
          
          {/* Top Section */}
          <div className="px-8 mb-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9a9996] mb-1">
              Editorial Studio
            </p>
            <p className="text-[#0a251c] font-bold text-[15px]">
              {user?.fullName || "Good"}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-3 rounded-full transition-all text-[14px] font-bold ${
                    isActive 
                    ? 'bg-[#0a251c] text-white shadow-md' 
                    : 'text-[#1a382c] hover:bg-[#0a251c]/5'
                  }`
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Bottom Logout */}
          <div className="px-4 mt-auto">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-3 w-full text-left rounded-full transition-all text-[14px] font-bold text-[#55816c] hover:bg-[#0a251c]/5 hover:text-[#0a251c]"
            >
              <LogOut size={18} strokeWidth={2.5} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Right: Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#fdfcf9] w-full flex flex-col">
          <Outlet />
        </main>

      </div>

      {/* Bottom: Full Width Footer */}
      <div className="w-full shrink-0 relative mt-auto border-t border-[#efeeea]">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
