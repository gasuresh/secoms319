import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const Product = ({ name, image, price, description }) => {
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
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={handleAdd}>
          {`Add (${quantity})`}
        </Button>
        <Button variant="secondary" onClick={handleRemove}>
          {`Remove (${quantity})`}
        </Button>
        <div>{`Price: $${price * quantity}`}</div>
      </Card.Body>
    </Card>
  );
};

export default Product;
