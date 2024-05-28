import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthInterceptor from "../../../utils/apis";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
toast.configure();

const ResetPass = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const url_email = urlParams.get("email");
  const url_code = urlParams.get("code");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [pass1, setPass1] = useState("");
  const [pass1Error, setPass1Error] = useState("");
  const [pass2, setPass2] = useState("");
  const [pass2Error, setPass2Error] = useState("");

  const handlePassSubmit = () => {
    if (pass1.length < 8 || pass2.length < 8) {
      if (pass1.length < 8) {
        setPass1Error("Password should be of atleast 8 characters");
      }

      if (pass2.length < 8) {
        setPass2Error("Password should be of atleast 8 characters");
      }
    } else if (pass1 !== pass2) {
      return toast.error("Passwords do not match.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const bodyData = {
        email: url_email,
        code: url_code,
        password: pass1,
        confirm_password: pass2,
      };

      apis
        .post("/resetPassword", bodyData)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePass2Change = (e) => {
    setPass2(e.target.value);
    setPass2Error("");
  };

  const handlePass1Change = (e) => {
    setPass1(e.target.value);
    setPass1Error("");
  };
  return (
    <>
      <div class="page-wrap">
        <div class="container-fluid p-2">
          <div class="row m-0 login-setup">
            <LoginLeftSidebar />

            <div class="col-sm-8 login-setup-right">
              <div class="form-box col col-sm-12 col-md-10 col-lg-8">
                <h3>Reset Password</h3>
                <p class="sub-head">Please enter your new password below</p>
                <hr />

                <form>
                  <div class="mb-5">
                    <label for="pass" class="form-label">
                      Password
                    </label>
                    <div className=" position-relative">
                      <input
                        type={show1 ? "text" : "password"}
                        class="form-control"
                        id="pass1"
                        placeholder="Enter new password"
                        value={pass1}
                        onChange={(e) => handlePass1Change(e)}
                      />
                      <span
                        className={
                          show1
                            ? "form-field-icon icon-toggle active"
                            : "form-field-icon icon-toggle"
                        }
                        onClick={() => setShow1(!show1)}
                      ></span>
                    </div>

                    {pass1Error !== "" ? (
                      <p className="error-label">{pass1Error}</p>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div class="mb-5 position-relative">
                    <label for="pass" class="form-label">
                      Confirm Password
                    </label>
                    <div className=" position-relative">
                      <input
                        type={show2 ? "text" : "password"}
                        class="form-control"
                        id="pass2"
                        placeholder="Confirm new password"
                        value={pass2}
                        onChange={(e) => handlePass2Change(e)}
                      />
                      <span
                        className={
                          show2
                            ? "form-field-icon icon-toggle active"
                            : "form-field-icon icon-toggle"
                        }
                        onClick={() => setShow2(!show2)}
                      ></span>
                    </div>

                    {pass2Error !== "" ? (
                      <p className="error-label">{pass2Error}</p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <button
                    type="button"
                    class="btn btn-purple"
                    onClick={() => handlePassSubmit()}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="modal fade" id="verifyEmailModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true" se>
                <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content p-3">
                    <div class="modal-header border-0">
                    <h5 class="modal-title">
                        
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        A link has been sent on your e-mail address. Please enter 
                        click on the link to reset your password
                    </div>
                </div>
                </div>
            </div> */}
    </>
  );
};

export default ResetPass;
