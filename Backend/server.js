const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConfig = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Parse cookies

// Call the database connection function
dbConfig(); // Connect to SQLite database

// Define routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/cart', cartRoutes); // Cart routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
