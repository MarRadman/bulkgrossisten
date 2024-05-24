import BurgerMenuIcon from "../assets/burgerIcon.svg";
import CartIcon from "../assets/cartIcon.svg";
import "../assets/Navmenu.css";
import { Link } from "react-router-dom";
import { CartItem } from '../types';
import { useCart } from '../context/CartContext';

function NavMenu() {
  const { cartItems, handleRemove } = useCart();

  function handleLogout() {
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar navbar-light shadow">
      <div className="container-fluid">
        <div className="dropdown">
          <img src={BurgerMenuIcon} alt="BurgerMenu" className="navIcons" />
          <ul
            className="dropdown-menu-burger"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <Link to="/order" className="dropDownLinks">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout} className="dropDownLinks">
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <h1 className="title">
          <Link to="/app">Bulkgrossisten</Link>
        </h1>
        <div className="dropdown">
          <img src={CartIcon} alt="Cart" className="navIcons" />
          <ul
            className="dropdown-menu-cart"
            aria-labelledby="dropdownMenuButton"
          >
            {cartItems &&
              cartItems.map((item: CartItem, index: number) => (
                <li key={index} className="dropdown-item">
                  <button id="removeBtnCart" onClick={() => handleRemove(item)}>
                    -
                  </button>
                  {item.product.name}: {item.quantity} st
                </li>
              ))}
            <li>
              <Link to="/cart" className="dropDownLinks">Checkout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
