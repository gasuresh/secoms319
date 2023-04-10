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




function App() {
  const [products, setProducts] = useState(ProductData);
  const [cart, setCart] = useState([]);

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
    console.log("Checkout: " + checkoutPressed)
  };

  const [backButtonClick, setBackButtonClick] = useState(false)
  const handleBackButtonClick  = () => {
    setCheckoutPressed(false);
    setBackButtonClick(true);

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
            totalVal += (cart[i].price * cart[i].quantity);
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
        <img className="img-fluid" src={el.image} alt = {el.title} width={30} />
            {el.title}
            ${el.price}
        </div>
    ));
  
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
                    <span className="lead fw-normal">${cartTotal}</span>
                  </p>
                  
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="display-6">
              <b>319 Shopping Cart</b>
            </h1>
            <h1 className="display-1">No Items in Cart</h1>
          </>
          
        )}
      </div>
    );
  }

  return (
    <>
      {!checkoutPressed && !backButtonClick && (
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
      {checkoutPressed ? (
        <Cart />
      ) : (
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
    </>
  );
  
}


export default App;
