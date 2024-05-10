import { useState, useEffect } from "react";
import "./App.css";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
      });
  }, []);

  const handleUserSelect = (id: number) => {
    const user = users.find((user) => user.id === id);
    setSelectedUser(user || null);
  };

  return (
    <>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => handleUserSelect(user.id)}>
            {user.name}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h2>{selectedUser.username}</h2>
          <p>{selectedUser.email}</p>
        </div>
      )}
    </>
  );
}

export default App;
