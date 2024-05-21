import React, { useEffect, useState  } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/Cart.css';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';
import useSessionStorage from '../hooks/SessionStorageHook';
import { ListGroup } from 'react-bootstrap';
import image1 from '../assets/productsPhotos/1.jpg';
import image2 from '../assets/productsPhotos/2.jpg';
import image3 from '../assets/productsPhotos/3.jpg';
import image4 from '../assets/productsPhotos/4.jpg';
import image5 from '../assets/productsPhotos/5.jpg';
import image6 from '../assets/productsPhotos/6.jpg';
import image7 from '../assets/productsPhotos/7.jpg';
import image8 from '../assets/productsPhotos/8.jpg';

const images: { [key: number]: string } = {
  1: image1,
  2: image2,
  3: image3,
  4: image4,
  5: image5,
  6: image6,
  7: image7,
  8: image8
};

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  images: string;
}
interface CartItem {
  product: {
    product_id: number;
    name: string;
    description: string;
    price: number;
    images: string;
  };
  quantity: number;
}

function CartView() {
  const [cartItems, setCartItems] = useSessionStorage<CartItem[]>("cart", []);
  const [productList, setProductList] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    for (const items of cartItems) {
      total += items.product.price * items.quantity;
    }
    setTotalPrice(total);
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
      // refreshPage(); //Temporary solution to refresh the page
      return newItems;
    })
  }

  function handleRemove(productToRemove: Product) {
    setCartItems((prevItems: CartItem[]) => {
      // Create a new array that's a copy of prevItems
      const newItems = [...prevItems];

      // Find the index of the product in the new array
      const itemIndex = newItems.findIndex(item => item.product.product_id === productToRemove.product_id);

      if (itemIndex !== -1) {
        // If the product is in the cart and its quantity is more than 1, we decrease the quantity
        if (newItems[itemIndex].quantity > 1) {
          const updatedItem = { ...newItems[itemIndex], quantity: newItems[itemIndex].quantity - 1 };
          newItems[itemIndex] = updatedItem;
        } else {
          // If the product is in the cart and its quantity is 1, we remove it
          newItems.splice(itemIndex, 1);
        }
      }
      // refreshPage(); //Temporary solution to refresh the page
      return newItems;
    });
  }

  function handlePayment() {
    const fetchOrderData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('No token found');
        return;
      }

      const cartItems = JSON.parse(sessionStorage.getItem('cart') || '[]');

      if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const items = cartItems.map((item: CartItem) => ({
        product_id: item.product.product_id,
        quantity: item.quantity
      }));

      const order = {
        items
      };

      try {
        const response = await fetch('http://localhost:3000/orderUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(order)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const orders = await response.json();
        alert("Payment Successful");
        navigate('/order', { state: { orders } });
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrderData();
  }

  // function refreshPage(){
  //   window.location.reload();
  // }

  return (
    <React.Fragment>
      <h2>Cart</h2>
      <div className="product-grid-cart">
      {productList && cartItems.map((item: CartItem) => (
        <div className="product-card" key={item.product.product_id}>
          <ListGroup.Item action className="product-item">
            <h2>{item.product.name}</h2>
            <img src={images[item.product.product_id]} alt={item.product.name} />
            <p>Pris: {item.product.price}kr</p>
            <div className="addOrRemoveQuantity">
            <input type="button" value={"-"} onClick={() => handleRemove(item.product)} style={{
              height:"30px",
              width:"20px",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }} />
              <p>Quantity: {item.quantity}</p>
            <input type="button" value="+" onClick={() => handleAdd(item.product)}   style={{
              height:"30px",
              width:"20px",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }} />
            </div>
          </ListGroup.Item>
          </div>
          ))}
          </div>
          {cartItems.length <= 0  && <p>Your cart is empty. Checkout <a href="/products">Products</a></p>}
          {cartItems.length > 0 && <p>Total Price: {totalPrice}kr</p> &&
          <input onClick={handlePayment} type="button" value="Procced to Payment" />}
      <BackBtn />
    </React.Fragment>
  );
}
export default withAuthCheck(CartView);
