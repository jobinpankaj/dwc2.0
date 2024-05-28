import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useParams, useNavigate } from "react-router-dom";

import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const EditDistributorGeneralInfo = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
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
  const [office, setOffice] = useState("");
  const [officeError, setOfficeError] = useState("");
  const [neq, setNeq] = useState("");
  const [neqError, setNeqError] = useState("");
  const [gst, setGst] = useState("");
  const [gstError, setGstError] = useState("");
  const [qst, setQst] = useState("");
  const [qstError, setQstError] = useState("");
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

  const handleOfficeChange = (e) => {
    setOfficeError("");
    setOffice(e.target.value);
  };

  const handleNeqChange = (e) => {
    setNeq(e.target.value);
  };

  const handleNext = (e) => {
    e.preventDefault();

    let companyValid = true,
      emailValid = true,
      mobileValid = true,
      permitValid = true;

    if (company === "") {
      setCompanyError("Company name is required.");
      companyValid = false;
    }

    if (!emailregex.test(email)) {
      setEmailError("Not a valid e-mail.");
      emailValid = false;
    }

    // if (!mobileregex.test(mobile)) {
    //   setMobileError("Not a valid mobile number.");
    //   mobileValid = false;
    // }

    if (office === "") {
      setOfficeError("Office number is required.");
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
      officeError !== "" ||
      websiteError !== "" ||
      gstError !== "" ||
      qstError !== "" ||
      neqError !== ""
    ) {
      console.log("valdation error");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "distributor-edit",
        },
      };

      const bodyData = {
        company_name: company,
        website_url: website,
        contact_name: name,
        contact_email: email,
        phone_number: mobile,
        office_number: office,
        company_number_neq: neq,
        gst_registration_number: gst,
        qst_registration_number: qst,
        user_id: user_id,
      };

      apis
        .post("/addDistributorProfile", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            navigate(
              `/distributor-management/distributor-edit-address/${user_id}`
            );
          } else {
            toast.error(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
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
            if (error.response.data.data.office_number) {
              setOfficeError(error.response.data.data.office_number[0]);
            }
            if (error.response.data.data.gst_registration_number) {
              setGstError(error.response.data.data.gst_registration_number[0]);
            }
            if (error.response.data.data.qst_registration_number) {
              setQstError(error.response.data.data.qst_registration_number[0]);
            }
            if (error.response.data.data.company_number_neq) {
              setNeqError(error.response.data.data.company_number_neq[0]);
            }
          } else {
            toast.error(error.response.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/distributor-management");
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "distributor-view",
        Projectlanguageid: 1,
      },
    };
    apis
      .get(`/getDistributorUserData/${user_id}`, config)
      .then((res) => {
        if (res.data.success === true) {
          if (res.data.data.user_profile) {
            setFormData(res.data.data.user_profile);
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
            if (res.data.data.user_profile.office_number) {
              setOffice(res.data.data.user_profile.office_number);
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
            if (res.data.data.user_billing_address.company_number_neq) {
              setNeq(res.data.data.user_billing_address.company_number_neq);
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
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }, []);

  return (
    <div className="container-fluid page-wrap add-supplier-info">
      <div className="row height-inherit">
        <Sidebar userType={"admin"} />

        <div className="col main p-0">
          <Header
            title={t("admin.distributor_management.edit_second.title")}
            updateSidebar={updateSidebar}
          />
          <div className="container-fluid page-content-box px-3 px-sm-4">
            <div className="row">
              <div className="col">
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
                                      {t(
                                        "admin.distributor_management.edit_second.card_header_1"
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.edit_second.company_name"
                                        )}
                                        <sup>*</sup>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={company}
                                        placeholder={t(
                                          "admin.distributor_management.edit_second.company_label"
                                        )}
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
                                        {t(
                                          "admin.distributor_management.edit_second.website_url"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={website}
                                        placeholder={t(
                                          "admin.distributor_management.edit_second.website_label"
                                        )}
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
                                        {t(
                                          "admin.distributor_management.edit_second.contact_name"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        placeholder={t(
                                          "admin.distributor_management.edit_second.contact_label"
                                        )}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.edit_second.contact_email"
                                        )}
                                        <sup>*</sup>
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => handleEmailChange(e)}
                                        placeholder={t(
                                          "admin.distributor_management.edit_second.email_label"
                                        )}
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
                                        {t(
                                          "admin.distributor_management.edit_second.mobile_number"
                                        )}
                                        <sup>*</sup>
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={mobile}
                                        onChange={(e) => handleMobileChange(e)}
                                        placeholder={t(
                                          "admin.distributor_management.edit_second.mobile_label"
                                        )}
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
                                        {t(
                                          "admin.distributor_management.edit_second.office"
                                        )}
                                        <sup>*</sup>
                                      </label>
                                      <div className="w-100 d-flex">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={office}
                                          placeholder={t(
                                            "admin.distributor_management.edit_second.office_ph"
                                          )}
                                          onChange={(e) =>
                                            handleOfficeChange(e)
                                          }
                                        />

                                        {/* <div className="uploadBtn ms-3">
                                          <input
                                            type="file"
                                            id="upload"
                                            hidden
                                          />
                                          <label htmlFor="upload">
                                            Choose file&nbsp;&nbsp;
                                            <img src={uploadImg} />
                                          </label>
                                        </div> */}
                                      </div>
                                      {officeError !== "" ? (
                                        <p className="error-label">
                                          {officeError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    {/* <div className="w-100 d-flex align-items-center">
                                      <input type="checkbox" className="me-2" onChange={(e) => handleCheck(e)} />
                                      Show the business name on purchase orders
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                              {/* [/General Info] */}

                              {/* [Billing Info] */}
                              <div className="row">
                                <div className="col-xl-9 col-12">
                                  <div className="row">
                                    <div className="form-head w-100">
                                      {t(
                                        "admin.distributor_management.edit_second.card_header_2"
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.edit_second.neq"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={neq}
                                        onChange={(e) => handleNeqChange(e)}
                                        placeholder={t(
                                          "admin.distributor_management.edit_second.neq_ph"
                                        )}
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.edit_second.gst"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={gst}
                                        onChange={(e) => handleGstChange(e)}
                                        placeholder={t(
                                          "admin.distributor_management.edit_second.gst_label"
                                        )}
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
                                        {t(
                                          "admin.distributor_management.edit_second.qst"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={qst}
                                        onChange={(e) => handleQstChange(e)}
                                        placeholder={t(
                                          "admin.distributor_management.edit_second.qst_label"
                                        )}
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
                        {t(
                          "admin.distributor_management.edit_second.cancel_button"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-purple"
                        onClick={(e) => handleNext(e)}
                      >
                        {t(
                          "admin.distributor_management.edit_second.next_button"
                        )}
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

export default EditDistributorGeneralInfo;
