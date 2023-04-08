import React, { useState } from 'react';
import Product from './Product';
import ProductData from './ProductData';

const ProductsList = () => {
  const [products, setProducts] = useState([ProductData]);


  return (
    <div className="container">
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <Product {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;