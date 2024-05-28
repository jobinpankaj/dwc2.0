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

import { NavLink, useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
                            <h2 class="subHeading text-uppercase text-white">Privacy Policy</h2>
                            <div class="contentBx smallFont">
                                <p>Buvons Local PRO is committed to preserving and safeguarding your right to privacy. This Privacy Policy (“Policy”) explains how BUVONS LOCALPRO collects, uses and discloses the personal information BUVONS LOCAL PRO receives when you visit Buvonslocalpro.ca and/or Buvons Local PRO mobile application (App) (collectively the “Sites”) and use the services provided on the Sites. Personal information refers to information that specifically identifies you. It may include, for example, your name, address, phone number, age and email address. </p>
                                <h5 class="py-2 mb-2 mb-lg-3"> InformationAutomatically Collected  </h5> 
                                <p>Cookies are simple text files that web browsers place on a user's hard drive when our Sites are visited. Cookies tell us that you are a past user of the Sites. Cookies cannot damage files, nor can they read information from a user's hard drive. BUVONS LOCAL PRO uses cookies to measure the number of visits, average time spent, page views, help us recognize you, personalize features, remember your previous orders and to gather other statistics relating to the use of our Sites. You may decline Cookies if your web browser permits, but certain features on the Site may not function if you do not accept Cookies.</p>
                                <h5 class="py-2 mb-2 mb-lg-3"> Personal Information we collect </h5>
                                <p>BUVONS LOCAL PRO  collects personal information when your visit our Sites, our retail locations, or communicate with us.</p>
                                <ul className="checkList mb-3">
                                    <li>Customer Service. BUVONS LOCAL PRO collects personal information from you if you contact BUVONS LOCAL PRO  with a consumer complaint or request. The information collected may include your name, address, telephone number, email address, and the facts regarding the complaint or request. We use this information to respond to your complaint or request, to track trends and issues, and to improve our products and services. We may also contact you for future news and events, promotions; unless you opt-out.</li>
                                    <li>Marketing Research. BUVONS LOCAL PRO  collects information about you if you consent to participate in any of Buvons Local PRO marketing research programs. The information collected may include your name, address, telephone number, email address, date of birth, gender, income, promotional awareness, interests, and facts regarding your consumer habits and preferences. We may use this information to track trends and issues, and to improve our products and services. We may also contact you for future news and events, unless you opt-out.</li>
                                    <li>Promotions. BUVONS LOCAL PRO collects information about you if you participate in any of Buvons Local PRO promotion. The information collected may include your name, address, telephone number, email address, date of birth, gender, income, promotional awareness, interests, and facts regarding your consumer habits and preferences. We use this information to administer the contest or promotion, to analyze the success of our promotions and to develop new promotions. We may also contact you for future news and events, unless you opt-out.</li>
                                    <li>Online ordering via Buvonslocalpro.ca/ Buvons Local PRO App. BUVONS LOCAL PRO collects information when you reserve orders through the Sites. The information collected may include your user name, password, reservation history, credit card, and other information relating to your usage of the Sites. We use this information to provide you with the ordering, pickup and delivery services, to track trends and issues, and to improve our products and services. We may also contact you for future news and events, unless you opt-out.</li>
                                    <li>Retailer Partners in-Store Transactions. BUVONS LOCAL PRO DO NOT collects information in order to process your transaction in-store. Only Retailers are responsible for the information collected; it may include your name, credit or other payment card information, whether you are of the legal drinking age, your order history and other information relating to your use of Buvons Local PRO services. Buvons Local PRO is not responsible for any information use and collected by our affiliated Retailers.</li>
                                </ul>
                                <p>As a User, it is your choice to provide and share your personal information with us. When you request services from us, we ask that you provide sufficient information to enable us to respond to your request. The personal information may be used to:</p>
                                <ul className="checkList mb-3">
                                    <li>Verify your age</li>
                                    <li>Confirm your identity</li>
                                    <li>Create your online account</li>
                                    <li>Contact and correspond with you</li>
                                    <li>Process and delivery your orders  </li>
                                    <li>Locate the nearest Retailer or Product from you </li>
                                    <li>Process your order reservations to be picked-up</li>
                                    <li>Authorize charges and manage billings related to our services</li>
                                    <li>Improve BUVONS LOCAL PRO offerings and marketing, to enhance the consumer experience and to assess strategic initiatives</li>
                                    <li>Confirm eligibility for contests (when applicable)</li>
                                    <li>Contact consumers for marketing purposes</li>
                                    <li>Respond to your consumer complaint or request</li>
                                    <li>Respond to job applications and manage our online boutique catalogue</li>
                                    <li>Comply with regulatory and audit purposes</li>
                                    <li>Identify other purposes in order for BUVONS LOCAL PRO to provide its services</li>
                                </ul>
                                <p>Personal information may also be used for other purposes the company might deem necessary. </p>
                                <h5 class="py-2 mb-2 mb-lg-3"> Consent to Use Personal Information </h5>
                                <p>By using our Sites or our services, participating in market research or entering a promotion, you consent to the collection, use and disclosure of your personal information in accordance with this Policy and applicable laws.</p>
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">Opting-Out of Marketing Emails</h6>
                                <p>If you decide you no longer want to receive emails from BUVONS LOCAL PRO  you can unsubscribe with every offering by clicking on the “unsubscribe” link within our email. You may also contact us at Buvons Local PRO at 102-1405 rue Graham-Bell, Boucherville, Qc. H4B 6A1, Canada. Or by e-mail at support @ buvonslocalpro.ca </p>
                                <p>The Sites and the provided services are not for individuals who are not of legal drinking age (18 and over in the province of Quebec, Canada). BUVONS LOCAL PRO  does not knowingly collect personal information from minors. If are under the legal drinking age and believe BUVONS LOCAL PRO  has collected your personal information, or, if you are a parent or legal guardian and believe BUVONS LOCAL PRO  has collected personal information of a minor, please contact BUVONS LOCAL PRO  at support @ buvonslocalpro.ca</p>
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">Third Parties and Sharing Personal Information</h6>
                                <p>In providing our services, we may work with third party service providers, or need to disclose the personal information we collect to other service providers, agents or other third parties who perform various functions for us, such as processing or delivering orders, processing payments, managing promotions and online activities on our behalf.  Such third parties are contractually required to keep all personal information private, confidential and secure at the same or higher security standards demonstrated by BUVONS LOCAL PRO . Third parties may only use your personal information to assist BUVONS LOCAL PRO and for no other purpose. In certain circumstances, we may provide personal information to third parties for legal or regulatory purposes or as otherwise required or permitted by law.</p>
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">Links To Other Websites</h6>
                                <p>The Sites may contain links to other non-BUVONS LOCAL PRO  websites. BUVONS LOCAL PRO  is not responsible for the privacy practices or content of such other websites. We encourage you to read the privacy policies of all websites you visit.</p>
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">BUVONS LOCAL PRO  Website and Mobile App</h6>
                                <p>Depending on certain locations, BUVONS LOCAL PRO  may offer the App to our customer for use. For more information on the BUVONS LOCAL PRO  App for iPhone or Android, please visit your device’s mobile app store.</p>
                                <p>By visiting your device’s mobile app store and downloading, installing, accessing or using the App, you (the “User”) consent to the collection of your data and all actions that BUVONS LOCAL PRO  take with respect to your data consistent with this Policy and the Terms and Conditions of BUVONS LOCAL PRO  which can be found at the following URL: <a href="#" className="text-underline text-purpal">Terms & Conditions – Buvons Local Pro</a></p>
                                <p>The use of the App entails personal information collection in accordance with the section titled <strong>“Personal Information we collect”</strong> of the Policy. This personal information collection may include user controls for App functionality, such as geolocation services, purchasing BUVONS LOCAL PRO  products, and setting push notifications and in-app message preferences.</p>
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">User Information</h6>
                                <p>Through the use of an iOS, Android or other supported hardware device, some functionality of the App may require the transmission of certain information provided by the User, which includes:</p>
                                <ul className="checkList mb-3">
                                    <li>Username and password</li>
                                    <li>E-mail address</li>
                                    <li>Billing address</li>
                                    <li>Phone number</li>
                                    <li>Financial information, such as payment card or account numbers</li>
                                    <li>GPS location (collectively, “User Information”).</li>
                                </ul>
                                <p>This User Information may be needed in order to purchase BUVONS LOCAL PRO  products and/or services through the App. When using the App, you have the option to securely and conveniently make a purchase by using the App to pay for your purchase by using the payment card registered to your username and account on the App.</p>
                                <p>In addition, you acknowledge and consent to other information that may be shared with BUVONS LOCAL PRO  through the App which may include </p>
                                <ul className="checkList mb-3">
                                    <li> analytical information such as location data, diagnostic and usage data and User interactions; and </li>
                                    <li> geolocation information through technologies such as GPS, Bluetooth, Wi-Fi, or other location-based technology to enhance the user experience so that you may order ahead, receive directions, and see what products are available for sale at nearby BUVONS LOCAL PRO  retail store locations.</li>
                                </ul>  
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">Location Services</h6>
                                <p>In order for the User to use certain services and App functionality, such as payment via credit card, and use of location-based services and technology, you must either </p>
                                <ul className="checkList mb-3">
                                    <li> enable “Location Services” in the App when prompted or through the App settings on your device; and/or </li>
                                    <li> set the permissions in your mobile device to allow communication of this information. Additional information regarding adjusting location services on iOS devices may be found at <a href="#" className="text-underline text-purpal">Turn Location Services and GPS on or off on your iPhone, iPad, or iPod touch – Apple Support </a>. Additional information on managing an Android’s device location settings may be found at <a href="#" className="text-underline text-purpal">Manage your Android device’s location settings – Google Account Help.</a></li>
                                </ul> 
                                <p>If you allow for location sharing on the App, your device may communicate with BUVONS LOCAL PRO  in ways that allow for us to customize your experience in browsing and shopping on the App. User acknowledges that if location sharing is not turned on in the settings of the App, that certain App functionality and some services may not work properly without information of your location being disclosed. If you have turned off location sharing on your device and would like to turn it on, you can re-enable the collection of geolocation information, at any time, by turning on location services on your device and in the App.
</p>
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">Security Safeguards and Retention</h6>
                                <p>BUVONS LOCAL PRO  understands the importance of protecting your personal information. BUVONS LOCAL PRO  takes reasonable steps to make sure your personal information is protected from unauthorized use, access, alteration, disclosure, loss or destruction. However, you should be aware that the Internet is not perfectly secure. You understand that you are providing such information to BUVONS LOCAL PRO  at your own risk.
</p>
                                <p>BUVONS LOCAL PRO  retains your personal information for as long as it may be required for the purposes described above, subject to any legal, auditing or account obligations BUVONS LOCAL PRO  is required to meet.</p>
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">Keeping Information Accurate</h6>
                                <p>It is important that your personal information is accurate and complete. Having accurate information about you enables us to give you the best possible service. With some exceptions prescribed by law, you have the right to access, verify or challenge the information we have about you and have it amended if appropriate. You can help us keep personal information up-to-date by keeping us informed of any changes, such as a change of email address. If you would like to review or update the personal information in your customer record or withdraw your consent for the collection, use or disclosure of your personal information, or if you have any inquiries, please contact us at support @ buvonslocalpro .ca.</p>
                                <p>When you request that your name be removed from our databases, it may not be possible to completely delete all your personal information due to technical and legal constraints, including stored back-up systems.</p>
                                <h6 class="py-2 mb-2 mb-lg-3 f-20">Contact  </h6>
                                <p>To obtain further information about our policies and procedures or if you have any unresolved inquiries or concerns.</p>
                                <address className="">Buvons Local Pro<br/>102-1405 rue Graham-Bell, Boucherville, Qc. H4B 6A1, Canada.<br/><a href="mailto:support@ buvonslocal.ca" className="text-underline text-purpal">support @ buvonslocal .ca</a> </address>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default PrivacyPolicy;