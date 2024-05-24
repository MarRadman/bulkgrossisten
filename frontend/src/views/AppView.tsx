import React from "react";
import { Link } from "react-router-dom";
import "../assets/App.css";
import withAuthCheck from '../authentication/withAuthCheck';
import image1 from "../assets/FoodProducts.jpg";
import image2 from "../assets/MenusPhoto.jpg";

function App() {
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
                src= {image1}
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
                src={image2}
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
