import React from "react";
import  { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../assets/App.css';

// type User = {
//   user_id: number;
//   username: string;
//   password_hash: string;
//   email: string;
//   phone_number: string;
//   address: string;
// };

function App() {
  // const [userList, setUserList] = useState<User[]>([]);
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:3000/users");
  //     const result = await response.json();
  //     if(result.length === 0 || result === null) {
  //       console.log("No users found");
  //     }
  //     else {
  //       setUserList(result);
  //       console.log(result);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <React.Fragment>
      <div className="appView_photos">
        <div className="photo-container">
          <Link to="/products">
            <img src="../src/assets/MainFoodPhoto.jpg" alt="First" />
            <h2>Products</h2>
          </Link>
        </div>
        <div className="photo-container">
          <Link to="/menus">
            <img src="../src/assets/SecFoodPhoto.jpg" alt="Second" />
            <h2>Menus</h2>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default App;
