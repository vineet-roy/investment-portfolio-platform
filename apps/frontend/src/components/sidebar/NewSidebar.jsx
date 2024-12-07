import { Button, Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useNavigate } from "react-router-dom"; // useNavigate hook for navigation
import { useContext } from "react";
import { ThemeContext } from "../../context/themeModeContext.jsx";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LanguageButton from "../sideButtons/LanguageButton.jsx";

export default function NewSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { switchTheme } = useContext(ThemeContext);
  const navigate = useNavigate(); // useNavigate hook to redirect after logout

  const handleClose = () => setIsOpen(false);

  // Function to handle logout
  const handleLogout = () => {
    // Remove authToken from localStorage
    localStorage.removeItem("authToken");
    
    // Redirect to login page after logout
    navigate("/login");
  };

  return (
    <div>
      <FormatListBulletedIcon
        className="scale-125 cursor-pointer text-colorTextGraySecond"
        onClick={() => setIsOpen(true)}
      />

      <Drawer
        open={isOpen}
        onClose={handleClose}
        className="p-0 m-0 bg-colorBgSecondary"
      >
        <div className="flex justify-between p-4">
          <h5 className="text-3xl ml-8 text-shiwa-50">Investment Plateform</h5>
          <CloseOutlinedIcon
            className="cursor-pointer text-colorTextGraySecond"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <Drawer.Items className="mt-8">
          <Sidebar className="[&>div]:bg-transparent [&>div]:p-0 w-full ml-5">
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item className="text-colorTextGraySecond hover:bg-colorBgThird">
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <div className="flex items-center p-1 ">
                          <DashboardIcon className="scale-125 text-shiwa-50" />
                          <span className="text-2xl ml-2">Dashboard</span>
                        </div>
                      </Link>
                    </Sidebar.Item>
                    <Sidebar.Item className="text-colorTextGraySecond hover:bg-colorBgThird">
                      <Link to="/profile" style={{ textDecoration: "none" }}>
                        <div className="flex items-center p-1">
                          <GroupIcon className="scale-125 text-shiwa-50" />
                          <span className="text-2xl ml-2">Profile</span>
                        </div>
                      </Link>
                    </Sidebar.Item>
                    <Sidebar.Item className="text-colorTextGraySecond hover:bg-colorBgThird">
                      <Link to="/wallet" style={{ textDecoration: "none" }}>
                        <div className="flex items-center p-1">
                          <AccountBalanceWalletIcon className="scale-125 text-shiwa-50" />
                          <span className="text-2xl ml-2">Wallet</span>
                        </div>
                      </Link>
                    </Sidebar.Item>
                    <Sidebar.Item className="text-colorTextGraySecond hover:bg-colorBgThird" onClick={handleLogout}>
                      <div className="flex items-center p-1">
                        <LogoutIcon className="scale-125 text-shiwa-50" />
                        <span className="text-2xl ml-2">Logout</span>
                      </div>
                    </Sidebar.Item>
                    <div className="absolute bottom-28 left-0 flex justify-center w-full md:hidden">
                      <LanguageButton isLong={true} />
                    </div>
                    <div className="absolute left-0 bottom-0 w-full flex items-center justify-center pb-8">
                      <div
                        className="w-10 h-10 border-2 bg-white mr-3 rounded-lg border-shiwa-400 cursor-pointer"
                        onClick={() => switchTheme("light")}
                      ></div>
                      <div
                        className="w-10 h-10 border-2 bg-gray-900 mr-3 rounded-lg border-shiwa-400 cursor-pointer"
                        onClick={() => switchTheme("dark")}
                      ></div>
                    </div>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </div>
  );
}
