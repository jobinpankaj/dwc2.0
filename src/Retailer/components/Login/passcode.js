import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import OtpField from "react-otp-field";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
import { useTranslation } from "react-i18next";
import { Oval } from "react-loader-spinner";
toast.configure();

const PassCode = () => {
  const apis = useAuthInterceptor();
  const { t } = useTranslation();
  const accessToken = localStorage.getItem("retailer_tempToken");
  const otp_required = localStorage.getItem("retailerOtp");
  const navigate = useNavigate();
  const [qrResult, setQrResult] = useState("");
  const [hashCode, setHashCode] = useState("");
  const [value, setValue] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleOtpSubmit = () => {
    setLoading(true);
    const config = {
      params: {
        otp: value,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    apis
      .get("/validateOtp", config)
      .then((res) => {
        if (res.data.success === true) {
          setLoading(false);
          localStorage.removeItem("retailer_tempToken");
          localStorage.removeItem("retailerOtp");
          localStorage.setItem("retailer_accessToken", accessToken);
          localStorage.setItem("retailerImage", res.data.data.user_image);
          navigate("/retailer/dashboard");
        } else {
          toast.error(res.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });

          setLoading(false);
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error(error.response.data.data.error, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }
      });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/retailer");
    } else if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      apis
        .get(`/getQrCodeImage`, config)
        .then((res) => {
          const qr_image = atob(res.data.data.qrcode_image);
          setQrResult(qr_image);
          setHashCode(res.data.data.secret);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (value.length === 6) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [value]);
  return (
    <div className="page-wrap">
      <div className="container-fluid p-2">
        <div className="row m-0 login-setup">
          <LoginLeftSidebar />
          <div className="col-sm-8 login-setup-right">
            <div className="form-box col col-sm-12 col-md-10 col-lg-8">
              {qrResult !== "" && <h3>Scan QR code</h3>}
              {qrResult !== "" && (
                <p className="sub-head">
                  Please scan the below QR code using
                  <span className="highlight-purple">
                    Google Authenticator App
                  </span>
                </p>
              )}
              <hr />

              {qrResult !== "" && (
                <div id="qr-holder">
                  <div dangerouslySetInnerHTML={{ __html: qrResult }} />
                </div>
              )}
              {qrResult !== "" && (
                <p>
                  Or enter the secret code :{" "}
                  <span className="highlight-purple">{hashCode}</span>
                </p>
              )}

              <h3>Enter Passcode</h3>
              {/* <p className="sub-head">We sent a verification code to <span className="highlight-purple">abc@gmail.com</span></p> */}
              <hr />
              <form>
                <div className="row mt-4 mb-3 mx-0">
                  <OtpField
                    value={value}
                    onChange={setValue}
                    numInputs={6}
                    onChangeRegex={/^([0-9]{0,})$/}
                    autoFocus
                    separator={<span>-</span>}
                    isTypeNumber
                    inputProps={{
                      className: "form-control",
                      type: "text",
                      disabled: false,
                    }}
                  />
                </div>
                <div className="row mb-5">
                  {/* <div className="col resendOtp">
                                    Didn't Receive OTP? 
                                    <a href="forgot-password.html">Resend</a>
                                </div> */}
                </div>
                {loading ? (
                  <Oval color="purple" height={40} width={40} />
                ) : (
                  <button
                    type="button"
                    className="btn btn-purple"
                    disabled={disable}
                    onClick={() => handleOtpSubmit()}
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
  );
};

export default PassCode;
