// src/components/CartPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { packageId } = useParams(); // Get the package ID from the URL
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // On first load, check if there are any items in the cart (this can be enhanced with localStorage or context)
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  const addToCart = (pkgId) => {
    // Add the selected package to the cart
    const selectedPackage = {
      id: pkgId,
      name: getPackageName(pkgId),
      price: getPackagePrice(pkgId),
    };

    const updatedCart = [...cart, selectedPackage];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const getPackageName = (id) => {
    switch (id) {
      case '1': return 'Outside Car Wash';
      case '2': return 'Inside & Outside Car Wash';
      case '3': return 'Full Car Detail';
      case '4': return 'Full Factory Restoration';
      default: return 'Unknown Package';
    }
  };

  const getPackagePrice = (id) => {
    switch (id) {
      case '1': return 20;
      case '2': return 40;
      case '3': return 70;
      case '4': return 150;
      default: return 0;
    }
  };

  const calculateTotal = (cart) => {
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalAmount);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go back to add some packages</Link></p>
      ) : (
        <div>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <p>{item.name} - ${item.price}</p>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
