
import React, { createContext, useContext, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  featured?: boolean;
  stock: number;
  rating?: number;
}

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  getProduct: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Sample product data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Minimalist Desk Lamp',
    description: 'A sleek and elegant desk lamp with adjustable brightness and color temperature. Perfect for your workspace.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1534114707912-be798cce259d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    category: 'lighting',
    featured: true,
    stock: 15,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Wireless Charging Pad',
    description: 'Effortlessly charge your devices with this minimalist wireless charging pad.',
    price: 59.99,
    images: [
      'https://images.unsplash.com/photo-1625895197185-efcec01cffe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616370173612-1d29f9f6f3c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    category: 'accessories',
    featured: true,
    stock: 20,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'Smart Speaker',
    description: 'A premium smart speaker with incredible sound quality and voice assistant.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    category: 'audio',
    stock: 8,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Minimalist Watch',
    description: 'A sophisticated timepiece with a clean, minimalist design.',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    category: 'watches',
    featured: true,
    stock: 12,
    rating: 4.9,
  },
  {
    id: '5',
    name: 'Portable Power Bank',
    description: 'High-capacity power bank with fast charging capability.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1609091839309-37aa08d56931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583149577730-a6d5f22364a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    category: 'accessories',
    stock: 25,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'Premium wireless earbuds with noise cancellation and crystal-clear sound.',
    price: 159.99,
    images: [
      'https://images.unsplash.com/photo-1605464315513-0dcb0696e3e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    ],
    category: 'audio',
    featured: true,
    stock: 10,
    rating: 4.7,
  },
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const products = sampleProducts;
  
  const featuredProducts = products.filter(product => product.featured);
  
  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };
  
  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };
  
  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        featuredProducts, 
        getProduct, 
        getProductsByCategory 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
};
