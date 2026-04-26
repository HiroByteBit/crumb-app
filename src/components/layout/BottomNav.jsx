import React from 'react';
import { NavLink, useLocation } from 'react-router';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Mobile navigation bar
 */
export const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: ShoppingBag, label: 'Orders', path: '/orders' },
    { icon: Heart, label: 'Favorites', path: '/favorites' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-[768px] h-16 bg-white border-t border-[var(--border)] flex items-center justify-around px-2 z-50 pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full relative transition-colors ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              }`
            }
          >
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">
              {item.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -top-[1px] w-12 h-[2px] bg-[var(--accent)] rounded-full"
              />
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
