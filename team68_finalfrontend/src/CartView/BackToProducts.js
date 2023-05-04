import { Navbar, Button} from 'react-bootstrap';


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

export default BackToProducts;