import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function RegistrationPage({handleSwitchToLogin, handleSwitchToRegister, handleRegistrationSubmit, handleLogRegInputChange}) {
    const formType = "registration";

    return (
        <>
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <h1 className="text-center display-3 mb-4">Silly Store</h1>
                        <h2 className="text-center display-6 mb-4">Registration</h2>
                        <Form onSubmit={handleRegistrationSubmit}>
                            <Form.Group controlId="formBasicName" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter your username" onChange={(e) => handleLogRegInputChange(e, formType)}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" onChange={(e) => handleLogRegInputChange(e, formType)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Create a password" onChange={(e) => handleLogRegInputChange(e, formType)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm your password" onChange={(e) => handleLogRegInputChange(e, formType)} />
                            </Form.Group>

                            <div className="d-flex justify-content-between">
                                <Button variant="primary" type="submit" >
                                    Register
                                </Button>

                                <Button variant="outline-primary" onClick={handleSwitchToLogin}>
                                    Back to Login
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default RegistrationPage;
