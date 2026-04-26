import React from 'react';
import { Star } from 'lucide-react';

/**
 * Star rating component
 * @param {Object} props
 * @param {number} props.rating
 * @param {number} props.count
 */
export const RatingStars = ({ rating, count }) => {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={i < Math.floor(rating) ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-[var(--text-dim)]'}
          />
        ))}
      </div>
      <span className="text-[12px] font-bold text-[var(--text-primary)] ml-0.5">{rating}</span>
      {count && <span className="text-[11px] text-[var(--text-muted)] ml-1">({count})</span>}
    </div>
  );
};
