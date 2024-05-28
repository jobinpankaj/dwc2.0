import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
import { useTranslation } from "react-i18next";
import { Oval } from "react-loader-spinner";
toast.configure();

const Signup = () => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const check_temp = localStorage.getItem("retailerOtp");
  if (check_temp) {
    localStorage.removeItem("verifyOtp");
    localStorage.removeItem("retailer_tempToken");
  }

  const navigate = useNavigate();
  const location = useLocation();

  let next_path;
  if (location.state) {
    next_path = location.state.url;
  } else {
    next_path = "/retailer/dashboard";
  }

  const token = localStorage.getItem("retailer_accessToken");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let emailValid = true,
      passValid = true;
    if (!emailregex.test(email)) {
      if (email === "") {
        setEmailError(t("retailer.login.email_required"));
      } else {
        setEmailError(t("retailer.login.not_valid_email"));
      }
      emailValid = false;
    }

    if (pass === "") {
      setPassError(t("retailer.login.password_required"));
      passValid = false;
    } else if (pass.length < 8) {
      setPassError(t("retailer.login.password_character_error"));
      passValid = false;
    }

    if (
      emailValid === false ||
      passValid === false ||
      emailError !== "" ||
      passError !== ""
    ) {
      console.log("Validation Error");
    } else {
      setDisable(true);
      const bodyData = {
        email: email,
        password: pass,
        user_type: "retailer",
      };

      const headers = {
        Projectlanguageid: 1,
      };
      apis
        .post("/registerRetailer", bodyData, headers)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(`An email has been sent on your mail ${email}`, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/retailer/login");
          } else {
            toast.error("Email is not valid", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
          setDisable(false);
        })
        .catch((error) => {
          if(error.message !== "revoke"){
          if (error.response.data.data.email) {
            toast.error("The email has already been taken.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("Please enter valid email.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
          setDisable(false);
        }
          console.log(error);
        });
    }
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
    setPassError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  useEffect(() => {
    if (token) {
      navigate(next_path);
    }
  }, [token, navigate, next_path]);
  return (
    <div className="page-wrap">
      <div className="container-fluid p-1">
        <div className="row m-0 login-setup">
          <LoginLeftSidebar />
          <div className="col-sm-8 col-md-6 login-setup-right">
            <div className="form-box col col-sm-12 col-md-10 col-lg-8">
              <h3>{t("retailer.login.welcome")}</h3>
              <p className="sub-head">{t("retailer.login.signup_p")}</p>
              <hr />
              <form>
                <div className="mb-3 position-relative">
                  <label htmlFor="email" className="form-label">
                    {t("retailer.login.email_address")}
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder={t("retailer.login.mail_placeholder")}
                      value={email}
                      onChange={(e) => handleEmailChange(e)}
                    />
                    <span className="form-field-icon">
                      <svg
                        className="form-abs-img"
                        width="20"
                        height="16"
                        viewBox="0 0 20 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 7L2 2H18ZM18 14H2V4L10 9L18 4V14Z" />
                      </svg>
                    </span>
                  </div>
                  {emailError !== "" ? (
                    <p className="error-label">{emailError}</p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label">
                    {t("retailer.login.password")}
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder={t("retailer.login.password_placeholder")}
                      value={pass}
                      onChange={(e) => handlePassChange(e)}
                    />
                    <span
                      className={
                        showPass
                          ? "form-field-icon icon-toggle active"
                          : "form-field-icon icon-toggle"
                      }
                      onClick={() => setShowPass(!showPass)}
                    ></span>
                  </div>
                  {passError !== "" ? (
                    <p className="error-label">{passError}</p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="row mb-2 mx-0">
                  <div className="col forgot-pass-box text-end px-0">
                    <p>
                      {t("retailer.login.already_account")}&nbsp;
                      <span
                        className="custom-atag"
                        onClick={() => navigate("/retailer/login")}
                      >
                        {t("retailer.login.login")}
                      </span>
                    </p>
                  </div>
                </div>
                {disable ? (
                  <Oval
                    color="purple"
                    secondaryColor="purple"
                    height={40}
                    width={40}
                  />
                ) : (
                  <button
                    className="btn btn-purple"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {t("retailer.login.signup")}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
