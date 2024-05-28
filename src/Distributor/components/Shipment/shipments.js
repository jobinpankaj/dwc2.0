import React, { useEffect, useState } from "react";
import filter from "../../assets/images/filter-icon.png";

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { SHIPMENT_EDIT } from "../../../Constants/constant";

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

const Shipments = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const apis = useAuthInterceptor();
  const token = localStorage.getItem("distributor_accessToken");
  const [loading, setLoading] = useState(false);
  const [shipmentList, setShipmentList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedShipment, setSelectedShipment] = useState([]);
  const [route, setRoute] = useState(0);
  const [routeList, setRouteList] = useState([]);
  const [shipmentId, setShipmentId] = useState();
  const [deliveryDate, setDeliveryDate] = useState(Date);
  const [show, setShow] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [reload,setReload]=useState(false)

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

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

  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-view",
      },
    };
    apis
      .get(`distributor/shipments?search=${keyword}`, config)
      .then((res) => {
        if (res?.data?.success === true) {
          setShipmentList(res.data.data);
          setLoading(false);
        } else {
          toast.error(res.data.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }
      });
      
  }, [reload]);

  const handleSearch = (e) => {
    setDropdownVisible(false);
    setKeyword(e);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-view",
      },
    };
    setLoading(false);

    apis
      .get(
        `distributor/shipments?search=${e}&filter_status=${filterStatus}`,
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          setShipmentList(res.data.data);
          setLoading(false);
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
        setLoading(false);
      }
      });
  };
  const AddShipment = () => {
    if (route === 0) {
      toast.error("Please select a Route ", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
      },
    };
    const bodyData = {
      shipment_number: shipmentId,
      route_id: route,
      delivery_date: deliveryDate,
    };

    apis
      .post(`distributor/shipments/add`, bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Shipment details has been added successfully!", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          setShow(false);
          setRoute(0);
          handleSearch("");
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
        toast.error(err.response.data.data.shipment_number[0], {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }
      });
  };

  const handleDeliveryDate = (e) => {
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

  const fetchValueById = (id) => {
    const item = routeList.find((obj) => obj.id === id);
    return item ? item.name : null;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSelectedShipment = (e) => {
    let updatedList = [...selectedShipment];
    if (e.target.checked && !updatedList.includes(e.target.value)) {
      console.log(e.target.value);
      updatedList.push(parseInt(e.target.value));
    } else {
      updatedList = updatedList.filter(
        (val) => val !== parseInt(e.target.value)
      );
    }
    setSelectedShipment(updatedList);
  };

  let data;
  if (rowsPerPage > 0) {
    data = shipmentList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = shipmentList;
  }
  const handleSetStatus = (status) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
      },
    };
    const bodyData = {
      shipment_id: selectedShipment,
      status: status,
    };
    if (selectedShipment.length < 1) {
      console.log("return");
      return;
    }
    apis
      .post(`distributor/shipments/updateStatus`, bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          setShipmentList(res.data.data);
          toast.success("Shipment status has been updated.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
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
  };
  const handleUpdateDeliveryDate = (date) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "shipment-edit",
      },
    };
    const bodyData = {
      shipment_id: selectedShipment,
      delivery_date: date,
    };
    if (selectedShipment.length < 1) {
      return;
    }
    apis
      .post(
        `distributor/shipments/updateShipmentDeliveryDate`,
        bodyData,
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          setShipmentList(res.data.data);
          toast.success("Shipment delivery date has been updated.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
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
        toast.error(err.response.data.data, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  };
  return (
    <div class="container-fluid page-wrap product-manage">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />
        <div class="col main p-0">
          <Header
            title={t("distributor.shipments.title")}
            updateSidebar={updateSidebar}
          />
          {loading ? (
            <div className="d-flex justify-content-center">
              <Oval color="purple" secondaryColor="purple" />
            </div>
          ) : (
            <div class="container-fluid page-content-box px-3 px-sm-4">
              <div class="row">
                <div class="col">
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
                                  value={keyword}
                                  onChange={(e) => handleSearch(e.target.value)}
                                  className="search-input"
                                  placeholder={t(
                                    "distributor.shipments.search_here"
                                  )}
                                ></input>
                              </div>
                            </div>
                            {/* [/Table Search] */}

                            {/* Right Filter */}
                            <div class="filter-box">
                              {hasPermission(SHIPMENT_EDIT) && (
                                <a
                                  href="#"
                                  className="btn btn-purple btn-sm"
                                  onClick={() => setShow(true)}
                                >
                                  + {t("distributor.shipments.create_shipment")}
                                </a>
                              )}
                              {hasPermission(SHIPMENT_EDIT) &&
                                selectedShipment.length > 0 && (
                                  <>
                                    <div className="dropdown date-selector">
                                      <button
                                        className="btn btn-outline-black btn-sm dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                      >
                                        {t("distributor.shipments.set_status")}
                                      </button>
                                      <ul className="dropdown-menu">
                                        <li
                                          onClick={() => handleSetStatus(3)}
                                          className="dropdown-item"
                                        >
                                          Preparing
                                        </li>
                                        <li
                                          onClick={() => handleSetStatus(2)}
                                          className="dropdown-item"
                                        >
                                          Shipping
                                        </li>
                                        <li
                                          onClick={() => handleSetStatus(1)}
                                          className="dropdown-item"
                                        >
                                          Done
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="date-selector">
                                      <input
                                        className="btn btn-outline-black btn-sm "
                                        type="date"
                                        onChange={(e) =>
                                          handleUpdateDeliveryDate(
                                            e.target.value
                                          )
                                        }
                                        placeholder="Set Delivery Date"
                                      ></input>
                                    </div>
                                  </>
                                )}
                              <div class="dropdown right-filter">
                                <button
                                  type="button"
                                  class="btn dropdown-toggle"
                                  onClick={() =>
                                    setDropdownVisible(!dropdownVisible)
                                  }
                                >
                                  <img src={filter} alt="" />{" "}
                                  {t("distributor.shipments.filter")}
                                </button>
                                {dropdownVisible && (
                                  <form
                                    class="dropdown-menu d-block p-3 "
                                    style={{ left: "auto", right: 0 }}
                                  >
                                    <div class="mb-3">
                                      <label class="form-label">
                                        {t(
                                          "distributor.shipments.shipment_status"
                                        )}
                                      </label>
                                      <select
                                        className="form-select"
                                        onChange={(e) =>
                                          setFilterStatus(e.target.value)
                                        }
                                        value={filterStatus}
                                      >
                                        <option selected value={""}>
                                          {t(
                                            "distributor.shipments.choose_status"
                                          )}
                                        </option>
                                        <option value={"4"}>Draft</option>
                                        <option value={"3"}>Preparation</option>
                                        <option value={"2"}>Shipping</option>
                                        <option value={"1"}>Done</option>
                                      </select>
                                    </div>

                                    <div className="d-flex justify-content-end">
                                      <button
                                        type="button"
                                        class="btn btn-purple width-auto me-2"
                                        onClick={() => handleSearch(keyword)}
                                      >
                                        {t("distributor.shipments.apply")}
                                      </button>
                                      <button
                                        type="button"
                                        class="btn btn-outline-black width-auto"
                                        onClick={()=>{
                                          setKeyword("")
                                          setFilterStatus("")
                                          setReload(!reload)
                                        }}
                                      >
                                        {t("distributor.shipments.reset")}
                                      </button>
                                    </div>
                                  </form>
                                )}
                              </div>
                            </div>
                            {/* Right Filter */}
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
                                    {t("distributor.shipments.shipment_no.")}
                                  </th>
                                  <th>
                                    {t("distributor.shipments.delivery_date")}
                                  </th>
                                  <th>{t("distributor.shipments.status")}</th>
                                  <th>
                                    {t("distributor.shipments.main_route")}
                                  </th>
                                  <th>
                                    {t("distributor.shipments.orders_count")}
                                  </th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((s) => (
                                  <tr>
                                    {hasPermission(SHIPMENT_EDIT) && (
                                      <td>
                                        <input
                                          checked={selectedShipment.includes(
                                            s.id
                                          )}
                                          onChange={(e) =>
                                            handleSelectedShipment(e)
                                          }
                                          value={s.id}
                                          type="checkbox"
                                          name=""
                                          id=""
                                        />{" "}
                                      </td>
                                    )}
                                    <td>{s.id}</td>
                                    <td>
                                      {new Date(s.delivery_date)
                                        .toLocaleDateString("en-US", {
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                        })
                                        .replace(/\//g, "-")}
                                    </td>
                                    <td>{s.statusTitle}</td>
                                    <td>
                                      {fetchValueById(s.route_id) === "" ||
                                      fetchValueById(s.route_id) === null
                                        ? "N/A"
                                        : fetchValueById(s.route_id)}
                                    </td>
                                    <td>{s.order_shipments_count}</td>
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
                                            <NavLink
                                              to={`/distributor/shipments-detail?id=${s.id}`}
                                              className="dropdown-item"
                                            >
                                              <svg
                                                width="17"
                                                height="14"
                                                viewBox="0 0 17 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M9.77666 0.895528C9.65954 0.911037 9.54812 0.966745 9.46537 1.05111L0.532926 9.98323C0.453644 10.0624 0.400294 10.1671 0.382799 10.2778L0.00489416 12.6679C-0.0443624 12.998 0.286659 13.3261 0.616314 13.2737L3.00641 12.9012C3.11708 12.8839 3.22179 12.8304 3.30095 12.7511L12.2277 3.81898C12.4259 3.62133 12.4259 3.26066 12.2277 3.06301L10.2155 1.05082C10.0609 0.893127 9.93397 0.885929 9.77641 0.895236L9.77666 0.895528ZM9.84341 2.18513L11.0996 3.44135L2.66744 11.8732L1.17787 12.1067L1.41137 10.6171L9.84341 2.18513ZM5.51361 12.2124C5.21894 12.2124 4.97997 12.4512 4.97997 12.746C4.97997 13.0407 5.21893 13.2797 5.51361 13.2797H15.4742C15.7689 13.2797 16.0078 13.0407 16.0078 12.746C16.0078 12.4514 15.7689 12.2124 15.4742 12.2124H5.51361Z"
                                                  fill=""
                                                  fill-opacity="0.8"
                                                />
                                              </svg>
                                              {t(
                                                "distributor.shipments.view_details"
                                              )}
                                            </NavLink>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                                {data.length === 0 && (
                                  <tr>
                                    {t("distributor.shipments.no_data_to_show")}
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
                                          label: t("distributor.shipments.all"),
                                          value: -1,
                                        },
                                      ]}
                                      labelRowsPerPage={t(
                                        "distributor.shipments.rows_per_page"
                                      )}
                                      colSpan={7}
                                      count={shipmentList.length}
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
      {/* <div class="modal fade" id="createShipment" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" se>
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content p-3">
                        <div class="modal-header justify-content-start">
                            <h6 class="modal-title">
                                New shipment
                            </h6>
                            <hr />
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Create Shipment</p>
                            <div className="border-purple py-2 px-3 ">
                                <div className="mt-2">
                                    <label>Shipmet Id</label>
                                    <div className="input-group">
                                        <input type="number" value={shipmentId} onChange={(e) => setShipmentId(e.target.value)} placeholder="Enter here" className="form-control rounded-pill" />
                                    </div>
                                </div>
                                <div class="mb-0">
                                    <label class="form-label">
                                        Select Route
                                    </label>
                                </div>
                                <div className="input-group">
                                    <select className="form-select rounded-pill" value={route} onChange={(e) => setRoute(e.target.value)}>
                                        <option value={0}>Choose Route</option>
                                        {routeList.map((r) =>
                                            <option key={r.id} value={r.id}>{r.name}</option>)}
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label>Delivery Date</label>
                                    <div className="input-group">
                                        <input type="date" placeholder="Select Date" value={deliveryDate} onChange={(e) => handleDeliveryDate(e)} className="form-control rounded-pill" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0 justify-content-center">
                            <button type="submit" class="btn btn-outline-black me-2">Cancel</button>
                            <button type="submit" onClick={() => AddShipment()} class="btn btn-purple">Create</button>
                        </div>
                    </div>
                </div>
            </div> */}

      <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => {
          setShow(false);
          setRoute(0);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("distributor.shipments.new_shipment")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="modal-body">
            <div className="border-purple py-2 px-3 ">
              <div className="input-group">
                <select
                  className="form-select rounded-pill"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                >
                  <option value={0}>
                    {t("distributor.shipments.choose_route")}
                  </option>
                  {routeList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            onClick={() => setShow(false)}
            class="btn btn-outline-black me-2"
          >
            {t("distributor.shipments.cancel")}
          </button>
          <button
            type="submit"
            onClick={() => AddShipment()}
            class="btn btn-purple"
          >
            {t("distributor.shipments.create")}
          </button>
        </Modal.Footer>
      </Modal>
      {/* [/Modal] */}
    </div>
  );
};

export default Shipments;
