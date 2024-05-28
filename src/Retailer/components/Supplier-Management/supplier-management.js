import React, { useEffect, useState } from "react";
import filter from "../../assets/images/filter-icon.png";
import Map from "../../../CommonComponents/MultipleAddressMap";

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const SupplierManagement = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const token = localStorage.getItem("retailer_accessToken");
  const [view, setView] = useState("All Suppliers");
  const [keyword, setKeyword] = useState("");
  const [supplierList, setSupplierList] = useState([]);
  const [q,setQ]= useState('');
  const [alldata, setAllData] = useState([]);

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSetView = (e) => {
    setView(e);
  };

  const handleInputChange = (e)=>{
    setQ(e.target.value);
    const valueToseatch = e.target.value;
    const filterData = alldata.filter((singleObj)=>(
      singleObj?.supplier_information?.full_name.toLowerCase().includes(valueToseatch.toLowerCase()) ||
      singleObj?.supplier_information?.user_main_address?.address_1.toLowerCase().includes(valueToseatch.toLowerCase())

    ))
    setSupplierList(filterData)
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "supplier-view",
      },
    };

    apis
      .get(`/retailer/suppliersList`, config)
      .then((res) => {
        if (res.data.success === true) {
          setSupplierList(res.data.data);
          setAllData(res.data.data);
        } else {
          toast.error(
            "Could not fetch supplier list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        if (error.response.data.data.error) {
          toast.error(error.response.data.data.error, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
        toast.error("Could not fetch supplier list. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [token, keyword]);

  return (
    <div class="container-fluid page-wrap inventory-manage route-manage">
      <div class="row height-inherit">
        <Sidebar userType={"retailer"} />

        <div class="col main p-0">
          <Header
            title={t("retailer.supplier_management.listing.title")}
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <div class="tab-link-row position-relative">
                  <ul class="nav nav-tabs mb-3" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="stock-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#stock-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="stock-tab-pane"
                        aria-selected="true"
                      >
                        List
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="transfer-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#transfer-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="transfer-tab-pane"
                        aria-selected="false"
                      >
                        Map
                      </button>
                    </li>
                  </ul>

                  <div class="filter-box position-abs">
                    {/* <div class="dropdown date-selector">
                                            <button class="btn btn-outline-black btn-sm dropdown-toggle"  type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {view}
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li onClick={() => handleSetView("Your Supplier")}><a class="dropdown-item" >Your Supplier</a></li>
                                                <li><a class="dropdown-item" >Hidden Product</a></li>
                                                <li onClick={() => handleSetView("All Supplier")}> <a class="dropdown-item" >All Suppliers</a></li>
                                            </ul>
                                        </div> */}
                  </div>
                </div>

                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="stock-tab-pane"
                    role="tabpanel"
                    aria-labelledby="stock-tab"
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
                                    value={q}
                                    onChange={(e)=>handleInputChange(e)}
                                    type="text"
                                    className="search-input"
                                    placeholder={t(
                                      "retailer.supplier_management.listing.search_here"
                                    )}
                                  ></input>
                                </div>
                              </div>
                              {/* [/Table Search] */}

                              {/* Right Filter */}
                              {/* <div class="dropdown right-filter">
                                                                <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                                                    <img src={filter} /> Filter
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
                                                                        //   onClick={() => setUpdateList(!updateList)}
                                                                        >
                                                                            Apply
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-black width-auto"
                                                                        //   onClick={() => handleResetFilter()}
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
                                    <th>
                                      {t(
                                        "retailer.supplier_management.listing.supplier_name"
                                      )}
                                    </th>
                                    <th>
                                      {t(
                                        "retailer.supplier_management.listing.location"
                                      )}
                                    </th>
                                    {/* <th>Product Category</th> */}
                                    {/* <th>Order Fullfillment time</th> */}
                                    <th>
                                      {t(
                                        "retailer.supplier_management.listing.status"
                                      )}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {supplierList && supplierList.length > 0 ? (
                                    supplierList.map((s) => (
                                      <tr>
                                        <td>
                                          {s.supplier_information.full_name}
                                        </td>
                                        <td>
                                          {s.supplier_information
                                            .user_main_address
                                            ? s.supplier_information
                                                .user_main_address.address_1
                                            : "N/A"}
                                        </td>

                                        {/* <td>category</td> */}
                                        {/* <td>Date</td> */}
                                        <td>
                                          {s.status === "1" && (
                                            <span className="badge text-bg-green text-uppercase">
                                              {t(
                                                "retailer.supplier_management.listing.accepted"
                                              )}
                                            </span>
                                          )}
                                          {s.status === "0" && (
                                            <span className="badge text-bg-red text-uppercase">
                                              {t(
                                                "retailer.supplier_management.listing.rejected"
                                              )}
                                            </span>
                                          )}
                                          {s.status === "2" && (
                                            <span className="badge text-bg-orange text-uppercase">
                                              {t(
                                                "retailer.supplier_management.listing.pending"
                                              )}
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    ))
                                  ) : (
                                    <tr>
                                      <td>
                                        {t(
                                          "retailer.supplier_management.listing.no_data_to_show"
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
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
                    id="transfer-tab-pane"
                    role="tabpanel"
                    aria-labelledby="transfer-tab"
                    tabindex="1"
                  >
                    {/* [Card] */}
                    <div className="card user-card height-100">
                      <div className="card-body p-0">
                        <div className="row">
                          <div className="col">
                            <div className="card-top-filter-box p-3">
                              <h6>
                                {t(
                                  "retailer.supplier_management.listing.supplier_location"
                                )}
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <div className="mapBox">
                             { supplierList && supplierList.length>0 && <Map userInformation={supplierList} />}
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
      </div>
    </div>
  );
};

export default SupplierManagement;
