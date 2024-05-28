import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { TablePagination, tablePaginationClasses as classes } from "@mui/base";
import { useTranslation } from "react-i18next";
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

const Supplier = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("distributor_accessToken");
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [supplierList, setSupplierList] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [updateList, setUpdateList] = useState(false);
  const [hideFilter, setHideFilter] = useState("");
  const [status, setStatus] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (e) => {
    setSelectedSupplier(e.target.value);
    console.log(e.target.value);
  };

  const handleResetFilter = () => {
    setSelectedSupplier("");
    setUpdateList(!updateList);
  };
  const handleViewSupplier = (targetId) => {
    navigate(`/distributor/view-supplier/${targetId}`);
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
        permission: "supplier-view",
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
      .get("distributor/supplierList", config)
      .then((res) => {
        if (res.data.success === true) {
          setSupplierList(res.data.data);
          setHideFilter("");
        } else {
          toast.error(res.data.message, {
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
  }, [search, updateList]);

  // useEffect(() => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       permission: "supplier-view"
  //     }
  //   }

  //   apis.get('/supplierFilterList', config)
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
  //         setSupplierFilter(list)
  //       }
  //       else {
  //         toast.error("Something went wrong. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Something went wrong. Please try again later.", { autoClose: 3000, position: toast.POSITION.TOP_CENTER })
  //     })
  // }, [])

  let data;
  if (rowsPerPage > 0) {
    data = supplierList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = supplierList;
  }

  return (
    <div className="container-fluid page-wrap product-manage">
      <div className="row height-inherit">
        <Sidebar userType={"distributor"} />
        <div className="col main p-0">
          <Header
            title={t("admin.supplier_management.list.title")}
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
                                  "admin.supplier_management.list.search_label"
                                )}
                                value={search}
                                onChange={(e) => handleSearchChange(e)}
                              ></input>
                            </div>
                          </div>
                          {/* [/Table Search] */}

                          {/* Right Filter */}
                          {/* <div className="dropdown right-filter">
                            
                            <button
                              type="button"
                              className={`btn dropdown-toggle ${hideFilter}`}
                              data-bs-toggle="dropdown"
                              onClick={() => setHideFilter("show")}
                              aria-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              <img src={filter} alt="" /> {t('admin.supplier_management.list.filter_button')}
                            </button>
                            <form className={`dropdown-menu p-3 ${hideFilter}`} data-popper-placement="bottom-end" style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(0px, 42px)" }}>
                              <div className="mb-3">
                                <label className="form-label">Supplier Name</label>
                                <select className="form-select" value={selectedSupplier} onChange={(e) => handleFilterChange(e)}>
                                  <option value="">
                                    Choose Supplier
                                  </option>
                                  {supplierFilter && supplierFilter.length > 0 ? supplierFilter.map((ele) => {
                                    return (
                                      <option key={ele.id} value={ele.id}>{ele.first_name + " " + ele.last_name}</option>
                                    )
                                  }) : <></>}
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
                            </form>
                          </div> */}
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
                                    "admin.supplier_management.list.table_col1"
                                  )}
                                </th>

                                <th className="tableNameBox">
                                  {t(
                                    "admin.supplier_management.list.table_col3"
                                  )}
                                </th>

                                <th className="tableActionBox"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* {(rowsPerPage > 0 ? supplierList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : supplierList ).map((row) => (
                              <tr key={row.id}>
                                <td>{row.first_name ? row.first_name : "N/A"}</td>
                                <td>{row.address ? row.address : "N/A"}</td>
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
                                          onClick={() => handleEditSupplier(row.id)}
                                          className="dropdown-item"
                                        >
                                          View/Edit
                                        </p>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            ))
                            };

                            {emptyRows > 0 && (
                              <tr style={{ height: 41 * emptyRows }}>
                                <td colSpan={3} />
                              </tr>
                            )} */}
                              {data && data?.length > 0 ? (
                                data?.map((ele) => {
                                  return (
                                    <tr key={ele.id}>
                                      <td>
                                        {!ele?.full_name || ele?.full_name == ""
                                          ? "N/A"
                                          : ele?.full_name}
                                      </td>

                                      <td>
                                        {ele?.user_main_address
                                          ? ele?.user_main_address?.address_1
                                          : "N/A"}
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
                                                  handleViewSupplier(ele.id)
                                                }
                                                className="dropdown-item"
                                              >
                                                {t(
                                                  "distributor.supplier_management.view"
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
                                      "distributor.supplier_management.no_data_to_show"
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
                                          "distributor.supplier_management.all"
                                        ),
                                        value: -1,
                                      },
                                    ]}
                                    labelRowsPerPage={t(
                                      "admin.supplier_management.list.pagination_text"
                                    )}
                                    colSpan={4}
                                    count={supplierList.length}
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

export default Supplier;
