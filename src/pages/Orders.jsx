import React from 'react';
import { ShoppingBag, ChevronRight, RefreshCw, Star } from 'lucide-react';
import { useOrderStore } from '../store/useOrderStore';
import { pastOrders } from '../data/mockData';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

export const Orders = () => {
  const navigate = useNavigate();
  const activeOrder = useOrderStore((state) => state.activeOrder);
  const orderStatus = useOrderStore((state) => state.orderStatus);

  return (
    <div className="px-5 py-4">
      <h1 className="text-[22px] font-extrabold tracking-tight mb-8">My Orders</h1>

      <div className="space-y-10">
        {/* Active Order */}
        {activeOrder && (
          <section className="space-y-4">
            <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Active Order</h3>
            <motion.div 
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/tracking')}
              className="bg-[var(--accent-light)] border border-[var(--accent)] rounded-[32px] p-6 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-[var(--accent)]/10 rounded-full blur-2xl group-hover:bg-[var(--accent)]/20 transition-colors" />
              <div className="flex justify-between items-start relative z-10">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                    <img src={activeOrder.restaurant.heroImage} className="w-full h-full object-cover rounded-2xl" />
                  </div>
                  <div>
                    <h4 className="text-[16px] font-extrabold">{activeOrder.restaurant.name}</h4>
                    <p className="text-[12px] font-bold text-[var(--accent)] mt-0.5 uppercase tracking-wider">
                      {orderStatus === 'delivered' ? 'Delivered' : `Status: ${orderStatus.replace('_', ' ')}`}
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[var(--accent)]" />
              </div>
              
              <div className="mt-6 flex items-center justify-between relative z-10">
                <div className="flex -space-x-2">
                  {activeOrder.items.slice(0, 3).map((item, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[var(--bg-base)] overflow-hidden">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  {activeOrder.items.length > 3 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-[var(--bg-base)] flex items-center justify-center text-[10px] font-bold">
                      +{activeOrder.items.length - 3}
                    </div>
                  )}
                </div>
                <button className="bg-white text-[var(--accent)] px-4 py-2 rounded-xl text-[12px] font-extrabold uppercase tracking-wider shadow-sm">
                  Track
                </button>
              </div>
            </motion.div>
          </section>
        )}

        {/* Past Orders */}
        <section className="space-y-6">
          <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Past Orders</h3>
          <div className="space-y-6">
            {pastOrders.map((order) => (
              <div key={order.id} className="flex gap-4 pb-6 border-b border-[var(--border)]">
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-base)] overflow-hidden flex-shrink-0">
                  <img src={order.restaurant.heroImage} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[15px] font-bold">{order.restaurant.name}</h4>
                      <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <span className="text-[14px] font-bold">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-base)] rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-[var(--accent-light)] transition-colors">
                      <RefreshCw size={12} />
                      Reorder
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-base)] rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-[var(--accent-light)] transition-colors">
                      <Star size={12} />
                      Rate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
