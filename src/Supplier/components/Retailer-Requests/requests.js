import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { height, styled, width } from "@mui/system";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import LoadingOverlay from "react-loading-overlay";
import { Button } from "react-admin";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { GROUP_EDIT, GROUP_VIEW } from "../../../Constants/constant";
import "../../../assets/scss/dashboard.scss";

toast.configure();

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

const Requests = () => {
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("supplier_accessToken");
  const [requestList, setRequestList] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [openModal, setModalopen] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [groupList, setGroupList] = useState("");
  const [selectedGroupName, setSelectedGroupName] = useState("");
  const [requestRetailerData, setRequestRtailerData] = useState({});
  const apis = useAuthInterceptor();
  const [asiDistributorPopup, setAsiDistributorPopup] = useState(false);
  const [assignDistributor, setAssignDistributor] = useState();
  const [emailError, setEmailError] = useState();
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState("1");
  const [formState, setFormState] = useState({
    distributorName: "",
    distributorEmail: "",
  });
  const handleInputChange = (e) => {
    setEmailError("");
    const { name, value } = e.target;
    setFormState({
      ...formState, // Retain other properties in the object
      [name]: value, // Update the relevant field by its name
    });
  };

  const handleSubmitForInvoice = () => {
    console.log("invoive type selecetd", selectedInvoiceType);
    setInvoiceModal(false);
    setSelectedInvoiceType("1");
  };

  const handleSubmit = (e) => {
    if (assignDistributor !== "other") {
      setAsiDistributorPopup(false);
      setInvoiceModal(true);
    } else {
      let emailregex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      e.preventDefault();
      if (
        !emailregex.test(formState.distributorEmail) ||
        formState.distributorEmail == ""
      ) {
        setEmailError(t("retailer.profile.not_a_valid_email"));
      } else {
        console.log("Distributor Information:", formState);
        setAsiDistributorPopup(false);
        setInvoiceModal(true);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAction = (action, target) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "retailer-view",
      },
    };

    const bodyData = {
      action: action,
    };

    apis
      .post(`/supplier/retailerRequests/${target}/action`, bodyData, config)
      .then((res) => {
        setUpdateList(!updateList);
        if (res.data.success === true) {
          let message;
          if (action == "1") {
            message = "Request Accepted";
          } else {
            message = "Request Rejected";
          }
          toast.success(message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Could not take action. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if (error.message !== "revoke") {
          toast.error("Could not take action. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "retailer-view",
      },
    };

    apis
      .get("/supplier/retailerRequests", config)
      .then((res) => {
        setLoading(false);
        if (res.data.success === true) {
          setRequestList(res.data.data);
        } else {
          toast.error("Could not fetch request list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.message !== "revoke") {
          toast.error("Could not fetch request list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [updateList]);

  //another useeffect to get all group
  const handleGroupSubmit = () => {
    // console.log("Datataaa",requestRetailerData.retailer_id)
    // console.log("datatatta",selectedGroupName)
    if (selectedGroupName == "" || selectedGroupName == null) {
      toast.error("Select Group", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const bodyData = {
        user_id: requestRetailerData.retailer_id,
        group_name: selectedGroupName,
      };
      apis
        .post(`/supplier/createSupplierGroupName`, bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            let message = "Group has been assigned";
            setGroupModal(false);
            setAsiDistributorPopup(true);
            toast.success(message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Could not take action. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if (error.message !== "revoke") {
            toast.error("Could not take action. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  useEffect(() => {
    apis
      .get("getSubCategories")
      .then((res) => {
        console.log("Sub categories dara", res.data.data);
        setGroupList(res.data.data);
      })
      .catch((err) => {
        toast.error("Could not Sub Categories list. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);

  let data;
  if (rowsPerPage > 0) {
    data = requestList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = requestList;
  }

  return (
    <div className="container-fluid page-wrap order-manage">
      <div className="row height-inherit">
        <Sidebar userType={"supplier"} />

        <div className="col main p-0">
          <Header title={t("supplier.request.list.title")} />
          <LoadingOverlay
            active={loading}
            spinner
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
                <div className="col" style={{ display: "hidden" }}>
                  <div
                    className="filter-row page-top-filter"
                    style={{ display: "hidden" }}
                  >
                    <div className="filter-box"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="card user-card height-100">
                    <div className="card-body p-0">
                      <div className="row">
                        <div className="col">
                          <div className="table-responsive table-request">
                            <table className="table table-striped m-0">
                              <thead>
                                <tr>
                                  <th>
                                    {t("supplier.request.list.table_col1")}
                                  </th>
                                  <th>
                                    {t("supplier.request.list.table_col2")}
                                  </th>
                                  <th>
                                    {t("supplier.request.list.table_col3")}
                                  </th>
                                  <th>
                                    {t("supplier.request.list.table_col4")}
                                  </th>
                                  <th>
                                    {t("supplier.request.list.table_col5")}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {data && data.length > 0 ? (
                                  data.map((ele) => {
                                    let createdAtdt = new Date(ele.created_at);
                                    let createdAtDateBreak = createdAtdt
                                      .toString()
                                      .split(" ");
                                    let createdAt = `${createdAtDateBreak[2]}-${createdAtDateBreak[1]}-${createdAtDateBreak[3]} @ ${createdAtDateBreak[4]}`;
                                    let statusTag;
                                    if (ele.status === "2") {
                                      statusTag = (
                                        <span className="badge text-bg-orange">
                                          PENDING
                                        </span>
                                      );
                                    } else if (ele.status === "1") {
                                      statusTag = (
                                        <span className="badge text-bg-green">
                                          ACCEPTED
                                        </span>
                                      );
                                    } else {
                                      statusTag = (
                                        <span className="badge text-bg-red">
                                          REJECTED
                                        </span>
                                      );
                                    }
                                    return (
                                      <tr>
                                        <td>
                                          {ele.retailer_information.user_profile
                                            ? ele.retailer_information
                                                .user_profile.business_name
                                              ? ele.retailer_information
                                                  .user_profile.business_name
                                              : "N/A"
                                            : "N/A"}
                                        </td>
                                        <td>{ele.request_note}</td>
                                        <td>{createdAt}</td>
                                        <td>{statusTag}</td>
                                        <td>
                                          {ele.status === "2" ? (
                                            <>
                                              <span
                                                className="m-r-8px "
                                                onClick={() => {
                                                  setModalopen(true);
                                                  setRequestRtailerData(ele);
                                                  console.log(
                                                    "this is the whole object i which retailer is getting",
                                                    ele,
                                                    requestRetailerData,
                                                    "fkk"
                                                  );
                                                }}
                                              >
                                                <i
                                                  class="fa-solid fa-eye-slash"
                                                  style={{
                                                    color: "blue",
                                                    fontSize: "20px",
                                                    cursor: "pointer",
                                                  }}
                                                ></i>
                                              </span>
                                              {openModal ? (
                                                <div className="main_container">
                                                  <div className="header12">
                                                    <span></span>
                                                    <span className="">
                                                      <i
                                                        className="fa fa-eye"
                                                        aria-hidden="true"
                                                      ></i>
                                                    </span>
                                                    <span
                                                      onClick={() =>
                                                        setModalopen(false)
                                                      }
                                                    >
                                                      <i
                                                        className="fa fa-times"
                                                        aria-hidden="true"
                                                      ></i>
                                                    </span>
                                                  </div>

                                                  <div className="address mt-2">
                                                    <FontAwesomeIcon icon="fa-solid fa-store" />
                                                    &nbsp;
                                                    <span>N/A</span>
                                                  </div>

                                                  <div className="mx-3 mt-2 custom-list">
                                                    <div className="text-center group-n">
                                                      {t(
                                                        "supplier.retailer_request.group"
                                                      )}
                                                      :{" "}
                                                      <span>
                                                        {
                                                          requestRetailerData
                                                            .retailer_information
                                                            .user_profile
                                                            .group_name
                                                        }
                                                      </span>
                                                    </div>
                                                    <ul className="mt-2">
                                                      <li>
                                                        <i
                                                          className="fa fa-phone"
                                                          aria-hidden="true"
                                                        ></i>
                                                        <span>
                                                          {requestRetailerData
                                                            .retailer_information
                                                            .phone_number
                                                            ? requestRetailerData
                                                                .retailer_information
                                                                .phone_number
                                                            : requestRetailerData
                                                                .retailer_information
                                                                .user_profile
                                                                .phone_number
                                                            ? requestRetailerData
                                                                .retailer_information
                                                                .user_profile
                                                                .phone_number
                                                            : "N/A"}
                                                        </span>
                                                      </li>
                                                      <li>
                                                        <i class="fa-regular fa-envelope"></i>
                                                        <span>
                                                          {requestRetailerData
                                                            .retailer_information
                                                            .email
                                                            ? requestRetailerData
                                                                .retailer_information
                                                                .email
                                                            : "N/A"}
                                                        </span>
                                                      </li>
                                                      <li>
                                                        <i class="fa-regular fa-envelope-open"></i>
                                                        <span>
                                                          {requestRetailerData
                                                            .retailer_information
                                                            .user_main_address
                                                            .address_1
                                                            ? requestRetailerData
                                                                .retailer_information
                                                                .user_main_address
                                                                .address_1
                                                            : "N/A"}
                                                        </span>
                                                      </li>
                                                    </ul>
                                                    <p>
                                                      {t(
                                                        "supplier.retailer_request.postal_code"
                                                      )}
                                                      :{""}
                                                      <span>
                                                        {requestRetailerData
                                                          .retailer_information
                                                          .user_main_address
                                                          .postal_code
                                                          ? requestRetailerData
                                                              .retailer_information
                                                              .user_main_address
                                                              .postal_code
                                                          : "N/A"}
                                                      </span>
                                                    </p>
                                                    <p>
                                                      {t(
                                                        "supplier.retailer_request.country_name"
                                                      )}
                                                      :{" "}
                                                      <span>
                                                        {requestRetailerData
                                                          .retailer_information
                                                          .user_main_address
                                                          .country
                                                          ? requestRetailerData
                                                              .retailer_information
                                                              .user_main_address
                                                              .country
                                                          : "N/A"}
                                                      </span>
                                                    </p>

                                                    <p>
                                                      {t(
                                                        "supplier.retailer_request.Alcohol_permit"
                                                      )}
                                                      :{" "}
                                                      <span>
                                                        {requestRetailerData
                                                          .retailer_information
                                                          .user_profile
                                                          .alcohol_permit
                                                          ? requestRetailerData
                                                              .retailer_information
                                                              .user_profile
                                                              .alcohol_permit
                                                          : "N/A"}
                                                      </span>
                                                    </p>
                                                    <p>
                                                      {t(
                                                        "supplier.retailer_request.category"
                                                      )}
                                                      : <span>CAD</span>
                                                    </p>
                                                    <p>
                                                      {t(
                                                        "supplier.retailer_request.gst"
                                                      )}
                                                      : <span>N/A</span>
                                                    </p>
                                                    <p>
                                                      {t(
                                                        "supplier.retailer_request.qst"
                                                      )}
                                                      : <span>N/A</span>
                                                    </p>
                                                  </div>

                                                  <div className="footer mt-3">
                                                    <button
                                                      className="content"
                                                      onClick={() => {
                                                        handleAction(
                                                          "1",
                                                          requestRetailerData.id
                                                        );
                                                        setModalopen(false);
                                                        if (
                                                          requestRetailerData
                                                            .retailer_information
                                                            .user_profile
                                                            .group_name === null
                                                        ) {
                                                          setGroupModal(true);
                                                        } else {
                                                          setAsiDistributorPopup(
                                                            true
                                                          );
                                                        }
                                                      }}
                                                    >
                                                      <i
                                                        className="fa fa-check"
                                                        style={{
                                                          fontSize: "20px",
                                                          color: "#27C26C",
                                                        }}
                                                        aria-hidden="true"
                                                      ></i>
                                                    </button>
                                                    <button
                                                      onClick={() => {
                                                        handleAction(
                                                          "0",
                                                          requestRetailerData.id
                                                        );
                                                        setModalopen(false);
                                                      }}
                                                    >
                                                      <i
                                                        className="fa fa-times"
                                                        style={{
                                                          fontSize: "20px",
                                                          color: "red",
                                                        }}
                                                        aria-hidden="true"
                                                      ></i>
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : null}
                                              &emsp;
                                              <span
                                                className="badge action"
                                                onClick={() => {
                                                  handleAction("1", ele.id);
                                                  if (
                                                    ele.retailer_information
                                                      .user_profile
                                                      .group_name === null
                                                  ) {
                                                    setRequestRtailerData(ele);
                                                    setGroupModal(true);
                                                  } else {
                                                    setAsiDistributorPopup(
                                                      true
                                                    );
                                                  }
                                                }}
                                                style={{ color: "#27c26c" }}
                                              >
                                                <i
                                                  className="fa fa-check"
                                                  aria-hidden="true"
                                                ></i>
                                              </span>{" "}
                                              &emsp;
                                              <span
                                                className="badge action text-bg-red"
                                                onClick={() =>
                                                  handleAction("0", ele.id)
                                                }
                                              >
                                                <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                                              </span>
                                            </>
                                          ) : null}
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <>No data to show</>
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
                                        { label: "All", value: -1 },
                                      ]}
                                      labelRowsPerPage={t(
                                        "admin.supplier_management.list.pagination_text"
                                      )}
                                      colSpan={11}
                                      count={requestList.length}
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
                  {/* [Modal is request has not setected any group] */}
                  <Modal
                    className="modal fade"
                    show={groupModal}
                    centered
                    onHide={() => {
                      setGroupModal(false);
                    }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {" "}
                        {t("supplier.retailer_request.assign_group")}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <select
                        className="rounded-pill"
                        style={{ width: "100%", height: "40px" }}
                        value={selectedGroupName}
                        onChange={(e) => {
                          setSelectedGroupName(e.target.value);
                        }}
                      >
                        <option value="">
                          {" "}
                          {t("supplier.retailer_request.assign_group")}
                        </option>
                        {groupList && groupList.length > 0 ? (
                          groupList.map((ele) => {
                            return (
                              <>
                                <option value={ele.name}>{ele.name}</option>
                              </>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </select>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        type="button"
                        className="btn btn-outline-black me-2"
                        onClick={() => {
                          setGroupModal(false);
                          setSelectedGroupName("");
                        }}
                      >
                        {t("retailer.dashboard.cancel")}
                      </button>
                      <button
                        className="btn btn-purple rounded-pill "
                        type="submit"
                        // making api call for aet the group name of retailer for now we jus close his modal
                        onClick={() => {
                          handleGroupSubmit();
                        }}
                      >
                        {t("landing.contact.verify_btn")}
                      </button>
                    </Modal.Footer>
                  </Modal>

                  {/* Modal for assigning distributor */}
                  <Modal
                    className="modal fade"
                    show={asiDistributorPopup}
                    centered
                    backdrop="static"
                    onHide={() => {
                      setAsiDistributorPopup(false);
                    }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {t("supplier.retailer_request.selectDistributor")}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="w-100">
                        <select
                          className="rounded-pill w-100"
                          value={assignDistributor}
                          style={{ height: "8vh" }}
                          onChange={(e) => {
                            setAssignDistributor(e.target.value);
                          }}
                        >
                          <option value="Bucké">Bucké</option>
                          <option value="selfDistribution">
                            {t("supplier.retailer_request.selfDistribuor")}
                          </option>
                          <option value="otherBlpDistribuor">
                            {t("supplier.retailer_request.otheBplDistributor")}
                          </option>
                          <option value="other">
                            {t("supplier.retailer_request.other")}
                          </option>
                        </select>
                      </div>

                      {assignDistributor == "other" ? (
                        <>
                          <form onSubmit={handleSubmit}>
                            <div>
                              <div className="mt-4">
                                {/* Input for distributor name */}
                                <label className="form-label">
                                  {"Distributor Name"}
                                  <sup>*</sup>
                                </label>
                                <input
                                  className="form-control"
                                  type="text"
                                  name="distributorName"
                                  value={formState.distributorName}
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>

                              <div>
                                <label className="form-label">
                                  {"Enter Distribuor Email"}
                                  <sup>*</sup>
                                </label>
                                <input
                                  className="form-control "
                                  type="email"
                                  name="distributorEmail"
                                  value={formState.distributorEmail}
                                  onChange={handleInputChange}
                                  required
                                />
                                {emailError ? emailError : ""}
                              </div>
                            </div>
                          </form>
                        </>
                      ) : (
                        <></>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        type="button"
                        className="btn btn-outline-black me-2"
                        onClick={() => {
                          setAsiDistributorPopup(false);
                        }}
                      >
                        {t("retailer.dashboard.cancel")}
                      </button>
                      <button
                        className="btn btn-purple rounded-pill "
                        type="submit"
                        onClick={handleSubmit}
                      >
                        {t("landing.contact.verify_btn")}
                      </button>
                    </Modal.Footer>
                  </Modal>

                  {/* Modal for Assign invoice */}
                  <Modal
                    className="modal fade"
                    show={invoiceModal}
                    centered
                    backdrop="static"
                    onHide={() => {
                      setInvoiceModal(false);
                    }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {" "}
                        {t("supplier.retailer_request.invoice")}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <label>
                          <input
                            type="radio"
                            value="1"
                            checked={selectedInvoiceType === "1"}
                            onChange={(e) => {
                              setSelectedInvoiceType(e.target.value);
                            }}
                          />
                          <span
                            className="mt-3"
                            style={{ padding: "10px 20px" }}
                          >
                            {t("supplier.retailer_request.invoice1")}
                          </span>
                        </label>

                        <label>
                          <input
                            type="radio"
                            value="2"
                            checked={selectedInvoiceType === "2"}
                            onChange={(e) => {
                              setSelectedInvoiceType(e.target.value);
                            }}
                          />
                          <span
                            className="mt-3"
                            style={{ padding: "10px 20px" }}
                          >
                            {t("supplier.retailer_request.invoice2")}
                          </span>
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="3"
                            checked={selectedInvoiceType === "3"}
                            onChange={(e) => {
                              setSelectedInvoiceType(e.target.value);
                            }}
                          />
                          <span
                            className="mt-3"
                            style={{ padding: "10px 20px" }}
                          >
                            {t("supplier.retailer_request.invoice3")}
                          </span>
                        </label>

                        <label>
                          <input
                            type="radio"
                            value="4"
                            checked={selectedInvoiceType === "4"}
                            onChange={(e) => {
                              setSelectedInvoiceType(e.target.value);
                            }}
                          />
                          <span
                            className="mt-3"
                            style={{ padding: "10px 20px" }}
                          >
                            {t("supplier.retailer_request.invoice4")}
                          </span>
                        </label>

                        <label>
                          <input
                            type="radio"
                            value="5"
                            checked={selectedInvoiceType === "5"}
                            onChange={(e) => {
                              setSelectedInvoiceType(e.target.value);
                            }}
                          />
                          <span
                            className="mt-3"
                            style={{ padding: "10px 20px" }}
                          >
                            {t("supplier.retailer_request.invoice5")}
                          </span>
                        </label>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        type="button"
                        className="btn btn-outline-black me-2"
                        onClick={() => {
                          setInvoiceModal(false);
                        }}
                      >
                        {t("retailer.dashboard.cancel")}
                      </button>
                      <button
                        className="btn btn-purple rounded-pill "
                        type="submit"
                        onClick={handleSubmitForInvoice}
                      >
                        {t("landing.contact.verify_btn")}
                      </button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </LoadingOverlay>
        </div>
      </div>
    </div>
  );
};

export default Requests;
