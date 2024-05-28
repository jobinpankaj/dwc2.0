import React, { useEffect, useState } from "react";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const SignupVerified = () => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const [emailVerified, setEmailVerified] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  console.log(searchParams.get("email"));
  const navigate = useNavigate();
  useEffect(() => {
    apis
      .get(`/emailVerified?email=${email}&token=${token}`)
      .then((res) => {
        if (res.data.success === true) {
          setEmailVerified(true);
        } else {
          setEmailVerified(false);
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        if (error.response.data.data.error === "User not found") {
          toast.error("User not found", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(error.response.data.data.error, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
      });
  }, [navigate, t, email, token]);
  if (emailVerified) {
    return (
      <>
        <div class="page-wrap">
          <div class="container-fluid p-2">
            <div class="row m-0 login-setup">
              <LoginLeftSidebar />
              <div class="col-sm-8 login-setup-right">
                <div class="form-box col col-sm-12 col-md-10 col-lg-8">
                  <h3>Email Verified</h3>
                  <p class="sub-head">
                    Your account has been verified successfully.{" "}
                  </p>
                  <hr />
                  <button
                    type="button"
                    class="btn btn-purple"
                    onClick={() => navigate("/retailer/login")}
                  >
                    Continue to Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div class="page-wrap">
          <div class="container-fluid p-2">
            <div class="row m-0 login-setup">
              <LoginLeftSidebar />
              <div class="col-sm-8 login-setup-right">
                <div class="form-box col col-sm-12 col-md-10 col-lg-8">
                  <h3 className="text-uppercase">
                    {"No User Found Please SignUp"}
                  </h3>

                  <hr />

                  <button
                    type="button"
                    class="btn btn-purple"
                    onClick={() => navigate("/retailer/")}
                  >
                    Continue to SignUp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SignupVerified;
