import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router';
import { Shell } from './components/layout/Shell';
import { Home } from './pages/Home';
import { Restaurant } from './pages/Restaurant';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Tracking } from './pages/Tracking';
import { Orders } from './pages/Orders';
import { Search } from './pages/Search';
import { Favorites } from './pages/Favorites';
import { Profile } from './pages/Profile';

const router = createHashRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <Search /> },
      { path: 'restaurant/:id', element: <Restaurant /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'tracking', element: <Tracking /> },
      { path: 'orders', element: <Orders /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
