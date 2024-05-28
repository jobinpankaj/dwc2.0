import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import uploadImg from "../../assets/images/upload.png";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";

import "../../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
toast.configure();

const CreateCompanyProfile = () => {
  const apis = useAuthInterceptor();
  const [showSidebar, setShowSidebar] = useState(false);
  const [business, setbusiness] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [permitNo, setPermitNo] = useState([0]);
  const [alcohalPermit, setAlchohalPermit] = useState("");
  const [opc, setOpc] = useState("");
  const [showBusinessName, setShowBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [publicMobile, setPublicMobile] = useState("");
  const [mobile, setMobile] = useState("");
  const [categoryList, setCategoryList] = useState([0]);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [publicPhoneError, setPublicPhoneError] = useState("");
  const [urlError, setUrlError] = useState("");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileregex = /^[0-9]*$/;
  const navigate = useNavigate();
  const retailerToken = localStorage.getItem("distributor_accessToken");

  console.log(opc, "Opc status");

  const handleBusiness = (e) => {
    setbusiness(e.target.value);
    setBusinessError("");
  };
  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handlePermitNo = (e, index) => {
    const { name, id, value } = e;

    const data = [...permitNo];
    console.log(data);
    data[index] = value;

    setPermitNo(data);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const data = [...permitNo, 0];
    setPermitNo(data);
  };
  console.log(permitNo);
  const handleWebsite = (e) => {
    setWebsite(e.target.value);
    setUrlError("");
  };
  const handleContactName = (e) => {
    setContactName(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
    setPhoneError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePublicMobile = (e) => {
    setPublicMobile(e.target.value);
    setPublicPhoneError("");
  };
  const handleCheck = (e) => {
    if (e.target.checked === true) {
      setAlchohalPermit("1");
    } else {
      setAlchohalPermit("0");
    }
  };
  const handleDeliveryStatus = (e, keyword) => {
    console.log({ e, keyword });
    if (keyword === "Delivery") {
      if (e.target.checked === true) {
        setDeliveryStatus(1);
      } else {
        setDeliveryStatus(0);
      }
    } else if (keyword === "Pickup") {
      if (e.target.checked === true) {
        setDeliveryStatus(2);
      } else {
        setDeliveryStatus(0);
      }
    } else {
      if (e.target.checked === true) {
        setDeliveryStatus(3);
      } else {
        setDeliveryStatus(0);
      }
    }
    console.log(deliveryStatus);
  };
  const handleShowBusinessName = (e) => {
    console.log(e.target.checked);
    if (e.target.checked === true) {
      setShowBusinessName("1");
      console.log(showBusinessName);
    } else {
      setShowBusinessName("0");
      console.log(showBusinessName);
    }
  };
  const handleOpc = (e) => {
    if (e.target.checked) {
      setOpc(1);
    } else {
      setOpc(0);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    let businessValid = true,
      emailValid = true,
      phoneValid = true,
      publicPhoneValid = true,
      addressValid = true;
    if (business === "") {
      setBusinessError("Company name is required.");
      businessValid = false;
    }
    if (!emailregex.test(email) && email !== "") {
      setEmailError("Enter Valid Email.");
      emailValid = false;
    }

    if (!mobileregex.test(mobile) && mobile !== "") {
      setPhoneError("Enter valid phone number.");
      phoneValid = false;
    }

    if (!mobileregex.test(publicMobile) && publicMobile !== "") {
      setPublicPhoneError("Enter valid phone number.");
      publicPhoneValid = false;
    }

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
        company_name: business,

        contact_email: email,
        office: publicMobile,
        phone_number: mobile,
        contact_name: contactName,
        website_url: website,
      };
      console.log(bodyData);
      const config = {
        headers: {
          Authorization: `Bearer ${retailerToken}`,
        },
      };
      apis
        .post("distributor/saveDistributorProfile", bodyData, config)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            toast.success("Profile details has been updated successfully!", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/distributor/complete-main-address");
          } else {
            toast.error(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          if(err.message !== "revoke"){
          toast.error(err.response.data, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
          console.log(err);
        });
    }
  };

  return (
    <div className="page-wrap">
      <div className="container-fluid p-2">
        <div className="row m-0 login-setup">
          <LoginLeftSidebar />
          <div class="col-sm-12 col-lg-8 login-setup-right create-company-profile ">
            <div class="form-box col col-sm-12 col-xl-10">
              <h3>Welcome! Create Profile </h3>
              <p class="sub-head">General Information</p>
              <hr />
              <form>
                {/* [General Info] */}
                <div className="row mb-3">
                  <div className="col-xl-12 col-12">
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Company Name<sup>*</sup>
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          value={business}
                          onChange={(e) => handleBusiness(e)}
                          placeholder="Enter company name"
                        />
                        {businessError !== "" ? (
                          <p className="error-label m-0 p-0">{businessError}</p>
                        ) : (
                          <></>
                        )}
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
                          placeholder="Enter contact email"
                        />
                        {emailError !== "" ? (
                          <p className="error-label m-0 p-0">{emailError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Office No.<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={publicMobile}
                          onChange={(e) => handlePublicMobile(e)}
                          placeholder="Enter office no."
                        />
                        {/* {publicPhoneError !== "" ? (
                            <p className="error-label m-0 p-0">{publicPhoneError}</p>
                          ) : (
                            <></>
                          )} */}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Mobile No.<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={mobile}
                          onChange={(e) => handleMobile(e)}
                          placeholder="Enter mobile no."
                        />
                        {phoneError !== "" ? (
                          <p className="error-label m-0 p-0">{phoneError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">Contact Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={contactName}
                          onChange={(e) => handleContactName(e)}
                          placeholder="Enter contact name"
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Website URL (Example : http://www.yourdomain.com)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={website}
                          onChange={(e) => handleWebsite(e)}
                          placeholder="Enter website url"
                        />
                        {urlError !== "" ? (
                          <p className="error-label m-0 p-0">{urlError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/General Info] */}
                <button
                  className="btn btn-outline-black me-2"
                  onClick={() => navigate("/distributor/dashboard")}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-purple"
                  onClick={(e) => handleNext(e)}
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyProfile;
