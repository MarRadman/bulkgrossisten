import { v4 as uuidv4 } from "uuid";
import cors = require('cors');
import express = require('express');
import { Client } from 'pg';
import dotenv =  require('dotenv');
import bcrypt = require('bcrypt');
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI
})

const port = process.env.PORT || 3000;

client.connect();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Authentication section

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

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const { rows } = await client.query('SELECT * FROM users WHERE token = $1', [token]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    (req as RequestUser).user = rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Login section

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { rows } = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // If the username and password are valid, generate a token and send it as the response
    const token = uuidv4();

    // Store the token in the database
    await client.query('UPDATE users SET token = $1 WHERE user_id = $2', [token, user.user_id]);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

//Signup section

app.post('/signup', async (req, res) => {
  const  { username, email, password, address, phone_number, country } = req.body;

  try {
    const { rows } = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password_hash, address, phone_number, country)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [username, email, password_hash, address, phone_number, country];
    await client.query(query, values);

    res.status(201).json({ message: 'User created' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

//Post & Get order as an user

app.get('/orderUser', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as RequestUser).user;

    const result = await client.query(`
    SELECT orders.order_id,
    orders.delivery_address,
    orders.status,
    users.username,
    order_details.product_id,
    order_details.quantity FROM orders INNER JOIN users ON orders.user_id =
    users.user_id INNER JOIN order_details ON orders.order_id =
    order_details.order_id WHERE orders.user_id = $1`,
    [user.user_id]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the orders' });
  }
});

app.post('/orderUser', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as RequestUser).user;
    const cartItems = req.body;  // Get the cart items from the request body

    // Create the order
    const orderResult = await client.query('INSERT INTO orders (user_id, delivery_address) VALUES ($1, $2) RETURNING order_id', [user.user_id, user.address]);
    const orderId = orderResult.rows[0].order_id;

    // Insert each cart item into the order_details table
    for (const item of cartItems.items) {
      await client.query('INSERT INTO order_details (order_id, product_id, quantity) VALUES ($1, $2, $3)', [orderId, item.product_id, item.quantity]);
    }

    res.status(200).json({ message: 'Order created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});

//Remove orders from the userId
app.delete('/ordersUser/:userId', async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Delete all orders associated with the user ID
    await client.query('DELETE FROM order_details WHERE order_id IN (SELECT order_id FROM orders WHERE user_id = $1)', [userId]);
    await client.query('DELETE FROM orders WHERE user_id = $1', [userId]);

    res.status(200).json({ message: 'Orders deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the orders' });
  }
});


//Get all users, products, orders, order_details and menus with authentication as admin

app.get('/usersAdmin',authenticate, async (req: Request, res: Response) => {
  try  {
    const { rows } = await client.query('SELECT * FROM users');
    if(rows.length === 0) {
      res.status(404).json({ error: 'No users found' });
    }
    else {
      res.json(rows);
    }

  } catch (error) {
    res.status(500).json({ error: 'An error occured' });
  }
});

app.get('/productsAdmin', authenticate, async (req: Request, res: Response) => {
  try  {
    const { rows } = await client.query('SELECT * FROM products');
    console.log('SQL query result:', rows);

    if(rows.length === 0) {
      res.status(404).json({ error: 'No products found' });
    }
    else {
      res.json(rows);
    }

  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/ordersAdmin',authenticate, async (req: Request, res: Response) => {
  try  {
    const { rows } = await client.query('SELECT * FROM orders');
    if(rows.length === 0) {
      res.status(404).json({ error: 'No users found' });
    }
    else {
      res.json(rows);
    }

  } catch (error) {
    res.status(500).json({ error: 'An error occured' });
  }
 });

 app.get('/order_detailsAdmin',authenticate, async (req: Request, res: Response) => {
  try {
    const { rows } = await client.query('SELECT * FROM order_details');
    if(rows.length === 0) {
      res.status(404).json({ error: 'No users found' });
    }
    else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occured' });
  }
 });

 app.get('/menusAdmin',authenticate, async (req: Request, res: Response) => {
  try {
    const { rows } = await client.query('SELECT * FROM menus');
    if(rows.length === 0) {
      res.status(404).json({ error: 'No users found' });
    }
    else {
      res.json(rows);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occured' });
  }
 });


app.listen(3000, () => {
  console.log(`Server is running on port localhost:${port}`);
})
