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
  /*const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [oneProduct, setOneProduct] = useState([]);
  const [checked4, setChecked4] = useState(false); */
  const [formData, setFormData] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0.0, count: 0 },
  });
  


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <Container className='bg-light mx-auto my-5'>
      <h1 className="display-6">Order Form</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="_id">
        <Form.Label>Item Id</Form.Label>
        <Form.Control
          type="number"
          name="_id"
          value={formData._id}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="rate">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          name="rate"
          value={formData.rate}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="count">
        <Form.Label># of Ratings</Form.Label>
        <Form.Control
          type="number"
          name="count"
          value={formData.count}
          onChange={handleInputChange}
        />
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
