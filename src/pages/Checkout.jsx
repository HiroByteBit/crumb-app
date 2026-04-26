import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, MapPin, CreditCard, ChevronRight, Apple } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useOrderStore } from '../store/useOrderStore';
import { restaurants } from '../data/mockData';
import { motion } from 'framer-motion';

export const Checkout = () => {
  const navigate = useNavigate();
  const { total } = useCart();
  const [tip, setTip] = useState(2);
  const placeOrder = useOrderStore((state) => state.placeOrder);
  const cart = useOrderStore((state) => state.cart);
  const restaurant = restaurants.find(r => r.id === cart.restaurantId) || restaurants[0];

  const handlePlaceOrder = () => {
    placeOrder(restaurant);
    navigate('/tracking');
  };

  const tips = [0, 1, 2, 3, 5];

  return (
    <div className="px-5 py-2">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[var(--bg-base)] rounded-full flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-[22px] font-extrabold tracking-tight">Checkout</h1>
      </div>

      <div className="space-y-6">
        {/* Delivery Address */}
        <section className="space-y-3">
          <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Delivery Address</h3>
          <div className="bg-white border border-[var(--border)] rounded-[24px] p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--accent-light)] rounded-2xl flex items-center justify-center text-[var(--accent)]">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold">2847 Pine St</h4>
                <p className="text-[12px] text-[var(--text-muted)]">Austin, TX 78701</p>
              </div>
            </div>
            <button className="text-[12px] font-bold text-[var(--accent)] uppercase tracking-wider">Change</button>
          </div>
        </section>

        {/* Payment Method */}
        <section className="space-y-3">
          <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Payment Method</h3>
          <div className="space-y-3">
            <div className="bg-white border-2 border-[var(--accent)] rounded-[24px] p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--bg-base)] rounded-2xl flex items-center justify-center">
                  <CreditCard size={24} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold">Visa •••• 4242</h4>
                  <p className="text-[12px] text-[var(--text-muted)]">Expires 12/28</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-6 border-[var(--accent)]" />
            </div>
            <div className="bg-white border border-[var(--border)] rounded-[24px] p-5 flex items-center justify-between opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white">
                  <Apple size={24} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold">Apple Pay</h4>
                  <p className="text-[12px] text-[var(--text-muted)]">Set as default</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-[var(--text-dim)]" />
            </div>
          </div>
        </section>

        {/* Tip Selector */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Add a Tip</h3>
            <span className="text-[12px] font-bold text-[var(--accent)]">100% goes to rider</span>
          </div>
          <div className="flex gap-2">
            {tips.map((amount) => (
              <motion.button
                key={amount}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTip(amount)}
                className={`flex-1 py-3 rounded-2xl text-[14px] font-bold transition-all border-2 ${
                  tip === amount 
                    ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent-dark)]' 
                    : 'bg-white border-[var(--border)] text-[var(--text-muted)]'
                }`}
              >
                {amount === 0 ? 'None' : `$${amount}`}
              </motion.button>
            ))}
          </div>
        </section>

        {/* Final Total */}
        <section className="bg-[var(--bg-base)] rounded-[24px] p-6 mt-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[14px] font-bold">Grand Total</h3>
              <p className="text-[12px] text-[var(--text-muted)]">Including fees & tip</p>
            </div>
            <span className="text-[28px] font-extrabold text-[var(--text-primary)] tracking-tight">
              ${(total + tip).toFixed(2)}
            </span>
          </div>
        </section>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-[var(--accent)] text-white py-5 rounded-[24px] font-extrabold text-[15px] uppercase tracking-widest shadow-2xl shadow-orange-200 mt-4 active:scale-[0.98] transition-transform"
        >
          Place Order — ${(total + tip).toFixed(2)}
        </button>
      </div>
    </div>
  );
};
