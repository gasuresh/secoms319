import ProductsList from './ListView/ProductsList';
import SearchAndCheckout from './ListView/SearchAndCheckout';
import React, { useState, useEffect} from 'react';
import ProductData from './product_data.json';
import BackToProducts from './CartView/BackToProducts';
import PaymentForm from './CartView/PaymentForm';
import Cart from './CartView/Cart';
import ConfirmationView from './ConfView/ConfirmationView';
import NewBrowse from './ConfView/NewBrowse';
import LoginPage from './LoginAndRegistration/LoginPage';
import RegistrationPage from './LoginAndRegistration/RegistrationPage';


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

  const [currUser, setCurrUser] = useState(null);

  
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
  const handleBackButtonClick  = () => {
    setCheckoutPressed(false);
    setBackButtonClick(true);
    setSearchTerm("");

  };

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmission = () => {
    setIsFormSubmitted(true);
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
        <div hidden = {(switchToLogin || switchToRegister) || (checkoutPressed && backButtonClick) || (!confirmButtonClick && !backButtonClick && checkoutPressed)}>
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
            hidden = {switchToLogin || switchToRegister}
          />
        </div>
        <div hidden = {!checkoutPressed || isFormSubmitted}>
          <BackToProducts handleBackButtonClick={handleBackButtonClick} hidden = {switchToLogin || switchToRegister}/>
          <Cart cart={cart} cartTotal={cartTotal} setCartTotal={setCartTotal} cartTax={cartTax} setCartTax={setCartTax} />
          <PaymentForm handleFormSubmission={handleFormSubmission} handleInputChange = {handleInputChange} formData={formData} hidden = {switchToLogin || switchToRegister}/>
        </div>
      
        <div hidden = {!isFormSubmitted}>
          <ConfirmationView cart={cart} cartTotal={cartTotal} cartTax={cartTax} formData={formData} hidden = {switchToLogin || switchToRegister} />
          <NewBrowse handleConfirmButtonClick={handleConfirmButtonClick} hidden = {switchToLogin || switchToRegister}/>
        </div>


    </>
  );
  
}


export default App;
