import React, { useEffect, useState } from "react";
import calendar from "../../assets/images/calender.png";
import filter from "../../assets/images/filter-icon.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss";
import { useNavigate } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormSelect, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import {
  ORDER_EDIT,
  SHIPMENT_EDIT,
  SHIPMENT_VIEW,
} from "../../../Constants/constant";
import ReactDatePicker from "react-datepicker";
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
  const token = localStorage.getItem("distributor_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [existingShipmentCheck, setExistingShipemtCheck] = useState(false);
  const [shipmentId, setShipmentId] = useState();
  const [route, setRoute] = useState();
  const [routeList, setRouteList] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState();
  const [newShipmentCheck, setNewShipmentCheck] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [show, setShow] = useState(false);
  const [shipmentIdError, setShipmentIdError] = useState("");
  const [deliveryDateError, setDeliveryDateError] = useState("");
  const [routeError, setRouteError] = useState("");
  const [existingShipmentError, setExistingShipemtError] = useState("");
  const [linkedSuppliers, setLinkedSuppliers] = useState({});
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [keyword, setKeyword] = useState("");
  const [selectedRetailer, setSelectedRetailer] = useState();
  const [selectedRoutes, setSelectedRoutes] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedInvoiceStatus, setSelectedInvoiceStatus] = useState();
  const [retailerList, setRetailerList] = useState([]);
  const [q, setQ] = useState("")
  const [allData , setallData] = useState([]);

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSelectedSupplier = (name, id) => {
    const obj = {
      supplierId: id,
      name: name,
    };
    setSelectedSupplier(obj);
  };
  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "order-view",
      },
    };
    apis
      .get(`distributor/orderListing`, config)
      .then((res) => {
        setLoading(false);
        setOrders(res.data.data);
        setallData(res.data.data);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        setLoading(false);
        toast.error(t("error_message.something_went_wrong"), {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
    if (hasPermission(SHIPMENT_VIEW)) {
      const config1 = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "shipment-view",
        },
      };
      apis
        .get(`distributor/getExistingShipments`, config1)
        .then((res) => {
          setLoading(false);
          setShipments(res.data.data);
        })
        .catch((err) => {
          if(err.message !== "revoke"){
          setLoading(false);
          toast.error(t("error_message.something_went_wrong"), {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
        });
    }
  }, [token]);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "supplier-view",
      },
    };

    apis
      .get(`distributor/getLinkedSuppliers`, config)
      .then((res) => {
        if (res.data.success === true) {
          setLinkedSuppliers(res.data.data);
        } else {
          toast.error(res.data.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.data.data.error) {
        //     toast.error(err.response.data.data.error, {
        //         autoClose: 3000,
        //         position: toast.POSITION.TOP_CENTER,
        //     });
        // }
        // toast.error(err.response.data.message, {
        //     autoClose: 3000,
        //     position: toast.POSITION.TOP_CENTER,
        // });
        // toast.error(err.response.data.message, {
        //     autoClose: 3000,
        //     position: toast.POSITION.TOP_CENTER,
        // });
      });
  }, [token]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "routes-view",
      },
    };

    apis
      .get(`distributor/routes`, config)
      .then((res) => {
        if (res.data.success === true) {
          setRouteList(res.data.data);
        } else {
          toast.error(res.data.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if(err.message !== "revoke"){
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [token]);
  const handleDeliveryDate = (e) => {
    setDeliveryDateError("");
    if (!e.target.value) {
      setDeliveryDate(null);
      e.target.value = "";
      console.log(e.target.value);
      return;
    }
    const selectedDate = new Date(e.target.value);
    const isoString = selectedDate.toISOString().split("T")[0];
    setDeliveryDate(isoString);
  };

  const handleSelectedOrder = (e) => {
    let updatedList = [...selectedOrder];
    if (e.target.checked && !updatedList.includes(e.target.value)) {
      console.log(e.target.value);
      updatedList.push(parseInt(e.target.value));
    } else {
      updatedList = updatedList.filter(
        (val) => val !== parseInt(e.target.value)
      );
    }
    setSelectedOrder(updatedList);
  };

  const assignToShipment = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
      },
    };

    let bodyData = {};
    let hasError = false;

    if (newShipmentCheck) {
      if (!route || route === 0) {
        setRouteError(
          t("distributor.order_management.listing.please_select_route")
        );
        hasError = true;
      }
      if (!deliveryDate) {
        setDeliveryDateError(
          t("distributor.order_management.listing.please_select_delivery_date")
        );
        hasError = true;
      }

      if (hasError) {
        return;
      }

      bodyData = {
        shipment_number: shipmentId,
        route_id: route,
        delivery_date: deliveryDate,
        order_ids: selectedOrder,
        shipment_type: "new",
      };
    } else {
      if (!shipmentId) {
        setExistingShipemtError(
          t("distributor.order_management.listing.please_select_shipment")
        );
        return;
      }

      bodyData = {
        shipment_id: shipmentId,
        order_ids: selectedOrder,
        shipment_type: "existing",
      };
    }

    apis
      .post("distributor/assignShipmentToOrder", bodyData, config)
      .then((res) => {
        if (res.data.success) {
          toast.success(
            t("distributor.order_management.listing.order_listed_successfully"),
            {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            }
          );
          setShow(false);
          setSelectedOrder([]);
        } else {
          toast.error(t("error_message.something_went_wrong"), {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error(t("error_message.something_went_wrong"), {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };

  const handleCancel = () => {
    setShow(false);
    setDeliveryDate();
    setExistingShipemtCheck(false);
    setNewShipmentCheck(false);
    setShipmentId("");
    setRoute("");
  };
  const handleExistingShipmentCheck = (e) => {
    setExistingShipemtCheck(e.target.checked);
    setNewShipmentCheck(false);
    setShipmentId();
    setRoute();
    setDeliveryDate();
  };
  const handleNewShipmentCheck = (e) => {
    setExistingShipemtCheck(false);
    setNewShipmentCheck(e.target.checked);
    setShipmentId();
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFilter = () => {};

  let data;
  if (rowsPerPage > 0) {
    data = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  } else {
    data = orders;
  }
  const dateFormat = (date) => {
    const parts = date.split("-");
    const formattedDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const formattedDateString = `${(formattedDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${formattedDate
      .getDate()
      .toString()
      .padStart(2, "0")}-${formattedDate.getFullYear()}`;
    return formattedDateString;
  };
  const handleInputChange = (e)=>{
    setQ(e.target.value);
    console.log("value to search", e.target.value)
    const valueTosearch =e.target.value;
    const filterData = allData.filter(
      (product) =>
        product.order_reference.toLowerCase().includes(valueTosearch.toLowerCase()) ||
      product?.supplier_information?.user_profile?.company_name.toLowerCase().includes(valueTosearch.toLowerCase()) ||
      product?.retailer_information?.user_main_address?.address_1.toLowerCase().includes(valueTosearch.toLowerCase())
    );
    setOrders(filterData);  
  }
  console.log(selectedSupplier);
  return (
    <div className="container-fluid page-wrap order-manage">
      <div className="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div className="col main p-0">
          <Header
            title={t("distributor.order_management.listing.title")}
            updateSidebar={updateSidebar}
          />
          {loading ? (
            <div className="d-flex justify-content-center">
              <Oval color="purple" secondaryColor="purple" />
            </div>
          ) : (
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row mb-3">
                <div className="col">
                  <div className="filter-row page-top-filter">
                    {/* [Page Filter Box] */}
                    {/* <div className="filter-box"> */}
                    {/* [Date] */}
                    {/* <label htmlFor=""> From </label>
                      <div className="date-picker">
                        <ReactDatePicker
                          className="btn btn-sm btn-outline-black rounded-pill filterDate"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="MM/DD/YYYY"
                          dateFormat={dateFormat}
                          showPopperArrow={true}
                        />
                      </div>{" "}
                      <label htmlFor=""> To </label>
                      <div className="date-picker">
                        <ReactDatePicker
                          className="btn btn-sm btn-outline-black rounded-pill filterDate"
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          placeholderText="MM/DD/YYYY"
                          dateFormat={dateFormat}
                        />
                      </div> */}
                    {/* [/Date] */}
                    {/* [Supplier] */}
                    {/* <div className="dropdown date-selector">
                        <button
                          className="btn btn-outline-black btn-sm dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {selectedSupplier?.name
                            ? selectedSupplier.name
                            : "Supplier"}
                        </button>
                        <ul className="dropdown-menu">
                          <li onClick={() => handleSelectedSupplier()}>
                            <a className="dropdown-item" href="#">
                              Choose Supplier
                            </a>
                          </li>
                          {linkedSuppliers.length > 0 &&
                            linkedSuppliers.map((sup) => (
                              <>
                                <li
                                  onClick={() =>
                                    handleSelectedSupplier(
                                      sup.full_name,
                                      sup.id
                                    )
                                  }
                                >
                                  <a className="dropdown-item" href="#">
                                    {sup.full_name}
                                  </a>
                                </li>
                              </>
                            ))}
                        </ul>
                      </div>
                    </div> */}
                    {/* [/Page Filter Box] */}

                    {/* Right Filter */}
                    {/* <div class="dropdown right-filter">
                      <button
                        type="button"
                        class="btn dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-auto-close="outside"
                      >
                        <img src={filter} /> Filter
                      </button>
                      <form class="dropdown-menu p-3 ">
                        <div class="mb-3">
                          <label class="form-label">Retailer</label>
                          <select
                            className="form-select"
                            onClick={(e) => setSelectedRetailer(e.target.value)}
                          >
                            <option selected disabled>
                              Choose Retailer
                            </option>
                            {retailerList.map((ret) => (
                              <option value={ret.id}>{ret.full_name}</option>
                            ))}
                          </select>
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Routes</label>
                          <select
                            className="form-select"
                            onClick={(e) => setSelectedRoutes(e.target.value)}
                          >
                            <option selected disabled>
                              Choose Routes
                            </option>
                            {routeList.map((route) => (
                              <option value={route.id}>{route.name}</option>
                            ))}
                          </select>
                        </div>
                        {/* <div class="mb-3">
                          <label class="form-label">Issues</label>
                          <select className="form-select">
                            <option selected disabled>
                              Choose Issues
                            </option>
                            <option value="">Order without warning</option>
                            <option value="">Approval is overdue</option>
                            <option value="">Delivery delay</option>
                            <option value="">Not invoiced or paid</option>
                            <option value="">Payment is overdue</option>
                            <option value="">Needs attention</option>
                          </select>
                        </div> */}
                    {/* <div class="mb-3">
                          <label class="form-label">Order Status</label>
                          <select className="form-select">
                            <option selected disabled>
                              Choose Status
                            </option>
                            <option value="">Approved</option>
                            <option value="">Cancelled</option>
                            <option value="">Delivered</option>
                            <option value="">On hold</option>
                            <option value="">Pending</option>
                            <option value="">Shipped</option>
                          </select>
                        </div> */}
                    {/* <div class="mb-3">
                          <div class="form-check form-check-inline">
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
                              Invoiced
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
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
                              Expired
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
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
                              Paid
                            </label>
                          </div>
                        </div> *
                        <div className="d-flex justify-content-end">
                          <button
                            type="button"
                            class="btn btn-purple width-auto me-2"
                          >
                            Apply
                          </button>
                          <input
                            type="reset"
                            class="btn btn-outline-black width-auto"
                            value="Clear"
                          />
                        </div>
                      </form>
                    </div> */}
                    {/* Right Filter */}
                  </div>
                </div>
              </div>
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
                                      value={q}
                                      placeholder={t(
                                        "supplier.inventory_management.list.search_here"
                                      )}
                                      onChange={(e)=>handleInputChange(e)}
                                    ></input>
                              </div>
                            </div>
                            {/* [/Table Search] */}

                            {/* [Right Filter] */}
                            <div className="filter-row text-end">
                              {/* [Page Filter Box] */}
                              <div className="filter-box">
                                {hasPermission(SHIPMENT_VIEW) &&
                                  hasPermission(SHIPMENT_EDIT) && (
                                    <button
                                      href="#"
                                      className="btn btn-purple btn-sm"
                                      onClick={() => setShow(true)}
                                      disabled={!selectedOrder.length > 0}
                                    >
                                      {t(
                                        "distributor.order_management.listing.assign_to_shipment"
                                      )}
                                    </button>
                                  )}
                                {/* [Date] */}
                                {/* <div className="dropdown date-selector">
                                  <button
                                    className="btn btn-outline-black btn-sm dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <img src={calendar} alt="" /> Delivery Date
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
                                </div> */}
                                {/* [/Date] */}

                                {/* [Supplier] */}
                                {/* <div className="dropdown date-selector">
                                  <button
                                    className="btn btn-outline-black btn-sm dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Set Status
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Approved
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Rejected
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#">
                                        Pending
                                      </a>
                                    </li>
                                  </ul>
                                </div> */}
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
                                  {data?.length > 0 && <th></th>}
                                  <th>
                                    {t(
                                      "distributor.order_management.listing.order_number"
                                    )}
                                  </th>
                                  <th className="text-center">
                                    {t(
                                      "distributor.order_management.listing.osc"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "distributor.order_management.listing.supplier"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "distributor.order_management.listing.retailer"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "distributor.order_management.listing.routes"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "distributor.order_management.listing.status"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "distributor.order_management.listing.quantity"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "distributor.order_management.listing.approval"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "distributor.order_management.listing.shipment"
                                    )}
                                  </th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {orders?.length > 0 ? (
                                  data?.map((order) => (
                                    <tr>
                                      <td>
                                        <input
                                          checked={selectedOrder.includes(
                                            order.id
                                          )}
                                          onChange={(e) =>
                                            handleSelectedOrder(e)
                                          }
                                          value={order.id}
                                          type="checkbox"
                                          disabled={
                                            order?.order_shipments
                                              ?.shipment_information
                                              ?.route_detail
                                          }
                                          name=""
                                          id=""
                                        />{" "}
                                      </td>
                                      <td>{order.order_reference}</td>
                                      <td className="text-center ftAsIcon">
                                        {order?.retailer_information
                                          ?.user_profile?.opc_status === "1" ? (
                                          <FontAwesomeIcon
                                            icon="fa-solid fa-check"
                                            size="1xl"
                                            color="green"
                                          />
                                        ) : (
                                          <FontAwesomeIcon
                                            icon="fa-solid fa-xmark"
                                            size="1xl"
                                            color="red"
                                          />
                                        )}
                                      </td>
                                      <td>
                                        {order?.supplier_information?.user_profile?.company_name}
                                      </td>
                                      <td>
                                        {
                                          order?.retailer_information
                                            ?.user_main_address?.address_1
                                        }
                                      </td>
                                      <td>
                                        {
                                          order?.order_shipments
                                            ?.shipment_information?.route_detail
                                            ?.name
                                        }
                                      </td>
                                      <td>
                                        {order.status === "Approved" && (
                                          <span className="badge text-bg-green">
                                            {t(
                                              "distributor.order_management.listing.approved"
                                            )}
                                          </span>
                                        )}
                                      </td>
                                      <td>{order?.items[0]?.quantity}</td>
                                      <td>{dateFormat(order?.order_date)}</td>
                                      <td>
                                        {order?.order_shipments?.shipment_id}
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
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                onClick={() =>
                                                  navigate(
                                                    `/distributor/order-detail/${order.id}`
                                                  )
                                                }
                                              >
                                                {t(
                                                  "distributor.order_management.listing.view"
                                                )}
                                              </a>
                                            </li>
                                            <li className="seperator">
                                              <a className="dropdown-item">
                                                {t(
                                                  "distributor.order_management.listing.download"
                                                )}
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td className="text-start" colSpan={10}>
                                      {t(
                                        "distributor.order_management.listing.no_order_to_show"
                                      )}
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                              <tfoot>
                                <tr>
                                  {data.length > 0 ? (
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
          )}
        </div>
      </div>
      {/* [Modal] */}

      <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {t("distributor.order_management.listing.assign_to_shipment")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-body">
            <p>Assign 1 Order to shipment</p>
            <div className="routeInfo mb-3">Route 1:5 Orders</div>
            <div className="border-purple p-3">
              <div class="form-check">
                <input
                  value={newShipmentCheck}
                  onChange={(e) => handleNewShipmentCheck(e)}
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="radio1"
                />
                <label class="form-check-label" for="radio1">
                  {t("distributor.order_management.listing.new_shipment")}
                </label>
              </div>
              {newShipmentCheck && (
                <div className="border-purple py-2 px-3 ">
                  <div className="input-group">
                    <select
                      className="form-select rounded-pill"
                      value={route}
                      onChange={(e) => {
                        setRoute(e.target.value);
                        setRouteError("");
                      }}
                    >
                      <option value={0}>
                        {t("distributor.order_management.listing.choose_route")}
                      </option>
                      {routeList.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                    {routeError !== "" ? (
                      <p className="error-label">{routeError}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="input-group mt-2">
                    <input
                      value={deliveryDate}
                      onChange={(e) => handleDeliveryDate(e)}
                      class="form-control rounded-5"
                      type="date"
                      name="daye"
                    />
                    {deliveryDateError !== "" ? (
                      <p className="error-label">{deliveryDateError}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="border-purple p-3 mt-3">
              <div class="form-check">
                <input
                  checked={existingShipmentCheck}
                  onClick={(e) => handleExistingShipmentCheck(e)}
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="radio2"
                />
                <label class="form-check-label" for="radio2">
                  {t("distributor.order_management.listing.existing_shipment")}
                </label>
              </div>
              {existingShipmentCheck && (
                <div className="mt-2">
                  <div className="input-group">
                    <select
                      className="form-select rounded-pill"
                      onChange={(e) => {
                        setShipmentId(e.target.value);
                        setExistingShipemtError("");
                      }}
                    >
                      <option selected disabled>
                        {t(
                          "distributor.order_management.listing.choose_shipment"
                        )}
                      </option>
                      {shipments.map((s) => (
                        <option value={s.id}>{s.id}</option>
                      ))}
                    </select>
                  </div>
                  {existingShipmentError !== "" ? (
                    <p className="error-label">{existingShipmentError}</p>
                  ) : (
                    <></>
                  )}
                  {/* <div className="input-group mt-2">
                    <input
                      value={deliveryDate}
                      onChange={(e) => handleDeliveryDate(e)}
                      class="form-control rounded-5"
                      type="date"
                      name="daye"
                    />
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={() => handleCancel()}
            class="btn btn-outline-black width-auto"
            data-bs-dismiss="modal"
          >
            {t("distributor.order_management.listing.cancel")}
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            onClick={() => assignToShipment()}
            class="btn btn-purple width-auto"
          >
            {t("distributor.order_management.listing.save")}
          </button>
        </Modal.Footer>
      </Modal>
      {/* [/Modal] */}
    </div>
  );
};

export default OrderManagement;
