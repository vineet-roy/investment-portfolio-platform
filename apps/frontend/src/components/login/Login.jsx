import { useState } from "react";
import "./login.scss";

export default function Login({ email, setEmail, password, setPassword, error, handleLogin }) {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleLogin(email, password);
    }
  };

  return (
    <div className="login">
      <h1 className="title">Sign in</h1>
      <div className="loginForm">
        <form onSubmit={submitHandler}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <div className="error">{emailError}</div>}

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <div className="error">{passwordError}</div>}

          {error && <div className="error">{error}</div>}

          <div className="submitButton">
            <button type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <div className="bottomText">
        Not a member? <a href="/signup">Sign up now</a>
      </div>
    </div>
  );
}
