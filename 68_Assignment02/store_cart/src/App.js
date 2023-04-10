import './App.css';
import React, { useState, useEffect } from 'react';
import ProductData from './product_data.json';
import {Card, Navbar, Form, FormControl, Button, Container} from 'react-bootstrap';



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


const SearchAndCheckout = ({ searchTerm, handleSearch }) => {
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
          <Button variant="primary" className="ml-auto">
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

  return (
    <Container>
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <Product product={product} onQuantityChange={handleQuantityChange} />
          </div>
        ))}
      </div>
    </Container>
  );
};



function App() {
  const [products, setProducts] = useState(ProductData);
  const [cart, setCart] = useState([]);
  const handleQuantityChange = (updatedProduct) => {
    const updatedProducts = products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
    setProducts(updatedProducts);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };



  /*
  return (
    <div>
      {products.map((product) => (
        <Product key={product.id} product={product} onQuantityChange={handleQuantityChange} />
      ))}
    </div>
  );*/

  

  
  const Cart = () => {
    
    //const [quantity, setQuantity] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
  
    useEffect(() => {
        total();
    }, [cart]);
  
    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };
  
    // const addToCart = (el) => {
    //   if (!(el.id in cart))
    //   {
    //     setCart([...cart, el]);
    //   }
  
    //   else
    //   {
    //     setQuantity(prevQuantity => prevQuantity + 1);
    //   }
        
    // };
  
    // const removeFromCart = (el) => {
    //   if (quantity > 0) {
    //     setQuantity(prevQuantity => prevQuantity - 1);
    //   }
      
    //   else
    //   {
    //     let hardCopy = [...cart];
    //     hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    //     setCart(hardCopy);
    //   }
        
    // };
  
    function howManyofThis(id) {
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    } 
  
    const cartItems = cart.map((el) => (
        <div key={el.id}>
        <img class="img-fluid" src={el.image} alt = {el.title} width={30} />
            {el.title}
            ${el.price}
        </div>
    ));
  
    const listItems = ProductData.map((el) => (
        <div class="row border-top border-bottom" key={el.id}>
            <div class="row main align-items-center">
                <div class="col-2">
                    <img class="img-fluid" src={el.image} />
                </div>
                <div class="col">
                    <div class="row text-muted">{el.title}</div>
                    <div class="row">{el.category}</div>
                </div>
                {/* <div class="col">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)} > - </button>{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
                </div> */}
                <div class="col">
                    ${el.price} <span class="close">&#10005;</span>{howManyofThis(el.id)}
                </div>
            </div>
        </div>
    ));
  
    return (
      <div>
        STORE SE/ComS319
        <div class="card">
          <div class="row">
            {/* HERE, IT IS THE SHOPPING CART */}
            <div class="col-md-8 cart">
              <div class="title">
                <div class="row">
                  <div class="col">
                    <h4>
                      <b>319 Shopping Cart</b>
                    </h4>
                  </div>
                  <div class="col align-self-center text-right text-muted">
                    Products selected {cart.length}
                  </div>
                </div>
              </div>
              <div>{listItems}</div>
            </div>
            <div class="float-end">
              <p class="mb-0 me-5 d-flex align-items-center">
                <span class="small text-muted me-2">Order total:</span>
                <span class="lead fw-normal">${cartTotal}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }



  return (
    <>
      <SearchAndCheckout searchTerm={searchTerm} handleSearch={handleSearch} />
      <ProductsList searchTerm={searchTerm} products = {products} handleQuantityChange = {handleQuantityChange} />
      <Cart />
    </>
  );
  
}


export default App;
