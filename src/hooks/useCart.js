import { useOrderStore } from '../store/useOrderStore';

/**
 * Hook for cart calculations and actions
 */
export const useCart = () => {
  const cart = useOrderStore((state) => state.cart);
  const promoDiscount = useOrderStore((state) => state.promoDiscount);

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.items.length > 0 ? 2.99 : 0;
  const serviceFee = subtotal * 0.1;
  const discountAmount = subtotal * promoDiscount;
  const total = subtotal + deliveryFee + serviceFee - discountAmount;

  return {
    items: cart.items,
    restaurantId: cart.restaurantId,
    subtotal,
    deliveryFee,
    serviceFee,
    discountAmount,
    total,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  };
};
