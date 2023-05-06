import {Container, Row, Col, Table, Image} from 'react-bootstrap';

const ConfirmationView = ({cart, cartTotal, cartTax, formData}) =>
{

  return (
    <>
      <h1 className="display-1 text-center">Order Summary</h1>
      <Container>
        <Row>
          <Col>
            <h1>Price Breakdown</h1>
            <Table striped bordered hover responsive variant='dark'>
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
                    <td>
                      <Image
                        src={product.image}
                        alt={product.title}
                        fluid
                        style={{ maxWidth: '200px' }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.quantity}</td>
                    <td>${(product.price * product.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={4} className="text-end">
                    Subtotal:
                  </td>
                  <td>${cartTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-end">
                    Tax:
                  </td>
                  <td>${cartTax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={4} className="text-end">
                    Total:
                  </td>
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
        <Row>
          <Col md={4}>
            <p>Name:</p>
            <p>Email:</p>
            <p>Credit Card:</p>
            <p>Address:</p>
            <p>City:</p>
            <p>State:</p>
            <p>Zip Code:</p>
          </Col>
          <Col md={8}>
            <p>{formData.fullName}</p>
            <p>{formData.email}</p>
            <p>************{formData.creditCard.substring(12, 16)}</p>
            <p>
              {formData.address1}
              {formData.address2 && `, ${formData.address2}`}
            </p>
            <p>{formData.city}</p>
            <p>{formData.state}</p>
            <p>{formData.zip}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ConfirmationView;