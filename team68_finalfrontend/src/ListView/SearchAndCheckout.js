import { Navbar, FormControl, Button} from 'react-bootstrap';

const SearchAndCheckout = ({ searchTerm, handleSearch, handleCheckout}) => {
    return (
      <Navbar bg="light" expand="lg" >
        <div className="d-flex w-100 align-items-center justify-content-between">
          <div className="d-flex">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div>
            <Button variant="primary" className="ml-auto" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </Navbar>
    );
  };

export default SearchAndCheckout;