import { Container, Button, ButtonGroup, Form, Card, Row, Col } from 'react-bootstrap';


const CRUDOptions = ({ handleCreateButton, handleUpdateButton, handleDeleteButton}) => {
    return (
      <Container className='mx-auto my-4 w-75'>
        <ButtonGroup className="d-flex justify-content-center">
          <Button className="btn-block mx-1" variant="primary" onClick={handleCreateButton}>Add Product</Button>
          <Button className="btn-block mx-1" variant="info" onClick={handleUpdateButton}>Update Product</Button>
          <Button className="btn-block mx-1" variant="danger" onClick={handleDeleteButton}>Delete Product</Button>
        </ButtonGroup>
      </Container>
  
    );
}

export default CRUDOptions;