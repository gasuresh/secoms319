import ProductsList from './ListView/ProductsList';
import SearchAndCheckout from './ListView/SearchAndCheckout';
import React, { useState, useEffect} from 'react';
import ProductData from './product_data.json';
import BackToProducts from './CartView/BackToProducts';
import PaymentForm from './CartView/PaymentForm';
import Cart from './CartView/Cart';
import ConfirmationView from './ConfView/ConfirmationView';
import NewBrowse from './ConfView/NewBrowse';

function App() {
  


  const [products, setProducts] = useState(null);
  console.log(products);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartTax, setCartTax] = useState(0);

  const fetchProduct = async () => {
    const response = await fetch(`http://localhost:4000/`);
    const product = await response.json();
    console.log(product)
    setProducts(product);
  };
  
  console.log(products);

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
  };
  

  
  

  return (
    <>
      {((!checkoutPressed && !backButtonClick) || (!checkoutPressed && backButtonClick) || (confirmButtonClick)) && (
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
          <BackToProducts handleBackButtonClick={handleBackButtonClick}/>
          <Cart cart={cart} cartTotal={cartTotal} setCartTotal={setCartTotal} cartTax={cartTax} setCartTax={setCartTax} />
          <PaymentForm handleFormSubmission={handleFormSubmission} handleInputChange = {handleInputChange} formData={formData} />
        </>
      )}
      {isFormSubmitted && (
        <>
        cart, cartTotal, cartTax, formData
          <ConfirmationView cart={cart} cartTotal={cartTotal} cartTax={cartTax} formData={formData} />
          <NewBrowse handleConfirmButtonClick={handleConfirmButtonClick} />
        </>

      )}

    </>
  );
  
}


export default App;
