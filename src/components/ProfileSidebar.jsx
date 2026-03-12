import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import {
  LayoutDashboard,
  Home,
  User,
  Settings,
  PenTool,
  LogOut,
  ChevronRight
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
    `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
      ? "bg-slate-900 border border-slate-900 text-white shadow-md relative overflow-hidden"
      : "text-slate-600 border border-transparent hover:bg-slate-100 hover:text-slate-900"
    }`;

  const isActiveIndicator = (isActive) => isActive && (
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 rounded-r-md"></div>
  );

  return (
    <nav className="flex flex-col space-y-1.5 p-4 sm:p-6 pb-2">

      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pl-4">Platform</div>

      <NavLink to="/home" className={navLinkClass}>
        {({ isActive }) => (
          <>
            {isActiveIndicator(isActive)}
            <div className="flex items-center space-x-3">
              <Home size={18} className={isActive ? "text-teal-400" : "text-slate-400 group-hover:text-slate-600"} />
              <span className="font-semibold text-sm">Feed</span>
            </div>
            <ChevronRight size={14} className={`opacity-0 sm:-translate-x-2 transition-all ${isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"}`} />
          </>
        )}
      </NavLink>

      <NavLink to="/dashboard" className={navLinkClass}>
        {({ isActive }) => (
          <>
            {isActiveIndicator(isActive)}
            <div className="flex items-center space-x-3">
              <LayoutDashboard size={18} className={isActive ? "text-teal-400" : "text-slate-400 group-hover:text-slate-600"} />
              <span className="font-semibold text-sm">Dashboard</span>
            </div>
            <ChevronRight size={14} className={`opacity-0 -translate-x-2 transition-all ${isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"}`} />
          </>
        )}
      </NavLink>

      <NavLink to="/create-post" className={navLinkClass}>
        {({ isActive }) => (
          <>
            {isActiveIndicator(isActive)}
            <div className="flex items-center space-x-3">
              <PenTool size={18} className={isActive ? "text-teal-400" : "text-slate-400 group-hover:text-slate-600"} />
              <span className="font-semibold text-sm">Write a Story</span>
            </div>
            <ChevronRight size={14} className={`opacity-0 -translate-x-2 transition-all ${isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"}`} />
          </>
        )}
      </NavLink>

      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-8 mb-3 pl-4 pt-4 border-t border-slate-100">Personal</div>

      <NavLink to="/my-profile" className={navLinkClass} end>
        {({ isActive }) => (
          <>
            {isActiveIndicator(isActive)}
            <div className="flex items-center space-x-3">
              <User size={18} className={isActive ? "text-teal-400" : "text-slate-400 group-hover:text-slate-600"} />
              <span className="font-semibold text-sm">Profile</span>
            </div>
            <ChevronRight size={14} className={`opacity-0 -translate-x-2 transition-all ${isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"}`} />
          </>
        )}
      </NavLink>

      <NavLink to="/edit-profile" className={navLinkClass}>
        {({ isActive }) => (
          <>
            {isActiveIndicator(isActive)}
            <div className="flex items-center space-x-3">
              <Settings size={18} className={isActive ? "text-teal-400" : "text-slate-400 group-hover:text-slate-600"} />
              <span className="font-semibold text-sm">Account Settings</span>
            </div>
            <ChevronRight size={14} className={`opacity-0 -translate-x-2 transition-all ${isActive ? "opacity-100 translate-x-0" : "group-hover:opacity-100 group-hover:translate-x-0"}`} />
          </>
        )}
      </NavLink>

      <div className="pt-6 mt-4 border-t border-slate-200">
        <button
          onClick={onLogoutClick}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-transparent text-red-600 font-semibold text-sm hover:bg-red-50 hover:border-red-100 transition-colors group"
        >
          <div className="flex items-center space-x-3">
            <LogOut size={18} className="text-red-400 group-hover:text-red-600" />
            <span>Sign Out</span>
          </div>
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
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <SidebarContent onLogoutClick={() => setShowLogoutDialog(true)} />
        </div>
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 overflow-y-auto">
          <SheetHeader className="px-6 py-6 border-b border-slate-100">
            <SheetTitle className="text-2xl font-serif font-bold text-slate-900 text-left">Navigation</SheetTitle>
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
              className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm text-center border border-slate-100"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <LogOut size={28} className="text-red-500" />
                </div>

                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2 tracking-tight">
                  Sign out
                </h2>

                <p className="text-slate-500 font-medium mb-8">
                  Are you sure you want to sign out of your account?
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowLogoutDialog(false)}
                    className="flex-1 px-4 py-3 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors sm:order-1"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-3 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 shadow-sm transition-colors sm:order-2"
                  >
                    Sign out
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
