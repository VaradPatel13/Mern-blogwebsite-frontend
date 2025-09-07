// src/components/ProfileSidebar.jsx (UPDATED with Logout Dialog)

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import {
  LayoutDashboard,
  Home,
  User,
  Edit,
  PlusSquare,
  LogOut,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const SidebarContent = ({ onLogoutClick }) => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-amber-500 text-white font-semibold shadow"
        : "text-gray-600 hover:bg-amber-100 hover:text-amber-800"
    }`;

  return (
    <nav className="flex flex-col space-y-2 p-4">
      <NavLink to="/home" className={navLinkClass}>
        <Home size={20} />
        <span>Home Feed</span>
      </NavLink>
      <NavLink to="/dashboard" className={navLinkClass}>
        <LayoutDashboard size={20} />
        <span>My Dashboard</span>
      </NavLink>
      <NavLink to="/my-profile" className={navLinkClass} end>
        <User size={20} />
        <span>My Profile</span>
      </NavLink>
      <NavLink to="/edit-profile" className={navLinkClass}>
        <Edit size={20} />
        <span>Edit Profile</span>
      </NavLink>
      <NavLink to="/create-post" className={navLinkClass}>
        <PlusSquare size={20} />
        <span>Create Post</span>
      </NavLink>
      <div className="pt-2 mt-2 border-t border-amber-200">
        <button
          onClick={onLogoutClick}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

const ProfileSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-xl shadow-lg border border-amber-500/20">
          <SidebarContent onLogoutClick={() => setShowLogoutDialog(true)} />
        </div>
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-2xl text-amber-800">Menu</SheetTitle>
          </SheetHeader>
          <SidebarContent onLogoutClick={() => setShowLogoutDialog(true)} />
        </SheetContent>
      </Sheet>

      {/* Logout Confirmation Dialog (Portal) */}
      {createPortal(
        <AnimatePresence>
          {showLogoutDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-xl shadow-lg p-6 w-80 text-center"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  Confirm Logout
                </h2>
                <p className="text-gray-600 mt-2">
                  Are you sure you want to log out?
                </p>
                <div className="mt-4 flex justify-center space-x-3">
                  <button
                    onClick={() => setShowLogoutDialog(false)}
                    className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-700"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default ProfileSidebar;
