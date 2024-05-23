const { v4: uuidV4 } = require("uuid");
import cors = require("cors");
import express = require("express");
import { Pool } from "pg";
import dotenv = require("dotenv");
import bcrypt = require("bcrypt");
import { Request, Response, NextFunction } from "express";
import * as path from "path";
import config from "./config";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.PGURI,
});

const port = process.env.PORT || 3000;

pool.connect();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the 'dist' directory
app.use(express.static(path.join(path.resolve(), "dist")));

interface User {
  user_id: number;
  username: string;
  email: string;
  address: string;
  phone_number: string;
  country: string;
}

interface RequestUser extends Request {
  user: User;
}

// Middleware to authenticate the user

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    console.log("came here. SO wrong in the authentication function");
  }

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE token = $1", [
      token,
    ]);
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid token" });
    }

    (req as RequestUser).user = rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
}

// Login section

app.post(`${config.apiUrl}/login`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // If the username and password are valid, generate a token and send it as the response
    const token = uuidV4();

    // Store the token in the database
    await pool.query("UPDATE users SET token = $1 WHERE user_id = $2", [
      token,
      user.user_id,
    ]);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//Signup section

app.post(`${config.apiUrl}/signup`, async (req, res) => {
  const { username, email, password, address, phone_number, country } =
    req.body;

  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password_hash, address, phone_number, country)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
      username,
      email,
      password_hash,
      address,
      phone_number,
      country,
    ];
    await pool.query(query, values);

    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

//Get user by user_id

app.get(`${config.apiUrl}/user`, authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as RequestUser).user;

    if (!user) {
      console.log("came here. SO wrong in the /user route");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { rows } = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user.user_id]
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

//Get order as an user in the orderView
app.get(
  `${config.apiUrl}/orderUser/:userId`,
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      const result = await pool.query(
        `
    SELECT orders.order_id,
    orders.delivery_address,
    orders.order_date,
    orders.status,
    users.username,
    order_details.product_id,
    order_details.quantity,
    products.name
    FROM orders
    INNER JOIN users ON orders.user_id = users.user_id
    INNER JOIN order_details ON orders.order_id = order_details.order_id
    INNER JOIN products ON order_details.product_id = products.product_id
    WHERE orders.user_id = $1`,
        [userId]
      );

      let orders = [];

      for (let i = 0; i < result.rows.length; i++) {
        let row = result.rows[i];
        let existingOrder = null;

        for (let j = 0; j < orders.length; j++) {
          if (orders[j].order_id === row.order_id) {
            existingOrder = orders[j];
            break;
          }
        }

        if (existingOrder) {
          existingOrder.items.push({
            product_id: row.product_id,
            product_name: row.name,
            quantity: row.quantity,
          });
        } else {
          orders.push({
            order_id: row.order_id,
            delivery_address: row.delivery_address,
            order_date: row.order_date,
            status: row.status,
            username: row.username,
            items: [
              {
                product_id: row.product_id,
                product_name: row.name,
                quantity: row.quantity,
              },
            ],
          });
        }
      }

      res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the orders" });
    }
  }
);

//Post order as an user in the cartView
app.post(`${config.apiUrl}/orderUser`, authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as RequestUser).user;
    const cartItems = req.body; // Get the cart items from the request body

    // Create the order
    const orderResult = await pool.query(
      "INSERT INTO orders (user_id, delivery_address) VALUES ($1, $2) RETURNING order_id",
      [user.user_id, user.address]
    );
    const orderId = orderResult.rows[0].order_id;

    // Insert each cart item into the order_details table
    for (const item of cartItems.items) {
      await pool.query(
        "INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3)",
        [orderId, item.product_id, item.quantity]
      );
    }

    res.status(200).json({ message: "Order created" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
});

//Remove orders from the userId
app.delete(`${config.apiUrl}/ordersUser/:userId`, async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Delete all orders associated with the user ID
    await pool.query(
      "DELETE FROM order_details WHERE order_id IN (SELECT order_id FROM orders WHERE user_id = $1)",
      [userId]
    );
    await pool.query("DELETE FROM orders WHERE user_id = $1", [userId]);

    res.status(200).json({ message: "Orders deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the orders" });
  }
});

//Remove orders and user from the database
app.delete(`${config.apiUrl}/UserAdmin/:userId`, async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Delete all orders associated with the user ID
    await pool.query(
      "DELETE FROM order_details WHERE order_id IN (SELECT order_id FROM orders WHERE user_id = $1)",
      [userId]
    );
    await pool.query("DELETE FROM orders WHERE user_id = $1", [userId]);

    // Delete the user
    await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);

    res.status(200).json({ message: "User and associated orders deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user and orders" });
  }
});

//Get all users, products, orders, order_details and menus with authentication as admin

app.get(`${config.apiUrl}/usersAdmin`, authenticate, async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    if (rows.length === 0) {
      res.status(404).json({ error: "No users found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
});

app.get(`${config.apiUrl}/productsAdmin`, authenticate, async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products");
    console.log("SQL query result:", rows);

    if (rows.length === 0) {
      res.status(404).json({ error: "No products found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get(`${config.apiUrl}/ordersAdmin`, authenticate, async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM orders");
    if (rows.length === 0) {
      res.status(404).json({ error: "No users found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
});

app.get(
  `${config.apiUrl}/order_detailsAdmin`,
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const { rows } = await pool.query("SELECT * FROM order_details");
      if (rows.length === 0) {
        res.status(404).json({ error: "No users found" });
      } else {
        res.json(rows);
      }
    } catch (error) {
      res.status(500).json({ error: "An error occured" });
    }
  }
);

app.get(`${config.apiUrl}/menusAdmin`, authenticate, async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query("SELECT * FROM menus");
    if (rows.length === 0) {
      res.status(404).json({ error: "No users found" });
    } else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: "An error occured" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port localhost:${port}`);
});
