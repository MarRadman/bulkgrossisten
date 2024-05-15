import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import '../assets/Member.css';

function MemberView() {

type User = {
  user_id: number;
  username: string;
  password_hash: string;
  email: string;
  phone_number: string;
  address: string;
  country: string;
};

type Order = {
  order_id: number;
  user_id: number;
  order_date: string;
  delivery_address: string;
  status: string;
};

  const [orderList, setOrderList] = useState<Order[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const responseUser = await fetch("http://localhost:3000/users");
      const responseOrders = await fetch("http://localhost:3000/orders");

      const resultUser = await responseUser.json();
      const resultOrders = await responseOrders.json();

      if(resultUser.length === 0 || resultUser === null) {
        console.log("No users found");
      } else {
        setUserList(resultUser);
        console.log(resultUser);
      }

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
    <React.Fragment>
      <div className='member_container'>
        <h2>Profile</h2>
        <ListGroup>
          {userList.length > 0 && userList.map((user) => (
            <ListGroup.Item action key={user.user_id}>
              <h2>{user.username}</h2>
              <p>Email: {user.email}</p>
              <p>Tele: {user.phone_number}</p>
              <p>Adress: {user.address}</p>
              <p>Country: {user.country}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <h2>Orders</h2>
        <ListGroup>
          {orderList.length > 0 && orderList.map((order) => (
            <ListGroup.Item action key={order.order_id}>
              <h2>{order.order_id}</h2>
              <p>Order date: {order.order_date}</p>
              <p>Delivery date: {order.delivery_address}</p>
              <p>Status: {order.status}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </React.Fragment>
  )
}

export default MemberView;
