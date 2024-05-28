import React, { useEffect, useRef, useState } from "react";
import searchIcon from './assets/images/search.svg';
import userIcon from './assets/images/user-icon.svg';
import worldIcon from './assets/images/world-icon.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './assets/fonts/stylesheet.css'
import './assets/scss/main.css'
import Hambrgr from './assets/images/hamberGar.svg';
import searchImage from './assets/images/search.svg';
import closeIcon from './assets/images/close.svg';
import logo from './assets/images/logo.svg'
import privacy_policy_bg from "./assets/images/privacy-policy_bg.jpg";
import { NavLink, useNavigate } from "react-router-dom";

const CommunityPage = () => {
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
    function scroll(e) {
        e.wheelDelta > 0 ? (
            header.current.classList.remove('sticky')
        ) : (
            header.current.classList.add('sticky')
        );
    };
    useEffect(() => {
        window.addEventListener("wheel", scroll, true);
        return () => {
            window.removeEventListener("wheel", scroll, true);
        };
    }, []);
    return (
        <>
            <div className="body" ref={ref1}>
                <header className="header" ref={header}>
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
                </header>
                <div className="sideBarMenu">
                    <span className="sideBarClose" onClick={(e) => handleClose(e)}> <img src={closeIcon} alt="close" loading="lazy" /> </span>
                    <div className="logoBox ">
                        <a onClick={() => { navigate('/'); }}><img src={logo} loading="lazy" /></a>
                    </div>
                    <div className="d-flex flex-column justify-content-between spaceBetwwenSocial">
                        <div className="sideMenuList">
                            <div className="searchForm position-retaive">
                                <form>
                                    <input className="form-control searchfield" type="search" placeholder="Beer Search & Order" />
                                    <button onClick="" className="btn searchIcon" type="submit">
                                        <img src={searchIcon} alt="searchIcon" loading="lazy" />
                                    </button>
                                </form>
                            </div>
                            <ul className="menu">
                                <li>
                                    <a onClick={() => { navigate('/', { state: { activeindex: 1 } }); }} className={`url `}>About us</a>
                                </li>
                                <li>
                                    <a onClick={() => navigate('/', { state: { activeindex: 3 } })} className={`url `}>Brewers</a>
                                </li>
                                <li>
                                    <a onClick={() => navigate('/', { state: { activeindex: 4 } })} className={`url`}>Retailers</a>
                                </li>
                                <li>
                                    <a onClick={() => navigate('/', { state: { activeindex: 5 } })} className={`url`}>Distributors</a>
                                </li>
                                <li className="subMenu">
                                    <NavLink to="/teams" className="url" exact activeClassname="active">
                                        The Team
                                    </NavLink>
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
                                </li>
                                <li>
                                    <NavLink to="/news" className="url" exact activeClassname="active">
                                        News
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact-us" className="url" exact activeClassname="active">
                                        Contact
                                    </NavLink>
                                </li>
                                <li className="subMenu">
                                    <a onClick={(e) => handleSubSideBar(e)}>Legal Mentions</a>
                                    <div className="ChildMenuList" ref={childmenu}>
                                        <ul className="menu nav nav-tabs" id="myTab" role="tablist">
                                            <li classList="nav-item" role="presentation">
                                                <button className={"nav-link"} id="TermCondition-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', { state: { path: "terms" } })}>Terms & Conditions</button>
                                            </li>
                                            <li classList="nav-item" role="presentation">
                                                <button className={"nav-link"} id="PrivacyPolicy-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', { state: { path: "privacy" } })}>Privacy Policy</button>
                                            </li>

                                            <li classList="nav-item" role="presentation">
                                                <button className={"nav-link"} id="SocialCorporate-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', { state: { path: "social" } })}>Social Corporate Responsibility</button>
                                            </li>
                                            <li classList="nav-item" role="presentation">
                                                <button className={"nav-link"} id="Paymentoptions-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', { state: { path: "payment" } })}>Payment options</button>
                                            </li>
                                            <li classList="nav-item" role="presentation">
                                                <button className={"nav-link"} id="OnlineOrders-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', { state: { path: "online" } })}>Online Orders</button>
                                            </li>
                                            <li classList="nav-item" role="presentation">
                                                <button className={"nav-link"} id="InventoryLevels-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', { state: { path: "inventory" } })}>Inventory Levels</button>
                                            </li>
                                            <li classList="nav-item" role="presentation">
                                                <button className={"nav-link"} id="Community-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', { state: { path: "community" } })}>Community</button>
                                            </li>
                                            <li classList="nav-item" role="presentation">
                                                <button className={"nav-link"} id="DebitCredit-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', { state: { path: "debit" } })}>Debit & Credit Application</button>
                                            </li>
                                            <li classList="nav-item" role="presentation">
                                                <button className={"nav-link"} id="NewsletterSubscription-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', { state: { path: "newsletter" } })}>Newsletter Subscription</button>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <NavLink to="/faq" className="url" exact activeClassname="active">
                                        FAQ
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <ul className="socialList">
                            <li><a className="faceBook"><i className="fa-brands fa-facebook-f"></i></a></li>
                            <li><a className="faceBook"><i className="fa-brands fa-twitter"></i></a></li>
                            <li><a className="faceBook"><i className="fa-brands fa-linkedin-in"></i></a></li>
                            <li><a className="faceBook"><i className="fa-brands fa-instagram"></i></a></li>
                            <li><a className="faceBook"><i className="fa-brands fa-tiktok"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="mainBox" onClick={handleClose}>
                    <div class="BannerImg">
                        <img src={privacy_policy_bg} alt="HomeGiF" loading="lazy" />
                    </div>
                    <div class="container-fluid alignPadding h-100">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <h2 class="subHeading text-uppercase text-white">Buvons Local PRO | Community </h2>
                            <div class="contentBx">
                                <h5 class="py-2 mb-2 mb-lg-3">Retailers doing business with Suppliers associated with BUVONS LOCAL PRO or DISTRIBUTION BUCKÉ.</h5>
                                <p>Buvons local PRO and sister company Distribution Bucké, are proud to support and service an exclusive community of Suppliers and Retailers in the Province of Quebec.  </p>
                                <p>With over 3000 distributions points and hundreds of Suppliers. Buvons Local PRO can guarantee that if you are dealing with our official distributor DISTRIBUTION BUCKÉ, you can expect a high level of customer service. </p>

                                <h5 class="py-2 mb-2 mb-lg-3">As Buvons Local PRO valued customer you can expect the following: </h5>
                                <ul className="checkList mb-3">
                                    <li>Flexibility, when unexpected circumstances or special events arise</li>
                                    <li>Your products delivered always on time and in good condition </li>
                                    <li>Happy and friendly faces delivering your products at every time </li>
                                    <li>One on one personalized attention if any unexpected circumstances shall occur </li>
                                    <li>Knowledgeable and ready to assist Staff </li>
                                    <li>Pick up of empty containers with each delivery </li>
                                    <li>Transparent and fair invoices </li>
                                    <li>Problem solving within 10 hours </li>
                                    <li>A team ready to go far and beyond for your company </li>
                                    <li>Professional management team with years in business  </li>
                                    <li>Top-notch technology to ensure your business is never late </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CommunityPage;