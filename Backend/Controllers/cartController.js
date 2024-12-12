const db = require('../config/dbConfig');

// Add item to cart
exports.addToCart = (req, res) => {
  const { userId, packageName, price } = req.body;

  if (!userId || !packageName || !price) {
    return res.status(400).json({ error: 'User ID, package name, and price are required' });
  }

  const query = `INSERT INTO cart (user_id, package_name, price) VALUES (?, ?, ?)`;
  db.run(query, [userId, packageName, price], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error adding item to cart' });
    }

    res.status(201).json({
      message: 'Item added to cart successfully',
      cartId: this.lastID
    });
  });
};

// Get items in the cart for a user
exports.getCartItems = (req, res) => {
  const userId = req.params.userId;

  const query = `SELECT * FROM cart WHERE user_id = ?`;
  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching cart items' });
    }

    res.status(200).json({ cartItems: rows });
  });
};
