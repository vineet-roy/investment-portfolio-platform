import React from "react";
import "./signup.scss";

export default function Signup({
  formData,
  handleChange,
  handleSubmit,
  error,
  success,
}) {
  return (
    <div className="signup">
      <h1 className="title">Sign Up</h1>
      <div className="signupForm">
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">Registration successful!</p>}

          <div className="submitButton">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <div className="bottomText">
        Already a member? <a href="/login">Sign in now</a>
      </div>
    </div>
  );
}
