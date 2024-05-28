import React, { useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";
toast.configure();

const initialValues = {
  "pricing-view": false,
  "pricing-edit": false,
  "groups-view": false,
  "groups-edit": false,
  "order-view": false,
  "order-edit": false,
  "inventory-view": false,
  "inventory-edit": false,
  "product-view": false,
  "product-edit": false,
  "role-view": false,
  "role-edit": false,
  "user-view": false,
  "user-edit": false,
  "retailer-view": false,
  "reports-view": false,
  "dashboard-view": false,
};

const ViewSupplier = () => {
  const apis = useAuthInterceptor();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const token = localStorage.getItem("distributor_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [formData, setFormData] = useState("");
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [permissions, setPermissions] = useState("");
  const [defaultPermissions, setDefaultPermissions] = useState("");
  const { t } = useTranslation();

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
        permission: "supplier-edit",
      },
    };

    const bodyData = {
      user_id: user_id,
      permissions: defaultPermissions.toString(),
    };

    apis
      .post("/storeSupplierPermissions", bodyData, config)
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Information Saved", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Something went wrong. Please try again later", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        }
      });
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
      .get(`/distributor/getSupplierUserData/${user_id}`, config)
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
        if(error.message !== "revoke"){
        toast.error("Something went wrong. Please try again later.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, []);

  return (
    <div class="container-fluid page-wrap add-supplier">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />
        <div class="col main p-0">
          <Header
            title={t("distributor.supplier_management.detail.title")}
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
                                      name="profile_pic"
                                      id="profile_pic"
                                      style={{ display: "none" }}
                                    ></input>
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
                                  <p>Profile info.</p>
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.first_name"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.first_name}
                                    placeholder="N/A"
                                    readOnly
                                  />
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.last_name"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.last_name}
                                    placeholder="N/A"
                                    readOnly
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Email<sup>*</sup>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={formData.email}
                                    placeholder="N/A"
                                    readOnly
                                  />
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.mobile_number"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.phone_number}
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
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
                                      "distributor.supplier_management.detail.general_info"
                                    )}
                                  </p>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.company_name"
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
                                    placeholder="Enter company name"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.website_url"
                                    )}{" "}
                                    (Example : http://www.yourdomain.com)
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
                                    placeholder="N/A"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.contact_name"
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
                                    placeholder="N/A"
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.contact_email"
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
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.mobile_number"
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
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.alchohal_prod"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <div className="w-100 d-flex">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        formData.user_profile &&
                                        formData.user_profile
                                          .alcohol_production_permit
                                          ? formData.user_profile
                                              .alcohol_production_permit
                                          : "N/A"
                                      }
                                      placeholder="N/A"
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
                                  {t(
                                    "distributor.supplier_management.detail.purchase_orders"
                                  )}
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
                                      "distributor.supplier_management.detail.billing_info"
                                    )}
                                  </p>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.order_num_prefix"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData.user_billing_address &&
                                      formData.user_billing_address
                                        .order_number_prefix
                                        ? formData.user_billing_address
                                            .order_number_prefix
                                        : "N/A"
                                    }
                                    disabled
                                    placeholder="Enter order number"
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.gst_tax"
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
                                    placeholder="Enter GST tax"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.qst_tax_reg"
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
                                    placeholder="Enter QST tax regsitration"
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
                                      "distributor.supplier_management.detail.main_address"
                                    )}
                                  </p>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.address"
                                    )}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_main_address?.address_1
                                        ? formData?.user_main_address?.address_1
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.address"
                                    )}{" "}
                                    2
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_main_address?.address_2
                                        ? formData?.user_main_address?.address_2
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.city_name"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_main_address?.city
                                        ? formData?.user_main_address?.city
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.postal_code"
                                    )}
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={
                                      formData?.user_main_address?.postal_code
                                        ? formData?.user_main_address
                                            ?.postal_code
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.country"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_main_address?.country
                                        ? formData?.user_main_address?.country
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.state"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_main_address?.state
                                        ? formData?.user_main_address?.state
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
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
                                    "distributor.supplier_management.detail.billing_address"
                                  )}
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.company"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_profile?.company_name
                                        ? formData?.user_profile?.company_name
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.address"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_billing_address?.address_1
                                        ? formData?.user_billing_address
                                            ?.address_1
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.address"
                                    )}{" "}
                                    2
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_billing_address?.address_2
                                        ? formData?.user_billing_address
                                            ?.address_2
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.city_name"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_billing_address?.city
                                        ? formData?.user_billing_address?.city
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.country"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_billing_address?.country
                                        ? formData?.user_billing_address
                                            ?.country
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    {t(
                                      "distributor.supplier_management.detail.state"
                                    )}
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={
                                      formData?.user_billing_address?.state
                                        ? formData?.user_billing_address?.state
                                        : "N/A"
                                    }
                                    placeholder="N/A"
                                    disabled
                                  />
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
    </div>
  );
};

export default ViewSupplier;
