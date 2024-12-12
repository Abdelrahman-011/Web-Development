// src/components/Packages.js
import React from 'react';

const packages = [
  { id: 1, name: 'Outside Wash', price: '$20' },
  { id: 2, name: 'Inside & Outside Wash', price: '$40' },
  { id: 3, name: 'Full Car Detail', price: '$100' },
  { id: 4, name: 'Full Factory Restoration', price: '$200' },
];

const Packages = () => {
  const handleAddToCart = (pkg) => {
    // Make a POST request to the server to add to the user's cart
    console.log('Adding to cart:', pkg);
  };

  return (
    <div>
      <h1>Car Wash Packages</h1>
      <div>
        {packages.map((pkg) => (
          <div key={pkg.id}>
            <h2>{pkg.name}</h2>
            <p>{pkg.price}</p>
            <button onClick={() => handleAddToCart(pkg)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
