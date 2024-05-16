import React from "react";
import { Link } from "react-router-dom";
import "../assets/App.css";

function App() {
  return (
    <React.Fragment>
      <div className="appView_photos">
        <div className="photo-container">
          <Link to="/products">
            <img
              src="../src/assets/icons&photos/MainFoodPhoto.jpg"
              alt="First"
            />
            <h2>Produkter</h2>
          </Link>
        </div>
        <div className="photo-container">
          <Link to="/menus">
            <img
              src="../src/assets/icons&photos/SecFoodPhoto.jpg"
              alt="Second"
            />
            <h2>Menyer</h2>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default App;
