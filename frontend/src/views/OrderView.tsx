import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import '../assets/Order.css';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';


type OrderItem = {
  product_id: number;
  quantity: number;
};

type Order = {
  order_id: number;
  delivery_address: string;
  status: string;
  items: OrderItem[];
};

function OrderView() {
  const [orderList, setOrderList] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("No token found");
        return;
      }

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        });

        if (!response.ok) {
          console.log(`HTTP error! status: ${response.status}`);
          return;
        }

        let result = await response.json();
        console.log(result);

        if(result && result.length === 0) {
          console.log("No orders found");
        } else if(result) {

          result = result.map(order => ({
            ...order,
            items: order.items || [],
          }));

          setOrderList(result);
        } else {
          console.log("Unexpected response format");
        }

      } catch (error) {
        console.error("An error occurred while fetching the orders:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Orders</h2>
        <ListGroup>
        {orderList.map((order: Order, index: number) => (
          <ListGroup.Item key={index}>
            Order ID: {order.order_id}
            Delivery address: {order.delivery_address}
            Status: {order.status}
            Items:
            <ul>
              {order.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  Product ID: {item.product_id} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
      </ListGroup.Item>
    ))}
  </ListGroup>
      <BackBtn />
    </div>
  );
}

export default withAuthCheck(OrderView);
