export const restaurants = [
  {
    id: 'r1',
    name: 'Burger Theory',
    cuisine: 'American • Burgers',
    rating: 4.8,
    reviewCount: 1250,
    deliveryTime: '15–25 min',
    deliveryFee: 0,
    minOrder: 10,
    distance: '0.8mi',
    tags: ['Popular', 'Top Rated', 'Free Delivery'],
    isOpen: true,
    heroImage: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 'c1',
        name: 'Popular Items',
        items: [
          {
            id: 'm1',
            name: 'Classic Smash Burger',
            description: 'Double wagyu beef patty, cheddar, secret sauce, pickles, toasted brioche.',
            price: 14.99,
            calories: 850,
            isPopular: true,
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
            addons: [
              { id: 'a1', name: 'Extra Cheese', price: 1.50 },
              { id: 'a2', name: 'Bacon', price: 2.00 }
            ]
          },
          {
            id: 'm2',
            name: 'Truffle Fries',
            description: 'Hand-cut fries, parmesan, white truffle oil, parsley.',
            price: 6.50,
            calories: 420,
            isPopular: true,
            isVeg: true,
            image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80',
            addons: []
          }
        ]
      },
      {
        id: 'c2',
        name: 'Burgers',
        items: [
          {
            id: 'm3',
            name: 'The BBQ Beast',
            description: 'Wagyu beef, onion rings, BBQ sauce, jalapeños.',
            price: 16.50,
            calories: 980,
            isPopular: false,
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=400&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 'r2',
    name: 'Sushi Zen',
    cuisine: 'Japanese • Sushi',
    rating: 4.9,
    reviewCount: 840,
    deliveryTime: '25–35 min',
    deliveryFee: 2.99,
    minOrder: 20,
    distance: '1.2mi',
    tags: ['Top Rated', 'Healthy'],
    isOpen: true,
    heroImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 'c3',
        name: 'Signature Rolls',
        items: [
          {
            id: 'm4',
            name: 'Dragon Roll',
            description: 'Eel, cucumber inside, topped with avocado and eel sauce.',
            price: 18.00,
            calories: 450,
            isPopular: true,
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?auto=format&fit=crop&w=400&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 'r3',
    name: 'Pasta Fresca',
    cuisine: 'Italian • Pasta',
    rating: 4.7,
    reviewCount: 2100,
    deliveryTime: '20–30 min',
    deliveryFee: 1.99,
    minOrder: 15,
    distance: '0.5mi',
    tags: ['Popular', 'Family Style'],
    isOpen: true,
    heroImage: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=800&q=80',
    menu: [
      {
        id: 'c4',
        name: 'Main Courses',
        items: [
          {
            id: 'm5',
            name: 'Rigatoni Carbonara',
            description: 'Guanciale, pecorino romano, egg yolk, black pepper.',
            price: 19.50,
            calories: 720,
            isPopular: true,
            isVeg: false,
            image: 'https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?auto=format&fit=crop&w=400&q=80'
          }
        ]
      }
    ]
  }
];

export const categories = [
  { id: 'cat1', label: 'All' },
  { id: 'cat2', label: 'Pizza' },
  { id: 'cat3', label: 'Burgers' },
  { id: 'cat4', label: 'Sushi' },
  { id: 'cat5', label: 'Mexican' },
  { id: 'cat6', label: 'Thai' },
  { id: 'cat7', label: 'Indian' },
  { id: 'cat8', label: 'Salads' },
  { id: 'cat9', label: 'Desserts' }
];

export const promos = [
  { id: 'p1', code: 'CRUMB20', description: '20% off your next order', discount: 0.2, type: 'percent' },
  { id: 'p2', code: 'FREEDEL', description: 'Free delivery on all orders', discount: 1, type: 'free_delivery' },
  { id: 'p3', code: 'NEWUSER', description: '$5 off your first order', discount: 5, type: 'fixed' }
];

export const pastOrders = [
  {
    id: 'o1',
    restaurant: restaurants[0],
    items: [
      { ...restaurants[0].menu[0].items[0], quantity: 1 }
    ],
    total: 16.49,
    date: '2026-04-20T18:30:00Z',
    status: 'delivered',
    rating: 5
  }
];
