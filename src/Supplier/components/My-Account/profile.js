import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Multiselect from "multiselect-react-dropdown";
import dpImg from "../../assets/images/dp.png";
import editImg from "../../assets/images/edit-white.png";
import uploadImg from "../../assets/images/upload.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";

import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Profile = () => {
  const navigate = useNavigate();
  const { user_id } = useParams();
  const token = localStorage.getItem("supplier_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState("");
  const [distributorsList, setDistributorsList] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSaveLinks = () => {
    if (selectedValues.length < 1) {
      toast.error("No Distributor Selected", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let selectedId = [];

      for (let i = 0; i < selectedValues.length; i++) {
        selectedId.push(selectedValues[i].id);
      }

      const bodyData = {
        distributors: selectedId.toString(),
      };

      apis
        .post("supplier/link/distributors", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            setShow(false);
            toast.success("Links updated.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Could not udapte links. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
            toast.error("Could not udapte links. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        Projectlanguageid: 1,
      },
    };
    apis
      .get(`/supplier/getSupplierData`, config)
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

    apis
      .get("/getAllDistributors", config)
      .then((res) => {
        if (res.data.success === true) {
          setDistributorsList(res.data.data);
        } else {
          toast.error(
            "Could not fetch distributors list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error(
            "Could not fetch distributors list. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });

    apis
      .get(`/supplier/getLinkedDistributors`, config)
      .then((res) => {
        if (res.data.success === true) {
          setSelectedValues(res.data.data);
        } else {
          toast.error(
            "Could not fetch linked distributors. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error(
            "Could not fetch linked distributors. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });
  }, []);

  return (
    <div class="container-fluid page-wrap add-supplier">
      <div class="row height-inherit">
        <Sidebar
          showSidebar={showSidebar}
          updateSidebar={updateSidebar}
          userType={"supplier"}
        />

        <div class="col main p-0">
          <Header title="My Account" updateSidebar={updateSidebar} />
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
                                  <div className="w-100 text-center">
                                    <div class="align-items-center w-auto">
                                      <button
                                        type="button"
                                        onClick={() => setShow(true)}
                                        className="btn btn-purple"
                                      >
                                        Linked Distributors
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
                                  <p>Profile info.</p>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        `/supplier/my-account/${user_id}`
                                      )
                                    }
                                    className="btn btn-purple"
                                  >
                                    Edit
                                  </button>
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    First Name<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.first_name}
                                    placeholder="Enter first name"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Last Name<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.last_name}
                                    placeholder="Enter last name"
                                    disabled
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
                                    placeholder="Enter mail"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Mobile number<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={formData.phone_number}
                                    placeholder="Enter Mobile No."
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
                                  <p>General Information</p>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        `/supplier/supplier-edit-general-info/${user_id}`
                                      )
                                    }
                                    className="btn btn-purple"
                                  >
                                    Edit
                                  </button>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    Company Name<sup>*</sup>
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
                                    Website URL
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
                                    placeholder="Enter website URL"
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    Contact Name
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
                                    placeholder="Enter contact name"
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    Contact Email<sup>*</sup>
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
                                    placeholder="Enter contact email"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    Mobile Number<sup>*</sup>
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
                                    placeholder="Enter mobile no."
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">
                                    Alcohol Production<sup>*</sup>
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
                                      placeholder="Enter permit no."
                                      disabled
                                    />

                                    <div
                                      className="uploadBtn ms-3"
                                      style={{ display: "none" }}
                                    >
                                      <input type="file" id="upload" hidden />
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
                                  Show the business name on purchase orders
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
                                  <p>Billing Information</p>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    Order Number Prefix
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
                                  <label className="form-label">GST Tax</label>
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
                                    QST Tax Regsitration
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
                                  <p>Main Address</p>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        `/supplier/supplier-edit-address/${user_id}`
                                      )
                                    }
                                    className="btn btn-purple"
                                  >
                                    Edit
                                  </button>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    Address<sup>*</sup>
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
                                    Address 2
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
                                    City Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder="Enter city name"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    Postal Code
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value=""
                                    placeholder="Enter postal code"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">Country</label>
                                  <select className="form-select" disabled>
                                    <option value>Country 1</option>
                                    <option value>Country 2</option>
                                    <option value>Country 3</option>
                                    <option value>Country 4</option>
                                  </select>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">State</label>
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
                                  Billing Address
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">Company</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder="Enter order number"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">Address</label>
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
                                    Address 2
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
                                    City Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value=""
                                    placeholder="Enter city name"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">Country</label>
                                  <select className="form-select" disabled>
                                    <option value>Country 1</option>
                                    <option value>Country 2</option>
                                    <option value>Country 3</option>
                                    <option value>Country 4</option>
                                  </select>
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">State</label>
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
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p>Linked Distributors</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-12">
              <div className="card shadow-none img-card">
                <div className="card-body">
                  <form>
                    <div className="col-12 mb-sm-3 mb-2">
                      <label for="Warehouse-name" class="col-form-label">
                        Select Distributors to link
                      </label>
                      <Multiselect
                        options={distributorsList}
                        selectedValues={selectedValues} // Preselected value to persist in dropdown
                        onSelect={(e) => setSelectedValues(e)} // Function will trigger on select event
                        onRemove={(e) => setSelectedValues(e)} // Function will trigger on remove event
                        displayValue="full_name"
                        avoidHighlightFirstOption
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            class="btn btn-outline-black"
            data-bs-dismiss="modal"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-purple"
            onClick={() => handleSaveLinks()}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
