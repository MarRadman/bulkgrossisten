import { useState, useEffect } from "react";
import { ListGroup } from 'react-bootstrap';
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
      <ListGroup>
        {userList.map((currentUser) => (
          <ListGroup.Item action key={currentUser.user_id} onClick={() => handleUserSelect(currentUser.user_id)}>
            <h2>{currentUser.username}</h2>
            <p>Email: {currentUser.email}</p>
            <p>Phone: {currentUser.phone_number}</p>
            <p>Address: {currentUser.address}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
export default App;
