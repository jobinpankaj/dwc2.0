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

const PaymentOptions = () => {
    const slider = useRef(null);
    const ref = useRef();
    const ref1 = useRef();
    const header = useRef();
    const childmenu = useRef();
    const navigate = useNavigate();
    const teamList = useRef();
    const handleTeamList=()=>{
        // teamList.current.classList.toggle('view-child')
        if( teamList.current.classList.contains('d-block')){
            teamList.current.classList.remove('d-block');
            ref1.current.classList.remove('view-child');
        }
        else{
            teamList.current.classList.add('d-block');
            childmenu.current.classList.remove('d-block');
            ref1.current.classList.add('view-child');
        }
    }
    const handleTabChange = (index) => {
        slider.current.slickGoTo(index);
    };
    const handleClose = (e)=>{
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
        if (ref1.current.classList.contains('view') || ref1.current.classList.remove('view-child') ) {
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
                                            <button className={"nav-link"} id="TermCondition-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', {state : {path : "terms"}})}>Terms & Conditions</button> 
                                        </li>
                                        <li classList="nav-item" role="presentation">
                                            <button className={"nav-link"} id="PrivacyPolicy-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', {state : {path : "privacy"}})}>Privacy Policy</button>
                                        </li>

                                        <li classList="nav-item" role="presentation">
                                            <button className={"nav-link"} id="SocialCorporate-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', {state : {path : "social"}})}>Social Corporate Responsibility</button>
                                        </li>
                                        <li classList="nav-item" role="presentation">
                                            <button className={"nav-link"} id="Paymentoptions-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', {state : {path : "payment"}})}>Payment options</button>
                                        </li>
                                        <li classList="nav-item" role="presentation">
                                            <button className={"nav-link"} id="OnlineOrders-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', {state : {path : "online"}})}>Online Orders</button>
                                        </li>
                                        <li classList="nav-item" role="presentation">
                                            <button className={"nav-link"} id="InventoryLevels-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', {state : {path : "inventory"}})}>Inventory Levels</button>
                                        </li>
                                        <li classList="nav-item" role="presentation">
                                            <button className={"nav-link"} id="Community-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', {state : {path : "community"}})}>Community</button> 
                                        </li>
                                        <li classList="nav-item" role="presentation">
                                            <button className={"nav-link"} id="DebitCredit-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', {state : {path : "debit"}})}>Debit & Credit Application</button>  
                                        </li>
                                        <li classList="nav-item" role="presentation">
                                            <button className={"nav-link"} id="NewsletterSubscription-tab" type="button" role="tab" onClick={() => navigate('/LegalMention', {state : {path : "newsletter"}})}>Newsletter Subscription</button>  
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
                    <div class="container-fluid alignPadding h-100 small-text">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <h2 class="subHeading text-uppercase text-white">Payment Options</h2>
                            <div class="contentBx">
                                <h5 class="py-2 mb-2 mb-lg-3"> Social Corporate Responsibility is a cornerstone of our business.  </h5> 
                                <p>RETAILERS can pay Buvons Local PRO on behalf of participant Suppliers for product acquisition directly to our delivery agent by cash, cheque, credit card or to process payments directly  by wire transfers at any financial institution. </p>
                                <p>SUPPLIERS can pay Buvons Local PRO for delivery services by credit card, automatic debit from bank institutions or by wire transfers. </p>
                                <p>RETAILERS, SUPPLIERS and DISTRIBUTORS paying a membership for the use of Buvons Local PRO digital services, have to pay either by credit card or automatic bank debit the first of each month automatically. If for any reason payment shall be declined, Buvons Local PRO will provide with 48hrs grace period before account suspension. </p>
                                <p>Consumer placing orders for pick-up or delivery shall pay directly to Retailer. </p>
                                <h5 class="py-2 mb-2 mb-lg-3"> For trusted clients </h5>
                                <h6 class="py-2 mb-2 mb-lg-3">Direct payments:</h6>
                                <ul className="checkList mb-3">
                                    <li>Present a cheque to the driver once your delivery has been received.</li>
                                </ul> 
                                <h6 class="py-2 mb-2 mb-lg-3">Payments at a financial institution:</h6>
                                <ul className="checkList mb-3">
                                    <li>Pre-Authorized Debit for Retailers: Payments will be withdrawn from your account 5 days after delivery.</li>
                                    <li>Pre-Authorized Debit for Suppliers in regards delivered product: Payments will be withdrawn from your account 15 days after delivery. </li>
                                </ul>
                                <p>* For most banks, payments need to be done prior to 1pm to be received the same day.</p>
                                <h6 class="py-2 mb-2 mb-lg-3">Payment Options Time Overview</h6>
                                <div className="table-responsive col-12 col-xl-12">
                                    <table className="table table-dark table-striped-columns table-bordered  rounded-2">
                                        <thead>
                                            <tr>
                                                <th className="text-purpal">Option</th>
                                                <th className="text-purpal">Due Date</th>
                                                <th className="text-purpal">Funds Clear Retailer or Supplier  Account</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Pre-Authorized Debit</td>
                                                <td>7 Days After Delivery</td>
                                                <td>7 Days after Delivery</td>
                                            </tr>
                                            <tr>
                                                <td>Cheque</td>
                                                <td>Cheque on Delivery</td>
                                                <td>Dependent on bank processing</td>
                                            </tr>
                                            <tr>
                                                <td>Credit Card (third party fees apply)</td>
                                                <td>Time of Ordering</td>
                                                <td>Same Day</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-underline mt-3"><strong> ONCE PAYMENT HAS BEEN COLLECTED BY BUVONS LOCAL PRO ON BEHALF OF SUPPLIER, SUPPLIER CAN EXPECT PAYMENT MINUS DELIVERY AND BANK FEES WITHIN 5 BUSINESS DAYS.</strong></p>

                                <h5 class="py-2 mb-2 mb-lg-3"> LEGAL NOTICE</h5> 
                                <p>In the case of multiple purchase orders, to enable proper posting of payments we will issue separate invoices for each purchase order and must receive a separate payment for each invoice. Failure to make separate payments will result in posting errors and may cause the Retailer’s / Supplier’s account to become past due.  </p>
                                <p>Other than Pre-Authorized Debit or Credit Card payments, where Buvons Local PRO is responsible for initiating the payment, if Retailer or Supplier do not send payment on or before the applicable due date, Buvons Local PRO will suspend further service until the payment is received. At the discretion of Buvons Local PRO, multiple past due incidents or incidents of payment not clearing at client’s bank will cause Retailers or Suppliers to lose their good standing with Buvons Local PRO.</p>
                                <h6 class="py-2 mb-2 mb-lg-3">FOR ALL NEW CLIENTS</h6>
                                <ul className="checkList mb-3">
                                    <li>Present a certified cheque or apply for a credit application with Buvons Local PRO prior to receive any service. Buvons Local PRO reserves the right to request a retainer in the estimated amount of delivered product equivalent to the first 2 weeks.  Such retainer will be credited towards the second (2nd) invoice cycle. </li>
                                </ul> 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default PaymentOptions;