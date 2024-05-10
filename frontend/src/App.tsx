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

  const handleUserSelect = (id) => {
    const user = users.find((user) => user.user_id === id);
    setSelectedUser(user || null);
  };

  return (
    <>
      <h1></h1>
      <ul>
        {users.map((user) => (
          <li key={user.user_id} onClick={() => handleUserSelect(user.user_id)}>
            {user.username}
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          <h2>{selectedUser.username}</h2>
          <p>{selectedUser.email}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </>
  );
}

export default App;
