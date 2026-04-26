import React from 'react';

/**
 * Reusable badge component
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'accent' | 'green' | 'red' | 'amber' | 'purple' | 'muted'} props.variant
 */
export const Badge = ({ children, variant = 'accent' }) => {
  const variants = {
    accent: 'bg-[var(--accent-light)] text-[var(--accent-dark)]',
    green: 'bg-[#f0fdf4] text-[var(--green)]',
    red: 'bg-[#fef2f2] text-[var(--red)]',
    amber: 'bg-[#fffbeb] text-[var(--amber)]',
    purple: 'bg-[#f5f3ff] text-[var(--purple)]',
    muted: 'bg-[var(--bg-base)] text-[var(--text-muted)]',
  };

  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${variants[variant]}`}>
      {children}
    </span>
  );
};
