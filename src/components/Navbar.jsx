import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { Search, Edit, ChevronDown, User, LogOut, LayoutDashboard, Settings } from "lucide-react";

const MainNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await logoutUser();
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="w-full bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="h-20 flex items-center justify-between">

          {/* Left Side: Brand & Search */}
          <div className="flex items-center gap-4 lg:gap-8 flex-1">
            <Link to="/home" className="text-2xl md:text-3xl font-black font-serif tracking-tighter text-slate-900 shrink-0">
              MindLoom.
            </Link>

            <form onSubmit={handleSearch} className="hidden lg:flex relative w-full max-w-xs group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-focus-within:text-teal-600 transition-colors pointer-events-none" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-full font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600/10 focus:border-teal-500 transition-all"
              />
            </form>
          </div>

          {/* Right Side: Actions & Profile */}
          <div className="flex items-center justify-end gap-3 md:gap-5">
            {isAuthenticated ? (
              <>
                <Link
                  to="/create-post"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-teal-700 transition-colors rounded-full shadow-sm"
                >
                  <Edit size={16} strokeWidth={2.5} />
                  <span>Write</span>
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
                      <img
                        src={user?.avatar || "https://i.pravatar.cc/150"}
                        alt={user?.username || "User"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <ChevronDown size={16} className={`text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <>
                      {/* Invisible overlay to close dropdown */}
                      <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)}></div>

                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                        {/* User Summary */}
                        <div className="p-4 border-b border-slate-100 bg-slate-50">
                          <p className="font-bold text-slate-900 text-sm truncate">{user?.fullName}</p>
                          <p className="text-xs font-semibold text-teal-700 truncate">@{user?.username}</p>
                        </div>

                        {/* Links */}
                        <div className="py-2">
                          <Link to={`/my-profile`} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors">
                            <User size={16} /> Profile
                          </Link>
                          <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors">
                            <LayoutDashboard size={16} /> Dashboard
                          </Link>
                          <Link to="/edit-profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors">
                            <Settings size={16} /> Settings
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="p-2 border-t border-slate-100">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <LogOut size={16} /> Sign out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-teal-700 transition-colors">Sign In</Link>
                <Link to="/register" className="px-5 py-2.5 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-teal-700 transition-colors shadow-sm">Get Started</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;
