import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
import { useTranslation } from "react-i18next";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { restoreStore } from "../../../redux/cartSlice";
toast.configure();

const Login = () => {
  const { t } = useTranslation();
  const { loading, setLoading } = useState(false);
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const check_temp = localStorage.getItem("verifyOtp");
  if (check_temp) {
    localStorage.removeItem("retailerOtp");
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
  const [twoFactor, setTwoFactor] = useState(false);
  const [disable, setDisable] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  console.log(rememberMe);
  const dispatch = useDispatch();

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
        usertype: "retailer",
      };
      if (rememberMe) {
        sessionStorage.setItem("retailer_email", email);
        sessionStorage.setItem("retailer_password", pass);
      }

      apis
        .post("/login", bodyData)
        .then((res) => {
          if (res.data.success === true) {
            localStorage.clear();
            setDisable(false);
            if (twoFactor) {
              navigate("/retailer/otp-verification");
              localStorage.setItem("retailer_tempToken", res.data.data.token);
              localStorage.setItem("retailerOtp", "true");
            } else {
              if (res.data.data.usertype === "retailer") {
                console.log("response", res.data.data.userProfile);
                if (res.data.data.userProfile === null) {
                  navigate("/retailer/complete-general-profile");
                  localStorage.setItem(
                    "retailer_accessToken",
                    res.data.data.token
                  );
                  localStorage.setItem(
                    "retailerImage",
                    res.data.data.user_image
                  );
                } else {
                  navigate("/retailer/dashboard");
                  localStorage.setItem(
                    "retailer_accessToken",
                    res.data.data.token
                  );
                  localStorage.setItem(
                    "retailerImage",
                    res.data.data.user_image
                  );
                  dispatch(restoreStore(res.data.data.cartListing));
                }
              }
            }
          } else {
            setDisable(false);
            toast.error(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
          setDisable(false);
          if (error.response.status === 400) {
            toast.error(error.response.data.data.error, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error(error.response.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        }
        });
    }
  };

  const handleForgot = () => {
    navigate("/retailer/forgot-password");
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
    const retailer_email = sessionStorage.getItem("retailer_email");
    if (retailer_email) {
      setEmail(retailer_email);
      setPass(sessionStorage.getItem("retailer_password"));
    }
  }, [navigate, token, next_path]);
  return (
    <div className="page-wrap">
      <div className="container-fluid p-2">
        <div className="row m-0 login-setup">
          <LoginLeftSidebar />
          <div className="col-sm-8 login-setup-right">
            <div className="form-box col col-sm-12 col-md-10 col-lg-8">
              <h3>{t("retailer.login.welcome")}</h3>
              <p className="sub-head">{t("retailer.login.login_p")}</p>
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
                <div className="row mb-1 mx-0">
                  <div className="form-check col checkOption">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      value={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      {t("retailer.login.remember_me")}
                    </label>
                  </div>
                  <div className="col forgot-pass-box text-end px-0">
                    <p className="custom-atag" onClick={() => handleForgot()}>
                      {t("retailer.login.forgot_password")}
                    </p>
                  </div>
                </div>
                <div className="col forgot-pass-box text-end px-0">
                  <p>
                    {t("retailer.login.dont_have_an_account")}{" "}
                    <a
                      className="custom-atag"
                      onClick={() => navigate("/retailer/sign-up")}
                    >
                      {t("retailer.login.signup")}
                    </a>
                  </p>
                </div>
                <div className="form-check form-switch mb-3 enable_2_fa">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="enableSwitch"
                    onChange={(e) => setTwoFactor(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="enableSwitch">
                    {t("retailer.login.enable_2fa")}
                  </label>
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
                    disabled={disable}
                    className="btn btn-purple"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {t("retailer.login.submit")}
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

export default Login;
