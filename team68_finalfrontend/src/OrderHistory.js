import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col } from 'react-bootstrap';

function OrderHistory({ currUser }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/history/${currUser.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error fetching order history:", error);
      });
  }, [currUser.email]);

  return (
    <Container>
      {orders.length > 0 ? (
        orders.map((order) => (
          <Card key={order._id} className="my-4">
            <Card.Header>Order {order.orderDate}</Card.Header>
            <Card.Body>
              <Card.Title>Cart:</Card.Title>
              <Card.Text as="ul">
                {order.cart.map((item) => (
                  <li key={item._id}>
                    {item.title} - Quantity: {item.quantity}
                  </li>
                ))}
              </Card.Text>
              <Card.Title>Form Data:</Card.Title>
              <Row>
                <Col>
                  <Card.Text>
                    Full Name: {order.formData.fullName}
                  </Card.Text>
                  <Card.Text>
                    Email: {order.formData.email}
                  </Card.Text>
                  <Card.Text>
                    Address 1: {order.formData.address1}
                  </Card.Text>
                  <Card.Text>
                    Address 2: {order.formData.address2}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    City: {order.formData.city}
                  </Card.Text>
                  <Card.Text>
                    State: {order.formData.state}
                  </Card.Text>
                  <Card.Text>
                    Zip: {order.formData.zip}
                  </Card.Text>
                  <Card.Text>
                  Credit Card: ************{order.formData.creditCard.substring(12, 16)}
                  </Card.Text>

                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No orders found for this user.</p>
      )}
    </Container>
  );
}

export default OrderHistory;

