import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeModeContext";
import { useTranslation } from "react-i18next";
import NewSidebar from "../sidebar/NewSidebar";

export default function Navbar() {
  const { switchTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("ru");
      // localStorage.setItem("lng", "ru")
    } else {
      i18n.changeLanguage("en");
      // localStorage.setItem("lng", "en")
    }
  };
  return (
    <div className="navbar h-70 sticky z-10 top-0 border-b-2 flex items-center text-sm  text-colorTextPrimary bg-colorBgSecondary border-colorBorder">
      <div className="wrapper w-full flex items-center justify-between">
        <div className="flex items-center justify-center">
          <NewSidebar />
        {/* <div className="search hidden md:block ml-12 rounded-3xl flex items-center border border-colorBorder">
          
          <input
            className="border-0 focus:ring-0 bg-transparent text-colorTextPrimary"
            type="text"
            placeholder="Search..."
          />
          <span className="cursor-pointer mr-2">
            <SearchIcon />
          </span>
        </div> */}
        </div>
        
        <div className="flex items-center items">
          <div
            className="relative flex items-center text-colorTextGraySecond hover:text-colorTextPrimary m-6 cursor-pointer text-base"
            onClick={() => changeLanguage()}
          >
            <LanguageIcon className="scale-125 mr-1" /> {t("language")}
          </div>
          <div className="relative flex items-center text-colorTextGraySecond hover:text-colorTextPrimary m-6 cursor-pointer ">
            <DarkModeIcon
              className="scale-125"
              // onClick={() => switchTheme("dark")}
            />
          </div>
          <div className="relative flex items-center text-colorTextGraySecond hover:text-colorTextPrimary m-6 cursor-pointer  hidden md:block">
            <NotificationsIcon className="scale-125" />
            <div className="counter">1</div>
          </div>

          <div className="relative flex items-center m-6 cursor-pointer">
            <img
              src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
              alt=""
              className="w-12 h-12 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
