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
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/users");
      const result = await response.json();
      if(result.length === 0 || result === null) {
        console.log("No users found");
      }
      else {
        setUserList(result);
        console.log(result);
      }
    };

    fetchData();
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
          <h2>{currentUsers.username}</h2>
            <p>Email: {currentUsers.email}</p>
            <p>Phone: {currentUsers.phone_number}</p>
            <p>Address: {currentUsers.address}</p>
        </li>
        ))}
      </ul>
    </>
  );
}

export default App;
