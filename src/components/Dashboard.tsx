
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-30 lg:hidden transform transition-transform duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar />
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          collapsed 
            ? "lg:ml-[var(--sidebar-collapsed-width)] ml-0" 
            : "lg:ml-[var(--sidebar-width)] ml-0"
        )}
      >
        {/* Mobile top bar with menu toggle */}
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
        
        {/* Desktop top bar */}
        <div className="hidden lg:block">
          <TopBar isSidebarCollapsed={collapsed} />
        </div>
        
        {/* Page content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-medium mb-4">Welcome to Plannfly</h2>
              <p className="text-gray-600">
                This is your internal dashboard where you can manage classes, students, subscriptions, and more.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {[
                { title: "Classes", count: 12 },
                { title: "Active Students", count: 145 },
                { title: "Teachers", count: 8 }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase">{item.title}</h3>
                  <p className="text-3xl font-bold mt-2">{item.count}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <p className="text-sm text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;