const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./Config/dbConfig'); // Database connection
const authRoutes = require('./Routes/authRoutes'); // Authentication routes
const cartRoutes = require('./Routes/cartRoutes'); // Cart routes

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies

// Check database connection (for debugging purposes)
db.serialize(() => {
  db.get("SELECT 1", (err, row) => {
    if (err) {
      console.error('Error with SQLite database connection:', err.message);
    } else {
      console.log('SQLite database connection is successful.');
    }
  });
});

// Define routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/cart', cartRoutes); // Cart routes

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
