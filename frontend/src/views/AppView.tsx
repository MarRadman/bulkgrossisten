import React, { useContext } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import LoginContext from '../context/loginContext';
import "../assets/App.css";

function App() {
  // const loginContext = useContext(LoginContext);
  // const location = useLocation();

  // if (!loginContext || !loginContext.token) {
  //   return <Navigate to="/" state={{ from: location }} />;
  // }

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
