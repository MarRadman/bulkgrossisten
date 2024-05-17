import React from "react";
import '../assets/App.css';
import withAuthCheck from '../authentication/withAuthCheck';
import BackBtn from '../components/BackBtn';

function CartView() {
  return (
    <React.Fragment>
      <h2>Cart</h2>
      <p>Cart view</p>
      <BackBtn />
    </React.Fragment>
  );
}
export default withAuthCheck(CartView);
