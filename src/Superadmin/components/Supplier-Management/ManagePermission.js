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

const ManagePermission = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const url = window.location.pathname;
  const fragments = url.split("/");
  const backpath = `/${fragments[1]}`;
  const navigate = useNavigate();
  let headerTitle;
  if (fragments[1] == "supplier-management") {
    headerTitle = "Manage Supplier Permissions";
  } else if (fragments[1] == "distributor-management") {
    headerTitle = "Manage Distributor Permissions";
  } else {
    headerTitle = "Manage Retailer Permissions";
  }

  const { user_id } = useParams();
  const [values, setValues] = useState(initialValues);
  const token = localStorage.getItem("admin_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [permissions, setPermissions] = useState("");
  const [defaultPermissions, setDefaultPermissions] = useState("");

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
          navigate(backpath);
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
        toast.error("Something went wrong. Please try again later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
        permission: "supplier-edit",
      },
      params: {
        user_id: user_id,
      },
    };

    const newConfig = {
      headers: {
        authorization: `Bearer ${token}`,
        permission: "supplier-view",
      },
    };

    apis
      .get(`/getSupplierDefaultPermissions`, config)
      .then((res) => {
        if (res.data.success === true) {
          setPermissions(res.data.data.permissions);
          apis
            .get(`/getSupplierUserData/${user_id}`, newConfig)
            .then((res2) => {
              if (res2.data.success === true) {
                setDefaultPermissions(res2.data.data.userPermissions);
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["pricing-management"],
                        "pricing-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "pricing-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["pricing-management"],
                        "pricing-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "pricing-edit": true,
                  }));
                }

                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["groups-management"],
                        "groups-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "groups-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["groups-management"],
                        "groups-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "groups-edit": true,
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
                        res.data.data.permissions["order-management"],
                        "order-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "order-edit": true,
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
                        res.data.data.permissions["product-management"],
                        "product-view"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "product-view": true,
                  }));
                }
                if (
                  res2.data.data.userPermissions.includes(
                    parseInt(
                      getValueId(
                        res.data.data.permissions["product-management"],
                        "product-edit"
                      )
                    )
                  )
                ) {
                  setValues((prevState) => ({
                    ...prevState,
                    "product-edit": true,
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
            title={t("admin.supplier_management.permission.title")}
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            {/* [Card] */}
            <div className="card height-100">
              <div className="card-body">
                <div className="row">
                  <div className=" col-xl-5 col-sm-10 mx-auto my-5">
                    <div className="card shadow-none img-card">
                      <div className="card-body">
                        <form>
                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7 ">
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
                                  {t(
                                    "admin.supplier_management.permission.pricing"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox1"
                                  name="pricing-view"
                                  value={
                                    permissions && permissions !== ""
                                      ? getValueId(
                                          permissions["pricing-management"],
                                          "pricing-view"
                                        )
                                      : ""
                                  }
                                  onChange={(e) => handleCheck(e)}
                                  checked={values["pricing-view"]}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox2"
                                  name="pricing-edit"
                                  value={
                                    permissions && permissions !== ""
                                      ? getValueId(
                                          permissions["pricing-management"],
                                          "pricing-edit"
                                        )
                                      : ""
                                  }
                                  onChange={(e) => handleCheck(e)}
                                  checked={values["pricing-edit"]}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3 border-bottom align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7">
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
                                  {t(
                                    "admin.supplier_management.permission.groups"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox1"
                                  name="groups-view"
                                  value={
                                    permissions && permissions !== ""
                                      ? getValueId(
                                          permissions["groups-management"],
                                          "groups-view"
                                        )
                                      : ""
                                  }
                                  onChange={(e) => handleCheck(e)}
                                  checked={values["groups-view"]}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox2"
                                  name="groups-edit"
                                  value={
                                    permissions && permissions !== ""
                                      ? getValueId(
                                          permissions["groups-management"],
                                          "groups-edit"
                                        )
                                      : ""
                                  }
                                  onChange={(e) => handleCheck(e)}
                                  checked={values["groups-edit"]}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3  border-bottom align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7">
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
                                  {t(
                                    "admin.supplier_management.permission.order"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox2"
                                  name="order-edit"
                                  value={
                                    permissions && permissions !== ""
                                      ? getValueId(
                                          permissions["order-management"],
                                          "order-edit"
                                        )
                                      : ""
                                  }
                                  onChange={(e) => handleCheck(e)}
                                  checked={values["order-edit"]}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3  border-bottom align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7">
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
                                  {t(
                                    "admin.supplier_management.permission.inventory"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3  border-bottom align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7">
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
                                  {t(
                                    "admin.supplier_management.permission.product"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox2"
                                  name="product-edit"
                                  value={
                                    permissions && permissions !== ""
                                      ? getValueId(
                                          permissions["product-management"],
                                          "product-edit"
                                        )
                                      : ""
                                  }
                                  onChange={(e) => handleCheck(e)}
                                  checked={values["product-edit"]}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3  border-bottom align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7">
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
                                  {t(
                                    "admin.supplier_management.permission.role"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3  border-bottom align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7">
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
                                  {t(
                                    "admin.supplier_management.permission.user"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3  border-bottom align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7">
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
                                  {t(
                                    "admin.supplier_management.permission.retailers"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
                                </label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox2"
                                  disabled
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3  border-bottom align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7">
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
                                  {t(
                                    "admin.supplier_management.permission.reports"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row  mb-2 mb-lg-3 align-items-center justify-content-between">
                            <div class="col-lg-6 col-sm-7">
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
                                  {t(
                                    "admin.supplier_management.permission.dashboard"
                                  )}
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-sm-5 ps-4 ps-md-0 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
                                  {t(
                                    "admin.supplier_management.permission.view"
                                  )}
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  {t(
                                    "admin.supplier_management.permission.edit"
                                  )}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          <div className="row mt-4">
                            <div className="col text-center">
                              <button
                                type="button"
                                onClick={() => navigate(backpath)}
                                className="btn btn-outline-black me-3"
                              >
                                {t(
                                  "admin.supplier_management.permission.cancel_button"
                                )}
                              </button>
                              <button
                                type="button"
                                className="btn btn-purple"
                                onClick={(e) => handleSave(e)}
                              >
                                {t(
                                  "admin.supplier_management.permission.save_button"
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
            {/* [/Card] */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePermission;
