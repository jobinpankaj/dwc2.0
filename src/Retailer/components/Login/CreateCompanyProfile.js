import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import uploadImg from "../../assets/images/upload.png";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
import { useTranslation } from "react-i18next";

toast.configure();

const CreateCompanyProfile = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const [business, setbusiness] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState(0);
  const [both, setBoth] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(1);
  const [permitNo, setPermitNo] = useState([0]);
  const [alcohalPermit, setAlchohalPermit] = useState("0");
  const [opc, setOpc] = useState("0");
  const [showBusinessName, setShowBusinessName] = useState("0");
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
  const [categoryError, setCategoryError] = useState("");
  const [homeConsumption, setHomeConsumption] = useState("0");

  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileregex = /^[0-9]*$/;
  const navigate = useNavigate();
  const retailer_accessToken = localStorage.getItem("retailer_accessToken");
  useEffect(() => {
    apis
      .get("getBusinessCategories")
      .then((res) => {
        console.log(res);
        setCategoryList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBusiness = (e) => {
    setbusiness(e.target.value);
    setBusinessError("");
  };
  const handleGroupName = (e) => {
    setGroupName(e.target.value);
  };
  const handleCategory = (e) => {
    setCategoryError("");
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
      setAlchohalPermit(1);
    } else {
      setAlchohalPermit(0);
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

  const handleHomeConsumption = (e) => {
    if (e.target.checked) {
      setHomeConsumption("1");
    } else {
      setHomeConsumption("0");
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    let businessValid = true,
      emailValid = true,
      phoneValid = true,
      publicPhoneValid = true,
      addressValid = true,
      categoryValid = true;
    if (business === "") {
      setBusinessError(t("retailer.profile.business_name_is_required"));
      businessValid = false;
    }
    if (!emailregex.test(email) && email !== "") {
      setEmailError(t("retailer.profile.not_a_valid_email"));
      emailValid = false;
    }

    if (!mobileregex.test(mobile) && mobile !== "") {
      setPhoneError(t("retailer.profile.not_a_valid_number"));
      phoneValid = false;
    }

    if (!mobileregex.test(publicMobile) && publicMobile !== "") {
      setPublicPhoneError(t("retailer.profile.not_a_valid_number"));
      publicPhoneValid = false;
    }
    if (category === 0) {
      setCategoryError("Please choose category");
      categoryValid = false;
    }

    if (
      !businessValid ||
      !emailValid ||
      !phoneValid ||
      !publicPhoneValid ||
      urlError !== "" ||
      !addressValid ||
      businessError !== "" ||
      !categoryValid
    ) {
      console.log("Validation Error");
    } else {
      const bodyData = {
        business_name: business,
        group_name: groupName,
        business_category_id: category,
        contact_email: email,
        public_phone_number: publicMobile,
        phone_number: mobile,
        contact_name: contactName,
        website_url: website,
        opc_status: String(opc),
        home_consumption: String(homeConsumption),
        business_name_status: String(showBusinessName),
        alcohol_permit: String(alcohalPermit),
        order_type: String(deliveryStatus),
        permit_numbers: permitNo,
      };
      console.log(bodyData);
      const config = {
        headers: {
          Authorization: `Bearer ${retailer_accessToken}`,
        },
      };
      apis
        .post("retailer/createRetailerProfile", bodyData, config)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            toast.success("Profile details has been updated successfully!", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/retailer/complete-main-address");
          } else {
            toast.error(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          if(err.message !== "revoke"){
          if (err.response.data.data.contact_email) {
            toast.error(err.response.data.data.contact_email[0], {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
          if (err.response.data.data.business_name) {
            toast.error(err.response.data.data.business_name[0], {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
          if (err.response.data.data.public_phone_number) {
            toast.error(err.response.data.data.public_phone_number[0], {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
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

          <div className="col-sm-12 col-lg-8 login-setup-right create-company-profile">
            <div className="form-box col col-sm-12 col-xl-10">
              <h3>Welcome! Create Profile </h3>
              <p className="sub-head">
                {t("retailer.profile.general_information")}
              </p>
              <hr />
              <form>
                {/* [General Info] */}
                <div className="row mb-3">
                  <div className="col-xl-12 col-12">
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          {t("retailer.profile.business_name")}
                          <sup>*</sup>
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          value={business}
                          onChange={(e) => handleBusiness(e)}
                          placeholder="Enter business Name"
                        />
                        {businessError !== "" ? (
                          <p className="error-label m-0 p-0">{businessError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          {t("retailer.profile.group_name")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={groupName}
                          onChange={(e) => handleGroupName(e)}
                          placeholder="Enter Group name"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          {t("retailer.profile.business_category")}
                        </label>
                        <select
                          className="form-select"
                          value={category}
                          onChange={(e) => handleCategory(e)}
                          name=""
                          id=""
                        >
                          <option value="">Choose</option>
                          {categoryList.map((c) => {
                            return (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            );
                          })}
                        </select>
                        {categoryError !== "" ? (
                          <p className="error-label m-0 p-0">{categoryError}</p>
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
                          placeholder="Enter Contact Email"
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
                          {t("retailer.profile.public_phone_number")}
                          <sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={publicMobile}
                          onChange={(e) => handlePublicMobile(e)}
                          placeholder="Enter Mobile No."
                        />
                        {publicPhoneError !== "" ? (
                          <p className="error-label m-0 p-0">
                            {publicPhoneError}
                          </p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          {t("retailer.profile.phone_number")}
                          <sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={mobile}
                          onChange={(e) => handleMobile(e)}
                          placeholder="Enter Mobile No."
                        />
                        {phoneError !== "" ? (
                          <p className="error-label m-0 p-0">{phoneError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          {t("retailer.profile.contact_name")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={contactName}
                          onChange={(e) => handleContactName(e)}
                          placeholder="Enter Contact name"
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          {/* Website URL (Example : http://www.yourdomain.com) */}
                          {t("retailer.profile.website_url")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={website}
                          onChange={(e) => handleWebsite(e)}
                          placeholder="Enter Mobile No."
                        />
                        {urlError !== "" ? (
                          <p className="error-label m-0 p-0">{urlError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3 d-flex align-items-start">
                        <input
                          type="checkbox"
                          checked={showBusinessName === "1" ? true : false}
                          onChange={(e) => handleShowBusinessName(e)}
                          className="me-2 mt-1"
                        />
                        <p className="m-0">
                          {/* Show the business name on purchase orders */}
                          {t("retailer.profile.show_the_business_name")}
                        </p>
                      </div>
                      <div className="col-sm-6 mb-3 d-flex align-items-start">
                        <input
                          type="checkbox"
                          value={opc}
                          onChange={(e) => handleOpc(e)}
                          className="me-2 mt-1"
                        />
                        <p className="m-0">
                          {t("retailer.profile.on_premise_consumption")}
                        </p>
                      </div>
                      <div className="col-sm-6 mb-3 d-flex align-items-start">
                        <input
                          type="checkbox"
                          value={homeConsumption}
                          onChange={(e) => handleHomeConsumption(e)}
                          className="me-2 mt-1"
                        />
                        <p className="m-0">Consumption at Domicile (CAD)</p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <p className="sub-head">
                        {t("retailer.profile.alcohol")}
                      </p>
                      <div className="col-sm-6 d-flex align-items-start mb-3">
                        <input
                          type="checkbox"
                          value={alcohalPermit === "1" ? true : false}
                          onChange={(e) => handleCheck(e)}
                          className="me-2 mt-1"
                        />
                        <p className="m-0">
                          {t("retailer.profile.permit_of_alcohol")}
                        </p>
                      </div>
                      {alcohalPermit === 1 &&
                        permitNo.map((value, i) => (
                          <>
                            <button
                              className="btn btn-purple w-auto"
                              onClick={(e) => handleAdd(e)}
                            >
                              {t("retailer.profile.add")}
                            </button>
                            <div className="col-sm-6">
                              <label className="form-label">
                                {t("retailer.profile.permit_no")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={value}
                                name={`permitno`}
                                onChange={(e) => handlePermitNo(e.target, i)}
                                placeholder="Enter Permit No."
                              />
                            </div>
                          </>
                        ))}
                    </div>
                    <div className="w-100 mb-3">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value={deliveryStatus === "1" && true}
                          onChange={(e) => handleDeliveryStatus(e, "Delivery")}
                        />
                        <label
                          className="form-check-label font-regular"
                          htmlFor="inlineRadio1"
                        >
                          {t("retailer.profile.take_order")}
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value={deliveryStatus === "2" && true}
                          onChange={(e) => handleDeliveryStatus(e, "Pickup")}
                        />
                        <label
                          className="form-check-label font-regular"
                          htmlFor="inlineRadio2"
                        >
                          {t("retailer.profile.take_order_pickup")}
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio3"
                          value={deliveryStatus === "3" && true}
                          onChange={(e) => handleDeliveryStatus(e, "Both")}
                        />
                        <label
                          className="form-check-label font-regular"
                          htmlFor="inlineRadio3"
                        >
                          {t("retailer.profile.both")}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/General Info] */}

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
  );
};

export default CreateCompanyProfile;
