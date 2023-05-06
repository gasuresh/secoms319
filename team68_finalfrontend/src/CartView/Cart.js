import React, {useEffect} from 'react';
import { Container, Row, Col, Image, Table, Button } from 'react-bootstrap';


const Cart = ({cart, cartTotal, setCartTotal, cartTax, setCartTax}) => {

  

    const total = () => {
        let totalVal = 0;
        let tax = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += (cart[i].price * cart[i].quantity);
        }
        tax = totalVal * 0.05
        setCartTotal(totalVal);
        setCartTax(tax);
    };
  
    useEffect(() => {
      total();
    });
  
    
  
    const listItems = cart.map((el) => (
      <tr key={el._id}>
        <td>
          <Image src={el.image} alt={el.title} fluid rounded style={{ width: '125px', height: '125px' }}/>
        </td>
        <td>{el.title}</td>
        <td>{el.category}</td>
        <td>${el.price}</td>
        <td>{el.quantity}</td>
      </tr>
    ));
    
    return (
      <Container>
        {cart.length > 0 ? (
          <>
            <h4 className="mt-3 mb-4">Silly Shopping Cart</h4>
            <Row>
              <Col xs={12} md={8}>
                <Table striped bordered hover responsive rounded variant="dark">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>{listItems}</tbody>
                </Table>
              </Col>
              <Col xs={12} md={4} className="border p-3">
                <h5>Summary</h5>
                <p>Products selected: {cart.length}</p>
                <p>Subtotal: ${cartTotal.toFixed(2)}</p>
                <p>Tax: ${cartTax.toFixed(2)}</p>
                <h6 className="mt-3">Order total: ${(cartTotal + cartTax).toFixed(2)}</h6>
                <Button variant="primary" className="mt-3" size="lg" block>
                  Checkout
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <>
            
            <h1 className="display-6">
              <b>Silly Shopping Cart</b>
            </h1>
            <h1 className="display-1">No Items in Cart</h1>
          </>
          
        )}

      </Container>
    );
  }

export default Cart;