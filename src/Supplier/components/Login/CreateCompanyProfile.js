import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthInterceptor from "../../../utils/apis";
import "../../assets/scss/login.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginLeftSidebar from "../../../CommonComponents/LoginLeftSidebar/LoginLeftSidebar";
toast.configure();

const CreateCompanyProfile = () => {
  const apis = useAuthInterceptor();
  const numberRegEx = /^[0-9]*$/;
  const [showSidebar, setShowSidebar] = useState(false);
  const [business, setbusiness] = useState("");
  const [businessError, setBusinessError] = useState("");
  const [permitNo, setPermitNo] = useState("");
  const [permitError, setPermitError] = useState("");
  const [distributionBucketStatus, setDistributionBucketStatus] = useState("0");
  const [haveProductStatus, setHaveProductStatus] = useState("0");
  const [sellAndCollectStatus, setSellAndCollectStatus] = useState("0");
  const [produceProductStatus, setProduceProductStatus] = useState("0");
  const [alchohalProduction, setAlchohalProduction] = useState(0);
  const [hectoError, setHectoError] = useState("");
  const [permitImage, setpermitImage] = useState("");
  const [onp, setOnp] = useState("");
  const [gst, setGst] = useState("");
  const [qst, setQst] = useState("");
  const [showBusinessName, setShowBusinessName] = useState("0");
  const [website, setWebsite] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const [urlError, setUrlError] = useState("");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  let emailregex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileregex = /^[0-9]*$/;
  const navigate = useNavigate();
  const token = localStorage.getItem("supplier_accessToken");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get("supplier/getSupplierData", config)
      .then((res) => {
        const supplier = res.data.data.user_profile;
        const supplierBilling = res.data.data.user_billing_address;

        if (supplier !== null) {
          if (supplier.company_name === null) {
            setbusiness("");
          } else {
            setbusiness(supplier.company_name);
          }
          setWebsite(supplier.website_url);
          setContactName(supplier.contact_name);
          setEmail(supplier.contact_email);
          setMobile(supplier.phone_number);
          setPermitNo(supplier.alcohol_production_permit);
          setAlchohalProduction(supplier.alcohol_production_limit);
          setShowBusinessName(supplier.business_name_status);
          setDistributionBucketStatus(supplier.distribution_bucket_status);
          setHaveProductStatus(supplier.have_product_status);
          setSellAndCollectStatus(supplier.agency_sell_and_collect_status);
          setProduceProductStatus(supplier.produce_product_status);
          setpermitImage(supplier.alcohol_production_permit_image);
        }

        if (supplierBilling) {
          setOnp(supplierBilling.order_number_prefix);
          setGst(supplierBilling.gst_registration_number);
          setQst(supplierBilling.qst_registration_number);
        }
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

  const handleBusiness = (e) => {
    setbusiness(e.target.value);
    setBusinessError("");
  };
  const handleWebsite = (e) => {
    setWebsite(e.target.value);
    setUrlError("");
  };
  const handleContactName = (e) => {
    setContactName(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
    setPhoneError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleShowBusinessName = (e) => {
    if (e.target.checked === true) {
      setShowBusinessName("1");
    } else {
      setShowBusinessName("0");
    }
  };

  const handleAlcoholProductionChange = (e) => {
    if (numberRegEx.test(e.target.value) || e.target.value === "") {
      setAlchohalProduction(e.target.value);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    let businessValid = true,
      emailValid = true,
      phoneValid = true,
      alcoholValid = true;
    if (business === "") {
      setBusinessError("Company name is required.");
      businessValid = false;
    }
    if (!emailregex.test(email) && email !== "") {
      setEmailError("Enter Valid Email.");
      emailValid = false;
    }
    // if (!mobileregex.test(mobile) && mobile !== "") {
    //   setPhoneError("Enter valid phone number.");
    //   phoneValid = false;
    // }
    // if (parseInt(alchohalProduction) > 20000) {
    //   setHectoError("Alcohol production limit can not be greater than 20000.");
    //   alcoholValid = false;
    // }

    if (
      !businessValid ||
      !alcoholValid ||
      !emailValid ||
      !phoneValid ||
      urlError !== "" ||
      businessError !== ""
    ) {
      console.log("Validation Error");
    } else {
      const bodyData = {
        company_name: business,
        contact_email: email,
        phone_number: mobile,
        contact_name: contactName,
        website_url: website,
        business_name_status: String(showBusinessName),
        alcohol_production_permit: permitNo,
        alcohol_production_limit: alchohalProduction,
        distribution_bucket_status: distributionBucketStatus,
        have_product_status: haveProductStatus,
        agency_sell_and_collect_status: sellAndCollectStatus,
        produce_product_status: produceProductStatus,
        alcohol_production_permit_image: permitImage,
        order_number_prefix: onp,
        gst_registration_number: gst,
        qst_registration_number: qst,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      apis
        .post("supplier/saveSupplierProfile", bodyData, config)
        .then((res) => {
          if (res.data.success === true) {
            toast.success("Profile details has been updated successfully!", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/supplier/complete-main-address");
          } else {
            toast.error(res.data.message, {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          if(err.message !== "revoke"){
            if (err.response.data.data.company_name) {
              setBusinessError(err.response.data.data.company_name[0])
            }
            if (err.response.data.data.alcohol_production_permit) {
              setPermitError(err.response.data.data.alcohol_production_permit[0]);
            }
          }
        });
    }
  };

  return (
    <div className="page-wrap">
      <div className="container-fluid p-2">
        <div className="row m-0 login-setup">
          <LoginLeftSidebar />
          <div class="col-sm-12 col-lg-8 login-setup-right create-company-profile">
            <div className="form-box col col-sm-12 col-xl-10">
              <h3>Welcome! Create Profile </h3>
              <p className="sub-head">General Information</p>
              <hr />
              <form>
                {/* [General Info] */}
                <div className="row mb-3">
                  <div className="col-xl-12 col-12">
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Company Name<sup>*</sup>
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          value={business}
                          onChange={(e) => handleBusiness(e)}
                          placeholder="Enter company name"
                        />
                        {businessError !== "" ? (
                          <p className="error-label m-0 p-0">{businessError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Website URL (Example : http://www.yourdomain.com)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={website}
                          onChange={(e) => handleWebsite(e)}
                          placeholder="Enter website URL"
                        />
                        {urlError !== "" ? (
                          <p className="error-label m-0 p-0">{urlError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">Contact Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={contactName}
                          onChange={(e) => handleContactName(e)}
                          placeholder="Enter contact name"
                        />
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => handleEmail(e)}
                          placeholder="Enter contact email"
                        />
                        {emailError !== "" ? (
                          <p className="error-label m-0 p-0">{emailError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={mobile}
                          onChange={(e) => handleMobile(e)}
                          placeholder="Enter mobile no."
                        />
                        {phoneError !== "" ? (
                          <p className="error-label m-0 p-0">{phoneError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Alcohol Production Permit
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={permitNo}
                          onChange={(e) => setPermitNo(e.target.value)}
                          placeholder="Enter alcohol production permit"
                        />
                        {permitError !== "" ? (
                          <p className="error-label m-0 p-0">{permitError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="col-sm-6 mb-3">
                        <label className="form-label">
                          Alcohol Production Limit (In Hectolitres)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={alchohalProduction}
                          onChange={(e) => handleAlcoholProductionChange(e)}
                          placeholder="Enter alcohol production limit"
                        />
                        {hectoError !== "" ? (
                          <p className="error-label m-0 p-0">{hectoError}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col-sm-12 mb-3 d-flex align-items-start">
                        <input
                          type="checkbox"
                          checked={showBusinessName === "1" ? true : false}
                          onChange={(e) => handleShowBusinessName(e)}
                          className="me-2 mt-1"
                        />
                        <p className="m-0">
                          Show the business name on purchase orders
                        </p>
                      </div>
                      <div className="col-sm-12 mb-3 d-flex align-items-start">
                        <input
                          type="checkbox"
                          checked={
                            distributionBucketStatus === "1" ? true : false
                          }
                          onChange={(e) =>
                            setDistributionBucketStatus(
                              e.target.checked ? "1" : "0"
                            )
                          }
                          className="me-2 mt-1"
                        />
                        <p className="m-0">
                          We produce our product in our facility but it is
                          distributed by Distribution Bucket
                        </p>
                      </div>
                      <div className="col-sm-12 mb-3 d-flex align-items-start">
                        <input
                          type="checkbox"
                          checked={haveProductStatus === "1" ? true : false}
                          onChange={(e) =>
                            setHaveProductStatus(e.target.checked ? "1" : "0")
                          }
                          className="me-2 mt-1"
                        />
                        <p className="m-0">
                          We have a product but we do NOT produce in our own
                          facility
                        </p>
                      </div>
                      <div className="col-sm-12 mb-3 d-flex align-items-start">
                        <input
                          type="checkbox"
                          checked={sellAndCollectStatus === "1" ? true : false}
                          onChange={(e) =>
                            setSellAndCollectStatus(
                              e.target.checked ? "1" : "0"
                            )
                          }
                          className="me-2 mt-1"
                        />
                        <p className="m-0">
                          We are an agency and we sell and collect payments on
                          behalf of other suppliers
                        </p>
                      </div>
                      <div className="col-sm-12 mb-3 d-flex align-items-start">
                        <input
                          type="checkbox"
                          checked={produceProductStatus === "1" ? true : false}
                          onChange={(e) =>
                            setProduceProductStatus(
                              e.target.checked ? "1" : "0"
                            )
                          }
                          className="me-2 mt-1"
                        />
                        <p className="m-0">
                          We produce our product in our facility but we
                          authorize Buvons Local Pro to distribute and collect
                          naments on our hehalf
                        </p>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="form-head w-100">Billing Information</div>
                    </div>
                    <div className="w-100 mb-3">
                      <div className="row mb-4">
                        <div className="col-sm-6 mb-3">
                          <label className="form-label">
                            Order Number Prefix
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={onp}
                            onChange={(e) => setOnp(e.target.value)}
                            placeholder="Enter mobile no."
                          />
                        </div>
                        <div className="col-sm-6 mb-3">
                          <label className="form-label">
                            GST Tax Registration No
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={gst}
                            onChange={(e) => setGst(e.target.value)}
                            placeholder="Enter mobile no."
                          />
                        </div>
                        <div className="col-sm-6 mb-3">
                          <label className="form-label">
                            QST Tax Registration number
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={qst}
                            onChange={(e) => setQst(e.target.value)}
                            placeholder="Enter mobile no."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/General Info] */}
                <button
                  className="btn btn-outline-black me-2"
                  onClick={() => navigate("/supplier/my-account")}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-purple"
                  onClick={(e) => handleNext(e)}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyProfile;
