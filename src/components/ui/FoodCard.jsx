import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Food item card for restaurant menu
 * @param {Object} props
 * @param {Object} props.item
 * @param {Function} props.onAdd
 */
export const FoodCard = ({ item, onAdd }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="flex items-center p-3 bg-white rounded-[24px] border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onAdd}
    >
      <div className="flex-1 pr-4 pl-1 py-1">
        <div className="flex items-center gap-2">
          <h4 className="text-[15px] font-bold text-[var(--text-primary)] leading-tight">{item.name}</h4>
          {item.isVeg && <div className="w-2 h-2 rounded-full bg-[var(--green)] flex-shrink-0" />}
        </div>
        <p className="text-[13px] text-[var(--text-muted)] line-clamp-2 mt-1.5 leading-snug">
          {item.description}
        </p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-[15px] font-extrabold text-[var(--text-primary)]">${item.price.toFixed(2)}</span>
          {item.isPopular && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--amber)] bg-amber-50 px-2 py-0.5 rounded-md">
              Popular
            </span>
          )}
        </div>
      </div>
      
      <div className="relative flex-shrink-0">
        <div className="w-[100px] h-[100px] rounded-[18px] overflow-hidden bg-[var(--bg-base)]">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="absolute -bottom-2 -right-2 w-9 h-9 bg-[var(--accent)] text-white rounded-full flex items-center justify-center shadow-lg shadow-orange-200 hover:bg-[var(--accent-dark)] transition-colors"
        >
          <Plus size={18} strokeWidth={3} />
        </button>
      </div>
    </motion.div>
  );
};
