import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, MessageSquare, Phone, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrackingMap } from '../components/map/TrackingMap';
import { useOrderStore } from '../store/useOrderStore';
import confetti from 'canvas-confetti';

const RESTAURANT_POS = [30.2672, -97.7431]; // Austin center
const HOME_POS = [30.2741, -97.7404];

export const Tracking = () => {
  const navigate = useNavigate();
  const activeOrder = useOrderStore((state) => state.activeOrder);
  const orderStatus = useOrderStore((state) => state.orderStatus);
  const advanceStatus = useOrderStore((state) => state.advanceOrderStatus);
  
  const [riderPos, setRiderPos] = useState(RESTAURANT_POS);
  const statusInterval = useRef(null);

  useEffect(() => {
    if (!activeOrder) {
      navigate('/');
      return;
    }

    // Advance status every 8 seconds
    statusInterval.current = setInterval(() => {
      const nextStatus = advanceStatus();
      if (nextStatus === 'delivered') {
        clearInterval(statusInterval.current);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f97316', '#22c55e', '#ffffff']
        });
      }
    }, 8000);

    return () => clearInterval(statusInterval.current);
  }, [activeOrder, navigate, advanceStatus]);

  // Interpolate rider position based on status
  useEffect(() => {
    if (orderStatus === 'confirmed' || orderStatus === 'preparing') {
      setRiderPos(RESTAURANT_POS);
    } else if (orderStatus === 'picked_up') {
      // Halfway
      setRiderPos([
        (RESTAURANT_POS[0] + HOME_POS[0]) / 2,
        (RESTAURANT_POS[1] + HOME_POS[1]) / 2,
      ]);
    } else if (orderStatus === 'arriving' || orderStatus === 'delivered') {
      setRiderPos(HOME_POS);
    }
  }, [orderStatus]);

  if (!activeOrder) return null;

  const statuses = [
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'picked_up', label: 'Picked Up' },
    { key: 'arriving', label: 'Arriving' },
  ];

  const currentStatusIndex = statuses.findIndex(s => s.key === orderStatus);
  const isDelivered = orderStatus === 'delivered';

  return (
    <div className="relative h-[100vh] -mt-16 overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <TrackingMap riderPos={riderPos} restaurantPos={RESTAURANT_POS} homePos={HOME_POS} />
      </div>

      {/* Header Overlay */}
      <div className="absolute top-8 left-5 right-5 z-10 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[var(--text-primary)]"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white flex items-center gap-2">
          <ShieldCheck size={18} className="text-[var(--green)]" />
          <span className="text-[13px] font-bold uppercase tracking-widest">Safe Delivery</span>
        </div>
      </div>

      {/* Bottom Sheet Status */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        className="absolute bottom-0 left-0 right-0 max-w-[768px] mx-auto bg-white rounded-t-[40px] z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] px-6 pt-2 pb-8"
      >
        <div className="w-12 h-1.5 bg-[var(--bg-base)] rounded-full mx-auto my-4" />
        
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[12px] font-bold text-[var(--accent)] uppercase tracking-[0.2em] mb-1">
              {isDelivered ? 'Order Delivered' : 'Estimated Arrival'}
            </h2>
            <p className="text-[32px] font-extrabold tracking-tight">
              {isDelivered ? 'Bon Appétit!' : activeOrder.rider.eta}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-[var(--bg-base)] rounded-lg text-[11px] font-bold text-[var(--text-muted)] border border-[var(--border)]">
              {activeOrder.id}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 relative">
          <div className="h-1.5 w-full bg-[var(--bg-base)] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[var(--accent)]"
              initial={{ width: '0%' }}
              animate={{ width: isDelivered ? '100%' : `${(currentStatusIndex + 1) * 25}%` }}
              transition={{ type: 'spring', damping: 20 }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {statuses.map((s, i) => {
              const active = i <= currentStatusIndex || isDelivered;
              return (
                <div key={s.key} className="flex flex-col items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-full border-2 transition-colors ${
                    active ? 'bg-[var(--accent)] border-[var(--accent)]' : 'bg-white border-[var(--text-dim)]'
                  }`} />
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${
                    active ? 'text-[var(--text-primary)]' : 'text-[var(--text-dim)]'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rider Info */}
        <div className="mt-10 bg-[var(--bg-base)] rounded-[32px] p-5 flex items-center justify-between border border-[var(--border)]">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=jordan" alt="Rider" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Star size={12} className="fill-[var(--amber)] text-[var(--amber)]" />
              </div>
            </div>
            <div>
              <h4 className="text-[16px] font-bold tracking-tight">{activeOrder.rider.name}</h4>
              <p className="text-[12px] text-[var(--text-muted)] mt-0.5">Your delivery partner</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-[var(--border)] flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors">
              <MessageSquare size={20} />
            </button>
            <button className="w-12 h-12 bg-[var(--accent)] rounded-2xl shadow-lg shadow-orange-100 flex items-center justify-center text-white hover:bg-[var(--accent-dark)] transition-colors">
              <Phone size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
