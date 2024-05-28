import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LoginLeftSidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="col-sm-12 col-md-6 login-setup-left">
      <div className="logo-box">
        <img
          className="img-fluid"
          onClick={() => navigate("/")}
          src={logo}
          alt=""
        />
      </div>

      <div
        id="setup-slides"
        className="slideWrap carousel slide"
        data-bs-ride="false"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#setup-slides"
            data-bs-slide-to="0"
            className="active rounded-circle"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#setup-slides"
            data-bs-slide-to="1"
            className="rounded-circle"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#setup-slides"
            data-bs-slide-to="2"
            className="rounded-circle"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <h2>{t("retailer.login.start_journey")}</h2>
          </div>
          <div className="carousel-item">
            <h2>{t("retailer.login.start_journey")}</h2>
          </div>
          <div className="carousel-item">
            <h2>{t("retailer.login.start_journey")}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLeftSidebar;
