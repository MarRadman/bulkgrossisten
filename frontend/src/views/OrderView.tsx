import { useState, useEffect } from "react";
import React from "react";
import { ListGroup } from "react-bootstrap";
import "../assets/Order.css";
import withAuthCheck from "../authentication/withAuthCheck";
import BackBtn from "../components/BackBtn";
import apiUrl from "../../../backend/config";

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
  const token = localStorage.getItem("token");

  sessionStorage.setItem("cart", JSON.stringify([]));
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchProductData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/productsAdmin`, {
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        return;
      }

      const products: Product[] = await response.json();
      setProductList(products);
    } catch (error) {
      console.error(
        "An error occurred while fetching the product data:",
        error
      );
    }
  };

  const fetchUserAndOrders = async () => {
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      // Fetch the user
      const userResponse = await fetch(`${apiUrl}/user`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!userResponse.ok) {
        throw new Error("HTTP error " + userResponse.status);
      }

      const userId: User = await userResponse.json();
      setUserId(userId);

      // Fetch the orders for this user
      const orderResponse = await fetch(
        `${apiUrl}/orderUser/${userId.user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (!orderResponse.ok) {
        console.log(`HTTP error! status: ${orderResponse.status}`);
        return;
      }

      const orderResult = await orderResponse.json();

      setOrderList(orderResult);
      console.log(orderResult);
      let total = 0;

      if (orderResult.ok) {
        for (const order of orderResult) {
          for (const item of order.items) {
            const product = productList.find(
              (product) => product.product_id === item.product_id
            );
            if (product) {
              total += product.price * item.quantity;
            } else {
              console.log("No product found for item:", item);
            }
          }
        }
        console.log(total);
        setTotalPrice(total);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the user and orders:",
        error
      );
    }
  };

  useEffect(() => {
    if (token) {
      fetchProductData();
      fetchUserAndOrders();
    }
  }, []);

  return (
    <React.Fragment>
      {userId && (
        <ListGroup className="userInfo">
          <h2 className="userInfoTitle">User Information</h2>
          <p>Username: {userId.username}</p>
          <p>Email: {userId.email}</p>
          <p>Address: {userId.address}</p>
          <p>Number: {userId.phone_number}</p>
          <p>Country: {userId.country}</p>
        </ListGroup>
      )}
      <h2 className="orderInfoTitle">Order Information</h2>
      <div className="orders-grid">
        {/* This div applies the grid layout to the orders */}
        {orderList &&
          orderList.map((order: Order) => {
            // Calculate the total price for this order
            const orderTotalPrice = order.items.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            );

            return (
              <div className="order-card" key={order.order_id}>
                <ListGroup.Item>
                  <h5>Order ID: {order.order_id}</h5>
                  <h5>
                    Order Date:{" "}
                    {new Date(order.order_date).toLocaleDateString()}
                  </h5>
                  <h5>Delivery address: {order.delivery_address}</h5>
                  <h5>Status: {order.status}</h5>
                  <h5>Items:</h5>
                  <ul>
                    {order.items &&
                      order.items.map((item) => (
                        <li key={item.product_id}>
                          <p>
                            Product: {item.product_name} x {item.quantity}
                          </p>
                        </li>
                      ))}
                  </ul>
                  <p>Total Price: {orderTotalPrice}</p>{" "}
                  {/* Display the total price for this order */}
                </ListGroup.Item>
              </div>
            );
          })}
      </div>
      <ul>
        <li>
          <p>Total Price: {totalPrice}</p>
        </li>{" "}
        {/* Display the total price for all orders */}
      </ul>
      <BackBtn />
    </React.Fragment>
  );
};

export default withAuthCheck(OrderView);
