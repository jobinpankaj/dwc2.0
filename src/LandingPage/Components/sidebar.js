import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import closeIcon from "../assets/images/close.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/fonts/stylesheet.css";
import "../assets/scss/main.css";
import logo from "../assets/images/logo.svg";
import searchIcon from "../assets/images/search.svg";
import { useTranslation } from "react-i18next";

const Sidebar = ({
  slider,
  ref1,
  childmenu,
  header,
  updateCount,
  setUpdateCount,
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  // const [updateCount, setUpdateCount] = useState(0);
  // const childmenu = useRef();
  // const ref1 = useRef()
  useEffect(() => {
    const currentURL = window.location.href;

    // Perform operations based on the currentURL
    if (currentURL.includes("/LegalMention")) {
      childmenu.current.classList.add("d-block");
    } else {
      // Do something for other URLs
    }
  });

  const handleClose = (e) => {
    childmenu.current.classList.remove("d-block");
    ref1.current.classList.remove("view", "view-child");
  };

  const handleSubSideBar = (e) => {
    e.preventDefault();
    console.log("clicked");
    if (childmenu.current.classList.contains("d-block")) {
      childmenu.current.classList.remove("d-block");
      ref1.current.classList.remove("view-child");
    } else {
      childmenu.current.classList.add("d-block");
      ref1.current.classList.add("view-child");
    }
  };

  return (
    <div className="sideBarMenu">
      <span className="sideBarClose" onClick={(e) => handleClose(e)}>
        {" "}
        <img src={closeIcon} alt="close" loading="lazy" />{" "}
      </span>
      <div className="logoBox ">
        <a onClick={() => setUpdateCount ? setUpdateCount(0) : navigate('/', {state: {path:0}})}>
          <img src={logo} loading="lazy" alt="logo" />
        </a>
      </div>
      <div className="d-flex flex-column justify-content-between spaceBetwwenSocial">
        <div className="sideMenuList">
          <div className="searchForm position-retaive">
            <form>
              <input
                className="form-control searchfield"
                type="search"
                placeholder={t("landing.landing_sidebar.search_placeholder")}
              />
              <button onClick="" className="btn searchIcon" type="submit">
                <img src={searchIcon} alt="searchIcon" loading="lazy" />
              </button>
            </form>
          </div>
          <ul className="menu">
            <li>
              <a
                onClick={() => setUpdateCount ? setUpdateCount(1) : navigate('/', {state: {path:1}})}
                className={`url ${updateCount === 1 && "active"}`}
              >
                {t("landing.landing_sidebar.about_us")}
              </a>
            </li>
            <li>
              <a
                onClick={() => setUpdateCount ? setUpdateCount(3) : navigate('/', {state: {path:3}})}
                className={`url ${updateCount === 3 && "active"}`}
              >
                {t("landing.landing_sidebar.brewers")}
              </a>
            </li>
            <li>
              <a
                onClick={() => setUpdateCount ? setUpdateCount(4) : navigate('/', {state: {path:4}})}
                className={`url ${updateCount === 4 && "active"}`}
              >
                {t("landing.landing_sidebar.retailers")}
              </a>
            </li>
            <li>
              <a
                onClick={() => setUpdateCount ? setUpdateCount(5) : navigate('/', {state: {path:5}})}
                className={`url ${updateCount === 5 && "active"}`}
              >
                {t("landing.landing_sidebar.distributors")}
              </a>
            </li>

            {/* <li className="subMenu">
              <NavLink
                to="/teams"
                className="url"
                exact
                activeClassname="active"
              >
                {t("landing.landing_sidebar.team")}
            </NavLink>
            </li> */}

            <li>
              <NavLink
                to="/news"
                aria-disabled="true"
                className="url"
                exact
                activeClassname="active"
              >
                {t("landing.landing_sidebar.news")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className="url"
                exact
                activeClassname="active"
              >
                {t("landing.landing_sidebar.contact")}
              </NavLink>
            </li>
            <li className="subMenu">
              <a onClick={(e) => handleSubSideBar(e)}>
                {t("landing.landing_sidebar.legal_mention")}
              </a>
              <div className="ChildMenuList" ref={childmenu}>
                <ul className="menu nav nav-tabs" id="myTab" role="tablist">
                  <li classList="nav-item" role="presentation">
                    <button
                      className={"nav-link"}
                      id="TermCondition-tab"
                      type="button"
                      role="tab"
                      onClick={() =>
                        navigate("/LegalMention", { state: { path: "terms" } })
                      }
                    >
                      {t("landing.landing_sidebar.legal_menu.terms")}
                    </button>
                  </li>
                  <li classList="nav-item" role="presentation">
                    <button
                      className={"nav-link"}
                      id="PrivacyPolicy-tab"
                      type="button"
                      role="tab"
                      onClick={() =>
                        navigate("/LegalMention", {
                          state: { path: "privacy" },
                        })
                      }
                    >
                      {t("landing.landing_sidebar.legal_menu.privacy")}
                    </button>
                  </li>

                  <li classList="nav-item" role="presentation">
                    <button
                      className={"nav-link"}
                      id="SocialCorporate-tab"
                      type="button"
                      role="tab"
                      onClick={() =>
                        navigate("/LegalMention", { state: { path: "social" } })
                      }
                    >
                      {t("landing.landing_sidebar.legal_menu.social")}
                    </button>
                  </li>
                  <li classList="nav-item" role="presentation">
                    <button
                      className={"nav-link"}
                      id="Paymentoptions-tab"
                      type="button"
                      role="tab"
                      onClick={() =>
                        navigate("/LegalMention", {
                          state: { path: "payment" },
                        })
                      }
                    >
                      {t("landing.landing_sidebar.legal_menu.payment")}
                    </button>
                  </li>
                  <li classList="nav-item" role="presentation">
                    <button
                      className={"nav-link"}
                      id="OnlineOrders-tab"
                      type="button"
                      role="tab"
                      onClick={() =>
                        navigate("/LegalMention", { state: { path: "online" } })
                      }
                    >
                      {t("landing.landing_sidebar.legal_menu.online")}
                    </button>
                  </li>
                  <li classList="nav-item" role="presentation">
                    <button
                      className={"nav-link"}
                      id="InventoryLevels-tab"
                      type="button"
                      role="tab"
                      onClick={() =>
                        navigate("/LegalMention", {
                          state: { path: "inventory" },
                        })
                      }
                    >
                      {t("landing.landing_sidebar.legal_menu.inventory")}
                    </button>
                  </li>
                  <li classList="nav-item" role="presentation">
                    <button
                      className={"nav-link"}
                      id="Community-tab"
                      type="button"
                      role="tab"
                      onClick={() =>
                        navigate("/LegalMention", {
                          state: { path: "community" },
                        })
                      }
                    >
                      {t("landing.landing_sidebar.legal_menu.community")}
                    </button>
                  </li>
                  <li classList="nav-item" role="presentation">
                    <button
                      className={"nav-link"}
                      id="DebitCredit-tab"
                      type="button"
                      role="tab"
                      onClick={() =>
                        navigate("/LegalMention", { state: { path: "debit" } })
                      }
                    >
                      {t("landing.landing_sidebar.legal_menu.debit")}
                    </button>
                  </li>
                  <li classList="nav-item" role="presentation">
                    <button
                      className={"nav-link"}
                      id="NewsletterSubscription-tab"
                      type="button"
                      role="tab"
                      onClick={() =>
                        navigate("/LegalMention", {
                          state: { path: "newsletter" },
                        })
                      }
                    >
                      {t("landing.landing_sidebar.legal_menu.newsletter")}
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NavLink to="/faq" className="url" exact activeClassname="active">
                {t("landing.landing_sidebar.faq")}
              </NavLink>
            </li>
          </ul>
        </div>
        <ul className="socialList">
          <li>
            <a className="faceBook">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a className="faceBook">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
          <li>
            <a className="faceBook">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a className="faceBook">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a className="faceBook">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};


{/* <span className="submenuOpen" onClick={(e) => handleTeamList(e)}> <i class="fa-solid fa-angle-right"></i> </span>
                                    <div className="ChildMenuList" ref={teamList}>
                                        <ul className="menu">
                                            <li>
                                                <NavLink to="/DanielSt-Pierre-Bucke" className="url" exact activeClassname="active">
                                                    Daniel St-Pierre (“Dan”)
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/roch" className="url" exact activeClassname="active">
                                                     Roch Côté
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink to="/Johness" className="url" exact activeClassname="active">
                                                    Johnessco Rodriguez
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/Raphael-Ethier" className="url" exact activeClassname="active">
                                                    Raphael Ethier
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/Phileppe-Wouters" className="url" exact activeClassname="active">
                                                    Phileppe Wouters
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/Eve-Marie-Gravel" className="url" exact activeClassname="active">
                                                    Eve-Marie Gravel
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div> */}

export default Sidebar;
