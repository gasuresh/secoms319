import { Navbar, FormControl, Button } from 'react-bootstrap';

const SearchAndCheckout = ({ searchTerm, handleSearch, handleCheckout }) => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#e6e6fa" }}>
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
          <Button variant="info" className="ml-auto" onClick={handleCheckout}>
            Admin Options
          </Button>
          <Button variant="primary" className="ml-auto mr-2" onClick={handleCheckout}>
            Checkout
          </Button>

        </div>
      </div>
    </Navbar>
  );
};

export default SearchAndCheckout;