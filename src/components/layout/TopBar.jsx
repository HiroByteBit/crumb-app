import React from 'react';
import { MapPin, Bell, ChevronDown } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';

/**
 * Top application bar
 */
export const TopBar = () => {
  const deliveryAddress = useOrderStore((state) => state.deliveryAddress);

  return (
    <header className="sticky top-0 w-full bg-white z-40 px-5 pt-4 pb-3 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">
          Delivering to
        </span>
        <button className="flex items-center gap-1 mt-0.5 group">
          <MapPin size={14} className="text-[var(--accent)]" />
          <span className="text-[14px] font-bold text-[var(--text-primary)]">
            {deliveryAddress.street}, {deliveryAddress.city}
          </span>
          <ChevronDown size={14} className="text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors" />
        </button>
      </div>
      
      <button className="w-10 h-10 rounded-full bg-[var(--bg-base)] flex items-center justify-center relative hover:bg-[var(--accent-light)] transition-colors">
        <Bell size={20} className="text-[var(--text-primary)]" />
        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--accent)] rounded-full border-2 border-white"></span>
      </button>
    </header>
  );
};
