import './App.css';
//import ProductsList from './ProductsList'
import Cart from "./Checkout"
import {ProductsList, SearchAndCheckout} from './ProductsList';


function App() {

  return (
    <>
      <SearchAndCheckout/>
      <ProductsList/>
      <Cart/>
    </>
  
  
  )
  
}


export default App;
