// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // You can add your custom styles here

const packages = [
  { id: 1, name: 'Outside Car Wash', price: 20 },
  { id: 2, name: 'Inside & Outside Car Wash', price: 40 },
  { id: 3, name: 'Full Car Detail', price: 70 },
  { id: 4, name: 'Full Factory Restoration', price: 150 },
];

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Vroomverse</h1>
      <p>Choose your car wash package and we'll take care of the rest!</p>

      <div className="packages">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <h3>{pkg.name}</h3>
            <p>Price: ${pkg.price}</p>
            <Link to={`/cart/${pkg.id}`}>
              <button>Add to Cart</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
