import {Form, Button, Container} from 'react-bootstrap';
import React, {useState} from 'react';

const PaymentForm = ({formData, handleFormSubmission, handleInputChange}) => {
    
  
    const [errors, setErrors] = useState({});
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const errors = validateFormData(formData);
      if (Object.keys(errors).length === 0) {
        // submit the form
        handleFormSubmission()
        
      } else {
        setErrors(errors);
      }
    };
  
    const validateFormData = (formData) => {
      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const zipRegex = /^\d{5}$/;
      const cardRegex = /^\d{16}$/;
  
    
  
      if (!formData.fullName.trim()) {
        errors.fullName = "Full name is required";
      }
      if (!formData.email.trim() || !emailRegex.test(formData.email)) {
        errors.email = "Valid email is required";
      }
      if (!formData.creditCard.trim() || !cardRegex.test(formData.creditCard)) {
        errors.creditCard = "Please enter a valid credit card number";
      }
      if (!formData.address1.trim()) {
        errors.address1 = "Address is required";
      }
      if (!formData.city.trim()) {
        errors.city = "City is required";
      }
      if (!formData.state.trim()) {
        errors.state = "State is required";
      }
      if (!formData.zip || !zipRegex.test(formData.zip)) {
        errors.zip = "Please enter a valid 5-digit zip code";
      }
      return errors;
    };
  
    return (
      <Container className='bg-light mx-auto my-5'>
        <h1 className="display-6">Order Form</h1>
        <Form onSubmit={handleFormSubmission}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            isInvalid={!!errors.fullName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group controlId="creditCard">
          <Form.Label>Credit Card</Form.Label>
          <Form.Control
            type="password"
            name="creditCard"
            value={formData.creditCard}
            onChange={handleInputChange}
            isInvalid={!!errors.creditCard}
          />
          <Form.Control.Feedback type="invalid">
            {errors.creditCard}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group controlId="address1">
          <Form.Label>Address 1</Form.Label>
          <Form.Control
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleInputChange}
            isInvalid={!!errors.address1}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address1}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group controlId="address2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleInputChange}
          />
        </Form.Group>
  
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            isInvalid={!!errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            isInvalid={!!errors.state}
          />
          <Form.Control.Feedback type="invalid">
            {errors.state}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group controlId="zip">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            isInvalid={!!errors.zip}
          />
          <Form.Control.Feedback type="invalid">
            {errors.zip}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Button type="submit">Submit</Button>
      </Form>
  
      </Container>
      
      
    );
  }
export default PaymentForm;