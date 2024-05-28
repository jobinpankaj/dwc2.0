import React, { useEffect, useRef, useState } from "react";
import searchIcon from './assets/images/search.svg';
import userIcon from './assets/images/user-icon.svg';
import worldIcon from './assets/images/world-icon.svg';
import './assets/fonts/stylesheet.css'
import './assets/scss/main.css'
import Hambrgr from './assets/images/hamberGar.svg';
import searchImage from './assets/images/search.svg';
import closeIcon from './assets/images/close.svg';
import logo from './assets/images/logo.svg'
import directionIcon from './assets/images/direction.svg';
import messageIcon from "./assets/images/message.svg";
import phoneIcon from "./assets/images/phone-icon.svg";
import apis from "../utils/apis";
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import MyForm from "../CommonComponents/ReCaptcha";
import { EmailField } from "react-admin";
import { toast } from "react-toastify";
import Accordion from 'react-bootstrap/Accordion';
import { useTranslation } from "react-i18next";
import Sidebar from "./Components/sidebar";
import Header from "./Components/header";

const FAQ = () => {
    const { t, i18n } = useTranslation();
    const slider = useRef(null);
    const ref = useRef();
    const ref1 = useRef();
    const header = useRef();
    const childmenu = useRef();
    const navigate = useNavigate();
    const emailregex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [website, setWebsite] = useState("");
    const [info, setInfo] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [infoError, setInfoError] = useState("");
    const [websiteError, setWebsiteError] = useState("");
    const [type, setType] = useState("Supplier");
    const teamList = useRef();
    const location = useLocation()
    const handleTeamList = () => {
        // teamList.current.classList.toggle('view-child')
        if (teamList.current.classList.contains('d-block')) {
            teamList.current.classList.remove('d-block');
            ref1.current.classList.remove('view-child');
        }
        else {
            teamList.current.classList.add('d-block');
            childmenu.current.classList.remove('d-block');
            ref1.current.classList.add('view-child');
        }
    }

    useEffect(() => {
        const value = new URLSearchParams(location.search).get('value');
        setType(value)
        console.log(value)
    }, [location.search]);

    const handleClose = (e) => {
        childmenu.current.classList.remove('d-block');
        ref1.current.classList.remove('view', 'view-child');
    }

    const handleSubSideBar = (e) => {
        e.preventDefault();
        console.log("clicked")
        if (childmenu.current.classList.contains('d-block')) {
            childmenu.current.classList.remove('d-block');
            ref1.current.classList.remove('view-child');
        }
        else {
            childmenu.current.classList.add('d-block');
            ref1.current.classList.add('view-child');
        }
    }
    const handleSearch = (e) => {
        e.preventDefault();
        if (window.width > 767) {
            return;

        } else {

            ref.current.classList.toggle('d-block');
        }

    }
    const handleSideBar = (e) => {
        e.preventDefault();
        console.log()
        if (ref1.current.classList.contains('view') || ref1.current.classList.remove('view-child')) {
            ref1.current.classList.remove('view', 'view-child');
            childmenu.current.classList.remove('d-block');
        }
        else {
            ref1.current.classList.add('view')
        }
    }
    const handleGetMap = () => {
        window.location.href = "https://www.google.com/maps/place/1405+Rue+Graham-Bell+%23101,+Boucherville,+QC+J4B+6A1,+Canada/@45.563151,-73.431273,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc90319d8ea9e7f:0xb9de8f8de15c01e0!8m2!3d45.563151!4d-73.431273!16s%2Fg%2F11nnkx1t4d?entry=ttu"
    }
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
                <Header slider={slider} ref1={ref1} childmenu={childmenu} header={header} />
                <Sidebar slider={slider} ref1={ref1} childmenu={childmenu} />
                <div class="mainBox  topShift bg-dark formPage" onClick={() => handleClose()}>
                    <div class="container-fluid alignPadding h-100">
                        <div class="row">
                            <div class="col-12 pb-2 pb-xxl-4">
                                <h2 class="subHeading">FAQ</h2>
                            </div>
                            <div class="col-12 pb-2 pb-xxl-4">
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>{t("landing.faq.General")}</Accordion.Header>
                                        <Accordion.Body>
                                            <Accordion>
                                                <Accordion.Item eventKey="G0">
                                                    <Accordion.Header>{t("landing.faq.general.q1")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q1_A")}
                                                        </p>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q1_A1")}
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G1">
                                                    <Accordion.Header>{t("landing.faq.general.q2")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q2_A")}
                                                        </p> </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G2">
                                                    <Accordion.Header>{t("landing.faq.general.q3")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q3_A")}
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G3">
                                                    <Accordion.Header>{t("landing.faq.general.q4")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q4_A")}
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G4">
                                                    <Accordion.Header>{t("landing.faq.general.q5")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q5_A")}
                                                        </p>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q5_A1")}
                                                        </p>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q5_A2")}
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G5">
                                                    <Accordion.Header>{t("landing.faq.general.q6")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q6_A")}
                                                        </p>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q6_A1")}
                                                        </p> </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G6">
                                                    <Accordion.Header>{t("landing.faq.general.q7")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q7_A")}
                                                        </p>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q7_A1")}
                                                        </p>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q7_A2")}
                                                        </p>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q7_A3")}
                                                        </p>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q7_A4")}
                                                        </p>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G7">
                                                    <Accordion.Header>{t("landing.faq.general.q8")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q8_A")}
                                                        </p>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G8">
                                                    <Accordion.Header>{t("landing.faq.general.q9")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q9_A")}
                                                        </p>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G9">
                                                    <Accordion.Header>{t("landing.faq.general.q10")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q10_A")}
                                                        </p>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="G10">
                                                    <Accordion.Header>{t("landing.faq.general.q11")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">
                                                            {t("landing.faq.general.q11_A")}
                                                        </p>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>{t("landing.faq.Retailers")}</Accordion.Header>
                                        <Accordion.Body>
                                            <Accordion>
                                                <Accordion.Item eventKey="R0">
                                                    <Accordion.Header>{t("landing.faq.retailer.q1")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul>
                                                            <li className="text-white">{t("landing.faq.retailer.q1_A")}</li>
                                                            <li className="text-white">{t("landing.faq.retailer.q1_A1")}</li>
                                                            <li className="text-white">{t("landing.faq.retailer.q1_A2")}</li>
                                                            <li className="text-white">{t("landing.faq.retailer.q1_A3")} </li>
                                                            <li className="text-white">{t("landing.faq.retailer.q1_A4")} </li>
                                                        </ul>
                                                        <p className="text-white mt-3">{t("landing.faq.retailer.q1_A5")}</p>
                                                        <div className="col-lg-4 pt-1 btnBox">
                                                            <a onClick={() => navigate("/retailer/sign-up")} className="btn btn-purpal btn-md rounded-3  text-uppercase">{t("landing.faq.retailer.q1_btn")}</a>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>{t("landing.faq.Suppliers")}</Accordion.Header>
                                        <Accordion.Body>
                                            <Accordion>
                                                <Accordion.Item eventKey="S0">
                                                    <Accordion.Header>{t("landing.faq.supplier.q1")}</Accordion.Header>
                                                    <Accordion.Body>

                                                        <p className="text-white">{t("landing.faq.supplier.q1_A")}</p>
                                                        <ul>
                                                            <li className="text-white">{t("landing.faq.supplier.q1_A1")}</li>
                                                            <li className="text-white">{t("landing.faq.supplier.q1_A2")}</li>
                                                            <li className="text-white">{t("landing.faq.supplier.q1_A3")}</li>
                                                            <li className="text-white">{t("landing.faq.supplier.q1_A4")}</li>
                                                            <li className="text-white">{t("landing.faq.supplier.q1_A5")}</li>
                                                            <li className="text-white">{t("landing.faq.supplier.q1_A6")}</li>
                                                            <li className="text-white">{t("landing.faq.supplier.q1_A7")}</li>
                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                            <Accordion>
                                                <Accordion.Item eventKey="S1">
                                                    <Accordion.Header>{t("landing.faq.supplier.q2")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <p className="text-white">{t("landing.faq.supplier.q2_A")}</p>


                                                        <div className="col-lg-4 pt-1 btnBox">
                                                            <a onClick={() => navigate("/contact-us?value=Supplier")} className="btn btn-purpal btn-md rounded-3 text-uppercase">{t("landing.faq.supplier.q2_btn")}</a>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>{t("landing.faq.Distributors")}</Accordion.Header>
                                        <Accordion.Body>
                                            <Accordion>
                                                <Accordion.Item eventKey="R0">
                                                    <Accordion.Header>{t("landing.faq.distributor.q1")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul>
                                                            <li className="text-white">{t("landing.faq.distributor.q1_A")}</li>
                                                            <li className="text-white">{t("landing.faq.distributor.q1_A1")}</li>
                                                            <li className="text-white">{t("landing.faq.distributor.q1_A2")}</li>
                                                            <li className="text-white">{t("landing.faq.distributor.q1_A3")} </li>
                                                            <li className="text-white">{t("landing.faq.distributor.q1_A4")} </li>
                                                            <li className="text-white">{t("landing.faq.distributor.q1_A5")}</li>
                                                        </ul>
                                                        <div className="col-lg-4 pt-1 btnBox">
                                                            <a onClick={() => navigate("/contact-us?value=Distributor")} className="btn btn-purpal btn-md rounded-3 text-uppercase">{t("landing.faq.distributor.q1_btn")}</a>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="4">
                                        <Accordion.Header>{t("landing.faq.Customers")}</Accordion.Header>
                                        <Accordion.Body>
                                            <Accordion>
                                                <Accordion.Item eventKey="R0">
                                                    <Accordion.Header>{t("landing.faq.consumer.q1")}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul>
                                                            <li className="text-white">{t("landing.faq.consumer.q1_A")}</li>
                                                            <li className="text-white">{t("landing.faq.consumer.q1_A1")}</li>
                                                            <li className="text-white">{t("landing.faq.consumer.q1_A2")}</li>
                                                        </ul>
                                                        <div className="col-lg-4 pt-1 btnBox">
                                                            <a onClick={() => navigate("/contact-us")} className="btn btn-purpal btn-md rounded-3  text-uppercase">{t("landing.faq.consumer.q1_btn")}</a>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default FAQ;
