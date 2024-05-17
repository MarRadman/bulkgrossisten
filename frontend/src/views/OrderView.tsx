import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import '../assets/Order.css';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';

function OrderView() {

  type Order = {
    order_id: number;
    user_id: number;
    order_date: string;
    delivery_address: string;
    status: string;
  };

  const [orderList, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No token found");
        return;
      }

      const responseOrders = await fetch(`http://localhost:3000/orders?token=${token}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const resultOrders = await responseOrders.json();

      if(resultOrders.length === 0 || resultOrders === null) {
        console.log("No orders found");
      } else {
        setOrderList(resultOrders);
        console.log(resultOrders);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Your Orders</h1>
      {orderList.length > 0 ? (
        <ListGroup>
          {orderList.map((order) => (
            <ListGroup.Item key={order.order_id}>
              <p>Order ID: {order.order_id}</p>
              <p>Order Date: {order.order_date}</p>
              <p>Delivery Address: {order.delivery_address}</p>
              <p>Status: {order.status}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>You have no orders.</p>
      )}
      <BackBtn />
    </div>
  );
}

export default withAuthCheck(OrderView);
