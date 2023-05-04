import {Card, Button} from 'react-bootstrap';


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
      <Card style={{ width: '15rem', margin: '.5rem' }}>
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