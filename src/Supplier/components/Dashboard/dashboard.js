import React from "react";
import { useEffect, useState } from "react";
import calendar from "../../assets/images/calender.png";
import totalUsers from "../../assets/images/total-users.png";
import graph from "../../assets/images/graph.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthInterceptor from "../../../utils/apis";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../assets/scss/dashboard.scss";
import { useTranslation } from "react-i18next";
import TopRetailers from "./Partials/TopRetailers";
import TopProducts from "./Partials/TopProducts";
import RadialChart from "../../../CommonComponents/Charts/RadialChartS";
import LineChart from "./Partials/LineChart";
import Info from "../../../CommonComponents/Dashboard/SuppliersInfo";

const Dashboard = () => {
  const accessToken = localStorage.getItem("supplier_accessToken");
  const { t, i18n } = useTranslation();

  return (
    <div className="container-fluid page-wrap dashboard">
      <div className="row height-inherit">
        <Sidebar userType={"supplier"} />

        <div className="col main p-0">
          <Header title={t("supplier.sidebar.Dashboard1")} userType={"supplier"} />

          <div className="container-fluid page-content-box px-3 px-sm-4">
            <div className="row">
              <div className="col">
                <div className="tab-link-row position-relative">
                  <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="value-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#value-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="value-tab-pane"
                        aria-selected="true"
                      >
                        {t("supplier.sidebar.value")}
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="order-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#order-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="order-tab-pane"
                        aria-selected="false"
                      >
                        {t("supplier.sidebar.order1")}
                      </button>
                    </li>
                  </ul>

                  <div className="filter-box position-abs">
                    <div className="dropdown date-selector">
                      <button
                        className="btn btn-outline-black btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src={calendar} alt="" />{" "}
                        {t("supplier.sidebar.Select_Date")}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Date
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Date
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="dropdown date-selector">
                      <button
                        className="btn btn-outline-black btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {t("supplier.sidebar.supplier")}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="#">
                            Supplier 1
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Supplier 2
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="value-tab-pane"
                    role="tabpanel"
                    aria-labelledby="value-tab"
                    tabindex="0"
                  >
                    <Info accessToken={accessToken} />
                    <div className="row mb-3">
                      <div className="col-sm-5 mb-3 mb-sm-0">
                        <div className="card user-card height-100">
                          <div className="card-body">
                            <h6 className="card-title mb-3">
                              {t("supplier.sidebar.users")}
                            </h6>
                            <div className="row">
                              <RadialChart accessToken={accessToken} />
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col">
                                <div className="badge text-bg-light w-100 sales-data p-3 text-start">
                                  <label>{t("supplier.sidebar.sales")}</label>
                                  <div className="amount">CA$2,491.82</div>
                                </div>
                              </div>
                              <div className="col">
                                <div className="badge text-bg-light w-100 sales-data p-3 text-start">
                                  <label>
                                    {t("supplier.sidebar.Per_Order_Average")}
                                  </label>
                                  <div className="amount">CA$2,491.82</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-7">
                        <div className="card graph-card height-100">
                          <div className="card-body">
                            <div className="row mb-3">
                              <div className="col">
                                <h6 className="card-title">
                                  {t("supplier.sidebar.heading")}
                                </h6>
                              </div>
                              <div className="col text-end">
                                <select
                                  name=""
                                  id=""
                                  className="btn btn-outline-black btn-sm text-start"
                                >
                                  <option value="" selected>
                                    {t("supplier.sidebar.yearly")}
                                  </option>
                                  <option value="">
                                    {t("supplier.sidebar.monthly")}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <LineChart />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col mb-3 mb-sm-0">
                        <div className="card" style={{ maxHeight: "40rem" }}>
                          <div className="card-body">
                            <TopProducts accessToken={accessToken} />
                          </div>
                        </div>
                      </div>

                      <div className="col mb-3 mb-sm-0">
                        <div className="card" style={{ maxHeight: "40rem" }}>
                          <div className="card-body">
                            <TopRetailers accessToken={accessToken} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="order-tab-pane"
                    role="tabpanel"
                    aria-labelledby="order-tab"
                    tabindex="0"
                  >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Rem esse hic harum, maxime adipisci aliquam, quos aliquid
                    labore sit, accusamus quisquam quidem ducimus sequi ab id
                    sed mollitia voluptatum doloremque!Lorem ipsum dolor sit,
                    amet consectetur adipisicing elit. Rem esse hic harum,
                    maxime adipisci aliquam, quos aliquid labore sit, accusamus
                    quisquam quidem ducimus sequi ab id sed mollitia voluptatum
                    doloremque!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
