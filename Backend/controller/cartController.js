const db = require('../config/dbConfig'); // Import the database connection

// Add a package to the cart
const addToCart = (req, res) => {
  const { userId, packageName, price } = req.body;

  if (!userId || !packageName || !price) {
    return res.status(400).json({ message: 'All fields (userId, packageName, price) are required' });
  }

  const sql = `INSERT INTO cart (userId, packageName, price) VALUES (?, ?, ?)`;
  db.run(sql, [userId, packageName, price], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error adding package to cart', error: err.message });
    }
    return res.status(201).json({ message: 'Package added to cart successfully', cartId: this.lastID });
  });
};

// Get all items in the user's cart
const getCartItems = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const sql = `SELECT * FROM cart WHERE userId = ?`;
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching cart items', error: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No items found in the cart' });
    }
    return res.status(200).json({ message: 'Cart items fetched successfully', cartItems: rows });
  });
};

module.exports = { addToCart, getCartItems };
