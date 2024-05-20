import { Navbar, NavDropdown, Container, Col } from "react-bootstrap";
import { useEffect} from "react";
import BurgerMenuIcon from "../assets/icons&photos/burgerIcon.svg";
import CartIcon from "../assets/icons&photos/cartIcon.svg";
import "../assets/Navmenu.css";
import useSessionStorage from '../hooks/SessionStorageHook';

interface CartItem {
  product: {
    product_id: number;
    name: string;
    description: string;
    price: number;
    images: string;
  };
  quantity: number;
}

function NavMenu() {
  const [addCart, setAddCart] = useSessionStorage("cart");

  useEffect(() => {
    const updateCart = () => {
      const cart = sessionStorage.getItem("cart");
      if (cart) {
        const cartItems = JSON.parse(cart);
        setAddCart(cartItems || []);
      } else {
        setAddCart([]);
      }
    };

    // Update cart when component mounts
    updateCart();

    // Update cart whenever a change is made to the session storage
    window.addEventListener("storage", updateCart);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("storage", updateCart);
    };
  }, [setAddCart]);

  return(
  <Navbar className="navbar" expand="lg" sticky="top">
    <Container fluid>
      <Col xs={3} sm={2} md={2} lg={2} className="d-flex justify-content-end">
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
        <Navbar.Brand href="/app" className="title">
          Bulkgrossisten
        </Navbar.Brand>
      </Col>
      <Col xs={3} sm={2} md={2} lg={2} className="d-flex justify-content-start">
        <NavDropdown
          title={<img src={CartIcon} alt="Cart" className="navmenu_icons" />}
          className="custom-dropdown"
        >
          {addCart && addCart.map((item: CartItem, index: number) => (
            <NavDropdown.Item key={index}>
              {item.product.name}: {item.quantity}st
            </NavDropdown.Item>
          ))}
          <NavDropdown.Item href="/cart" style={{color:"blue"}}>Checkout
          </NavDropdown.Item>
      </NavDropdown>
      </Col>
    </Container>
  </Navbar>
)}

export default NavMenu;
