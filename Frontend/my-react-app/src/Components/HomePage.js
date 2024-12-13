import React, { useState } from 'react';
import './HomePage.css'; // Your custom styles

const packages = [
  { id: 1, name: 'Outside Car Wash', price: 20 },
  { id: 2, name: 'Inside & Outside Car Wash', price: 40 },
  { id: 3, name: 'Full Car Detail', price: 70 },
  { id: 4, name: 'Full Factory Restoration', price: 150 },
];

function HomePage() {
  const [cart, setCart] = useState([]); // Cart state

  const handleAddToCart = (id) => {
    const packageItem = packages.find(pkg => pkg.id === id);
    setCart([...cart, packageItem]);
  };

  return (
    <div className="home-page">
      <h1>Welcome to Vroomverse</h1>
      <p>Choose your car wash package and we'll take care of the rest!</p>

      <div className="packages">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <h3>{pkg.name}</h3>
            <p>Price: ${pkg.price}</p>
            <button onClick={() => handleAddToCart(pkg.id)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;

