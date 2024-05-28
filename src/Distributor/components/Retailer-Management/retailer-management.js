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
import { useTranslation } from "react-i18next";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { RETAILER_VIEW, ROUTES_VIEW } from "../../../Constants/constant";

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

const DistributorRetailer = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("distributor_accessToken");
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [retailerList, setRetailerList] = useState("");
  const [retailerFilter, setRetailerFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRetailer, setSelectedRetailer] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [search, setSearch] = useState("");
  const [hideFilter, setHideFilter] = useState("");
  const [hideAddRoute, setHideAddRoute] = useState("");
  const [supplierIdList, setSupplierIdList] = useState([]);
  const [routeList, setRouteList] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [filterRetailer, setFilterRetailer] = useState("");
  const [filterRoute, setFilterRoute] = useState("");
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount(count + 1);
  };

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditRetailer = () => {
    navigate(`/distributor/retailer-managment/edit-retailer/`);
  };

  const handleViewRetailer = (value) => {
    navigate(`/distributor/retailer-managment/retailer-details/${value}`);
  };

  const handleFilterChange = (e) => {
    setFilterRetailer(e.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleResetFilter = () => {
    setSelectedRetailer("");
    setUpdateList(!updateList);
  };
  const handleAddResetFilter = () => {
    setSelectedRoute("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (hasPermission(ROUTES_VIEW)) {
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
    }
  }, [token]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "retailer-view",
      },
    };

    let paramObj = {};

    if (search !== "") {
      paramObj["search"] = search;
    }

    if (selectedRetailer !== "") {
      paramObj["filter_user_id"] = selectedRetailer;
    }

    config["params"] = paramObj;

    apis
      .get("distributor/retailersList", config)
      .then((res) => {
        if (res.data.success === true) {
          setRetailerList(res.data.data);
          setHideFilter("");
        } else {
          toast.error(t("error_message.something_went_wrong"), {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error(t("error_message.something_went_wrong"), {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
    console.log("Effect ran! Count:", count);
  }, [search, updateList, count]);

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       permission: "retailer-view"
  //     },
  //   }

  //   apis.get("/retailerFilterList", config)
  //     .then((res) => {
  //       if (res.data.success === true) {
  //         const list = res.data.data
  //         list.sort((a, b) => {
  //           let firstNameA = a.first_name;
  //           let firstNameB = b.first_name;
  //           if (a.first_name === null) {
  //             firstNameA = ""
  //           }
  //           if (b.first_name === null) {
  //             firstNameB = ""
  //           }

  //           return firstNameA.localeCompare(firstNameB);
  //         });
  //         setRetailerFilter(list)
  //         setHideFilter("")
  //       }
  //       else {
  //         toast.error("Something went wrong. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Something went wrong. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
  //     })
  // }, [])

  const filteredRetailer = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "retailer-view",
      },
    };
    apis
      .get(
        `distributor/retailersList?filter_retailer_id=${filterRetailer}&filter_route_id=${filterRoute}`,
        config
      )
      .then((res) => {
        console.log(res, "Filtered Product");
        setRetailerList(res.data.data);
        setHideFilter("");
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

  const handleSupplierlist = (e) => {
    let updatedList = [...supplierIdList];

    if (e.target.checked) {
      updatedList.push(parseInt(e.target.value));
    } else {
      updatedList = updatedList.filter(
        (val) => val !== parseInt(e.target.value)
      );
    }

    setSupplierIdList(updatedList);
  };

  const handleAllSupplierlist = (e) => {
    let updatedList = new Set(supplierIdList);

    if (e.target.checked) {
      data.forEach((r) => {
        updatedList.add(r.id);
      });
    } else {
      updatedList.clear();
    }

    setSupplierIdList(Array.from(updatedList));
  };
  console.log(supplierIdList, supplierIdList.length);
  const handleAddRoute = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "routes-edit",
      },
    };
    const bodyData = {
      route_id: selectedRoute,
      user_ids: supplierIdList,
    };
    apis
      .post("distributor/addRouteToRetailer", bodyData, config)
      .then((res) => {
        setHideAddRoute(false);
        toast.success(
          t(
            "distributor.retailer_management.listing.routes_added_successfully"
          ),
          { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
        );
        incrementCount();
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
  const handleRemoveRoute = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "routes-edit",
      },
    };
    const bodyData = {
      user_ids: supplierIdList,
    };
    apis
      .post("distributor/removeRetailerFromRoutes", bodyData, config)
      .then((res) => {
        toast.success(
          t(
            "distributor.retailer_management.listing.routes_removed_successfully"
          ),
          { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
        );
        incrementCount();
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
  let data;
  if (rowsPerPage > 0) {
    data = retailerList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = retailerList;
  }
  return (
    <div class="container-fluid page-wrap product-manage">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header
            title={t("distributor.retailer_management.title")}
            updateSidebar={updateSidebar}
          />
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
                                value={search}
                                onChange={(e) => handleSearch(e)}
                                className="search-input"
                                placeholder={t(
                                  "distributor.retailer_management.listing.search_by_retailer_name"
                                )}
                              ></input>
                            </div>
                          </div>
                          {/* [/Table Search] */}

                          {/* Right Filter */}
                          {hasPermission(ROUTES_VIEW) && (
                            <div class="dropdown right-filter">
                              <button
                                type="button"
                                disabled={
                                  supplierIdList.length > 0 ? false : true
                                }
                                className={`btn btn-purple mx-2 btn-sm btn dropdown-toggle ${hideFilter}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={() => setHideAddRoute("show")}
                                data-bs-auto-close="outside"
                                id="add-route"
                              >
                                +{" "}
                                {t(
                                  "distributor.retailer_management.listing.add_route"
                                )}
                              </button>
                              <form
                                id="add-route"
                                className={`dropdown-menu p-3 ${hideAddRoute}`}
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
                                    {t(
                                      "distributor.retailer_management.listing.route_name"
                                    )}
                                  </label>
                                  <select
                                    className="form-select"
                                    value={selectedRoute}
                                    onChange={(e) =>
                                      setSelectedRoute(e.target.value)
                                    }
                                  >
                                    <option selected value={""}>
                                      {t(
                                        "distributor.retailer_management.listing.choose_route"
                                      )}
                                    </option>
                                    {routeList &&
                                      routeList.map((ele) => {
                                        return (
                                          <option key={ele.id} value={ele.id}>
                                            {ele.name}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>

                                <div className="d-flex justify-content-end">
                                  <button
                                    type="button"
                                    class="btn btn-purple width-auto me-2"
                                    onClick={() => handleAddRoute()}
                                  >
                                    {t(
                                      "distributor.retailer_management.listing.add"
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-outline-black width-auto"
                                    onClick={() => handleAddResetFilter()}
                                  >
                                    {t(
                                      "distributor.retailer_management.listing.reset"
                                    )}
                                  </button>
                                </div>
                              </form>
                              <button
                                type="button"
                                onClick={() => handleRemoveRoute()}
                                disabled={
                                  supplierIdList.length > 0 ? false : true
                                }
                                className="btn btn-purple btn-sm mx-4"
                              >
                                {t(
                                  "distributor.retailer_management.listing.remove_route"
                                )}
                              </button>
                              <button
                                type="button"
                                className={`btn dropdown-toggle ${hideFilter}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={() => setHideFilter("show")}
                                data-bs-auto-close="outside"
                              >
                                <img src={filter} alt="" />{" "}
                                {t(
                                  "distributor.retailer_management.listing.filter"
                                )}
                              </button>
                              <form
                                className={`dropdown-menu p-3 ${hideFilter}`}
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
                                    {t(
                                      "distributor.retailer_management.listing.retailer_name"
                                    )}
                                  </label>
                                  <select
                                    className="form-select"
                                    value={filterRetailer}
                                    onChange={(e) => handleFilterChange(e)}
                                  >
                                    <option value="">
                                      {t(
                                        "distributor.retailer_management.listing.choose_retailer"
                                      )}
                                    </option>
                                    {retailerList &&
                                      retailerList.map((ele) => {
                                        return (
                                          <option key={ele.id} value={ele.id}>
                                            {ele.first_name +
                                              " " +
                                              ele.last_name}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                                <div class="mb-3">
                                  <label class="form-label">
                                    {t(
                                      "distributor.retailer_management.listing.route_name"
                                    )}
                                  </label>
                                  <select
                                    className="form-select"
                                    value={filterRoute}
                                    onChange={(e) =>
                                      setFilterRoute(e.target.value)
                                    }
                                  >
                                    <option selected value={""}>
                                      {t(
                                        "distributor.retailer_management.listing.choose_route"
                                      )}
                                    </option>
                                    {routeList &&
                                      routeList.map((ele) => {
                                        return (
                                          <option key={ele.id} value={ele.id}>
                                            {ele.name}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>

                                <div className="d-flex justify-content-end">
                                  <button
                                    type="button"
                                    class="btn btn-purple width-auto me-2"
                                    onClick={(e) => filteredRetailer(e)}
                                  >
                                    {t(
                                      "distributor.retailer_management.listing.apply"
                                    )}
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-outline-black width-auto"
                                    onClick={() => handleResetFilter()}
                                  >
                                    {t(
                                      "distributor.retailer_management.listing.reset"
                                    )}
                                  </button>
                                </div>
                              </form>
                            </div>
                          )}
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
                                {hasPermission(ROUTES_VIEW) && (
                                  <th>
                                    <input
                                      type="checkbox"
                                      checked={
                                        data.length > 0 &&
                                        data.every((element) =>
                                          supplierIdList.includes(element.id)
                                        )
                                      }
                                      onChange={(e) => handleAllSupplierlist(e)}
                                      name=""
                                      id=""
                                    />
                                  </th>
                                )}

                                <th>
                                  {t(
                                    "distributor.retailer_management.listing.retailer_name"
                                  )}
                                </th>
                                <th>
                                  {t(
                                    "distributor.retailer_management.listing.routes"
                                  )}
                                </th>
                                <th>
                                  {t(
                                    "distributor.retailer_management.listing.address"
                                  )}
                                </th>
                                <th>
                                  {t(
                                    "distributor.retailer_management.listing.osc"
                                  )}
                                </th>
                                <th>
                                  CAD
                                </th>

                                <th className="tableActionBox"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {data && data.length > 0 ? (
                                data.map((ele) => {
                                  return (
                                    <tr key={ele.id}>
                                      {
                                      hasPermission(ROUTES_VIEW) && (
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={supplierIdList.includes(
                                              ele.id
                                            )}
                                            onChange={(e) =>
                                              handleSupplierlist(e)
                                            }
                                            value={ele.id}
                                            name=""
                                            id=""
                                          />
                                        </td>
                                      )}
                                      <td>
                                        {!ele.full_name || ele.full_name === ""
                                          ? "N/A"
                                          : ele.full_name}
                                      </td>
                                      <td>
                                        {ele.user_routes &&
                                        ele.user_routes.length > 0 ? (
                                          <>
                                            {ele.user_routes.map((r, index) => {
                                              return (
                                                <p className="mb-0">
                                                  {index + 1}. {r.name}
                                                </p>
                                              );
                                            })}
                                          </>
                                        ) : (
                                          "N/A"
                                        )}
                                      </td>

                                      <td>
                                        {ele.user_main_address
                                          ? ele.user_main_address.address_1
                                          : "N/A"}
                                      </td>
                                      <td>
                                        {ele.user_profile ? (
                                          ele.user_profile.opc_status ===
                                          "1" ? (
                                            <FontAwesomeIcon
                                              icon="fa-solid fa-check"
                                              size="2xl"
                                              color="green"
                                            />
                                          ) : (
                                            <FontAwesomeIcon
                                            icon="fa-solid fa-xmark"
                                            size="2xl"
                                            color="red"
                                          />
                                          )
                                        ) : (
                                          <FontAwesomeIcon
                                            icon="fa-solid fa-xmark"
                                            size="2xl"
                                            color="red"
                                          />
                                        )}
                                      </td>
                                      <td>
                                        {ele.user_profile ? (
                                          ele.user_profile.home_consumption ===
                                          "1" ? (
                                            <FontAwesomeIcon
                                              icon="fa-solid fa-check"
                                              size="2xl"
                                              color="green"
                                            />
                                          ) : (
                                            <FontAwesomeIcon
                                            icon="fa-solid fa-xmark"
                                            size="2xl"
                                            color="red"
                                          />
                                          )
                                        ) : (
                                          <FontAwesomeIcon
                                            icon="fa-solid fa-xmark"
                                            size="2xl"
                                            color="red"
                                          />
                                        )}
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
                                                  handleViewRetailer(ele.id)
                                                }
                                                className="dropdown-item"
                                              >
                                                {t(
                                                  "distributor.retailer_management.listing.view"
                                                )}
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
                                  <td>
                                    {t(
                                      "distributor.inventory_management.listing.no_data_to_show"
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
                                          "distributor.retailer_management.listing.all"
                                        ),
                                        value: -1,
                                      },
                                    ]}
                                    labelRowsPerPage={t(
                                      "distributor.retailer_management.listing.rows_per_page"
                                    )}
                                    colSpan={5}
                                    count={retailerList.length}
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
    </div>
  );
};

export default DistributorRetailer;
