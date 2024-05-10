import { useState, useEffect } from "react";
import "./App.css";

type User = {
  user_id: number;
  username: string;
  password_hash: string;
  email: string;
  phone_number: string;
  address: string;
};

function App() {
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((result) => {
        if(result.length === 0 || result === null) {
          console.log("No users found");
        }
        else {
          setUserList(result);
          console.log(result);
        }
      });
  }, []);

  const handleUserSelect = (id: number) => {
    const user = userList.find((currentUser) => currentUser.user_id === id);
    setSelectedUser(user || null);
  };

  return (
    <>
      <h1>Users</h1>
      <ul>
        {userList.map((currentUsers) => (
          <li key={currentUsers.user_id} onClick={() => handleUserSelect(currentUsers.user_id)}>
            {currentUsers.username}
            {currentUsers.email}
            {currentUsers.phone_number}
            {currentUsers.password_hash}
            {currentUsers.address}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
