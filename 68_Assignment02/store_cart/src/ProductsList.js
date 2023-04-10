import React, { useState } from 'react';
import Product from './Product';
import ProductData from './ProductData';
import { Container } from 'react-bootstrap';

const ProductsList = () => {
  const [products, setProducts] = useState(ProductData);

  return (
    <Container>
      <div className="row">
        {products.map(product => (
          <div className="col" key={product.id}>
            <Product {...product} />
          </div>
        ))}
      </div>

    </Container>
    
  );
};


export default ProductsList;