import React, { useState } from "react";
import Signup from "../../components/signup/Signup";
import "./auth.scss";
import { registerUser } from "../../api/userApis";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await registerUser(formData);
      setSuccess(true);
      // Show success toast notification
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      console.log("User registered:", response);
    } catch (err) {
      setError(err.message || "Something went wrong!");
      toast.error("Registration failed! Please try again.");
    }
  };

  return (
    <div className="auth">
      <div className="blockContent signup">
        <Signup
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          success={success}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
