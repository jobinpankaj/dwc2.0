import React, { useEffect, useRef, useState } from "react";
import searchIcon from "./assets/images/search.svg";
import userIcon from "./assets/images/user-icon.svg";
import worldIcon from "./assets/images/world-icon.svg";
import "./assets/fonts/stylesheet.css";
import "./assets/scss/main.css";
import Hambrgr from "./assets/images/hamberGar.svg";
import searchImage from "./assets/images/search.svg";
import closeIcon from "./assets/images/close.svg";
import logo from "./assets/images/logo.svg";
import directionIcon from "./assets/images/direction.svg";
import messageIcon from "./assets/images/message.svg";
import phoneIcon from "./assets/images/phone-icon.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import MyForm from "../CommonComponents/ReCaptcha";
import { EmailField } from "react-admin";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Sidebar from "./Components/sidebar";
import Header from "./Components/header";
import { Modal } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import useAuthInterceptor from "../utils/apis";

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const curr_lang = localStorage.getItem("i18nextLng");
  const slider = useRef(null);
  const ref = useRef();
  const ref1 = useRef();
  const header = useRef();
  const childmenu = useRef();
  const navigate = useNavigate();
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const urlRegex = 
    /^(https?:\/\/)?([\w.-]+)(\.[a-z]{2,}){1,5}([/?].*)?$/i;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [info, setInfo] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState("");
