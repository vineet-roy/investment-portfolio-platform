import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance.js";
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      const token = response.data.access_token;

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Decode token to extract user information
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout();
        } else {
        setUser(decodedToken);

        }
      } catch (error) {
        console.error("Error decoding token", error);
        logout();
      }
    } else {
      setUser(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (isLoading) {
    // Show a loading indicator while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
