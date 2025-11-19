import React from 'react';
import ProductGrid from '../components/ProductGrid';

const Products: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>מוצרים</h1>
      <ProductGrid />
    </div>
  );
};

export default Products;
