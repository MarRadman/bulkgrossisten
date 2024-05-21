import { useState, FormEvent, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpView() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/app');
    }
  },[navigate]);

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();

    if (!username.trim().toLocaleLowerCase() || !email.trim().toLocaleLowerCase() ||
    !password.trim().toLocaleLowerCase() || !address.trim().toLocaleLowerCase() ||
    !phoneNumber.trim().toLocaleLowerCase() || !country.trim().toLocaleLowerCase()) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, address, phone_number: phoneNumber, country }),
    });
    const data = await response.json();

    if(response.ok) {
      // The signup was successful
      setErrorMessage('Account was created'); // Clear any previous error message
      console.log("user created");
      setTimeout(() => {
        navigate('/'); // Navigate to LoginView
      }, 2000);
    } else {
      // There was an error signing up
      if (data.message === 'Email already in use') {
        setErrorMessage('Email already in use. Please use another one.');
      } else if (data.message) {
        setErrorMessage(`Error signing up: ${data.message}`);
      } else {
        setErrorMessage('Error signing up: An unknown error occurred');
      }
      console.log("error signing up");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        Username:
        <input
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          value={username}
        />
        </label>
        <label>
          Email:
          <input
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
        </label>
        <label>
          Address:
          <input
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Address"
            value={address}
          />
        </label>
        <label>
          Tele:
          <input
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="Phone Number"
            value={phoneNumber}
          />
        </label>
        <label>
          Country:
          <input
            onChange={(event) => setCountry(event.target.value)}
            placeholder="Country"
            value={country}
          />
        </label>
        <input type="submit" value="Sign Up" />
      </form>
      {errorMessage && <p>{errorMessage}</p>} {/* Add this line */}
      <p>Got an Account?</p><a href="/">Login</a>
    </div>
  );
}

export default SignUpView;
