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

  function handleLogout() {
    localStorage.removeItem('token');
  }

  return(
    <nav className="navbar navbar-light shadow">
      <div className="container-fluid">
        <div className="dropdown">
          <img src={BurgerMenuIcon} alt="BurgerMenu" className="navIcons" />
          <ul className="dropdown-menu-burger" aria-labelledby="dropdownMenuButton">
            <li>
              <a className="dropDownLinks" href="/order">Orders</a>
            </li>
            <li>
              <a className="dropDownLinks" href="/" onClick={handleLogout}>Logout</a>
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
               <button id="removeBtnCart" onClick={() => handleRemove(item)}>-</button>
                {item.product.name}: {item.quantity} st
              </li>
            ))}
            <li><a className="dropDownLinks" href="/cart">Checkout</a></li>
          </ul>
        </div>
      </div>
    </nav>
)}

export default NavMenu;
