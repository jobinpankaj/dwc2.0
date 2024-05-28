import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import searchIcon from "./assets/images/search.svg";
import userIcon from "./assets/images/user-icon.svg";
import worldIcon from "./assets/images/world-icon.svg";
import "./assets/fonts/stylesheet.css";
import "./assets/scss/main.css";
import Hambrgr from "./assets/images/hamberGar.svg";
import searchImage from "./assets/images/search.svg";
import closeIcon from "./assets/images/close.svg";
import logo from "./assets/images/logo.svg";
import downArrow from "./assets/images/down-arrow.svg";
import privacy_policy_bg from "./assets/images/privacy-policy_bg.jpg";
import creditDebitApplication from "./assets/images/gif/CREDIT & DEBIT APPLICATION.docx";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import apis from "../utils/apis";
import { Oval } from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import Sidebar from "./Components/sidebar";
import Header from "./Components/header";

const LegalMention = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [legalAge, setLegalAge] = useState(false);
  const [permission, setPermission] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [legalAgeError, setLegalAgeError] = useState("");
  const [permissionError, setPermissionError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const slider = useRef(null);
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("terms");
  const ref = useRef();
  const ref1 = useRef();
  const childmenu = useRef();
  const header = useRef();
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
  const handleTabChange = (index) => {
    slider.current.slickGoTo(index);
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

  useEffect(() => {
    if (location.state) {
      setCurrentTab(location.state.path);
    }
  }, [location.state]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handleLegalAge = (e) => {
    setLegalAge(e.target.checked);
    setLegalAgeError("");
  };
  const handlePermission = (e) => {
    setPermission(e.target.checked);
    setPermissionError("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let emailValid = true;
    if (!emailregex.test(email)) {
      if (email === "") {
        setEmailError(t("landing.legal_mention.newsletter.email_required"));
      } else {
        setEmailError(t("landing.legal_mention.newsletter.valid_email"));
      }
      emailValid = false;
    }
    if (!legalAge) {
      setLegalAgeError(t("landing.legal_mention.newsletter.legal_age_error"));
    }
    if (!permission) {
      setPermissionError(
        t("landing.legal_mention.newsletter.permission_error")
      );
    }
    if (
      emailValid === false ||
      legalAge === false ||
      emailError !== "" ||
      permission === false
    ) {
      console.log("Validation Error");
    } else {
      setLoading(true);
      const bodyData = {
        email: email,
        age_check: legalAge ? "1" : "0",
        marketing_permission: permission ? "1" : "0",
      };
      const config = {
        headers: {
          accept: "application/json",
        },
      };
      apis
        .post("/newsletter-subscription", bodyData, config)
        .then((res) => {
          console.log(res.data.data);
          setEmail("");
          setLegalAge(false);
          setPermission(false);
          if (res.data.success === true) {
            toast.success("You have been subscribed.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.success("You have been already subscribed", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 422) {
            toast.error(error.response.data.data.error, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error(error.response.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="body view-child view" ref={ref1}>
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
        <Sidebar
          slider={slider}
          ref1={ref1}
          childmenu={childmenu}
          header={header}
        />
        <div class="mainBox" onClick={handleClose}>
          <div class="BannerImg">
            <img src={privacy_policy_bg} alt="HomeGiF" loading="lazy" />
          </div>
          <div class="container-fluid alignPadding h-100 smallFont">
            <div className="tab-content " id="myTabContent">
              {(() => {
                switch (currentTab) {
                  case "terms":
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="TermCondition-tab-pane"
                        role="tabpanel"
                        aria-labelledby="TermCondition-tab"
                        tabindex="0"
                      >
                        <div class="col-xl-12 col-lg-12 col-md-12">
                          <h2 class="subHeading text-uppercase text-white">
                            {t("landing.legal_mention.terms.terms_condition")}
                          </h2>
                          <div class="contentBx">
                            <p>
                              <strong>
                                {t("landing.legal_mention.terms.p1")}
                              </strong>
                            </p>
                            <p>
                              {t("landing.legal_mention.terms.p2")}{" "}
                              <strong>
                                {" "}
                                {t("landing.legal_mention.terms.p3")}
                              </strong>{" "}
                              {t("landing.legal_mention.terms.p4")}{" "}
                              <strong>
                                <i>{t("landing.legal_mention.terms.p5")}</i>
                              </strong>{" "}
                              {t("landing.legal_mention.terms.p6")}
                            </p>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.terms.p7")} </li>
                              <li>{t("landing.legal_mention.terms.p8")} </li>
                              <li>{t("landing.legal_mention.terms.p9")} </li>
                              <li>{t("landing.legal_mention.terms.p10")}</li>
                              <li>{t("landing.legal_mention.terms.p11")} </li>
                            </ul>
                            <p>{t("landing.legal_mention.terms.p12")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3 mt-4">
                              {t("landing.legal_mention.terms.p13")}{" "}
                            </h5>
                            <p>
                              {t("landing.legal_mention.terms.p14")}{" "}
                              <strong className="text-underline">
                                {t("landing.legal_mention.terms.p15")}
                              </strong>{" "}
                              &nbsp;
                              {t("landing.legal_mention.terms.p16")}
                            </p>
                            <p>{t("landing.legal_mention.terms.p17")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p18")}{" "}
                            </h5>
                            <p className="text-purpal">
                              {t("landing.legal_mention.terms.p19")}{" "}
                            </p>
                            <p>{t("landing.legal_mention.terms.p20")} </p>
                            <p>{t("landing.legal_mention.terms.p21")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p22")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p23")} </p>
                            <p>{t("landing.legal_mention.terms.p24")}</p>
                            <p>{t("landing.legal_mention.terms.p25")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p26")}{" "}
                            </h5>
                            <p>
                              {t("landing.legal_mention.terms.p27")}{" "}
                              <strong>
                                {t("landing.legal_mention.terms.p28")}
                              </strong>{" "}
                              {t("landing.legal_mention.terms.p29")}{" "}
                            </p>
                            <p>{t("landing.legal_mention.terms.p30")}</p>
                            <p>
                              <strong>
                                {t("landing.legal_mention.terms.p31")}
                              </strong>{" "}
                              {t("landing.legal_mention.terms.p32")}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p33")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p34")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p35")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p36")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p37")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p38")}</p>
                            <p>{t("landing.legal_mention.terms.p39")}</p>
                            <p>
                              <strong>
                                {t("landing.legal_mention.terms.p40")}
                              </strong>
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p41")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p42")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p43")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p44")} </p>
                            <p>{t("landing.legal_mention.terms.p45")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p46")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p47")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p48")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p49")}</p>
                            <p>{t("landing.legal_mention.terms.p50")}</p>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.terms.p51")}</li>
                              <li>{t("landing.legal_mention.terms.p52")}</li>
                              <li>{t("landing.legal_mention.terms.p53")}</li>
                              <li>{t("landing.legal_mention.terms.p54")}</li>
                              <li>{t("landing.legal_mention.terms.p55")}</li>
                              <li>{t("landing.legal_mention.terms.p56")}</li>
                              <li>{t("landing.legal_mention.terms.p57")}</li>
                              <li>{t("landing.legal_mention.terms.p58")}</li>
                              <li>{t("landing.legal_mention.terms.p59")}</li>
                            </ul>
                            <p>{t("landing.legal_mention.terms.p60")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p61")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p62")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p63")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p64")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p65")}
                            </h5>
                            <p>
                              {t("landing.legal_mention.terms.p66")}{" "}
                              <a
                                onClick={() =>
                                  currentTab === "terms"
                                    ? setCurrentTab("privacy")
                                    : navigate("/privacy-policy")
                                }
                                className="text-underline text-purpal"
                              >
                                {t("landing.legal_mention.terms.p67")}
                              </a>
                              . {t("landing.legal_mention.terms.p68")}
                            </p>
                            <p>{t("landing.legal_mention.terms.p69")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p70")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p71")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p72")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p73")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p74")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p75")}</p>
                            <p>
                              <strong>
                                <a
                                  href="#"
                                  className="text-underline text-purpal"
                                >
                                  {t("landing.legal_mention.terms.p76")}
                                </a>
                              </strong>
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p77")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p78")}</p>
                            <p>{t("landing.legal_mention.terms.p79")}</p>
                            <p>{t("landing.legal_mention.terms.p80")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p81")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p82")}</p>
                            <p>
                              {t("landing.legal_mention.terms.p83")}{" "}
                              <a
                                className="text-purpal"
                                href="tel:+1 4506414848"
                              >
                                +1 (450) 641-4848
                              </a>{" "}
                              {t("landing.legal_mention.terms.p84")}{" "}
                              <a
                                href="mailto:support@Buvonslocalpro.ca."
                                className="text-purpal"
                              >
                                support @ Buvonslocalpro .ca.
                              </a>
                            </p>
                            <p>{t("landing.legal_mention.terms.p85")} </p>
                            <ul className="checkList py-2 mb-3">
                              <li>{t("landing.legal_mention.terms.p86")} </li>
                              <li>{t("landing.legal_mention.terms.p87")} </li>
                              <li>{t("landing.legal_mention.terms.p88")}</li>
                            </ul>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p89")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p90")}</p>
                            <p>{t("landing.legal_mention.terms.p91")}</p>
                            <p>{t("landing.legal_mention.terms.p92")}</p>
                            <p>{t("landing.legal_mention.terms.p93")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p94")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p95")} </p>
                            <p>
                              {t("landing.legal_mention.terms.p96")}{" "}
                              <strong>
                                {t("landing.legal_mention.terms.p97")}
                              </strong>
                              .{" "}
                            </p>
                            <p>
                              {t("landing.legal_mention.terms.p98")}{" "}
                              <strong>
                                {t("landing.legal_mention.terms.p99")}
                              </strong>
                              . {t("landing.legal_mention.terms.p100")}
                            </p>
                            <p>{t("landing.legal_mention.terms.p101")} </p>
                            <p>{t("landing.legal_mention.terms.p102")}</p>
                            <p>{t("landing.legal_mention.terms.p103")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p104")}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p105")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p106")}{" "}
                            </h5>
                            <p>
                              {t("landing.legal_mention.terms.p107")} (“ 
                              <strong>
                                {" "}
                                {t("landing.legal_mention.terms.p108")}
                              </strong>
                               ”); {t("landing.legal_mention.terms.p109")}  
                            </p>
                            <p>
                              {t("landing.legal_mention.terms.p110")} “
                              <strong>
                                {t("landing.legal_mention.terms.p111")}
                              </strong>
                               ”).   {t("landing.legal_mention.terms.p112")}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p113")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.terms.p114")}</p>
                            <p>{t("landing.legal_mention.terms.p115")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.terms.p116")}
                            </h5>
                            <p>
                              {t("landing.legal_mention.terms.p117")} “
                              <strong>
                                {t("landing.legal_mention.terms.p118")}
                              </strong>
                              ”{t("landing.legal_mention.terms.p119")}{" "}
                            </p>
                            <p>
                              {t("landing.legal_mention.terms.p120")}{" "}
                              <a
                                href="https://www.operationnezrouge.com/"
                                target="_blank"
                                className="text-underline text-purpal"
                              >
                                https://www.operationnezrouge.com/
                              </a>{" "}
                              {t("landing.legal_mention.terms.p121")}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.terms.p122")}{" "}
                            </h5>
                            <p>
                              <strong>
                                {t("landing.legal_mention.terms.p123")}
                              </strong>
                               {t("landing.legal_mention.terms.p124")}{" "}
                            </p>
                            <p>{t("landing.legal_mention.terms.p125")}</p>
                            <p>{t("landing.legal_mention.terms.p126")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.terms.p127")}{" "}
                            </h5>
                            <p>
                              <strong>
                                {t("landing.legal_mention.terms.p128")}
                              </strong>
                               {t("landing.legal_mention.terms.p129")}{" "}
                            </p>
                            <p>{t("landing.legal_mention.terms.p130")} </p>
                            <p>
                              {t("landing.legal_mention.terms.p131")}{" "}
                              <em>{t("landing.legal_mention.terms.p132")}</em>,{" "}
                              {t("landing.legal_mention.terms.p133")}{" "}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.terms.p133")}{" "}
                            </h5>
                            <p>
                              {t("landing.legal_mention.terms.p134")}{" "}
                              <strong>
                                {t("landing.legal_mention.terms.p135")}
                              </strong>{" "}
                              (“{t("landing.legal_mention.terms.p136")}”)
                            </p>
                            <p>
                              {" "}
                              {t("landing.legal_mention.terms.p137")}
                              {t("landing.legal_mention.terms.p138")} 
                              <strong>
                                <a
                                  onClick={() =>
                                    currentTab === "terms"
                                      ? setCurrentTab("privacy")
                                      : navigate("/privacy-policy")
                                  }
                                  className="text-underline text-purpal"
                                >
                                  {t("landing.legal_mention.terms.p138")}
                                </a>
                              </strong>
                               .
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.terms.p139")}{" "}
                            </h5>
                            <p>
                              {t("landing.legal_mention.terms.p140")} 
                              <strong>
                                <a
                                  onClick={() => navigate("/contact-us")}
                                  className="text-underline text-purpal"
                                >
                                  {t("landing.legal_mention.terms.p141")}
                                </a>
                              </strong>{" "}
                              .
                            </p>
                            <p>
                              <strong>
                                {t("landing.legal_mention.terms.p142")}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  case "privacy":
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="PrivacyPolicy-tab-pane"
                        role="tabpanel"
                        aria-labelledby="PrivacyPolicy-tab"
                        tabindex="1"
                      >
                        <div class="col-xl-12 col-lg-12 col-md-12">
                          <h2 class="subHeading text-uppercase text-white">
                            {t("landing.legal_mention.privacy.privacy_policy")}
                          </h2>
                          <div class="contentBx">
                            <p>{t("landing.legal_mention.privacy.p1")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.privacy.p2")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.privacy.p3")}</p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.privacy.p4")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.privacy.p5")}</p>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.privacy.p6")}</li>
                              <li>{t("landing.legal_mention.privacy.p7")}</li>
                              <li>{t("landing.legal_mention.privacy.p8")}</li>
                              <li>{t("landing.legal_mention.privacy.p9")}</li>
                              <li>{t("landing.legal_mention.privacy.p10")}</li>
                            </ul>
                            <p>{t("landing.legal_mention.privacy.p11")}</p>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.privacy.p12")}</li>
                              <li>{t("landing.legal_mention.privacy.p13")}</li>
                              <li>{t("landing.legal_mention.privacy.p14")}</li>
                              <li>{t("landing.legal_mention.privacy.p15")}</li>
                              <li>{t("landing.legal_mention.privacy.p16")} </li>
                              <li>{t("landing.legal_mention.privacy.p17")} </li>
                              <li>{t("landing.legal_mention.privacy.p18")}</li>
                              <li>{t("landing.legal_mention.privacy.p19")}</li>
                              <li>{t("landing.legal_mention.privacy.p20")}</li>
                              <li>{t("landing.legal_mention.privacy.p21")}</li>
                              <li>{t("landing.legal_mention.privacy.p22")}</li>
                              <li>{t("landing.legal_mention.privacy.p23")}</li>
                              <li>{t("landing.legal_mention.privacy.p24")}</li>
                              <li>{t("landing.legal_mention.privacy.p25")}</li>
                              <li>{t("landing.legal_mention.privacy.p26")}</li>
                            </ul>
                            <p>{t("landing.legal_mention.privacy.p27")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.privacy.p28")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.privacy.p29")}</p>
                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.privacy.p30")}
                            </h6>
                            <p>{t("landing.legal_mention.privacy.p31")} </p>
                            <p>{t("landing.legal_mention.privacy.p32")}</p>
                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.privacy.p33")}
                            </h6>
                            <p>{t("landing.legal_mention.privacy.p34")}</p>
                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.privacy.p35")}
                            </h6>
                            <p>{t("landing.legal_mention.privacy.p36")}</p>
                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.privacy.p37")}
                            </h6>
                            <p>{t("landing.legal_mention.privacy.p38")}</p>
                            <p>
                              {t("landing.legal_mention.privacy.p39")}
                              <a
                                onClick={() =>
                                  currentTab === "terms"
                                    ? setCurrentTab("terms")
                                    : navigate("/terms-conditions")
                                }
                                className="text-underline text-purpal"
                              >
                                {t("landing.legal_mention.privacy.p40")}
                              </a>
                            </p>
                            <p>
                              {t("landing.legal_mention.privacy.p41")} 
                              <strong>
                                {t("landing.legal_mention.privacy.p42")}
                              </strong>
                               {t("landing.legal_mention.privacy.p43")}
                            </p>
                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.privacy.p44")}
                            </h6>
                            <p>{t("landing.legal_mention.privacy.p45")}</p>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.privacy.p46")}</li>
                              <li>{t("landing.legal_mention.privacy.p47")}</li>
                              <li>{t("landing.legal_mention.privacy.p48")}</li>
                              <li>{t("landing.legal_mention.privacy.p49")}</li>
                              <li>{t("landing.legal_mention.privacy.p50")}</li>
                              <li>{t("landing.legal_mention.privacy.p51")}</li>
                            </ul>
                            <p>{t("landing.legal_mention.privacy.p52")}</p>
                            <p>{t("landing.legal_mention.privacy.p53")} </p>
                            <ul className="checkList mb-3">
                              <li>
                                {" "}
                                {t("landing.legal_mention.privacy.p54")}{" "}
                              </li>
                              <li> {t("landing.legal_mention.privacy.p55")}</li>
                            </ul>
                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.privacy.p56")}
                            </h6>
                            <p>{t("landing.legal_mention.privacy.p57")} </p>
                            <ul className="checkList mb-3">
                              <li>
                                {" "}
                                {t("landing.legal_mention.privacy.p58")}{" "}
                              </li>
                              <li>
                                {" "}
                                s{t("landing.legal_mention.privacy.p59")} 
                                <a
                                  href="#"
                                  className="text-underline text-purpal"
                                >
                                  {t("landing.legal_mention.privacy.p60")}
                                </a>
                                . {t("landing.legal_mention.privacy.p61")} 
                                <a
                                  href="#"
                                  className="text-underline text-purpal"
                                >
                                  {t("landing.legal_mention.privacy.p62")}
                                </a>
                              </li>
                            </ul>
                            <p>{t("landing.legal_mention.privacy.p63")}</p>
                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.privacy.p64")}
                            </h6>
                            <p>{t("landing.legal_mention.privacy.p65")}</p>
                            <p>{t("landing.legal_mention.privacy.p66")}</p>
                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.privacy.p67")}
                            </h6>
                            <p>{t("landing.legal_mention.privacy.p68")}</p>
                            <p>{t("landing.legal_mention.privacy.p69")}</p>
                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.privacy.p70")}{" "}
                            </h6>
                            <p>{t("landing.legal_mention.privacy.p71")}</p>
                            <address className="">
                              {t("landing.legal_mention.privacy.p72")}
                              <br />
                              {t("landing.legal_mention.privacy.p73")}
                              <br />
                              <a
                                href="mailto:support@ buvonslocal.ca"
                                className="text-underline text-purpal"
                              >
                                {t("landing.legal_mention.privacy.p74")}
                              </a>
                               
                            </address>
                          </div>
                        </div>
                      </div>
                    );
                  case "social":
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="SocialCorporate-tab-pane"
                        role="tabpanel"
                        aria-labelledby="SocialCorporate-tab"
                        tabindex="2"
                      >
                        <div class="col-xl-12 col-lg-12 col-md-12">
                          <h2 class="subHeading text-uppercase text-white">
                            {t("landing.legal_mention.social.social_corporate")}
                          </h2>
                          <div class="contentBx">
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.social.p1")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.social.p2")}</p>
                            <p>{t("landing.legal_mention.social.p3")} </p>
                            <p>
                              <strong>
                                {t("landing.legal_mention.social.p4")}
                              </strong>
                            </p>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.social.p5")}</li>
                              <li>{t("landing.legal_mention.social.p6")}</li>
                              <li>{t("landing.legal_mention.social.p7")}</li>
                              <li>{t("landing.legal_mention.social.p8")}</li>
                              <li>{t("landing.legal_mention.social.p9")}</li>
                            </ul>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.social.p10")}
                            </h5>
                            <p>{t("landing.legal_mention.social.p11")} </p>
                            <p>{t("landing.legal_mention.social.p12")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.social.p13")}
                            </h5>
                            <p>{t("landing.legal_mention.social.p14")}</p>
                          </div>
                        </div>
                      </div>
                    );
                  case "payment":
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="Paymentoptions-tab-pane"
                        role="tabpanel"
                        aria-labelledby="Paymentoptions-tab"
                        tabindex="3"
                      >
                        <div class="col-xl-12 col-lg-12 col-md-12">
                          <h2 class="subHeading text-uppercase text-white">
                            {t("landing.legal_mention.payment.payment_options")}
                          </h2>
                          <div class="contentBx">
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.payment.p1")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.payment.p2")} </p>
                            <p>{t("landing.legal_mention.payment.p3")} </p>
                            <p>{t("landing.legal_mention.payment.p4")} </p>
                            <p>{t("landing.legal_mention.payment.p5")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.payment.p6")}{" "}
                            </h5>
                            <h6 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.payment.p7")}
                            </h6>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.payment.p8")}</li>
                            </ul>
                            <h6 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.payment.p9")}
                            </h6>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.payment.p10")}</li>
                              <li>{t("landing.legal_mention.payment.p11")} </li>
                            </ul>
                            <p>* {t("landing.legal_mention.payment.p12")}</p>
                            <h6 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.payment.p13")}
                            </h6>
                            <div className="table-responsive col-12">
                              <table className="table table-dark table-striped-columns table-bordered  rounded-2">
                                <thead>
                                  <tr>
                                    <th className="text-purpal">
                                      {t("landing.legal_mention.payment.p14")}
                                    </th>
                                    <th className="text-purpal">
                                      {t("landing.legal_mention.payment.p15")}
                                    </th>
                                    <th className="text-purpal">
                                      {t("landing.legal_mention.payment.p16")}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {t("landing.legal_mention.payment.p17")}
                                    </td>
                                    <td>
                                      {t("landing.legal_mention.payment.p18")}
                                    </td>
                                    <td>
                                      {t("landing.legal_mention.payment.p18")}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {t("landing.legal_mention.payment.p19")}
                                    </td>
                                    <td>
                                      {t("landing.legal_mention.payment.p20")}
                                    </td>
                                    <td>
                                      {t("landing.legal_mention.payment.p21")}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {t("landing.legal_mention.payment.p22")}
                                    </td>
                                    <td>
                                      {t("landing.legal_mention.payment.p23")}
                                    </td>
                                    <td>
                                      {t("landing.legal_mention.payment.p24")}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <p className="text-underline mt-3">
                              <strong>
                                {" "}
                                {t("landing.legal_mention.payment.p25")}
                              </strong>
                            </p>

                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.payment.p26")}
                            </h5>
                            <p>{t("landing.legal_mention.payment.p27")} </p>
                            <p>{t("landing.legal_mention.payment.p28")}</p>
                            <h6 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.payment.p29")}
                            </h6>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.payment.p30")} </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  case "online":
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="OnlineOrders-tab-pane"
                        role="tabpanel"
                        aria-labelledby="OnlineOrders-tab"
                        tabindex="4"
                      >
                        <div class="col-xl-12 col-lg-12 col-md-12">
                          <h2 class="subHeading text-uppercase text-white">
                            {t("landing.legal_mention.online.order_online")}
                          </h2>
                          <div class="contentBx">
                            <p>{t("landing.legal_mention.online.p1")} </p>
                            <p>{t("landing.legal_mention.online.p2")} </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.online.p3")}{" "}
                            </h5>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.online.p4")}</li>
                              <li>{t("landing.legal_mention.online.p5")} </li>
                              <li>{t("landing.legal_mention.online.p6")} </li>
                              <li>{t("landing.legal_mention.online.p7")}</li>
                              <li>{t("landing.legal_mention.online.p8")}</li>
                            </ul>
                            <p>{t("landing.legal_mention.online.p9")} </p>

                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.online.p10")}{" "}
                            </h5>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.online.p11")}</li>
                              <li>{t("landing.legal_mention.online.p12")}</li>
                              <li>{t("landing.legal_mention.online.p13")}</li>
                              <li>{t("landing.legal_mention.online.p14")}</li>
                              <li>{t("landing.legal_mention.online.p15")}</li>
                              <li>{t("landing.legal_mention.online.p16")} </li>
                            </ul>

                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.online.p17")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.online.p18")} </p>
                            <p>{t("landing.legal_mention.online.p19")}</p>

                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.online.p20")}
                            </h6>
                            <p>{t("landing.legal_mention.online.p21")}</p>

                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {t("landing.legal_mention.online.p22")}
                            </h6>
                            <p>{t("landing.legal_mention.online.p23")}</p>

                            <div className="table-responsive col-12 col-xl-6 mt-lg-4 mt-3">
                              <table className="table table-dark table-striped-columns table-bordered  rounded-2 mb-2">
                                <caption className="text-white">
                                  * {t("landing.legal_mention.online.p24")}
                                </caption>
                                <thead>
                                  <tr>
                                    <th className="text-purpal">
                                      {t("landing.legal_mention.online.p25")}
                                    </th>
                                    <th className="text-purpal">
                                      {t("landing.legal_mention.online.p26")}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      {t("landing.legal_mention.online.p27")}
                                    </td>
                                    <td>11:59 p.m.*</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      {t("landing.legal_mention.online.p28")}
                                    </td>
                                    <td>11:59 p.m.*</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>

                            <h6 class="py-2 mb-2 mb-lg-3 f-20">
                              {" "}
                              {t("landing.legal_mention.online.p29")}
                            </h6>
                            <p className="mb-2">
                              {t("landing.legal_mention.online.p30")}
                            </p>
                            <p className="mb-2">
                              {t("landing.legal_mention.online.p31")}
                            </p>
                            <p className="mb-2">
                              {t("landing.legal_mention.online.p32")}
                            </p>
                            <p className="mb-2">
                              {t("landing.legal_mention.online.p33")}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  case "inventory":
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="InventoryLevels-tab-pane"
                        role="tabpanel"
                        aria-labelledby="InventoryLevels-tab"
                        tabindex="5"
                      >
                        <div class="col-xl-12 col-lg-12 col-md-12">
                          <h2 class="subHeading text-uppercase text-white">
                            {t(
                              "landing.legal_mention.inventory.inventory_level"
                            )}
                          </h2>
                          <div class="contentBx">
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.inventory.p1")}
                            </h5>
                            <p>{t("landing.legal_mention.inventory.p2")}</p>
                            <p>{t("landing.legal_mention.inventory.p3")} </p>
                            <p>{t("landing.legal_mention.inventory.p4")} </p>

                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              {t("landing.legal_mention.inventory.p5")}{" "}
                            </h5>
                            <p>{t("landing.legal_mention.inventory.p6")}</p>
                            <p>{t("landing.legal_mention.inventory.p7")} </p>
                            <p>{t("landing.legal_mention.inventory.p8")}</p>
                          </div>
                        </div>
                      </div>
                    );
                  case "community":
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="Community-tab-pane"
                        role="tabpanel"
                        aria-labelledby="Community-tab"
                        tabindex="6"
                      >
                        <div class="col-xl-12 col-lg-12 col-md-12">
                          <h2 class="subHeading text-uppercase text-white">
                            {t("landing.legal_mention.community.community")}{" "}
                          </h2>
                          <div class="contentBx">
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.community.p1")}
                            </h5>
                            <p>{t("landing.legal_mention.community.p2")} </p>
                            <p>{t("landing.legal_mention.community.p3")} </p>

                            <h5 class="py-2 mb-2 mb-lg-3">
                              {t("landing.legal_mention.community.p4")}{" "}
                            </h5>
                            <ul className="checkList mb-3">
                              <li>{t("landing.legal_mention.community.p5")}</li>
                              <li>
                                {t("landing.legal_mention.community.p6")}{" "}
                              </li>
                              <li>
                                {t("landing.legal_mention.community.p7")}{" "}
                              </li>
                              <li>
                                {t("landing.legal_mention.community.p8")}{" "}
                              </li>
                              <li>
                                {t("landing.legal_mention.community.p9")}{" "}
                              </li>
                              <li>
                                {t("landing.legal_mention.community.p10")}{" "}
                              </li>
                              <li>
                                {t("landing.legal_mention.community.p11")}{" "}
                              </li>
                              <li>
                                {t("landing.legal_mention.community.p12")}{" "}
                              </li>
                              <li>
                                {t("landing.legal_mention.community.p13")}{" "}
                              </li>
                              <li>
                                {t("landing.legal_mention.community.p14")}{" "}
                              </li>
                              <li>
                                {t("landing.legal_mention.community.p15")}{" "}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  case "debit":
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="DebitCredit-tab-pane"
                        role="tabpanel"
                        aria-labelledby="DebitCredit-tab"
                        tabindex="7"
                      >
                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <h2 className="subHeading text-uppercase text-white">
                            {t("landing.legal_mention.debit.p1")}
                          </h2>
                          <div class="col-auto mt-5 addProductBox widthFit">
                            <div class="card h-100 py-5">
                              <Link class="card-body" to="/DebitAgreement">
                                <span class="addBtn downLoadIcon">
                                  <i>
                                    <img src={downArrow} />
                                  </i>
                                  {t("landing.legal_mention.debit.p2")}
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  case "newsletter":
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="NewsletterSubscription-tab-pane"
                        role="tabpanel"
                        aria-labelledby="NewsletterSubscription-tab"
                        tabindex="8"
                      >
                        <div className="col-xl-12 col-lg-12 col-md-12">
                          <h2 className="subHeading text-uppercase text-white">
                            {t(
                              "landing.legal_mention.newsletter.newsletter_sub"
                            )}
                          </h2>
                          <div className="contentBx">
                            <div className="formBox  rounded-3  col-12 col-lg-12 mb-3 mt-4">
                              <h4 class="formHeading">
                                {t("landing.legal_mention.newsletter.p1")}{" "}
                              </h4>
                              {loading ? (
                                <div className="d-flex justify-content-center">
                                  <Oval
                                    color="purple"
                                    secondaryColor="purple"
                                  />
                                </div>
                              ) : (
                                <form>
                                  <div className="mb-4 col-lg-7">
                                    <label
                                      className="form-label "
                                      for="emailSuscribe"
                                    >
                                      {t("landing.legal_mention.newsletter.p2")}{" "}
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      value={email}
                                      onChange={(e) => handleEmail(e)}
                                      placeholder={t(
                                        "landing.legal_mention.newsletter.placeholder"
                                      )}
                                      id="emailSuscribe"
                                    />
                                    {emailError !== "" ? (
                                      <p className="error-label">
                                        {emailError}
                                      </p>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="mb-4">
                                    <label className="form-label ">
                                      {t("landing.legal_mention.newsletter.p3")}{" "}
                                    </label>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={legalAge}
                                        id="AgeValidation"
                                        onChange={(e) => handleLegalAge(e)}
                                      />
                                      <label
                                        className="form-check-label"
                                        for="AgeValidation"
                                      >
                                        {t(
                                          "landing.legal_mention.newsletter.p4"
                                        )}
                                      </label>
                                    </div>
                                    {legalAgeError !== "" ? (
                                      <p className="error-label">
                                        {legalAgeError}
                                      </p>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="mb-4">
                                    <label className="form-label ">
                                      {t("landing.legal_mention.newsletter.p5")}
                                    </label>
                                    <p>
                                      {t("landing.legal_mention.newsletter.p6")}
                                    </p>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={permission}
                                        onChange={(e) => handlePermission(e)}
                                        id="AgreePoint"
                                      />
                                      <label
                                        className="form-check-label"
                                        for="AgreePoint"
                                      >
                                        {t(
                                          "landing.legal_mention.newsletter.p7"
                                        )}{" "}
                                      </label>
                                    </div>
                                    {permissionError !== "" ? (
                                      <p className="error-label">
                                        {permissionError}
                                      </p>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="col-lg-3 col-xs-12 pt-4 btnBox">
                                    <button
                                      onClick={(e) => handleSubmit(e)}
                                      class="btn btn-purpal btn-lg rounded-3 w-100"
                                      type="button"
                                    >
                                      {t("landing.legal_mention.newsletter.p8")}
                                    </button>
                                  </div>
                                </form>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <div
                        class="tab-pane fade show active"
                        id="TermCondition-tab-pane"
                        role="tabpanel"
                        aria-labelledby="TermCondition-tab"
                        tabindex="0"
                      >
                        <div class="col-xl-12 col-lg-12 col-md-12">
                          <h2 class="subHeading text-uppercase text-white">
                            Terms Conditions
                          </h2>
                          <div class="contentBx">
                            <p>
                              <strong>
                                The terms and conditions (“Terms”) govern your
                                access and use of the Buvonslocalpro.ca website
                                and Buvons Local PRO mobile application (App)
                                (collectively the “Sites”), and the services
                                provided within the Sites.
                              </strong>
                            </p>
                            <p>
                              All services offered in this platform are
                              controlled and provided by{" "}
                              <strong> 9482-1451 QC Inc.</strong> with
                              headquarters at 102-1405 rue Graham-Bell,
                              Boucherville, Qc. H4B 6A1, Canada. Doing business
                              and operating as Buvons Local PRO. Buvons Local
                              PRO is an{" "}
                              <strong>
                                <i>Enterprise Resource Planning (E.R.P.)</i>
                              </strong>{" "}
                              providing but is not limited to, the following
                              services:
                            </p>
                            <ul className="checkList mb-3">
                              <li>
                                Digital services that assist Retailers to place
                                purchase order to Suppliers, mange payments and
                                manage purchase orders from customers.{" "}
                              </li>
                              <li>
                                Digital services that assist Suppliers to mange
                                purchase orders, distribution, promotion, sales,
                                and payment collecting.{" "}
                              </li>
                              <li>
                                Digital services that assist Customers (Public)
                                to place orders for pick up or delivery with all
                                participant Retailers.{" "}
                              </li>
                              <li>
                                Digital services that assist Distributors to
                                manage all deliveries and inventory from
                                Suppliers, create and manage delivery routes and
                                manage reports.
                              </li>
                              <li>
                                Digital services that support the promotion and
                                sales of online services offered by Buvons Local
                                PRO or any of the parties affiliated in full or
                                partially to Buvons Local PRO.{" "}
                              </li>
                            </ul>
                            <p>
                              All services offered by Buvons Local PRO in this
                              platform are governed by these Terms of Services.{" "}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3 mt-4">ALL USERS </h5>
                            <p>
                              To use the Application and the services that are
                              offered by Buvons Local PRO, through the
                              Application (the “Services”),{" "}
                              <strong className="text-underline">
                                You must be of the legal age to consume
                                alcoholic drinks in the Province of Quebec{" "}
                              </strong>{" "}
                              and you must comply with certain terms, conditions
                              and rules that are explained in these Terms of
                              Use.
                            </p>
                            <p>
                              As a user (referred as “You” or “The user”), you
                              accept these Terms of Use by using our websites or
                              App or any of the Services provided by Buvons
                              Local PRO. These Terms and Conditions constitutes
                              a contract between You and Buvons Local PRO. IF
                              you do not wish to be bound by any of these Terms
                              of Use, you must stop using the Websites or App
                              immediately.{" "}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">USER ACCOUNT </h5>
                            <p>
                              Supplier, Retailers and Distributors are obliged
                              to create a user account to use any of the
                              Services provided by Buvons Local PRO.{" "}
                            </p>
                            <p>
                              Consumers (public), exploring products or placing
                              orders for pick-up or delivery are in no need of
                              creating an account; however, Consumer is obliged
                              to provide personal information such as e-mail,
                              ID, Credit Card, phone number, address, Date of
                              birth and any other personal information that
                              Buvons Local PRO considers necessary to verify
                              Consumer’s identity.{" "}
                            </p>
                            <p>
                              Users are solely responsible for the use of their
                              account and any action taken from their account.
                              Accounts should not be shared with any other
                              person. Users should always keep their password
                              and access confidential. Buvons Local PRO, do not
                              take any liability for any wrong use of User’s
                              account.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              PROPER USE OF THE SITES{" "}
                            </h5>
                            <p>
                              Buvons Local PRO Websites or App allow you to buy
                              products offered by brewers and retailers;
                              eventually we can offer you additional content
                              such as news or promotions from a new product or
                              the industry we are working on.{" "}
                            </p>
                            <p>
                              By using Buvons Local PRO Websites or App you are
                              authorized to make personal use of the Services
                              online and the App can be accessed through any
                              digital device on iOS or Android operation system.
                            </p>
                            <p>
                              Buvons Local PRO reserves the right to interrupt,
                              modify or cancel your access partially or fully
                              for any reason, including but not limited to,
                              non-compliance with the Terms of Use, Any
                              suspected fraudulent, abusive, or illegal
                              activity, lack of payment or lack of positive
                              performance.{" "}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              LEGAL DRINKING AGE NOTICE{" "}
                            </h5>
                            <p>
                              The Sites and the services provided therein should
                              not be accessed or viewed by you{" "}
                              <strong>
                                if you are not of legal drinking age
                              </strong>{" "}
                              in your country, province, or state (18 and over
                              in the Province of Quebec, Canada) for the
                              consumption of alcoholic beverages or if you are
                              in a country, province or state where the
                              consumption of alcoholic beverages or the content
                              of the Sites are not permitted.{" "}
                            </p>
                            <p>
                              By accessing, browsing, and using the Sites you
                              are agreeing to these Terms.  In addition, by
                              providing Date of Birth, USER assumes all
                              liability for age misrepresentation or bad use of
                              any compartment on the Sites. If you do not agree
                              to these Terms & Conditions, exit the Sites, or
                              discontinue the use of the Sites immediately.
                            </p>
                            <p>
                              <strong>9482-1451 QC Inc</strong> o/a Buvons Local
                              PRO may revise these Terms from time to time, so
                              you should review them periodically to ensure
                              proper compliance because they are bonded to you.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              AGREEMENT TO TERMS{" "}
                            </h5>
                            <p>
                              Your use of the Sites may not be available or
                              permitted for disclosure and use in all
                              jurisdictions and shall only constitute an “offer
                              or solicitation” where permitted, and only to the
                              extent permitted, by law. The Sites shall not be
                              used where, and to any extent, such use is
                              prohibited by law. Your use of the Sites from any
                              location is subject to your compliance with all
                              applicable laws and regulations that may be
                              applicable to you. You agree, and confirm, that
                              your use of the Sites is in full compliance with
                              the laws of the jurisdiction(s) to which you are
                              subject, and that you are not prohibited from
                              using the Sites due to any restriction, including
                              any age restriction.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              ENTRY AT YOUR OWN RISK
                            </h5>
                            <p>
                              By entering the Sites and using the services
                              provided, you acknowledge and agree that your use
                              is at your own risk and that the Sites, Buvons
                              Local PRO, its owners, officers, directors,
                              employees, or any of the parties involved in
                              creating, producing, or delivering the Sites and
                              the Services provided, are not liable for any
                              damages whatsoever, including any direct,
                              incidental, consequential, indirect or special
                              damages, or any other losses, costs or expenses of
                              any kind (including legal fees, expert fees, or
                              other disbursements) which may arise, directly or
                              indirectly, regardless of whether or not such
                              liability or damages arise in contract, tort,
                              negligence, equity, statutorily, or otherwise, in
                              any connection with the access to, the use of or
                              browsing of the Sites or in connection with any
                              content, information, data, promotions,
                              activities, associated with the Sites, or in
                              connection with your downloading of any materials,
                              text, data, images, video or audio from the Sites,
                              including but not limited to anything caused by
                              any transmission defects, viruses, bugs, human
                              action or inaction of any computer system, phone
                              line, hardware, software or program malfunctions,
                              or any other errors, failures or delays in
                              computer transmissions or network connections.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              NO WARRANTY ON CONTENTS, INFORMATION AND MATERIALS
                            </h5>
                            <p>
                              Although the specifications, features,
                              illustrations, equipment, and other information
                              contained in the Sites are based upon reasonably
                              current information, and while Buvons Local PRO
                              make reasonable efforts to ensure that the
                              material on the Sites is correct, accuracy cannot
                              be guaranteed, and Buvons Local PRO make no
                              warranties or representations as to its accuracy.
                            </p>
                            <p>
                              Buvons Local PRO rely upon others to provide the
                              information that is included in the Sites without
                              any direct or independent authentication,
                              verification, assessment, and validation by
                              whatsoever. All users of the Sites shall be solely
                              and exclusively responsible to authenticate,
                              verify, assess, and validate all information that
                              is included on the Sites. The information included
                              in the Sites does not constitute, and shall not be
                              considered, the advice, recommendation, or
                              endorsement of Buvons Local PRO.
                            </p>
                            <p>
                              <strong>
                                UNLESS OTHERWISE AGREED TO IN WRITING BY BUVONS
                                LOCAL PRO, THE INFORMATION,  CONTENTS OF THE
                                SITES IS PROVIDED ON AN “AS IS” BASIS ONLY, AND
                                IS FOR CONSUMER PRIVATE AND COMMERCIAL
                                DIRECT-END USE ONLY, AND ALL EXPRESS OR IMPLIED
                                CONDITIONS, REPRESENTATIONS AND WARRANTIES,
                                INCLUDING ANY IMPLIED WARRANTY OR
                                MERCHANTABILITY, FITNESS FOR A PARTICULAR
                                PURPOSE, ACCURACY, COMPLETENESS, AUTHENTICITY,
                                VALIDITY OR NON-INFRINGEMENT, ARE COMPLETELY
                                DENIED AND DISCLAIMED, EXCEPT TO THE EXTENT THAT
                                SUCH DISCLAIMERS ARE HELD TO BE LEGALLY INVALID
                                BY A COURT OF COMPETENT JURISDICTION. EXCEPT AS
                                OTHERWISE EXPRESSLY AGREED, BUVONS LOCAL PRO, NO
                                REPRESENTATIONS, WARRANTIES, COVENANTS OR
                                GUARANTEES AS TO THE QUALITY, AUTHENTICITY,
                                VALIDITY, SUITABILITY, TRUTH, ACCURACY OR
                                COMPLETENESS OF ANY OF THE INFORMATION AND
                                CONTENTS OF THE SITES.
                              </strong>
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              COPYRIGHT OWNED BY BUVONS LOCAL PRO
                            </h5>
                            <p>
                              Buvons Local PRO is the owner of copyright of the
                              Sites and other intellectual property related to
                              the Sites. No portion of the Sites, including but
                              not limited to the content, information, text,
                              images, audio or video, may be used in any manner,
                              or for any purpose, without Buvons Local PRO prior
                              written permission, except if indicated herein.
                              Without in any way waiving any of the foregoing
                              rights, you may download one copy of the material
                              on the Sites for your personal, non-commercial
                              home use only, provided you do not delete,
                              obstruct, or change any copyright, trademark or
                              other proprietary notices. Modification,
                              repostment or use of the material on the Sites in
                              any other manner whatsoever and for any other
                              purpose violates Buvons Local PRO legal rights.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              WEBSITES & APP | CONTENT
                            </h5>
                            <p>
                              All content provided in any manner, uploaded,
                              exported our simply found inside Websites & App
                              are property of Buvons Local PRO. While we assume
                              the User is using all images or content of their
                              products are under licence and cover all required
                              regulations, Buvons Local PRO does not guarantee
                              that such content does not infringe any
                              intellectual property rights of others.{" "}
                            </p>
                            <p>
                              It is forbidden to modify, distribute, copy,
                              share, display, reproduce, sell any element of
                              visual materials, any partial Service provided by
                              the Websites or App to a third party. User should
                              not license or sub-licence the Services offered by
                              Buvons Local PRO Websites or App.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              INTERNET RISK POSSIBLE
                            </h5>
                            <p>
                              The Internet is not a secure medium, and neither
                              the privacy of your communications, nor visits to
                              the Sites, can be guaranteed. The nature of
                              Internet communications means that your
                              communications may be susceptible to data
                              corruption, unauthorized access, interception, and
                              delays. The Sites may include incomplete
                              information, inaccuracies, or typographical
                              errors. Buvons Local PRO and any other persons
                              involved in the management of the Sites, may make
                              changes in the information and content included in
                              the Sites at any time without notice. Buvons Local
                              PRO shall not be responsible for any detrimental
                              reliance you may place on the Sites or its
                              contents. Except as otherwise provided herein, by
                              entering the Sites you acknowledge and agree that
                              any communication or material you transmit to the
                              Sites, in any manner and for any reason, will not
                              be treated as confidential or proprietary.
                              Furthermore, you acknowledge and agree that any
                              communications, information, ideas, concepts,
                              techniques, procedures, methods, systems, designs,
                              plans, charts, or other materials you transmit to
                              the Sites may be used by Buvons Local PRO
                              anywhere, anytime and for any reason whatsoever.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              UNLAWFUL BEHAVIOUR
                            </h5>
                            <p>
                              Do not use the Sites to communicate to others, to
                              post on the Sites, or otherwise transmit to the
                              Sites, any materials, information, or
                              communication that either causes any harm to any
                              person or that is illegal or otherwise unlawful,
                              including without limitation any hateful
                              harassing, pornographic, obscene, profane,
                              defamatory, libelous, threatening materials which
                              constitutes or may encourage conduct that would be
                              considered a criminal offense, give rise to civil
                              liability, promote the excessive, irresponsible or
                              underage consumption of alcohol, or otherwise
                              violate any law or regulation. Buvons Local PRO
                              and all parties involved in creating, producing,
                              or delivering the Sites and its services, assume
                              no responsibility or liability which may arise
                              from the content thereof, including but not
                              limited to claims for any of the above noted
                              matters.
                            </p>
                            <p>
                              If the Sites contain bulletin boards, chat rooms,
                              or other message or communications facilities,
                              e-mail, (collectively, “Channels”), you agree to
                              use the Channels only to send and receive messages
                              and material that shall not, in any manner or to
                              any extent, do any of the following:
                            </p>
                            <ul className="checkList mb-3">
                              <li>
                                commit any criminal or quasi-criminal offence,
                                including without limitation, any pornography,
                                hate, assault, or economic crime whatsoever.
                              </li>
                              <li>
                                defame, abuse, harass, stalk, threaten or
                                otherwise violate the legal rights (such as
                                rights of privacy and publicity) of others.
                              </li>
                              <li>
                                publish, post, distribute or disseminate any
                                defamatory, infringing, obscene, indecent or
                                unlawful material or information.
                              </li>
                              <li>
                                infringe, contravene, breach or otherwise
                                interfere with or harm the rights of any other
                                person, including without limitation, any
                                contractual, personality, confidentiality,
                                privacy, moral, statutory, common law or
                                intellectual property.
                              </li>
                              <li>
                                upload files that contain viruses, corrupted
                                files, or any other similar software or programs
                                that may damage the operation of another’s
                                computer.
                              </li>
                              <li>
                                delete any author attributions, trademarks,
                                trade names, logos, legal notices or proprietary
                                designations or labels in any file that is
                                uploaded.
                              </li>
                              <li>
                                falsify the origin or source of software,
                                information or other material contained in a
                                file that is uploaded.
                              </li>
                              <li>
                                advertise or offer to sell any goods or
                                services, or conduct or forward any surveys,
                                contests, or chain letters and
                              </li>
                              <li>
                                download any file posted by another user of a
                                Forum that you know, or reasonably should know,
                                cannot be legally distributed in such manner.
                              </li>
                            </ul>
                            <p>
                              You acknowledge and agree that all Channels are
                              public and not private communications. Further,
                              you acknowledge that chats, postings, conferences,
                              and other communications by other users are not
                              monitored, screened, sanctioned or endorsed by
                              Buvons Local PRO but rather provided and approved
                              by all Retailers, Distributers, Users and
                              Suppliers using the platform, and such
                              communications shall not be considered reviewed,
                              screened, or approved by Buvons Local PRO but
                              rather all Retailers, Distributers, Users and
                              Suppliers using the platform. Buvons Local PRO,
                              reserves the right for any reason to remove at any
                              time without notice any contents of the platform,
                              social media or any other form of communication
                              received from users, including without limitation
                              bulletin board postings. Buvons Local PRO,
                              reserves the right to deny, in its sole and
                              absolute discretion, any user access to this Sites
                              or any portion, including Forums, thereof without
                              notice.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">HYPERLINKS</h5>
                            <p>
                              Although the Sites may be linked to other
                              websites, Buvons Local PRO are not, directly or
                              indirectly, implying any approval, association,
                              sponsorship, endorsement or affiliation with the
                              linked website, unless specifically stated
                              therein. By entering the Sites you acknowledge and
                              agree that Buvons Local PRO have not reviewed all
                              websites linked to the Sites and is not
                              responsible for the content of any off-website
                              pages or any other website linked to the Sites.
                              Linking to any other off-website pages or other
                              websites is at your own discretion and risk. We
                              encourage you to read the terms and conditions of
                              any website you visit.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              TERMS & CONDITIONS | REVIEW
                            </h5>
                            <p>
                              Buvons Local PRO reserve the right to revise these
                              Terms concerning your future use of the Sites and
                              the services provided through the Sites at any
                              time and for any reason, without notice or
                              obligation, to you.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">PERSONAL DATA</h5>
                            <p>
                              Buvons Local PRO collects personal data through
                              the Websites or App. When using either the Website
                              or App you are consenting the collection,
                              disclosure or processing of your personal data in
                              accordance to our{" "}
                              <a
                                onClick={() =>
                                  currentTab === "terms"
                                    ? setCurrentTab("privacy")
                                    : navigate("/privacy-policy")
                                }
                                className="text-underline text-purpal"
                              >
                                Privacy Policy
                              </a>
                              . By continuing using our Websites or App you are
                              in acceptance of these Terms of USE.
                            </p>
                            <p>
                              The process and use of your personal data is
                              subject to your consent. At any time you can
                              request an cancellation and removal of your
                              personal data by sending an email to: support @
                              buvonslocalpro.ca with the subject: Service
                              Cancellation Request and Personal Data removal.{" "}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">APPLICABLE LAW</h5>
                            <p>
                              By entering the Sites you acknowledge and agree
                              that the Sites, including contests and any goods
                              and services offered on the Sites, and these
                              contractual Terms, shall be construed and
                              evaluated according to the laws of the Province of
                              Quebec, Canada. You hereby agree and confirm that
                              your use of the Sites and all of the
                              communications, transmissions and transactions
                              associated with the Sites shall have occurred in
                              the Province of Quebec, Canada and that you submit
                              to the exclusive jurisdiction of the courts of the
                              Province of Quebec, as the proper and most
                              convenient forum concerning the Sites. If you use
                              the Sites from another jurisdiction, you are
                              responsible for compliance with any and all
                              applicable local laws.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">LANGUAGE</h5>
                            <p>
                              Buvons Local PRO is proudly a bilingual company.
                              We embrace the use of both English & French.
                              Content of the Sites and all transactions
                              occurring in connection with the Sites, and the
                              parties waive any right to use and rely upon any
                              other language, or translations. All content on
                              the Sites will be provided in French and English.{" "}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              BUVONS LOCAL PRO | ACCESS CONTROL
                            </h5>
                            <p>
                              We shall have the right, at all times, to prevent,
                              intercept, prohibit or otherwise restrict, your
                              access to and/or use of the Sites, including
                              Social Media or any form of communication, if
                              Buvons Local PRO determine, in their sole and
                              absolute discretion, that you have not (or Buvons
                              Local PRO have a reasonable basis to believe or
                              expect that you may not) fully complied with all
                              of the provisions set out in this contract.
                            </p>
                            <p>
                              <strong>
                                <a
                                  href="#"
                                  className="text-underline text-purpal"
                                >
                                  CAUTION: ANY ATTEMPT BY AN INDIVIDUAL TO
                                  DELIBERATELY DAMAGE ANY SITES, OR UNDERMINE
                                  THE LEGITIMATE OPERATION OF A FUNCTIONALITY IS
                                  A VIOLATION OF CRIMINAL AND CIVIL LAWS AND
                                  SHOULD SUCH AN ATTEMPT BE MADE, SITES
                                  PROVIDERS RESERVE THE RIGHT TO SEEK DAMAGES
                                  FROM ANY SUCH PERSON TO THE FULLEST EXTENT
                                  PERMITTED BY LAW.
                                </a>
                              </strong>
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              LIABILITY | EXCLUSIONS AND LIMITATIONS{" "}
                            </h5>
                            <p>
                              Buvons Local PRO shall not be responsible for any
                              incorrect or inaccurate information, whether
                              caused by website users or by any of the equipment
                              or programming associated with or utilized in the
                              Sites or by any technical or human error which may
                              occur in the processing of submissions in the
                              Sites. Buvons Local PRO, its owners, director,
                              employees and agents assume no responsibility for
                              any error, omission, interruption, deletion,
                              defect, delay in operation or transmission,
                              communications line failure, theft or destruction
                              or authorized access to, or alteration of, entries
                              provided by Suppliers, Retailers, Users or/and its
                              partners.
                            </p>
                            <p>
                              Unless otherwise provided for in these Terms,
                              Buvons Local PRO shall not be responsible for any
                              problems or technical malfunction of any telephone
                              network or lines, computer online systems, servers
                              or providers, computer equipment, software,
                              failure of email or members on account of
                              technical problems or traffic congestion on the
                              Internet or at any website or combination thereof,
                              including injury or damage to members or to any
                              other person’s computer related to or resulting
                              from using services or downloading materials in
                              the Sites. If, for any reason, the Sites are not
                              capable of running as planned, including infection
                              by computer virus, bugs, tampering, unauthorized
                              intervention, fraud, technical failures, or any
                              other causes beyond the control of Buvons Local
                              PRO and its agents   which corrupt or affect the
                              administration, security, fairness, integrity or
                              proper conduct of the Sites and the services
                              offered through the Sites,   Buvons Local PRO
                              reserve the right to cancel, terminate, modify or
                              suspend the services or Sites indefinitely.
                            </p>
                            <p>
                              You agree to indemnify and hold harmless Buvons
                              Local PRO, its owners, employees and agents, and
                              their respective parents, subsidiaries, affiliate,
                              directors, sponsors, officers, consultants,
                              agents, and employees against and from all claims,
                              damages, liabilities, costs and expenses asserted
                              by third parties alleging that the Sites includes
                              obscenity, libel, slander, or infringes upon the
                              third party’s intellectual property or privacy
                              rights, as direct result of your actions in the
                              use of the Sites. You further agree to not
                              knowingly, damage or cause interruption of the
                              services on the Sites; prevent others from using
                              the Sites; or obtain or modify another user’s
                              non-public account information without their
                              consent.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              INSTALLATION OF BUVONS LOCAL PRO APP{" "}
                            </h5>
                            <p>
                              Buvons Local PRO App is available on both iOS and
                              Android. Features of Buvons Local PRO App include:
                              using an interactive map to find Stores selling
                              beer near your location, finding Retailers for
                              delivery, viewing store hours, directions
                              confirming deliveries, browsing affiliated brands,
                              descriptions and prices, and redirection to their
                              Sites.
                            </p>
                            <p>
                              By downloading or installing Buvons Local PRO App,
                              published by Buvons Local PRO, you consent to the
                              installation of Buvons Local PRO App, further
                              described above and to its future updates and
                              upgrades. You can withdraw your consent at any
                              time by uninstalling the App. To request removal
                              or disabling of this App, please contact Buvons
                              Local PRO at 102-1405 rue Graham-Bell,
                              Boucherville, Qc. H4B 6A1, Tel:{" "}
                              <a
                                className="text-purpal"
                                href="tel:+1 4506414848"
                              >
                                +1 (450) 641-4848
                              </a>{" "}
                              or by email at{" "}
                              <a
                                className="text-purpal"
                                href="mailto:support@Buvonslocalpro.ca."
                              >
                                support @ Buvonslocalpro .ca.
                              </a>
                            </p>
                            <p>
                              YOU ACKNOWLEDGE AND UNDERSTAND AND AGREE that
                              Buvons Local PRO App (including any updates or
                              upgrades) may{" "}
                            </p>
                            <ul className="checkList py-2 mb-3">
                              <li>
                                cause your device to automatically communicate
                                with Buvons Local PRO’s servers to deliver the
                                functionality described above and to record
                                usage metrics,{" "}
                              </li>
                              <li>
                                affect app-related preferences or data stored in
                                your device, and{" "}
                              </li>
                              <li>
                                collect personal information as set out in our
                                Privacy Policy.
                              </li>
                            </ul>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              ADDITIONAL TERMS | ONLINE ORDERING VIA
                              BUVONSLOCALPRO.CA AND/OR BUVONS LOCAL PRO APP{" "}
                            </h5>
                            <p>
                              Buvons Local PRO offers a service via
                              Buvonslocalpro.ca/ Buvons Local PRO App that
                              allows users to reserve products for pick up or
                              delivery, by themselves or by a licenced liquor
                              delivery service on their behalf as agent, in
                              participating Distribution Bucké retail outlets.
                              Users may access The Sites by visiting:
                              Buvonslocalpro.ca or from Buvons Local PRO App
                              available on both iOS and Android. Users of the
                              Sites may browse from a selection of products,
                              choose products to reserve, and then pickup and
                              pay for those products at a participating retail
                              outlet.
                            </p>
                            <p>
                              The Sites, through a Payment Processor (STRIPE OR
                              CUBE OR ANY OTHER USED FOR THE PLATFORM) collects
                              and authorizes your credit card information making
                              checkout by you at Buvons Local PRO quick and
                              easy. ALTHOUGH USERS OF THE SITES MAY RESERVE
                              PRODUCT THROUGH THE SITES, THE PURCHASE OF ANY
                              PRODUCT WILL BE CONDUCTED AND COMPLETED SOLELY
                              WITHIN A PARTICIPATING RETAIL LOCATION OF BUVONS
                              LOCAL PRO.
                            </p>
                            <p>
                              In the case of an order picked up for delivery by
                              a licenced liquor delivery service (“ LDS ”), the
                              LDS will purchase the reserved product as your
                              agent and will seek reimbursement directly from
                              the party that placed the order.
                            </p>
                            <p>
                              The following additional terms apply to your use
                              of The Sites.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">ACCOUNT CREATION </h5>
                            <p>
                              In order to use online ordering via The Sites:{" "}
                            </p>
                            <p>
                              INDIVIDUAL USER can place orders for pick-up or
                              delivery as a guest <strong>(“Guest ”)</strong>.{" "}
                            </p>
                            <p>
                              RETAILERS can create an account directly in the
                              platform{" "}
                              <strong>(“Account” or “Accounts”)</strong>.
                              Accounts will save your preferences and allow you
                              to place future orders more quickly. All Retailer
                              will need to request for service approval from
                              each Supplier in order to place orders.
                            </p>
                            <p>
                              SUPPLIERS need to request account activation
                              through Buvons Local PRO management, who reserves
                              the right of refusal.{" "}
                            </p>
                            <p>
                              DISTRIBUTORS need to request account activation
                              through Buvons Local PRO management,t who reserves
                              the right of refusal.
                            </p>
                            <p>
                              ALL USERS should never use another’s account
                              without permission. When creating your Account,
                              you must provide accurate and complete
                              information. You are solely responsible for the
                              activity that occurs on your Account, and you must
                              keep your Account password secure.  Although
                              Buvons Local PRO will not be liable for your
                              losses caused by any unauthorized use of your
                              Account, you may be liable for the losses of
                              Buvons Local PRO or others due to such
                              unauthorized use.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">PRICING</h5>
                            <p>
                              Buvons Local PRO strive to provide accurate
                              information about its products, services as well
                              as all product and services offered by related
                              pertinent users which includes any related
                              pricing, but errors may occur. Buvons Local PRO
                              reserves the right to correct any errors in
                              relation to its availability of products, services
                              or regarding pricing and to modify at any time,
                              without prior notice. Buvons Local PRO cannot
                              confirm prices until after you reserve a product
                              and receive your reservation confirmation by email
                              (when and if applicable). Prices quoted are
                              payable in Canadian dollars.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              PAYMENT METHODS AND BILLING{" "}
                            </h5>
                            <p>
                              In order to use the Sites’ purchasing orders,
                              pick-up or delivery service, you might require a
                              valid credit card, authorize a debit application
                              or have an commercial private agreement. The
                              cardholder and the Guest or Account holder, must
                              be one and the same person. In order to make a
                              reservation through The Sites, your credit card
                              information will be collected by our third party
                              payment processor (“ 
                              <strong> Payment Processor</strong> ”); however,
                              the Payment Processor will only complete the sale
                              and process your credit card once you pick up your
                              reserved product at the specific retail location
                              on pick-up day. Your credit card will be charged
                              the advertised price in your reservation
                              confirmation and receipt. The terms of sale for
                              your reserved product are those applicable to all
                              in-store purchases as may be supplemented by these
                              Terms and any terms on the confirmation of your
                              reservation and receipt.  
                            </p>
                            <p>
                              For delivery service, payment will be processed by
                              a licensed store with liquor delivery service (the
                              “<strong>LDS</strong> ”).   Buvons Local PRO
                              cannot, under current regulations, accept payment
                              from the Guest or Account holder for product (or
                              delivery service fees) to be delivered to home
                              consumers, the LDS must purchase the product on
                              your behalf.  The LDS receiving the order will be
                              paid by the Guest or Account Holder once the LDS
                              delivers the product to you.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              PICK-UP BY CONSUMERS USING BUVONSLOCALPRO.CA /
                              BUVONS LOCAL PRO APP{" "}
                            </h5>
                            <p>
                              Buvons Local PRO will send the consumer an email
                              to confirm a reservation is ready for pickup. All
                              reserved product (s) must be picked up prior to
                              the close of business on the pick-up day. Reserved
                              product that is not picked-up by close of business
                              of the pick-up day will be canceled.
                            </p>
                            <p>
                              The consumer or Account holder must be the
                              individual to pick-up his or her reservation. The
                              consumer or Account holder must not be intoxicated
                              at time of pick-up (determined at the sole
                              discretion of RETAILER’s staff at the applicable
                              participating Retailer’s location). Consumer or
                              Account holder must present a valid, piece of
                              government issued photo identification. The
                              following are items are accepted at participant
                              Stores as forms of identification: Passport,
                              Driver’s License with photo, Military Issue I.D.
                              with date of birth and photo, Government Issue
                              I.D. with date of birth and photo and Health Card
                              with photo. You will be refused service and your
                              reservation will be cancelled without any
                              liability to Buvons Local PRO if you are NOT OF
                              LEGAL DRINKING AGE OR IF APPEAR INTOXICATED.{" "}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              SOCIAL RESPONSIBILITY
                            </h5>
                            <p>
                              Through our “<strong>We ID 18</strong>” program,
                              Buvons Local PRO require that our staff and
                              licenced liquor delivery services ask for ID from
                              anyone who appears to be under legal drinking age.
                              But it’s not just minors that we are watching out
                              for – Retailers will refuse services to those who
                              appear to be intoxicated.{" "}
                            </p>
                            <p>
                              Buvons Local PRO is proud to partner and promote
                              DRIVE SOBER PROGRAMS SUCH AS{" "}
                              <a
                                href="https://www.operationnezrouge.com/"
                                target="_blank"
                                className="text-underline text-purpal"
                              >
                                https://www.operationnezrouge.com/
                              </a>{" "}
                               which encourages drivers to plan ahead, drink
                              responsibly, use designated drivers, take cabs or
                              stay overnight.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              DELIVERY SERVICE | CONSUMER TERMS OF RESERVATION{" "}
                            </h5>
                            <p>
                              <strong>
                                Buvons Local PRO does not itself deliver
                                products to home consumers and does not charge
                                any fees for reservation services rendered to
                                the customer.
                              </strong>
                                By completing a reservation through The Sites,
                              the consumer authorizes Buvons Local PRO to
                              forward the reservation, using our platform or
                              through a third-party technology service provider,
                              to a duly licenced liquor delivery service
                              (“LDS”).{" "}
                            </p>
                            <p>
                              The assigned LDS will contact the consumer to
                              confirm its appointment as the agent of the
                              consumer to purchase and deliver the reserved
                              products on its behalf and the assigned LDS must
                              be the individual who picks-up reserved products.
                              The LDS must not be intoxicated at time of pick-up
                              (determined at the sole discretion of Retailer’s
                              staff) and must provide identification matching
                              the LDS assigned to the reservation and receiving
                              the order from the customer.
                            </p>
                            <p>
                              The LDS, acting as the agent of the consumer, will
                              purchase the reserved product from Buvons Local
                              PRO SUPPLIERS and charge the consumer for the cost
                              of the product as well as a delivery service fee
                              in compliance with applicable regulations.  Buvons
                              Local PRO cannot, under current regulations,
                              accept payment from the consumer for product (or
                              delivery service fees) to be delivered to home
                              consumers, the LDS must purchase the product on
                              your behalf.  The LDS receiving the order will be
                              paid by the consumer once the LDS delivers the
                              product to you.
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              DELIVERY SERVICE | SUPPLIER TERMS OF RESERVATION{" "}
                            </h5>
                            <p>
                              <strong>
                                Buvons Local PRO does not itself deliver
                                products to retailers and does not charge any
                                fees for reservation services rendered to the
                                retailer.
                              </strong>
                                By completing a purchase order through The
                              Sites, the Retailer authorizes Buvons Local PRO to
                              forward the purchase order, using our platform or
                              through a third-party technology service provider,
                              to a duly licenced Supplier.{" "}
                            </p>
                            <p>
                              ONLY AFTER CONFIRMATION AND APPROVAL FROM
                              SUPPLIER, Distributor will execute the order and
                              after delivery is completed, Buvons Local PRO will
                              request Retailer for payment on behalf of Supplier
                              (when and if applicable).{" "}
                            </p>
                            <p>
                              Buvons Local PRO,{" "}
                              <em>Distribution Bucké or its affiliates</em>,
                              take NO liability for any product defect, quality
                              or recall that might occur for which liability
                              rest only and exclusively with the respective
                              Supplier.{" "}
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3">
                              {" "}
                              PRIVACY AND SECURITY{" "}
                            </h5>
                            <p>
                              The privacy and security of your personal
                              information is important to Buvons Local PRO.
                              Secure Sockets Layer (“ <strong>SSL</strong> ”)
                              technology is used to protect the security of your
                              credit card information as it is transmitted and
                              processed.  SSL is the industry standard for
                              secure commerce transactions. It prevents your
                              personal information from being read by someone
                              else as it travels across the Internet. All of
                              your personal information is encrypted, including
                              credit card number, name and address.
                              Nevertheless, there are certain risks associated
                              with using the Internet. 
                            </p>
                            <p>
                              To learn more about how Buvons Local PRO manage
                              personal information, please read our 
                              <strong>
                                <a
                                  href="#"
                                  className="text-unverline text-purpal"
                                  onClick={() =>
                                    currentTab === "terms"
                                      ? setCurrentTab("privacy")
                                      : navigate("/privacy-policy")
                                  }
                                >
                                  Privacy Policy
                                </a>
                              </strong>
                               .
                            </p>
                            <h5 class="py-2 mb-2 mb-lg-3"> CONTACT </h5>
                            <p>
                              Buvons Local PRO appreciate your interest in our
                              Sites, products, and services, and for reading
                              these Terms. If you have any questions about these
                              Terms or concerns regarding all services described
                              hereunder, please 
                              <strong>
                                <a
                                  onClick={() => navigate("/contact-us")}
                                  className="text-underline text-purpal"
                                >
                                  contact us 
                                </a>
                              </strong>
                              .
                            </p>
                            <p>
                              Buvons Local PRO reserves the right to amend,
                              change and supplement these Terms of Service by
                              posting modifications and revised versions to the
                              Buvons Local PRO website or App without previous
                              notice. Should you be in any disagreement of any
                              of the above-mentioned Terms and Conditions or
                              eventually you will not accept any added
                              modifications, you must cease using the Services
                              IMMEDIATELY.
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LegalMention;
