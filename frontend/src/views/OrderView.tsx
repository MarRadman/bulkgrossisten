import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import '../assets/Order.css';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';


type Order = {
  order_id: number;
  user_id: number;
  order_date: string;
  delivery_address: string;
  status: string;
};

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

function OrderView() {
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);

  // const cartItems = location.state.cartItems;


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No token found");
        return;
      }

      const response = await fetch('http://localhost:3000/orderUser', {
        headers: {
          'Authorization': token
        }
      });

      const result = await response.json();
      console.log(result);

      // Check if result.data is defined before trying to access its properties
      if(result && result.length === 0) {
        console.log("No orders found");
      } else if(result) {
        setOrderList(result);
        console.log(result);
      } else {
        console.log("Unexpected response format");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Order Details</h1>
      <ListGroup>
        {orderList.map((item, index) => (
          <ListGroup.Item key={index}>
            Order ID: {item.order_id} - Quantity: {item.quantity}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <BackBtn />
    </div>
  );
}

export default withAuthCheck(OrderView);
