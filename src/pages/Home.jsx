import React from 'react';
import { Search, ChevronRight, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { categories, restaurants } from '../data/mockData';
import { RestaurantCard } from '../components/ui/RestaurantCard';
import { useOrderStore } from '../store/useOrderStore';

export const Home = () => {
  const selectedCategory = useOrderStore((state) => state.selectedCategory);
  const setSelectedCategory = useOrderStore((state) => state.setSelectedCategory);

  return (
    <div className="px-5 pt-6 pb-4 flex flex-col gap-8">
      {/* Promo Banner - Now at the very top for maximum visibility */}
      <section>
        <div className="relative rounded-[32px] overflow-hidden bg-[var(--accent-light)] border border-orange-100 p-8 min-h-[180px] flex flex-col justify-center">
          {/* Decorative background element */}
          <div className="absolute right-[-10%] top-[-10%] w-48 h-48 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-start">
            <div className="flex items-center gap-2 px-3 py-1 bg-white text-[var(--accent-dark)] rounded-full text-[11px] font-extrabold uppercase tracking-[0.1em] mb-4 shadow-sm">
              <Gift size={14} />
              <span>Welcome Offer</span>
            </div>
            
            <h2 className="text-[26px] font-extrabold text-[var(--text-primary)] leading-[1.1] tracking-tight">
              Free Delivery<br />on your first order
            </h2>
            
            <button className="mt-5 flex items-center gap-2 text-[14px] font-extrabold text-[var(--accent-dark)] uppercase tracking-wider group bg-white/50 hover:bg-white px-4 py-2 rounded-xl transition-all">
              Claim Code 
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Search Bar - Sticky at the top of the scroll area */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md pt-2 pb-4 z-30 -mx-5 px-5">
        <div className="relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-dim)] group-focus-within:text-[var(--accent)] transition-colors" />
          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-full py-4 pl-12 pr-4 text-[14px] font-medium focus:border-[var(--accent)] focus:ring-4 focus:ring-orange-50 transition-all outline-none"
          />
        </div>
      </div>

      {/* Category Pills */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[18px] font-extrabold tracking-tight">Browse Categories</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.label)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[14px] font-bold transition-all border ${
                selectedCategory === cat.label 
                  ? 'bg-[var(--text-primary)] border-[var(--text-primary)] text-white shadow-lg shadow-gray-200' 
                  : 'bg-white border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--text-dim)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Restaurant List */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[18px] font-extrabold tracking-tight">Delivering Now</h3>
          <button className="text-[12px] font-extrabold text-[var(--accent)] uppercase tracking-widest hover:text-[var(--accent-dark)] transition-colors">
            See All
          </button>
        </div>
        <div className="space-y-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </div>
  );
};
