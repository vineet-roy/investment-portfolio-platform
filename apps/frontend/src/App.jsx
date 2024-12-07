import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Auth";
import Wallet from "./pages/wallet/Wallet";
import Home from "./pages/home/Home";
import Resigter from "./pages/auth/Resigter";
import { ThemeContext } from "./context/themeModeContext";
import { useContext } from "react";
import "./app.scss";
import PrivateRoute from "./routes/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/profile/profile";

function App() {
  const { theme } = useContext(ThemeContext);

  // Set theme
  document.body.classList = theme === "dark" ? "bg-gray-900" : "bg-white";

  return (
    <div className={`app theme-${theme}`}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Resigter />} />
            <Route path="/wallet" element={<PrivateRoute><Wallet /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
