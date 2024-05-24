import { useState, useEffect } from "react";
import React from "react";
import { ListGroup } from "react-bootstrap";
import "../assets/OrderView.css";
import withAuthCheck from "../authentication/withAuthCheck";
import BackBtn from "../components/BackBtn";
import config from "../../config";


type Item = {
  product_id: number;
  product_name: string;
  quantity: number;
};

type Order = {
  order_id: number;
  user_id: number;
  order_date: string;
  delivery_address: string;
  status: string;
  items: Item[];
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
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState<User | null>(null);
  const [orderList, setOrderList] = useState<Order[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [totalPrice, _setTotalPrice] = useState(0);
  const [totalOrdersPrice, setTotalOrdersPrice] = useState(0);

  useEffect(() => {
    setTotalOrdersPrice(prevTotal => prevTotal + totalPrice);
  }, [totalPrice]);

  sessionStorage.setItem("cart", JSON.stringify([]));

  const fetchProductData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/productsAdmin`, {
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
        return;
      }

      const products: Product[] = await response.json();
      setProductList(products.map(product => ({
        ...product,
      })));
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
      const userResponse = await fetch(`${config.apiUrl}/user`, {
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
        `${config.apiUrl}/orderUser/${userId.user_id}`,
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

      const orderResult: Order[] = await orderResponse.json();
      setOrderList(orderResult.map(order => ({
        ...order,
      })));

    } catch (error) {
      console.error(
        "An error occurred while fetching the user and orders:",
        error
      );
    }
  };

  const OrderTotalPrice = (order: Order) => {
    return order.items.reduce((total, item) => {
      const product = productList.find(
        (product) => product.product_id === item.product_id
      );
      if (product) {
        return total + product.price * item.quantity;
      } else {
        return total;
      }
    }, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      fetchProductData();
      fetchUserAndOrders();
    }
  }, []);

  useEffect(() => {
    let total = 0;
    if (orderList) {
      for (const order of orderList) {
        total += OrderTotalPrice(order);
      }
      setTotalOrdersPrice(total);
    }
  }, [orderList, productList]);

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
            const orderPrice = OrderTotalPrice(order);

            return (
              <div className="order-card" key={order.order_id}>
                <ListGroup.Item>
                  <h5>Order ID:</h5> <span className="orderText">{order.order_id}</span>
                  <h5>Order Date:</h5>
                    <span className="orderText">
                    {new Date(order.order_date).toLocaleDateString()}
                    </span>

                  <h5>Delivery address:</h5><span className="orderText">{order.delivery_address}</span>
                  <h5>Status:</h5><span className="orderText">{order.status}</span>
                  <h4>Items:</h4>
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
                  <h5 style={{textAlign:"center"}}>Total Price: {orderPrice}</h5>
                  {/* Display the total price for this order */}
                </ListGroup.Item>
              </div>
            );
          })}
      </div>
        {orderList && orderList.length > 0 && <h5>Total Price: {totalOrdersPrice}</h5>}
        {/* Display the total price for all orders if there are any orders */}
      <BackBtn />
    </React.Fragment>
  );
};

export default withAuthCheck(OrderView);
