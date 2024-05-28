import React from "react";
import calendar from "../../assets/images/calender.png";
import filter from "../../assets/images/filter-icon.png";
import downloadPDF from "../../assets/images/download-pdf.png";
import approveTick from "../../assets/images/approveTick(1).png";
import Transit from "../../assets/images/Transit(1).png";
// import Transit from "../../assets/images/Transit.png";
// import delivered from "../../assets/images/delivered.png";
import delivered from "../../assets/images/delivered(1).png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss";
import { useState } from "react";
import { useEffect } from "react";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
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
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const token = localStorage.getItem("retailer_accessToken");
  const [orderList, setOrderList] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const [searchSupplierFilter, setSearchSupplierFilter] = useState("");
  const [distinctSupplierInfoArray, setDistinctSupplierInfoArray] = useState(
    []
  );
  const [distinctList, setDistinctList] = useState([]);
  const [dropdownShowSupplier, setDropdownShowSupplier] = useState(false);
  const [searchDistributor, setSearchDistributor] = useState("");
  const [dropdownDistributor, setDropdownDistributor] = useState(false);
  const [distinctDistributorList, setDistinctDistributorList] = useState([]);
  const [distinctArrayDist, SetDistinctArrayDist] = useState([]);
  const [count, setCount] = useState(0)

  const [searchValue,setSearchValue]=useState("")
  const [allOrderList,setAllOrderList]=useState([])
  const [statusValue,setStatusValue]=useState("")
  const [supplierList,setSupplierList]=useState([])
  const [filterSupplierList,setFilterSupplierList]=useState([])
  const [searchSupplier,setSearchSupplier]=useState("")
  const [supplierID,setSupplierID]=useState("")
  const [dropdownShow,setDropdownShow]=useState(false)
  const [reload,setReload]=useState(false)


  const sigma = "\u03A3";

  function MyComponent() {
    return <div>{sigma}</div>;
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: `order-view`,
      },
    };
    apis
      .get("retailer/orderListing", config)
      .then((res) => {
        if (res.data) {
          // console.log(object)
          setOrders(res.data.data);
          setAllOrderList(res.data.data)
        }
      })
      .catch((err) => {
        if (err.message !== "revoke") {
          toast.error(err.response.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });

    apis
      .get("retailer/orderListingStatusCount", config)
      .then((res) => {
        if (res.data) {
          setOrderList(res.data.data);
        }
      })
      .catch((err) => {
        if (err.message !== "revoke") {
          toast.error(err.response.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [reload]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  let data;
  if (rowsPerPage > 0) {
    data = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  } else {
    data = orders;
  }

  const totalPrice = (arr) => {
    let total = 0;
    // if (arr.length) {
    total = arr.reduce((accumulator, currentValue) => {
      // const accumulatorTotal =
      //   accumulator?.product?.pricing?.unit_price * accumulator?.quantity ||
      //   0;
      const currentValueTotal =
        currentValue?.product?.pricing?.unit_price * currentValue?.quantity ||
        0;
      return accumulator + currentValueTotal;
    }, 0);
    return total?.toFixed(2);
    // } else {
    // return "0.00"; // or any default value if cartItems is empty
    // }
  };


  const handleSupplierFilterSearch = (e) => {
    setSelectedSupplier("");
    setSearchSupplierFilter(e);
    const matchingStrings = distinctSupplierInfoArray.filter((str) => {
      const fullNameMatch = str?.full_name
        .toLowerCase()
        .includes(e.toLowerCase());
      // const addressMatch =
      //   str.user_main_address &&
      //   str.user_main_address.address_1 &&
      //   str.user_main_address.address_1.toLowerCase().includes(e.toLowerCase());
      const companyMatch =
        str?.user_profile &&
        str?.user_profile?.company_name &&
        str?.user_profile?.company_name.toLowerCase().includes(e.toLowerCase());
      // const groupMatch =
      //   str.user_profile &&
      //   str.user_profile.group_name &&
      //   str.user_profile.group_name.toLowerCase().includes(e.toLowerCase());
      return fullNameMatch || companyMatch;
    });

    setDistinctList(matchingStrings);
  };
  const handleSupplierFilterDropdown = (company_name, id) => {
    setSearchSupplierFilter(company_name);
    setSelectedSupplier(id);
    setDropdownShowSupplier(false);
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


  useEffect(() => {
    const uniqueSupplierIds = new Set();
    const uniqueSupplierInfoArray = [];

    orders.forEach((x) => {
      if (!uniqueSupplierIds.has(x?.supplier_information?.id)) {
        uniqueSupplierIds.add(x?.supplier_information?.id);
        uniqueSupplierInfoArray.push(x?.supplier_information);
      }
    });
    setDistinctSupplierInfoArray(uniqueSupplierInfoArray);
    setDistinctList(uniqueSupplierInfoArray);
    const uniqueDistributorIds = new Set();
    const uniqueDistributorArray = [];

    // Loop through orderList
    orders.forEach((x) => {
      x.order_distributors.forEach((distributor) => {
        if (!uniqueDistributorIds.has(distributor?.distributor_info?.id)) {
          uniqueDistributorIds.add(distributor?.distributor_info?.id);
          uniqueDistributorArray.push(distributor?.distributor_info);
        }
      });
    });
    setDistinctDistributorList(uniqueDistributorArray);
    SetDistinctArrayDist(uniqueDistributorArray);
    console.log("Dattaaaa", uniqueDistributorArray, uniqueSupplierInfoArray)
  }, [orders]);


  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: `order-view`,
      },
    };

    apis
      .get(
        `/retailer/orderListing?distributor_id=${selectedDistributor}&supplier_id=${selectedSupplier}&to_date=${toDate}&from_date=${fromDate}`,
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          setOrders(res.data.data);
        } else {
          toast.error("Could not fetch order list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error("Could not fetch order list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [selectedDistributor, selectedSupplier, toDate, fromDate]);


  useEffect(()=>{
    if(orders && orders.length > 0){
      let newCount = 0;
      orders.forEach((ele)=>{
        if(ele.status == 'Unpaid'){
          const createdDate = new Date(ele.created_at);
          const currentDate = new Date();
          const monthDiff = Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24 * 30));
                    if (monthDiff >= 2) {
                        newCount++; // Increment newCount if conditions are met
                    }
        }
      });
      setCount(newCount);
    }

  },[orders])


  const applyFilter=()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: `order-view`,
      },
    };

    apis
      .get(
        `/retailer/orderListing?supplier_id=${supplierID}&status=${statusValue}`,
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          setOrders(res.data.data);
        } else {
          toast.error("Could not fetch order list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error("Could not fetch order list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }

  const handleSupplierSearch = (e) => {
    setSupplierID("");
    setSearchSupplier(e);

    const matchingStrings = supplierList.filter((str) => {
      const fullNameMatch = str.full_name
        .toLowerCase()
        .includes(e.toLowerCase());
      const companyMatch =  str.company_name
      .toLowerCase()
      .includes(e.toLowerCase());
 
      return fullNameMatch  || companyMatch ;
    });

    setFilterSupplierList(matchingStrings);
    setDropdownShow(true);
  };
  const handleSupplierDropDown = (company_name, id) => {
    setSearchSupplier(company_name);
    console.log("Dtaaaxss",company_name,id)
    setSupplierID(id);
    setDropdownShow(false);
    // setShowNote(true);
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "supplier-view",
      },
    };
    apis
      .get(`/retailer/suppliersAllList`, config)
      .then((res) => {
        setSupplierList(res.data.data);
        setFilterSupplierList(res.data.data)
      })
      .catch((err) => {});
  }, []);


  const handleSearching=(e)=>{
    console.log("Dataaaa",e)
    setSearchValue(e)
    const searchKey=e
    const filteredOrder=allOrderList.filter((x)=>{
      const matchBuisnnesName=
      x.supplier_information &&
      x.supplier_information.user_profile &&
      x.supplier_information.user_profile.company_name &&
      x.supplier_information.user_profile.company_name.toLowerCase().includes(searchKey.toLowerCase());
      const addressMatching=
      x.retailer_information &&
      x.retailer_information.user_main_address &&
      x.retailer_information.user_main_address.address_1 &&
      x.retailer_information.user_main_address.address_1.toLowerCase().includes(searchKey.toLowerCase());

      const orderReference=
      x.order_reference.toLowerCase().includes(searchKey.toLowerCase())

      const statusMatching=
      x.status.toLowerCase().includes(searchKey.toLowerCase())
      return matchBuisnnesName || addressMatching || orderReference || statusMatching
    })
    console.log("==================================", filteredOrder);
    setOrders(filteredOrder);
  }




  return (
    <div className="container-fluid page-wrap order-manage">
      <div className="row height-inherit">
        <Sidebar userType={"retailer"} />

        <div className="col main p-0">
          <Header title={t("retailer.order_management.listing.title")} />
          <div className="container-fluid page-content-box px-3 px-sm-4">
            <div className="row mb-3">
              <div className="col">
                <div className="filter-row page-top-filter justify-content-between">
                  {/* new div */}
                  <div className="filter-box">
                    {/* [/Date] */}

                    <div className="dropdown date-selector">
                      <button
                        className="btn btn-outline-black btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ background: "#ffffff" }}
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
                            <label>From Date</label>

                            <input
                              type="date"
                              value={fromDate}
                              onChange={(e) => {
                                setFromDate(e.target.value);
                              }}
                            />
                          </li>
                          <li>
                            <label>To Date</label>
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

                    <div className="dropdown date-selector card-top-filter-box">
                      <div className="search-table form-group">
                        <input
                          type="text"
                          className="search-input"
                          value={searchSupplierFilter}
                          placeholder={t("supplier.order_management.list.search_supplier")}
                          onFocus={() => {
                            setDropdownShowSupplier(true);
                          }}
                          onBlur={() => {
                            setTimeout(() => {
                              setDropdownShowSupplier(false);
                            }, 200);
                          }}
                          onChange={(e) => {
                            handleSupplierFilterSearch(e.target.value);
                          }}
                        />

                        {distinctList.length > 0 && (
                          <ul
                            className={`w-100 searchListBx custom-scrollbar ${dropdownShowSupplier ? "d-block" : "d-none"
                              }`}
                          >
                            {" "}
                            {distinctList.map((s) => (
                              <li
                                className="dropdown-item pe-pointer"
                                key={s?.id}
                                onClick={() =>
                                  handleSupplierFilterDropdown(
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

                    <div className="dropdown date-selector card-top-filter-box">
                      <div className="search-table form-group">
                        <input
                          type="text"
                          className="search-input"
                          value={searchDistributor}
                          placeholder={t("supplier.order_management.list.search_distributor")}
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
                  {/* close div */}
                  {/* Right Filter */}
                  <div class="dropdown right-filter">
                    <button
                      type="button"
                      class="btn dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="outside"
                    >
                      <img src={filter} />{" "}
                      {t("retailer.order_management.listing.filter_button")}
                    </button>
                    <form class="dropdown-menu p-3 ">
                      <div class="mb-3">
                        <label class="form-label">
                          {t("retailer.order_management.listing.order_status")}
                        </label>
                        <select className="form-select"
                         value={statusValue}
                         onChange={(e)=>{
                           setStatusValue(e.target.value)
                         }}>
                          <option value="">
                            {t(
                              "retailer.order_management.listing.choose_status"
                            )}
                          </option>
                          <option value="1">
                            {t("retailer.order_management.listing.approved")}
                          </option>
                          <option value="5">
                            {t("retailer.order_management.listing.cancelled")}
                          </option>
                          <option value="4">
                            {t("retailer.order_management.listing.delivered")}
                          </option>
                          <option value="6">
                            {t("retailer.order_management.listing.paid")}
                          </option>
                          <option value="2">
                            {t("retailer.order_management.listing.on_hold")}
                          </option>
                          <option value="0">
                            {t("retailer.order_management.listing.pending")}
                          </option>
                          <option value="3">
                            {t("retailer.order_management.listing.shipped")}
                          </option>
                          <option value="7">
                            Unpaid
                          </option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label class="form-label">
                          {t("retailer.order_management.listing.supplier")}
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
                              value={searchSupplier}
                              placeholder="Search Supplier"
                              onChange={(e) =>
                                handleSupplierSearch(e.target.value)
                              }
                              onFocus={() => {
                                setDropdownShow(true);
                              }}
                              onBlur={()=>{
                                setTimeout(() => {
                                  setDropdownShow(false)
                                }, 200);
                              }}
                            />
                          </div>
                          {filterSupplierList.length > 0 && (
                            <ul
                              className={`w-100 searchListBx custom-scrollbar ${
                                dropdownShow ? "d-block" : "d-none"
                              }`}
                            >
                              {" "}
                              {filterSupplierList.map((s) => (
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
                                    handleSupplierDropDown(s.company_name, s.id)
                                  }
                                >
                                  {s.company_name}
                                </li>
                              ))}
                            </ul>
                          )}
                      </div>
                      {/* <div class="mb-3">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            value="Invoiced"
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            {t("retailer.order_management.listing.invoiced")}
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            value="Expired"
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            {t("retailer.order_management.listing.expired")}
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox3"
                            value="Paid"
                          />
                          <label class="form-check-label" for="inlineCheckbox3">
                            {t("retailer.order_management.listing.paid")}
                          </label>
                        </div>
                      </div> */}
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          class="btn btn-purple width-auto me-2"
                          onClick={()=>{applyFilter()}}
                        >
                          {t("retailer.order_management.listing.apply")}
                        </button>
                        <input
                          type="button"
                          class="btn btn-outline-black width-auto"
                          value={t("supplier.order_management.list.clear1")}
                          onClick={()=>{
                            setSearchSupplier("")
                            setStatusValue("")
                            setSupplierID("")
                            setSelectedDistributor("")
                            setSelectedSupplier("")
                            setToDate("")
                            setFromDate("")
                            setSearchSupplierFilter("")
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
                      <span>{orderList.total_order}</span>
                    </td>
                    <td>
                      <i class="fa-regular fa-clock"></i>
                      <span>{orderList.pending_order}</span>
                    </td>
                    <td>
                      <i class="fa-solid fa-check"></i>
                      <span>{orderList.approved_order}</span>
                    </td>
                    <td>
                      <i class="fa-solid fa-xmark"></i>
                      <span>{orderList.cancelled_order}</span>
                    </td>
                    <td>
                      <i class="fa-solid fa-sack-dollar"></i>
                      <span>{orderList.paid_total_amount}</span>
                    </td>
                    <td>
                      <i class="fa-solid fa-sack-dollar cancel"></i>
                      <i class="fa-solid fa-ban"></i>
                      <span className="count-cnl">{orderList.unpaid_total_amount}</span>
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
                                placeholder={t("supplier.order_management.list.searching")}
                                value={searchValue}
                                onChange={(e)=>{
                                  handleSearching(e.target.value)
                                }}
                              ></input>

                            </div>
                          </div>
                          {/* [/Table Search] */}

                          {/* [Right Filter] */}
                          <div className="filter-row text-end">
                            {/* [Page Filter Box] */}
                            {/* <div className="filter-box">
                              <a
                                href="#"
                                className="btn btn-outline-black btn-sm"
                              >
                                PDF <img src={downloadPDF} />
                              </a>
                            </div> */}
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
                                    "retailer.order_management.listing.order_number"
                                  )}
                                </th>
                                <th>
                                  {t("retailer.order_management.listing.date")}
                                </th>
                                <th className="text-uppercase">
                                  {t(
                                    "retailer.order_management.listing.supplier"
                                  )}
                                </th>
                                <th className="text-center text-uppercase">
                                  {t(
                                    "retailer.order_management.listing.groups"
                                  )}
                                </th>
                                <th className="text-center text-uppercase">
                                  {t(
                                    "retailer.order_management.listing.order_status"
                                  )}
                                </th>
                                <th>
                                  {t(
                                    "retailer.order_management.listing.quantity"
                                  )}
                                </th>
                                <th>
                                  {t("retailer.order_management.listing.price")}
                                </th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.map((order) => (
                                <tr>
                                  <td>
                                    <input type="checkbox" name="" id="" />{" "}
                                  </td>
                                  <td>
                                    <strong>{order?.order_reference}</strong>
                                  </td>
                                  <td>
                                    <div className="dateTimeBox">
                                      <div className="dateRow">
                                        {new Date(order?.created_at)
                                          .toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                          })
                                          .replace(
                                            /(\d+)\/(\d+)\/(\d+), (\d+):(\d+) (AM|PM)/,
                                            "$3-$1-$2 | $4:$5 $6"
                                          )}{" "}
                                        <br />
                                      </div>
                                      <div className="daysCount">{`${Math.floor(
                                        (new Date() -
                                          new Date(order?.created_at)) /
                                        (1000 * 60 * 60 * 24)
                                      )} Days ago`}</div>
                                    </div>
                                  </td>
                                  <td>
                                    <strong>
                                      {
                                        order?.supplier_information
                                          ?.user_profile?.company_name
                                      }
                                    </strong>
                                  </td>
                                  <td>
                                    <div className="order-group-box">
                                      <ul class="list-group list-group-horizontal">
                                        <li
                                          class={`list-group-item border-0 text-center ${order.status === "Approved" &&
                                            "active"
                                            }`}
                                        >
                                          <span className="d-inline-flex align-items-center justify-content-center">
                                            <img src={approveTick} alt="" />
                                          </span>
                                          <p>
                                            {t(
                                              "retailer.order_management.listing.approved"
                                            )}
                                          </p>
                                        </li>
                                        <li
                                          class={`list-group-item border-0 text-center ${order.status === "Transit" &&
                                            "active"
                                            }`}
                                        >
                                          <span className="d-inline-flex align-items-center justify-content-center">
                                            <img src={Transit} alt="" />
                                          </span>
                                          <p>
                                            {t(
                                              "retailer.order_management.listing.transit"
                                            )}
                                          </p>
                                        </li>
                                        <li
                                          class={`list-group-item border-0 text-center ${order.status === "Delivered" &&
                                            "active"
                                            }`}
                                        >
                                          <span className="d-inline-flex align-items-center justify-content-center">
                                            <img src={delivered} alt="" />
                                          </span>
                                          <p>
                                            {t(
                                              "retailer.order_management.listing.delivered"
                                            )}
                                          </p>
                                        </li>

                                        <li
                                          class={`list-group-item border-0 text-center ${order.status === "Payment" &&
                                            "active"
                                            }`}
                                        >
                                          <span className="d-inline-flex align-items-center justify-content-center">
                                            {/* <img src={payment} alt="" /> */}
                                            <i
                                              class="fa-solid fa-sack-dollar"
                                              style={{ color: "#bababa" }}
                                            ></i>
                                          </span>
                                          <p>
                                            {t(
                                              "retailer.order_management.listing.payment"
                                            )}
                                          </p>
                                        </li>
                                      </ul>
                                    </div>
                                  </td>
                                  <td>
                                    {order.status === "Approved" ||
                                      order.status === "Paid" ? (
                                      <span className="badge text-bg-green">
                                        {order.status}
                                      </span>
                                    ) : order.status === "Pending" ||
                                      order.status === "On Hold" ? (
                                      <span className="badge text-bg-orange">
                                        {order.status}
                                      </span>
                                    ) : order.status === "Cancelled" ? (
                                      <span className="badge text-bg-red">
                                        {order.status}
                                      </span>
                                    ) : order.status === "Delivered" ||
                                      order.status === "Shipped" ? (
                                      <span className="badge text-bg-blue">
                                        {order.status}
                                      </span>
                                    ): order.status === "Unpaid"? (
                                      <span className="badge text-bg-purple" style={{color: '#79018c ', padding:'5px'}}>
                                        {order.status}
                                      </span>
                                    ): (
                                      "tbd"
                                    )}
                                  </td>
                                  <td>
                                    {order?.items.reduce(
                                      (acc, item) => acc + item?.quantity,
                                      0
                                    )}
                                  </td>
                                  <td>
                                    {totalPrice(order?.items)}
                                    {/* ${(order?.items[0]?.quantity*order?.items[0]?.product?.pricing?.total_price).toFixed(2)} */}
                                    {/* {order.items.reduce(
                                      (acc, item) =>
                                        acc +
                                        Number(item.quantity) *
                                          Number(
                                            item?.pricing?.total_price ||
                                              item.price
                                          ),
                                      0
                                    ).toFixed(2)} */}
                                  </td>
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
                                          <a
                                            onClick={() =>
                                              navigate(
                                                `/retailer/order-detail/${order.id}`
                                              )
                                            }
                                            className="dropdown-item"
                                          >
                                            <i
                                              class="fa-solid fa-eye"
                                              style={{ color: "blue" }}
                                            ></i>

                                            {/* {t(
                                              "retailer.order_management.listing.view_details"
                                            )} */}
                                          </a>
                                        </li>
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
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                {orders.length > 5 ? (
                                  <CustomTablePagination
                                    rowsPerPageOptions={[
                                      5,
                                      10,
                                      15,
                                      {
                                        label: t(
                                          "distributor.product_management.all"
                                        ),
                                        value: -1,
                                      },
                                    ]}
                                    labelRowsPerPage={t(
                                      "distributor.product_management.rows_per_page"
                                    )}
                                    colSpan={11}
                                    count={orders.length}
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
                                    onRowsPerPageChange={
                                      handleChangeRowsPerPage
                                    }
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
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* [Modal] */}
      <div
        class="modal fade"
        id="assignToShipment"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-hidden="true"
        se
      >
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content p-3">
            <div class="modal-header justify-content-start">
              <h6 class="modal-title">Assign to shipment</h6>
              <hr />
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>Assign 1 Order to shipment</p>
              <div className="routeInfo mb-3">Route 1:5 Orders</div>
              <div className="border-purple p-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="radio1"
                  />
                  <label class="form-check-label" for="radio1">
                    New Shipment
                  </label>
                </div>
                <div className="mt-2">
                  <label>Delivery Date</label>
                  <div className="input-group">
                    <input
                      type="date"
                      placeholder=""
                      className="form-control rounded-pill"
                    />
                  </div>
                </div>
              </div>
              <div className="border-purple p-3 mt-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="radio2"
                  />
                  <label class="form-check-label" for="radio2">
                    Existing Shipment
                  </label>
                </div>
                <div className="mt-2">
                  <div className="input-group">
                    <select className="form-select rounded-pill">
                      <option selected disabled>
                        Supplier
                      </option>
                      <option>Supplier 1</option>
                      <option>Supplier 2</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer border-0">
              <button
                type="button"
                class="btn btn-outline-black width-auto"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              &nbsp;&nbsp;
              <button type="button" class="btn btn-purple width-auto">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* [/Modal] */}
    </div>
  );
};

export default OrderManagement;
