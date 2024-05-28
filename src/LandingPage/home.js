import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/fonts/stylesheet.css";
import "./assets/scss/main.css";
import leftArrow from "./assets/images/left-circel-arrow.svg";
import Sidebar from "./Components/sidebar";
import brewers_bg from "./assets/images/brewers_bg.jpg";
import distributor_bg from "./assets/images/distributor_bg.jpg";
import stores_bg from "./assets/images/stores_bg.jpg";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "./Components/header";
import { Modal } from "react-bootstrap";

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const slider = useRef(null);
  const ref = useRef();
  const ref1 = useRef();
  const childmenu = useRef();
  const teamList = useRef();
  const location = useLocation();
  const header = useRef();
  const [show, setShow] = useState(false);
  const [ageAgree, setAgeAgree] = useState(false);
  const [updateCount, setUpdateCount] = useState(location && location.state ? location.state.path : 0);
  const above18 = localStorage.getItem("above18");
  console.log(updateCount);
  function scroll(e) {
    if (slider === null) return 0;

    if (e.wheelDelta > 0) {
      slider.current.slickPrev();
    } else {
      slider.current.slickNext();
    }
  }

  useEffect(() => {
    window.addEventListener("wheel", scroll, true);

    return () => {
      window.removeEventListener("wheel", scroll, true);
    };
  }, []);

  var settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    infinite: true, // Enable infinite scrolling
    verticalSwiping: false,
    dots: false,
    arrows: false,
    adaptiveHeight: true,
    rtl: false,
  };

  const handleClose = (e) => {
    childmenu.current.classList.remove("d-block");
    ref1.current.classList.remove("view", "view-child");
  };

  const handleAgeAgree = () => {
    setShow(false);
    localStorage.setItem("above18", true);
  };

  useEffect(() => {
    const agree = localStorage.getItem("above18");
    if (!agree) {
      setShow(true);
    }
  });
  useEffect(() => {
    slider.current.slickGoTo(updateCount);
  }, [updateCount]);

  useEffect(() => {
    const hash = window.location.hash.substring(1); // Get the hash without '#'
    if (hash) {
        const section = document.getElementById(hash);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}, []);

  return (
    <>
      <div className="body" ref={ref1}>
        <Header
          slider={slider}
          ref1={ref1}
          childmenu={childmenu}
          header={header}
        />
        <Sidebar
          slider={slider}
          updateCount={updateCount}
          setUpdateCount={setUpdateCount}
          ref1={ref1}
          childmenu={childmenu}
        />
        <Slider
          {...settings}
          ref={slider}
          //  on={handleSlideChange}
        >
          <div class="mainBox" onClick={handleClose}>
            <div class="BannerImg">
              <video autoPlay loop muted playsinline>
                <source
                  src="https://s3.ca-central-1.amazonaws.com/buvonslocalpro.ca/video-gif/home-video.mp4"
                  type="video/mp4"
                />
                {/* <source src="movie.ogg" type="video/ogg" /> */}
              </video>
            </div>
            <div class="container-fluid alignPadding mobPdTop">
              <div class="col-xl-5 col-lg-8  col-md-12">
                <h1 style={{ wordSpacing: "20px" }} class="bannerHeaing">
                  {t("landing.home.home_slide.content_1")}
                </h1>
                <div class="QuoteBox">
                  <p>{t("landing.home.home_slide.content_2")} </p>
                  <p>{t("landing.home.home_slide.content_3")}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mainBox" onClick={handleClose}>
            <div class="BannerImg">
              <video autoPlay loop muted playsinline>
                <source
                  src="https://s3.ca-central-1.amazonaws.com/buvonslocalpro.ca/video-gif/about-video.mp4"
                  type="video/mp4"
                />
                {/* <source src="movie.ogg" type="video/ogg" /> */}
              </video>
            </div>
            <div class="container-fluid alignPadding h-100 mobPdTop">
              <div class="col-xxl-4 col-xl-5 col-lg-8 col-md-12 aboutUs">
                <h2 class="subHeading text-white">
                  {t("landing.home.about_us")}
                </h2>
                <div class="contentBx">
                  <p>
                    <strong>{t("landing.home.about_slide.buvons")}</strong>{" "}
                    {t("landing.home.about_slide.content_1")}{" "}
                  </p>
                  <p>
                    <strong>{t("landing.home.about_slide.buvons")}</strong>{" "}
                    {t("landing.home.about_slide.content_2")}{" "}
                  </p>
                  <p>
                    <strong>{t("landing.home.about_slide.buvons")}</strong>{" "}
                    {t("landing.home.about_slide.content_3")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mainBox" onClick={handleClose}>
            <div class="BannerImg">
              <video autoPlay loop muted playsinline>
                <source
                  src="https://s3.ca-central-1.amazonaws.com/buvonslocalpro.ca/video-gif/benefit-video.mp4"
                  type="video/mp4"
                />
                {/* <source src="movie.ogg" type="video/ogg" /> */}
              </video>
            </div>

            <div class="container-fluid alignPadding h-100 mobPdTop">
              <div class="col-xl-5 col-lg-10 col-md-12">
                <h2 class="subHeading text-white">
                  {t("landing.home.benefits")}
                </h2>
                <div class="contentBx">
                  <p className="mb-4">
                    <strong>{t("landing.home.benifits_slide.buvons")} </strong>
                    {t("landing.home.benifits_slide.content_1")}{" "}
                  </p>
                  <p>
                    <strong>{t("landing.home.benifits_slide.buvons")} </strong>{" "}
                    {t("landing.home.benifits_slide.content_2")}
                  </p>
                  <div class="btnBox d-flex gap-3">
                    <button
                      type="button"
                      class="btn btn-outline-light btn-border"
                      onClick={() => setUpdateCount(3)}
                    >
                      {t("landing.home.benifits_slide.brewers")}
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-light btn-border"
                      onClick={() => setUpdateCount(4)}
                    >
                      {t("landing.home.benifits_slide.store")}
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-light btn-border"
                      onClick={() => setUpdateCount(5)}
                    >
                      {t("landing.home.benifits_slide.distributor")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mainBox topShift" onClick={handleClose}>
            <div class="BannerImg">
              <img src={brewers_bg} alt="Homebrewers_bgGiF" loading="lazy" />
            </div>
            <div class="container-fluid alignPadding h-100 mobPdTop">
              <div class="col-lg-9 col-md-12">
                <button
                  type="button"
                  class="btn btn-outline-light border-0  rounded-circel p-0 minwidthAuto mb-3 mb-lg-4 backBtn"
                  onClick={() => setUpdateCount(2)}
                >
                  <img src={leftArrow} loading="lazy" alt="left-arrow" />
                </button>
                <h3 class="headingThird">
                  {t("landing.home.brewer_benifits")}
                </h3>
                <div class="contentBx">
                  <ul class="checkList twoPart d-flex flex-column flex-md-row justify-content-md-between">
                    <li>{t("landing.home.brewer_slide.p1")} </li>
                    <li>{t("landing.home.brewer_slide.p2")} </li>
                    <li>
                      {t("landing.home.brewer_slide.p3")} <br />
                      {t("landing.home.brewer_slide.p3_1")}{" "}
                    </li>
                    <li>{t("landing.home.brewer_slide.p4")} </li>
                    <li>
                      {t("landing.home.brewer_slide.p5")} <br />{" "}
                      {t("landing.home.brewer_slide.p5_1")}{" "}
                    </li>
                    <li>
                      {t("landing.home.brewer_slide.p6")} <br />{" "}
                      {t("landing.home.brewer_slide.p6_1")}{" "}
                    </li>
                    <li>{t("landing.home.brewer_slide.p7")} *</li>
                    <li>{t("landing.home.brewer_slide.p8")} </li>
                    <li>{t("landing.home.brewer_slide.p9")}</li>
                    <li>{t("landing.home.brewer_slide.p10")}</li>
                    <li>{t("landing.home.brewer_slide.p11")}</li>
                  </ul>
                  <div class="btnBox d-flex">
                    <a
                      onClick={() => navigate("/contact-us?value=Supplier")}
                      class="btn btn-purpal btn-lg rounded-3 "
                    >
                      {t("landing.home.brewer_slide.btn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mainBox topShift" onClick={handleClose}>
            <div class="BannerImg">
              <img src={stores_bg} alt="stores_bg" loading="lazy" />
            </div>
            <div class="container-fluid alignPadding h-100 mobPdTop">
              <div class="col-lg-12 col-md-12">
                <button
                  type="button"
                  class="btn btn-outline-light border-0  rounded-circel p-0 minwidthAuto mb-3 mb-lg-4 backBtn"
                  onClick={() => setUpdateCount(2)}
                >
                  <img src={leftArrow} alt="left-arrow" loading="lazy" />
                </button>
                <h3 class="headingThird">{t("landing.home.store_benifits")}</h3>
                <div class="contentBx">
                  <ul class="checkList">
                    <li>
                      {t("landing.home.store_slide.p1")} <br />
                      {t("landing.home.store_slide.p1_1")}
                      <strong>
                        {t("landing.home.store_slide.buvons")}
                      </strong>{" "}
                      {t("landing.home.store_slide.p1_2")}{" "}
                    </li>
                    <li>{t("landing.home.store_slide.p2")} </li>
                    <li>
                      {t("landing.home.store_slide.p3")} <br />{" "}
                      {t("landing.home.store_slide.p3_1")}{" "}
                      <strong>{t("landing.home.store_slide.buvons")}</strong>{" "}
                      {t("landing.home.store_slide.p3_2")}{" "}
                    </li>
                    <li>
                      {t("landing.home.store_slide.p4")} <br />{" "}
                      {t("landing.home.store_slide.p4_1")}{" "}
                      <strong>{t("landing.home.store_slide.buvons")}</strong>){" "}
                    </li>
                    <li>{t("landing.home.store_slide.p5")}</li>
                    <li>{t("landing.home.store_slide.p6")} </li>
                    <li>{t("landing.home.store_slide.p7")} </li>
                    <li>{t("landing.home.store_slide.p8")}</li>
                  </ul>
                  <div class="btnBox d-flex">
                    <a href="#section1"
                      onClick={() => navigate("/retailer/sign-up")}
                      class="btn btn-purpal btn-lg rounded-3 "
                    >
                      {t("landing.home.store_slide.btn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mainBox topShift" onClick={handleClose}>
            <div class="BannerImg">
              <img src={distributor_bg} alt="distributor_bg" loading="lazy" />
            </div>
            <div class="container-fluid alignPadding h-100 mobPdTop">
              <div class="col-lg-9 col-md-12">
                <button
                  type="button"
                  class="btn btn-outline-light border-0  rounded-circel p-0 minwidthAuto mb-3 mb-lg-4 backBtn"
                  onClick={() => setUpdateCount(2)}
                >
                  <img src={leftArrow} alt="left-arrow" loading="lazy" />
                </button>
                <h3 class="headingThird">
                  {t("landing.home.distributor_benifits")}{" "}
                </h3>
                <div class="contentBx">
                  <h6 className="pb-2">
                    {t("landing.home.distribitor_slide.basic_service")}{" "}
                  </h6>
                  <ul class="checkList mb-4  mb-lg-4">
                    <li>{t("landing.home.distribitor_slide.inventory_mgm")}</li>
                    <li>{t("landing.home.distribitor_slide.delivery")}</li>
                  </ul>
                  <h6 className="pb-2">
                    {t("landing.home.distribitor_slide.service_plus")}{" "}
                  </h6>
                  <ul class="checkList twoPart d-flex flex-column flex-md-row justify-content-md-between">
                    <li>{t("landing.home.distribitor_slide.automatic")} </li>
                    <li>{t("landing.home.distribitor_slide.routes")} </li>
                    <li>{t("landing.home.distribitor_slide.fleet")}</li>
                    <li>{t("landing.home.distribitor_slide.temporary")} </li>
                    <li>{t("landing.home.distribitor_slide.warehouse")}</li>
                    <li>{t("landing.home.distribitor_slide.sign-on")}</li>
                    <li>{t("landing.home.distribitor_slide.automated")} </li>
                    <li>{t("landing.home.distribitor_slide.online")} </li>
                    <li>{t("landing.home.distribitor_slide.accounting")}</li>
                    <li>{t("landing.home.distribitor_slide.weekly")}</li>
                    <li>
                      {t("landing.home.distribitor_slide.integrated")} <br />{" "}
                      {t("landing.home.distribitor_slide.integrated_1")}{" "}
                    </li>
                    <li>{t("landing.home.distribitor_slide.iOS")} </li>
                  </ul>
                  <div class="btnBox d-flex">
                    <a
                      onClick={() => navigate("/contact-us?value=Distributor")}
                      class="btn btn-purpal btn-lg rounded-3 "
                    >
                      {t("landing.home.distribitor_slide.btn")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>

      <Modal
        className="modal fade"
        show={show}
        centered
        // onHide={() => { setShow(false) }}
      >
        <Modal.Header>
          <h5 class="modal-title text-purpal" id="ageConfimLabel">
            Confirmez votre âge
          </h5>
        </Modal.Header>
        <Modal.Body>
          <p>
            Les Sites et les services qui y sont fournis ne doivent pas être
            consultés ou visualisés par vous{" "}
            <strong>si vous n'avez pas l'âge légal pour boire</strong> dans
            votre pays, province ou état (18 ans et plus dans la province de
            Québec, Canada) pour la consommation de boissons alcoolisées ou si
            vous êtes dans un pays, province ou état où la consommation de
            boissons alcoolisées ou le contenu des Sites sont{" "}
          </p>
          <p>
            The Sites and the services provided therein should not be accessed
            or viewed by you{" "}
            <strong>if you are not of legal drinking age</strong> in your
            country, province, or state (18 and over in the Province of Quebec,
            Canada) for the consumption of alcoholic beverages or if you are in
            a country, province or state where the consumption of alcoholic
            beverages or the content of the Sites are not permitted.{" "}
          </p>
        </Modal.Body>
        <div className="form-check col checkOption age-modal">
          <input
            type="checkbox"
            className="form-check-input"
            id="age"
            onChange={(e) => {
              e.target.checked ? setAgeAgree(true) : setAgeAgree(false);
            }}
          />
          <label className="form-check-label" htmlFor="age">
            En COCHANT ceci, vous certifiez que vous avez 18 ans ou plus et que
            vous acceptez nos Conditions
          </label>
          <label className="form-check-label" htmlFor="age">
            By CHECKING this, you certify that you are 18 years or older and
            that you accept our Terms & Conditions.
          </label>
        </div>
        {/* <input id="age" type={"checkbox"}></input>
                            <label htmlFor="age"><p>Yes, i agree i am of legal drinking age</p></label> */}
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-purple btn-md w-auto"
            onClick={handleAgeAgree}
            disabled={!ageAgree}
          >
            Accepter
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Home;
