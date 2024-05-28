import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import filter from "../../assets/images/filter-icon.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { ROLE_EDIT, USER_EDIT } from "../../../Constants/constant";
import LoadingOverlay from "react-loading-overlay";


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

const SuppliearUsersRoles = () => {
  const apis = useAuthInterceptor()
  const token = localStorage.getItem("supplier_accessToken")
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false);
  const [rolesList, setRolesList] = useState("")
  const [userList, setUserList] = useState("")
  const [page1, setPage1] = useState(0);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [page2, setPage2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = useState(5);
  const [loading, setLoading] = useState(true)

  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };

  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(parseInt(event.target.value, 10));
    setPage2(0);
  };

  useEffect(() => {
    const config = {
      headers : {
        Authorization : `Bearer ${token}`,
        permission : "role-view"
      }
    }

    apis.get("/supplier/SupplierRoleList", config)
    .then((res) => {
      if(res.data.success === true){
        setRolesList(res.data.data)
      }else{
        toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
      }
    })
    .catch((error) => {
      if(error.message !== "revoke"){
        toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
      }
    })

    const config1 = {
      headers : {
        Authorization : `Bearer ${token}`,
        permission : "user-view"
      }
    }

    apis.get("supplier/getUserList", config1)
    .then((res) => {
      setLoading(false)
      if(res.data.success === true){
        setUserList(res.data.data)
      }else{
        toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
      }
    })
    .catch((error) => {
      setLoading(false)
      if(error.message !== "revoke"){
        toast.error("Something went wrong. Please try again later.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER,});
      }
    })

  }, [])

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  let data1;
  if (rowsPerPage1 > 0) {
    data1 = userList.slice(
      page1 * rowsPerPage1,
      page1 * rowsPerPage1 + rowsPerPage1
    );
  } else {
    data1 = userList;
  }

  let data2;
  if (rowsPerPage2 > 0) {
    data2 = rolesList.slice(
      page2 * rowsPerPage2,
      page2 * rowsPerPage2 + rowsPerPage2
    );
  } else {
    data2 = rolesList;
  }

  return (
    <div class="container-fluid page-wrap product-manage">
      <div class="row height-inherit">
        <Sidebar
          showSidebar={showSidebar}
          updateSidebar={updateSidebar}
          userType={"supplier"}
        />

        <div class="col main p-0">
          <Header title="Retailer Management" updateSidebar={updateSidebar} />
          <LoadingOverlay
            active={loading}
            spinner
            styles={{
            overlay: (base) => ({
                ...base,
                background: '#fefefe',
                width: '100%',
                '& svg circle': {
                stroke: 'black'
                }
            })
            }}
          >
            <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <div class="tab-link-row position-relative">
                  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="Pricing-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Pricing-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="Pricing-tab-pane"
                        aria-selected="true"
                      >
                        Users
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="Availability-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Availability-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="Availability-tab-pane"
                        aria-selected="false"
                      >
                        Roles
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="Pricing-tab-pane"
                    role="tabpanel"
                    aria-labelledby="Pricing-tab"
                    tabindex="0"
                  >
                    {/* [Card] */}
                    <h6 className="page-title">Manage Users</h6>
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
                                    placeholder="Search by Retailer Name..."
                                  ></input>
                                </div>
                              </div>
                              {/* [/Table Search] */}

                              {/* Right Filter */}
                              <div class="dropdown right-filter">
                                {
                                  hasPermission(USER_EDIT) && 
                                  <button
                                  type="button"
                                  className="btn btn-purple"
                                  onClick={() => navigate('/supplier/user-role-management/add-user')}
                                  >
                                    + Add User
                                  </button>
                                }
                                <button
                                  type="button"
                                  className={`btn dropdown-toggle`}
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  data-bs-auto-close="outside"
                                >
                                  <img src={filter} alt="" /> Filter
                                </button>
                                <form
                                  className={`dropdown-menu p-3`}
                                  data-popper-placement="bottom-end"
                                  style={{
                                    position: "absolute",
                                    inset: "0px 0px auto auto",
                                    margin: "0px",
                                    transform: "translate(0px, 42px)",
                                  }}
                                >
                                  <div class="mb-3">
                                    <label class="form-label">
                                      Retailer Name
                                    </label>
                                    <select className="form-select">
                                      <option value="">Choose Retailer</option>
                                    </select>
                                  </div>
                                  <div class="mb-3">
                                    <label class="form-label">Route Name</label>
                                    <select className="form-select">
                                      <option selected disabled>
                                        Choose Route
                                      </option>
                                    </select>
                                  </div>

                                  <div className="d-flex justify-content-end">
                                    <button
                                      type="button"
                                      class="btn btn-purple width-auto me-2"
                                    >
                                      Apply
                                    </button>
                                    <button
                                      type="button"
                                      class="btn btn-outline-black width-auto"
                                    >
                                      Reset
                                    </button>
                                  </div>
                                </form>
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
                                    <th>NAME</th>
                                    <th>E-MAIL ADDRESS</th>
                                    <th>CONTACT NUMBER</th>
                                    <th>ROLE</th>
                                    <th className="tableActionBox"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    data1 && data1.length > 0 ?
                                    data1.map((ele) => {
                                      return(
                                        <tr>
                                          <td>{ele.full_name}</td>
                                          <td>{ele.email}</td>
                                          <td>{ele.phone_number}</td>
                                          <td>{ele.role_name}</td>
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
                                                    href="/order-detail"
                                                  >
                                                    View
                                                  </a>
                                                </li>
                                                <li>
                                                  <a className="dropdown-item">
                                                    Edit
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    }) :
                                    <>No data to show.</>
                                  }
                                </tbody>
                                <tfoot>
                                  <tr>
                                    {data1.length > 0 ? (
                                      <CustomTablePagination
                                        rowsPerPageOptions={[
                                          5,
                                          10,
                                          15,
                                          { label: "All", value: -1 },
                                        ]}
                                        colSpan={6}
                                        count={userList.length}
                                        rowsPerPage={rowsPerPage1}
                                        page={page1}
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
                                        onPageChange={handleChangePage1}
                                        onRowsPerPageChange={
                                          handleChangeRowsPerPage1
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
                  <div
                    class="tab-pane fade"
                    id="Availability-tab-pane"
                    role="tabpanel"
                    aria-labelledby="Availability-tab"
                    tabindex="1"
                  >
                    {/* [Card] */}
                    <h6 className="page-title">Manage Roles</h6>
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
                                    placeholder="Search by Role Name..."
                                  ></input>
                                </div>
                              </div>
                              {/* [/Table Search] */}

                              {/* Right Filter */}
                              <div class="dropdown right-filter">
                                {
                                  hasPermission(ROLE_EDIT) &&
                                  <button
                                    type="button"
                                    className="btn btn-purple"
                                    onClick={() => navigate("/supplier/user-role-management/add-role")}
                                  >
                                    + Add Role
                                  </button> 
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="table-responsive">
                              <table className="table table-striped m-0">
                                <thead>
                                  <tr>
                                    <th>Role Name</th>
                                    <th>Update Date</th>
                                    <th className="tableActionBox"></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    data2 && data2.length > 0 ? 
                                    data2.map((ele) => {
                                      let myData = ele.updated_at.split("T")[0]
                                      return(
                                        <tr>
                                          <td>{ele.name}</td>
                                          <td>{myData}</td>
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
                                                    href="/order-detail"
                                                  >
                                                    View
                                                  </a>
                                                </li>
                                                <li>
                                                  <a className="dropdown-item">
                                                    Edit
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    }):
                                  <>No data to show</>
                                  }
                                </tbody>
                                <tfoot>
                                  <tr>
                                    {data2.length > 0 ? (
                                      <CustomTablePagination
                                        rowsPerPageOptions={[
                                          5,
                                          10,
                                          15,
                                          { label: "All", value: -1 },
                                        ]}
                                        colSpan={6}
                                        count={rolesList.length}
                                        rowsPerPage={rowsPerPage2}
                                        page={page2}
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
                                        onPageChange={handleChangePage2}
                                        onRowsPerPageChange={
                                          handleChangeRowsPerPage2
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
          </LoadingOverlay>
          
        </div>
      </div>
    </div>
  );
};

export default SuppliearUsersRoles;
