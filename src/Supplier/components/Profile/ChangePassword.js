import React, { useState } from "react";

import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import { useNavigate } from "react-router-dom";
import apis from "../../../CommonComponents/apis";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount(count + 1);
  };

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const token = localStorage.getItem("supplier_accessToken");
  const handleOldPass = (e) => {
    setOldPassword(e.target.value);
    setOldPasswordError("");
  };

  const handleNewPass = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  };

  const handleConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    incrementCount();
    if (count === 3) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      apis
        .post("/logout", {}, config)
        .then((res) => {
          if (res.data.success === true) {
            localStorage.removeItem("supplier_accessToken");
            toast.success(
              "You have tried multiple times. Please login again.",
              { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
            );
            localStorage.removeItem("supplier_accessToken");
            navigate("/supplier/login");
          } else {
            toast.error("Could not logout.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/supplier/dashboard");
          }
        })
        .catch((error) => {
          if(error.message !== "revoke"){
            toast.error("Could not logout.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/supplier/dashboard");
          }
        });
      return;
    }

    // Old Password validation
    if (!oldPassword) {
      setOldPasswordError("Old password is required.");
    }

    // New Password validation
    if (!newPassword) {
      setNewPasswordError("New password is required.");
    } else if (newPassword.length < 8) {
      setNewPasswordError("New password should be at least 8 characters long.");
    }

    // Confirm Password validation
    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
    } else if (confirmPassword.length < 8) {
      setConfirmPasswordError(
        "Confirm password should be at least 8 characters long."
      );
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
    }

    // If all validations pass, continue with form submission or other logic
    if (
      oldPassword &&
      newPassword &&
      confirmPassword &&
      newPassword.length >= 8 &&
      confirmPassword.length >= 8 &&
      newPassword === confirmPassword
    ) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const bodyData = {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      };
      apis
        .post("changePassword", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            toast.success(
              "Your password has been successfully. Please login again.",
              { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
            );
            localStorage.removeItem("supplier_accessToken");
            navigate("/supplier/login");
          } else {
            toast.success("Old Password does not match. Please try again", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          if(err.message !== "revoke"){
            if (err.response.status === 400) {
              toast.error(err.response.data.message, {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            } else {
              toast.error("Something went wrong. Please try again later.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }
          
        });
      // Reset the form values
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div class="container-fluid page-wrap add-supplier">
      <div class="row height-inherit">
        <Sidebar showSidebar={showSidebar} updateSidebar={updateSidebar} />

        <div class="col main p-0">
          <Header title="Change Password" updateSidebar={updateSidebar} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <div className="card">
                  <div className="card-body">
                    <div className="form-box col col-sm-12 col-xl-12">
                      <form>
                        <div className="row mb-3">
                          <div className="form-head w-100">Change Password</div>
                          <hr />
                          <div className="col-9 offset-lg-3">
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                  Old Password
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={oldPassword}
                                  onChange={(e) => handleOldPass(e)}
                                  placeholder="Enter Password"
                                />
                                {oldPasswordError !== "" ? (
                                  <p className="error-label m-0 p-0">
                                    {oldPasswordError}
                                  </p>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                  New Password
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={newPassword}
                                  onChange={(e) => handleNewPass(e)}
                                  placeholder="Enter new password"
                                />
                                {newPasswordError !== "" ? (
                                  <p className="error-label m-0 p-0">
                                    {newPasswordError}
                                  </p>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <label className="form-label">
                                  Confirm Password
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={confirmPassword}
                                  onChange={(e) => handleConfirmPass(e)}
                                  placeholder="Enter new password"
                                />
                                {confirmPasswordError !== "" ? (
                                  <p className="error-label m-0 p-0">
                                    {confirmPasswordError}
                                  </p>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-sm-6 mb-3">
                                <button
                                  className="btn btn-purple "
                                  onClick={(e) => handleSubmit(e)}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
