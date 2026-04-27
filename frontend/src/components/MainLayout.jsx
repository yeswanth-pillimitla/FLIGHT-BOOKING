import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Plane, BookOpen, User, Bell, LayoutGrid } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { title: 'Home', icon: Home, path: '/user-dashboard' },
    { title: 'Book', icon: LayoutGrid, path: '/book' },
    { title: 'My Bookings', icon: BookOpen, path: '/bookings' },
    { title: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="mx-auto max-w-lg bg-primary rounded-2xl shadow-2xl shadow-primary/20 flex justify-around py-3 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
          >
            {({ isActive }) => (
              <div className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
                isActive ? 'text-white scale-110' : 'text-white/60 hover:text-white'
              }`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-wide">{item.title}</span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

import Logo from './Logo';

const MainLayout = ({ children }) => {
  return (
    <div className="pb-24 min-h-screen max-w-4xl mx-auto relative bg-[#F3F4F6]">
      <div className="flex justify-between items-center mb-6 pt-6 px-4">
        <div className="flex items-center space-x-2 pl-12">
          <Logo size="sm" />
        </div>
        <button className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-50 transition-colors relative border border-gray-100">
          <Bell size={20} className="text-primary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
        </button>
      </div>
      <main className="px-4">{children}</main>
      <BottomNav />
    </div>
  );
};

export default MainLayout;
