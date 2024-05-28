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

const OrderOnline = () => {
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
                    <div class="container-fluid alignPadding h-100">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <div class="contentBx"> 
                                <h5 class="py-2 mb-2 mb-lg-3">ORDER ONLINE</h5>
                                <p>Retailers can now discover products and place purchase orders online. If you have not registered yet, go to create your account now and register. </p>
                                <p>Consumers can discover products and place orders for delivery or pick-up with participant retailers. No creation of account is required; however, personal contact information is necessary.  </p> 
                                <h5 class="py-2 mb-2 mb-lg-3"> CONSUMER GUIDELINES </h5> 
                                <ul className="checkList mb-3">
                                    <li>Confirm date of birth</li>
                                    <li>Go to Buvons Local Pro product research tool </li>
                                    <li>Find your product or retailer </li>
                                    <li>Place your order for pick-up or delivery</li>
                                    <li>Be ready with your official ID to pick-up your product or at the door when there is a delivery.</li>
                                </ul> 
                                <p>Buvons Local PRO does not take any liability for delays, wrong commands or no showups. For any issue or discrepancy, Consumer should contact Retailer directly and vice versa, for any notification, Retailer should contact Consumer directly.  </p>

                                <h5 class="py-2 mb-2 mb-lg-3"> RETAILER GUIDELINES </h5> 
                                <ul className="checkList mb-3">
                                    <li>Have your business license number ready.</li>
                                    <li>Identify if your store offers delivery or pick-up services.</li>
                                    <li>Prior to placing the order, please advise support @ buvonslocalpro.ca if you have a large quantity of empty containers to be picked up.</li>
                                    <li>Have the number of empty cases, kegs, cylinders and cans to be picked up with delivery, and a listing of products to be returned with delivery.</li>
                                    <li>You may change an order up until the order close time.</li>
                                    <li>For purchase orders voicemail or same last minute email orders are NOT accepted. Buvons Local PRO will consider at its own discretion the possibility of ad such order in the next delivery. If not possible, Our team will make sure to follow up at the closest available date that corresponds your delivery route. </li>    
                                </ul>

                                <h5 class="py-2 mb-2 mb-lg-3"> ORDERS DEADLINE FOR SUPPLIERS ONLY  </h5> 
                                <p>Retailer may place orders up until the order close time, 1 days prior to delivery by 5:00 p.m. </p>
                                <p>For special delivery or any urgent matter, contact us at support @ buvonslocalpro .ca or by phone at +1 (450) 641-4848</p>
                                
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">ORDERING SCHEDULING</h6>
                                <p>Buvons Local PRO offers next day delivery. You may place orders up until the order close time two (2) days before delivery at 11:59 pm. If you wish to modify your delivery schedule you can always reach out our staff at support @ buvonslocalpro .ca</p>

                                <h6 class="py-2 mb-2 mb-lg-3 f-20">The following standards apply to all orders:</h6>
                                <p>The order close time here below shown is applicable only if Supplier is doing business for Distribution with Distribution Bucké. Buvons Local PRO have no way to know the schedule for any other Distribution company.</p>

                                <div className="table-responsive col-12 col-xl-12 mt-lg-4 mt-3">
                                    <table className="table table-dark table-striped-columns table-bordered  rounded-2 mb-2">
                                        <caption className="text-white">* Note only for orders placed by e-mail or through the platform</caption>
                                        <thead>
                                            <tr>
                                                <th className="text-purpal">Distribution Centre</th>
                                                <th className="text-purpal">Last Call Time</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Montreal</td>
                                                <td>11:59 p.m.*</td> 
                                            </tr>
                                            <tr>
                                                <td>Quebec</td>
                                                <td>11:59 p.m.*</td> 
                                            </tr> 
                                        </tbody>
                                    </table>
                                </div>
                                

                                <h6 class="py-2 mb-2 mb-lg-3 f-20"> Orders may be placed by phone anytime during our hours of operation:</h6> 
                                <p className="mb-2">Monday – Friday: 7 a.m. – 5 p.m.</p>
                                <p className="mb-2">Saturday, Sunday 9 a.m. – 1 p.m.</p>
                                <p className="mb-2">Closed most statutory holidays</p>
                                <p className="mb-2">Orders can also be placed online at anytime but follow ups will take place the next business day. </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default OrderOnline;