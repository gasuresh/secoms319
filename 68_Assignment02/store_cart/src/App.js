import './App.css';
import React, { useState, useEffect, createContext, useContext } from 'react';
import ProductData from './product_data.json';
import {Card, Navbar, Form, FormControl, Button, Container, Row, Col, Table} from 'react-bootstrap';


const formContext = createContext();

const Product = ({ product, onQuantityChange }) => {
  const { title, image, price, description, quantity } = product;

  const handleAdd = () => {
    onQuantityChange({ ...product, quantity: quantity + 1 });
  };

  const handleRemove = () => {
    if (quantity > 0) {
      onQuantityChange({ ...product, quantity: quantity - 1 });
    }
  };

  return (
    <Card style={{ width: '15rem', margin: '.5rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <div>
          <div style={{ display: 'inline-block', marginRight: '1rem' }}>{`Quantity: ${quantity}`}</div>
          <div style={{ display: 'inline-block' }}>{`Price: $${parseInt(price)}`}</div>
          <div>
            <Button variant="primary" onClick={handleAdd} style={{ marginRight: '0.5rem' }}>
              Add
            </Button>
            <Button variant="danger" onClick={handleRemove} style={{ marginLeft: '0.5rem' }}>
              Remove
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};


const SearchAndCheckout = ({ searchTerm, handleSearch, handleCheckout }) => {
  return (
    <Navbar bg="light" expand="lg">
      <div className="d-flex w-100 align-items-center justify-content-between">
        <div className="d-flex">
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div>
          <Button variant="primary" className="ml-auto" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

const ProductsList = ({ searchTerm, products, handleQuantityChange }) => {
  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  if (filteredProducts.length === 0)
  {
    return <h1 className="display-1">No Items </h1>
  }

  else
  {
    return (
      <Container className='bg-secondary mx-auto my-4'>
        <div className="row">
          {filteredProducts.map((product) => (
            <div className="col" key={product.id}>
              <Product product={product} onQuantityChange={handleQuantityChange} />
            </div>
          ))}
        </div>
      </Container>
    );
  }

  
};

const BackToProducts = ({ handleBackButtonClick }) => {
  return (
    <Navbar bg="light" expand="lg">
      <div className="d-flex">
        <Button variant="outline-secondary" onClick={handleBackButtonClick}>
          Back to Products
        </Button>
      </div>
    </Navbar>
  );
};

const PaymentForm = ({handleFormSubmission}) => {
    
  
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    creditCard: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  

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

  

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = "Valid email is required";
    }
    if (!formData.creditCard.trim()) {
      errors.creditCard = "Credit card is required";
    }
    if (!formData.address1.trim()) {
      errors.address1 = "Address1 is required";
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
    <formContext.Provider value={{ formData, setFormData }}>
    <Container className='bg-light mx-auto my-5'>
      <Form onSubmit={handleSubmit}>
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
    </formContext.Provider>
    
  );
}








function App() {
  const [products, setProducts] = useState(ProductData);
  const [cart, setCart] = useState([]);
  //const [formData] = useContext(formContext);
  const [formData] = useState(0);

  useEffect(() => {
    setCart(products.filter((product) => product.quantity > 0));
  }, [products]);

  const handleQuantityChange = (updatedProduct) => {
    const updatedProducts = products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
    setProducts(updatedProducts);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [checkoutPressed, setCheckoutPressed] = useState(false);
  const handleCheckout = () => {
    setCheckoutPressed(true);
    
  };

  const [backButtonClick, setBackButtonClick] = useState(false)
  const handleBackButtonClick  = () => {
    setCheckoutPressed(false);
    setBackButtonClick(true);

  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmission = () => {
    setIsFormSubmitted(true);
  };

  const newBrowse = ({ handleConfirmButtonClick }) => {
    return(
      <Navbar bg="light" expand="lg">
      <div className="d-flex">
          <Button variant="outline-secondary" onClick={handleConfirmButtonClick}>
            Continue Shopping
          </Button>
      </div>
      </Navbar>
    );  
  };

  const [confirmButtonClick, setConfirmButtonClick] = useState(false);
  
  const handleConfirmButtonClick = () => {
    setCart([]);
    setConfirmButtonClick(true);
  };
  

  /*
  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} onQuantityChange={handleQuantityChange} />
      ))}
    </div>
  );*/

  
  const Cart = ({handleBackButtonClick}) => {
    
    //const [quantity, setQuantity] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
  
    useEffect(() => {
        total();
    }, []);
  
    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += (cart[i].price * cart[i].quantity);
        }
        setCartTotal(totalVal);
    };
  
    
  
    const listItems = cart.map((el) => (
        <div className="row border-top border-bottom" key={el.id}>
            <div className="row main align-items-center">
                <div className="col-2">
                    <img className="img-fluid" src={el.image} />
                </div>
                <div className="col">
                    <div className="row text-muted">{el.title}</div>
                    <div className="row">{el.category}</div>
                </div>
                {/* <div class="col">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div> */}
                <div className="col">
                    ${el.price} <span className="close">&#10005;</span>{el.quantity}
                </div>
            </div>
        </div>
    ));
  
    return (
      <div>
        {cart.length > 0 ? (
          <>
            <BackToProducts handleBackButtonClick={handleBackButtonClick}/>
            
            <div className="card">
              <div className="row">
                {/* HERE, IT IS THE SHOPPING CART */}
                <div className="col-md-8 cart">
                  <div className="title">
                    <div className="row">
                      <div className="col">
                        <h4>
                          <b>319 Shopping Cart</b>
                        </h4>
                      </div>
                      <div className="col align-self-center text-right text-muted">
                        Products selected {cart.length}
                      </div>
                    </div>
                  </div>
                  <div>{listItems}</div>
                </div>
                <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>
                    <span className="lead fw-normal">${cartTotal.toFixed(2)}</span>
                  </p>
                  
                </div>
              </div>
            </div>
            
          </>

        ) : (
          <>
            <BackToProducts handleBackButtonClick={handleBackButtonClick}/>
            <h1 className="display-6">
              <b>319 Shopping Cart</b>
            </h1>
            <h1 className="display-1">No Items in Cart</h1>
          </>
          
        )}
      </div>
    );
  }

  

  const ConfirmationView = () =>
  {
    
    const totalCost = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

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
                <tr key={product.id}>
                  <td><img className="img-fluid" src={product.image} style={{maxWidth: "200px"}} /></td>
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
                <td><strong>Total:</strong></td>
                <td>${totalCost.toFixed(2)}</td>
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
      <p>Credit Card: {formData.creditCard}</p>
      <p>Address: {formData.address1}</p>
      <p>Optional Second Line: {formData.address2}</p>
      <p>City: {formData.city}</p>
      <p>State: {formData.state}</p>
      <p>Zip Code: {formData.zip}</p>

      </Container>
      <newBrowse handleConfirmButtonClick={handleConfirmButtonClick} />

      </>

    );
  }

  return (
    <>
      {((!checkoutPressed && !backButtonClick) || (!checkoutPressed && backButtonClick)) && (
        <>
          <SearchAndCheckout
          
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            handleCheckout={handleCheckout}
          />
          <ProductsList
            searchTerm={searchTerm}
            products={products}
            handleQuantityChange={handleQuantityChange}
            handleCheckout={handleCheckout}
          />
        </>
      )}
      {checkoutPressed && !isFormSubmitted && (
        <>
          <Cart handleBackButtonClick={handleBackButtonClick} />
          <PaymentForm handleFormSubmission={handleFormSubmission} />
        </>
      )}
      {isFormSubmitted && (
        <>
          <ConfirmationView handleConfirmButtonClick={handleConfirmButtonClick}/>
        </>

      )}

    </>
  );
  
}




export default App;
