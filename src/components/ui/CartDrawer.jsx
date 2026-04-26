import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { useCart } from '../../hooks/useCart';
import { QuantityPicker } from './QuantityPicker';
import { useNavigate } from 'react-router';

/**
 * Cart drawer bottom sheet
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 */
export const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, serviceFee, total } = useCart();
  const updateQty = useOrderStore((state) => state.updateQty);
  const removeItem = useOrderStore((state) => state.removeItem);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 max-w-[768px] mx-auto bg-white rounded-t-[32px] z-[70] flex flex-col max-h-[90vh] shadow-2xl overflow-hidden"
          >
            {/* Handle */}
            <div className="w-12 h-1.5 bg-[var(--text-dim)] rounded-full mx-auto mt-4 mb-2" />
            
            <div className="px-6 py-4 flex items-center justify-between border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--accent-light)] rounded-xl flex items-center justify-center text-[var(--accent)]">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold">Your Cart</h2>
                  <p className="text-[12px] text-[var(--text-muted)]">{items.length} items from Burger Theory</p>
                </div>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-[var(--bg-base)] flex items-center justify-center">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-[var(--bg-base)] rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-[var(--text-dim)]" />
                  </div>
                  <h3 className="text-[16px] font-bold">Your cart is empty</h3>
                  <p className="text-[14px] text-[var(--text-muted)] mt-1">Add some delicious food to get started!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-[var(--border)]">
                          <img src={item.image} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-[14px] font-bold">{item.name}</h4>
                          <p className="text-[12px] text-[var(--accent)] font-bold">${item.price.toFixed(2)}</p>
                          {item.addons.length > 0 && (
                            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                              {item.addons.map(a => a.name).join(', ')}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <QuantityPicker 
                          small 
                          value={item.quantity} 
                          onChange={(val) => updateQty(item.cartItemId, val)} 
                        />
                        <button 
                          onClick={() => removeItem(item.cartItemId)}
                          className="w-8 h-8 flex items-center justify-center text-[var(--red)] hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-6 bg-[var(--bg-base)] border-t border-[var(--border)] space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[var(--text-muted)]">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[var(--text-muted)]">Delivery Fee</span>
                    <span className="font-bold">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[var(--text-muted)]">Service Fee</span>
                    <span className="font-bold">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 flex justify-between text-[18px] border-t border-[var(--border)]">
                    <span className="font-extrabold uppercase tracking-tight">Total</span>
                    <span className="font-extrabold text-[var(--accent)]">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full bg-[var(--accent)] text-white py-4 rounded-2xl font-bold text-[14px] uppercase tracking-widest shadow-lg shadow-orange-200 hover:bg-[var(--accent-dark)] transition-all active:scale-[0.98]"
                >
                  Checkout →
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
