import { Navbar,Button} from 'react-bootstrap';

const NewBrowse = ({ handleConfirmButtonClick }) => {
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

  export default NewBrowse;