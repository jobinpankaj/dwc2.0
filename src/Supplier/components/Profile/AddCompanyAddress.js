import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useTranslation } from "react-i18next";

toast.configure();

const AddCompanyAddress = () => {
  const apis = useAuthInterceptor();
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [defaultAddress, setDefaultAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState(0);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const [sameAddress, setSameAddress] = useState(false);

  const [billingAddress, setBillingAddress] = useState("");
  const [defaultBillingAddress, setDefaultBillingAddress] = useState("");
  const [billingAddress2, setBillingAddress2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingPostal, setBillingPostal] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingState, setBillingState] = useState("");

  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [Slat, setSLat] = useState("");
  const [Slong, setSLong] = useState("");

  const [show, setShow] = useState(false);
  const [logo, setLogo] = useState("");
  const { t } = useTranslation();

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const token = localStorage.getItem("supplier_accessToken");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get("supplier/getSupplierData", config)
      .then((res) => {
        setShow(true);
        const mainAddress = res.data.data.user_main_address;
        const billingAddress = res.data.data.user_billing_address;
        setDefaultAddress(mainAddress.address_1);
        setAddress2(mainAddress.address_2);
        setCity(mainAddress.city);
        setPostalCode(mainAddress.postal_code);
        setCountry(mainAddress.country);
        setState(mainAddress.state);

        setDefaultBillingAddress(billingAddress.address_1);
        setBillingAddress2(billingAddress.address_2);
        setBillingCity(billingAddress.city);
        setBillingPostal(billingAddress.postal_code);
        setBillingCountry(billingAddress.country);
        setBillingState(billingAddress.state);
        setLogo(billingAddress.upload_logo);
        setLat(mainAddress.latitude);
        setLong(mainAddress.longitude);
        setSLat(billingAddress.latitude);
        setSLong(billingAddress.longitude);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
          toast.error("Something went Wrong !! Please try again Later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, [token]);

  const handleLogo = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  const handleAddressChange = (e) => {
    setAddress(e);
    setDefaultAddress(e.label);
    setAddressError("");
    setCity("");
    setPostalCode("");
    setState("");
    setCountry("");
    setAddress2("");
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        for (let i = 0; i < res[0].address_components.length; i++) {
          let target_area = res[0].address_components[i].types[0];
          let target_name = res[0].address_components[i].long_name;

          if (target_area === "locality") {
            setCity(target_name);
          } else if (target_area === "route") {
            setAddress2(target_name);
          } else if (target_area === "postal_code") {
            setPostalCode(target_name);
          } else if (target_area === "administrative_area_level_1") {
            setState(target_name);
          } else if (target_area === "country") {
            setCountry(target_name);
          }
        }

        getLatLng(res[0])
          .then((res) => {
            setLat(res.lat);
            setLong(res.lng);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };

  const handleBillingAddressChange = (e) => {
    setBillingAddress(e);
    setDefaultBillingAddress(e.label);
    setAddressError("");
    setBillingCity("");
    setBillingPostal("");
    setBillingState("");
    setBillingCountry("");
    setBillingAddress2("");
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        for (let i = 0; i < res[0].address_components.length; i++) {
          let target_area = res[0].address_components[i].types[0];
          let target_name = res[0].address_components[i].long_name;

          if (target_area === "locality") {
            setBillingCity(target_name);
          } else if (target_area === "route") {
            setBillingAddress2(target_name);
          } else if (target_area === "postal_code") {
            setBillingPostal(target_name);
          } else if (target_area === "administrative_area_level_1") {
            setBillingState(target_name);
          } else if (target_area === "country") {
            setBillingCountry(target_name);
          }
        }

        getLatLng(res[0])
          .then((res) => {
            setSLat(res.lat);
            setSLong(res.lng);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };

  const handleSameAddress = (e) => {
    setBillingAddress(defaultAddress)
    setSameAddress(e.target.checked);
  };

  const handleAddress2 = (e) => {
    setAddress2(e.target.value);
  };

  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (address) {
      if (billingAddress) {
        const bodyData = {
          main_address: defaultAddress,
          main_latitude: lat,
          main_longitude: long,
          main_address_2: address2,
          main_city: city,
          main_postal_code: postalCode,
          main_state: state,
          main_country: country,

          billing_address: defaultBillingAddress,
          billing_latitude: Slat,
          billing_longitude: Slong,
          billing_address_2: billingAddress2,
          billing_city: billingCity,
          billing_postal_code: billingPostal,
          billing_state: billingCity,
          billing_country: billingCountry,
          upload_logo: logo,
        };

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        apis
          .post("supplier/saveSupplierAddress", bodyData, config)
          .then((res) => {
            if (res.data.success) {
              toast.success(
                "Main Address details has been updated successfully!",
                {
                  autoClose: 3000,
                  position: toast.POSITION.TOP_CENTER,
                }
              );
              navigate("/supplier/my-account");
            } else {
              toast.success("res.data.message", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          })
          .catch((err) => {
            if(err.message !== "revoke"){
              toast.error("Something went Wrong !! Please try again Later", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          });
      } else {
        // setBillingAddressError("Billing Address is required");
      }
    } else {
      setAddressError("Address is Required.");
      console.log("Validation Error");
    }
  };

  return (
    <div class="container-fluid page-wrap add-supplier">
      <div class="row height-inherit">
        <Sidebar
          showSidebar={showSidebar}
          updateSidebar={updateSidebar}
          userType={"supplier"}
        />

        <div class="col main p-0">
          <Header title="Edit Profile" updateSidebar={updateSidebar} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <div className="card">
                  <div className="card-body">
                    <div className="form-box col col-sm-12 col-xl-10">
                      {/* <div className="col-12 mb-3">
                <NavLink to={() => navigate(-1)} className="backArrow"><img src={backArrow} className="me-2" />Back</NavLink>
              </div> */}
                      {/* <p className="sub-head">Main Address</p>
              <hr /> */}
                      <form>
                        {/* [General Info] */}
                        <div className="row mb-3">
                          <div className="form-head w-100">{t("supplier.my_account_view.Main_Address.main_address")}</div>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                {t("supplier.my_account_view.Main_Address.address")}<sup>*</sup>
                                </label>
                                {show ? (
                                  <GooglePlacesAutocomplete
                                    apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                    selectProps={{
                                      value: address,
                                      defaultInputValue: defaultAddress,
                                      onChange: (e) => handleAddressChange(e),
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                                {addressError !== "" ? (
                                  <p className="error-label m-0 p-0">
                                    {addressError}
                                  </p>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">{t("supplier.my_account_view.Main_Address.address2")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={address2}
                                  onChange={(e) => handleAddress2(e)}
                                  placeholder={t("supplier.my_account_view.placeholder.enter_add")}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">{t("supplier.my_account_view.Main_Address.city_name")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  placeholder={t("supplier.my_account_view.placeholder.city_name")}
                                />
                              </div>
                              <div className="col-sm-6 mb-3 position-relative">
                                <label className="form-label">{t("supplier.my_account_view.Main_Address.state")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={state}
                                  placeholder={t("supplier.my_account_view.placeholder.postal_code")}
                                  onChange={(e) => setState(e.target.value)}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                {t("supplier.my_account_view.Main_Address.postal_code")}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={postalCode === 0 ? "" : postalCode}
                                  onChange={(e) => handlePostalCode(e)}
                                  placeholder={t("supplier.my_account_view.placeholder.postal_code")}
                                />
                              </div>

                              <div className="col-sm-6 mb-3 position-relative">
                                <label className="form-label"> {t("supplier.my_account_view.Main_Address.country")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={country}
                                  placeholder={t("supplier.my_account_view.placeholder.country")}
                                  onChange={(e) => setCountry(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* [/General Info] */}

                        {/* Billing Address */}

                        <div className="row">
                          <div className="form-head w-100">{t("supplier.my_account_view.Billing_Address.billing_address")}</div>
                          <div className="w-100 d-flex align-items-start mb-3">
                            <input
                              type="checkbox"
                              className="me-2 mt-1"
                              onClick={(e) => handleSameAddress(e)}
                            />
                            <p className="m-0">Same as Main Address</p>
                          </div>
                          {sameAddress ? (
                            <>
                              <div className="col-12">
                                <div className="row">
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Billing_Address.billing_address")}<sup>*</sup>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={defaultAddress}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Main_Address.address2")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={address2}
                                      placeholder={t("supplier.my_account_view.placeholder.enter_add")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Main_Address.city_name")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={city}
                                      placeholder={t("supplier.my_account_view.placeholder.city_name")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-6 mb-3 position-relative">
                                    <label className="form-label">{t("supplier.my_account_view.Main_Address.state")}</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={state}
                                      placeholder={t("supplier.my_account_edit.state_name")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Main_Address.postal_code")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={postalCode}
                                      placeholder={t("supplier.my_account_view.placeholder.postal_code")}
                                      disabled
                                    />
                                  </div>

                                  <div className="col-sm-6 mb-3 position-relative">
                                    <label className="form-label">
                                    {t("supplier.my_account_view.Main_Address.country")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={country}
                                      placeholder={t("supplier.my_account_edit.country_name")}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-6 mb-3 position-relative">
                                    <label className="form-label">
                                    {t("supplier.my_account_edit.company_logo")}
                                    </label>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="form-control"
                                      onChange={handleLogo}
                                      placeholder={t("supplier.my_account_edit.state_name")}
                                    />
                                    {/* {logo && (
                                  <input
                                    type="text"
                                    value={logo.name}
                                    className="form-control"
                                    readOnly
                                  />
                                )} */}
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                {t("supplier.my_account_view.Billing_Address.billing_address")}<sup>*</sup>
                                </label>

                                {show ? (
                                  <GooglePlacesAutocomplete
                                    apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                    selectProps={{
                                      value: billingAddress,
                                      defaultInputValue: defaultBillingAddress,
                                      onChange: (e) =>
                                        handleBillingAddressChange(e),
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                                {/* {billingAddressError !== "" ? (
                                    <p className="error-label m-0 p-0">{billingAddressError}</p>
                                  ) : (
                                    <></>
                                  )} */}
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">{t("supplier.my_account_view.Main_Address.address2")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={billingAddress2}
                                  onChange={(e) => handleAddress2(e)}
                                  placeholder={t("supplier.my_account_view.placeholder.enter_add")}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label"> {t("supplier.my_account_view.Main_Address.city_name")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={billingCity}
                                  placeholder={t("supplier.my_account_view.placeholder.city_name")}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                {t("supplier.my_account_view.Main_Address.postal_code")}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={billingPostal}
                                  onChange={(e) => handlePostalCode(e)}
                                  placeholder={t("supplier.my_account_view.placeholder.postal_code")}
                                  
                                />
                              </div>

                              <div className="col-sm-6 mb-3 position-relative">
                                <label className="form-label"> {t("supplier.my_account_view.Main_Address.country")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={billingCountry}
                                  onChange={(e) => setCountry(e.target.value)}
                                  placeholder={t("supplier.my_account_edit.country_name")}
                                />
                              </div>
                              <div className="col-sm-6 mb-3 position-relative">
                                <label className="form-label">{t("supplier.my_account_view.Main_Address.state")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={billingState}
                                  onChange={(e) => setState(e.target.value)}
                                  placeholder={t("supplier.my_account_edit.state_name")}
                                />
                              </div>
                              <div className="col-sm-6 mb-3 position-relative">
                                <label className="form-label">
                                {t("supplier.my_account_edit.company_logo")}                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="form-control"
                                  onChange={handleLogo}
                                  placeholder={t("supplier.my_account_edit.state_name")}
                                />
                                {/* {logo && (
                              <input
                                type="text"
                                value={logo.name}
                                className="form-control"
                                readOnly
                              />
                            )} */}
                              </div>
                            </>
                          )}
                        </div>
                        {/* Billing Address */}
                        <button
                          className="btn btn-outline-black me-2"
                          onClick={() => navigate("/supplier/my-account")}
                        >
                           {t("supplier.my_account_edit.cancel-btn")}
                        </button>
                        <button
                          className="btn btn-purple"
                          onClick={(e) => handleNext(e)}
                        >
                           {t("supplier.my_account_edit.save-btn")}
                        </button>
                      </form>
                    </div>
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

export default AddCompanyAddress;
