import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Quantity picker with buttons
 * @param {Object} props
 * @param {number} props.value
 * @param {Function} props.onChange
 * @param {boolean} props.small
 */
export const QuantityPicker = ({ value, onChange, small = false }) => {
  return (
    <div className={`flex items-center bg-[var(--bg-base)] rounded-full p-1 border border-[var(--border)] ${small ? 'gap-2' : 'gap-4'}`}>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(value - 1)}
        className={`${small ? 'w-6 h-6' : 'w-8 h-8'} bg-white rounded-full flex items-center justify-center shadow-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors`}
      >
        <Minus size={small ? 14 : 16} strokeWidth={2.5} />
      </motion.button>
      
      <span className={`font-bold text-[var(--text-primary)] ${small ? 'text-[13px] min-w-[12px]' : 'text-[15px] min-w-[20px]'} text-center`}>
        {value}
      </span>
      
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(value + 1)}
        className={`${small ? 'w-6 h-6' : 'w-8 h-8'} bg-[var(--accent)] rounded-full flex items-center justify-center shadow-sm text-white hover:bg-[var(--accent-dark)] transition-colors`}
      >
        <Plus size={small ? 14 : 16} strokeWidth={2.5} />
      </motion.button>
    </div>
  );
};
