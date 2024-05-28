import React, { useState, useEffect } from "react";
import backArrow from "../../assets/images/back-arrow.png";
import uploadImg from "../../assets/images/upload.png";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
import { email } from "react-admin";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
toast.configure();

const AddCompanyBillingInfo = () => {
  const { t, i18n } = useTranslation();
  const apis = useAuthInterceptor();
  const retailer_accessToken = localStorage.getItem("retailer_accessToken");
  const navigate = useNavigate();

  const [addressTo, setAddressTo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gst, setGst] = useState("");
  const [qst, setQst] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [input, setInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [mainAddress, setMainAddress] = useState({});
  const [defaultAddress, setDefaultAddress] = useState("");
  const [show2, setShow2] = useState(false);

  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileregex = /^[0-9]*$/;

  const handleShippingAddressChange = (e) => {
    console.log(e);
    setAddress(e);
    setInput(e.label);
    setAddressError("");
    setCity("");
    setPostalCode("");
    setState("");
    setCountry("");
    setAddress2("");
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

  const handleAddressTo = (e) => {
    setAddressTo(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setPhoneError("");
  };
  const handleGst = (e) => {
    setGst(e.target.value);
  };
  const handleQst = (e) => {
    setQst(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e);
  };
  const handleAddress2 = (e) => {
    setAddress2(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value);
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
  };
  const handleState = (e) => {
    setState(e.target.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    let emailValid = true,
      phoneValid = true,
      addressValid = true;

    if (!emailregex.test(email)) {
      setEmailError("Enter Valid email.");
      emailValid = false;
    }

    if (!mobileregex.test(phone) || phone === "") {
      setPhoneError("Enter valid phone number.");
      phoneValid = false;
    }
    if (address === "" || address === null) {
      setAddressError("Address is required");
    }
    if (!emailValid || !phoneValid || !addressValid) {
      console.log("Validation error");
    } else {
      const bodyData = {
        address_to: addressTo,
        billing_contact_email: email,
        billing_phone_number: phone,
        gst_registration_number: gst,
        qst_registration_number: qst,
        billing_address: input,
        billing_latitude: lat,
        billing_longitude: long,
        billing_address_2: address2,
        billing_city: city,
        billing_postal_code: postalCode,
        billing_state: state,
        billing_country: country,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${retailer_accessToken}`,
        },
      };
      apis
        .post("retailer/saveRetailerBillingAddress", bodyData, config)
        .then((res) => {
          if (res.data.success) {
            toast.success(
              "Billing Address details has been updated successfully!",
              {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              }
            );
            // navigate('/retailer/my-account');
            setShow2(true);
          } else {
            toast.success("res.data.message", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          if(err.message !== "revoke"){
          toast.error("Something went wrong !! Please try again later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
        });
    }
  };

  const handleSameAddress = (e) => {
    if (e.target.checked) {
      setInput(mainAddress.address_1);
      setAddress(mainAddress.address_1);
      setAddress2(mainAddress.address_2);
      setCity(mainAddress.city);
      setPostalCode(postalCode);
      setCountry(country);
      setState(state);
      setLat(lat);
      setLong(long);
    } else {
      setInput("");
      setAddress();
      setAddress2("");
      setCity("");
      setPostalCode("");
      setCountry("");
      setState("");
      setLat();
      setLong();
    }
  };

  return (
    <div className="page-wrap">
      <div className="container-fluid p-2">
        <div className="row m-0 login-setup">
          <LoginLeftSidebar />
          <div className="col-sm-12 col-lg-8 login-setup-right create-company-profile">
            <div className="form-box col col-sm-12 col-xl-10">
              <div className="col-12 mb-3">
                <NavLink to={() => navigate(-1)} className="backArrow">
                  <img src={backArrow} className="me-2" />
                  Back
                </NavLink>
              </div>
              <p className="sub-head">{t("retailer.profile.billing_info")}</p>
              <hr />
              <form>
                {/* [General Info] */}
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">{t("retailer.profile.addressed_to")}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={addressTo}
                          onChange={(e) => handleAddressTo(e)}
                          placeholder="Enter "
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">{t("retailer.profile.contact_email")}</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => handleEmail(e)}
                          placeholder="Enter Email"
                        />
                        {emailError !== "" ? (
                          <p className="error-label m-0 p-0">{emailError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">{t("retailer.profile.phone_number")}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={phone}
                          onChange={(e) => handlePhone(e)}
                          placeholder="Enter Phone No."
                        />
                        {phoneError !== "" ? (
                          <p className="error-label m-0 p-0">{phoneError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">{t("retailer.profile.gst_tax")}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={gst}
                          onChange={(e) => handleGst(e)}
                          placeholder="Enter GST No."
                        />
                      </div>

                      <div className="col-sm-6 mb-3 position-relative">
                        <label className="form-label">
                        {t("retailer.profile.qst_tax")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={qst}
                          onChange={(e) => handleQst(e)}
                          placeholder="Enter QST Tax No."
                        />
                      </div>
                      <div className="col-sm-6 mb-3 position-relative">
                        <label className="form-label">
                        {t("retailer.profile.upload_business_certi")}
                        </label>
                        <div className="w-100 d-flex">
                          <input
                            type="text"
                            className="form-control"
                            value=""
                            placeholder="Enter permit no."
                          />
                          <div className="uploadBtn ms-3">
                            <input type="file" id="upload" hidden />
                            <label for="upload">
                            {t("retailer.profile.choose_file")}&nbsp;&nbsp;
                              <img src={uploadImg} />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/General Info] */}

                {/* [Shipping Info] */}
                <div className="row mb-3">
                  <div className="col-12">
                    {/* <div className="w-100 d-flex align-items-start mb-3">
                      <input type="checkbox" className="me-2 mt-1" />
                      <p className="m-0">Same as that of address above</p>
                    </div> */}
                    {/* [Shipping Address] */}
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                        {t("retailer.profile.address")}<sup>*</sup>
                        </label>
                        <GooglePlacesAutocomplete
                          apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                          selectProps={{
                            value: address,
                            defaultInputValue: defaultAddress,
                            onChange: (e) => handleShippingAddressChange(e),
                          }}
                        />
                        {addressError !== "" ? (
                          <p className="error-label m-0 p-0">{addressError}</p>
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
                          placeholder="Enter Address"
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">{t("retailer.profile.city_name")}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={city}
                          onChange={(e) => handleCity(e)}
                          placeholder="Enter City Name"
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">{t("retailer.profile.postal_code")}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={postalCode}
                          onChange={(e) => handlePostalCode(e)}
                          placeholder="Enter Postal Code"
                        />
                      </div>

                      <div className="col-sm-6 mb-3 position-relative">
                        <label className="form-label">{t("retailer.profile.country")}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Enter Country"
                        />
                      </div>
                      <div className="col-sm-6 mb-3 position-relative">
                        <label className="form-label">{t("retailer.profile.state")}</label>
                        <input
                          type="text"
                          className="form-control"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="Enter State"
                        />
                      </div>
                    </div>
                    {/* [/Shipping Address] */}
                  </div>
                </div>
                {/* [/Shipping Info] */}
                {/* <button className="btn btn-outline-black" onClick={() => navigate("/retailer/my-account")} >Cancel</button> */}
                <button
                  className="btn btn-purple"
                  onClick={(e) => handleSave(e)}
                >
                  {t("retailer.profile.save")}
                </button>
              </form>
              <Modal
                className="modal fade"
                show={show2}
                centered
                onHide={() => {
                  setShow2(false);
                  navigate("/retailer/dashboard");
                }}
              >
                <Modal.Header closeButton>
                  {/* <Modal.Title>Change Password</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>{t("retailer.profile.do_u_want_to_change")}</Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-outline-black"
                    onClick={() => navigate("/retailer/dashboard")}
                  >
                    {t("retailer.profile.no")}
                  </button>
                  <button
                    className="btn btn-purple"
                    onClick={() => navigate("/retailer/change-password")}
                  >
                    {t("retailer.profile.yes")}
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyBillingInfo;
