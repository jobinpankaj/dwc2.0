import React, { useState } from "react";
import calendar from "../../assets/images/calender.png";
import totalUsers from "../../assets/images/total-users.png";
import graph from "../../assets/images/graph.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
// import '../../assets/css/dashboard.css'
import "../../assets/scss/dashboard.scss";
import { useTranslation } from "react-i18next";
import Chart from "react-google-charts";
import ReactDatePicker from "react-datepicker";
import { useEffect } from "react";
import useAuthInterceptor from "../../../utils/apis";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { SUPPLIER_VIEW } from "../../../Constants/constant";
import apis from "../../../utils/apis";
// tabcontent
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import en from "date-fns/locale/en-US"; // Import English localization
import fr from "date-fns/locale/fr";

import TopProducts from "./Partials/TopProducts";
import TopRetailers from "./Partials/TopRetailers";
import LineChart from "./Partials/LineChart";
import RadialChart from "../../../CommonComponents/Charts/RadialChartD";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Info from "../../../CommonComponents/Dashboard/DistributorInfo";
registerLocale("en", en);
registerLocale("fr", fr);

setDefaultLocale("es");
export const data = [
  ["Orders", "Total per month"],
  ["Approved", 11],
  ["Pending", 2],
  ["Paid", 2],
];

const a = 10;
export const options = {
  // is3D: true,
  colors: ["#9370DB", "#27C26C", "#EFCC12"],
  with: "100%",
  height: "100%",
  chartArea: { left: "10%", top: "10%", width: "80%", height: "80%" },
  legend: { position: "none" },
};
// export const salesData = [
//   ["Element", "Sales", { role: "style" }],
//   ["Copper", 8.94, "#b87333"], // RGB value
//   ["Silver", 10.49, "silver"], // English color name
//   ["Gold", 19.3, "gold"],
//   ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
// ];
export const comboData = [
  ["Month", "Approved", "Pending", "Paid"],
  ["2004/05", 165, 938, 522],
  ["2005/06", 135, 1120, 599],
  ["2006/07", 157, 1167, 587],
  ["2007/08", 139, 1110, 615],
  ["2008/09", 136, 691, 629],
];

export const comboOptions = {
  with: "100%",
  height: "100%",
  chartArea: { left: "10%", top: "10%", width: "80%", height: "80%" },
  vAxis: { title: "Value" },
  hAxis: { title: "Days" },
  seriesType: "bars",
  // series: { 5: { type: "line" } },
  legend: "none",
  vAxis: {
    format: "CA$#", // This will add "CA$" to the axis labels
  },
  series: {
    0: { color: "#9370DB" }, // Approved
    1: { color: "#27C26C" }, // Pending
    2: { color: "#EFCC12" }, // Paid

    3: { type: "line", color: "#FF6347" }, // Average (line series)
  },
};
const dateFormat = "MM/dd/yyyy";
const Dashboard = () => {
  const apis = useAuthInterceptor();
  const [key, setKey] = useState("Value");
  const { t, i18n } = useTranslation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [supplierList, setSupplierList] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [selectedSupplierName, setSelectedSupplierName] = useState("");

  const accessToken = localStorage.getItem("distributor_accessToken");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  // const handleChangeLanguage = (newLanguage) => {
  //   i18n.changeLanguage(newLanguage);

  //   // Set the default locale for react-datepicker based on the selected language
  //   if (newLanguage === "fr") {
  //     setDefaultLocale("fr");
  //   } else {
  //     setDefaultLocale("en-US");
  //   }
  // };
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        permission: "distributor-view",
      },
    };
    apis
      .get("distributor/getLinkedSuppliers", config)
      .then((res) => {
        console.log(res);
        setSupplierList(res.data.data);
      })
      .catch((err) => {
        // if(error.message !== "revoke"){
        console.log(err);
        // toast.error(err.response.data.message, {
        //     autoClose: 3000,
        //     position: toast.POSITION.TOP_CENTER,
        // });
        // }
      });
  }, [accessToken]);
  return (
    <div class="container-fluid page-wrap dashboard">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header
            title={t("distributor.sidebar.dashboard")}
            updateSidebar={updateSidebar} userType={"distributor"}
          />
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

                            <LineChart accessToken={accessToken} />
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
