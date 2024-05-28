import React, { useState, useEffect } from "react";

import uploadImg from "../../assets/images/upload.png";
import { useNavigate } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLeftSidebar from "../Login/include/LoginLeftSidebar";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
toast.configure();

const AddCompanyBillingInfo = () => {
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
  const [show, setShow] = useState(false);

  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileregex = /^[0-9]*$/;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${retailer_accessToken}`,
      },
    };
    apis
      .get("getRetailerData", config)
      .then((res) => {
        setShow(true);
        console.log(res, "res");
        const mainAddress = res.data.data.user_main_address;
        const shippingAddress = res.data.data.user_shipping_address;
        const billingAddress = res.data.data.user_billing_address;

        setMainAddress(mainAddress);
        setInput(mainAddress.address_1);
        setDefaultAddress(mainAddress.address_1);
        setAddress(billingAddress.address_1);
        setAddress2(billingAddress.address_2);
        setCity(billingAddress.city);
        setPostalCode(billingAddress.postal_code);
        setCountry(billingAddress.country);
        setState(billingAddress.state);
        setAddressTo(billingAddress.address_to);
        setEmail(billingAddress.contact_email);
        setPhone(billingAddress.phone_number);
        setGst(billingAddress.gst_registration_number);
        setQst(billingAddress.qst_registration_number);
      })
      .catch((err) => {
        console.log(err, "err");
        if(err.message !== "revoke"){
        toast.error("Something went wrong !! Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, [retailer_accessToken]);

  const handleShippingAddressChange = (e) => {
    setShow(false);
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
  const handleSameAddress = (e) => {
    if (e.target.checked) {
      setShow(true);
      setDefaultAddress(mainAddress.address_1);
      setInput(mainAddress.address_1);
      setAddress(mainAddress.address_1);
      setAddress2(mainAddress.address_2);
      setCity(mainAddress.city);
      setPostalCode(mainAddress.postal_code);
      setCountry(mainAddress.country);
      setState(mainAddress.state);
    } else {
      setShow(false);
      setInput("");
      setDefaultAddress("");
      setAddress("");
      setAddress2("");
      setCity("");
      setPostalCode("");
      setCountry("");
      setState("");
    }
  };

  const handleAddressTo = (e) => {
    setAddressTo(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleGst = (e) => {
    setGst(e.target.value);
  };
  const handleQst = (e) => {
    setQst(e.target.value);
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

  const handleSave = (e) => {
    e.preventDefault();
    let emailValid = true,
      phoneValid = true,
      addressValid = true;

    if (!emailregex.test(email)) {
      setEmailError("Enter Valid Email.");
      emailValid = false;
    }

    if (!mobileregex.test(phone)) {
      setPhoneError("Enter valid phone number.");
      phoneValid = false;
    }
    if (input === "" || address === null) {
      setAddressError("Address is required");
    }

    if (!emailValid || !phoneValid || !addressValid) {
      console.log("Validation Error");
    } else {
      const bodyData = {
        billing_address_to: addressTo,
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
        .post("saveRetailerBillingAddress", bodyData, config)
        .then((res) => {
          if (res.data.success) {
            toast.success(
              "Billing Address details has been updated successfully!",
              {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              }
            );
            navigate("/retailer/my-account");
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
    }
  };

  return (
    <div className="page-wrap">
      <div className="container-fluid p-2">
        <div className="row m-0 login-setup">
          <LoginLeftSidebar />
          <div className="col-sm-12 col-lg-8 login-setup-right create-company-profile">
            <div className="form-box col col-sm-12 col-xl-10">
              {/* <div className="col-12 mb-3">
                <NavLink to={() => navigate(-1)} className="backArrow">
                  <img src={backArrow} className="me-2" />
                  Back
                </NavLink>
              </div> */}
              <p className="sub-head">Billing Information</p>
              <hr />
              <form>
                {/* [General Info] */}
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">Addressed To</label>
                        <input
                          type="text"
                          className="form-control"
                          value={addressTo}
                          onChange={(e) => handleAddressTo(e)}
                          placeholder="Enter "
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Contact Email<sup>*</sup>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => handleEmail(e)}
                          placeholder="Enter email"
                        />
                        {emailError !== "" ? (
                          <p className="error-label m-0 p-0">{emailError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Phone No.<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={phone}
                          onChange={(e) => handlePhone(e)}
                          placeholder="Enter phone no."
                        />
                        {phoneError !== "" ? (
                          <p className="error-label m-0 p-0">{phoneError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">GST Tax</label>
                        <input
                          type="text"
                          className="form-control"
                          value={gst}
                          onChange={(e) => handleGst(e)}
                          placeholder="Enter GST no."
                        />
                      </div>

                      <div className="col-sm-6 mb-3 position-relative">
                        <label className="form-label">
                          QST Tax Regsitration
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={qst}
                          onChange={(e) => handleQst(e)}
                          placeholder="Enter QST tax no."
                        />
                      </div>
                      <div className="col-sm-6 mb-3 position-relative">
                        <label className="form-label">
                          Upload business Certificate
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
                              Choose file&nbsp;&nbsp;
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
                    <div className="w-100 d-flex align-items-start mb-3">
                      <input
                        type="checkbox"
                        className="me-2 mt-1"
                        onClick={(e) => handleSameAddress(e)}
                      />
                      <p className="m-0">Same as Main Address</p>
                    </div>
                    {/* [Shipping Address] */}
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Address<sup>*</sup>
                        </label>

                        {!show ? (
                          <GooglePlacesAutocomplete
                            apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                            selectProps={{
                              value: address,
                              defaultInputValue: defaultAddress,
                              onChange: (e) => handleShippingAddressChange(e),
                            }}
                          />
                        ) : (
                          <>
                            <GooglePlacesAutocomplete
                              apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                              selectProps={{
                                value: input,
                                defaultInputValue: defaultAddress,
                                onChange: (e) => handleShippingAddressChange(e),
                              }}
                            ></GooglePlacesAutocomplete>
                          </>
                        )}
                        {addressError !== "" ? (
                          <p className="error-label m-0 p-0">{addressError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">Address 2</label>
                        <input
                          type="text"
                          className="form-control"
                          value={address2}
                          onChange={(e) => handleAddress2(e)}
                          placeholder="Enter address"
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">City Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={city}
                          onChange={(e) => handleCity(e)}
                          placeholder="Enter city name"
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">Postal Code</label>
                        <input
                          type="text"
                          className="form-control"
                          value={postalCode}
                          onChange={(e) => handlePostalCode(e)}
                          placeholder="Enter postal code"
                        />
                      </div>

                      <div className="col-sm-6 mb-3 position-relative">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Enter country"
                        />
                      </div>
                      <div className="col-sm-6 mb-3 position-relative">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="Enter state"
                        />
                      </div>
                    </div>
                    {/* [/Shipping Address] */}
                  </div>
                </div>
                {/* [/Shipping Info] */}
                <button
                  className="btn btn-outline-black"
                  onClick={() => navigate("/retailer/my-account")}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-purple"
                  onClick={(e) => handleSave(e)}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyBillingInfo;
