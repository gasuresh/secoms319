import './App.css';
import React, { useState, useEffect } from "react"
import { Container, Button, ButtonGroup, Form, FormControl, Card, Row, Col } from 'react-bootstrap';



function App() {

  const [createButton, setCreateButton] = useState(true);
  const handleCreateButton = () => {
    setCreateButton(true);
    setReadButton(false)
    setUpdateButton(false);
    setDeleteButton(false);

  };

  const [readButton, setReadButton] = useState(false);
  const handleReadButton = () => {
    setCreateButton(false);
    setReadButton(true)
    setUpdateButton(false);
    setDeleteButton(false);

    fetch("http://localhost:4000/")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    });

  };

  const [updateButton, setUpdateButton] = useState(false);
  const handleUpdateButton = () => {
    setCreateButton(false);
    setReadButton(false)
    setUpdateButton(true);
    setDeleteButton(false);

  };

  const [deleteButton, setDeleteButton] = useState(false);
  const handleDeleteButton = () => {
    setCreateButton(false);
    setReadButton(false)
    setUpdateButton(false);
    setDeleteButton(true);

  };

  const [products, setProducts] = useState([]);


  return (
    <>
      <Container>
        <h1 className="display-3 text-center">Catalog of Products</h1>
      </Container>
      <CRUDOptions handleCreateButton= {handleCreateButton} handleReadButton = {handleReadButton} handleUpdateButton = {handleUpdateButton} handleDeleteButton = {handleDeleteButton}/>
      {createButton && <ProductForm />}
      {readButton && <ProductsList products={products} />}
      {updateButton && <ProductForm />}
      {deleteButton && <ProductForm />}

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

const Product = (product) => {
  const {_id, title, price, description, image, category, rating } = product.product;
  console.log(product)

  return (
    <Card style={{ width: '15rem', margin: '.5rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{category}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Price: ${price}</Card.Text>
        {rating && (
          <Card.Text>
            Rating: {rating.rate} ({rating.count} reviews)
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};



const ProductsList = ({ products }) => {
  {console.log(products)}
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4}>
        {products.map((product) => (
          <Col key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};




const CRUDOptions = ({handleCreateButton, handleReadButton, handleUpdateButton, handleDeleteButton}) => {
  return (
    <Container className='bg-dark mx-auto my-4 w-75'>
      <ButtonGroup className="d-flex justify-content-center">
        <Button className="btn-block mx-1" variant="primary" onClick={handleCreateButton}>Create</Button>
        <Button className="btn-block mx-1" variant="secondary" onClick={handleReadButton}>Read</Button>
        <Button className="btn-block mx-1" variant="info" onClick={handleUpdateButton}>Update</Button>
        <Button className="btn-block mx-1" variant="danger" onClick={handleDeleteButton}>Delete</Button>
      </ButtonGroup>
    </Container>

  );

}

export default App;
