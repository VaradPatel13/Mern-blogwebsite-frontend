import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, User, LayoutDashboard, Plus, Settings } from 'lucide-react';

const MobileBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to check if a path is active
    const isActive = (path) => location.pathname === path;
    
    return (
        <nav className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] rounded-[2.5rem] z-[90] bg-white/10 backdrop-blur-[30px] border border-white/20 shadow-[0_25px_50px_-12px_rgba(0,38,27,0.25)] flex justify-around items-end px-3 pb-4 pt-4 ring-1 ring-black/5">
            {/* 1. Home Link */}
            <Link 
                to="/home" 
                className={`flex flex-col items-center justify-center p-2 transition-all duration-300 active:scale-90 flex-1 ${isActive('/home') ? 'text-[#00261b]' : 'text-[#00261b]/40 hover:text-[#00261b]'}`}
            >
                <Home size={22} strokeWidth={isActive('/home') ? 2.5 : 2} />
                <span className="font-manrope font-bold text-[8px] tracking-[0.2em] uppercase mt-2">Home</span>
            </Link>
            
            {/* 2. Dashboard Link */}
            <Link 
                to="/dashboard" 
                className={`flex flex-col items-center justify-center p-2 transition-all duration-300 active:scale-90 flex-1 ${isActive('/dashboard') ? 'text-[#00261b]' : 'text-[#00261b]/40 hover:text-[#00261b]'}`}
            >
                <LayoutDashboard size={22} strokeWidth={isActive('/dashboard') ? 2.5 : 2} />
                <span className="font-manrope font-bold text-[8px] tracking-[0.2em] uppercase mt-2">Garden</span>
            </Link>

            {/* 3. Create Post Floating Button (Center) */}
            <div className="flex-1 flex justify-center shrink-0 w-20 -mt-12 relative z-10">
                <Link 
                    to="/create-post" 
                    className={`flex flex-col items-center justify-center rounded-full w-[64px] h-[64px] shadow-[0_20px_35px_rgba(0,38,27,0.3)] border-[5px] border-[#fdfdfd] hover:-translate-y-2 active:scale-95 transition-all duration-500
                        ${isActive('/create-post') ? 'bg-gradient-to-br from-[#00261b] to-[#214f3f] text-[#bcedd7]' : 'bg-[#00261b] text-white/90'}`}
                >
                    <Plus size={28} strokeWidth={2.5} />
                </Link>
            </div>
            
            {/* 4. Edit Profile / Settings Link */}
            <Link 
                to="/edit-profile" 
                className={`flex flex-col items-center justify-center p-2 transition-all duration-300 active:scale-90 flex-1 ${isActive('/edit-profile') ? 'text-[#00261b]' : 'text-[#00261b]/40 hover:text-[#00261b]'}`}
            >
                <Settings size={22} strokeWidth={isActive('/edit-profile') ? 2.5 : 2} />
                <span className="font-manrope font-bold text-[8px] tracking-[0.2em] uppercase mt-2">Settings</span>
            </Link>
            
            {/* 5. Profile Link */}
            <Link 
                to="/my-profile" 
                className={`flex flex-col items-center justify-center p-2 transition-all duration-300 active:scale-90 flex-1 ${isActive('/my-profile') ? 'text-[#00261b]' : 'text-[#00261b]/40 hover:text-[#00261b]'}`}
            >
                <User size={22} strokeWidth={isActive('/my-profile') ? 2.5 : 2} />
                <span className="font-manrope font-bold text-[8px] tracking-[0.2em] uppercase mt-2">Profile</span>
            </Link>
        </nav>
    );
};

export default MobileBottomNav;
