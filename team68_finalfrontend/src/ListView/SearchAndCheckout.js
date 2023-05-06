import { Navbar, FormControl, Button, ButtonGroup } from 'react-bootstrap';

const SearchAndCheckout = ({ searchTerm, handleSearch, handleCheckout, handleAdminButton, handleAboutButton, isAdmin, handleViewOrdersModal, handleLogout }) => {
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
        <div className="d-flex justify-content-end align-items-center">
          <Button hidden={!isAdmin} variant="info" className="me-3" onClick={handleAdminButton}>
              Admin Options
          </Button>

          <Button variant="success" className="me-3" onClick={handleAboutButton}>
              About Us
          </Button>
          
          <ButtonGroup>
            <Button variant="dark" onClick={handleViewOrdersModal}>
              View Order History
            </Button>
            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </ButtonGroup>
          <Button variant="danger" className="ms-3" onClick={handleLogout}>
            Logout
          </Button>
        </div>

      </div>
    </Navbar>
  );
}



export default SearchAndCheckout;