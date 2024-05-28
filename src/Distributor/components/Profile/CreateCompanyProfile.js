import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import uploadImg from "../../assets/images/upload.png";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLeftSidebar from "../Login/include/LoginLeftSidebar";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
toast.configure();

const CreateCompanyProfile = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [business, setbusiness] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState(0);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [permitNo, setPermitNo] = useState([0]);
  const [alcohalPermit, setAlchohalPermit] = useState("");
  const [opc, setOpc] = useState("");
  const [cad, setCad] = useState("");
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
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${retailer_accessToken}`,
      },
    };
    apis
      .get("/getRetailerData", config)
      .then((res) => {
        const retailer_general = res.data.data.user_profile;
        if (retailer_general !== null) {
          console.log(retailer_general);
          if (retailer_general.business_name === null) {
            setbusiness("");
          } else {
            setbusiness(retailer_general.business_name);
          }

          setGroupName(retailer_general.group_name);
          setCategory(retailer_general.business_category_id);
          setEmail(retailer_general.contact_email);
          setPublicMobile(retailer_general.public_phone_number);
          setMobile(retailer_general.phone_number);
          setContactName(retailer_general.contact_name);
          setWebsite(retailer_general.website_url);
          setShowBusinessName(retailer_general.business_name_status);
          setOpc(retailer_general.opc_status);
          setCad(retailer_general.home_consumption);
          setAlchohalPermit(retailer_general.alcohol_permit);
          setDeliveryStatus(retailer_general.order_type);
          // setPermitNo(retailer_general.permit_numbers)
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
  const handleCad = (e) => {
    if (e.target.checked) {
      setCad(1);
    } else {
      setCad(0);
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
      setBusinessError("Business name is required.");
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
        business_name: business,
        group_name: groupName,
        business_category_id: category,
        contact_email: email,
        public_phone_number: publicMobile,
        phone_number: mobile,
        contact_name: contactName,
        website_url: website,
        opc_status: String(opc),
        home_consumption: String(cad),
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
        .post("createRetailerProfile", bodyData, config)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            toast.success("Profile details has been updated successfully!", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/retailer/my-account/edit-company-address");
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
    <div class="container-fluid page-wrap add-supplier">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header title="Edit Supplier" updateSidebar={updateSidebar} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <div className="card">
                  <div className="card-body">
                    <form>
                      {/* [General Info] */}
                      <div className="row mb-3">
                        <div className="form-head w-100">General Info</div>
                        <hr />
                        <div className="col-xl-12 col-12">
                          <div className="row">
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                Business Name<sup>*</sup>
                              </label>

                              <input
                                type="text"
                                className="form-control"
                                value={business}
                                onChange={(e) => handleBusiness(e)}
                                placeholder="Enter company name"
                              />
                              {businessError !== "" ? (
                                <p className="error-label m-0 p-0">
                                  {businessError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">Group Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={groupName}
                                onChange={(e) => handleGroupName(e)}
                                placeholder="Enter group name"
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
                                <p className="error-label m-0 p-0">
                                  {emailError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                          <div className="row mb-4">
                            <div className="col-sm-6 mb-3">
                              <label className="form-label">
                                Public Mobile No.<sup>*</sup>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={publicMobile}
                                onChange={(e) => handlePublicMobile(e)}
                                placeholder="Enter mobile no."
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
                                <p className="error-label m-0 p-0">
                                  {phoneError}
                                </p>
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
                                Website URL (Example :
                                http://www.yourdomain.com)
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={website}
                                onChange={(e) => handleWebsite(e)}
                                placeholder="Enter mobile no."
                              />
                              {urlError !== "" ? (
                                <p className="error-label m-0 p-0">
                                  {urlError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-sm-6 mb-3 d-flex align-items-start">
                              <input
                                type="checkbox"
                                checked={
                                  showBusinessName === "1" ? true : false
                                }
                                onChange={(e) => handleShowBusinessName(e)}
                                className="me-2 mt-1"
                              />
                              <p className="m-0">
                                Show the business name on purchase orders
                              </p>
                            </div>
                            <div className="col-sm-6 mb-3 d-flex align-items-start">
                              <input
                                type="checkbox"
                                checked={opc === "1" ? true : false}
                                onChange={(e) => handleOpc(e)}
                                className="me-2 mt-1"
                              />
                              <p className="m-0">On Premise Consumption(OPC)</p>
                            </div>
                            <div className="col-sm-6 mb-3 d-flex align-items-start">
                              <input
                                type="checkbox"
                                checked={cad === "1" ? true : false}
                                onChange={(e) => handleCad(e)}
                                className="me-2 mt-1"
                              />
                              <p className="m-0">Consume at Domicile(CAD)</p>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <p className="sub-head">Alcohol</p>
                            <div className="col-sm-6 d-flex align-items-start mb-3">
                              <input
                                type="checkbox"
                                checked={alcohalPermit === "1" ? true : false}
                                onChange={(e) => handleCheck(e)}
                                className="me-2 mt-1"
                              />
                              <p className="m-0">I have a permit of Alcohol</p>
                            </div>
                            {alcohalPermit === "1" && (
                              <button onClick={(e) => handleAdd(e)}>Add</button>
                            )}
                            {alcohalPermit === "1" &&
                              permitNo.map((value, i) => (
                                <div className="col-sm-6">
                                  <label className="form-label">
                                    Permit No.
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={value === 0 ? "" : value}
                                    // id={`text${i}`}
                                    name={`permitno`}
                                    onChange={(e) =>
                                      handlePermitNo(e.target, i)
                                    }
                                    placeholder="Enter permit no."
                                  />
                                </div>
                              ))}
                          </div>
                          <div className="w-100 mb-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                checked={deliveryStatus === "1" && true}
                                onChange={(e) =>
                                  handleDeliveryStatus(e, "Delivery")
                                }
                              />
                              <label
                                className="form-check-label font-regular"
                                htmlFor="inlineRadio1"
                              >
                                Take Order for Delivery
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                checked={deliveryStatus === "2" && true}
                                onChange={(e) =>
                                  handleDeliveryStatus(e, "Pickup")
                                }
                              />
                              <label
                                className="form-check-label font-regular"
                                htmlFor="inlineRadio2"
                              >
                                Take Order for Pick up
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio3"
                                checked={deliveryStatus === "3" ? true : false}
                                onChange={(e) =>
                                  handleDeliveryStatus(e, "Both")
                                }
                              />
                              <label
                                className="form-check-label font-regular"
                                htmlFor="inlineRadio3"
                              >
                                Both
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* [/General Info] */}
                      <button
                        className="btn btn-outline-black me-2"
                        onClick={() => navigate("/retailer/my-account")}
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
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyProfile;
