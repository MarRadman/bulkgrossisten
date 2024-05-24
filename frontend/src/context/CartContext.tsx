import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product, CartItem } from '../types';


interface CartContextProps {
  cartItems: CartItem[];
  addCartItem: (product: Product) => void;
  handleRemove: (item: CartItem) => void;
  clearCart: () => void;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addCartItem: () => {},
  handleRemove: () => {},
  clearCart: () => {},
  totalPrice: 0,
  setTotalPrice: () => {},
});

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function handleAdd(productToAdd: Product) {
    setCartItems((prevItems: CartItem[]) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex(item => item.product.product_id === productToAdd.product_id);

      if (itemIndex !== -1) {
        const updatedItem = { ...newItems[itemIndex], quantity: newItems[itemIndex].quantity + 1 };
        newItems[itemIndex] = updatedItem;
      } else {
        newItems.push({ product: productToAdd, quantity: 1 });
      }
      return newItems;
    });
  }

  function handleRemove(item: CartItem) {
    setCartItems((prevItems: CartItem[]) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.findIndex(i => i.product.product_id === item.product.product_id);

      if (itemIndex !== -1) {
        if (newItems[itemIndex].quantity > 1) {
          const updatedItem = { ...newItems[itemIndex], quantity: newItems[itemIndex].quantity - 1 };
          newItems[itemIndex] = updatedItem;
        } else {
          newItems.splice(itemIndex, 1);
        }
      }
      return newItems;
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addCartItem: handleAdd,
      handleRemove: handleRemove,
      clearCart,
      totalPrice,
      setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
