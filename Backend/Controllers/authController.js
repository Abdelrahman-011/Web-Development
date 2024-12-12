const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Config/dbConfig'); // Import the database connection

// Sign-up function
const signup = (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password before saving to database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password' });
    }

    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(sql, [username, email, hashedPassword], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error inserting user', error: err.message });
      }
      return res.status(201).json({ message: 'User created successfully', userId: this.lastID });
    });
  });
};

// Login function
const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error querying database' });
    }
    if (!row) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare password with hashed password in database
    bcrypt.compare(password, row.password, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: row.id, username: row.username },
        'yourSecretKey', // Use an environment variable for production!
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token: token,
      });
    });
  });
};

module.exports = { signup, login };