const apis = useAuthInterceptor()
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [infoError, setInfoError] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [type, setType] = useState("Supplier");
  const [show, setShow] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const teamList = useRef();
  const location = useLocation();
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

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setPhoneError("");
  };
  const handleInfo = (e) => {
    setInfo(e.target.value);
    setInfoError("");
  };
  const handleWebsite = (e) => {
    setWebsite(e.target.value);
    setWebsiteError("");
  };
  useEffect(() => {
    const value = new URLSearchParams(location.search).get("value");
    console.log(value, "use");
    if (value !== null) {
      setType(value);
    }
  }, [location.search]);

  const onVerified = () => {
    // console.log(type, "bgfgf");
    const bodyData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      type: type,
      website: website,
      message: info,
    };
    apis
      .post("contactUs", bodyData)
      .then((res) => {
        setShow(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setType("Supplier");
        setWebsite("");
        setInfo("");
        setIsVerified(false);
        toast.success(res.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        setIsVerified(false)
        if(err?.response?.data?.data?.website){
          toast.error(err.response.data.data.website[0],  {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }else{
          toast.error("Something went wrong", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  const handleValidation = (e) => {
    e.preventDefault();
// console.log(isVerified,"isVerified2222")
    let firstNameValid = true,
      lastNameValid = true,
      emailValid = true,
      websiteValid = true,
      phoneValid = true,
      infoValid = true;
    if (firstName === "") {
      setFirstNameError(t("landing.contact.first_name_error"));
      firstNameValid = false;
    }
    if (lastName === "") {
      setLastNameError(t("landing.contact.last_name_error"));
      lastNameValid = false;
    }
    if (email === "") {
      setEmailError(t("landing.contact.email_required"));
      emailValid = false;
    } else if (!emailregex.test(email)) {
      setEmailError(t("landing.contact.valid_email"));
      emailValid = false;
    }
   if (!urlRegex.test(website)) {
      setWebsiteError(t("landing.contact.website_required"));
      websiteValid = false;
    }
    if (phone === "") {
      setPhoneError(t("landing.contact.phone_required"));
      phoneValid = false;
    } else if (phone.length < 10) {
      setPhoneError(t("landing.contact.valid_phone"));
      phoneValid = false;
    }
    if (info === "") {
      setInfoError(t("landing.contact.info_error"));
      infoValid = false;
    }
    
    if (
      firstNameValid &&
      lastNameValid &&
      emailValid &&
      phoneValid &&
      websiteValid &&
      infoValid && !isVerified
    ) 
     setShow(true)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isVerified,"isVerified")
    // Form submission logic
    if (isVerified) {
      // Proceed with form submission
      onVerified(); // Notify the parent component
    } else {
      console.log("reCAPTCHA verification failed.");
    }
  };


  const handleRecaptchaChange = (value) => {
    console.log("reCAPTCHA value:", value);
    setRecaptchaValue(value);
    setIsVerified(true); // Update verification status
  };

  const handleLanguageChange = (value) => {
    console.log("language", value);
    i18n.changeLanguage(value);
    localStorage.setItem("i18nextLng", value);
  };

  const handleClose = (e) => {
    childmenu.current.classList.remove("d-block");
    ref1.current.classList.remove("view", "view-child");
  };

  const handleSubSideBar = (e) => {
    e.preventDefault();
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
  const handleGetMap = () => {
    window.location.href =
      "https://www.google.com/maps/place/1405+Rue+Graham-Bell+%23101,+Boucherville,+QC+J4B+6A1,+Canada/@45.563151,-73.431273,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc90319d8ea9e7f:0xb9de8f8de15c01e0!8m2!3d45.563151!4d-73.431273!16s%2Fg%2F11nnkx1t4d?entry=ttu";
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
        {/* <header className="header" ref={header}>
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
                                                <button className="btn btn-secondary dropdown-toggle btnImg" type="button"
                                                    data-bs-toggle="dropdown" 
                                                    aria-expanded="false">
                                                    <img src={worldIcon} alt="worldIcon" loading="lazy" />
                                                    {curr_lang === "en" ? "English" : "French"}
                                                </button>
                                                <ul className="dropdown-menu">
                                                <li><Link className="dropdown-item" onClick={() => handleLanguageChange("en")}>ENG</Link></li>
                                    <li><Link className="dropdown-item" onClick={() => handleLanguageChange("fr")}>FRA</Link></li>
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
        <div
          class="mainBox  topShift bg-dark formPage"
          onClick={() => handleClose()}
        >
          <div class="container-fluid alignPadding h-100">
            <div class="row">
              <div class="col-12 pb-2 pb-xxl-4">
                <h2 class="subHeading">{t("landing.contact.contact")}</h2>
              </div>
              <div class="col-xl-8 col-md-12 order-1 order-xl-0">
                <div class="formBox">
                  <h4 class="formHeading">
                    {t("landing.contact.send_us_message")}
                  </h4>
                  <form>
                    <div class="row">
                      <div class="col-md-6 col-sm-12 mb-3 mb-xl-4 d-flex flex-column">
                        <input
                          type="text"
                          name="fName"
                          id="fName"
                          value={firstName}
                          onChange={(e) => handleFirstName(e)}
                          placeholder={t(
                            "landing.contact.first_name_placeholder"
                          )}
                          class="form-control userIcon order-1"
                        />
                        <label for="fName" class="form-label order-0">
                          {t("landing.contact.first_name")} *
                        </label>
                        {firstNameError !== "" ? (
                          <p className="error-label m-0 p-0 pt-2 order-2">
                            {firstNameError}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div class="col-md-6 col-sm-12 mb-3 mb-xxl-4 d-flex flex-column">
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => handleLastName(e)}
                          name="lName"
                          id="lName"
                          placeholder={t(
                            "landing.contact.last_name_placeholder"
                          )}
                          class="form-control userIcon order-1"
                        />
                        <label for="lName" class="form-label order-0">
                          {t("landing.contact.last_name")}*
                        </label>
                        {lastNameError !== "" ? (
                          <p className="error-label m-0 p-0 pt-2 order-2">
                            {lastNameError}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div class="col-md-6 col-sm-12 mb-3 mb-xxl-4 d-flex flex-column">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => handleEmail(e)}
                          name="Email"
                          id="Email"
                          placeholder={t("landing.contact.email_placeholder")}
                          class="form-control emailIcon order-1"
                        />
                        <label for="Email" class="form-label order-0">
                          {t("landing.contact.email_label")}*
                        </label>
                        {emailError !== "" ? (
                          <p className="error-label m-0 p-0 pt-2  order-2">
                            {emailError}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div class="col-md-6 col-sm-12 mb-3 mb-xxl-4 d-flex flex-column">
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => handlePhone(e)}
                          name="pNumber"
                          id="pNumber"
                          placeholder={t("landing.contact.phone_placeholder")}
                          class="form-control phoneIcon order-1"
                          pattern=""
                        />
                        <label for="pNumber" class="form-label order-0">
                          {t("landing.contact.phone_label")}*
                        </label>
                        {phoneError !== "" ? (
                          <p className="error-label m-0 p-0 pt-2  order-2">
                            {phoneError}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div class="col-md-6 col-sm-12 mb-3 mb-xxl-4 d-flex flex-column">
                        <select
                          name="userSelect"
                          id="userSelect"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          class="form-select  order-1"
                          aria-label="Default select example selectIcon"
                        >
                          <option value="Supplier" selected>
                            {t("landing.contact.supplier_option")}
                          </option>
                          <option value="Retailer">
                            {t("landing.contact.retailer_option")}
                          </option>
                          <option value="Distributor">
                            {t("landing.contact.distributor")}
                          </option>
                          <option value="Consumer">
                            {t("landing.contact.consumer_option")}
                          </option>
                          <option value="Other">
                            {t("landing.contact.other_option")}
                          </option>
                        </select>
                        <label for="userSelect" class="form-label order-0">
                          {t("landing.contact.you_are")}*
                        </label>
                      </div>
                      <div class="col-md-6 col-sm-12 mb-3 mb-xxl-4 d-flex flex-column">
                        <input
                          type="text"
                          name="fName"
                          value={website}
                          onChange={(e) => handleWebsite(e)}
                          id="fName"
                          placeholder={t("landing.contact.website_placeholder")}
                          class="form-control webIcon  order-1"
                        />
                        <label for="userSelect" class="form-label order-0">
                          {t("landing.contact.website_label")}
                        </label>
                        {websiteError !== "" ? (
                          <p className="error-label m-0 p-0 pt-2  order-2">
                            {websiteError}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div class="col-md-12 col-sm-12 mb-3 mb-xxl-4 d-flex flex-column">
                        <textarea
                          class="form-control order-1"
                          placeholder={t("landing.contact.info_placeholder")}
                          value={info}
                          onChange={(e) => handleInfo(e)}
                          id="messageBox "
                          rows="3"
                        ></textarea>
                        <label for="messageBox" class="form-label order-0">
                          {t("landing.contact.info_label")}*
                        </label>
                        {infoError !== "" ? (
                          <p className="error-label m-0 p-0 pt-2 order-2">
                            {infoError}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div class="btnBox d-flex mt-3">
                        <a
                          onClick={(e) => {
                            handleValidation(e);
                          }}
                          class="btn btn-purpal  rounded-3 w-100"
                        >
                          {t("landing.contact.submit_btn")}
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-xl-4 col-md-12 order-0 order-xl-1 mb-3 mb-xl-0 ">
                <div class="formBox justify-content-between flex-column flex-md-row flex-xl-column">
                  <div class="rightBx">
                    <h5 class="formHeading">
                      {t("landing.contact.send_us_message")}
                    </h5>
                    <div class="addressBx">
                      <address>
                        {" "}
                        101-1405 Graham-BellBoucherville, Qc. J4B 6A1 Canada{" "}
                      </address>
                      <div class="dirLink">
                        <a
                          target="blank"
                          href="https://www.google.com/maps/place/1405+Rue+Graham-Bell+%23101,+Boucherville,+QC+J4B+6A1,+Canada/@45.563151,-73.431273,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc90319d8ea9e7f:0xb9de8f8de15c01e0!8m2!3d45.563151!4d-73.431273!16s%2Fg%2F11nnkx1t4d?entry=ttu"
                          class="btn btn-light"
                        >
                          {t("landing.contact.get_direction")}{" "}
                          <img
                            src={directionIcon}
                            alt="direction"
                            loading="lazy"
                          />
                        </a>
                      </div>
                    </div>
                    <div class="contactLink">
                      <ul>
                        <li>
                          <a href="mailto:support@buvonslocal.ca">
                            <img
                              src={messageIcon}
                              loading="lazy"
                              alt="messageIcon"
                            />{" "}
                            support@buvonslocal.ca
                          </a>
                        </li>
                        <li>
                          <a href="tel:+1 (450) 641-4848">
                            <img
                              src={phoneIcon}
                              loading="lazy"
                              alt="phoneIcon"
                            />{" "}
                            +1 (450) 446-9090{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="contactLogo">
                    <img src={logo} alt="logo" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="modal fade dark"
          show={show}
          centered
          onHide={() => {
            setShow(false);
          }}
        >
          <Modal.Header closeButton className="border-purpal">
            <Modal.Title className="text-purpal">
              {t("landing.contact.verify_header")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Other form fields */}
            <div className="d-flex justify-content-start">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={handleRecaptchaChange}
                hl={localStorage.getItem("i18nextLng")}
                theme="dark"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="border-purpal justify-content-start">
            <button
              className="btn btn-purple rounded-pill "
              onClick={handleSubmit}
              type="submit"
            >
              {t("landing.contact.verify_btn")}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ContactUs;
