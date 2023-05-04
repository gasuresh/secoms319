import {Container, Row, Col, Table} from 'react-bootstrap';

const ConfirmationView = ({cart, cartTotal, cartTax, formData}) =>
{

  return (
    <>
    <h1 className="display-1 text-center">Order Summary</h1>
    <Container>
    <Row>
      <Col>
        <h1>Price Breakdown</h1>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product._id}>
                <td><img className="img-fluid" src={product.image} alt={product.title} style={{maxWidth: "200px"}} /></td>
                <td>{product.title}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><strong>Subtotal:</strong></td>
              <td>${cartTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><strong>Tax:</strong></td>
              <td>${cartTax.toFixed(2)}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><strong>Total:</strong></td>
              <td>${(cartTotal + cartTax).toFixed(2)}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
    </Container>
    <Container>
    <h2>Order Details:</h2>
    {/* Display order details */}
    <p>Name: {formData.fullName}</p>
    <p>Email: {formData.email}</p>
    <p>Credit Card: {"************" + formData.creditCard.substring(12, 16)}</p>
    <p>Address: {formData.address1}</p>
    <p>Optional Second Line: {formData.address2}</p>
    <p>City: {formData.city}</p>
    <p>State: {formData.state}</p>
    <p>Zip Code: {formData.zip}</p>
    
    
    </Container>
    

    </>

  );
}

export default ConfirmationView;