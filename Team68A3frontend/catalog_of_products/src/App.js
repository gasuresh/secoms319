import logo from './logo.svg';
import './App.css';
import React from "react"
import { Container, Button, ButtonGroup } from 'react-bootstrap';


function App() {
  return (
    <CRUDOptions />
  );
}


const CRUDOptions = () => {
  return (
    <Container className='bg-dark mx-auto my-4 w-75'>
      <ButtonGroup className="d-flex justify-content-center">
        <Button className="btn-block mx-1" variant="primary">Create</Button>
        <Button className="btn-block mx-1" variant="secondary">Read</Button>
        <Button className="btn-block mx-1" variant="info">Update</Button>
        <Button className="btn-block mx-1" variant="danger">Delete</Button>
      </ButtonGroup>
    </Container>

  );

}

export default App;
