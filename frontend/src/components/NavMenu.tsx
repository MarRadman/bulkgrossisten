import { Navbar, Nav, NavDropdown, Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../assets/App.css';
import 'bootstrap/dist/css/bootstrap.css';

const NavMenu = () => (
  <Navbar className="custom-navbar" expand="lg" sticky="top">
    <Container>
      <Col xs={2} md={4} className="d-flex justify-content-start">
        <NavDropdown className="no-caret" title={<FontAwesomeIcon icon={faHome} />} id="home-nav-dropdown">
          <NavDropdown.Item href="/member">Profile</NavDropdown.Item>
          {/* <NavDropdown.Item href="#">Home Action 2</NavDropdown.Item>
          <NavDropdown.Item href="#">Home Action 3</NavDropdown.Item> */}
        </NavDropdown>
      </Col>
      <Col xs={8} md={4} className="d-flex justify-content-center">
        <Navbar.Brand href="/">Bulkgrossisten</Navbar.Brand>
      </Col>
      <Col xs={2} md={4} className="d-flex justify-content-end">
        <NavDropdown className="cart-dropdown" title={<FontAwesomeIcon icon={faShoppingCart} />} id="cart-nav-dropdown">
          <NavDropdown.Item href="#">Cart Action 1</NavDropdown.Item>
          {/* <NavDropdown.Item href="#">Cart Action 2</NavDropdown.Item>
          <NavDropdown.Item href="#">Cart Action 3</NavDropdown.Item> */}
        </NavDropdown>
      </Col>
    </Container>
  </Navbar>
);

export default NavMenu;
