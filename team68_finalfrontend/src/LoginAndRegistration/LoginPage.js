import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function LoginPage({handleSwitchToLogin, handleSwitchToRegister, handleLoginSubmit, handleLogRegInputChange}) {

  const formType = "login";

  return (
    <div className="login-page">

      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h1 className="text-center display-3 mb-4">Silly Store</h1>
            <h2 className="text-center display-6 mb-4">Login</h2>
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => handleLogRegInputChange(e, formType)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => handleLogRegInputChange(e, formType)}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <p className="mt-3 text-center">
              <Button variant="outline-primary" onClick={handleSwitchToRegister}>Sign up</Button>
            </p>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .login-page {
          background-color: #f5f5f5;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        h1,
        h2 {
          color: #222;
        }

        form {
          background-color: #fff;
          padding: 2rem;
          border-radius: 0.25rem;
          box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
        }

        p {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
