import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { Modal } from "react-bootstrap";
import filter from "../../assets/images/filter-icon.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";

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

const Distributor = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [distributorList, setDistributorList] = useState("");
  const [distributorTableData, setDistributorTableData] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [distributorFilter, setDistributorFilter] = useState("");
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [hideFilter, setHideFilter] = useState("");
  const [show, setShow] = useState(false)
  const [targetDelete, setTargetDelete] = useState("")

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteClick = (targetId) => {
    setTargetDelete(targetId)
    setShow(true)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = () => {
    setShow(false)
    const config = {
      headers : {
        Authorization : `Bearer ${token}`,
        permission : 'user-edit'
      },
      params: {
        id: targetDelete
      }
    }

    apis.get('/deleteUser', config)
    .then((res) => {
      if(res.data.success === true){
        setUpdateList(!updateList)
        toast.success("User deleted successfully.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,})
      }
    })
    .catch((error) => {
      toast.error("Could not delete user. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER});
    })
    
  }

  const handleFilterChange = (e) => {
    setSelectedDistributor(e.target.value);
  };

  const handleResetFilter = () => {
    setSelectedDistributor("");
    setUpdateList(!updateList);
  };

  const handleEditDistributor = (targetId) => {
    navigate(`/distributor-management/edit-distributor/${targetId}`);
  };

  const handleViewDistributor = (targetId) => {
    navigate(`/distributor-management/view-distributor/${targetId}`);
  };

  const handleAdd = () => {
    navigate("/distributor-management/add-distributor");
  };

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "distributor-view",
      },
    };

    let paramObj = {};

    if (search !== "") {
      paramObj["search"] = search;
    }

    if (selectedDistributor !== "") {
      paramObj["filter_user_id"] = selectedDistributor;
    }

    config["params"] = paramObj;

    apis
      .get("/distributorsList", config)
      .then((res) => {
        if (res.data.success === true) {
          setDistributorList(res.data.data);
          setDistributorTableData(res.data.data);
          setHideFilter("");
        } else {
          toast.error(res.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, [search, updateList]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "distributor-view",
      },
    };

    apis
      .get("/distributorFilterList", config)
      .then((res) => {
        if (res.data.success === true) {
          const list = res.data.data;
          list.sort((a, b) => a.first_name.localeCompare(b.first_name));
          setDistributorFilter(list);
          setHideFilter("");
        } else {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);

  const handleStatus = (value, id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "supplier-edit",
        Projectlanguageid: 1,
      },
    };
    const bodyData = {
      user_id: id,
      status: value ? "1" : "0",
    };
    apis
      .post("updateUserStatus", bodyData, config)
      .then((res) => {
        if (res.data.success) {
          const filterData = distributorTableData.map((el) => {
            if (el.id === bodyData.user_id) el.status = bodyData.status;
            return el;
          });
          setDistributorList(filterData);
          toast.success("User status has been updated successfully.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleDistributorLogin = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "superadmin-login",
        Projectlanguageid: 1,
      },
    };
    const bodyData = {
      user_id: id,
    };
    apis
      .post("loginWithOtherUser", bodyData, config)
      .then((res) => {
        if (res.data.success) {
          let result = res.data.data;
          let dashboard_url = "/" + result.usertype + "/dashboard";
          navigate(dashboard_url);
          localStorage.setItem("distributor_accessToken", res.data.data.token);
          localStorage.setItem("userPermissions", JSON.stringify(res.data.data.permissions))
          let name = res.data.data.userProfile ? res.data.data.userProfile.company_name ? res.data.data.userProfile.company_name : "N/A" : "N/A"
          localStorage.setItem(`distributor_fullName`, name)
          localStorage.setItem(`distributor_userImg`, res.data.data.user_image);
        } else {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  let data;
  if (rowsPerPage > 0) {
    data = distributorList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = distributorList;
  }

  return (
    <div className="container-fluid page-wrap product-manage">
      <div className="row height-inherit">
        <Sidebar userType={"admin"} />

        <div className="col main p-0">
          <Header
            title={t("admin.distributor_management.list.title")}
            updateSidebar={updateSidebar}
          />
          <div className="container-fluid page-content-box px-3 px-sm-4">
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
                                placeholder={t(
                                  "admin.distributor_management.list.search_label"
                                )}
                                value={search}
                                onChange={(e) => handleSearchChange(e)}
                              ></input>
                            </div>
                          </div>
                          {/* [/Table Search] */}

                          {/* Right Filter */}
                          <div className="dropdown right-filter">
                            <button
                              className="btn btn-purple btn-sm"
                              onClick={() => handleAdd()}
                            >
                              {t(
                                "admin.distributor_management.list.add_button"
                              )}
                            </button>
                            {/* <button
                              type="button"
                              className={`btn dropdown-toggle ${hideFilter}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              onClick={() => setHideFilter("show")}
                              data-bs-auto-close="outside"
                            >
                              <img src={filter} alt="" />{" "}
                              {t(
                                "admin.distributor_management.list.filter_button"
                              )}
                            </button> */}
                            {/* <form
                              className={`dropdown-menu p-3 ${hideFilter}`}
                              data-popper-placement="bottom-end"
                              style={{
                                position: "absolute",
                                inset: "0px 0px auto auto",
                                margin: "0px",
                                transform: "translate(0px, 42px)",
                              }}
                            >
                              <div className="mb-3">
                                <label className="form-label">
                                  Distributor Name
                                </label>
                                <select
                                  className="form-select"
                                  value={selectedDistributor}
                                  onChange={(e) => handleFilterChange(e)}
                                >
                                  <option value="">Choose Distributor</option>
                                  {distributorFilter &&
                                    distributorFilter.sort().map((ele) => {
                                      return (
                                        <option key={ele.id} value={ele.id}>
                                          {ele.first_name + " " + ele.last_name}
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>

                              <div className="d-flex justify-content-end">
                                <button
                                  type="button"
                                  className="btn btn-purple width-auto me-2"
                                  onClick={() => setUpdateList(!updateList)}
                                >
                                  Apply
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-black width-auto"
                                  onClick={() => handleResetFilter()}
                                >
                                  Reset
                                </button>
                              </div>
                            </form> */}
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
                                <th className="tableNameBox">
                                  {t(
                                    "admin.distributor_management.list.table_col1"
                                  )}
                                </th>
                                <th className="tableNameBox">
                                  {t(
                                    "admin.distributor_management.list.table_col2"
                                  )}
                                </th>
                                <th className="tableNameBox">
                                  {t(
                                    "admin.distributor_management.list.table_col3"
                                  )}
                                </th>
                                <th className="tableNameBox">
                                  {t(
                                    "admin.distributor_management.list.table_col4"
                                  )}
                                </th>

                                <th className="tableActionBox"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && data.length > 0 ? (
                                data.map((ele) => {
                                  return (
                                    <tr key={ele.id}>
                                      <td>{ele.full_name}</td>
                                      <td>
                                        {ele.user_profile &&
                                        ele.user_profile.company_name
                                          ? ele.user_profile.company_name
                                          : "N/A"}
                                      </td>
                                      <td>
                                        {ele.user_main_address
                                          ? ele.user_main_address.address_1
                                          : "N/A"}
                                      </td>

                                      <td>
                                        <div class="form-check form-switch d-inline-flex align-items-center w-auto">
                                          <input
                                            class="form-check-input"
                                            type="checkbox"
                                            checked={
                                              ele.status === "1" ? true : false
                                            }
                                            onChange={(e) =>
                                              handleStatus(
                                                e.target.checked,
                                                ele.id
                                              )
                                            }
                                            role="switch"
                                            id="flexSwitchCheck1"
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className="btn-group dropstart table-action">
                                          <button
                                            type="button"
                                            className="dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                          >
                                            <span></span>
                                          </button>
                                          <ul className="dropdown-menu">
                                            <li>
                                              <p
                                                onClick={() =>
                                                  handleViewDistributor(ele.id)
                                                }
                                                className="dropdown-item"
                                              >
                                                View
                                              </p>
                                              <p
                                                onClick={() =>
                                                  handleEditDistributor(ele.id)
                                                }
                                                className="dropdown-item"
                                              >
                                                Edit
                                              </p>
                                              <p
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleDeleteClick(ele.id)
                                                }
                                              >
                                                Delete User
                                              </p>
                                              <p
                                                className="dropdown-item"
                                                onClick={() =>
                                                  handleDistributorLogin(ele.id)
                                                }
                                              >
                                                Login with this user
                                              </p>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td>No data show.</td>
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
                                      { label: "All", value: -1 },
                                    ]}
                                    labelRowsPerPage={t(
                                      "admin.distributor_management.list.pagination_text"
                                    )}
                                    colSpan={5}
                                    count={distributorList.length}
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
            <Modal
              className="modal fade"
              show={show}
              centered
              onHide={() => {
                setShow(false);
              }}
            >
              <Modal.Header>
                <h5 class="modal-title text-purpal">Are you sure ?</h5>
                <button
                  type="button"
                  class="btn-close text-purpal"
                  aria-label="Close"
                  onClick={() => setShow(false)}
                ></button>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-2">
                  <p>Once you delete the selected user, the user will be removed from system and you won't be able to perform any action on the selected user anymore.</p>
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
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-purple btn-md w-auto"
                  onClick={() => handleDeleteUser()}
                >
                  Delete
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distributor;
