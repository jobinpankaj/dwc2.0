import React, { useState, useEffect } from "react";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useParams, useNavigate } from "react-router-dom";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";

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

const ManagePermission = () => {
  const navigate = useNavigate();
  const apis = useAuthInterceptor();
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
          navigate("/distributor-management");
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
            title={"Manage Distributor Permissions"}
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            {/* [Card] */}
            <div className="card height-100">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-12 col-xl-7 mx-auto my-5">
                    <div className="card shadow-none img-card">
                      <div className="card-body">
                        <form>
                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
                              <div class="form-check form-check-inline">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  id="inlineCheckbox1"
                                  name="delivery-user-view"
                                  value={
                                    permissions && permissions !== ""
                                      ? getValueId(
                                          permissions[
                                            "delivery-user-management"
                                          ],
                                          "delivery-user-view"
                                        )
                                      : ""
                                  }
                                  onChange={(e) => handleCheck(e)}
                                  checked={values["delivery-user-view"]}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
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
                                          permissions[
                                            "delivery-user-management"
                                          ],
                                          "delivery-user-edit"
                                        )
                                      : ""
                                  }
                                  onChange={(e) => handleCheck(e)}
                                  checked={values["delivery-user-edit"]}
                                />
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}

                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}
                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
                                  Edit
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* [/Row] */}
                          {/* [Row] */}
                          <div class="row g-3 align-items-center justify-content-between">
                            <div class="col-6">
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
                            <div class="col-6 text-end">
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox1"
                                >
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
                                <label
                                  class="form-check-label"
                                  for="inlineCheckbox2"
                                >
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
                                onClick={() =>
                                  navigate("/distributor-management")
                                }
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
