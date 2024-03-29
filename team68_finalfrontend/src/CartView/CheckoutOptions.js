import { Navbar, Button} from 'react-bootstrap';


const CheckoutOptions = ({ handleBackButtonClick }) => {
  return (
    <Navbar expand="lg">
      <div className="d-flex">
        <Button variant="outline-secondary" onClick={handleBackButtonClick}>
          Back to Products
        </Button>

      </div>
    </Navbar>
  );
};

export default CheckoutOptions;