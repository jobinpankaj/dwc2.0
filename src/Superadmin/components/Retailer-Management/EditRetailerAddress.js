import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
toast.configure();

const EditRetailerAddress = () => {
  const apis = useAuthInterceptor();
  const mobileregex = /^[0-9]*$/;
  const { user_id } = useParams();
  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [postal, setPostal] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address2, setAddress2] = useState("");
  const [business, setBusiness] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [group, setGroup] = useState("");
  const [businessCategoryList, setBusinessCategoryList] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [publicPhone, setPublicPhone] = useState("");
  const [publicPhoneError, setPublicPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [opc, setOpc] = useState("0");
  const [hc, setHc] = useState("0");
  const [show, setShow] = useState(false);
  const [placeId, setPlaceId] = useState("");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handlePostalChange = (e) => {
    if (mobileregex.test(e.target.value) || e.target.value == "") {
      setPostal(e.target.value);
    }
  };

  const handleBusinessCategoryChange = (e) => {
    setBusinessCategory(e.target.value);
  };

  const handleOpcChange = (e) => {
    if (e.target.checked === true) {
      setOpc("1");
    } else {
      setOpc("0");
    }
  };

  const handleHcChange = (e) => {
    if (e.target.checked === true) {
      setHc("1");
    } else {
      setHc("0");
    }
  };

  const handleAddressChange = (e) => {
    console.log(e);
    setAddress(e);
    setInput(e.label);
    setAddressError("");
    setCity("");
    setPostal("");
    setState("");
    setCountry("");
    setAddress2("");
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        console.log(res);
        setPlaceId(res[0].place_id);
        for (let i = 0; i < res[0].address_components.length; i++) {
          let target_area = res[0].address_components[i].types[0];
          let target_name = res[0].address_components[i].long_name;

          if (target_area == "locality") {
            setCity(target_name);
          } else if (target_area == "route") {
            setAddress2(target_name);
          } else if (target_area == "postal_code") {
            setPostal(target_name);
          } else if (target_area == "administrative_area_level_1") {
            setState(target_name);
          } else if (target_area == "country") {
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

  const handleBusinessChange = (e) => {
    setBusiness(e.target.value);
    setBusinessError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePublicPhoneChange = (e) => {
    setPublicPhone(e.target.value);
    setPublicPhoneError("");
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setPhoneError("");
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setUrlError("");
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apis
      .get("/getBusinessCategories", config)
      .then((res) => {
        if (res.data.success === true) {
          setBusinessCategoryList(res.data.data);
        } else {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "retailer-view",
      },
    };

    apis
      .get(`/getRetailerUserData/${user_id}`, config)
      .then((res) => {
        if (res.data.success === true) {
          setShow(true);

          if (res.data.data.user_profile) {
            if (res.data.data.user_profile.business_category_id === null) {
              setBusinessCategory("");
            } else {
              setBusinessCategory(
                res.data.data.user_profile.business_category_id
              );
            }
            setBusiness(res.data.data.user_profile.business_name);
            setGroup(res.data.data.user_profile.group_name);
            setEmail(res.data.data.user_profile.contact_email);
            setPublicPhone(res.data.data.user_profile.public_phone_number);
            setPhone(res.data.data.user_profile.phone_number);
            setName(res.data.data.user_profile.contact_name);
            setUrl(res.data.data.user_profile.website_url);
            setOpc(res.data.data.user_profile.opc_status);
            setHc(res.data.data.user_profile.home_consumption);
          }

          if (res.data.data.user_main_address) {
            setInput(res.data.data.user_main_address.address_1);
            setAddress2(res.data.data.user_main_address.address_2);
            setCity(res.data.data.user_main_address.city);
            setState(res.data.data.user_main_address.state);
            setCountry(res.data.data.user_main_address.country);
            setPostal(res.data.data.user_main_address.postal_code);
            setLat(res.data.data.user_main_address.latitude);
            setLong(res.data.data.user_main_address.longitude);
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
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);

  const handleSave = () => {
    let businessValid = true,
      emailValid = true,
      phoneValid = true,
      publicPhoneValid = true,
      addressValid = true;
    if (business == "") {
      setBusinessError("Business name is required.");
      businessValid = false;
    }

    if (input === "") {
      setAddressError("Address is required.");
      addressValid = false;
    }

    if (!emailregex.test(email) && email !== "" && email !== null) {
      setEmailError("Enter Valid Email.");
      emailValid = false;
    }

    // if (!mobileregex.test(phone) && phone !== "" && phone !== null) {
    //   setPhoneError("Enter valid phone number.");
    //   phoneValid = false;
    // }

    // if (
    //   !mobileregex.test(publicPhone) &&
    //   publicPhone !== "" &&
    //   publicPhone !== null
    // ) {
    //   setPublicPhoneError("Enter valid phone number.");
    //   publicPhoneValid = false;
    // }

    if (
      !businessValid ||
      !emailValid ||
      !phoneValid ||
      !publicPhoneValid ||
      urlError !== "" ||
      !addressValid ||
      businessError !== ""
    ) {
      console.log("Validation Error");
    } else {
      const bodyData = {
        business_name: business,
        group_name: group,
        business_category_id: businessCategory,
        contact_email: email,
        public_phone_number: publicPhone,
        phone_number: phone,
        contact_name: name,
        website_url: url,
        opc_status: opc,
        home_consumption: hc,
        main_address: input,
        main_address_2: address2,
        main_city: city,
        main_state: state,
        main_postal_code: postal,
        main_country: country,
        main_latitude: lat,
        main_longitude: long,
        user_id: user_id,
        place_id: placeId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "retailer-edit",
        },
      };

      apis
        .post("/addRetailerProfile", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Retailer Info Saved.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/retailer-management");
          } else {
            toast.error("Something went wrong. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if (error.response.data.message == "validation_error") {
            if (error.response.data.data.contact_email) {
              setEmailError(error.response.data.data.contact_email[0]);
            }

            if (error.response.data.data.website_url) {
              setUrlError(error.response.data.data.website_url[0]);
            }

            if (error.response.data.data.business_name) {
              setBusinessError(error.response.data.data.business_name[0]);
            }
          } else {
            console.log(error);
            toast.error("Something went wrong. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  console.log(typeof input);

  return (
    <div class="container-fluid page-wrap add-supplier-info">
      <div class="row height-inherit">
        <Sidebar userType={"admin"} />

        <div class="col main p-0">
          <Header title="Edit Retailer" updateSidebar={updateSidebar} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <form>
                  {/* [Card] */}
                  <div className="card height-100">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card shadow-none img-card">
                            <div className="card-body">
                              {/* [General Info] */}
                              <div className="row mb-5">
                                <div className="col-xl-9 col-12">
                                  <div className="row">
                                    <div className="form-head w-100">
                                      General Information
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Business Name<sup>*</sup>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={business}
                                        placeholder="Enter business name"
                                        onChange={(e) =>
                                          handleBusinessChange(e)
                                        }
                                      />
                                      {businessError !== "" ? (
                                        <p className="error-label">
                                          {businessError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Group Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={group}
                                        placeholder="Enter group name"
                                        onChange={(e) =>
                                          setGroup(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Business Category
                                      </label>
                                      <select
                                        className="form-select"
                                        value={businessCategory}
                                        onChange={(e) =>
                                          handleBusinessCategoryChange(e)
                                        }
                                      >
                                        <option value="">
                                          Select Business Category
                                        </option>
                                        {businessCategoryList &&
                                          businessCategoryList.map((ele) => {
                                            return (
                                              <option
                                                key={ele.id}
                                                value={ele.id}
                                              >
                                                {ele.name}
                                              </option>
                                            );
                                          })}
                                      </select>
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Contact E-mail
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        placeholder="Enter contact Email"
                                        onChange={(e) => handleEmailChange(e)}
                                      />
                                      {emailError !== "" ? (
                                        <p className="error-label">
                                          {emailError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        Public Phone No.
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={publicPhone}
                                        placeholder="Enter public phone no."
                                        onChange={(e) =>
                                          handlePublicPhoneChange(e)
                                        }
                                      />
                                      {publicPhoneError !== "" ? (
                                        <p className="error-label">
                                          {publicPhoneError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        Phone No.
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={phone}
                                        placeholder="Enter phone no."
                                        onChange={(e) => handlePhoneChange(e)}
                                      />
                                      {phoneError !== "" ? (
                                        <p className="error-label">
                                          {phoneError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Contact Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        placeholder="Enter contact name"
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Website URL (Example :
                                        http://www.yourdomain.com)
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={url}
                                        placeholder="Enter website URL"
                                        onChange={(e) => handleUrlChange(e)}
                                      />
                                      {urlError !== "" ? (
                                        <p className="error-label">
                                          {urlError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <input
                                        type="checkbox"
                                        onChange={(e) => handleOpcChange(e)}
                                        className="me-2"
                                        checked={opc === "1" ? true : false}
                                      />
                                      CSP
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <input
                                        type="checkbox"
                                        onChange={(e) => handleHcChange(e)}
                                        className="me-2"
                                        checked={hc === "1" ? true : false}
                                      />
                                     Consommation à domicile (CAD)
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* [/General Info] */}

                              {/* [Billing Info] */}
                              <div className="row">
                                <div className="col-xl-9 col-12">
                                  <div className="row">
                                    <div className="form-head w-100">
                                      Main Address
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Address<sup>*</sup>
                                      </label>
                                      {show ? (
                                        <GooglePlacesAutocomplete
                                          apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                          selectProps={{
                                            defaultInputValue: input,
                                            value: address,
                                            onChange: (e) =>
                                              handleAddressChange(e),
                                          }}
                                        />
                                      ) : (
                                        <></>
                                      )}
                                      {addressError !== "" ? (
                                        <p className="error-label">
                                          {addressError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Address 2
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={address2}
                                        placeholder="Enter address"
                                        onChange={(e) =>
                                          setAddress2(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        City Name
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={city}
                                        placeholder="Enter city name"
                                        onChange={(e) =>
                                          setCity(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        State
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={state}
                                        placeholder="Enter state name"
                                        onChange={(e) =>
                                          setState(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Postal Code
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={postal}
                                        placeholder="Enter postal code"
                                        onChange={(e) => handlePostalChange(e)}
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        Country
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={country}
                                        placeholder="Enter postal code"
                                        onChange={(e) =>
                                          setCountry(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                  <div className="row mt-4">
                    <div className="col">
                      <button
                        type="button"
                        onClick={() => navigate("/retailer-management")}
                        className="btn btn-outline-black me-3"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-purple"
                        onClick={() => handleSave()}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRetailerAddress;
