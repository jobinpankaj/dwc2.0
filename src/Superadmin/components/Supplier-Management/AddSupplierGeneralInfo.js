import React, { useState, useEffect } from "react";
import uploadImg from "../../assets/images/upload.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const AddSupplierGeneralInfo = () => {
  const apis = useAuthInterceptor();
  const numberRegEx = /^[0-9]*$/;
  const { user_id } = useParams();
  const navigate = useNavigate();
  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let mobileregex = /^\d{10}$/;
  const { t, i18n } = useTranslation();
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
  const [businessStatus, setBusinessStatus] = useState("0");
  const [distributionBucket, setDistributionBucket] = useState("0");
  const [haveProduct, setHaveProduct] = useState("0");
  const [sellAndCollect, setSellAndCollect] = useState("0");
  const [produceProduct, setProduceProduct] = useState("0");
  const [hecto, setHecto] = useState("");
  const [hectoError, setHectoError] = useState("");

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

  const handleAlcoholProductionChange = (e) => {
    if (numberRegEx.test(e.target.value) || e.target.value === "") {
      setHecto(e.target.value);
      setHectoError("");
    }
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

  const handleNext = (e) => {
    e.preventDefault();

    let companyValid = true,
      emailValid = true,
      mobileValid = true,
      permitValid = true,
      alcoholValid = true;

    if (email !== "" && !emailregex.test(email)) {
      setEmailError("Not a valid e-mail.");
      emailValid = false;
    }

    // if (mobile !== "" && !mobileregex.test(mobile)) {
    //   setMobileError("Not a valid mobile number.");
    //   mobileValid = false;
    // }

    // if (parseInt(hecto) > 20000) {
    //   setHectoError("Alcohol production limit can not be greater than 20000.");
    //   alcoholValid = false;
    // }

    if (
      companyValid === false ||
      emailValid === false ||
      mobileValid === false ||
      permitValid === false ||
      alcoholValid === false ||
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
      if (
        company !== "" ||
        website !== "" ||
        name !== "" ||
        email !== "" ||
        mobile !== "" ||
        permit !== "" ||
        businessStatus !== "0" ||
        distributionBucket !== "0" ||
        sellAndCollect !== "0" ||
        produceProduct !== "0" ||
        prefix !== "" ||
        gst !== "" ||
        qst !== ""
      ) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            permission: "supplier-edit",
          },
        };

        const bodyData = {
          ...(company && { company_name: company }),
          ...(website && { website_url: website }),
          ...(name && { contact_name: name }),
          ...(email && { contact_email: email }),
          ...(mobile && { phone_number: mobile }),
          ...(permit && { alcohol_production_permit: permit }),
          ...(businessStatus && { business_name_status: businessStatus }),
          ...(distributionBucket && {
            distribution_bucket_status: distributionBucket,
          }),
          ...(haveProduct && { have_product_status: haveProduct }),
          ...(sellAndCollect && {
            agency_sell_and_collect_status: sellAndCollect,
          }),
          ...(produceProduct && { produce_product_status: produceProduct }),
          ...(prefix && { order_number_prefix: prefix }),
          ...(gst && { gst_registration_number: gst }),
          ...(qst && { qst_registration_number: qst }),
          ...(hecto && { alcohol_production_limit: hecto }),
          ...(user_id && { user_id: user_id }),
        };
        console.log(bodyData);
        apis
          .post("/addSupplierProfile", bodyData, config)
          .then((res) => {
            if (res.data.success === true) {
              toast.success("General Information saved!", {
                autoClose: 1000,
                position: toast.POSITION.TOP_CENTER,
              });
              navigate(`/supplier-management/add-supplier-address/${user_id}`);
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
              if (error.response.data.data.alcohol_production_permit) {
                setPermitError(
                  error.response.data.data.alcohol_production_permit[0]
                );
              }
              if (error.response.data.data.gst_registration_number) {
                setGstError(
                  error.response.data.data.gst_registration_number[0]
                );
              }
              if (error.response.data.data.qst_registration_number) {
                setQstError(
                  error.response.data.data.qst_registration_number[0]
                );
              }
            } else {
              toast.error(error.response.data.message, {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          });
      } else {
        navigate(`/supplier-management/add-supplier-address/${user_id}`);
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/supplier-management");
  };

  return (
    <div class="container-fluid page-wrap add-supplier-info">
      <div class="row height-inherit">
        <Sidebar userType={"admin"} />

        <div class="col main p-0">
          <Header
            title={t("admin.supplier_management.add_second.title")}
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
                                        "admin.supplier_management.add_second.card_header_1"
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_second.company_name"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={company}
                                        placeholder={t(
                                          "admin.supplier_management.add_second.company_label"
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
                                          "admin.supplier_management.add_second.website_url"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={website}
                                        placeholder={t(
                                          "admin.supplier_management.add_second.website_label"
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
                                          "admin.supplier_management.add_second.contact_name"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        placeholder={t(
                                          "admin.supplier_management.add_second.contact_label"
                                        )}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_second.contact_email"
                                        )}
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => handleEmailChange(e)}
                                        placeholder={t(
                                          "admin.supplier_management.add_second.email_label"
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
                                          "admin.supplier_management.add_second.mobile_number"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={mobile}
                                        onChange={(e) => handleMobileChange(e)}
                                        placeholder={t(
                                          "admin.supplier_management.add_second.mobile_label"
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
                                          "admin.supplier_management.add_second.alcohol"
                                        )}
                                      </label>
                                      <div className="w-100 d-flex">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={permit}
                                          placeholder={t(
                                            "admin.supplier_management.add_second.alcohol_permit"
                                          )}
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
                                  </div>
                                  <div className="row mb-4">
                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_second.alcohol_2"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={hecto}
                                        onChange={(e) =>
                                          handleAlcoholProductionChange(e)
                                        }
                                        placeholder={t(
                                          "admin.supplier_management.add_second.alcohol_2_ph"
                                        )}
                                      />
                                      {hectoError !== "" ? (
                                        <p className="error-label">
                                          {hectoError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-12 mb-3 d-flex align-items-start">
                                      <input
                                        type="checkbox"
                                        className="me-2 mt-1"
                                        checked={
                                          businessStatus == "1" ? true : false
                                        }
                                        onChange={(e) => {
                                          e.target.checked
                                            ? setBusinessStatus("1")
                                            : setBusinessStatus("0");
                                        }}
                                      />
                                      <p className="m-0">
                                        {t(
                                          "admin.supplier_management.add_second.business_name"
                                        )}
                                      </p>
                                    </div>
                                    <div className="col-sm-12 mb-3 d-flex align-items-start">
                                      <input
                                        type="checkbox"
                                        className="me-2 mt-1"
                                        checked={
                                          distributionBucket == "1"
                                            ? true
                                            : false
                                        }
                                        onChange={(e) => {
                                          e.target.checked
                                            ? setDistributionBucket("1")
                                            : setDistributionBucket("0");
                                        }}
                                      />
                                      <p className="m-0">
                                        {t(
                                          "admin.supplier_management.add_second.distribution_bucket"
                                        )}
                                      </p>
                                    </div>
                                    <div className="col-sm-12 mb-3 d-flex align-items-start">
                                      <input
                                        type="checkbox"
                                        className="me-2 mt-1"
                                        checked={
                                          haveProduct == "1" ? true : false
                                        }
                                        onChange={(e) => {
                                          e.target.checked
                                            ? setHaveProduct("1")
                                            : setHaveProduct("0");
                                        }}
                                      />
                                      <p className="m-0">
                                        {t(
                                          "admin.supplier_management.add_second.own_facility"
                                        )}{" "}
                                      </p>
                                    </div>
                                    <div className="col-sm-12 mb-3 d-flex align-items-start">
                                      <input
                                        type="checkbox"
                                        className="me-2 mt-1"
                                        checked={
                                          sellAndCollect == "1" ? true : false
                                        }
                                        onChange={(e) => {
                                          e.target.checked
                                            ? setSellAndCollect("1")
                                            : setSellAndCollect("0");
                                        }}
                                      />
                                      <p className="m-0">
                                        {t(
                                          "admin.supplier_management.add_second.other_suppliers"
                                        )}
                                      </p>
                                    </div>
                                    <div className="col-sm-12 mb-3 d-flex align-items-start">
                                      <input
                                        type="checkbox"
                                        className="me-2 mt-1"
                                        checked={
                                          produceProduct == "1" ? true : false
                                        }
                                        onChange={(e) => {
                                          e.target.checked
                                            ? setProduceProduct("1")
                                            : setProduceProduct("0");
                                        }}
                                      />
                                      <p className="m-0">
                                        {t(
                                          "admin.supplier_management.add_second.our_behalf"
                                        )}
                                      </p>
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
                                        "admin.supplier_management.add_second.card_header_2"
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_second.prefix"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={prefix}
                                        onChange={(e) =>
                                          setPrefix(e.target.value)
                                        }
                                        placeholder={t(
                                          "admin.supplier_management.add_second.prefix_label"
                                        )}
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_second.gst"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={gst}
                                        onChange={(e) => handleGstChange(e)}
                                        placeholder={t(
                                          "admin.supplier_management.add_second.gst_label"
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
                                          "admin.supplier_management.add_second.qst"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={qst}
                                        onChange={(e) => handleQstChange(e)}
                                        placeholder={t(
                                          "admin.supplier_management.add_second.qst_label"
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
                          "admin.supplier_management.add_second.cancel_button"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-purple"
                        onClick={(e) => handleNext(e)}
                      >
                        {t("admin.supplier_management.add_second.next_button")}
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

export default AddSupplierGeneralInfo;
