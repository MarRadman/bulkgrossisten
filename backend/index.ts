import cors from 'cors';
import express from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;

const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.PGPORT || '5432'), // Konvertera porten till ett heltal
  user: process.env.PGUSER
});

client.connect();

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
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

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
})
