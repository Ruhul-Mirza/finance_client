import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !dateOfBirth || !newPassword) {
      setError("Please fill all the fields");
      return;
    }

    // Ensure password is at least 6 characters
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:6999/forgot-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, dateOfBirth, newPassword }),
      });

      const result = await response.json();

      if (response.status === 200) {
        setMessage(result.message);
        setError(""); // Clear any previous error message
        setTimeout(() => {
          navigate("/"); // Navigate to login page or home page after success
        }, 2000);
      } else {
        setError(result.error); // Display error message from server
        setMessage(""); // Clear any success message
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred, please try again.");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {message && <div style={{ color: "green" }}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
