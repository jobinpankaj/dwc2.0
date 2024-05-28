import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import emailIcon from "../../assets/images/emaiIcon.png";
import addressIcon from "../../assets/images/addressIcon.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import uploadImg from "../../assets/images/upload.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MapContainer from "../../../CommonComponents/Map";

import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import Multiselect from "multiselect-react-dropdown";
import { useTranslation } from "react-i18next";

const DistributorRetailerDetails = () => {
  const apis = useAuthInterceptor();
  const token = localStorage.getItem("distributor_accessToken");
  const { user_id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mapsrc, setMapSrc] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [retailer, setRetailer] = useState({});
  const [selectedValue, setSelectedValue] = useState();
  const [routeList, setRouteList] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [opc, setOpc] = useState("");
  const [hc, setHc] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const options =
    routeList && routeList.map((route) => ({ id: route.id, name: route.name }));

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
  console.log(selectedValues);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "retailer-view",
      },
    };
    apis
      .get(`/distributor/getRetailerUserData/${user_id}`, config)
      .then((res) => {
        if (res.data.success === true) {
          setAddress(
            res.data.data.user_main_address !== null
              ? res.data.data.user_main_address.address_1
              : null
          );
          setEmail(res.data.data.email);
          setLatitude(
            res.data.data.user_main_address !== null
              ? parseFloat(res.data.data.user_main_address.latitude)
              : null
          );
          setLongitude(
            res.data.data.user_main_address !== null
              ? parseFloat(res.data.data.user_main_address.longitude)
              : null
          );
          setRetailer(res.data.data);
           if (res.data.data.user_profile) {

            if (res.data.data.user_profile.opc_status) {
              setOpc(res.data.data.user_profile.opc_status);
            }

            if (res.data.data.user_profile.home_consumption) {
              setHc(res.data.data.user_profile.home_consumption);
            }
          }
        } else {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if(error.message !== "revoke"){
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, []);


  const onSelect = () => {
    setSelectedValue("Option");
  };
  const onRemove = () => {};
  return (
    <div class="container-fluid page-wrap product-manage">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header
            title={t("distributor.retailer_management.detail.title")}
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div className="row mb-3">
              <div className="col-12">
                {/* [Card] */}
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-5 mb-4 mb-sm-0">
                        <div className="card height-100 shadow-none">
                          <div className="card-body d-flex flex-column justify-content-between">
                            <ul class="list-group list-group-flush">
                              <li class="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                                <div class="ms-2 me-auto">
                                  <div class="fw-bold">
                                    {t(
                                      "distributor.retailer_management.detail.contact_email"
                                    )}
                                  </div>
                                  <div className="d-flex align-items-start">
                                    <span className="icon-wrap me-2">
                                      <img src={emailIcon} />
                                    </span>
                                    <p>{email}</p>
                                  </div>
                                </div>
                              </li>
                              <li class="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                                <div class="ms-2 me-auto">
                                  <div class="fw-bold">
                                    {t(
                                      "distributor.retailer_management.detail.consuption"
                                    )}
                                  </div>
                                  {retailer?.user_profile?.opc_status === "1" &&
                                    "On Site"}
                                </div>
                              </li>
                              <li class="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                                <div class="ms-2 me-auto">
                                  <div class="fw-bold">
                                    {t(
                                      "distributor.retailer_management.detail.address"
                                    )}
                                  </div>
                                  <div className="d-flex align-items-start">
                                    <span className="icon-wrap me-2">
                                      <img src={addressIcon} />
                                    </span>
                                    {address}
                                  </div>
                                </div>
                              </li>
                            </ul>
                            <form>
                              <div className="align-self-start multipalSelectBx d-flex flex-column active">
                                <Multiselect
                                  options={options}
                                  selectedValues={selectedValues} // Preselected value to persist in dropdown
                                  onSelect={(e) => setSelectedValues(e)} // Function will trigger on select event
                                  onRemove={(e) => setSelectedValues(e)} // Function will trigger on remove event
                                  displayValue="full_name"
                                  avoidHighlightFirstOption
                                />
                                <label
                                  className="form-label order-0"
                                  for="search_input"
                                >
                                  {t(
                                    "distributor.retailer_management.detail.select_routes"
                                  )}
                                </label>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        <div className="mapBox card p-3 h-100">
                          {/* <iframe src={mapsrc} width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                          <MapContainer
                            latitude={latitude}
                            longitude={longitude}
                            name={retailer.first_name}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
            </div>

            <div class="row">
              {/* [Left Grid] */}
              <div class="col-sm-6">
                {/* [Card] */}
                <div className="card height-100">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          {/* [General Info] */}
                          <div className="row mb-5">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100 card-top-filter-box">
                                  <p>
                                    {t(
                                      "distributor.retailer_management.detail.general_info"
                                    )}
                                  </p>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.company_name"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer?.user_profile?.business_name
                                        ? retailer?.user_profile.business_name
                                        : "N/A"
                                    }
                                    placeholder="Enter company name"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.website_url"
                                    )}{" "}
                                    (Example : http://www.yourdomain.com)
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer.user_profile &&
                                      retailer.user_profile.website_url
                                        ? retailer.user_profile.website_url
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder="Enter website URL"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.contact_name"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer.user_profile &&
                                      retailer.user_profile.contact_name
                                        ? retailer.user_profile.contact_name
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder="Enter contact name"
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.contact_email"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={
                                      retailer.user_profile &&
                                      retailer.user_profile.contact_email
                                        ? retailer.user_profile.contact_email
                                        : "N/A"
                                    }
                                    placeholder="Enter contact email"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.mobile_num"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer.user_profile &&
                                      retailer.user_profile.phone_number
                                        ? retailer.user_profile.phone_number
                                        : "N/A"
                                    }
                                    placeholder="Enter mobile no."
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.alchohal_prod"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <div className="w-100 d-flex">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        retailer.user_profile &&
                                        retailer.user_profile
                                          .alcohol_production_permit
                                          ? retailer.user_profile
                                              .alcohol_production_permit
                                          : "N/A"
                                      }
                                      placeholder="Enter permit no."
                                      disabled
                                    />

                                    <div
                                      className="uploadBtn ms-3"
                                      style={{ display: "none" }}
                                    >
                                      <input type="file" id="upload" hidden />
                                      <label for="upload">
                                        Choose file&nbsp;&nbsp;
                                        <img src={uploadImg} />
                                      </label>
                                    </div>
                                  </div>
                                  {/* {permitError !== "" ? <p className="error-label">{permitError}</p> : <></>} */}
                                </div>
                                <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={opc == "1" ? true : false}
                                  />
                                  CSP

                                </div>
                                <div className="col-sm-6 mb-3">
                                  <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={hc == "1" ? true : false}
                                  />
                                  Consommation à domicile (CAD)
                                </div>
                              </div>
                                {/* <div className="w-100 d-flex align-items-center">
                                  <input
                                    disabled
                                    type="checkbox"
                                    className="me-2"
                                    checked={
                                      retailer.user_profile &&
                                      retailer.user_profile.business_name_status
                                        ? retailer.user_profile
                                            .business_name_status == "0"
                                          ? false
                                          : true
                                        : false
                                    }
                                  />
                                  {t(
                                    "distributor.retailer_management.detail.purchase_orders"
                                  )}
                                </div> */}
                              </div>
                            </div>
                          </div>
                          {/* [/General Info] */}

                          {/* [Billing Info] */}
                          <div className="row">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100">
                                  <p>
                                    {t(
                                      "distributor.retailer_management.detail.billing_info"
                                    )}
                                  </p>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.order_num_prefix"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer.user_billing_address &&
                                      retailer.user_billing_address
                                        .order_number_prefix
                                        ? retailer.user_billing_address
                                            .order_number_prefix
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder="Enter order number"
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.gst_tax"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer.user_billing_address &&
                                      retailer.user_billing_address
                                        .gst_registration_number
                                        ? retailer.user_billing_address
                                            .gst_registration_number
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder="Enter GST tax"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.qst_tax_reg"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer.user_billing_address &&
                                      retailer.user_billing_address
                                        .qst_registration_number
                                        ? retailer.user_billing_address
                                            .qst_registration_number
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder="Enter QST tax regsitration"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/Billing Info] */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
              {/* [/Left Grid] */}

              {/* [Right Grid] */}
              <div className="col-sm-6">
                {/* [Card] */}
                <div className="card height-100">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          {/* [Main Address] */}
                          <div className="row mb-5">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100 card-top-filter-box">
                                  <p>
                                    {t(
                                      "distributor.retailer_management.detail.main_address"
                                    )}
                                  </p>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.address"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer?.user_main_address?.address_1
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.address"
                                    )}{" "}
                                    2
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer?.user_main_address?.address_2
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.city_name"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={retailer?.user_main_address?.city}
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.postal_code"
                                    )}
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={
                                      retailer?.user_main_address?.postal_code
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.country"
                                    )}
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={retailer?.user_main_address?.country}
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.state"
                                    )}
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={retailer?.user_main_address?.state}
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/Main Address] */}

                          {/* [Billing Address] */}
                          <div className="row">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100">
                                  {t(
                                    "distributor.retailer_management.detail.billing_address"
                                  )}
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.company"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.address"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer?.user_billing_address?.address_1
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.address"
                                    )}{" "}
                                    2
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer?.user_billing_address?.address_2
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.city_name"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={retailer?.user_billing_address?.city}
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.country"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer?.user_billing_address?.country
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.retailer_management.detail.state"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      retailer?.user_billing_address?.state
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/Billing Address] */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
              {/* [/Right Grid] */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorRetailerDetails;
