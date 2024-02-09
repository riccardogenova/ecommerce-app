export interface Table<T> {
  [key: string]: T;
}

export type UserLogged = Omit<User, 'isActive' | 'password'> | null;

export interface User {
  isActive: boolean;
  id: string;
  isBusiness: boolean;
  email: string;
  password: string;
  name: string;
  lastName: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    country: string;
    zip: string;
  };
}

export interface Product {
  isAvailable: boolean;
  id: string;
  name: string;
  price: number;
  description: string;
  cover: string;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  deleted?: boolean;
}

export interface Order {
  id: string;
  totalPrice: number;
  date: Date;
  status: 'pending' | 'completed' | 'canceled';
}

export interface Cart {
  id: string;
}
