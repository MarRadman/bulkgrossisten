import cors = require('cors');
import express = require('express');
import { Client } from 'pg';
import dotenv =  require('dotenv');

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI
})

// const port = process.env.PORT || 3000;

// const client = new Client({
//   database: process.env.PGDATABASE,
//   host: process.env.PGHOST,
//   password: process.env.PGPASSWORD,
//   port: parseInt(process.env.PGPORT || '5432'),
//   user: process.env.PGUSER
// });

client.connect();

const app = express();

app.use(cors());

app.get('/users', async (req, res) => {
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

app.get('/products', async (req, res) => {
  try  {
    const { rows } = await client.query('SELECT * FROM products');
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

app.get('/orders', async (req, res) => {
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

 app.get('/order_details', async (req, res) => {
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

 app.get('/menus', async (req, res) => {
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
  console.log(`Server is running on port localhost:3000`);
})
