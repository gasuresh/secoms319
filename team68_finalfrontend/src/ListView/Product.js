import { Card, Button } from 'react-bootstrap';


const Product = ({ product, onQuantityChange }) => {
  const { title, image, price, description, quantity } = product;

  const handleAdd = () => {
    onQuantityChange({ ...product, quantity: quantity + 1 });
  };

  const handleRemove = () => {
    if (quantity > 0) {
      onQuantityChange({ ...product, quantity: quantity - 1 });
    }
  };

  return (
    <Card className="product-card" style={{ 
      width: '15rem', 
      margin: '.5rem',
      backgroundImage: 'linear-gradient(to bottom, #191f5a, #b4fffe)' 
    }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className="product-title" style={{ marginBottom: '0.5rem', color: '#ffff' }}>
          {title}
        </Card.Title>
        <Card.Text className="product-description" style={{ marginBottom: '1rem', color: '#ffff' }}>
          {description}
        </Card.Text>
        <div className="product-info">
          <div className="product-quantity" style={{ marginBottom: '0.5rem', color: '#197aa2' }}>
            {`Quantity: ${quantity}`}
          </div>
          <div className="product-price" style={{ marginBottom: '0.5rem', color: '#197aa2' }}>
            {`Price: $${parseInt(price)}`}
          </div>
          <div className="product-buttons d-flex justify-content-between">
            <Button variant="primary" onClick={handleAdd} className="add-button" style={{ backgroundImage: 'linear-gradient(to bottom, #4b0082, #9400d3)', border: 'none' }}>
              Add
            </Button>
            <Button variant="danger" onClick={handleRemove} className="remove-button" style={{ backgroundImage: 'linear-gradient(to bottom, #ff416c, #ff4b2b)', border: 'none' }}>
              Remove
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
  
};

export default Product;