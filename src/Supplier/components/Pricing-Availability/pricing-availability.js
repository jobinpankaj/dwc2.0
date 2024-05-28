import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import filter from "../../assets/images/filter-icon.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { styled } from "@mui/system";
import {
    TablePagination,
    tablePaginationClasses as classes,
  } from "@mui/base/TablePagination";
import useAuthInterceptor from "../../../utils/apis";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/dashboard.scss";
import "../../../assets/scss/dashboard.scss";
import { hasPermission } from "../../../CommonComponents/commonMethods";
import { INVENTORY_EDIT, INVENTORY_VIEW, PRICING_EDIT, PRICING_VIEW } from "../../../Constants/constant";
import LoadingOverlay from "react-loading-overlay";
import NumericInput from "react-numeric-input";
import { Modal } from "react-bootstrap";

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

const PricingAvailability = () => {
  const navigate = useNavigate();
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const [pricingList, setPricingList] = useState("");
  const [availabilityList, setAvailabilityList] = useState("");
  const [formatList, setFormatList] = useState("")
  const token = localStorage.getItem("supplier_accessToken");
  const [page1, setPage1] = useState(0);
  const [rowsPerPage1, setRowsPerPage1] = useState(5);
  const [page2, setPage2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = useState(5);
  const [page3, setPage3] = useState(0);
  const [rowsPerPage3, setRowsPerPage3] = useState(10);
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [targetFormat, setTargetFormat] = useState("")
  const [deposit, setDeposit] = useState(0)
  const [update, setUpdate] = useState(false);
  const [q,setQ] = useState("");
  const [allData , setAllData] = useState([])
  const [p,setP] = useState("");
  const [allData2 , setAllData2] = useState([]);

  const [selectBottle,setSelectBottle]=useState("")
  const [reload,setReload]=useState(false)
  const [selectFormatName,setSelectFormatName]=useState("")

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

  const handleChangePage3 = (event, newPage) => {
    setPage3(newPage);
  };

  const handleChangeRowsPerPage3 = (event) => {
    setRowsPerPage3(parseInt(event.target.value, 10));
    setPage3(0);
  };

  const handleDepositClick = (targetId, currentDeposit) => {
    setTargetFormat(targetId)
    setDeposit(currentDeposit)
    setShow(true)
  }

  const handleUpdateDeposit = () => {
    const config = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }

    const bodyData = {
      product_format_id : targetFormat,
      product_format_deposit: deposit
    }

    apis.post('/supplier/depositUpdate', bodyData, config)
    .then((res) => {
      if(res.data.success === true){
        setUpdate(!update)
        setShow(false)
        toast.success("Deposit updated successfully.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    })
    .catch((error) => {
      if(error.message !== "revoke"){
        toast.error("Could not update deposit amount. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    });
  }

  useEffect(() => {
    const config1 = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "pricing-view",
      },
    };

    if(hasPermission(PRICING_VIEW)){
      apis
      .get("/supplier/pricings", config1)
      .then((res) => {
        setLoading(false)
        if (res.data.success === true) {
          setPricingList(res.data.data);
          setAllData(res.data.data);
        } else {
          toast.error("Could not fetch pricing list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        setLoading(false)
        if(error.message !== "revoke"){
          toast.error("Could not fetch pricing list. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
    }

    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "inventory-view",
      },
    };

    if(hasPermission(INVENTORY_VIEW)){
      apis
      .get("/supplier/availabilities", config2)
      .then((res) => {
        if (res.data.success === true) {
          setAvailabilityList(res.data.data);
          setAllData2(res.data.data);
        } else {
          toast.error(
            "Could not fetch availability list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error(
            "Could not fetch availability list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });
    }

    const config3 = {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }

    apis.get('/supplier/getProductFormatsDeposit', config3)
    .then((res) => {
      if(res.data.success === true){
        setFormatList(res.data.data)
      }
    })
    .catch((error) => {
      if(error.message !== "revoke"){
        toast.error(
          "Could not fetch deposits list. Please try again later.",
          { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
        );
      }
    });
  }, [update,reload]);

  let data1;
  if (rowsPerPage1 > 0) {
    data1 = pricingList.slice(
      page1 * rowsPerPage1,
      page1 * rowsPerPage1 + rowsPerPage1
    );
  } else {
    data1 = pricingList;
  }

  let data2;
  if (rowsPerPage2 > 0) {
    data2 = availabilityList.slice(
      page2 * rowsPerPage2,
      page2 * rowsPerPage2 + rowsPerPage2
    );
  } else {
    data2 = availabilityList;
  }

  let data3;
  if (rowsPerPage3 > 0) {
    data3 = formatList.slice(
      page3 * rowsPerPage3,
      page3 * rowsPerPage3 + rowsPerPage3
    );
  } else {
    data3 = formatList;
  }

  const handleInputChange = (e)=>{
    setQ(e.target.value);
    console.log("value to search", e.target.value)
    const valueTosearch =e.target.value;
    const filterData = allData.filter(
      (product) =>
        product.product_name.toLowerCase().includes(valueTosearch.toLowerCase())
    );
    setPricingList(filterData);  
  }

  const handleInputChange2 = (e)=>{
    setP(e.target.value);
    console.log("value to search", e.target.value)
    const valueTosearch =e.target.value;
    const filterData = allData2.filter(
      (ele) =>
        ele.product.product_name.toLowerCase().includes(valueTosearch.toLowerCase())
    );
    setAvailabilityList(filterData);  
  }

  const applyFilterPricing=()=>{
    const filterData = allData.filter(
      (product) =>
        product.product_format?.name.toLowerCase().includes(selectBottle.toLowerCase())
    );
    setPricingList(filterData);

  }

  const applyFilterAvailability=()=>{
    const filterData = allData2.filter(
      (product) =>
        product.product.product_format?.name.toLowerCase().includes(selectFormatName.toLowerCase())
    );
    setAvailabilityList(filterData);
  }

  

  return (
    <div class="container-fluid page-wrap inventory-manage">
      <div class="row height-inherit">
        <Sidebar userType={"supplier"} />
        <div class="col main p-0">
          <Header title={t("supplier.pricing.pricing_list.title")} />
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
                        {t("supplier.pricing.pricing_list.pricing")}
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
                        {t("supplier.pricing.pricing_list.availability")}
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="Deposit-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#Deposit-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="Deposit-tab-pane"
                        aria-selected="false"
                      >
                        {t("supplier.pricing.pricing_list.deposit")}
                      </button>
                    </li>
                  </ul>

                  {/* <div class="filter-box position-abs">
                    <div class="dropdown date-selector">
                      <button
                        class="btn btn-outline-black btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {t("supplier.pricing.pricing_list.all_product")}
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <a class="dropdown-item" href="#">
                            {t(
                              "supplier.pricing.pricing_list.visible_products"
                            )}
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            {t("supplier.pricing.pricing_list.hidden_products")}
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            {t("supplier.pricing.pricing_list.all_product")}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div> */}
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
                                      "supplier.pricing.pricing_list.search_here"
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
                                  {/* <button type="button" onClick={() => setShow(true)} className="btn btn-purple btn-sm" >Activate</button>
                                                                <button type="button" onClick={() => setShow2(true)}  className="btn btn-purple btn-sm">Deactive</button> */}
                                  {/* Modal */}
                                  <div class="dropdown right-filter">
                                    <button
                                      type="button"
                                      class="btn  dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                      data-bs-auto-close="outside"
                                    >
                                      <img src={filter} />{" "}
                                      {t(
                                        "supplier.pricing.pricing_list.filter"
                                      )}
                                    </button>
                                    <form class="dropdown-menu p-3 ">
                                      <div class="mb-3">
                                        <label class="form-label">Format</label>
                                        <select className="form-select"
                                        value={selectBottle}
                                        onChange={(e)=>{setSelectBottle(e.target.value)
                                        }}>
                                          <option value="">
                                            {t(
                                              "supplier.pricing.pricing_list.select_format"
                                            )}
                                          </option>
                                          <option value="bottle">
                                            {t(
                                              "supplier.pricing.pricing_list.bottle"
                                            )}
                                          </option>
                                          <option value="can">
                                            {t(
                                              "supplier.pricing.pricing_list.can"
                                            )}
                                          </option>
                                          <option value="keg">
                                            {t(
                                              "supplier.pricing.pricing_list.keg"
                                            )}
                                          </option>
                                          <option value="cask">
                                            Cask
                                          </option>
                                        </select>
                                      </div>
                                      {/* <div class="mb-3">
                                        <label class="form-label">
                                          {t(
                                            "supplier.pricing.pricing_list.producer"
                                          )}
                                        </label>
                                        <select className="form-select">
                                          <option selected disabled>
                                            {t(
                                              "supplier.pricing.pricing_list.choose_producer"
                                            )}
                                          </option>
                                        </select>
                                      </div> */}

                                      <div className="d-flex justify-content-end">
                                        <button
                                          type="button"
                                          class="btn btn-purple width-auto me-2"
                                          onClick={()=>{applyFilterPricing()}}
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.apply"
                                          )}
                                        </button>
                                        <button
                                          type="button"
                                          class="btn btn-outline-black width-auto"
                                          onClick={()=>{
                                            setSelectBottle("")
                                            setReload(!reload)
                                          }}
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.reset"
                                          )}
                                        </button>
                                      </div>
                                    </form>
                                  </div>
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
                                    {/* <th></th> */}
                                    <th>
                                      {t(
                                        "supplier.pricing.pricing_list.table_col1"
                                      )}
                                    </th>
                                    <th>
                                      {t(
                                        "supplier.pricing.pricing_list.table_col2"
                                      )}
                                    </th>
                                    <th>Format</th>
                                    <th>
                                      {t(
                                        "supplier.pricing.pricing_list.table_col3"
                                      )}
                                    </th>
                                    <th>
                                      {t(
                                        "supplier.pricing.pricing_list.table_col4"
                                      )}
                                    </th>
                                    <th>
                                      {t(
                                        "supplier.pricing.pricing_list.table_col5"
                                      )}
                                    </th>
                                    <th></th>
                                    {/* <th className="text-end">VISIBILTY IN MARKETPLACE</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {data1 && data1.length > 0 ? (
                                    data1.map((ele) => {
                                      return (
                                        <tr>
                                          {/* <td>
                                            <input type="checkbox" />
                                          </td> */}
                                          <td>{ele.product_name}</td>
                                          <td>
                                            {ele.user_profile
                                                ? ele.user_profile.company_name
                                                ? ele.user_profile.company_name
                                                : "N/A"
                                                : "N/A"}
                                          </td>
                                          <td>
                                            {ele.product_format
                                            ? ele.product_format.name?ele.product_format.name:"N/A":"N/A"}
                                          </td>
                                          <td>$ {ele.pricing.price}</td>
                                          <td>
                                            $ {ele.pricing.retail_unit_price}
                                          </td>
                                          <td>
                                            {ele.pricing.discount_type ===
                                            "percentage"
                                              ? ele.pricing.discount_percent +
                                                " %"
                                              : "$ " +
                                                ele.pricing.discount_percent}
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
                                                    onClick={() => hasPermission(PRICING_EDIT) ? navigate(
                                                      `/supplier/pricing-availability/edit-pricing/${ele.pricing.id}`,
                                                      {
                                                        state: {
                                                          product_name:
                                                            ele.product_name,
                                                          product_format:
                                                            "TBD"
                                                        }
                                                      }
                                                    ): toast.warn("You do not have permission to edit pricing.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER})}
                                                    className="dropdown-item"
                                                  >
                                                    {" "}
                                                    Edit
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </td>
                                          {/* <td className="text-end">8502 Preston Rd. Inglewood, Maine 98380</td> */}
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <>
                                      {t(
                                        "supplier.pricing.pricing_list.no_data"
                                      )}
                                    </>
                                  )}
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
                                        colSpan={8}
                                        count={pricingList.length}
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
                    tabindex="0"
                  >
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
                                    value={p}
                                    onChange={(e)=>handleInputChange2(e)}
                                    placeholder={t(
                                      "supplier.pricing.pricing_list.search_here"
                                    )}
                                  ></input>
                                </div>
                              </div>
                              {/* [/Table Search] */}

                              {/* [Right Filter] */}
                              <div className="filter-row text-end">
                                <div className="filter-box">
                                  {/* <div class="dropdown right-filter">
                                    <button
                                      type="button"
                                      class="dropdown-toggle btn btn-sm btn-purple"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                      data-bs-auto-close="outside"
                                    >
                                      {t(
                                        "supplier.pricing.pricing_list.deactivate"
                                      )}
                                    </button>
                                    <form class="dropdown-menu py-4 px-3 w-250">
                                      <div class="mb-3 text-center">
                                        <p>
                                          {t(
                                            "supplier.pricing.pricing_list.are_u_sure"
                                          )}
                                        </p>
                                      </div>
                                      <div className="d-flex justify-content-center">
                                        <button
                                          type="reset"
                                          class="btn btn-outline-black width-auto me-2"
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.no"
                                          )}
                                        </button>
                                        <button
                                          type="submit"
                                          class="btn btn-purple width-auto"
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.yes"
                                          )}
                                        </button>
                                      </div>
                                    </form>
                                  </div> */}
                                  {/* <div class="dropdown right-filter">
                                    <button
                                      type="button"
                                      class="dropdown-toggle btn btn-sm btn-outline-black"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                      data-bs-auto-close="outside"
                                    >
                                      {t(
                                        "supplier.pricing.pricing_list.visibility"
                                      )}
                                    </button>
                                    <form class="dropdown-menu py-4 px-3 w-250">
                                      <div class="mb-3 text-center">
                                        <select className="form-select">
                                          <option selected disabled>
                                            {t(
                                              "supplier.pricing.pricing_list.visible_everybody"
                                            )}
                                          </option>
                                          <option value="">
                                            {t(
                                              "supplier.pricing.pricing_list.bottle"
                                            )}
                                          </option>
                                          <option value="">
                                            {t(
                                              "supplier.pricing.pricing_list.can"
                                            )}
                                          </option>
                                          <option value="">
                                            {t(
                                              "supplier.pricing.pricing_list.keg"
                                            )}
                                          </option>
                                        </select>
                                      </div>
                                      <div className="d-flex justify-content-center">
                                        <button
                                          type="reset"
                                          class="btn btn-outline-black width-auto me-2"
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.clear"
                                          )}
                                        </button>
                                        <button
                                          type="submit"
                                          class="btn btn-purple width-auto"
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.apply"
                                          )}
                                        </button>
                                      </div>
                                    </form>
                                  </div> */}
                                  {/* <div class="dropdown right-filter">
                                    <button
                                      type="button"
                                      class="dropdown-toggle btn btn-sm btn-outline-black"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                      data-bs-auto-close="outside"
                                    >
                                      {t(
                                        "supplier.pricing.pricing_list.availability"
                                      )}
                                    </button>
                                    <form class="dropdown-menu py-4 px-3 w-auto">
                                      <div class="form-check form-switch d-flex align-items-center twoSideSwitch">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          role="switch"
                                          id="flexSwitchCheck2"
                                        />
                                        <label
                                          class="form-check-label"
                                          for="flexSwitchCheck2"
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.limited"
                                          )}
                                        </label>
                                      </div>
                                    </form>
                                  </div> */}
                                  {/* <div class="dropdown right-filter">
                                    <button
                                      type="button"
                                      class="dropdown-toggle btn btn-sm btn-outline-black border"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                      data-bs-auto-close="outside"
                                    >
                                      {t(
                                        "supplier.pricing.pricing_list.availability"
                                      )}
                                    </button>
                                    <form class="dropdown-menu py-4 px-3 w-250">
                                      <label className="mb-4">
                                        1
                                        {t(
                                          "supplier.pricing.pricing_list.product_selected"
                                        )}
                                      </label>
                                      <div className="table-responsive mb-3">
                                        <table className="table table-striped table-borderless m-0">
                                          <thead>
                                            <tr>
                                              <th>
                                                {t(
                                                  "supplier.pricing.pricing_list.group"
                                                )}
                                              </th>
                                              <th>
                                                {t(
                                                  "supplier.pricing.pricing_list.max_per_order"
                                                )}
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <td>
                                                <label>
                                                  {t(
                                                    "supplier.pricing.pricing_list.by_default"
                                                  )}
                                                  t
                                                </label>
                                              </td>
                                              <td>10</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <div class="mb-3 text-center">
                                        <select className="form-select">
                                          <option selected disabled>
                                            {t(
                                              "supplier.pricing.pricing_list.visible_everybody"
                                            )}
                                          </option>
                                          <option value="">
                                            {t(
                                              "supplier.pricing.pricing_list.bottle"
                                            )}
                                          </option>
                                          <option value="">
                                            {t(
                                              "supplier.pricing.pricing_list.can"
                                            )}
                                          </option>
                                          <option value="">
                                            {t(
                                              "supplier.pricing.pricing_list.keg"
                                            )}
                                          </option>
                                        </select>
                                      </div>
                                      <div className="d-flex justify-content-center">
                                        <button
                                          type="reset"
                                          class="btn btn-outline-black width-auto me-2"
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.cancel"
                                          )}
                                        </button>
                                        <button
                                          type="submit"
                                          class="btn btn-purple width-auto"
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.save"
                                          )}
                                        </button>
                                      </div>
                                    </form>
                                  </div> */}
                                  <div class="dropdown right-filter">
                                    <button
                                      type="button"
                                      class="btn btn-sm dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                      data-bs-auto-close="outside"
                                    >
                                      <img src={filter} /> Filter
                                    </button>
                                    <form class="dropdown-menu p-3 ">
                                      <div class="mb-3">
                                        <label class="form-label">Format</label>
                                        <select className="form-select"
                                        value={selectFormatName}
                                        onChange={(e)=>{setSelectFormatName(e.target.value)
                                        }}>
                                          <option value="">
                                            {t(
                                              "supplier.pricing.pricing_list.select_format"
                                            )}
                                          </option>
                                          <option value="bottle">
                                            {t(
                                              "supplier.pricing.pricing_list.bottle"
                                            )}
                                          </option>
                                          <option value="can">
                                            {t(
                                              "supplier.pricing.pricing_list.can"
                                            )}
                                          </option>
                                          <option value="keg">
                                            {t(
                                              "supplier.pricing.pricing_list.keg"
                                            )}
                                          </option>
                                          <option value="cask">
                                            Cask
                                          </option>
                                        </select>
                                      </div>
                                      {/* <div class="mb-3">
                                        <label class="form-label">
                                          {t(
                                            "supplier.pricing.pricing_list.producer"
                                          )}
                                        </label>
                                        <select className="form-select">
                                          <option selected disabled>
                                            {t(
                                              "supplier.pricing.pricing_list.choose_producer"
                                            )}
                                          </option>
                                        </select>
                                      </div> */}

                                      <div className="d-flex justify-content-end">
                                        <button
                                          type="button"
                                          class="btn btn-sm btn-purple width-auto me-2"
                                          onClick={()=>{applyFilterAvailability()}}
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.apply"
                                          )}
                                        </button>
                                        <button
                                          type="button"
                                          class="btn btn-sm btn-outline-black width-auto"
                                          onClick={()=>{setSelectFormatName("")
                                            setReload(!reload)
                                          }}
                                        >
                                          {t(
                                            "supplier.pricing.pricing_list.reset"
                                          )}
                                        </button>
                                      </div>
                                    </form>
                                  </div>
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
                                    <th>Product Name</th>
                                    <th>Producer</th>
                                    <th>Format</th>
                                    <th>Available for sale</th>
                                    <th>Ordered</th>
                                    <th>In Stock</th>
                                    <th>visibility in Marketplace</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data2 &&
                                  data2.length > 0 ? (
                                    data2.map((ele) => {
                                      return (
                                        <tr>
                                          <td>{ele.product.product_name}</td>
                                          <td>{ele.product.user_profile ? ele.product.user_profile.company_name ? ele.product.user_profile.company_name : "N/A" : "N/A" }</td>
                                          <td>{ele.product.product_format?ele.product.product_format.name?ele.product.product_format.name:"N/A":"N/A"}</td>
                                          <td>0</td>
                                          <td>0</td>
                                          <td>0</td>
                                          <td>
                                            {ele.visibity_information.name}
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
                                                      hasPermission(INVENTORY_EDIT) ? navigate(
                                                        `/supplier/pricing-availability/edit-availability/${ele.id}`
                                                      ) : toast.warn("You do not have permission to edit availability.", {autoClose: 3000, position: toast.POSITION.TOP_CENTER})
                                                    }
                                                  >
                                                    {t(
                                                      "supplier.pricing.pricing_list.edit"
                                                    )}
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
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
                                    {data2.length > 0 ? (
                                      <CustomTablePagination
                                        rowsPerPageOptions={[
                                          5,
                                          10,
                                          15,
                                          { label: "All", value: -1 },
                                        ]}
                                        colSpan={8}
                                        count={availabilityList.length}
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

                  <div
                    class="tab-pane fade"
                    id="Deposit-tab-pane"
                    role="tabpanel"
                    aria-labelledby="Deposit-tab"
                    tabindex="0"
                  >
                    {/* [Card] */}
                    <div className="card user-card height-100">
                      <div className="card-body p-0">
                        <div className="row">
                          <div className="col">
                            <div className="card-top-filter-box p-3">
                              {/* [Table Search] */}
                              <div className="search-table">
                                <div className="form-group">
                                  {/* <input
                                    type="text"
                                    className="search-input"
                                    placeholder={t(
                                      "supplier.pricing.pricing_list.search_here"
                                    )}
                                  ></input> */}
                                </div>
                              </div>
                              {/* [/Table Search] */}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="table-responsive">
                              <table className="table table-striped m-0">
                                <thead>
                                  <tr>
                                    <th>Container</th>
                                    <th>Status</th>
                                    <th>Deposits</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    data3 && data3.length > 0 ? 
                                    data3.map((ele) => {
                                      return(
                                        <tr>
                                          <td>{ele.name}</td>
                                          <td>{ele.status === 1 ? "Active" : "In-active"}</td>
                                          <td>
                                          <div class="btn-group dropend table-action float-none d-flex">
                                            <button
                                              type="button"
                                              class="dropdown-toggle px-0 text-purple"
                                              aria-expanded="false"
                                              onClick={() => handleDepositClick(ele.id, ele.product_format_deposit)}
                                            >
                                             $ {ele.product_format_deposit}
                                            </button>
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
                                    {data3.length > 0 ? (
                                      <CustomTablePagination
                                        rowsPerPageOptions={[
                                          5,
                                          10,
                                          15,
                                          { label: "All", value: -1 },
                                        ]}
                                        colSpan={8}
                                        count={formatList.length}
                                        rowsPerPage={rowsPerPage3}
                                        page={page3}
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
                                        onPageChange={handleChangePage3}
                                        onRowsPerPageChange={
                                          handleChangeRowsPerPage3
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
          <Modal
            className="modal fade"
            show={show}
            centered
            onHide={() => {
              setShow(false);
            }}
          >
            <Modal.Header>
              <h5 class="modal-title text-purpal">Update Deposit</h5>
              <button
                type="button"
                class="btn-close text-purpal"
                aria-label="Close"
                onClick={() => setShow(false)}
              ></button>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-2">
                <label className="form-label">Deposit Value</label>
                <NumericInput
                  className="form-control"
                  value={deposit}
                  min={0}
                  onChange={(e) => setDeposit(e)}
                  step={1}
                  precision={0}
                  size={5}
                  strict
                />
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
                onClick={() => handleUpdateDeposit()}
              >
                Update
              </button>
            </Modal.Footer>
          </Modal>
          </LoadingOverlay>
          
        </div>
      </div>
    </div>
  );
};

export default PricingAvailability;
