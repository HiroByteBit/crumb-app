import React from 'react';
import { Outlet } from 'react-router';
import { BottomNav } from './BottomNav';
import { TopBar } from './TopBar';

/**
 * Main application shell
 */
export const Shell = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[var(--bg-base)]">
      <div className="w-full max-w-[768px] min-h-screen bg-white shadow-sm flex flex-col relative">
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-24">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
};
