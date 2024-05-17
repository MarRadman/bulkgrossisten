import { Navbar, NavDropdown, Container, Col } from "react-bootstrap";
import BurgerMenuIcon from "../assets/icons&photos/burgerIcon.svg";
import CartIcon from "../assets/icons&photos/cartIcon.svg";
import "../assets/Navmenu.css";

function NavMenu() {
  return(
  <Navbar className="navbar" expand="lg" sticky="top">
    <Container fluid>
      <Col xs={3} sm={2} md={2} lg={2} className="d-flex justify-content-start">
        <NavDropdown
          title={
            <img
              src={BurgerMenuIcon}
              alt="BurgerMenuIcon"
              className="navmenu_icons"
            />
          }
        >
          <NavDropdown.Item href="/order">Orders</NavDropdown.Item>
        </NavDropdown>
      </Col>
      <Col
        xs={6}
        sm={8}
        md={8}
        lg={8}
        className="d-flex justify-content-center"
      >
        <Navbar.Brand href="/app" className="text-center">
          Bulkgrossisten
        </Navbar.Brand>
      </Col>
      <Col xs={3} sm={2} md={2} lg={2} className="d-flex justify-content-end">
        <NavDropdown
          title={<img src={CartIcon} alt="Cart" className="navmenu_icons" />}
          className="custom-dropdown"
        >
          <NavDropdown.Item href="/cart">View Cart</NavDropdown.Item>
        </NavDropdown>
      </Col>
    </Container>
  </Navbar>
)}

export default NavMenu;
