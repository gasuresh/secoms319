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
    <Card style={{ width: '15rem', margin:".5rem"}}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div>
          <div style={{ display: 'inline-block', marginRight: '1rem' }}>{`Quantity: ${quantity}`}</div>
          <div style={{ display: 'inline-block' }}>{`Price: $${parseInt(price)}`}</div>
          <div>
            <Button variant="primary" onClick={handleAdd} style={{ marginRight: '0.5rem' }}>
              Add
            </Button>
            <Button variant="danger" onClick={handleRemove} style={{ marginLeft: '0.5rem' }}>
              Remove
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>


    
   
  );
};

export default Product;
