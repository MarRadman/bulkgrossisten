import { useState, useEffect } from 'react';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../assets/Order.css';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';
import "../assets/Order.css";

type OrderItem = {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
};

type Order = {
  order_id: number;
  delivery_address: string;
  status: string;
  order_date: string;
  items: OrderItem[];
};

type User = {
  user_id: number;
  username: string;
  email: string;
  address: string;
  phone_number: string;
  country: string;
};

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const OrderView = () => {
  const [userId, setUserId] = useState<User | null>(null);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const token = localStorage.getItem('token');
  const [price, setPrice] = useState(0);
  sessionStorage.setItem('cart', JSON.stringify([]));
  const [totalPrice, setTotalPrice] = useState(0);

  async function fetchProductData() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/productsAdmin', {
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        return;
      }

      const products: Product[] = await response.json();
      setProductList(products);
    } catch (error) {
      console.error('An error occurred while fetching the product data:', error);
   }
  };

  const fetchUserAndOrders = async () => {
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      // Fetch the user
      const userResponse = await fetch(`http://localhost:3000/user`, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });

      if (!userResponse.ok) {
        throw new Error('HTTP error ' + userResponse.status);
      }

      const userId: User = await userResponse.json();
      setUserId(userId);

      // Fetch the orders for this user
      const orderResponse = await fetch(`http://localhost:3000/orderUser/${userId.user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });

      if (!orderResponse.ok) {
        console.log(`HTTP error! status: ${orderResponse.status}`);
        return;
      }

      const orderResult = await orderResponse.json();

      setOrderList(orderResult);
      // console.log(orderResult);
      let total = 0;

      // Add price to each item in each order
      if(totalPrice === 0) {
        for (const order of orderResult) {
          for (const item of order.items) {
            const product = productList.find(product => product.product_id === item.product_id);
            if (product) {
              item.price = product.price;
              setPrice(product.price); // set the price of the current item
              total += product.price * item.quantity; // add the total price of the current item to the total
            } else {
              console.log('No product found for item:', item);
            }
          }
        }
      }

      setTotalPrice(total);
    } catch (error) {
      console.error("An error occurred while fetching the user and orders:", error);
    }
  };

  useEffect(() => {
    if(token) {
      fetchProductData();
      fetchUserAndOrders();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  }, [totalPrice]);

  return (
    <React.Fragment>
      {userId && (
        <ListGroup>
          <h2>User Information</h2>
          <p>Username: {userId.username}</p>
          <p>Email: {userId.email}</p>
          <p>Address: {userId.address}</p>
          <p>Phone number: {userId.phone_number}</p>
          <p>Country: {userId.country}</p>
        </ListGroup>
      )}
      <h2>Order Information</h2>
      <div className="orders-grid">  {/* This div applies the grid layout to the orders */}
        {orderList && orderList.map((order: Order, index: number) => {
          // Calculate the total price for this order
          const orderTotalPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0);

          return (
            <div className="order-card">
              <ListGroup.Item key={index}>
                <p>Order ID: {order.order_id}</p>
                <p>Order Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <p>Delivery address: {order.delivery_address}</p>
                <p>Status: {order.status}</p>
                <h5>Items:</h5>
                <ul>
                  {order.items && order.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <p>Product: {item.product_name} x {item.quantity}</p>
                    </li>
                  ))}
                </ul>
                <p>Total Price: {orderTotalPrice}</p>  {/* Display the total price for this order */}
              </ListGroup.Item>
            </div>
          );
        })}
      </div>
      <ul>
        <li><p>Total Price: {totalPrice}</p></li>
      </ul>
      <BackBtn />
    </React.Fragment>
  );
}

export default withAuthCheck(OrderView);
