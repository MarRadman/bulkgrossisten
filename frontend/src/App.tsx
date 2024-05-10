import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("/users")
      .then((response) => response.json())
      .then((result) => {
        setUsers(result.users);
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
          <h2>{selectedUser.user.username}</h2>
          <p>{selectedUser.user.email}</p>
        </div>
      )}
    </>
  );
}

export default App;
