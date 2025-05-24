
import React from 'react';
import { SettingsIcon, LogOutIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  isSidebarCollapsed: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isSidebarCollapsed }) => {
  return (
    <div className={cn(
      "flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white z-20 sticky top-0",
      isSidebarCollapsed 
        ? "lg:ml-[var(--sidebar-collapsed-width)] ml-0" 
        : "lg:ml-[var(--sidebar-width)] ml-0"
    )}>
      {/* Mobile sidebar toggle is handled in the dashboard layout */}
      
      <div className="flex-1" /> {/* Spacer */}
      
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium hidden sm:inline-block">Alex Johnson</span>
        <button className="p-1.5 hover:bg-gray-100 rounded-full" aria-label="Settings">
          <SettingsIcon size={20} />
        </button>
        <button 
          className="flex items-center text-sm font-medium px-3 py-1.5 bg-gray-100 hover:bg-gray-200 transition-colors rounded-md" 
          aria-label="Log out"
        >
          <LogOutIcon size={16} className="mr-1.5" />
          <span className="hidden sm:inline-block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;