import React, { useState } from 'react';
import Product from './Product';
import ProductData from './product_data.json';
import { Navbar, Form, FormControl, Button, Container} from 'react-bootstrap';


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

function SearchAndCheckout() {
  return (
    <Navbar bg="light" expand="lg">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Button variant="primary">Checkout</Button>
    </Navbar>
  );
}



export {ProductsList, SearchAndCheckout};