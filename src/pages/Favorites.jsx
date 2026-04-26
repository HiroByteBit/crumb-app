import React from 'react';
import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router';
import { useOrderStore } from '../store/useOrderStore';
import { restaurants } from '../data/mockData';
import { RestaurantCard } from '../components/ui/RestaurantCard';

export const Favorites = () => {
  const favorites = useOrderStore((state) => state.favorites);
  
  const favoriteRestaurants = restaurants.filter((r) => favorites.has(r.id));

  return (
    <div className="px-5 pt-6 pb-4">
      <header className="mb-8">
        <h1 className="text-[28px] font-extrabold tracking-tight mb-2">Favorites</h1>
        <p className="text-[var(--text-muted)] text-[15px]">The places you love the most</p>
      </header>

      {favoriteRestaurants.length > 0 ? (
        <div className="space-y-6">
          {favoriteRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center px-10">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-[var(--accent)]">
            <Heart size={40} fill="currentColor" strokeWidth={0} />
          </div>
          <h3 className="text-[20px] font-extrabold mb-3">No favorites yet</h3>
          <p className="text-[var(--text-muted)] text-[15px] leading-relaxed mb-8">
            Start exploring and save your favorite restaurants to find them quickly next time.
          </p>
          <Link
            to="/search"
            className="flex items-center gap-2 px-8 py-4 bg-[var(--text-primary)] text-white rounded-2xl text-[15px] font-extrabold hover:opacity-90 transition-all shadow-lg shadow-gray-200"
          >
            <Search size={18} />
            Find Restaurants
          </Link>
        </div>
      )}
    </div>
  );
};
