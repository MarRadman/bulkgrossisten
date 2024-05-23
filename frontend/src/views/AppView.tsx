import React from "react";
import { Link } from "react-router-dom";
import "../assets/App.css";
import withAuthCheck from '../authentication/withAuthCheck';

function App() {

  // Wanted to check if user had a token, but didnt want to repeat the code in every view. So made a
  // HOC (higher-order component) to check if user have an token.

  // const location = useLocation();
  // const token = localStorage.getItem('token');

  // if (!token) {
  //   return <Navigate to="/" state={{ from: location }} />;
  // }

  return (
    <React.Fragment>
      <div className="appView_photos">
        <div className="photo-container">
          <Link to="/products">
            <div className="image-container">
              <img
                src="../assets/FoodProducts.jpg"
                alt="First"
              />
            </div>
            <h2>Produkter</h2>
          </Link>
        </div>
        <div className="photo-container">
          <Link to="/menus">
            <div className="image-container">
              <img
                src="../assets/MenusPhoto.jpg"
                alt="Second"
              />
            </div>
            <h2>Menyer</h2>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withAuthCheck(App);
