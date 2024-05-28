import React, { useEffect, useState } from "react";
import filter from "../../assets/images/filter-icon.png";

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { SUPPLIER_VIEW } from "../../../Constants/constant";

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

const ProductManagement = () => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const today = new Date();
  const [productList, setProductList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [loading, setLoading] = useState(false);
  const [supplier, setSupplier] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [hideFilter, setHideFilter] = useState("");

  const [showSidebar, setShowSidebar] = useState(false);
  const [reload,setReload]=useState(false)
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const token = localStorage.getItem("distributor_accessToken");
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "product-view",
      },
    };
    setLoading(true);
    apis
      .get(`distributor/products`, config)
      .then((res) => {
        console.log(res);
        setProductList(res.data.data);
        setLoading(false);
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
  }, [token,reload]);
  useEffect(() => {
    if (hasPermission(SUPPLIER_VIEW)) {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "supplier-view",
        },
      };
      apis
        .get("distributor/getLinkedSuppliers", config)
        .then((res) => {
          console.log(res);
          setSupplierList(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // toast.error(err.response.data.message, {
          //     autoClose: 3000,
          //     position: toast.POSITION.TOP_CENTER,
          // });
          setLoading(false);
        });
    }
  }, [token]);
  const handleSupplierDropdown = (e) => {
    console.log(e, "value");
    setSupplierId(e);
  };
  console.log(supplierId);
  const filteredProduct = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "product-view",
      },
    };
    apis
      .get(`distributor/products?supplier_id=${supplierId}`, config)
      .then((res) => {
        setProductList(res.data.data);
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };
  const handleSearch = (value) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "product-view",
      },
    };

    apis
      .get(
        `distributor/products?search=${value}&supplier_id=${supplierId}`,
        config
      )
      .then((res) => {
        console.log(res);
        setProductList(res.data.data);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let data;
  if (rowsPerPage > 0) {
    data = productList.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  } else {
    data = productList;
  }

  return (
    <div class="container-fluid page-wrap product-manage">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header
            title={t("distributor.product_management.title")}
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
                                  className="search-input"
                                  placeholder={t(
                                    "distributor.product_management.search_here"
                                  )}
                                  value={search}
                                  onChange={(e) => handleSearchChange(e)}
                                ></input>
                              </div>
                            </div>
                            {/* [/Table Search] */}

                            {/* Right Filter */}
                            {hasPermission(SUPPLIER_VIEW) && (
                              <div class="dropdown right-filter">
                                <span
                                  type="button"
                                  className={` dropdown-toggle ${hideFilter}`}
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                  onClick={() => setHideFilter("show")}
                                  data-bs-auto-close="outside"
                                >
                                  <img src={filter} alt="" />{" "}
                                  {t("distributor.product_management.filter")}
                                </span>
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
                                        "distributor.product_management.supplier"
                                      )}
                                    </label>
                                    <select
                                      className="form-select"
                                      onChange={(e) =>
                                        handleSupplierDropdown(e.target.value)
                                      }
                                      value={supplierId}
                                    >
                                      <option value={0}>
                                        {t(
                                          "distributor.product_management.choose_supplier"
                                        )}
                                      </option>
                                      {supplierList.map((s) => (
                                        <option key={s.id} value={s.id}>
                                          {s?.full_name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="d-flex justify-content-end">
                                    <button
                                      type="submit"
                                      onClick={(e) => filteredProduct(e)
                                      }
                                      class="btn btn-purple  btn-sm me-2"
                                    >
                                      {t(
                                        "distributor.product_management.apply"
                                      )}
                                    </button>
                                    <button
                                      type="reset"
                                      onClick={() => {handleSupplierDropdown(0)
                                        setReload(!reload)}}
                                      class="btn btn-sm btn-outline-black width-auto"
                                    >
                                      {t(
                                        "distributor.product_management.reset"
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
                                  <th>
                                    {t(
                                      "distributor.product_management.product"
                                    )}
                                  </th>
                                  <th>
                                    {t(
                                      "distributor.product_management.supplier"
                                    )}
                                  </th>
                                  <th>
                                    {t("distributor.product_management.format")}
                                  </th>
                                  <th>
                                    {t(
                                      "distributor.product_management.category"
                                    )}
                                  </th>
                                  <th>
                                    {t("distributor.product_management.date")}
                                  </th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {data && data?.length > 0 ? (
                                  data?.map((p) => (
                                    <tr>
                                      <td>{p?.product_name}</td>
                                      <td>{p?.user_information?.full_name}</td>
                                      <td>{p?.product_format?.name}</td>
                                      <td>{p?.product_type}</td>
                                      <td>
                                        {new Date(p.created_at)
                                          .toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                          })
                                          .replace(/\//g, "-") +
                                          " " +
                                          new Date(
                                            p.created_at
                                          ).toLocaleTimeString()}{" "}
                                        <p className="">
                                          {Math.floor(
                                            (today.getTime() -
                                              new Date(
                                                p.created_at
                                              ).getTime()) /
                                              (1000 * 60 * 60 * 24)
                                          )}{" "}
                                          Days Ago
                                        </p>
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
                                              <Link
                                                to={`/distributor/product-detail?product_id=${p.id}`}
                                                className="dropdown-item"
                                              >
                                                {t(
                                                  "distributor.product_management.view"
                                                )}
                                              </Link>
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  ))
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
                                      colSpan={6}
                                      count={productList.length}
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
    </div>
  );
};

export default ProductManagement;
