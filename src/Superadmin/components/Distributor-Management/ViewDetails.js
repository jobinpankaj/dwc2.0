import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dpImg from "../../assets/images/dp.png";
import editImg from "../../assets/images/edit-white.png";
import uploadImg from "../../assets/images/upload.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { Modal } from "react-bootstrap";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialValues = {
  "dashboard-view": false,
  "delivery-user-view": false,
  "delivery-user-edit": false,
  "inventory-view": false,
  "inventory-edit": false,
  "order-view": false,
  "product-view": false,
  "reports-view": false,
  "retailer-view": false,
  "role-view": false,
  "role-edit": false,
  "routes-view": false,
  "routes-edit": false,
  "shipment-view": false,
  "shipment-edit": false,
  "supplier-view": false,
  "user-view": false,
  "user-edit": false,
};

const ViewDistributor = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const token = localStorage.getItem("admin_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [formData, setFormData] = useState("");
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [permissions, setPermissions] = useState("");
  const [defaultPermissions, setDefaultPermissions] = useState("");

  const handleHide = () => {
    setShow(false);
  };

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  function getValueId(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  const handleCheck = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.checked,
    });

    let updateArray = defaultPermissions;
    if (e.target.checked === false) {
      updateArray = updateArray.filter(function (item) {
        return item !== parseInt(e.target.value);
      });
      setDefaultPermissions(updateArray);
    } else {
      updateArray.push(parseInt(e.target.value));
      setDefaultPermissions(updateArray);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "distributor-edit",
      },
    };

    const bodyData = {
      user_id: user_id,
      permissions: defaultPermissions.toString(),
    };

    apis
      .post("/storeDistributorPermissions", bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Information Saved", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          setShow(false);
        } else {
          toast.error("Something went wrong. Please try again later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
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
          setFormData(res.data.data);
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

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        permission: "distributor-edit",
      },
      params: {
        user_id: user_id,
      },
    };

    const newConfig = {
      headers: {
        authorization: `Bearer ${token}`,
        permission: "distributor-view",
      },
    };

    apis
      .get(`/getDistributorDefaultPermissions`, config)
      .then((res) => {
        if (res.data.success === true) {
          setPermissions(res.data.data.permissions);
          apis
            .get(`/getDistributorUserData/${user_id}`, newConfig)
            .then((res2) => {
              if (res2.data.success === true) {
                setDefaultPermissions(res2.data.data.userPermissions);
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["dashboard-management"],
                        "dashboard-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "dashboard-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["delivery-user-management"],
                        "delivery-user-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "delivery-user-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["delivery-user-management"],
                        "delivery-user-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "delivery-user-edit": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["inventory-management"],
                        "inventory-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "inventory-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["inventory-management"],
                        "inventory-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "inventory-edit": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["order-management"],
                        "order-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "order-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["reports-management"],
                        "reports-view"
                      )
                    )
                  )
                ) {
                  console.log("HELLOOOO");
                  setValues((prevState) => ({
                    ...prevState,
                    "reports-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["retailers-management"],
                        "retailer-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "retailer-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["role-management"],
                        "role-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "role-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["role-management"],
                        "role-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "role-edit": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["routes-management"],
                        "routes-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "routes-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["routes-management"],
                        "routes-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "routes-edit": true,
                  }));
                }

                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["shipment-management"],
                        "shipment-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "shipment-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["shipment-management"],
                        "shipment-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "shipment-edit": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["suppliers-management"],
                        "supplier-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "supplier-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["user-management"],
                        "user-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "user-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["user-management"],
                        "user-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "user-edit": true,
                  }));
                }
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

  return (
    <div class="container-fluid page-wrap add-supplier">
      <div class="row height-inherit">
        <Sidebar userType={"admin"} />

        <div class="col main p-0">
          <Header
            title={t("admin.distributor_management.view.title")}
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row mb-4">
              <div class="col">
                <form>
                  {/* [Card] */}
                  <div className="card height-100">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-4 mb-4 mb-sm-0">
                          <div className="card shadow-none img-card h-100">
                            <div className="card-body d-flex justify-content-center align-items-center">
                              <div className="row">
                                <div className="col text-center d-flex flex-column justify-content-center align-items-center">
                                  <div className="dp-img mb-4 mx-auto position-relative rounded-circle d-inline-flex">
                                    <img
                                      src={
                                        formData.user_image !== null
                                          ? formData.user_image
                                          : dpImg
                                      }
                                      className="dp-img rounded-circle"
                                    />
                                    <label
                                      htmlFor="profile_pic"
                                      className="editImg rounded-circle bg-purple"
                                      style={{ display: "none" }}
                                    >
                                      <img
                                        src={editImg}
                                        className="img-fluid"
                                      />
                                    </label>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name="profile_pic"
                                      id="profile_pic"
                                      style={{ display: "none" }}
                                    ></input>
                                  </div>
                                  <div className="w-100 text-center">
                                    <div class="align-items-center w-auto">
                                      <button
                                        type="button"
                                        onClick={() => setShow(true)}
                                        className="btn btn-purple"
                                      >
                                        {t(
                                          "admin.distributor_management.view.permission_btn"
                                        )}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-8">
                          <div className="card shadow-none img-card">
                            <div className="card-body">
                              <div className="row">
                                <div className="form-head w-100 card-top-filter-box">
                                  <p>
                                    {t(
                                      "admin.distributor_management.edit_first.card_header"
                                    )}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        `/distributor-management/edit-distributor/${user_id}`
                                      )
                                    }
                                    className="btn btn-purple"
                                  >
                                    {t(
                                      "admin.distributor_management.view.edit_btn"
                                    )}
                                  </button>
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_first.first_name"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.first_name}
                                    placeholder={t(
                                      "admin.distributor_management.edit_first.fn_label"
                                    )}
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_first.last_name"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.last_name}
                                    placeholder={t(
                                      "admin.distributor_management.edit_first.ln_label"
                                    )}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_first.email"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={formData.email}
                                    placeholder={t(
                                      "admin.distributor_management.edit_first.email_label"
                                    )}
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_first.cmobile_number"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.phone_number}
                                    placeholder={t(
                                      "admin.distributor_management.edit_first.mobile_label"
                                    )}
                                    disabled
                                  />
                                </div>
                              </div>
                              {/* <div className="row" style={{display : "none"}}>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Create New Password
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      type={showPass1 ? "text" : "password"}
                                      className="form-control"
                                      value={pass1}
                                      // onChange = {(e) => handlePass1Change(e)}
                                      placeholder="Enter Password"
                                    />
                                    <span
                                      className={
                                        showPass1
                                          ? "form-field-icon icon-toggle active"
                                          : "form-field-icon icon-toggle"
                                      }
                                    ></span>
                                  </div>
                                  
                                  {pass1Error !== "" ? (
                                    <p className="error-label">{pass1Error}</p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="col-sm-6 mb-3 position-relative">
                                  <label className="form-label">
                                    Confirm New Password
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      type={showPass2 ? "text" : "password"}
                                      className="form-control"
                                      value={pass2}
                                      // onChange = {(e) => handlePass2Change(e)}
                                      placeholder="Confirm Password"
                                    />
                                    <span
                                      className={
                                        showPass2
                                          ? "form-field-icon icon-toggle active"
                                          : "form-field-icon icon-toggle"
                                      }
                                    ></span>
                                  </div>
                                  {pass2Error !== "" ? (
                                    <p className="error-label">{pass2Error}</p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* [/Card] */}
                </form>
              </div>
            </div>
            <div class="row">
              {/* [Left Grid] */}
              <div class="col-sm-6">
                {/* [Card] */}
                <div className="card height-100">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          {/* [General Info] */}
                          <div className="row mb-5">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100 card-top-filter-box">
                                  <p>
                                    {t(
                                      "admin.distributor_management.edit_second.card_header_1"
                                    )}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        `/distributor-management/distributor-edit-general-info/${user_id}`
                                      )
                                    }
                                    className="btn btn-purple"
                                  >
                                    {t(
                                      "admin.distributor_management.view.edit_btn"
                                    )}
                                  </button>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_second.company_name"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData.user_profile &&
                                      formData.user_profile.company_name
                                        ? formData.user_profile.company_name
                                        : "N/A"
                                    }
                                    placeholder={t(
                                      "admin.distributor_management.edit_second.company_label"
                                    )}
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_second.website_url"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData.user_profile &&
                                      formData.user_profile.website_url
                                        ? formData.user_profile.website_url
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder={t(
                                      "admin.distributor_management.edit_second.website_label"
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_second.contact_name"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData.user_profile &&
                                      formData.user_profile.contact_name
                                        ? formData.user_profile.contact_name
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder={t(
                                      "admin.distributor_management.edit_second.contact_label"
                                    )}
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_second.contact_email"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={
                                      formData.user_profile &&
                                      formData.user_profile.contact_email
                                        ? formData.user_profile.contact_email
                                        : "N/A"
                                    }
                                    placeholder={t(
                                      "admin.distributor_management.edit_second.email_label"
                                    )}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_second.mobile_number"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData.user_profile &&
                                      formData.user_profile.phone_number
                                        ? formData.user_profile.phone_number
                                        : "N/A"
                                    }
                                    placeholder={t(
                                      "admin.distributor_management.edit_second.mobile_label"
                                    )}
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
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
                                      value={
                                        formData.user_profile &&
                                        formData.user_profile.office_number
                                          ? formData.user_profile.office_number
                                          : "N/A"
                                      }
                                      placeholder={t(
                                        "admin.distributor_management.edit_second.office_ph"
                                      )}
                                      disabled
                                    />

                                    <div
                                      className="uploadBtn ms-3"
                                      style={{ display: "none" }}
                                    >
                                      <input
                                        type="file"
                                        accept="image/*"
                                        id="upload"
                                        hidden
                                      />
                                      <label for="upload">
                                        Choose file&nbsp;&nbsp;
                                        <img src={uploadImg} />
                                      </label>
                                    </div>
                                  </div>
                                  {/* {permitError !== "" ? <p className="error-label">{permitError}</p> : <></>} */}
                                </div>
                                <div className="w-100 d-flex align-items-center">
                                  <input
                                    style={{ display: "none" }}
                                    disabled
                                    type="checkbox"
                                    className="me-2"
                                    checked={
                                      formData.user_profile &&
                                      formData.user_profile.business_name_status
                                        ? formData.user_profile
                                            .business_name_status == "0"
                                          ? false
                                          : true
                                        : false
                                    }
                                  />
                                  <label style={{ display: "none" }}>
                                    Show the business name on purchase orders
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/General Info] */}

                          {/* [Billing Info] */}
                          <div className="row">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100">
                                  <p>
                                    {t(
                                      "admin.distributor_management.edit_second.card_header_2"
                                    )}
                                  </p>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_second.neq"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData.user_billing_address &&
                                      formData.user_billing_address
                                        .company_number_neq
                                        ? formData.user_billing_address
                                            .company_number_neq
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder={t(
                                      "admin.distributor_management.edit_second.neq_ph"
                                    )}
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_second.gst"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData.user_billing_address &&
                                      formData.user_billing_address
                                        .gst_registration_number
                                        ? formData.user_billing_address
                                            .gst_registration_number
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder={t(
                                      "admin.distributor_management.edit_second.gst_label"
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_second.qst"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData.user_billing_address &&
                                      formData.user_billing_address
                                        .qst_registration_number
                                        ? formData.user_billing_address
                                            .qst_registration_number
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder={t(
                                      "admin.distributor_management.edit_second.qst_label"
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/Billing Info] */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
              {/* [/Left Grid] */}

              {/* [Right Grid] */}
              <div className="col-sm-6">
                {/* [Card] */}
                <div className="card height-100">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          {/* [Main Address] */}
                          <div className="row mb-5">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100 card-top-filter-box">
                                  <p>
                                    {t(
                                      "admin.distributor_management.edit_third.card_header_1"
                                    )}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        `/distributor-management/distributor-edit-address/${user_id}`
                                      )
                                    }
                                    className="btn btn-purple"
                                  >
                                    {t(
                                      "admin.distributor_management.view.edit_btn"
                                    )}
                                  </button>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.address"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder="Enter address"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.address_2"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder={t(
                                      "admin.distributor_management.edit_third.address_2_ph"
                                    )}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.city"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder={t(
                                      "admin.distributor_management.edit_third.city_ph"
                                    )}
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.postal"
                                    )}
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value=""
                                    placeholder={t(
                                      "admin.distributor_management.edit_third.postal_ph"
                                    )}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.country"
                                    )}
                                    y
                                  </label>
                                  <select className="form-select" disabled>
                                    <option value>Country 1</option>
                                    <option value>Country 2</option>
                                    <option value>Country 3</option>
                                    <option value>Country 4</option>
                                  </select>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.state"
                                    )}
                                  </label>
                                  <select className="form-select" disabled>
                                    <option value>State 1</option>
                                    <option value>State 2</option>
                                    <option value>State 3</option>
                                    <option value>State 4</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/Main Address] */}

                          {/* [Billing Address] */}
                          <div className="row">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100">
                                  {t(
                                    "admin.distributor_management.edit_third.card_header_2"
                                  )}
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.company"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder={t(
                                      "admin.distributor_management.edit_third.company_ph"
                                    )}
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.address"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder="Enter address"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.address_2"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder={t(
                                      "admin.distributor_management.edit_third.address_2_ph"
                                    )}
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.city"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder={t(
                                      "admin.distributor_management.edit_third.city_ph"
                                    )}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.country"
                                    )}
                                  </label>
                                  <select className="form-select" disabled>
                                    <option value>Country 1</option>
                                    <option value>Country 2</option>
                                    <option value>Country 3</option>
                                    <option value>Country 4</option>
                                  </select>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "admin.distributor_management.edit_third.state"
                                    )}
                                  </label>
                                  <select className="form-select" disabled>
                                    <option value>State 1</option>
                                    <option value>State 2</option>
                                    <option value>State 3</option>
                                    <option value>State 4</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/Billing Address] */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
              {/* [/Right Grid] */}
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => handleHide()}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p>Permissions List</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-12">
              <div className="card shadow-none img-card">
                <div className="card-body">
                  <form>
                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Dashboard Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="dashboard-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["dashboard-management"],
                                    "dashboard-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["dashboard-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            name="pricing-edit"
                            disabled
                            // value= {permissions && permissions !== "" ? getValueId(permissions["pricing-management"], "pricing-edit") : ""}
                            onChange={(e) => handleCheck(e)}
                            // checked = {values["pricing-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Delivery User Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="delivery-user-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["delivery-user-management"],
                                    "delivery-user-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["delivery-user-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            name="delivery-user-edit"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["delivery-user-management"],
                                    "delivery-user-edit"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["delivery-user-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Order Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="order-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["order-management"],
                                    "order-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["order-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            name="order-edit"
                            disabled
                            // value= {permissions && permissions !== "" ? getValueId(permissions["order-management"], "order-edit") : ""}
                            onChange={(e) => handleCheck(e)}
                            // checked = {values["order-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Inventory Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="inventory-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["inventory-management"],
                                    "inventory-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["inventory-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            name="inventory-edit"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["inventory-management"],
                                    "inventory-edit"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["inventory-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Product Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="product-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["product-management"],
                                    "product-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["product-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            name="product-edit"
                            disabled
                            // value= {permissions && permissions !== "" ? getValueId(permissions["product-management"], "product-edit") : ""}
                            onChange={(e) => handleCheck(e)}
                            // checked = {values["product-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Role Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="role-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["role-management"],
                                    "role-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["role-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            name="role-edit"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["role-management"],
                                    "role-edit"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["role-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            User Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="user-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["user-management"],
                                    "user-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["user-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            name="user-edit"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["user-management"],
                                    "user-edit"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["user-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Retailers Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="retailer-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["retailers-management"],
                                    "retailer-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["retailer-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            disabled
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Reports Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="reports-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["reports-management"],
                                    "reports-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["reports-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            value="option2"
                            disabled
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Routes Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="routes-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["routes-management"],
                                    "routes-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["routes-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            name="routes-edit"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["routes-management"],
                                    "routes-edit"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["routes-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}
                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Shipment Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="shipment-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["shipment-management"],
                                    "shipment-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["shipment-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            name="shipment-edit"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["shipment-management"],
                                    "shipment-edit"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["shipment-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}
                    {/* [Row] */}
                    <div class="row g-3 align-items-center justify-content-between">
                      <div class="col-auto">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Suppliers Management
                          </label>
                        </div>
                      </div>
                      <div class="col-auto">
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox1"
                            name="supplier-view"
                            value={
                              permissions && permissions !== ""
                                ? getValueId(
                                    permissions["suppliers-management"],
                                    "supplier-view"
                                  )
                                : ""
                            }
                            onChange={(e) => handleCheck(e)}
                            checked={values["supplier-view"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox1">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="inlineCheckbox2"
                            disabled
                            // value= {permissions && permissions !== "" ? getValueId(permissions["routes-management"], "routes-edit") : ""}
                            // onChange = {(e) => handleCheck(e)}
                            // checked = {values["routes-edit"]}
                          />
                          <label class="form-check-label" for="inlineCheckbox2">
                            Edit
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* [/Row] */}

                    <div className="row mt-4">
                      <div className="col text-center">
                        <button
                          type="button"
                          onClick={() => setShow(false)}
                          className="btn btn-outline-black me-3"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-purple"
                          onClick={(e) => handleSave(e)}
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ViewDistributor;
