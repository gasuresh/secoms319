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
      {deleteButton && <DeleteForm />}

    </>
  );
}

const ProductForm = (/*{formData, handleFormSubmission, handleInputChange}*/) => {

  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: "", count: "" },
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
    if (name === "count") {
      setFormData((formData) => ({
        ...formData,
        rating: { ...formData.rating, count: value },
      }));
    } else if (name === "rate") {
      setFormData((formData) => ({
        ...formData,
        rating: { ...formData.rating, rate: value },
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        [name]: value,
      }));
    }
  };


  return (
    <Container className='bg-light mx-auto my-5'>
      <h1 className="display-6">Add New Product</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="_id">
        <Form.Label>Item Id</Form.Label>
        <Form.Control
          type="text"
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
          type="text"
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
          type="text"
          name="rate"
          value={formData.rating.rate}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group controlId="count">
        <Form.Label># of Ratings</Form.Label>
        <Form.Control
          type="text"
          name="count"
          value={formData.rating.count}
          onChange={handleInputChange}
        />
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

const DeleteForm = () => {
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const handleChange = (event) => {
    setIndex(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(index);
    // Do something with the index value, e.g. pass it to a parent component
  };

  return (
    <Container className='bg-light mx-auto my-5'>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formIndex">
        <Form.Label>Enter an Index:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter index"
          value={index}
          onChange={handleChange}
        />
      </Form.Group>
      <button type="submit">Submit</button>
    </Form>
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
