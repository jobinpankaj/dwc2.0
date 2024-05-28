import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";

toast.configure();

const AddDistributorGeneralInfo = () => {
  const apis = useAuthInterceptor();
  const { user_id } = useParams();
  const { t, i18n } = useTranslation();
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
  const [gst, setGst] = useState("");
  const [qst, setQst] = useState("");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
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

  const handleGstChange = (e) => {
    setGst(e.target.value);
  };

  const handleQstChange = (e) => {
    setQst(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
    setWebsiteError("");
  };

  const handleNext = (e) => {
    e.preventDefault();

    let emailValid = true,
      mobileValid = true;

    if (email !== "" && !emailregex.test(email)) {
      setEmailError("Not a valid e-mail.");
      emailValid = false;
    }

    // if (mobile !== "" && !mobileregex.test(mobile)) {
    //   setMobileError("Not a valid mobile number.");
    //   mobileValid = false;
    // }

    if (
      !mobileValid ||
      !emailValid ||
      companyError !== "" ||
      emailError !== "" ||
      mobileError !== "" ||
      officeError !== "" ||
      websiteError !== ""
    ) {
      console.log("valdation error");
    } else {
      if (
        company !== "" ||
        website !== "" ||
        name !== "" ||
        email !== "" ||
        mobile !== "" ||
        office !== "" ||
        neq !== "" ||
        qst !== "" ||
        gst !== ""
      ) {
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
              toast.success("General Information saved!", {
                autoClose: 1000,
                position: toast.POSITION.TOP_CENTER,
              });
              navigate(
                `/distributor-management/add-distributor-address/${user_id}`
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
              if (error.response.data.data.contact_email) {
                setEmailError(error.response.data.data.contact_email[0]);
              }
              if (error.response.data.data.phone_number) {
                setMobileError(error.response.data.data.phone_number[0]);
              }
              if (error.response.data.data.office_number) {
                setOfficeError(error.response.data.data.office_number[0]);
              }
              if (error.response.data.data.website_url) {
                setWebsiteError(error.response.data.data.website_url[0]);
              }
            } else {
              toast.error(error.response.data.message, {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          });
      } else {
        navigate(`/distributor-management/add-distributor-address/${user_id}`);
      }
    }
  };

  return (
    <div class="container-fluid page-wrap add-supplier-info">
      <div class="row height-inherit">
        <Sidebar userType={"admin"} />

        <div class="col main p-0">
          <Header
            title={t("admin.distributor_management.add_second.title")}
            updateSidebar={updateSidebar}
          />
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
                                      {t(
                                        "admin.distributor_management.add_second.card_header_1"
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.add_second.company_name"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={company}
                                        onChange={(e) => handleCompanyChange(e)}
                                        placeholder={t(
                                          "admin.distributor_management.add_second.company_label"
                                        )}
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
                                          "admin.distributor_management.add_second.website_url"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={website}
                                        placeholder={t(
                                          "admin.distributor_management.add_second.website_label"
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
                                          "admin.distributor_management.add_second.contact_name"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        placeholder={t(
                                          "admin.distributor_management.add_second.contact_label"
                                        )}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.add_second.contact_email"
                                        )}
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        placeholder={t(
                                          "admin.distributor_management.add_second.email_label"
                                        )}
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
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.add_second.mobile_number"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={mobile}
                                        placeholder={t(
                                          "admin.distributor_management.add_second.mobile_label"
                                        )}
                                        onChange={(e) => handleMobileChange(e)}
                                      />
                                      {mobileError !== "" ? (
                                        <p className="error-label">
                                          {mobileError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.add_second.office"
                                        )}
                                      </label>
                                      <div className="w-100">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={office}
                                          placeholder={t(
                                            "admin.distributor_management.add_second.office_ph"
                                          )}
                                          onChange={(e) =>
                                            handleOfficeChange(e)
                                          }
                                        />
                                        {officeError !== "" ? (
                                          <p className="error-label">
                                            {officeError}
                                          </p>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
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
                                      {t(
                                        "admin.distributor_management.add_second.card_header_2"
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.add_second.neq"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={neq}
                                        placeholder={t(
                                          "admin.distributor_management.add_second.neq_ph"
                                        )}
                                        onChange={(e) => handleNeqChange(e)}
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.add_second.gst"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={gst}
                                        placeholder={t(
                                          "admin.distributor_management.add_second.gst_label"
                                        )}
                                        onChange={(e) => handleGstChange(e)}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.distributor_management.add_second.qst"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={qst}
                                        placeholder={t(
                                          "admin.distributor_management.add_second.qst_label"
                                        )}
                                        onChange={(e) => handleQstChange(e)}
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
                        className="btn btn-outline-black me-3"
                      >
                        {t(
                          "admin.distributor_management.add_second.cancel_button"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-purple"
                        onClick={(e) => handleNext(e)}
                      >
                        {t(
                          "admin.distributor_management.add_second.next_button"
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

export default AddDistributorGeneralInfo;
