import ProductsList from './ListView/ProductsList';
import SearchAndCheckout from './ListView/SearchAndCheckout';
import React, { useState, useEffect } from 'react';
import ProductData from './product_data.json';
import PaymentForm from './CartView/PaymentForm';
import Cart from './CartView/Cart';
import ConfirmationView from './ConfView/ConfirmationView';
import NewBrowse from './ConfView/NewBrowse';
import LoginPage from './LoginAndRegistration/LoginPage';
import RegistrationPage from './LoginAndRegistration/RegistrationPage';
import OrderHistory from './OrderHistory';
import CRUDOptions from './AdminView/CRUDOptions';
import ProductForm from './AdminView/ProductForm';
import CheckoutOptions from './CartView/CheckoutOptions';

import { Modal } from 'react-bootstrap';




function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const [registrationInfo, setRegistrationInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [switchToLogin, setSwitchToLogin] = useState(true);
  const [switchToRegister, setSwitchToRegister] = useState(false);

  const [currUser, setCurrUser] = useState([]);


  useEffect(() => {
    fetch("http://localhost:4000/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);





  useEffect(() => {
    setCart(products.filter((product) => product.quantity > 0));
  }, [products]);

  const handleQuantityChange = (updatedProduct) => {
    const updatedProducts = products.map((product) => (product._id === updatedProduct._id ? updatedProduct : product));
    setProducts(updatedProducts);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [checkoutPressed, setCheckoutPressed] = useState(false);
  const handleCheckout = () => {
    setCheckoutPressed(true);
    setConfirmButtonClick(false);
  };

  const [backButtonClick, setBackButtonClick] = useState(false)
  const handleBackButtonClick = () => {
    setCheckoutPressed(false);
    setBackButtonClick(true);
    setSearchTerm("");

  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    try {
      const order = { cart, formData, currUser };
      console.log(order);

      fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order completed");
          alert("Order created successfully!");
        });
    } catch (error) {
      console.error(error);
    }


  };


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

  const handleViewProducts = () => {
    fetch("http://localhost:4000/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }


  const [confirmButtonClick, setConfirmButtonClick] = useState(false);

  const handleConfirmButtonClick = () => {
    setCart([]);
    setConfirmButtonClick(true);
    setProducts(ProductData);
    setIsFormSubmitted(false);
    setCheckoutPressed(false)
    setFormData({
      fullName: "",
      email: "",
      creditCard: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
    })
    fetch("http://localhost:4000/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  };

  const [showModal, setShowModal] = useState(false);


  const handleSwitchToLogin = () => {
    setSwitchToLogin(true);
    setSwitchToRegister(false);
  };

  const handleSwitchToRegister = () => {
    setSwitchToLogin(false);
    setSwitchToRegister(true);
  };



  const handleLogRegInputChange = (event, formType) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if (formType === "login") {
      setLoginInfo(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else if (formType === "registration") {
      setRegistrationInfo(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };


  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (registrationInfo.password !== registrationInfo.confirmPassword) {
      alert("Passwords do not match");
      return;
    }


    const newUser = {
      email: registrationInfo.email,
      password: registrationInfo.password,
      username: registrationInfo.username,
    };



    fetch("http://localhost:4000/registerUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User creation completed");
        alert("User created successfully!");
        handleSwitchToLogin();
      });


  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    fetch(`http://localhost:4000/findUser?email=${email}&password=${password}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('User not found');
        }
        return response.json();
      })
      .then((data) => {

        if (data) {
          setSwitchToLogin(false);
          setSwitchToRegister(false);
          setCurrUser(data);

        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Invalid credentials');
      });
  }


  const [createButton, setCreateButton] = useState(true);
  const handleCreateButton = () => {
    setCreateButton(true);
    setUpdateButton(false);
    setDeleteButton(false);

  };

  const [updateButton, setUpdateButton] = useState(false);
  const handleUpdateButton = () => {
    setCreateButton(false);
    setUpdateButton(true);
    setDeleteButton(false);

  };

  const [deleteButton, setDeleteButton] = useState(false);
  const handleDeleteButton = () => {
    setCreateButton(false);
    setUpdateButton(false);
    setDeleteButton(true);

  };

  const [adminPressed, setAdminPressed] = useState(false);

  const handleAdminButton = () => {
    setAdminPressed(true)

  }


  const handleViewOrdersModal = () => {
    setShowModal(true)
  }


  const handleLogout = () =>
  {
    setSwitchToLogin(true)
    setCurrUser([])
  }



  return (
    <>
      <LoginPage
        handleSwitchToLogin={handleSwitchToLogin}
        handleSwitchToRegister={handleSwitchToRegister}
        handleLoginSubmit={handleLoginSubmit}
        handleLogRegInputChange={handleLogRegInputChange}
        hidden={!switchToLogin}
      />

      <RegistrationPage
        handleSwitchToLogin={handleSwitchToLogin}
        handleSwitchToRegister={handleSwitchToRegister}
        handleRegistrationSubmit={handleRegistrationSubmit}
        handleLogRegInputChange={handleLogRegInputChange}
        hidden={!switchToRegister}
      />
      <div hidden={(switchToLogin || switchToRegister) || (checkoutPressed && backButtonClick) || (!confirmButtonClick && !backButtonClick && checkoutPressed) || adminPressed}>
        <SearchAndCheckout
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          handleCheckout={handleCheckout}
          handleAdminButton={handleAdminButton}
          isAdmin={currUser.admin}
          handleViewOrdersModal={handleViewOrdersModal}
          handleLogout = {handleLogout}
        />
        <ProductsList
          searchTerm={searchTerm}
          products={products}
          handleQuantityChange={handleQuantityChange}
          handleCheckout={handleCheckout}
        />

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Order History</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OrderHistory currUser={currUser} />
          </Modal.Body>
        </Modal>

      </div>
      <div hidden={!checkoutPressed || isFormSubmitted} style={{ backgroundImage: 'linear-gradient(to bottom, #e6e6fa, #4b0082)', minHeight: '175vh' }}>
        <CheckoutOptions handleBackButtonClick={handleBackButtonClick} hidden={switchToLogin || switchToRegister} />
        <Cart cart={cart} cartTotal={cartTotal} setCartTotal={setCartTotal} cartTax={cartTax} setCartTax={setCartTax} />
        <PaymentForm handleFormSubmission={handleFormSubmission} handleInputChange={handleInputChange} formData={formData} hidden={switchToLogin || switchToRegister} />
      </div>

      <div hidden={!isFormSubmitted} style={{
        backgroundImage: 'linear-gradient(to bottom, #ADD8E6, #00008B)',
        minHeight: '175vh'
      }}>
        <ConfirmationView cart={cart} cartTotal={cartTotal} cartTax={cartTax} formData={formData} hidden={switchToLogin || switchToRegister} />
        <NewBrowse handleConfirmButtonClick={handleConfirmButtonClick} hidden={switchToLogin || switchToRegister} />
      </div>

      <div hidden={!adminPressed} style={{ backgroundImage: 'linear-gradient(to bottom, #e6e6fa, #4b0082)', minHeight: '125vh' }}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <h2 className="mt-1 me-auto ps-3">Admin View</h2>
            <button className="btn btn-success me-3" onClick={() => { setAdminPressed(false); handleViewProducts();}}>
              View Products
            </button>
          </div>
        </nav>
        <CRUDOptions
          handleCreateButton={handleCreateButton}
          handleUpdateButton={handleUpdateButton}
          handleDeleteButton={handleDeleteButton}
        />
        <ProductForm createButton={createButton} deleteButton={deleteButton} updateButton={updateButton} />
      </div>



    </>
  );

}


export default App;
