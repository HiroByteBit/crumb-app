import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Bike } from 'lucide-react';
import { RatingStars } from './RatingStars';
import { Badge } from './Badge';
import { useOrderStore } from '../../store/useOrderStore';
import { useNavigate } from 'react-router';

/**
 * Restaurant card for home list
 * @param {Object} props
 * @param {Object} props.restaurant
 */
export const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const toggleFavorite = useOrderStore((state) => state.toggleFavorite);
  const favorites = useOrderStore((state) => state.favorites);
  const isFavorite = favorites.has(restaurant.id);

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="bg-white p-3 rounded-[24px] border border-[var(--border)] shadow-sm cursor-pointer group hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-[18px]">
        <img
          src={restaurant.heroImage}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {restaurant.tags.map((tag) => (
            <Badge key={tag} variant={tag === 'Popular' ? 'purple' : 'accent'}>
              {tag}
            </Badge>
          ))}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(restaurant.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
        >
          <Heart
            size={16}
            className={isFavorite ? 'fill-[var(--red)] text-[var(--red)]' : 'text-[var(--text-primary)]'}
          />
        </button>
      </div>

      <div className="px-1 pt-4 pb-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[16px] font-bold text-[var(--text-primary)] leading-tight">{restaurant.name}</h3>
            <p className="text-[12px] text-[var(--text-muted)] mt-1">{restaurant.cuisine}</p>
          </div>
          <div className="flex-shrink-0">
            <RatingStars rating={restaurant.rating} count={restaurant.reviewCount} />
          </div>
        </div>
        
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[var(--border)] text-[12px] font-semibold text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-[var(--accent)]" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bike size={14} className="text-[var(--accent)]" />
            <span>{restaurant.deliveryFee === 0 ? 'Free' : `$${restaurant.deliveryFee.toFixed(2)}`}</span>
          </div>
          <div className="ml-auto">
            <span>{restaurant.distance}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
