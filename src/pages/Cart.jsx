import React from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useOrderStore } from '../store/useOrderStore';
import { QuantityPicker } from '../components/ui/QuantityPicker';

export const Cart = () => {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, serviceFee, total } = useCart();
  const updateQty = useOrderStore((state) => state.updateQty);
  const removeItem = useOrderStore((state) => state.removeItem);

  return (
    <div className="px-5 py-2">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[var(--bg-base)] rounded-full flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-[22px] font-extrabold tracking-tight">Your Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="py-20 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-[var(--bg-base)] rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={40} className="text-[var(--text-dim)]" />
          </div>
          <h2 className="text-[20px] font-bold">Your cart is empty</h2>
          <p className="text-[14px] text-[var(--text-muted)] mt-2 max-w-[200px]">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="mt-8 bg-[var(--accent)] text-white px-8 py-3 rounded-2xl font-bold uppercase tracking-widest"
          >
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.cartItemId} className="flex gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[var(--border)] shadow-sm">
                  <img src={item.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-[14px] font-bold">{item.name}</h3>
                    <p className="text-[14px] font-bold text-[var(--accent)]">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <QuantityPicker small value={item.quantity} onChange={(val) => updateQty(item.cartItemId, val)} />
                    <button onClick={() => removeItem(item.cartItemId)} className="text-[var(--red)] p-1">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[var(--bg-base)] rounded-[24px] p-6 space-y-4">
            <div className="flex justify-between text-[14px]">
              <span className="text-[var(--text-muted)] font-medium">Subtotal</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[var(--text-muted)] font-medium">Delivery Fee</span>
              <span className="font-bold">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-[var(--text-muted)] font-medium">Service Fee</span>
              <span className="font-bold">${serviceFee.toFixed(2)}</span>
            </div>
            <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
              <span className="text-[18px] font-extrabold uppercase tracking-tight">Total</span>
              <span className="text-[22px] font-extrabold text-[var(--accent)]">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-[var(--accent)] text-white py-5 rounded-[24px] font-extrabold text-[15px] uppercase tracking-widest shadow-xl shadow-orange-100"
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );
};
