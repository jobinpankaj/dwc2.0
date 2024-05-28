import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import modalIcon from "../../assets/images/modalIcon.png";
import infoVector from "../../assets/images/info-Vector.png";
// import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import Map from "../../../CommonComponents/MultipleAddressMap";
import "../../assets/css/custom-scroll.css";
import "../../assets/css/custom-scroll.css";
// import '../../assets/css/dashboard.css'
import "../../assets/scss/dashboard.scss";
// import useAuthInterceptor from "../../../utils/apis";

import { toast } from "react-toastify";
import { Form, Modal } from "react-bootstrap";
import { Oval } from "react-loader-spinner";
import Autocomplete from "react-autocomplete";
import TextInput from "react-autocomplete-input";
import useAuthInterceptor from "../../../utils/apis";
import { useTranslation } from "react-i18next";
import Info from "../../../CommonComponents/Dashboard/RetailorInfo";
import imageNotAvailable from "../../../assets/images/Image_not_available.png";
import { Link } from 'react-router-dom';
import { Popup } from "../../../CommonComponents/NotificationPopup/notification";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import RadialChart from "../../../CommonComponents/Charts/RadialChartR";
import LineChart from "./Partials/LineChart";




const Dashboard = (userType) => {
  const { t } = useTranslation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchSupplier, setSearchSupplier] = useState("");
  const [searchSupplierError, setSearchSupplierError] = useState("");
  const [supplierList, setSupplierlist] = useState([""]);

  const [supplierId, setSupplierId] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [notes, setNotes] = useState("");
  const [isItemHovered, setIsItemHovered] = useState(false);
  const [show, setShow] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [mapSupplierList, setMapSupplierList] = useState([]);
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState("");
  const accessToken = localStorage.getItem("retailer_accessToken");
  const apis = useAuthInterceptor();
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSupplier, setSupplier] = useState("");
  // const username = localStorage.getItem(`${currentUser}_fullName`);
  // console.log('current user name---------------',username);

  const inputRef = useRef(null);
  const supplierRef = useRef(null);
  const scrollTosupplier = () => supplierRef.current.scrollIntoView();

  let currentPath = window.location.pathname;
  let pathSplit = currentPath.split("/");
  let users = ["supplier", "retailer", "distributor"];
  let currentUser = pathSplit[1];
  console.log("current user from dashboard---------", currentUser);
  const username = localStorage.getItem(`${currentUser}_fullName`);
  const userImg = localStorage.getItem(`${currentUser}_userImg`);

  const [open, setOpen] = useState(false);


  const handleElementClick = (event, supplier) => {
    setIsPopupOpen(false);
    setAnchorEl(event.currentTarget); // Set the clicked element as the anchor
    setSupplier(supplier);
    setSupplierId(supplier.id);
    setIsPopupOpen(true); // Toggle the popup
  };

    // eslint-disable-next-line no-unused-vars
    const handlePopupToggle = (event) => {
      setIsPopupOpen((prev) => !prev);
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

  useEffect(() => {
    if (show) {
      const timeoutId = setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  });
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setSearchSupplierError("");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        permission: "supplier-view",
      },
    };
    apis
      .get(`/retailer/suppliersAllList`, config)
      .then((res) => {
        setMapSupplierList(res.data.data);
        console.log("res.data.data------", res.data.data);
      })
      .catch((err) => {
      });
  }, []);


  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  useEffect(() => {
    if (!accessToken) {
      navigate("/retailer/login", {
        state: {
          url: "/retailer/dashboard",
        },
      });
    }
  }, [accessToken, navigate]);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        permission: "dashboard-view",
      },
    };
    apis
      .get("retailer/getOrderListOnDashboard", config)
      .then((res) => {
        setOrders(res.data.data.orders);
      })
      .catch((err) => {
        if (err.message !== "revoke") {
          toast.error("Something went wrong !! Please try again later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, []);

  // if(currentUser=="retailer"|| currentUser=="supplier" || currentUser=="distributor"){
  //   userType=currentUser;
  // }
  // else{
  //   userType="admin";
  // }

  console.log(supplierId, showNoteModal, "fgdbfghnb");

  const searchProduct = (keyword) => {
    setProductList([]);
    setKeyword(keyword);
    if (keyword.length >= 3) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          permission: `marketplace-view`,
        },
      };
      apis
        .post(`retailer/getSupplierProductList?search=${keyword}`, {}, config)
        .then((res) => {
          setProductList(res.data.data);
        })
        .catch((err) => {
          if (err.message !== "revoke") {
            toast.error("Something went wrong!", {
              autoClose: 1000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };


  const handleSupplierDropdown = (full_name, id) => {
    setSearchSupplier(full_name);
    setSupplierId(id);
    setShowNote(true);
    setDropdownShow(false);
    setShowNote(true);
    setDropdownShow(false);
  };

  const handleSupplierSearch = (e) => {
    setSupplierId(0);
    setShowNote(false);
    setSearchSupplierError("");
    setSearchSupplier(e);

    setSearchSupplierError("");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        permission: "dashboard-view",
      },
    };
    if (e.length > 2) {
      apis
        .get(`retailer/getLocalSuppliers?search=${e}`, config)
        .then((res) => {
          setSupplierlist(res.data.data);
          setDropdownShow(true);
        })
        .catch((err) => {
          if (err.message !== "revoke") {
            toast.error("Something went wrong !! Please try again later", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    } else {
      setSupplierlist([]);
    }
  };
  const removeModal = () => {
    setShowNoteModal(false);
    setNotes("");
  };
  const handleSendNote = (e) => {
    setLoader(true);
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        permission: "dashboard-view",
      },
    };
    const bodyData = {
      supplier_id: supplierId,
      request_note: notes,
    };
    apis
      .post("retailer/sendRequestToSupplier", bodyData, config)
      .then((res) => {
        setShowNoteModal(false);
        setShow(true);
        setLoader(false);
        setSearchSupplier("");
        setSupplierId();
        setNotes("");
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error("Something went wrong !! Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        setLoader(false);
      }
      });
  };
  const formatDate = (createdDate) => {
    const inputDatetime = new Date(createdDate);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = inputDatetime.getDate();
    const month = months[inputDatetime.getMonth()];
    const year = inputDatetime.getFullYear();
    const hour = inputDatetime.getHours();
    const minute = inputDatetime.getMinutes();
    const amOrPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${day} ${month} ${year} | ${formattedHour}:${minute
      .toString()
      .padStart(2, "0")} ${amOrPm}`;
  };

  const scrollToSuggestedSupplier = () => {
    const suggestedSupplier = document.getElementById('suggested-supplier');
    if (suggestedSupplier) {
      suggestedSupplier.scrollIntoView({ behavior: 'smooth' });
    }
  };
  if(currentUser=="retailer"|| currentUser=="supplier" || currentUser=="distributor"){
    userType=currentUser;
  }
  else{
    userType="admin";
  }

  // const suggestedSupplier = [
  //   { id: 1, imgSource: "https://picsum.photos/200", supplierName: "demo" },
  //   { id: 2, imgSource: "https://picsum.photos/200", supplierName: "test" },
  //   { id: 3, imgSource: "https://picsum.photos/200", supplierName: "test" },
  //   { id: 4, imgSource: "https://picsum.photos/200", supplierName: "test" },
  //   { id: 5, imgSource: "https://picsum.photos/200", supplierName: "test" },
  //   { id: 6, imgSource: "https://picsum.photos/200", supplierName: "test" },
  //   { id: 7, imgSource: "https://picsum.photos/200", supplierName: "demo" },
  //   { id: 8, imgSource: "https://picsum.photos/200", supplierName: "demo" },
  //   { id: 9, imgSource: "https://picsum.photos/200", supplierName: "demo" },
  //   { id: 10, imgSource: "https://picsum.photos/200", supplierName: "demo" },
  //   { id: 11, imgSource: "https://picsum.photos/200", supplierName: "demo" },
  // ];

  return (
    <>
      <div class="container-fluid page-wrap retailer-dashboard">
        <div class="row height-inherit">
          <Sidebar userType={"retailer"} />

          <div class="col main p-0">
            <Header userType={"retailer"}
              title={t("retailer.dashboard.header")}
              updateSidebar={updateSidebar}
            />
            <div class="container-fluid page-content-box px-3 px-sm-4">
              <div className="row">
                <div className="col">
                  <div className="w-100 welcomeMSG">
                    {t("retailer.dashboard.welcome_retailer")}
                    {username}
                  </div>
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
                  {/* [Card 1] */}
                  {orders.length < 1 && (
                    // <div class="card retailer-Meta-Info mb-3">
                    //   <div class="card-body">
                    //     <div className="card-title">
                    //       {t("retailer.dashboard.dashboard_card1")}
                    //     </div>
                    //     <ul class="list-group list-group-flush">
                    //       <li class="list-group-item">
                    //         {t("retailer.dashboard.dashboard_card_p")}
                    //         <p className="custom-atag">

                    //           {t("retailer.dashboard.dashboard_card_pp")}
                    //         </p>{" "}
                    //         {t("retailer.dashboard.dashboard_card_ppp")}
                    //       </li>
                    //       <li class="list-group-item">
                    //         {t("retailer.dashboard.dashboard_card_p1")}
                    //         <p className="custom-atag">
                    //           {t("retailer.dashboard.dashboard_card_p11")}
                    //         </p>
                    //         .
                    //       </li>
                    //       <li class="list-group-item">
                    //         {t("retailer.dashboard.dashboard_card_p2")}
                    //         <p className="custom-atag">{t("retailer.dashboard.dashboard_card_p22")}</p>
                    //       </li>
                    //       <li class="list-group-item">
                    //         {t("retailer.dashboard.dashboard_card_p3")}
                    //         <p className="custom-atag">
                    //           {t("retailer.dashboard.dashboard_card_p33")}
                    //         </p>
                    //       </li>
                    //     </ul>
                    //   </div>
                    // </div>
                    <div class="card retailer-Meta-Info mb-3">
                    <div class="card-body">
                      <div className="card-title">
                        {t("retailer.dashboard.dashboard_card1")}
                      </div>
                      <ul class="list-group list-group-flush">

                      <li class="list-group-item">
                          {t("retailer.dashboard.dashboard_card_p4")}
                          <p className="custom-atag" >

                          <Link className="custom-atag" to="/retailer/my-account">
                         {t("retailer.dashboard.dashboard_card_p44")}
                          </Link>
                          </p>{" "}
                        </li>

                        {/* <li class="list-group-item">
                          {t("retailer.dashboard.dashboard_card_p")}
                          <p className="custom-atag">

                            {t("retailer.dashboard.dashboard_card_pp")}
                          </p>{" "}
                          {t("retailer.dashboard.dashboard_card_ppp")}
                        </li> */}
                        <li class="list-group-item">
                          {t("retailer.dashboard.dashboard_card_p1")}
                          <p className="custom-atag" onClick={() => setOpen(true, )}>
                            {t("retailer.dashboard.dashboard_card_p11")}
                          </p>
                          .
                        </li>
                        {open ? <Popup text={userType} closePopup={() => setOpen(false)} /> : null}
                        <li class="list-group-item">
                          {t("retailer.dashboard.dashboard_card_p2")}
                          <p className="custom-atag">
                          <Link className="custom-atag" onClick={scrollToSuggestedSupplier}>
                            {t("retailer.dashboard.dashboard_card_p22")}
                          </Link>
                            </p>
                        </li>
                        <li class="list-group-item">
                          {t("retailer.dashboard.dashboard_card_p3")}
                          <p className="custom-atag">

                            <Link className="custom-atag" to="/retailer/supplier-list">
                            {t("retailer.dashboard.dashboard_card_p33")}
                          </Link>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  )}
                  {/* [/Card 2] */}

                  {/* [Alert] */}
                  {/* <div
                    class="alert alert-purple d-flex align-items-center justify-content-between my-4"
                    role="alert"
                  >
                    <div className="alertMsg d-inline-flex align-items-center">
                      <img className="icon me-2" src={infoVector} /> Amet minim
                      mollit non deserunt ullamco est sit aliqua dolor do amet
                      sint.
                    </div>
                    <a className="btn btn-outline-purple btn-sm">
                      View
                    </a>
                  </div> */}
                  {/* [/Alert] */}

                  {/* [Search Box] */}
                  <div class="card retailer-searchBox mb-4">
                    <div class="card-body">
                      <div className="card-title">
                        {t("retailer.dashboard.search_marketplace")}
                      </div>
                      <form class="row row-cols-lg-auto searchBox-form g-3 align-items-center">
                        <div class="col-auto">
                          <div class="input-group position-relative">
                            <input
                              list="browsers"
                              onChange={(e) => searchProduct(e.target.value)}
                              className="form-control rounded-pill"
                              name="browser"
                              id="browser"
                              value={keyword}
                              placeholder={t(
                                "retailer.dashboard.search_marketplace_placeholder"
                              )}
                            />
                            {productList.length > 0 && (
                              <ul
                                id="suggestions"
                                className="list-group w-100 searchListBx custom-scrollbar position-absolute top-100 bg-white"
                              >
                                {productList.map((product) => (
                                  <li
                                    key={product.id}
                                    className="list-group-item dropdown-item pe-pointer"
                                    onClick={() =>
                                      navigate(
                                        `/retailer/marketplace/product-details?product_id=${7}&supplier_id=${9}`
                                      )
                                    }
                                  >
                                    {product.product_name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        <div class="col-auto">
                          <button
                            type="button"
                            onClick={() =>
                              navigate("/retailer/marketplace", {
                                state: { search: keyword },
                              })
                            }
                            class="btn btn-purple"
                          >
                            {t("retailer.dashboard.see_all")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* [/Search Box] */}

                  {/* [Map Card] */}
                  <div className="card map-card retailer-searchBox">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6 col-lg-6">
                          <div className="card-title">
                            {t("retailer.dashboard.local_supplier")}
                          </div>
                          <form class="row row-cols-lg-auto g-3 searchBox-form align-items-center mb-4">
                            <div class="col-auto">
                              <div className="input-group dropdown searchListType">
                                <input
                                  type="text"
                                  className="form-control rounded-pill"
                                  id=""
                                  value={searchSupplier}
                                  onChange={(e) =>
                                    handleSupplierSearch(e.target.value)
                                  }
                                  placeholder={t(
                                    "retailer.dashboard.search_supplier_placeholder"
                                  )}
                                />
                                {supplierList.length > 0 && (
                                  <ul
                                    className={`w-100 searchListBx custom-scrollbar ${
                                      dropdownShow ? "d-block" : "d-none"
                                    }`}
                                  >
                                    {" "}
                                    {supplierList.map((s) => (
                                      <li
                                        className="dropdown-item pe-pointer"
                                        key={s.id}
                                        onClick={() =>
                                          handleSupplierDropdown(
                                            s.full_name,
                                            s.id
                                          )
                                        }
                                      >
                                        {s.full_name}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              {searchSupplierError !== "" ? (
                                <p className="error-label mt-2">
                                  {searchSupplierError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div class="col-auto align-self-start">
                              <button
                                type="button"
                                class="btn btn-purple"
                                // data-bs-toggle="modal"
                                // data-bs-target="#addNoteModal"
                                disabled={!showNote}
                                onClick={() => setShowNoteModal(true)}
                              >
                                {t("retailer.dashboard.send_request")}
                              </button>
                            </div>
                          </form>

                          <div className="w-100 map-box">
                            {mapSupplierList.length > 0 && (
                              <Map
                                userInformation={mapSupplierList}
                                showModal={setShowNoteModal}
                                setSupplierId1={setSupplierId}
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6 col-lg-6">
                          <div className="card shadow-none">
                            <div class="card-header bg-white border-0">
                              <div className="row align-items-center">
                                <div className="card-title mb-0 col-sm-5">
                                  {t("retailer.dashboard.recent_orders")}
                                </div>
                                <div className="col-sm-7 d-flex align-items-center justify-content-end">
                                  <NavLink
                                    className="btn btn-outline-purple btn-sm me-3"
                                    to={"/retailer/order-management"}
                                  >
                                    {t("retailer.dashboard.view_all")}
                                  </NavLink>
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              {/* [Recent Order List] */}
                              <div className="col-12 order-progress-list recentOrders">
                                {/* [Order 1] */}
                                {orders.length > 0 &&
                                  orders.map((order) => (
                                    <NavLink
                                      to={`/retailer/order-detail/${order.id}`}
                                    >
                                      <div className="order-progress-step d-flex mb-3 align-items-center">
                                        <div className="progress-inner d-flex align-items-center">
                                          {/* <img src={newOrder} className="me-3" alt="" /> */}
                                          <div className="row w-100 justify-content-between align-items-center">
                                            <div className="col-sm-8">
                                              <div className="dateTime">
                                                {formatDate(order.created_at)}
                                              </div>
                                              <div className="w-100 order-metaInfo mt-2 text-uppercase">
                                                <span>
                                                  #{order.order_reference}
                                                </span>{" "}
                                                {
                                                  order.supplier_information
                                                    .full_name
                                                }
                                              </div>
                                            </div>
                                            <div className="col-sm-4 d-inline-flex justify-content-end">
                                              <span
                                                class={`badge  ${
                                                  order?.status ===
                                                    "Cancelled" && "text-bg-red"
                                                } ${
                                                  order?.status === "On Hold" &&
                                                  "text-bg-orange"
                                                } ${
                                                  order?.status === "Approved"
                                                    ? "text-bg-green"
                                                    : "text-bg-green"
                                                } ${
                                                  order?.status === "Pending" &&
                                                  "text-bg-orange"
                                                }`}
                                              >
                                                {order?.status}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </NavLink>
                                  ))}
                                {/* [/Order 1] */}
                              </div>
                              {/* [/Recent Order List] */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Map Card] */}

                  <div
                    ref={supplierRef}
                    className="card map-card retailer-searchBox my-4"
                  >
                    <div className="card-body">
                      <div className="card-title" id="suggested-supplier">

                        {t("retailer.dashboard.suggested_supplier")}
                      </div>
                      <div className="supplier_logoBox" >
                        {mapSupplierList.map((supplier) => {
                          return (
                            <div className="supplier_logo" >
                              {/* <img src={supplier.user_image} alt="Image"></img> */}
                              <img
                                    src={supplier.user_image || imageNotAvailable}
                                    onError={(e) => {
                                      e.target.src = imageNotAvailable; // Replace with the default image source
                                    }}
                                    className="card-img-top"
                                     alt=""
                                     onClick={(event) =>
                                      handleElementClick(event, supplier)
                                    }
                                    />
                                     <Popper
                                open={isPopupOpen}
                                anchorEl={anchorEl}
                                placement="top"
                                style={{ zIndex: '100'}}>
                               <Box>
                                <span className="close-popper" onClick={() => setIsPopupOpen(false)}>X</span>

                                <p className="name-tag mb-1">
                                  <span>{selectedSupplier.first_name}</span>&nbsp;<b></b>&nbsp;<span>{selectedSupplier.last_name}</span></p>
                                <span>2389 Rue Principale, Dunham, QC J0E 1M0, Canada</span>

                                  <div className="text-center">
                                    <button
                                      type="button"
                                      class="btn btn-purple"
                                      onClick={() => {setShowNoteModal(true);setIsPopupOpen(false)}}
                                    >
                                      {t("retailer.dashboard.send_request")}
                                    </button>
                                  </div>
                                </Box>

                                <Box
                                  sx={{
                                    content: '""',
                                    position: "absolute",
                                    bottom: "-12px",
                                    left: "45%",
                                    height: "12px",
                                    width: "25px",
                                    backgroundColor: "#fff",
                                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                                  }}
                                />
                              </Popper>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* [Add Note Modal] */}
      <div
        class="modal fade"
        id="addNoteModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-hidden="true"
        se
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content p-3">
            <div class="modal-header justify-content-start border-0">
              <h5 class="modal-title">{t("retailer.dashboard.add_note")}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {/* <div class="modal-body text-center border-top">
              <textarea
                className="addNoteTextarea"
                placeholder="Add Note Here"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </div> */}
            <div className="modal-footer justify-content-start">
              <button type="button" className="btn btn-outline-black me-2">
                {t("retailer.dashboard.cancel")}
              </button>
              <button
                type="button"
                className="btn btn-purple"
                // data-bs-target="#noteSubmittedModal"
                // data-bs-toggle="modal"
                onClick={(e) => handleSendNote(e)}
              >
                {t("retailer.dashboard.submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal fade"
        show={showNoteModal}
        centered
        onHide={() => {
          setShowNoteModal(false);
          setIsPopupOpen(false);
          setShowNote('');
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("retailer.dashboard.add_note")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            ref={inputRef}
            className="addNoteTextarea"
            placeholder="Add Note Here"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-outline-black me-2"
            onClick={removeModal}
          >
            {t("retailer.dashboard.cancel")}
          </button>

          {loader ? (
            <Oval color="purple" height={40} width={40} />
          ) : (
            <button
              type="button"
              className="btn btn-purple"
              // data-bs-target="#noteSubmittedModal"
              // data-bs-toggle="modal"
              onClick={(e) => handleSendNote(e)}
            >
              {t("retailer.dashboard.submit")}
            </button>
          )}
        </Modal.Footer>
      </Modal>
      {/* [/Add Note Modal] */}

      {/* [Modal] */}
      {/* <Modal class="modal fade" show={show}
        centered
        onHide={() => { setShow(false) }}>
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content p-3">
            <div class="modal-header border-0">
              <h5 class="modal-title">
                <img src={modalIcon} />
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center">
              Your request has been successfully submitted to the chosen supplier. You will receive notification regarding the status of the request.
            </div>
          </div>
        </div>
      </Modal> */}
      {/* <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={modalIcon} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {t("retailer.dashboard.send_request_confirmation")}
        </Modal.Body>
      </Modal> */}
      {/* [/Modal] */}
      <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={modalIcon} alt="Modal Icon" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("retailer.dashboard.send_request_confirmation")}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Dashboard;
