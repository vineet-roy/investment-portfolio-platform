import NewSidebar from "../sidebar/NewSidebar";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";

export default function LanguageButton(props) {
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
    <div
      className="relative flex items-center justify-center text-colorTextGraySecond hover:text-colorTextPrimary cursor-pointer text-base"
      onClick={() => changeLanguage()}
    >
      <LanguageIcon className="scale-125 mr-1" />
      <span>{props.isLong ? t("lngLong") : t("language")}</span>
    </div>
  );
}
