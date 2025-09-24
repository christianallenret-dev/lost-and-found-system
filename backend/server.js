const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express()
app.use(express.json());
app.use(cors())

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lostandfounddb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Login endpoint
app.post('/users', async(req, res) => {
    try {
    const { username, password } = req.body;
    console.log('Received:', req.body); // Log incoming request body

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Query user by username
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    console.log('Query Result:', rows); // Log query result

    // Check if user exists
    if (rows.length === 0) {
      return res.status(401).json({ message: 'No Record' });
    }

    const user = rows[0];
    if (password !== user.password) {
      return res.status(401).json({message: 'No Record' });
    }

    // Return success response with user ID
    return res.json({ message: 'Login Successfully', id: user.id });
  } catch (err) {
    console.error('SQL Error:', err); // Log error
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT id, first_name, last_name, username, email, gender, phone_number FROM users WHERE id = ?', [id]);
    console.log('Query Result:', rows);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error('SQL Error:', err);
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.listen(8081, ()=> {
    console.log("Listening")
})