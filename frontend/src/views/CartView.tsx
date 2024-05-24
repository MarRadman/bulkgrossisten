import React, { useEffect, useState  } from "react";
import { useNavigate } from 'react-router-dom';
import '../assets/CartView.css';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';
import { ListGroup } from 'react-bootstrap';
import image1 from '../assets/1.jpg';
import image2 from '../assets/2.jpg';
import image3 from '../assets/3.jpg';
import image4 from '../assets/4.jpg';
import image5 from '../assets/5.jpg';
import image6 from '../assets/6.jpg';
import image7 from '../assets/7.jpg';
import image8 from '../assets/8.jpg';
import { Link } from 'react-router-dom';
import config from "../../config";
import { CartItem } from '../types';
import { useCart } from '../context/CartContext';

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

function CartView() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cartItems, addCartItem , handleRemove, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    for (const items of cartItems) {
      total += items.product.price * items.quantity;
    }
    setTotalPrice(total);
  }, [cartItems]);

  async function handlePayment() {
    const fetchOrderData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('No token found');
        return;
      }

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
        const response = await fetch(`${config.apiUrl}/orderUser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(order)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.json();
          alert("Payment Successful");
          clearCart();
          navigate('/order', { state: { data } });
        }

      } catch (error) {
        console.error("An error occurred while sending the order:", error);
      }
    };

    fetchOrderData();
  }

  return (
    <React.Fragment>
      <h2 className="cart-title">Cart</h2>
      <div className="product-grid-cart">
      {cartItems.map((item: CartItem) => (
        <div className="product-card-cart" key={item.product.product_id}>
          <ListGroup.Item action className="product-item-cart">
            <h2>{item.product.name}</h2>
            <img src={images[item.product.product_id]} alt={item.product.name} />
            <p>Pris: {item.product.price}kr</p>
            <div className="addOrRemoveQuantity">
            <input type="button" value={"-"} onClick={() => handleRemove(item)} className="quantity-button-rmv"/>
              <p>Quantity: {item.quantity}</p>
              <input type="button" value="+" onClick={() => addCartItem(item.product)} className="quantity-button-add" />
            </div>
          </ListGroup.Item>
          </div>
          ))}
          </div>
          {cartItems.length <= 0  && <p>Your cart is empty. Checkout <Link to="/products">Products</Link></p>}
          {cartItems.length > 0 && (
            <React.Fragment>
              <p>Total Price: {totalPrice}kr</p>
              <button onClick={handlePayment} className="proceed-button">Proceed to Payment</button>
            </React.Fragment>
          )}
      <BackBtn />
    </React.Fragment>
  );
}
export default withAuthCheck(CartView);
