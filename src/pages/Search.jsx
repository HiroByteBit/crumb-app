import React from 'react';
import { Search as SearchIcon, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrderStore } from '../store/useOrderStore';
import { restaurants } from '../data/mockData';
import { RestaurantCard } from '../components/ui/RestaurantCard';

export const Search = () => {
  const searchQuery = useOrderStore((state) => state.searchQuery);
  const setSearchQuery = useOrderStore((state) => state.setSearchQuery);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const query = searchQuery.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.cuisine.toLowerCase().includes(query) ||
      restaurant.menu.some(category => 
        category.items.some(item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        )
      )
    );
  });

  return (
    <div className="px-5 pt-6 pb-4">
      <div className="flex flex-col gap-6">
        <header>
          <h1 className="text-[28px] font-extrabold tracking-tight mb-2">Search</h1>
          <p className="text-[var(--text-muted)] text-[15px]">Find your favorite dishes or restaurants</p>
        </header>

        <div className="relative group">
          <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-dim)] group-focus-within:text-[var(--accent)] transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search restaurants or dishes..."
            className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-2xl py-4 pl-12 pr-12 text-[15px] font-medium focus:border-[var(--accent)] focus:ring-4 focus:ring-orange-50 transition-all outline-none"
            autoFocus
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--border)] rounded-full flex items-center justify-center text-[var(--text-dim)] hover:bg-[var(--text-dim)] hover:text-white transition-colors"
              >
                <X size={14} strokeWidth={3} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <section className="mt-2">
          {searchQuery ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-extrabold tracking-tight">
                  {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'result' : 'results'}
                </h3>
              </div>
              
              {filteredRestaurants.length > 0 ? (
                <div className="space-y-6">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center px-10">
                  <div className="w-20 h-20 bg-[var(--bg-base)] rounded-full flex items-center justify-center mb-4 text-[var(--text-dim)]">
                    <SearchIcon size={32} />
                  </div>
                  <h3 className="text-[18px] font-extrabold mb-2">No results found</h3>
                  <p className="text-[var(--text-muted)] text-[14px]">
                    We couldn't find anything matching "{searchQuery}". Try a different search term.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-8">
              <div>
                <h3 className="text-[16px] font-extrabold mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['Burgers', 'Sushi', 'Healthy', 'Free Delivery', 'Pizza', 'Italian'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-4 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--text-primary)] hover:border-[var(--accent)] hover:bg-orange-50 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-[var(--bg-base)] p-6 border border-[var(--border)]">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[var(--accent)] rounded-2xl flex items-center justify-center text-white">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-extrabold">Austin, TX</h4>
                    <p className="text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Current Location</p>
                  </div>
                </div>
                <p className="text-[13px] text-[var(--text-dim)] leading-relaxed">
                  You are seeing restaurants that deliver to your current location in Austin.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
