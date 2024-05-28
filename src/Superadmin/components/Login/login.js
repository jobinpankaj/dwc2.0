import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../../assets/scss/login.scss";
import { toast } from "react-toastify";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Login = () => {
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const check_temp = localStorage.getItem("verifyOtp");
  if (check_temp) {
    localStorage.removeItem("verifyOtp");
    localStorage.removeItem("tempToken");
  }

  const navigate = useNavigate();
  const location = useLocation();

  let next_path;
  if (location.state) {
    next_path = location.state.url;
  } else {
    next_path = "/dashboard";
  }

  const token = localStorage.getItem("admin_accessToken");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let emailValid = true,
      passValid = true;
    if (!emailregex.test(email)) {
      if (email === "") {
        setEmailError("E-mail is required.");
      } else {
        setEmailError("Not a valid E-Mail.");
      }
      emailValid = false;
    }

    if (pass === "") {
      setPassError("Password is required.");
      passValid = false;
    } else if (pass.length < 8) {
      setPassError("Password should be of atleast 8 characters.");
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
      const bodyData = {
        email: email,
        password: pass,
        usertype: "Superadmin",
      };
      apis
        .post("/login", bodyData)
        .then((res) => {
          localStorage.clear();
          if (res.data.success === true) {
            if (twoFactor) {
              navigate("/otp-verification");
              localStorage.setItem("tempToken", res.data.data.token);
              localStorage.setItem("verifyOtp", "true");
            } else {
              navigate("/dashboard");
              localStorage.setItem("admin_accessToken", res.data.data.token);
            }
          } else {
            toast.error(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((error) => {
          console.log(error);
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
        });
    }
  };

  const handleForgot = () => {
    navigate("/forgot-password");
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
  }, []);
  return (
    <div className="page-wrap">
      <div className="container-fluid p-2">
        <div className="row m-0 login-setup">
          <LoginLeftSidebar />
          <div className="col-sm-8 login-setup-right">
            <div className="form-box col col-sm-12 col-md-10 col-lg-8">
              <h3>Welcome</h3>
              <p className="sub-head">
                Please enter your credentials to sign in
              </p>
              <hr />
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email ID
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your e-mail ID"
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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="position-relative">
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
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
                <div className="row mb-5 mx-0">
                  <div className="form-check col checkOption">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <div className="col forgot-pass-box text-end px-0">
                    <p className="custom-atag" onClick={() => handleForgot()}>
                      Forgot your password?
                    </p>
                  </div>
                </div>
                <div
                  className="form-check form-switch mb-3 enable_2_fa"
                  style={{ display: "none" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="enableSwitch"
                    onChange={(e) => setTwoFactor(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="enableSwitch">
                    Enable 2FA
                  </label>
                </div>
                <button
                  className="btn btn-purple"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
