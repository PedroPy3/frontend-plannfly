
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SettingsIcon, LogOutIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';

interface TopBarProps {
  isSidebarCollapsed: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isSidebarCollapsed }) => {
  const navigate = useNavigate();
  
  const { data: customerData, isLoading } = useQuery({
    queryKey: ['customer-name'],
    queryFn: () => api.get('/customer/name'),
  });

  const handleLogout = () => {
    console.log('Logout button clicked');
    
    // Clear all cookies more thoroughly
    const cookies = document.cookie.split(";");
    console.log('Current cookies:', cookies);
    
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      
      // Clear for current path and domain
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
    });
    
    // Clear localStorage and sessionStorage as well
    localStorage.clear();
    sessionStorage.clear();
    
    console.log('Cookies cleared, redirecting to login');
    
    // Redirect to login
    navigate('/login');
  };

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
        <span className="text-sm font-medium hidden sm:inline-block">
          {isLoading ? 'Loading...' : (customerData?.name || 'User')}
        </span>
        <button className="p-1.5 hover:bg-gray-100 rounded-full" aria-label="Settings">
          <SettingsIcon size={20} />
        </button>
        <button 
          onClick={handleLogout}
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