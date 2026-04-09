import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Truck, Bell, User } from 'lucide-react';
import { cn } from '@/lib/cn';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideNav = ['/login', '/register', '/welcome', '/route-map'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <main className="w-full max-w-[390px] min-h-screen bg-white shadow-xl relative pb-20">
        {children}
        
        {!hideNav && (
          <nav className="fixed bottom-0 w-full max-w-[390px] bg-white border-t border-slate-100 px-4 py-2 flex justify-between items-center z-50">
            <NavItem to="/" icon={<Home size={24} />} label="Home" />
            <NavItem to="/customers" icon={<Users size={24} />} label="Customers" />
            <NavItem to="/deliveries" icon={<Truck size={24} />} label="Deliveries" />
            <NavItem to="/requests" icon={<Bell size={24} />} label="Requests" badge={3} />
            <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
          </nav>
        )}
      </main>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex flex-col items-center gap-1 transition-colors relative",
          isActive ? "text-blue-600" : "text-slate-400"
        )
      }
    >
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
};
