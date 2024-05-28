import React, { useState } from "react";
import emailsent from "../../assets/images/emai-sent.svg";
import logo from "../../assets/images/logo.svg";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import useAuthInterceptor from "../../../utils/apis";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
import { Oval } from "react-loader-spinner";
import { Modal } from "react-bootstrap";
toast.configure();
const ForgotPassword = () => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const onSubmit = () => {
    if (email !== "") {
      let emailValid = true;
      if (!emailregex.test(email)) {
        setEmailError("Not a valid E-mail");
        emailValid = false;
      }

      if (emailValid === false || emailError !== "") {
        console.log("Validation Error.");
      } else {
        setLoading(true);
        const bodyData = {
          email: email,
        };
        apis
          .post("/forgotPassword", bodyData)
          .then((res) => {
            setDisable(false);
            if (res.data.success === true) {
              setShow(true);
            } else {
              toast.error("User not found", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            if(error.message !== "revoke"){
            setDisable(false);
            toast.error("Something went wrong. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            setLoading(false);
          }
          });
      }
    } else {
      setEmailError("Email is required");
    }
  };
  return (
    <>
      <div class="page-wrap">
        <div class="container-fluid p-2">
          <div class="row m-0 login-setup">
            <LoginLeftSidebar />

            <div class="col-sm-8 login-setup-right">
              <div class="form-box col col-sm-12 col-md-10 col-lg-8">
                <h3>Password Assistance</h3>
                <p class="sub-head">Forgot your password?</p>
                <hr />

                <form>
                  <div class="mb-5">
                    <label for="email" class="form-label">
                      Email Address
                    </label>
                    <div className="position-relative">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Enter your mail ID"
                        value={email}
                        onChange={(e) => handleEmailChange(e)}
                      />
                      <span class="form-field-icon">
                        <svg
                          class="form-abs-img"
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
                  {loading ? (
                    <Oval
                      color="purple"
                      secondaryColor="purple"
                      height={40}
                      width={40}
                    />
                  ) : (
                    <button
                      type="button"
                      class="btn btn-purple"
                      onClick={() => onSubmit()}
                      disabled={disable}
                    >
                      Submit
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="modal fade"
        show={show}
        centered
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={emailsent} alt="" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A link has been sent on your e-mail address. Please click on the link
          to reset your password
        </Modal.Body>
      </Modal>

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

export default ForgotPassword;
