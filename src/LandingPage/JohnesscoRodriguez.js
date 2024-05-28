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
import privacy_policy_bg from "./assets/images/privacy-policy_bg.jpg";
import JohnesscoRodriguez from "./assets/images/teams/Johnessco-Rodriguez.jpg";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Sidebar from "./Components/sidebar";
import Header from "./Components/header";

const JohnesscoRodriguezPage = () => {
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
    const handleTabChange = (index) => {
        slider.current.slickGoTo(index);
    };
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
                <div class="mainBox" onClick={handleClose}>
                    <div class="BannerImg">
                        <img src={privacy_policy_bg} alt="HomeGiF" loading="lazy" />
                    </div>
                    <div class="container-fluid alignPadding h-100">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <div class="contentBx">
                                <div className="clear">
                                    <div className="teamImg">
                                        <img src={JohnesscoRodriguez} class="card-img-top circle" alt="Johnessco Rodriguez" />
                                    </div>
                                    <h3 className="mb-2 text-purpal"> Johnessco Rodriguez </h3>
                                    <h6 className="mb-4 degignation">{t('landing.johenessco.position')}</h6>
                                    <p>{t('landing.johenessco.p1')} </p>
                                    <p>{t('landing.johenessco.p2')}</p>
                                    <p>{t('landing.johenessco.p3')}</p>
                                    <p>{t('landing.johenessco.p4')}</p>
                                    <p>{t('landing.johenessco.p5')}</p>
                                    <p>{t('landing.johenessco.p6')}</p>
                                    <p>{t('landing.johenessco.p7')}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default JohnesscoRodriguezPage;