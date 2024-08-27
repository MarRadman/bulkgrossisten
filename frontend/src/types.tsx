export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  images?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Item = {
  product_id: number;
  product_name: string;
  quantity: number;
};

export type Order = {
  order_id: number;
  user_id: number;
  order_date: string;
  delivery_address: string;
  status: string;
  items: Item[];
};

export type User = {
  user_id: number;
  username: string;
  email: string;
  address: string;
  phone_number: string;
  country: string;
};
