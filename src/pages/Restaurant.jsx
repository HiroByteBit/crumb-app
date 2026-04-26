import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Share2, Heart, Info, Star, Clock, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurants } from '../data/mockData';
import { FoodCard } from '../components/ui/FoodCard';
import { useOrderStore } from '../store/useOrderStore';
import { useCart } from '../hooks/useCart';
import { CartDrawer } from '../components/ui/CartDrawer';

export const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find(r => r.id === id);
  const [activeCategory, setActiveCategory] = useState(restaurant?.menu[0]?.id);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const addItem = useOrderStore((state) => state.addItem);
  const { itemCount, total } = useCart();
  const favorites = useOrderStore((state) => state.favorites);
  const toggleFavorite = useOrderStore((state) => state.toggleFavorite);

  if (!restaurant) return <div>Restaurant not found</div>;

  return (
    <div className="relative">
      {/* Hero Header */}
      <div className="relative h-[240px]">
        <img src={restaurant.heroImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
              <Share2 size={18} />
            </button>
            <button 
              onClick={() => toggleFavorite(restaurant.id)}
              className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg"
            >
              <Heart size={18} className={favorites.has(restaurant.id) ? 'fill-[var(--red)] text-[var(--red)]' : ''} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-5 right-5 text-white">
          <h1 className="text-[28px] font-extrabold tracking-tight">{restaurant.name}</h1>
          <div className="flex items-center gap-3 mt-1 text-[13px] font-medium opacity-90">
            <span>{restaurant.cuisine}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-white" />
              <span>{restaurant.rating} ({restaurant.reviewCount}+ reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mx-5 -mt-4 relative z-10 bg-white rounded-2xl p-4 shadow-xl shadow-black/5 border border-[var(--border)] flex items-center justify-between">
        <div className="flex gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Delivery</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Clock size={14} className="text-[var(--accent)]" />
              <span className="text-[13px] font-bold">{restaurant.deliveryTime}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Fee</span>
            <div className="mt-0.5 text-[13px] font-bold">
              {restaurant.deliveryFee === 0 ? 'FREE' : `$${restaurant.deliveryFee}`}
            </div>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-[var(--bg-base)] flex items-center justify-center text-[var(--text-muted)]">
          <Info size={18} />
        </button>
      </div>

      {/* Sticky Categories */}
      <div className="sticky top-16 bg-white z-30 pt-6 pb-2 px-5 border-b border-[var(--border)] mt-2">
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {restaurant.menu.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`pb-3 text-[14px] font-bold whitespace-nowrap relative transition-colors ${
                activeCategory === cat.id ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
              }`}
            >
              {cat.name}
              {activeCategory === cat.id && (
                <motion.div layoutId="cat-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-5 py-6 space-y-8 pb-32">
        {restaurant.menu.map((cat) => (
          <div key={cat.id} className="space-y-4">
            <h2 className="text-[18px] font-extrabold tracking-tight">{cat.name}</h2>
            <div className="grid grid-cols-1 gap-4">
              {cat.items.map((item) => (
                <FoodCard 
                  key={item.id} 
                  item={item} 
                  onAdd={() => addItem(item, [], 1, restaurant.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Pill */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[400px] z-40"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-[var(--accent)] text-white h-14 rounded-2xl flex items-center justify-between px-6 shadow-xl shadow-orange-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center relative">
                  <ShoppingCart size={18} />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[var(--accent)] rounded-full text-[10px] font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                </div>
                <span className="text-[14px] font-bold uppercase tracking-widest">View Cart</span>
              </div>
              <span className="text-[16px] font-extrabold">${total.toFixed(2)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
