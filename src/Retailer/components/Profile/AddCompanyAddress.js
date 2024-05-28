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
  const { t, i18n } = useTranslation();
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
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState(0);
  const [sameAddress, setSameAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [defaultShippingAddress, setDefaultShippingAddress] = useState("");
  const [shippingAddress2, setShippingAddress2] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingPostal, setShippingPostal] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [Slat, setSLat] = useState("");
  const [Slong, setSLong] = useState("");
  const [shippingAddressError, setShippingAddressError] = useState("");
  const [show, setShow] = useState(false);
  const [place_id, setPlaceId] = useState("");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const retailer_accessToken = localStorage.getItem("retailer_accessToken");
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${retailer_accessToken}`,
      },
    };
    apis
      .get("retailer/getRetailerData", config)
      .then((res) => {
        setShow(true);
        const mainAddress = res.data.data.user_main_address || null;
        const shippingAddress = res.data.data.user_shipping_address || null;
        if (mainAddress) {
          setDefaultAddress(mainAddress && mainAddress.address_1);
          setAddress(mainAddress && mainAddress.address_1);
          setInput(mainAddress && mainAddress.address_1);
          setAddress2(mainAddress && mainAddress.address_2);
          setCity(mainAddress && mainAddress.city);
          setPostalCode(mainAddress && mainAddress.postal_code);
          setCountry(mainAddress && mainAddress.country);
          setState(mainAddress && mainAddress.state);
          setLat(mainAddress && mainAddress.latitude);
          setLong(mainAddress && mainAddress.longitude);
        }
        if (shippingAddress) {
          setTime(shippingAddress && shippingAddress.delivery_time);
          setNote(shippingAddress && shippingAddress.delivery_notes);
          setContactName(shippingAddress && shippingAddress.contact_name);
          setPhone(shippingAddress && shippingAddress.phone_number);
          setDefaultShippingAddress(
            shippingAddress && shippingAddress.address_1
          );
          setInput2(shippingAddress && shippingAddress.address_1);
          setShippingAddress(shippingAddress && shippingAddress.address_1);
          setShippingAddress2(shippingAddress && shippingAddress.address_2);
          setShippingCity(shippingAddress && shippingAddress.city);
          setShippingPostal(shippingAddress && shippingAddress.postal_code);
          setShippingCountry(shippingAddress && shippingAddress.country);
          setShippingState(shippingAddress && shippingAddress.state);

          setSLat(shippingAddress && shippingAddress.latitude);
          setSLong(shippingAddress && shippingAddress.longitude);
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
  }, [retailer_accessToken]);

  const handleAddressChange = (e) => {
    console.log(e);
    setAddress(e);
    setInput(e.label);
    setAddressError("");
    setCity("");
    setPostalCode("");
    setState("");
    setCountry("");
    setAddress2("");
    setPlaceId(e.value.place_id);
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        console.log(res);
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
  const handleShippingAddressChange = (e) => {
    console.log(e);
    setShippingAddress(e);
    setInput2(e.label);
    setAddressError("");
    setShippingCity("");
    setShippingPostal("");
    setShippingState("");
    setShippingCountry("");
    setShippingAddress2("");
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res[0].address_components.length; i++) {
          let target_area = res[0].address_components[i].types[0];
          let target_name = res[0].address_components[i].long_name;

          if (target_area === "locality") {
            setShippingCity(target_name);
          } else if (target_area === "route") {
            setShippingAddress2(target_name);
          } else if (target_area === "postal_code") {
            setShippingPostal(target_name);
          } else if (target_area === "administrative_area_level_1") {
            setShippingState(target_name);
          } else if (target_area === "country") {
            setShippingCountry(target_name);
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
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      setShow(false);
      setInput2(input);
      setDefaultShippingAddress(address);
      setShippingAddress(address);
      setShippingAddress2(address2);
      setShippingCity(city);
      setShippingPostal(postalCode);
      setShippingCountry(country);
      setShippingState(state);
    } else {
      setShow(true);
      setInput2("");
      setDefaultShippingAddress("");
      setShippingAddress("");
      setShippingAddress2("");
      setShippingCity("");
      setShippingCountry("");
      setShippingPostal("");
      setShippingState("");
    }
  };

  const handleAddress2 = (e) => {
    setAddress2(e.target.value);
  };

  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleContactName = (e) => {
    setContactName(e.target.value);
  };
  const handleNotes = (e) => {
    setNote(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleShippingAddress2 = (e) => {
    setShippingAddress2(e.target.value);
  };
  const handleShippingCity = (e) => {
    setShippingCity(e.target.value);
  };

  const handleShippingPostal = (e) => {
    setShippingPostal(e.target.value);
  };

  console.log(lat, long);
  const handleNext = (e) => {
    e.preventDefault();
    if (address) {
      if (shippingAddress) {
        const bodyData = {
          main_address: input,
          main_latitude: lat,
          main_longitude: long,
          main_address_2: address2,
          main_city: city,
          main_postal_code: postalCode,
          main_state: state,
          main_country: country,
          delivery_time: time,
          delivery_notes: note,
          contact_name: contactName,
          phone_number: phone,
          shipping_address: input2,
          shipping_latitude: Slat,
          shipping_longitude: Slong,
          shipping_address_2: shippingAddress2,
          shipping_city: shippingCity,
          shipping_postal_code: shippingPostal,
          shipping_state: shippingCity,
          shipping_country: shippingCountry,
          place_id: place_id,
        };
        console.log(retailer_accessToken);
        const config = {
          headers: {
            Authorization: `Bearer ${retailer_accessToken}`,
          },
        };
        apis
          .post("retailer/saveRetailerMainAddress", bodyData, config)
          .then((res) => {
            if (res.data.success) {
              toast.success(
                "Main Address details has been updated successfully.",
                {
                  autoClose: 3000,
                  position: toast.POSITION.TOP_CENTER,
                }
              );
              navigate("/retailer/my-account/edit-company-billing-info");
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
        setShippingAddressError("Shipping Address is required");
      }
    } else {
      setAddressError("Address is Required.");
      console.log("Validation Error");
    }
  };

  return (
    <div class="container-fluid page-wrap add-supplier">
      <div class="row height-inherit">
        <Sidebar userType={"retailer"} />

        <div class="col main p-0">
          <Header title="Edit Retailer" updateSidebar={updateSidebar} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <div className="card">
                  <div className="card-body">
                    <div className="form-box col col-sm-12 col-xl-12">
                      {/* <div className="col-12 mb-3">
                <NavLink to={() => navigate(-1)} className="backArrow"><img src={backArrow} className="me-2" />Back</NavLink>
              </div> */}
                      {/* <p className="sub-head">Main Address</p>
              <hr /> */}
                      <form>
                        {/* [General Info] */}
                        <div className="row mb-3">
                          <div className="form-head w-100">{t("retailer.profile.main_address")}</div>
                          {/* {t("retailer.profile.first_name")} */}
                          <hr />
                          <div className="col-12">
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                {t("retailer.profile.address")}<sup>*</sup>
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
                                  <>
                                    <GooglePlacesAutocomplete
                                      apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                      selectProps={{
                                        value: address,
                                        defaultInputValue: defaultAddress,
                                        onChange: (e) => handleAddressChange(e),
                                      }}
                                    />
                                  </>
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
                                <label className="form-label">{t("retailer.profile.address_2")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={address2}
                                  onChange={(e) => handleAddress2(e)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.address_2_ph"
                                  )}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">{t("retailer.profile.city_name")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.city_ph"
                                  )}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                {t("retailer.profile.postal_code")}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={postalCode === 0 ? "" : postalCode}
                                  onChange={(e) => handlePostalCode(e)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.postal_ph"
                                  )}
                                />
                              </div>

                              <div className="col-sm-6 mb-3 position-relative">
                                <label className="form-label">{t("retailer.profile.country")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={country}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.country_ph"
                                  )}
                                  onChange={(e) => setCountry(e.target.value)}
                                />
                              </div>
                              <div className="col-sm-6 mb-3 position-relative">
                                <label className="form-label">{t("retailer.profile.state")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={state}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.state_ph"
                                  )}
                                  onChange={(e) => setState(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* [/General Info] */}

                        {/* [Shipping Info] */}
                        <div className="row mb-3">
                          <div className="col-12">
                            <div className="row">
                              <div className="form-head w-100">
                              {t("retailer.profile.shipping_address")}
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">{t("retailer.profile.time")}</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  value={time}
                                  onChange={(e) => handleTime(e)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.time_ph"
                                  )}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">Note</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={note}
                                  onChange={(e) => handleNotes(e)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.note_ph"
                                  )}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                {t("retailer.profile.contact_name")}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={contactName}
                                  onChange={(e) => handleContactName(e)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.contact_label"
                                  )}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">{t("retailer.profile.phone_number")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={phone}
                                  onChange={(e) => handlePhone(e)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.phone_label"
                                  )}
                                />
                              </div>
                            </div>
                            <div className="w-100 d-flex align-items-start mb-3">
                              <input
                                type="checkbox"
                                className="me-2 mt-1"
                                value={sameAddress}
                                onChange={(e) => handleSameAddress(e)}
                              />
                              <p className="m-0">
                              {t("retailer.profile.save_as_above")}
                              </p>
                            </div>
                            {/* [Shipping Address] */}
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                {t("retailer.profile.address")}<sup>*</sup>
                                </label>
                                {show ? (
                                  <GooglePlacesAutocomplete
                                    apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                    selectProps={{
                                      value: shippingAddress,
                                      defaultInputValue: input2,
                                      onChange: (e) =>
                                        handleShippingAddressChange(e),
                                    }}
                                  />
                                ) : (
                                  <>
                                    <GooglePlacesAutocomplete
                                      apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                      selectProps={{
                                        value: input2,
                                        defaultInputValue: input2,
                                        onChange: (e) =>
                                          handleShippingAddressChange(e),
                                      }}
                                    ></GooglePlacesAutocomplete>
                                  </>
                                )}
                                {shippingAddressError !== "" ? (
                                  <p className="error-label m-0 p-0">
                                    {shippingAddressError}
                                  </p>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">{t("retailer.profile.address_2")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={shippingAddress2}
                                  onChange={(e) => handleShippingAddress2(e)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.address_2_ph"
                                  )}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">{t("retailer.profile.city_name")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={shippingCity}
                                  onChange={(e) => handleShippingCity(e)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.city_ph"
                                  )}
                                />
                              </div>
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                {t("retailer.profile.postal_code")}
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={shippingPostal}
                                  onChange={(e) => handleShippingPostal(e)}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.postal_ph"
                                  )}
                                />
                              </div>

                              <div className="col-sm-6 mb-3 position-relative">
                                <label className="form-label">{t("retailer.profile.country")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={shippingCountry}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.country_ph"
                                  )}
                                  onChange={(e) =>
                                    setShippingCountry(e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-sm-6 mb-3 position-relative">
                                <label className="form-label">{t("retailer.profile.state")}</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={shippingState}
                                  placeholder={t(
                                    "admin.retailer_management.add_second.state_ph"
                                  )}
                                  onChange={(e) =>
                                    setShippingState(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            {/* [/Shipping Address] */}
                          </div>
                        </div>
                        {/* [/Shipping Info] */}
                        <button
                          className="btn btn-outline-black me-2"
                          onClick={() => navigate("/retailer/my-account")}
                        >
                          {t("retailer.profile.cancel")}
                        </button>
                        <button
                          className="btn btn-purple"
                          onClick={(e) => handleNext(e)}
                        >
                         {t("retailer.profile.next")}
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
