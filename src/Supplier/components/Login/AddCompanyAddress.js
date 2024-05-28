import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
import Header from "../../../CommonComponents/Header/header";
import { Modal } from "react-bootstrap";

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
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [Slat, setSLat] = useState("");
  const [Slong, setSLong] = useState("");
  const [billingAddressError, setBillingAddressError] = useState("");
  const [show, setShow] = useState(false);
  const [logo, setLogo] = useState("");
  const [show2, setShow2] = useState(false);

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
        const shippingAddress = res.data.data.user_billing_address;
        if(mainAddress){
          setDefaultAddress(mainAddress.address_1);
          setAddress(mainAddress.address_1);
          setInput(mainAddress.address_1);
          setAddress2(mainAddress.address_2);
          setCity(mainAddress.city);
          setPostalCode(mainAddress.postal_code);
          setCountry(mainAddress.country);
          setState(mainAddress.state);
          setLat(mainAddress.latitude);
          setLong(mainAddress.longitude);
        }
        if(shippingAddress){
          setDefaultBillingAddress(shippingAddress.address_1);
          setInput2(shippingAddress.address_1);
          setBillingAddress(shippingAddress.address_1);
          setBillingAddress2(shippingAddress.address_2);
          setBillingCity(shippingAddress.city);
          setBillingPostal(shippingAddress.postal_code);
          setBillingCountry(shippingAddress.country);
          setBillingState(shippingAddress.state);
          setLogo(shippingAddress.upload_logo);
          setSLat(shippingAddress.latitude);
          setSLong(shippingAddress.longitude);
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
  }, [token]);
  const handleLogo = (e) => {
    const file = e.target.files[0];

    setLogo(file);
  };
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
    setBillingAddress(e);
    setInput2(e.label);
    setAddressError("");
    setBillingCity("");
    setBillingPostal("");
    setBillingState("");
    setBillingCountry("");
    setBillingAddress2("");
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        console.log(res);
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
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      setShow(false);
      setInput2(input);
      setDefaultBillingAddress(address);
      setBillingAddress(address);
      setBillingAddress2(address2);
      setBillingCity(city);
      setBillingPostal(postalCode);
      setBillingCountry(country);
      setBillingState(state);
      setSLat(lat);
      setSLong(long);
    } else {
      setShow(true);
      setInput2("");
      setDefaultBillingAddress("");
      setBillingAddress("");
      setBillingAddress2("");
      setBillingCity("");
      setBillingCountry("");
      setBillingPostal("");
      setBillingState("");
    }
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
          main_address: input,
          main_latitude: lat,
          main_longitude: long,
          main_address_2: address2,
          main_city: city,
          main_postal_code: postalCode,
          main_state: state,
          main_country: country,

          billing_address: input2,
          billing_latitude: Slat,
          billing_longitude: Slong,
          billing_address_2: billingAddress2,
          billing_city: billingCity,
          billing_postal_code: billingPostal,
          billing_state: billingCity,
          billing_country: billingCountry,
          upload_logo: logo,
        };
        console.log(bodyData);
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
              setShow2(true);
              // navigate('/supplier/complete-billing-address');
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
        setBillingAddressError("Billing Address is required");
      }
    } else {
      setAddressError("Address is Required.");
      console.log("Validation Error");
    }
  };

  return (
    <div className="page-wrap">
      <div className="container-fluid p-2">
        <div className="row m-0 login-setup">
          <LoginLeftSidebar />
          <div class="col-sm-12 col-lg-8 login-setup-right create-company-profile">
            <div className="form-box col col-sm-12 col-xl-10">
              {/* <div className="col-12 mb-3">
                  <NavLink to={() => navigate(-1)} className="backArrow"><img src={backArrow} className="me-2" />Back</NavLink>
                </div> */}
              {/* <p className="sub-head">Main Address</p>
                <hr /> */}
              <form>
                {/* [General Info] */}
                <div className="row mb-3">
                  <div className="form-head w-100">Main Address</div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Address<sup>*</sup>
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
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Enter city name"
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">Postal Code</label>
                        <input
                          type="text"
                          className="form-control"
                          value={postalCode === 0 ? "" : postalCode}
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
                          placeholder="Enter postal code"
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-6 mb-3 position-relative">
                        <label className="form-label">State</label>
                        <input
                          type="text"
                          className="form-control"
                          value={state}
                          placeholder="Enter postal code"
                          onChange={(e) => setState(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/General Info] */}

                {/* Billing Address */}

                <div className="row mb-5">
                  <div className="w-100 d-flex align-items-start mb-3">
                    <input
                      type="checkbox"
                      className="me-2 mt-1"
                      onClick={(e) => handleSameAddress(e)}
                    />
                    <p className="m-0">Same as Main Address</p>
                  </div>
                  <div className="form-head w-100">Billing Address</div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">
                      Address<sup>*</sup>
                    </label>

                    {!show ? (
                      <GooglePlacesAutocomplete
                        apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                        selectProps={{
                          value: billingAddress,
                          defaultInputValue: defaultBillingAddress,
                          onChange: (e) => handleShippingAddressChange(e),
                        }}
                      />
                    ) : (
                      <>
                        <GooglePlacesAutocomplete
                          apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                          selectProps={{
                            value: input2,
                            defaultInputValue: defaultBillingAddress,
                            onChange: (e) => handleShippingAddressChange(e),
                          }}
                        ></GooglePlacesAutocomplete>
                      </>
                    )}
                    {billingAddressError !== "" ? (
                      <p className="error-label m-0 p-0">
                        {billingAddressError}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Address 2</label>
                    <input
                      type="text"
                      className="form-control"
                      value={billingAddress2}
                      onChange={(e) => handleAddress2(e)}
                      placeholder="Enter address"
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">City Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={billingCity}
                      placeholder="Enter city name"
                    />
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      className="form-control"
                      value={billingPostal}
                      onChange={(e) => handlePostalCode(e)}
                      placeholder="Enter postal code"
                    />
                  </div>

                  <div className="col-sm-6 mb-3 position-relative">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      value={billingCountry}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Enter country"
                    />
                  </div>
                  <div className="col-sm-6 mb-3 position-relative">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={billingState}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Enter state"
                    />
                  </div>
                  <div className="col-sm-6 mb-3 position-relative">
                    <label className="form-label">Company Logo</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={handleLogo}
                      placeholder="Enter state"
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
                {/* Billing Address */}
                <button
                  className="btn btn-outline-black me-2"
                  onClick={() => navigate("/supplier/my-account")}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-purple"
                  onClick={(e) => handleNext(e)}
                >
                  Save
                </button>
              </form>
              <Modal
                className="modal fade"
                show={show2}
                centered
                onHide={() => {
                  setShow2(false);
                  navigate("/supplier/dashboard");
                }}
              >
                <Modal.Header closeButton>
                  {/* <Modal.Title>Change Password</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>Do you want to change your password</Modal.Body>
                <Modal.Footer>
                  <button
                    className="btn btn-outline-black"
                    onClick={() => navigate("/supplier/dashboard")}
                  >
                    No
                  </button>
                  <button
                    className="btn btn-purple"
                    onClick={() => navigate("/supplier/change-password")}
                  >
                    Yes
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

export default AddCompanyAddress;
