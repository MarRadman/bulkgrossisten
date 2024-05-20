// import { Navbar, NavDropdown, Container, Col } from "react-bootstrap";
import { useEffect, useState} from "react";
import BurgerMenuIcon from "../assets/icons&photos/burgerIcon.svg";
import CartIcon from "../assets/icons&photos/cartIcon.svg";
import "../assets/Navmenu.css";

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
  const [addCart, setAddCart] = useState<CartItem[]>([]);

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
  }, []);

  const handleRemove = (item: CartItem) => {
    // Get the current cart from the sessionStorage
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

    // Find the item to remove
    const cartItemIndex = cart.findIndex((cartItem: CartItem) => cartItem.product.product_id === item.product.product_id);

    if (cartItemIndex > -1) {
      // Decrease the quantity of the item
      cart[cartItemIndex].quantity -= 1;

      // If the quantity reaches 0, remove the item from the cart
      if (cart[cartItemIndex].quantity === 0) {
        cart.splice(cartItemIndex, 1);
      }

      // Update the session storage and the state
      sessionStorage.setItem('cart', JSON.stringify(cart));
      setAddCart(cart);
    }
  };

  return(
    <nav className="navbar navbar-light shadow">
      <div className="container-fluid">
        <div className="dropdown">
          <img src={BurgerMenuIcon} alt="BurgerMenu" className="navIcons" />
          <ul className="dropdown-menu-burger" aria-labelledby="dropdownMenuButton">
            <li>
              <a href="/order">Orders</a>
            </li>
          </ul>
        </div>
          <h1 className="title">
            <a href="/app">
              Bulkgrossisten
            </a>
          </h1>
          <div className="dropdown">
            <img src={CartIcon} alt="Cart" className="navIcons" />
          <ul className="dropdown-menu-cart" aria-labelledby="dropdownMenuButton">
            {addCart && addCart.map((item: CartItem, index: number) => (
              <li key={index} className="dropdown-item">
                {item.product.name}: {item.quantity} st
                <button onClick={() => handleRemove(item)}>-</button>
              </li>
            ))}
            <li><a id="dropDownCheckout" href="/cart">Checkout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  // <Navbar className="navbar" expand="lg" sticky="top">
  //   <Container fluid>
  //   <Col xs={2} sm={2} md={2} lg={2} className="d-flex justify-content-start">
  //       <NavDropdown
  //         title={
  //           <img
  //             src={BurgerMenuIcon}
  //             alt="BurgerMenuIcon"
  //             className="navmenu_icons"
  //           />
  //         }
  //       >
  //         <NavDropdown.Item href="/order">Orders</NavDropdown.Item>
  //       </NavDropdown>
  //     </Col>
  //     <Col xs={8} sm={8} md={8} lg={8} className="d-flex justify-content-center">
  //       <Navbar.Brand href="/app" className="title">
  //         Bulkgrossisten
  //       </Navbar.Brand>
  //     </Col>
  //     <Col xs={2} sm={2} md={2} lg={2} className="d-flex justify-content-end">
  //       <NavDropdown
  //         title={<img src={CartIcon} alt="Cart" className="navmenu_icons"/>
  //       }
  //       >
  //         {addCart && addCart.map((item: CartItem, index: number) => (
  //           <NavDropdown.Item key={index}>
  //             {item.product.name}: {item.quantity}st
  //           </NavDropdown.Item>
  //         ))}
  //         <NavDropdown.Item href="/cart" style={{color:"blue"}}>Checkout
  //         </NavDropdown.Item>
  //     </NavDropdown>
  //     </Col>
  //   </Container>
  // </Navbar>
)}

export default NavMenu;
