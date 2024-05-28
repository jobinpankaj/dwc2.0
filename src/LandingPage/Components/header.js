import React from "react";
import { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userIcon from "../assets/images/user-icon.svg";
import worldIcon from "../assets/images/world-icon.svg";
import "../assets/fonts/stylesheet.css";
import "../assets/scss/main.css";
import Hambrgr from "../assets/images/hamberGar.svg";
import searchImage from "../assets/images/search.svg";
import { useTranslation } from "react-i18next";
import Super_Admin_Icon from "../assets/images/Super_Admin_Icon _1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ slider, ref1, childmenu, header }) => {
  const { t, i18n } = useTranslation();
  // const slider = useRef(null);
  const ref = useRef();
  // const header = useRef()
  // const ref1 = useRef();
  // const childmenu = useRef();
  const navigate = useNavigate();
  // const handleTabChange = (index) => {
  //   slider.current.slickGoTo(index);
  // };
  const handleClose = (e) => {
    childmenu.current.classList.remove("d-block");
    ref1.current.classList.remove("view", "view-child");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (window.width > 767) {
      return;
    } else {
      ref.current.classList.toggle("d-block");
    }
  };
  const handleSideBar = (e) => {
    e.preventDefault();
    console.log();
    if (
      ref1.current.classList.contains("view") ||
      ref1.current.classList.remove("view-child")
    ) {
      ref1.current.classList.remove("view", "view-child");
      childmenu.current.classList.remove("d-block");
    } else {
      ref1.current.classList.add("view");
    }
  };
  const curr_lang = localStorage.getItem("i18nextLng");
  const handleLanguageChange = (value) => {
    console.log("language", value);
    i18n.changeLanguage(value);
    localStorage.setItem("i18nextLng", value);
  };
  function scroll(e) {
    e.wheelDelta > 0
      ? header.current.classList.remove("sticky")
      : header.current.classList.add("sticky");
  }
  useEffect(() => {
    window.addEventListener("wheel", scroll, true);

    return () => {
      window.removeEventListener("wheel", scroll, true);
    };
  }, []);
  return (
    <header className="header" ref={header}>
      <div className="container-fluid alignPadding">
        <div className="row">
          <div className="col-2">
            <div className="menuIcon d-flex align-items-center h-100">
              <a onClick={(e) => handleSideBar(e)}>
                {" "}
                <img src={Hambrgr} alt="humbergerIcon" loading="lazy" />
              </a>
            </div>
          </div>
          <div
            className="col-10 d-flex flex-row justify-content-end"
            onClick={handleClose}
          >
            <div className="HeaderRight d-flex gap-2">
              <div className="searchForm position-retaive">
                <span onClick={(e) => handleSearch(e)} className="searchIcon">
                  <img src={searchImage} alt="searchIcon" loading="lazy" />
                </span>
                <div className="d-flex align-items-center">
                  <Link to={t("router.adminLogin")}>
                    <img
                      src={Super_Admin_Icon}
                      height={35}
                      width={65}
                      alt="superAdmin"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <form ref={ref}>
                  <input
                    className="form-control searchfield"
                    type="search"
                    placeholder={t("landing.landing_header.search_placeholder")}
                  />
                  <button className="btn searchIcon" type="submit">
                    <img src={searchImage} alt="searchIcon" loading="lazy" />
                  </button>
                </form>
              </div>
              <div className="userAccess d-flex gap-2 gap-md-4">
                <div className="userCreditioal">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle btnImg"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={userIcon} alt="userIcon" loading="lazy" />
                      {t("landing.landing_header.login")}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={"/supplier/login"}
                        >
                          {t("landing.landing_header.supplier")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={"/distributor/login"}
                        >
                          {t("landing.landing_header.distributor")}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={"/retailer/login"}
                        >
                          {t("landing.landing_header.retailer")}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="languageSelect">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle btnImg"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={worldIcon} alt="worldIcon" loading="lazy" />
                      {curr_lang === "en" ? "English" : "French"}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={() => handleLanguageChange("en")}
                        >
                          ENG
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          onClick={() => handleLanguageChange("fr")}
                        >
                          FRA
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
