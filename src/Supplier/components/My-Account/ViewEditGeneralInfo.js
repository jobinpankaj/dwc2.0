import React, { useState, useEffect } from "react";
import dpImg from "../../assets/images/dp.png";
import editImg from "../../assets/images/edit-white.png";
import uploadImg from "../../assets/images/upload.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useParams, useNavigate } from "react-router-dom";

import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const EditSupplierGeneralInfo = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let mobileregex = /^\d{10}$/;
  const token = localStorage.getItem("admin_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [website, setWebsite] = useState("");
  const [websiteError, setWebsiteError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [permit, setPermit] = useState("");
  const [permitError, setPermitError] = useState("");
  const [prefix, setPrefix] = useState("");
  const [gst, setGst] = useState("");
  const [gstError, setGstError] = useState("");
  const [qst, setQst] = useState("");
  const [qstError, setQstError] = useState("");
  const [businessStatus, setBusinessStatus] = useState(0);
  const [formData, setFormData] = useState("");
  const [formData2, setFormData2] = useState("");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleWebsiteChange = (e) => {
    setWebsiteError("");
    setWebsite(e.target.value);
  };

  const handleGstChange = (e) => {
    setGst(e.target.value);
    setGstError("");
  };

  const handleQstChange = (e) => {
    setQst(e.target.value);
    setQstError("");
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
    setCompanyError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setMobileError("");
  };

  const handlePermitChange = (e) => {
    setPermitError("");
    setPermit(e.target.value);
  };

  const handleCheck = (e) => {
    if (e.target.checked === true) {
      setBusinessStatus(1);
    } else {
      setBusinessStatus(0);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    let companyValid = true,
      emailValid = true,
      mobileValid = true,
      permitValid = true;

    if (company === "") {
      setCompanyError("Company Name is required.");
      companyValid = false;
    }

    if (!emailregex.test(email)) {
      setEmailError("Not a valid E-mail.");
      emailValid = false;
    }

    // if (!mobileregex.test(mobile)) {
    //   setMobileError("Not a valid mobile number.");
    //   mobileValid = false;
    // }

    if (permit === "") {
      setPermitError("Alcohol Production number is required.");
      permitValid = false;
    }

    if (
      companyValid === false ||
      emailValid === false ||
      mobileValid === false ||
      permitValid === false ||
      companyError !== "" ||
      emailError !== "" ||
      mobileError !== "" ||
      permitError !== "" ||
      websiteError !== "" ||
      gstError !== "" ||
      qstError !== ""
    ) {
      console.log("valdation error");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "supplier-edit",
        },
      };

      const bodyData = {
        company_name: company,
        website_url: website,
        contact_name: name,
        contact_email: email,
        phone_number: mobile,
        alcohol_production_permit: permit,
        business_name_status: businessStatus,
        order_number_prefix: prefix,
        gst_registration_number: gst,
        qst_registration_number: qst,
        user_id: user_id,
      };

      apis
        .post("/addSupplierProfile", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            navigate(`/supplier-management/supplier-edit-address/${user_id}`);
          } else {
            toast.error(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
            if (error.response.data.message === "validation_error") {
              if (error.response.data.data.company_name) {
                setCompanyError(error.response.data.data.company_name[0]);
              }
              if (error.response.data.data.phone_number) {
                setMobileError(error.response.data.data.phone_number[0]);
              }
              if (error.response.data.data.contact_email) {
                setEmailError(error.response.data.data.contact_email[0]);
              }
              if (error.response.data.data.website_url) {
                setWebsiteError(error.response.data.data.website_url[0]);
              }
              if (error.response.data.data.alcohol_production_permit) {
                setPermitError(
                  error.response.data.data.alcohol_production_permit[0]
                );
              }
              if (error.response.data.data.gst_registration_number) {
                setGstError(error.response.data.data.gst_registration_number[0]);
              }
              if (error.response.data.data.qst_registration_number) {
                setQstError(error.response.data.data.qst_registration_number[0]);
              }
            } else {
              toast.error(error.response.data.message, {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }
          
        });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/supplier-management");
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "supplier-view",
        Projectlanguageid: 1,
      },
    };
    apis
      .get(`/getSupplierUserData/${user_id}`, config)
      .then((res) => {
        if (res.data.success === true) {
          if (res.data.data.user_profile) {
            setFormData(res.data.data.user_profile);
            console.log(res.data.data.user_profile);
            if (res.data.data.user_profile.company_name) {
              setCompany(res.data.data.user_profile.company_name);
            }
            if (res.data.data.user_profile.website_url) {
              setWebsite(res.data.data.user_profile.website_url);
            }
            if (res.data.data.user_profile.contact_name) {
              setName(res.data.data.user_profile.contact_name);
            }
            if (res.data.data.user_profile.contact_email) {
              setEmail(res.data.data.user_profile.contact_email);
            }
            if (res.data.data.user_profile.phone_number) {
              setMobile(res.data.data.user_profile.phone_number);
            }
            if (res.data.data.user_profile.alcohol_production_permit) {
              setPermit(res.data.data.user_profile.alcohol_production_permit);
            }
            if (res.data.data.user_profile.business_name_status) {
              console.log("Enter checkmark");
            }
          }

          if (res.data.data.user_billing_address) {
            setFormData2(res.data.data.user_billing_address);
            if (res.data.data.user_billing_address.gst_registration_number) {
              setGst(
                res.data.data.user_billing_address.gst_registration_number
              );
            }
            if (res.data.data.user_billing_address.qst_registration_number) {
              setQst(
                res.data.data.user_billing_address.qst_registration_number
              );
            }
            if (res.data.data.user_billing_address.order_number_prefix) {
              setPrefix(res.data.data.user_billing_address.order_number_prefix);
            }
          }
        } else {
          toast.error(res.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  }, []);

  return (
    <div class="container-fluid page-wrap add-supplier-info">
      <div class="row height-inherit">
        <Sidebar
          showSidebar={showSidebar}
          updateSidebar={updateSidebar}
          userType={"supplier"}
        />

        <div class="col main p-0">
          <Header title="Edit Supplier" updateSidebar={updateSidebar} />
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
                                        Company Name<sup>*</sup>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={company}
                                        placeholder="Enter company name"
                                        onChange={(e) => handleCompanyChange(e)}
                                      />
                                      {companyError !== "" ? (
                                        <p className="error-label">
                                          {companyError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Website URL
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={website}
                                        placeholder="Enter website URL"
                                        onChange={(e) => handleWebsiteChange(e)}
                                      />
                                      {websiteError !== "" ? (
                                        <p className="error-label">
                                          {websiteError}
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
                                        Contact Email<sup>*</sup>
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => handleEmailChange(e)}
                                        placeholder="Enter contact Email"
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
                                        Mobile Number<sup>*</sup>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={mobile}
                                        onChange={(e) => handleMobileChange(e)}
                                        placeholder="Enter mobile no."
                                      />
                                      {mobileError !== "" ? (
                                        <p className="error-label">
                                          {mobileError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        Alcohol Production<sup>*</sup>
                                      </label>
                                      <div className="w-100 d-flex">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={permit}
                                          placeholder="Enter permit no."
                                          onChange={(e) =>
                                            handlePermitChange(e)
                                          }
                                        />

                                        <div className="uploadBtn ms-3">
                                          <input
                                            type="file"
                                            id="upload"
                                            hidden
                                          />
                                          <label for="upload">
                                            Choose file&nbsp;&nbsp;
                                            <img src={uploadImg} />
                                          </label>
                                        </div>
                                      </div>
                                      {permitError !== "" ? (
                                        <p className="error-label">
                                          {permitError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="w-100 d-flex align-items-center">
                                      <input
                                        type="checkbox"
                                        className="me-2"
                                        onChange={(e) => handleCheck(e)}
                                      />
                                      Show the business name on purchase orders
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
                                      Billing Information
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        Order Number Prefix
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={prefix}
                                        onChange={(e) =>
                                          setPrefix(e.target.value)
                                        }
                                        placeholder="Enter order number"
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        GST Tax
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={gst}
                                        onChange={(e) => handleGstChange(e)}
                                        placeholder="Enter GST tax"
                                      />
                                      {gstError !== "" ? (
                                        <p className="error-label">
                                          {gstError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        QST Tax Regsitration
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={qst}
                                        onChange={(e) => handleQstChange(e)}
                                        placeholder="Enter QST tax regsitration"
                                      />
                                      {qstError !== "" ? (
                                        <p className="error-label">
                                          {qstError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
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
                        className="btn btn-outline-black me-3"
                        onClick={(e) => handleCancel(e)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-purple"
                        onClick={(e) => handleNext(e)}
                      >
                        Next
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

export default EditSupplierGeneralInfo;
