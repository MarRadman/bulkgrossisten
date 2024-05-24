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
