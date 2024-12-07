import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./auth.scss";
import Login from "../../components/login/Login";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      setError("");
      navigate("/");
    } catch (err) {
        console.log(err)
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="auth">
      <div className="blockContent">
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          handleLogin={handleLogin}
        />
      </div>
    </div>
  );
}
