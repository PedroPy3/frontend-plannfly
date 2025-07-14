import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className={cn(
        "fixed inset-y-0 left-0 z-30 lg:hidden transform transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar />
      </div>

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className={cn(
        "flex-1 transition-all duration-300",
        collapsed 
          ? "lg:ml-[var(--sidebar-collapsed-width)] ml-0" 
          : "lg:ml-[var(--sidebar-width)] ml-0"
      )}>
        <div className="lg:hidden flex items-center h-16 px-4 border-b border-gray-200 bg-white sticky top-0 z-20">
          <button 
            onClick={toggleMobileMenu} 
            className="p-1.5 hover:bg-gray-100 rounded-md"
            aria-label="Toggle mobile menu"
          >
            <MenuIcon size={24} />
          </button>
          <div className="mx-auto text-lg font-semibold text-plannfly-700">Plannfly</div>
        </div>

        <div className="hidden lg:block">
          <TopBar isSidebarCollapsed={collapsed} />
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
