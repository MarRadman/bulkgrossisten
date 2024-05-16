import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //https://stackoverflow.com/questions/60635093/react-formeventhtmlformelement-form-input-props-types
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!username || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setTimeout(() => {
        setLoading(false); // Stop loading
        console.log("Login successful");
        navigate('/app'); // Navigate to AppView
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false); // Stop loading
        setError(data.message || 'Wrong Username or Password'); // Show error message
      }, 2000); // Wait for 2 seconds
    }
  };

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              placeholder="Username"
              value={username}

            />
          </label>
          <label>
            Password:
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Password"
              type="password"
              value={password}
            />
          </label>
          <input type="submit" value="Login" />
        </form>
        {loading && <p>Loading...</p>} {/* Show loading message */}
        {error && <p>{error}</p>} {/* Show error message */}
        <p>Dont have an account?</p><a href="/signup">Sign up</a>
    </div>
  );
}

export default LoginView;
