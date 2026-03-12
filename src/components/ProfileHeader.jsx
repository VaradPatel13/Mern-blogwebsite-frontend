import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

const ProfileHeader = ({ onMenuClick }) => {
  return (
    <header className="lg:hidden mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
      <h2 className="text-xl font-serif font-bold text-slate-900">Settings Menu</h2>
      <Button variant="outline" size="icon" onClick={onMenuClick} className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>
    </header>
  );
};

export default ProfileHeader;
