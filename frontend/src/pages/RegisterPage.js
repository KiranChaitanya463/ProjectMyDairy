import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/user/register", {
        username,
        password,
      });
      setMessage(response.data);
      if (response.data === "Registered Sucessfully") {
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      console.error("Registration failed", error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">Register</button>
        </form>
        {message && <p className="register-message">{message}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;
