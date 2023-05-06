import { Navbar,Button} from 'react-bootstrap';

const NewBrowse = ({ handleConfirmButtonClick }) => {
    return(
      <Navbar expand="lg">
      <div className="d-flex">
          <Button variant="secondary" onClick={handleConfirmButtonClick}>
            Continue Shopping
          </Button>
      </div>
      </Navbar>
    );  
  };

  export default NewBrowse;