import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../assets/SignUpView.css";
import config from "../../config";

function SignUpView() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Check if the user left a empty field
    if (
      !username.trim().toLocaleLowerCase() ||
      !email.trim().toLocaleLowerCase() ||
      !password.trim().toLocaleLowerCase() ||
      !address.trim().toLocaleLowerCase() ||
      !phoneNumber.trim().toLocaleLowerCase() ||
      !country.trim().toLocaleLowerCase()
    ) {
      setErrorMessage("Please fill in all fields");
      setLoading(false);
      return;
    }
      // Check if the username is at least 3 characters long
    if (username.length < 3) {
      setErrorMessage("Username must be at least 3 characters long");
      setLoading(false);
      return;
    }

    // Check if the email contains an @ symbol
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          address,
          phone_number: phoneNumber,
          country,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // The signup was successful
        setErrorMessage("Account was created"); // Clear any previous error message
        console.log("user created");
        setTimeout(() => {
          setLoading(false);
          navigate("/"); // Navigate to LoginView
        }, 2000);
      } else {
        // There was an error signing up
        throw new Error(data.message || "An unknown error occurred");
      }
    } catch (error: unknown) {
      setTimeout(() => {
        setLoading(false);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      }, 2000);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Name"
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
            type="passwordSign"
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
        {loading && <p style={{textAlign:"center"}}>Loading...</p>}
        {errorMessage && <p style={{textAlign:"center"}}>{errorMessage}</p>}
        <div className="signup-link" >
          <p>Got an Account?</p>
          <Link to="/">Login</Link>
        </div>
    </div>
  );
}

export default SignUpView;
