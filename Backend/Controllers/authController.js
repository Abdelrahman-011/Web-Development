const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConfig');

// Signup: Register a new user
exports.signup = (req, res) => {
  const { username, email, password } = req.body;

  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error hashing password' });
    }

    // Insert user into the database
    const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.run(query, [username, email, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error inserting user into database' });
      }

      res.status(201).json({
        message: 'User created successfully',
        userId: this.lastID
      });
    });
  });
};

// Login: Authenticate user and return JWT
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user by email
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // If user is not found
    if (!row) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password with the hashed password in the database
    bcrypt.compare(password, row.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords' });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Generate a JWT token
      const token = jwt.sign(
        { userId: row.id, username: row.username, email: row.email },
        'yourSecretKey',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        message: 'Login successful',
        token
      });
    });
  });
};
