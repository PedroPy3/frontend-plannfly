import React, { useState } from 'react';
import {
  MenuIcon,
  ChevronRightIcon,
  BookOpenIcon,
  UsersIcon,
  CreditCardIcon,
  CalendarIcon,
  UserIcon,
  StarIcon,
  HelpCircleIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const mainNavItems = [
    { name: 'Classes', icon: BookOpenIcon, link: '/classes' },
    { name: 'Students', icon: UsersIcon, link: '/students' },
    { name: 'Subscriptions', icon: CreditCardIcon, link: '/student-subscriptions' },
    { name: 'Schedule', icon: CalendarIcon, link: '/schedule' },
    { name: 'Instructors', icon: UserIcon, link: '/instructors' },
  ];

  const bottomNavItems = [
    { name: 'My Subscription', icon: StarIcon, link: '/my-subscription' },
    { name: 'Support', icon: HelpCircleIcon, link: '/support' },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        'sidebar bg-white border-r border-gray-200 h-screen fixed top-0 left-0 z-30 flex flex-col',
        collapsed ? 'w-[var(--sidebar-collapsed-width)]' : 'w-[var(--sidebar-width)]'
      )}
    >
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "justify-between w-full")}>
          {!collapsed && <span className="text-lg font-semibold text-plannfly-700">Plannfly</span>}
          <button
            onClick={toggleSidebar}
            className="p-1.5 hover:bg-gray-100 rounded-md"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRightIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {mainNavItems.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <li key={index}>
                <Link
                  to={item.link}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors group",
                    isActive
                      ? "bg-plannfly-100 text-plannfly-700 font-semibold"
                      : "text-gray-700 hover:bg-plannfly-50 hover:text-plannfly-700",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <item.icon size={20} className={cn("flex-shrink-0", collapsed ? "" : "mr-3")} />
                  <span className={cn("transition-opacity", collapsed ? "sr-only" : "opacity-100")}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-200 py-4">
        <ul className="space-y-1 px-2">
          {bottomNavItems.map((item, index) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <li key={index}>
                <Link
                  to={item.link}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors group",
                    isActive
                      ? "bg-plannfly-100 text-plannfly-700 font-semibold"
                      : "text-gray-700 hover:bg-plannfly-50 hover:text-plannfly-700",
                    collapsed ? "justify-center" : "justify-start"
                  )}
                >
                  <item.icon size={20} className={cn("flex-shrink-0", collapsed ? "" : "mr-3")} />
                  <span className={cn("transition-opacity", collapsed ? "sr-only" : "opacity-100")}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
