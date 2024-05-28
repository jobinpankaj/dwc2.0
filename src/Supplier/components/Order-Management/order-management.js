import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import calendar from "../../assets/images/calender.png";
import filter from "../../assets/images/filter-icon.png";
import { Modal } from "react-bootstrap";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { styled } from "@mui/system";
import DatePicker from "react-datepicker";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss";
import { NavLink } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { ORDER_EDIT, ORDER_VIEW } from "../../../Constants/constant";

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

const OrderManagement = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("supplier_accessToken");
  const [orderList, setOrderList] = useState([]);
  const [targetId, setTargetId] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [ordersStatusCount, setOrdersStatusCount] = useState({});
  const [statusError, setStatusError] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [dateError, setDateError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [retailerList, setRetailerList] = useState("");
  const [searchRetailer, setSearchRetailer] = useState("");
  const [nameList, setNameList] = useState("");
  const [retailerId, setReatilerId] = useState(0);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [render, setRender] = useState(false);
  const [distributorsList, setDistributorsList] = useState("");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedRetailer, setSelectedRetailer] = useState("");

  const [searchRetailerFilter, setSearchRetailerFilter] = useState("");
  const [distinctRetailerInfoArray, setDistinctRetailerInfoArray] = useState(
    []
  );
  const [distinctList, setDistinctList] = useState([]);
  const [dropdownShowRetailer, setDropdownShowRetailer] = useState(false);
  const [searchDistributor, setSearchDistributor] = useState("");
  const [dropdownDistributor, setDropdownDistributor] = useState(false);
  const [distinctDistributorList, setDistinctDistributorList] = useState([]);
  const [distinctArrayDist, SetDistinctArrayDist] = useState([]);
  const [count, setCount] = useState(0);
  const [allOrderList, setAllOrderList] = useState([])
  const [searching, setSearching] = useState("")

  const [rFilterSearchDistributor, SetrFilterSearchDistributor] = useState("")
  const [distDropDown, setDistDropDown] = useState(false)
  const [rDistId, setRDistId] = useState("")
  const [filterDistributorList, setFilterDistributorList] = useState([])
  const [statusValue, setstatusValue] = useState("")
  const [reload, setReload] = useState(false)

  // New changes
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "retailer-view",
      },
    };

    // let paramObj = {};

    // if (search !== "") {
    //   paramObj["search"] = search;
    // }

    // if (selectedRetailer !== "") {
    //   paramObj["filter_user_id"] = selectedRetailer;
    // }

    // config["params"] = paramObj;

    apis
      .get("/supplier/retailerList", config)
      .then((res) => {
        setLoading(false);
        if (res.data.success === true) {
          setRetailerList(res.data.data);
          console.log("Retailer", res.data.data);
          if (render == false) {
            setNameList(res.data.data);
            setRender(true);
          }
        } else {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.message !== "revoke") {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [nameList]);
  const handleRetailerSearch = (e) => {
    setReatilerId(0);
    // setInvitationStatus(false)
    // setDropdownShow(false)
    setSearchRetailer(e);

    const matchingStrings = retailerList.filter((str) => {
      const fullNameMatch = str.full_name
        .toLowerCase()
        .includes(e.toLowerCase());
      const addressMatch =
        str.user_main_address &&
        str.user_main_address.address_1 &&
        str.user_main_address.address_1.toLowerCase().includes(e.toLowerCase());
      return fullNameMatch || addressMatch;
    });

    setNameList(matchingStrings);
    console.log(matchingStrings, "dada");
    setDropdownShow(true);
  };
  const handleRetailerDropdown = (full_name, id) => {
    setSearchRetailer(full_name);
    // setInvitationStatus(true)
    setReatilerId(id);
    // setShowNote(true);
    setDropdownShow(false);
    // setShowNote(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const sigma = "\u03A3";

  function MyComponent() {
    return <div>{sigma}</div>;
  }

  const handleOrderSelect = (e) => {
    if (e.target.checked) {
      setTargetId([...targetId, parseInt(e.target.value)]);
    } else {
      let dummy = targetId;
      dummy = dummy.filter(function (item) {
        return item !== parseInt(e.target.value);
      });
      setTargetId(dummy);
    }
  };

  const handleUpdateStatus = () => {
    let dateValid = true,
      statusValid = true;

    if (selectedStatus === "") {
      setStatusError("Status is required.");
      statusValid = false;
    }

    if (!startDate && selectedStatus === "1") {
      setDateError("Date is required.");
      dateValid = false;
    }

    if (!dateValid || !statusValid) {
      console.log("validation error");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "order-edit",
        },
      };

      const bodyData = {
        order_id: targetId.toString(),
        action: selectedStatus,
      };

      if (selectedStatus === "1") {
        bodyData["expected_delivery_date"] =
          moment(startDate).format("YYYY-MM-DD");
      }
      setShow(false);
      apis
        .post("/supplier/order/status/update", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            setTargetId([]);
            setUpdate(!update);
            toast.success("Status updated for selected orders.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Could not update status. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if (error.message !== "revoke") {
            toast.error("Could not update status. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Projectlanguageid: 1,
      },
    };

    apis
      .get("/getAllDistributors", config)
      .then((res) => {
        if (res.data.success === true) {
          let newData = [];
          // console.log("new dist",res.data.data)
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].comapany_name) {
              newData.push(res.data.data[i]);
            }
          }
          console.log("Distributor data", newData);
          setDistributorsList(newData);
          setFilterDistributorList(newData)
        } else {
          toast.error(
            "Could not fetch distributors list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error(
            "Could not fetch distributors list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });
  }, []);

  useEffect(() => {
    if (hasPermission(ORDER_VIEW)) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: `order-view`,
        },
      };

      let paramObj = {};

      if (search !== "") {
        paramObj["search"] = search;
      }

      if (selectedSupplier !== "") {
        paramObj["filter_user_id"] = selectedSupplier;
      }

      config["params"] = paramObj;

      apis
        .get("/supplier/orders", config)
        .then((res) => {
          setLoading(false);
          if (res.data.success === true) {
            setOrderList(res.data.data);
            setAllOrderList(res.data.data) // In useffect ("/supplier/orders")
          } else {
            toast.error("Could not fetch order list. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.message !== "revoke") {
            toast.error("Could not fetch order list. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });

      apis
        .get("/supplier/ordersStatusCount", config)
        .then((res) => {
          setLoading(false);
          if (res.data.success === true) {
            setOrdersStatusCount(res.data.data);
          } else {
            toast.error(
              "Could not fetch order status count. Please try again later.",
              {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              }
            );
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.message !== "revoke") {
            toast.error(
              "Could not fetch order status count. Please try again later.",
              {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              }
            );
          }
        });
    }
  }, [search, update, reload]);

  let data;
  if (rowsPerPage > 0) {
    data = orderList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = orderList;
  }

  useEffect(() => {
    // Perform the count calculation when data changes
    if (orderList && orderList.length > 0) {
      let newCount = 0;
      orderList.forEach((ele) => {
        if (ele.status === 'Unpaid') {
          const createdDate = new Date(ele.created_at);
          const currentDate = new Date();
          const monthDiff = Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24 * 30));
          if (monthDiff >= 2) {
            newCount++; // Increment newCount if conditions are met
          }
        }
      });
      setCount(newCount); // Update count state variable
    }
  }, [orderList]);


  const submit1 = (createdDate) => {
    const timediifMili = startDate - new Date(createdDate);
    const secDiff = Math.floor(timediifMili / 1000);
    const minDiff = Math.floor(timediifMili / (1000 * 60));
    const hourDiff = Math.floor(timediifMili / (1000 * 60 * 60));
    const dayDiff = Math.floor(timediifMili / (1000 * 60 * 60 * 24));
    const monthDiff = Math.floor(timediifMili / (1000 * 60 * 60 * 24 * 30));
    const yearDiff = Math.floor(
      timediifMili / (1000 * 60 * 60 * 24 * 30 * 365)
    );
    let result = "";
    if (secDiff > 0 && secDiff < 60) {
      result = `${secDiff} sec ago`;
    }
    if (minDiff > 0 && minDiff < 60) {
      result = `${minDiff} minute ago`;
    }
    if (hourDiff > 0 && hourDiff < 24) {
      result = `${hourDiff} hour ago`;
    }
    if (dayDiff > 0 && dayDiff < 30) {
      result = `${dayDiff} ${dayDiff > 1
        ? t("supplier.retailer_request.days_ago")
        : t("supplier.retailer_request.day_ago")
        }`;
    }
    if (monthDiff > 0 && monthDiff < 12) {
      result = `${monthDiff} ${monthDiff > 1
        ? t("supplier.retailer_request.months_ago")
        : t("supplier.retailer_request.month_ago")
        }`;
    }
    if (yearDiff > 0) {
      result = `${yearDiff} ${yearDiff > 1
        ? t("supplier.retailer_request.years_ago")
        : t("supplier.retailer_request.year_ago")
        }`;
    }
    return result;
  };

  const handleDistributorSearch = (e) => {
    setSelectedDistributor("");
    setSearchDistributor(e);
    const matchingStrings = distinctArrayDist.filter((x) => {
      return x?.user_profile?.company_name
        .toLowerCase()
        .includes(e.toLowerCase());
    });
    setDistinctDistributorList(matchingStrings);
  };
  const handleDistributorDropdown = (company_name, id) => {
    setSelectedDistributor(id);
    setSearchDistributor(company_name);
    setDropdownDistributor(false);
  };

  const handleRetailerFilterSearch = (e) => {
    setSelectedRetailer("");
    setSearchRetailerFilter(e);
    const matchingStrings = distinctRetailerInfoArray.filter((str) => {
      const fullNameMatch = str?.full_name
        .toLowerCase()
        .includes(e.toLowerCase());
      const addressMatch =
        str?.user_main_address &&
        str?.user_main_address.address_1 &&
        str?.user_main_address.address_1.toLowerCase().includes(e.toLowerCase());
      const businessMatch =
        str?.user_profile &&
        str?.user_profile.business_name &&
        str?.user_profile.business_name.toLowerCase().includes(e.toLowerCase());
      const groupMatch =
        str?.user_profile &&
        str?.user_profile.group_name &&
        str?.user_profile.group_name.toLowerCase().includes(e.toLowerCase());
      return fullNameMatch || addressMatch || businessMatch || groupMatch;
    });

    setDistinctList(matchingStrings);
  };
  const handleRetailerFilterDropdown = (full_name, id) => {
    setSearchRetailerFilter(full_name);
    setSelectedRetailer(id);
    setDropdownShowRetailer(false);
  };
  useEffect(() => {
    // console.log("AAAData", orderList)
    const uniqueRetailerIds = new Set();
    const uniqueRetailerInfoArray = [];

    orderList.forEach((x) => {
      if (!uniqueRetailerIds.has(x.retailer_information?.id)) {
        uniqueRetailerIds.add(x.retailer_information?.id);
        uniqueRetailerInfoArray.push(x?.retailer_information);
      }
    });
    setDistinctRetailerInfoArray(uniqueRetailerInfoArray);
    setDistinctList(uniqueRetailerInfoArray);
    const uniqueDistributorIds = new Set();
    const uniqueDistributorArray = [];

    // Loop through orderList
    orderList.forEach((x) => {
      x.order_distributors.forEach((distributor) => {
        if (!uniqueDistributorIds.has(distributor?.distributor_info?.id)) {
          uniqueDistributorIds.add(distributor?.distributor_info?.id);
          uniqueDistributorArray.push(distributor?.distributor_info);
        }
      });
    });
    setDistinctDistributorList(uniqueDistributorArray);
    SetDistinctArrayDist(uniqueDistributorArray);
  }, [orderList]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: `order-view`,
      },
    };

    apis
      .get(
        `/supplier/orders?distributor_id=${selectedDistributor}&retailer_id=${selectedRetailer}&to_date=${toDate}&from_date=${fromDate}`,
        config
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success === true) {
          setOrderList(res.data.data);
        } else {
          toast.error("Could not fetch order list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.message !== "revoke") {
          toast.error("Could not fetch order list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [selectedDistributor, selectedRetailer, toDate, fromDate]);

  const totalPrice = (arr) => {
    let total = 0;
    total = arr.reduce((accumulator, currentValue) => {
      const currentValueTotal =
        currentValue?.product?.pricing?.price * currentValue?.quantity || 0;
      return accumulator + currentValueTotal;
    }, 0);
    return total?.toFixed(2);
  };

  const handlePayment = (e) => {
    const order_id = e;
    const status = "6"
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "order-edit",
      },
    };
    const bodyData = {
      order_id: order_id,
      action: status,
    };

    setShow(false);
    apis
      .post("/supplier/order/status/update", bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          setTargetId([]);
          setUpdate(!update);
          toast.success("Status updated for selected orders.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Could not update status. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error("Could not update status. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    console.log("-----------------------payment working");
  };
  // ---search--event------
  const handleSearchChange = (e) => {
    const searchKey = e.target.value;
    setSearching(searchKey);
    console.log("dsfa", allOrderList)
    const filteredOrder = allOrderList.filter((x) => {
      const matchBuisnnesName =
        x.retailer_information &&
        x.retailer_information.user_profile &&
        x.retailer_information.user_profile.business_name &&
        x.retailer_information.user_profile.business_name.toLowerCase().includes(searchKey.toLowerCase());
      const addressMatching =
        x.retailer_information &&
        x.retailer_information.user_main_address &&
        x.retailer_information.user_main_address.address_1 &&
        x.retailer_information.user_main_address.address_1.toLowerCase().includes(searchKey.toLowerCase());

      const orderReference =
        x.order_reference.toLowerCase().includes(searchKey.toLowerCase())

      const statusMatching =
        x.status.toLowerCase().includes(searchKey.toLowerCase())
      return matchBuisnnesName || addressMatching || orderReference || statusMatching
    })
    console.log("==================================", filteredOrder);
    setOrderList(filteredOrder);
  };

  const handleRFilterDistSearch = (e) => {
    setRDistId("")
    SetrFilterSearchDistributor(e)
    const matchingStrings = distributorsList.filter((x) => {
      return x.user_profile?.company_name
        .toLowerCase()
        .includes(e.toLowerCase());
    });
    setFilterDistributorList(matchingStrings);
  }

  const handleRDistDropdown = (companyName, id) => {
    setRDistId(id)
    SetrFilterSearchDistributor(companyName)
  }

  const applyRightFilter = () => {
    console.log("Showwwwww")
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: `order-view`,
      },
    };

    apis
      .get(
        `/supplier/orders?distributor_id=${rDistId}&retailer_id=${retailerId}&status=${statusValue}`,
        config
      )
      .then((res) => {
        setLoading(false);
        if (res.data.success === true) {
          setOrderList(res.data.data);
        } else {
          toast.error("Could not fetch order list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.message !== "revoke") {
          toast.error("Could not fetch order list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }




  return (
    <div className="container-fluid page-wrap order-manage">
      <div className="row height-inherit">
        <Sidebar userType={"supplier"} />

        <div className="col main p-0">
          <Header title={t("supplier.order_management.list.title")} />
          <LoadingOverlay
            active={loading}
            spinner
            className=""
            styles={{
              overlay: (base) => ({
                ...base,
                background: "#fefefe",
                width: "100%",
                "& svg circle": {
                  stroke: "black",
                },
              }),
            }}
          >
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row mb-3">
                <div className="col">
                  <div className="filter-row page-top-filter">
                    {/* [Page Filter Box] */}
                    <div className="filter-box">
                      {/* [/Date] */}

                      <div className="dropdown date-selector card-top-filter-box">
                        <div className="search-table form-group">
                          <button
                            className="btn search-input dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ background: "#ffffff", padding: '5px 40px', color: '#757575' }}
                          >
                            <img src={calendar} alt="" />{" "}
                            {t("supplier.order_management.list.select_date")}
                          </button>
                          <ul
                            className="dropdown-menu"
                            style={{ padding: "5px 10px" }}
                          >
                            <form>
                              <li>
                                <label>{t("supplier.order_management.list.fromDate")}</label>

                                <input
                                  type="date"
                                  value={fromDate}
                                  onChange={(e) => {
                                    setFromDate(e.target.value);
                                  }}
                                />
                              </li>
                              <li>
                                <label>{t("supplier.order_management.list.toDate")}</label>
                                <input
                                  type="date"
                                  value={toDate}
                                  onChange={(e) => {
                                    setToDate(e.target.value);
                                  }}
                                />
                              </li>
                            </form>
                          </ul>
                        </div>
                      </div>
                      <div className="dropdown date-selector card-top-filter-box">
                        <div className="search-table form-group">
                          <input
                            type="text"
                            className="search-input"
                            value={searchRetailerFilter}
                            placeholder={t("supplier.order_management.list.searchRetailer")}
                            onFocus={() => {
                              setDropdownShowRetailer(true);
                            }}
                            onBlur={() => {
                              setTimeout(() => {
                                setDropdownShowRetailer(false);
                              }, 200);
                            }}
                            onChange={(e) => {
                              handleRetailerFilterSearch(e.target.value);
                            }}
                          />

                          {distinctList.length > 0 && (
                            <ul
                              className={`w-100 searchListBx custom-scrollbar ${dropdownShowRetailer ? "d-block" : "d-none"
                                }`}
                            >
                              {" "}
                              {distinctList.map((s) => (
                                <li
                                  className="dropdown-item pe-pointer"
                                  key={s?.id}
                                  onClick={() =>
                                    handleRetailerFilterDropdown(
                                      s?.full_name,
                                      s?.id
                                    )
                                  }
                                >
                                  {s ? s.full_name ? s.full_name : "N/A" : "N/A"}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="dropdown date-selector card-top-filter-box">
                        <div className="search-table form-group">
                          <input
                            type="text"
                            className="search-input"
                            value={searchDistributor}
                            placeholder={t("supplier.order_management.list.searchDistributor")}
                            onFocus={() => {
                              setDropdownDistributor(true);
                            }}
                            onBlur={() => {
                              setTimeout(() => {
                                setDropdownDistributor(false);
                              }, 200);
                            }}
                            onChange={(e) => {
                              handleDistributorSearch(e.target.value);
                            }}
                          />
                          {distinctDistributorList.length > 0 && (
                            <ul
                              className={`w-100 searchListBx custom-scrollbar ${dropdownDistributor ? "d-block" : "d-none"
                                }`}
                            >
                              {" "}
                              {distinctDistributorList.map((s) => (
                                <li
                                  className="dropdown-item pe-pointer"
                                  key={s?.id}
                                  onClick={() =>
                                    handleDistributorDropdown(
                                      s?.user_profile?.company_name,
                                      s?.id
                                    )
                                  }
                                >
                                  {s?.user_profile?.company_name}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* [/Page Filter Box] */}

                    {/* Right Filter */}
                    <div class="dropdown right-filter">
                      <button
                        type="button"
                        class="btn dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-auto-close="outside"
                      >
                        <img src={filter} />
                        {""}
                        {t("supplier.order_management.list.filter")}
                      </button>
                      <form class="dropdown-menu p-3 ">
                        <div class="mb-3">
                          <label class="form-label">Client</label>
                          <div style={{ position: "relative" }}>
                            <button
                              className="search-btn"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <input
                              type="text"
                              value={searchRetailer}
                              placeholder="Search Retailer"
                              onChange={(e) =>
                                handleRetailerSearch(e.target.value)
                              }
                              onFocus={() => {
                                setDropdownShow(true);
                              }}
                              onBlur={() => {
                                setTimeout(() => {
                                  setDropdownShow(false)
                                }, 250);
                              }}
                            />
                          </div>
                          {nameList.length > 0 && (
                            <ul
                              className={`w-100 searchListBx custom-scrollbar ${dropdownShow ? "d-block" : "d-none"
                                }`}
                            >
                              {" "}
                              {nameList.map((s) => (
                                <li
                                  className="dropdown-item pe-pointer"
                                  key={s.id}
                                  style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    cursor: "pointer", // Optionally add cursor pointer for better UX
                                  }}
                                  onClick={() =>
                                    handleRetailerDropdown(s.full_name, s.id)
                                  }
                                >
                                  {s.full_name}
                                </li>
                              ))}
                            </ul>
                          )}
                          {/* <select className="form-select">
                            <option selected disabled>
                              {t(
                                "supplier.order_management.list.choose_client"
                              )}
                            </option>
                            <option value="">Client 1</option>
                            <option value="">Client 2</option>
                            <option value="">Client 3</option>
                          </select> */}
                        </div>
                        {/* <div class="mb-3">
                          <label class="form-label">Routes</label>
                          <select className="form-select">
                            <option selected disabled>
                              {t(
                                "supplier.order_management.list.choose_routes"
                              )}
                            </option>
                            <option value="">Route 1</option>
                            <option value="">Route 2</option>
                            <option value="">Route 3</option>
                          </select>
                        </div> */}
                        {/* <div class="mb-3">
                          <label class="form-label">
                            {t("supplier.order_management.list.issues")}{" "}
                          </label>
                          <select className="form-select">
                            <option selected disabled>
                              {t(
                                "supplier.order_management.list.choose_issues"
                              )}
                            </option>
                            <option value="">
                              {t(
                                "supplier.order_management.list.order_without_warning"
                              )}
                            </option>
                            <option value="">
                              {t(
                                "supplier.order_management.list.approval_is_overdue"
                              )}{" "}
                            </option>
                            <option value="">
                              {t(
                                "supplier.order_management.list.delivery_Delay"
                              )}{" "}
                            </option>
                            <option value="">
                              {t(
                                "supplier.order_management.list.not_invoiced_paid"
                              )}{" "}
                            </option>
                            <option value="">
                              {t(
                                "supplier.order_management.list.paymment_overdue"
                              )}
                            </option>
                            <option value="">
                              {t(
                                "supplier.order_management.list.need_attention"
                              )}{" "}
                            </option>
                          </select>
                        </div> */}
                        <div class="mb-3">
                          <label class="form-label">
                            {t("supplier.order_management.list.order_status")}
                          </label>
                          <select className="form-select"
                            value={statusValue}
                            onChange={(e) => {
                              setstatusValue(e.target.value)
                            }}>
                            <option value="">
                              {t(
                                "supplier.order_management.list.choose_status"
                              )}
                            </option>
                            <option value="1">
                              {t("supplier.order_management.list.approved")}{" "}
                            </option>
                            <option value="5">
                              {t("supplier.order_management.list.cancelled")}{" "}
                            </option>
                            <option value="4">
                              {t("supplier.order_management.list.delivered")}{" "}
                            </option>
                            <option value="2">
                              {t("supplier.order_management.list.onhold")}{" "}
                            </option>
                            <option value="0">
                              {t("supplier.order_management.list.pending")}{" "}
                            </option>
                            <option value="3">
                              {t("supplier.order_management.list.shipped")}{" "}
                            </option>
                            <option value="6">
                              Paid
                            </option>
                            <option value="7">
                              Unpaid
                            </option>
                          </select>
                        </div>
                        <div class="mb-3">
                          <label class="form-label">
                            {t("supplier.order_management.list.distributor")}{" "}
                          </label>
                          <div style={{ position: "relative" }}>
                            <button
                              className="search-btn"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <input
                              type="text"
                              value={rFilterSearchDistributor}
                              placeholder="Search Distributor"
                              onChange={(e) =>
                                handleRFilterDistSearch(e.target.value)
                              }
                              onFocus={() => {
                                setDistDropDown(true);
                              }}
                              onBlur={() => {
                                setTimeout(() => {
                                  setDistDropDown(false)
                                }, 200);
                              }}
                            />
                          </div>
                          {filterDistributorList.length > 0 && (
                            <ul
                              className={`w-100 searchListBx custom-scrollbar ${distDropDown ? "d-block" : "d-none"
                                }`}
                            >
                              {" "}
                              {filterDistributorList.map((s) => (
                                <li
                                  className="dropdown-item pe-pointer"
                                  key={s.id}
                                  style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    cursor: "pointer", // Optionally add cursor pointer for better UX
                                  }}
                                  onClick={() =>
                                    handleRDistDropdown(s.user_profile.company_name, s.id)
                                  }
                                >
                                  {s.user_profile.company_name ? s.user_profile.company_name : "N/A"}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div class="mb-3">
                          {/* <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="inlineCheckbox1"
                              value="Invoiced"
                            />
                            <label
                              class="form-check-label"
                              for="inlineCheckbox1"
                            >
                              {t("supplier.order_management.list.invoiced")}
                            </label>
                          </div> */}
                          {/* <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="inlineCheckbox2"
                              value="Expired"
                            />
                            <label
                              class="form-check-label"
                              for="inlineCheckbox2"
                            >
                              {t("supplier.order_management.list.expired")}
                            </label>
                          </div> */}
                          {/* <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="inlineCheckbox3"
                              value="Paid"
                            />
                            <label
                              class="form-check-label"
                              for="inlineCheckbox3"
                            >
                              {t("supplier.order_management.list.paid")}
                            </label>
                          </div> */}
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            type="button"
                            class="btn btn-purple width-auto me-2"
                            onClick={() => { applyRightFilter() }}
                          >
                            {t("supplier.order_management.list.applied")}
                          </button>
                          <input
                            type="button"
                            class="btn btn-outline-black width-auto"
                            value={t("supplier.order_management.list.clear")}
                            onClick={() => {
                              setstatusValue("")
                              setRDistId("")
                              SetrFilterSearchDistributor("")
                              setReatilerId("");
                              setSearchRetailer("");
                              // clear the value of others 
                              setToDate("")
                              setFromDate("")
                              setSelectedDistributor("")
                              setSelectedRetailer("")
                              setSearchRetailerFilter("")
                              setSearchDistributor("")
                              setReload(!reload)
                            }}
                          />
                        </div>
                      </form>
                    </div>
                    {/* Right Filter */}
                  </div>
                </div>
              </div>
              {/* ------Commandes----- */}
              <div className="card user-card my-2 height-100">
                <div className="cmd-data">
                  <table>
                    <tr>
                      <td>
                        {sigma}
                        <span>{ordersStatusCount.total_order}</span>
                      </td>
                      <td>
                        <i class="fa-regular fa-clock"></i>
                        <span>{ordersStatusCount.pending_order}</span>
                      </td>
                      <td>
                        <i class="fa-solid fa-check"></i>
                        <span>{ordersStatusCount.approved_order}</span>
                      </td>
                      <td>
                        <i class="fa-solid fa-xmark"></i>
                        <span>{ordersStatusCount.cancelled_order}</span>
                      </td>
                      <td>
                        <i class="fa-solid fa-sack-dollar"></i>
                        <span>{ordersStatusCount.paid_total_amount}</span>
                      </td>
                      <td>
                        <i class="fa-solid fa-sack-dollar cancel"></i>
                        <i class="fa-solid fa-ban"></i>
                        <span className="count-cnl">{ordersStatusCount.unpaid_total_amount}</span>
                      </td>
                      <td>
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <span>{count}</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              {/* ----end----- */}

              <div className="row">
                <div className="col">
                  {/* [Card] */}
                  <div className="card user-card height-100">
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col">
                          <div className="card-top-filter-box p-3">
                            {/* [Table Search] */}
                            <div className="search-table">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="search-input"
                                  placeholder="Search by Business name"
                                  value={searching}
                                  onChange={(e) => handleSearchChange(e)}
                                ></input>
                              </div>
                            </div>
                            {/* [/Table Search] */}

                            {/* [Right Filter] */}
                            <div className="filter-row text-end">
                              {/* [Page Filter Box] */}
                              <div className="filter-box">
                                {/* <a href="#" className="btn btn-purple btn-sm" data-bs-toggle="modal" data-bs-target="#assignToShipment">Assign to Shipment</a> */}
                                {/* [Date] */}
                                <div className="dropdown date-selector">
                                  {/* <button className="btn btn-outline-black btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <img src={calendar} alt="" /> Delivery Date
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href="#">Date</a></li>
                                                                <li><a className="dropdown-item" href="#">Date</a></li>
                                                            </ul> */}
                                </div>
                                {/* [/Date] */}

                                {/* [Supplier] */}
                                <div className="dropdown date-selector">
                                  {/* <button className="btn btn-outline-black btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                Set Status
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li><a className="dropdown-item" href="#">Approved</a></li>
                                                                <li><a className="dropdown-item" href="#">Rejected</a></li>
                                                                <li><a className="dropdown-item" href="#">Pending</a></li>
                                                            </ul> */}
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-purple btn-sm"
                                  style={{
                                    display:
                                      targetId.length > 0 ? "block" : "none",
                                  }}
                                  onClick={() => setShow(true)}
                                >
                                  {t(
                                    "supplier.order_management.list.Change_Status"
                                  )}
                                </button>
                                {hasPermission(ORDER_EDIT) && (
                                  <NavLink
                                    to="/supplier/order-management/create-order"
                                    className="btn btn-purple btn-sm"
                                  >
                                    {t("supplier.order_management.list.new")}
                                  </NavLink>
                                )}
                              </div>
                              {/* [/Page Filter Box] */}
                            </div>
                            {/* [/Right Filter] */}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="table-responsive">
                            <table className="table table-striped m-0">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>
                                    {t(
                                      "supplier.order_management.list.table_col1"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.order_management.list.table_col2"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.order_management.list.table_col3"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.order_management.list.table_col4"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.order_management.list.table_col5"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.order_management.list.table_col6"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.order_management.list.table_col7"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "supplier.order_management.list.table_col8"
                                    )}
                                  </th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {data && data.length > 0 ? (
                                  data.map((ele) => {
                                    return (
                                      <tr key={ele.id}>
                                        <td className="text-center">
                                          <input
                                            type="checkbox"
                                            value={ele.id}
                                            checked={targetId.includes(ele.id)}
                                            key={ele.id}
                                            onChange={(e) =>
                                              handleOrderSelect(e)
                                            }
                                          />{" "}
                                        </td>
                                        <td>{ele.order_reference}</td>
                                        <td>
                                          {ele.order_date}
                                          <br></br>
                                          <span style={{ color: "red" }}>
                                            {submit1(ele.created_at)}
                                          </span>
                                        </td>
                                        <td>
                                          {ele.retailer_information ? ele.retailer_information.user_profile
                                            ? ele.retailer_information
                                              .user_profile.business_name
                                              ? ele.retailer_information
                                                .user_profile.business_name
                                              : "N/A"
                                            : "N/A" : "N/A"}
                                        </td>
                                        <td>
                                          {ele.retailer_information ? ele.retailer_information.user_profile
                                            ? ele.retailer_information
                                              .user_profile.group_name
                                              ? ele.retailer_information
                                                .user_profile.group_name
                                              : "N/A"
                                            : "N/A" : "N/A"}
                                        </td>
                                        <td>
                                          {ele.status === "Approved" ? (
                                            <span className="badge text-bg-green">
                                              {ele.status}
                                            </span>
                                          ) : ele.status === "Pending" ||
                                            ele.status === "On Hold" ? (
                                            <span className="badge text-bg-orange">
                                              {ele.status}
                                            </span>
                                          ) : ele.status === "Cancelled" ? (
                                            <span className="badge text-bg-red">
                                              {ele.status}
                                            </span>
                                          ) : ele.status === "Delivered" ||
                                            ele.status === "Shipped" ? (
                                            <span className="badge text-bg-blue">
                                              {ele.status}
                                            </span>
                                          ) : ele.status === "Paid" ? (
                                            <span className="badge text-bg-purple" style={{ color: '#79018c ', padding: '5px' }}>
                                              {ele.status}
                                            </span>
                                          ) : ele.status === "Unpaid" ? (
                                            <span className="badge text-bg-purple" style={{ color: '#79018c ', padding: '5px' }}>
                                              {ele.status}
                                            </span>
                                          )
                                            : "tbd"
                                          }
                                        </td>

                                        <td>
                                          {ele?.items.reduce(
                                            (acc, item) => acc + item?.quantity,
                                            0
                                          )}
                                        </td>
                                        <td>{totalPrice(ele?.items)}</td>
                                        <td>
                                          {ele?.order_distributors[0] &&
                                            ele?.order_distributors[0]
                                              ?.distributor_info?.user_profile
                                              ?.company_name
                                            ? ele?.order_distributors[0]
                                              ?.distributor_info?.user_profile
                                              ?.company_name
                                            : ele?.order_distributors[0]?.other_distributor == 1 ? "Other" : "N/A"}
                                        </td>

                                        <td
                                          align="center"
                                          style={{
                                            width: "100px",
                                            maxWidth: "100px",
                                            overflow: "hidden",
                                          }}
                                        >
                                          <i
                                            className="fa-solid fa-check"
                                            style={{
                                              color:
                                                ele.status === "Approved"
                                                  ? "#27C26C"
                                                  : ele.status === "Pending"
                                                    ? "#000"
                                                    : ele.status === "Cancelled"
                                                      ? "red"
                                                      : ele.status === "Delivered"
                                                        ? "#27C26C"
                                                        : ele.status === "Shipped"
                                                          ? "#27C26C"
                                                          : ele.status === "Paid"
                                                            ? "#27C26C"
                                                            : undefined, // No default color
                                            }}
                                          ></i>
                                        </td>

                                        <td
                                          align="center"
                                          style={{ width: "100px" }}
                                        >
                                          <i
                                            className="fa-solid fa-truck-fast"
                                            style={{
                                              color:
                                                ele.status === "Shipped"
                                                  ? "red"
                                                  : ele.status === "Delivered"
                                                    ? "#27C26C"
                                                    : ele.status === "Paid"
                                                      ? "#27C26C"
                                                      : undefined, // No default color
                                            }}
                                          ></i>
                                        </td>
                                        <td
                                          align="center"
                                          style={{ width: "100px" }}
                                        >
                                          <i
                                            class="fa-solid fa-shop"
                                            style={{
                                              color:
                                                ele.status === "Delivered"
                                                  ? "#27C26C"
                                                  : ele.status === "Paid"
                                                    ? "#27C26C"
                                                    : undefined, // No default color
                                            }}
                                          ></i>
                                        </td>
                                        <td
                                          align="center"
                                          style={{ width: "100px" }}
                                        >
                                          <span
                                            onClick={() => {
                                              if (ele.status === "Delivered") {
                                                handlePayment(ele.id);
                                              }
                                              else {
                                                toast.error("Could not update status before Delivery.", {
                                                  autoClose: 3000,
                                                  position: toast.POSITION.TOP_CENTER,
                                                });
                                              }
                                            }}
                                          >
                                            <i
                                              class="fa-solid fa-sack-dollar"
                                              style={{
                                                cursor: "pointer", color:
                                                  ele.status === "Paid"
                                                    ? "#27C26C"
                                                    : undefined,
                                              }}
                                            ></i>
                                          </span>
                                        </td>

                                        {/* -------------- */}
                                        <td>
                                          <div class="btn-group dropstart table-action">
                                            <button
                                              type="button"
                                              class="dropdown-toggle"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false"
                                            >
                                              <span></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                              <li className="text-center">
                                                <NavLink
                                                  to={`/supplier/order-management/order-detail/${ele.id}`}
                                                  className="dropdown-item"
                                                >
                                                  <i
                                                    class="fa-solid fa-eye"
                                                    style={{ color: "blue" }}
                                                  ></i>
                                                </NavLink>
                                              </li>
                                              {/* <li> <a className="dropdown-item">Edit</a></li> */}
                                              <li className="seperator d-flex">
                                                <a className="dropdown-item">
                                                  <i
                                                    class="fa-solid fa-file-pdf"
                                                    style={{ color: "red" }}
                                                  ></i>
                                                </a>
                                                <a className="dropdown-item">
                                                  <i
                                                    class="fa-solid fa-file-csv"
                                                    style={{ color: "black" }}
                                                  ></i>
                                                </a>
                                                <a className="dropdown-item">
                                                  <i
                                                    class="fa-solid fa-file-excel"
                                                    style={{ color: "green" }}
                                                  ></i>
                                                </a>
                                                <i class=""></i>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <>
                                    {t(
                                      "supplier.order_management.list.no_data_to_show"
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="table-pagination mb-2 mt-3">
                          {data.length > 0 ? (
                            <CustomTablePagination
                              rowsPerPageOptions={[
                                5,
                                10,
                                15,
                                { label: "All", value: -1 },
                              ]}
                              labelRowsPerPage={t(
                                "admin.supplier_management.list.pagination_text"
                              )}
                              colSpan={10} // Assuming you want to span across 10 columns
                              count={orderList.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              size="small"
                              slotProps={{
                                select: {
                                  "aria-label": "rows per page",
                                },
                                actions: {
                                  showFirstButton: true,
                                  showLastButton: true,
                                },
                              }}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                              sx={{
                                ".MuiTablePagination-toolbar button": {
                                  backgroundColor: "#623ead",
                                  borderColor: "#623ead",
                                  borderRadius: "25px",
                                  color: "#fefefe",
                                },
                                ".MuiTablePagination-toolbar span": {
                                  fontSize: "12px",
                                },
                              }}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </LoadingOverlay>
        </div>
      </div>

      <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header>
          <h5 class="modal-title text-purpal">
            {t("supplier.order_management.change_status.change_status_h")}
          </h5>
          <button
            type="button"
            class="btn-close text-purpal"
            aria-label="Close"
            onClick={() => setShow(false)}
          ></button>
        </Modal.Header>
        <Modal.Body>
          <p>{`${t(
            "supplier.order_management.change_status.order_selected"
          )} : ${targetId.length}`}</p>
          <div className="border-purple p-3 rounded-2">
            <div>
              {t("supplier.order_management.change_status.select_status")}
            </div>
            <div className="mt-2">
              <div className="input-group">
                <select
                  className="form-select rounded-pill"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setStatusError("");
                  }}
                >
                  <option value="">
                    {t("supplier.order_management.change_status.select_status")}
                  </option>
                  <option value="1">
                    {t("supplier.order_management.change_status.approved")}
                  </option>
                  <option value="2">
                    {t("supplier.order_management.change_status.on_hold")}
                  </option>
                  <option value="5">
                    {t("supplier.order_management.change_status.cancelled")}
                  </option>
                </select>
              </div>
              {statusError === "" ? (
                <></>
              ) : (
                <p className="error-label">{statusError}</p>
              )}
            </div>
          </div>
          <div
            className="border-purple p-3 mt-3 rounded-2"
            style={{ display: selectedStatus === "1" ? "block" : "none" }}
          >
            <div>
              {t("supplier.order_management.change_status.delivery_date")}
            </div>
            <div className="mt-2">
              <div className="input-group">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setDateError("");
                  }}
                  minDate={new Date()}
                  dateFormat="yyyy/MM/dd"
                />
              </div>
              {dateError === "" ? (
                <></>
              ) : (
                <p className="error-label">{dateError}</p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-outline-purple"
            onClick={() => {
              setShow(false);
            }}
          >
            {t("supplier.order_management.change_status.cancel")}
          </button>
          <button
            type="button"
            class="btn btn-purple btn-md w-auto"
            onClick={() => handleUpdateStatus()}
          >
            {t("supplier.order_management.change_status.save")}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderManagement;
