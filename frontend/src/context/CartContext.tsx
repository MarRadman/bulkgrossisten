import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product, CartItem } from '../types';


interface CartContextProps {
  cartItems: CartItem[]; //Create a array of CartItem type
  addCartItem: (product: Product) => void; //Add product to the cart
  handleRemove: (item: CartItem) => void; //Remove product from the cart
  clearCart: () => void; //Clear the cart
  totalPrice: number; //Total price of the cart
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>; //Set the total price of the cart
}

const CartContext = createContext<CartContextProps>({
  cartItems: [], //Initial value of cartItems
  addCartItem: () => {}, //Initial value of addCartItem
  handleRemove: () => {}, //Initial value of handleRemove
  clearCart: () => {}, //Initial value of clearCart
  totalPrice: 0, //Initial value of totalPrice
  setTotalPrice: () => {}, //Initial value of setTotalPrice
});

export const CartProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems)); //Store the cart items in the session storage
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

//{children}: This is a special prop in React that allows components to be passed as inputs to other components.
//https://react.dev/learn/passing-props-to-a-component
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
