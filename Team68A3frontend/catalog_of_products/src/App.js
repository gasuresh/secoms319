import './App.css';
import React, { useState, useEffect} from "react"
import { Container, Button, ButtonGroup, Form, FormControl} from 'react-bootstrap';



function App() {
  return (
    <>
    <CRUDOptions />
    <ProductForm />
    </>
  );
}

const ProductForm = (/*{formData, handleFormSubmission, handleInputChange}*/) => {
    
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rate: "",
    count: "",
  });
  


  const handleFormSubmission = () => {
    
  };
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };


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
    

  

    if (!formData.id.trim()) {
      errors.id = "Id is required";
    }
    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }
    if (!formData.price.trim()) {
      errors.price = "Price is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }
    if (!formData.category.trim()) {
      errors.category = "Category is required";
    }
    if (!formData.image.trim()) {
      errors.image = "Image is required";
    }
    if (!formData.rate) {
      errors.rate = "Rating is required";
    }
    if (!formData.count) {
      errors.count = "Count is required";
    }
    return errors;
  };

  return (
    <Container className='bg-light mx-auto my-5'>
      <h1 className="display-6">Order Form</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="id">
        <Form.Label>Item Id</Form.Label>
        <Form.Control
          type="text"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          isInvalid={!!errors.id}
        />
        <Form.Control.Feedback type="invalid">
          {errors.id}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          isInvalid={!!errors.price}
        />
        <Form.Control.Feedback type="invalid">
          {errors.price}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid">
          {errors.category}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          isInvalid={!!errors.image}
        />
        <Form.Control.Feedback type="invalid">
          {errors.image}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="rate">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="text"
          name="rate"
          value={formData.rate}
          onChange={handleInputChange}
          isInvalid={!!errors.rate}
        />
        <Form.Control.Feedback type="invalid">
          {errors.rate}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="count">
        <Form.Label># of Ratings</Form.Label>
        <Form.Control
          type="text"
          name="count"
          value={formData.count}
          onChange={handleInputChange}
          isInvalid={!!errors.count}
        />
        <Form.Control.Feedback type="invalid">
          {errors.count}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit">Submit</Button>
    </Form>

    </Container>
    
    
  );
}

const CRUDOptions = () => {
  return (
    <Container className='bg-dark mx-auto my-4 w-75'>
      <ButtonGroup className="d-flex justify-content-center">
        <Button className="btn-block mx-1" variant="primary">Create</Button>
        <Button className="btn-block mx-1" variant="secondary">Read</Button>
        <Button className="btn-block mx-1" variant="info">Update</Button>
        <Button className="btn-block mx-1" variant="danger">Delete</Button>
      </ButtonGroup>
    </Container>

  );

}

export default App;
