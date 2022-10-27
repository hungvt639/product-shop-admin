import React from "react";
import "./header.scss";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import route from "../../router/route";
import VIImg from "../../img/vi.png";
import ENImg from "../../img/en.png";
import action from "../../store/actions";
import { AppState } from "../../store/interface";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.userState.user);
  const { t, i18n } = useTranslation();

  function onLangChange() {
    let lg = "";
    if (i18n.language === "vi") {
      lg = "en";
    } else {
      lg = "vi";
    }
    i18n.changeLanguage(lg);
  }
  function logout() {
    dispatch(action.clearUser());
    localStorage.removeItem("token");
    // localStorage.removeItem("user");
  }
  const menu = (
    <div>
      <div>
        <Link to={`${route.USER_PROFILE}/${user?._id}`}>Profile</Link>
      </div>
      <div onClick={logout}>{t("Logout")}</div>
    </div>
  );
  return (
    <div className="header">
      <div className="max-width1200 headers mx-auto my-0">
        <div className="w-full h-full">
          <Link className="m-5 text-white" to={route.HOME}>
            Home
          </Link>
        </div>
        <div className="flex items-center">
          <div className="btn-header" onClick={onLangChange}>
            <img className="img-language" width="24px" alt="language" src={i18n.language === "vi" ? VIImg : ENImg} />
            {t("L")}
          </div>
          <Dropdown overlay={menu} placement="bottomRight">
            <div className="btn-header">{`${user?.fullname} `}</div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default Header;
