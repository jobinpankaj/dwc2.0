import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import searchIcon from "./assets/images/search.svg";
import userIcon from "./assets/images/user-icon.svg";
import worldIcon from "./assets/images/world-icon.svg";
import "./assets/fonts/stylesheet.css";
import "./assets/scss/main.css";
import Hambrgr from "./assets/images/hamberGar.svg";
import searchImage from "./assets/images/search.svg";
import closeIcon from "./assets/images/close.svg";
import logo from "./assets/images/logo.svg";
import privacy_policy_bg from "./assets/images/privacy-policy_bg.jpg";

import DanielStPierreBucke from "./assets/images/teams/Daniel-St-Pierre-Bucke.jpg";
import JohnesscoRodriguez from "./assets/images/teams/Johnessco-Rodriguez.jpg";
import EveMarieGravel from "./assets/images/teams/Eve-Marie-Gravel-II.jpg";
import PhilippeWouters from "./assets/images/teams/Philippe-Wouters.jpg";
import raph from "./assets/images/teams/raph.jpg";
import Roch from "./assets/images/teams/RochCoteBuvonsLocalPRO.CA.jpg";
import { useTranslation } from "react-i18next";
import Sidebar from "./Components/sidebar";
import Header from "./Components/header";

const Teams = () => {
  const { t } = useTranslation();
  const slider = useRef(null);
  const ref = useRef();
  const ref1 = useRef();
  const header = useRef();
  const childmenu = useRef();
  const navigate = useNavigate();
  const teamList = useRef();
  const handleTeamList = () => {
    // teamList.current.classList.toggle('view-child')
    if (teamList.current.classList.contains("d-block")) {
      teamList.current.classList.remove("d-block");
      ref1.current.classList.remove("view-child");
    } else {
      teamList.current.classList.add("d-block");
      childmenu.current.classList.remove("d-block");
      ref1.current.classList.add("view-child");
    }
  };

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
  // function scroll(e) {

  //     e.wheelDelta > 0 ? (
  //         header.current.classList.remove('sticky')
  //     ) : (
  //         header.current.classList.add('sticky')
  //     );

  // };
  // useEffect(() => {
  //     window.addEventListener("wheel", scroll, true);

  //     return () => {
  //         window.removeEventListener("wheel", scroll, true);
  //     };
  // }, []);

  return (
    <>
      <div className="body" ref={ref1}>
        {/* <header ref={header} className="header">
                    <div className="container-fluid alignPadding">
                        <div className="row">
                            <div className="col-2">
                                <div className="menuIcon d-flex align-items-center h-100">
                                    <a onClick={(e) => handleSideBar(e)}> <img src={Hambrgr} alt="humbergerIcon" loading="lazy" /></a>
                                </div>
                            </div>
                            <div className="col-10 d-flex flex-row justify-content-end" onClick={handleClose}>
                                <div className="HeaderRight d-flex gap-2">
                                    <div className="searchForm position-retaive">
                                        <span onClick={(e) => handleSearch(e)} className="searchIcon"><img src={searchImage} alt="searchIcon" loading="lazy" /></span>
                                        <form ref={ref}>
                                            <input className="form-control searchfield" type="search" placeholder="Beer Search & Order" />
                                            <button className="btn searchIcon" type="submit">
                                                <img src={searchImage} alt="searchIcon" loading="lazy" />
                                            </button>
                                        </form>
                                    </div>
                                    <div className="userAccess d-flex gap-4">
                                        <div className="userCreditioal">
                                            <div className="dropdown">
                                                <button className="btn btn-secondary dropdown-toggle btnImg" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <img src={userIcon} alt="userIcon" loading="lazy" />
                                                    Login
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><NavLink className="dropdown-item" to={"/supplier/login"}>Supplier</NavLink></li>
                                                    <li><NavLink className="dropdown-item" to={"/distributor/"}>Distributor</NavLink></li>
                                                    <li><NavLink className="dropdown-item" to={"/retailer/login"}>Retailer</NavLink></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="languageSelect">
                                            <div className="dropdown">
                                                <button className="btn btn-secondary dropdown-toggle btnImg" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <img src={worldIcon} alt="worldIcon" loading="lazy" />
                                                    English
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Eng</a></li>
                                                    <li><a className="dropdown-item" href="#">Fra</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header> */}
        <Header
          slider={slider}
          ref1={ref1}
          childmenu={childmenu}
          header={header}
        />
        <Sidebar slider={slider} ref1={ref1} childmenu={childmenu} />
        <div class="mainBox" onClick={handleClose}>
          <div class="BannerImg">
            <img src={privacy_policy_bg} alt="HomeGiF" loading="lazy" />
          </div>
          <div class="container-fluid alignPadding h-100">
            <div class="col-xl-12 col-lg-12 col-md-12">
              <h2 class="subHeading text-uppercase text-white">
                {t("landing.team.team_intro")}{" "}
              </h2>
              <div class="contentBx">
                <p>{t("landing.team.content_1")}</p>

                <p>{t("landing.team.content_2")}</p>

                <p>{t("landing.team.content_3")}</p>
                <h2 class="subHeading text-uppercase text-white mt-5">
                  {t("landing.team.our_team")}{" "}
                </h2>
                <div className="teamCard mt-5">
                  <div className="row">
                    <div className="teamList col-auto mb-4">
                      <div className="card">
                        <Link
                          onClick={() => navigate("/DanielSt-Pierre-Bucke")}
                        >
                          <img
                            src={DanielStPierreBucke}
                            class="card-img-top circle"
                            alt="Johnessco Rodriguez"
                          />
                        </Link>
                        <div className="card-body text-center">
                          <h5 className="card-title">
                            {" "}
                            <Link to={"/DanielSt-Pierre-Bucke"}>
                              Daniel St-Pierre (<i>“Dan”</i>)
                            </Link>
                          </h5>
                          <p className="teamPosition">
                            {t("landing.team.founder")}
                          </p>
                          <p className=" text-light">
                            {t("landing.team.visionary")}
                          </p>
                        </div>
                        <div className="card-footer">
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
                    </div>
                    {/* <div className="teamList col-auto mb-4">
                                            <div className="card">
                                                <Link to={'/roch'}><img src={Roch} class="card-img-top circle" alt="Roch" /></Link>
                                                <div className="card-body text-center">
                                                    <h5 className="card-title"> <Link to={'/roch'}>Roch Côté</Link></h5>
                                                    <p className="teamPosition">{t('landing.team.general_director')}</p>
                                                    <p className=" text-light">{t('landing.team.general_director_p')}</p>
                                                </div>
                                                <div className="card-footer">
                                                    <ul className="socialList">
                                                        <li><a className="faceBook"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                        <li><a className="faceBook"><i className="fa-brands fa-twitter"></i></a></li>
                                                        <li><a className="faceBook"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                                        <li><a className="faceBook"><i className="fa-brands fa-instagram"></i></a></li>
                                                        <li><a className="faceBook"><i className="fa-brands fa-tiktok"></i></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div> */}
                    <div className="teamList col-auto mb-4">
                      <div className="card">
                        <Link to={"/Johness"}>
                          <img
                            src={JohnesscoRodriguez}
                            class="card-img-top circle"
                            alt="Johnessco Rodriguez"
                          />
                        </Link>
                        <div className="card-body text-center">
                          <h5 className="card-title">
                            {" "}
                            <Link to={"/Johness"}>Johnessco Rodriguez</Link>
                          </h5>
                          <p className="teamPosition">
                            {t("landing.team.chief")}{" "}
                          </p>
                          <p className=" text-light">
                            {t("landing.team.chief_p")}
                          </p>
                        </div>
                        <div className="card-footer">
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
                    </div>
                    <div className="teamList col-auto mb-4">
                      <div className="card">
                        <Link to={"/Raphael-Ethier"}>
                          <img
                            src={raph}
                            class="card-img-top circle"
                            alt="Raphael Ethier"
                          />
                        </Link>
                        <div className="card-body text-center">
                          <h5 className="card-title">
                            {" "}
                            <Link to={"/Raphael-Ethier"}>Raphael Ethier </Link>
                          </h5>
                          <p className="teamPosition">
                            {" "}
                            {t("landing.team.investor")}{" "}
                          </p>
                          <p className=" text-light">
                            {t("landing.team.investor_p")}
                          </p>
                        </div>
                        <div className="card-footer">
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
                    </div>
                    <div className="teamList col-auto mb-4">
                      <div className="card">
                        <Link to={"/Phileppe-Wouters"}>
                          <img
                            src={PhilippeWouters}
                            class="card-img-top circle"
                            alt="Johnessco Rodriguez"
                          />
                        </Link>
                        <div className="card-body text-center">
                          <h5 className="card-title">
                            {" "}
                            <Link to={"/Phileppe-Wouters"}>
                              Phileppe Wouters{" "}
                            </Link>
                          </h5>
                          <p className="teamPosition">
                            {t("landing.team.investor")}{" "}
                          </p>
                          <p className=" text-light">
                            {t("landing.team.phillipe_p")}
                          </p>
                        </div>
                        <div className="card-footer">
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
                    </div>
                    <div className="teamList col-auto mb-4">
                      <div className="card">
                        <Link to={"/Eve-Marie-Gravel"}>
                          <img
                            src={EveMarieGravel}
                            class="card-img-top circle"
                            alt="Eve Marie Gravel"
                          />
                        </Link>
                        <div className="card-body text-center">
                          <h5 className="card-title">
                            {" "}
                            <Link to={"/Eve-Marie-Gravel"}>
                              Eve-Marie Gravel{" "}
                            </Link>
                          </h5>
                          <p className="teamPosition">
                            {t("landing.team.executive")}
                          </p>
                          <p className=" text-light">
                            {t("landing.team.executive_p")}
                          </p>
                        </div>
                        <div className="card-footer">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Teams;
