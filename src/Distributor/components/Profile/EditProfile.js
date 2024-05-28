import React, { useState, useEffect, useTransition } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import editImg from "../../assets/images/edit.svg";
import dpImg from "../../assets/images/userDefault.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthInterceptor from "../../../utils/apis";
import { useTranslation } from "react-i18next";

const EditProfile = () => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("distributor_accessToken");
  let mobileregex = /^\d{10}$/;
  const { id } = useParams();
  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [showSidebar, setShowSidebar] = useState(false);
  const [formData, setFormData] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass1Error, setPass1Error] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass2Error, setPass2Error] = useState("");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [pic, setPic] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [formPic, setFormPic] = useState("");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/distributor/my-account");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setMobileError("");
  };

  const handlePass1Change = (e) => {
    setPass1(e.target.value);
    setPass1Error("");
  };

  const handlePass2Change = (e) => {
    setPass2(e.target.value);
    setPass2Error("");
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError("");
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentImage(URL.createObjectURL(e.target.files[0]));
      setFormPic(e.target.files[0]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let pass1valid = true,
      pass2valid = true,
      emailvalid = true,
      mobilevalid = true,
      firstnamevalid = true,
      lastnamevalid = true;
    if (firstName === "" || firstName === null) {
      setFirstNameError(t("distributor.profile.first_name_required"));
      firstnamevalid = false;
    }

    if (lastName === "" || lastName === null) {
      setLastNameError(t("distributor.profile.last_name_required"));
      lastnamevalid = false;
    }

    if (pass1.length < 8 && pass1 !== "") {
      setPass1Error(t("distributor.profile.password_character"));
      pass1valid = false;
    }
    if (pass2.length < 8 && pass2 !== "") {
      setPass2Error(t("distributor.profile.password_character"));
      pass2valid = false;
    } else if (pass2 !== pass1 && pass2 !== "") {
      setPass2Error(t("distributor.profile.password_not_match"));
      pass2valid = false;
    } else if (pass1 !== "" && pass2 === "") {
      setPass2Error(t("distributor.profile.password_confirm"));
      pass2valid = false;
    }
    if (!emailregex.test(email)) {
      setEmailError(t("distributor.profile.not_a_valid_email"));
      emailvalid = false;
    }

    if (!mobileregex.test(mobile)) {
      setMobileError(t("distributor.profile.not_a_valid_phone_number"));
      mobilevalid = false;
    }
    if (
      firstNameError !== "" ||
      lastNameError !== "" ||
      emailError !== "" ||
      mobileError !== "" ||
      pass1Error !== "" ||
      pass2Error !== "" ||
      firstnamevalid === false ||
      lastnamevalid === false ||
      emailvalid === false ||
      pass1valid === false ||
      pass2valid === false ||
      mobilevalid === false
    ) {
      console.log("Validation Error");
    } else {
      if (
        formData.first_name !== firstName ||
        formData.last_name !== lastName ||
        formData.email !== email ||
        formData.phone_number !== mobile ||
        pass2 !== "" ||
        formPic !== ""
      ) {
        let formdata = new FormData();
        formdata.append("first_name", firstName);
        formdata.append("last_name", lastName);
        formdata.append("email", email);
        formdata.append("phone_number", mobile);
        formdata.append("status", "1");
        if (formPic !== "") {
          formdata.append("user_image", formPic);
        }
        if (pass2 !== "") {
          formdata.append("password", pass2);
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        apis
          .post(`distributor/editDistributorInfo`, formdata, config)
          .then((res) => {
            if (res.data.success === true) {
              toast.success("Your Profile has been updated successfully", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
              navigate(`/distributor/my-account`);
            } else {
              toast.error("Something went wrong. Please try again later.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          })
          .catch((error) => {
            if(error.message !== "revoke"){
            if (error.response.data.data) {
              if (error.response.data.data.email) {
                setEmailError(error.response.data.data.email[0]);
              }

              if (error.response.data.data.phone_number) {
                setMobileError(error.response.data.data.phone_number[0]);
              }

              if (error.response.data.data.first_name) {
                setFirstNameError(error.response.data.data.first_name[0]);
              }

              if (error.response.data.data.last_name) {
                setLastNameError(error.response.data.data.last_name[0]);
              }
            } else {
              toast.error("Something went wrong. Please try again later.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }
          });
      }
      // else {
      //   navigate(`/supplier-management/supplier-edit-general-info/${id}`)
      // }
    }
  };

  useEffect(() => {
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get("distributor/getDistributorInfo", config)
      .then((res) => {
        const retailer = res.data.data;
        setFirstName(retailer.first_name);
        setLastName(retailer.last_name);
        setEmail(retailer.email);
        setMobile(retailer.phone_number);
        setCurrentImage(retailer.user_image);

        console.log(retailer);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error("Something went Wrong !! Please try again Later", {
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
            title={t("distributor.profile.edit_distributor")}
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
                        <div className="col-sm-4 mb-4 mb-sm-0">
                          <div className="card shadow-none img-card h-100">
                            <div className="card-body d-flex justify-content-center align-items-center">
                              <div className="row">
                                <div className="col text-center d-flex flex-column justify-content-center align-items-center">
                                  <div className="dp-img mb-4 mx-auto position-relative rounded-circle d-inline-flex">
                                    <img
                                      src={
                                        currentImage === "" ||
                                        currentImage === null
                                          ? // pic : currentImage !== "" && (pic !== null || pic === null) ?
                                            dpImg
                                          : currentImage
                                      }
                                      className="dp-img rounded-circle"
                                    />
                                    <label
                                      htmlFor="profile_pic"
                                      className="editImg rounded-circle bg-purple"
                                      style={{ display: "block" }}
                                    >
                                      <img
                                        src={editImg}
                                        className="img-fluid"
                                      />
                                    </label>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      name=" profile_pic"
                                      id="profile_pic"
                                      style={{ display: "none" }}
                                      onChange={handleImageChange}
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
                                <div className="form-head w-100">
                                  {t("distributor.profile.card_header")}
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t("distributor.profile.first_name")}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    placeholder={t(
                                      "distributor.profile.fn_label"
                                    )}
                                    onChange={(e) => handleFirstNameChange(e)}
                                  />
                                  {firstNameError !== "" ? (
                                    <p className="error-label">
                                      {firstNameError}
                                    </p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t("distributor.profile.last_name")}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    placeholder={t(
                                      "distributor.profile.ln_label"
                                    )}
                                    onChange={(e) => handleLastNameChange(e)}
                                  />
                                  {lastNameError !== "" ? (
                                    <p className="error-label">
                                      {lastNameError}
                                    </p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t("distributor.profile.email")}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    placeholder={t(
                                      "distributor.profile.email_label"
                                    )}
                                    onChange={(e) => handleEmailChange(e)}
                                  />
                                  {emailError !== "" ? (
                                    <p className="error-label">{emailError}</p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t("distributor.profile.mobile_number")}
                                    <sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={mobile}
                                    placeholder={t(
                                      "distributor.profile.mobile_label"
                                    )}
                                    onChange={(e) => handleMobileChange(e)}
                                  />
                                  {mobileError !== "" ? (
                                    <p className="error-label">{mobileError}</p>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    {t("distributor.profile.create_pass")}
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      type={showPass1 ? "text" : "password"}
                                      className="form-control"
                                      value={pass1}
                                      onChange={(e) => handlePass1Change(e)}
                                      placeholder={t(
                                        "distributor.profile.pass1_label"
                                      )}
                                    />
                                    <span
                                      className={
                                        showPass1
                                          ? "form-field-icon icon-toggle active"
                                          : "form-field-icon icon-toggle"
                                      }
                                      onClick={() => setShowPass1(!showPass1)}
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
                                    {t("distributor.profile.confirm_pass")}
                                  </label>
                                  <div className="position-relative">
                                    <input
                                      type={showPass2 ? "text" : "password"}
                                      className="form-control"
                                      value={pass2}
                                      onChange={(e) => handlePass2Change(e)}
                                      placeholder={t(
                                        "distributor.profile.pass2_label"
                                      )}
                                    />
                                    <span
                                      className={
                                        showPass2
                                          ? "form-field-icon icon-toggle active"
                                          : "form-field-icon icon-toggle"
                                      }
                                      onClick={() => setShowPass2(!showPass2)}
                                    ></span>
                                  </div>

                                  {pass2Error !== "" ? (
                                    <p className="error-label">{pass2Error}</p>
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
                  {/* [/Card] */}
                  <div className="row mt-4">
                    <div className="col">
                      <button
                        className="btn btn-outline-black me-3"
                        onClick={(e) => handleCancel(e)}
                      >
                        {t("distributor.profile.cancel_button")}
                      </button>
                      <button
                        className="btn btn-purple"
                        onClick={(e) => handleSubmit(e)}
                      >
                        {t("distributor.profile.submit")}
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

export default EditProfile;
