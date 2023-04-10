import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
//import ProductData from './ProductData'

const Product = ({ title, image, price, description }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };


  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div>
          <div>{`Quantity: ${quantity}`}</div>
          <div>
            <Button variant="primary" onClick={handleAdd}>
              Add
            </Button>
            <Button variant="secondary" onClick={handleRemove}>
              Remove
            </Button>
          </div>
        </div>
        <div>{`Price: $${parseInt(price) * quantity}`}</div>
      </Card.Body>
  </Card>

    
   
  );
};

export default Product;
