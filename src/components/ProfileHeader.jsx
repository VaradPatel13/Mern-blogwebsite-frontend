
// src/components/ProfileHeader.jsx (NEW FILE)

import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

const ProfileHeader = ({ onMenuClick }) => {
  return (
    <header className="lg:hidden mb-4">
      <Button variant="ghost" size="icon" onClick={onMenuClick}>
        <Menu className="h-6 w-6 text-gray-700" />
        <span className="sr-only">Open menu</span>
      </Button>
    </header>
  );
};

export default ProfileHeader;
