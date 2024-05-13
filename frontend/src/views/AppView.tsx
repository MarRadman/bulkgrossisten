import React from "react";
import  { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../assets/App.css';

function App() {
  return (
    <React.Fragment>
      <div className="appView_photos">
        <div className="photo-container">
          <Link to="/products">
            <img src="../src/assets/MainFoodPhoto.jpg" alt="First" />
            <h2>Produkter</h2>
          </Link>
        </div>
        <div className="photo-container">
          <Link to="/menus">
            <img src="../src/assets/SecFoodPhoto.jpg" alt="Second" />
            <h2>Menyer</h2>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default App;
