import { create } from 'zustand';

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 * @property {Array} addons
 * @property {string} image
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {Object} restaurant
 * @property {Array<CartItem>} items
 * @property {number} total
 * @property {string} status
 * @property {Date} placedAt
 * @property {Object} rider
 */

export const useOrderStore = create((set, get) => ({
  cart: {
    restaurantId: null,
    items: [],
  },
  activeOrder: null,
  orderStatus: 'confirmed', // confirmed, preparing, picked_up, arriving, delivered
  favorites: new Set(),
  promoCode: null,
  promoDiscount: 0,
  deliveryAddress: {
    street: '2847 Pine St',
    city: 'Austin',
    state: 'TX',
  },
  selectedCategory: 'all',
  searchQuery: '',

  // Actions
  addItem: (item, addons = [], qty = 1, restaurantId) => {
    const { cart } = get();
    
    // If adding from a different restaurant, clear cart first
    if (cart.restaurantId && cart.restaurantId !== restaurantId) {
      set({
        cart: {
          restaurantId,
          items: [{ ...item, addons, quantity: qty, cartItemId: Math.random().toString(36).substr(2, 9) }]
        }
      });
      return;
    }

    const existingItemIndex = cart.items.findIndex(i => 
      i.id === item.id && JSON.stringify(i.addons) === JSON.stringify(addons)
    );

    if (existingItemIndex > -1) {
      const newItems = [...cart.items];
      newItems[existingItemIndex].quantity += qty;
      set({ cart: { ...cart, items: newItems, restaurantId } });
    } else {
      set({
        cart: {
          restaurantId,
          items: [...cart.items, { ...item, addons, quantity: qty, cartItemId: Math.random().toString(36).substr(2, 9) }]
        }
      });
    }
  },

  removeItem: (cartItemId) => {
    const { cart } = get();
    const newItems = cart.items.filter(i => i.cartItemId !== cartItemId);
    set({
      cart: {
        ...cart,
        items: newItems,
        restaurantId: newItems.length === 0 ? null : cart.restaurantId
      }
    });
  },

  updateQty: (cartItemId, qty) => {
    const { cart } = get();
    if (qty <= 0) {
      get().removeItem(cartItemId);
      return;
    }
    const newItems = cart.items.map(i => 
      i.cartItemId === cartItemId ? { ...i, quantity: qty } : i
    );
    set({ cart: { ...cart, items: newItems } });
  },

  applyPromo: (promo) => {
    if (promo.code === 'CRUMB20') {
      set({ promoCode: promo.code, promoDiscount: 0.2 });
      return true;
    }
    return false;
  },

  toggleFavorite: (restaurantId) => {
    const { favorites } = get();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(restaurantId)) {
      newFavorites.delete(restaurantId);
    } else {
      newFavorites.add(restaurantId);
    }
    set({ favorites: newFavorites });
  },

  placeOrder: (restaurant) => {
    const { cart } = get();
    const total = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
    
    const newOrder = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      restaurant,
      items: [...cart.items],
      total,
      placedAt: new Date(),
      status: 'confirmed',
      rider: {
        name: 'Jordan',
        rating: 4.9,
        eta: '12 min'
      }
    };

    set({
      activeOrder: newOrder,
      orderStatus: 'confirmed',
      cart: { restaurantId: null, items: [] },
      promoCode: null,
      promoDiscount: 0
    });
  },

  advanceOrderStatus: () => {
    const statuses = ['confirmed', 'preparing', 'picked_up', 'arriving', 'delivered'];
    const currentStatus = get().orderStatus;
    const nextIndex = statuses.indexOf(currentStatus) + 1;
    
    if (nextIndex < statuses.length) {
      set({ orderStatus: statuses[nextIndex] });
      return statuses[nextIndex];
    }
    return currentStatus;
  },

  setDeliveryAddress: (address) => set({ deliveryAddress: address }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
