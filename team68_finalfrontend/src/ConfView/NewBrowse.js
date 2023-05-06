import {Button, Container} from 'react-bootstrap';

const NewBrowse = ({ handleConfirmButtonClick }) => {
    return(
      <Container>
        <div className="d-flex">
          <Button variant="secondary" onClick={handleConfirmButtonClick}>
            Continue Shopping
          </Button>
        </div>

      </Container>
      
      
    );  
  };

  export default NewBrowse;