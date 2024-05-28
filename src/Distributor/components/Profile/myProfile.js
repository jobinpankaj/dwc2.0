import React, { useEffect, useState } from "react";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import ProfileImg from "../../assets/images/userDefault.png";
import ProfileIcon from "../../assets/images/profileIcon.png";
import logOut from "../../assets/images/logOut.png";

import useAuthInterceptor from "../../../utils/apis";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

const MyProfile = () => {
  const apis = useAuthInterceptor();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const formData = {};
  const { uploadImg } = formData;
  const [retailer, setRetailer] = useState({});
  const [retailerType, setRetailerType] = useState({});
  const [retailerProfile, setRetailerProfile] = useState({});
  const [mainAddress, setMainAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});
  const [billingAddress, setBillingAddress] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const retailer_accessToken = localStorage.getItem("distributor_accessToken");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    apis
      .get("getBusinessCategories")
      .then((res) => {
        console.log(res);
        setCategoryList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("distributor_accessToken");
    console.log(retailer_accessToken);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    apis
      .get("distributor/getDistributorInfo", config)
      .then((res) => {
        console.log(res);
        setRetailer(res.data.data);
        setRetailerType(res.data.data.user_type);
        if (res.data.data.user_profile !== null) {
          setRetailerProfile(res.data.data.user_profile);
        }
        if (res.data.data.user_main_address) {
          setMainAddress(res.data.data.user_main_address);
        }
        if (res.data.data.user_billing_address) {
          setBillingAddress(res.data.data.user_billing_address);
        }
        if (res.data.data.user_shipping_address) {
          setShippingAddress(res.data.data.user_shipping_address);
        }
        setLoading(false);
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error("Something went Wrong !! Please try again Later", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      }
      });
  }, []);
  const handleLogout = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${retailer_accessToken}`,
      },
    };

    apis
      .post("/logout", {}, config)
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Logout Successful", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          localStorage.removeItem("distributor_accessToken");
          navigate("/distributor/login");
        } else {
          toast.error("Could not logout.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          navigate("/distributor/dashboard");
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
        toast.error("Could not logout.", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/distributor/dashboard");
      }
      });
  };

  return (
    <div className="container-fluid page-wrap add-supplier">
      <div className="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div className="col main p-0">
          <Header
            title={t("distributor.profile.title")}
            updateSidebar={updateSidebar}
          />
          {loading ? (
            <div class="d-flex justify-content-center">
              <Oval
                height={80}
                width={80}
                color="purple"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="purple"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <div className="container-fluid page-content-box px-3 px-sm-4">
              <div className="row mb-2">
                <div className="col">
                  <form>
                    {/* [Card]  */}
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
                                          retailer.user_image === null
                                            ? ProfileImg
                                            : retailer.user_image
                                        }
                                        alt="Profile"
                                        className="dp-img rounded-circle"
                                      />
                                    </div>
                                  </div>
                                  <div className="text my-3">
                                    <h4
                                      className="mx-auto text-center"
                                      style={{
                                        fontSize: 16,
                                        fontWeight: 500,
                                        lineHeight: 1.12,
                                        color: "rgb(36,39,49)",
                                        fontFamily: "Ubuntu",
                                      }}
                                    >
                                      {retailer.full_name === null
                                        ? ""
                                        : retailer.full_name}
                                    </h4>
                                    <h6
                                      className="mx-auto text-center"
                                      style={{
                                        fontWeight: 400,
                                        fontSize: 14,
                                        lineHeight: "130%",
                                        color: "#595B60",
                                      }}
                                    >
                                      {retailer.email === null
                                        ? ""
                                        : retailer.email}
                                    </h6>
                                  </div>
                                  {/* <div className="d-flex flex-column">
                                    <a className='text-left'>My Profile</a>
                                    <hr className='my-2' />
                                    <a className='text-left' onClick={() => handleLogout()}>Logout</a>
                                  </div> */}
                                </div>
                              </div>
                              <div className="card-foter">
                                <div className="d-flex flex-column">
                                  <ul class="list-group list-group-flush font-medium ">
                                    <li class="list-group-item px-4 py-3">
                                      <a className="d-flex align-items-center">
                                        <img
                                          src={ProfileIcon}
                                          alt="Profile"
                                          className="me-3"
                                        />{" "}
                                        {t("distributor.profile.title")}
                                      </a>
                                    </li>
                                    <li class="list-group-item px-4 py-3">
                                      <a
                                        className="d-flex align-items-center"
                                        onClick={() => handleLogout()}
                                      >
                                        <img
                                          src={logOut}
                                          alt="Logout"
                                          className="me-3"
                                        />{" "}
                                        {t("distributor.header.logout")}
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-8">
                            <div className="card shadow-none img-card">
                              <div className="card-body">
                                <div className="row">
                                  <div className="form-head w-100 card-top-filter-box">
                                    <p>
                                      {t("distributor.profile.card_header")}
                                    </p>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(
                                          `/distributor/my-account/edit-profile/${retailer.id}`
                                        )
                                      }
                                      className="btn btn-purple"
                                    >
                                      {t("distributor.profile.edit")}
                                    </button>
                                  </div>
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                      {t("distributor.profile.first_name")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        retailer.first_name === null
                                          ? ""
                                          : retailer.first_name
                                      }
                                      placeholder={t(
                                        "distributor.profile.first_name"
                                      )}
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                      {t("distributor.profile.last_name")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        retailer.last_name === null
                                          ? ""
                                          : retailer.last_name
                                      }
                                      placeholder="N/A"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                      {t("distributor.profile.email")}
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      value={
                                        retailer.email === null
                                          ? ""
                                          : retailer.email
                                      }
                                      placeholder="N/A"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-6 mb-3">
                                    <label className="form-label">
                                      {t("distributor.profile.user_role")}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        retailerType.name === null
                                          ? ""
                                          : retailerType.name
                                      }
                                      placeholder="N/A"
                                      id="myInput"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 mb-3">
                                    <label className="form-label">
                                      {t("distributor.profile.mobile_number")}
                                    </label>
                                    <div className="position-relative">
                                      <input
                                        type={"number"}
                                        className="form-control"
                                        value={
                                          retailer.phone_number === null
                                            ? ""
                                            : retailer.phone_number
                                        }
                                        placeholder="N/A"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* <div className="row">
                {/* [Left Grid] 
                <div className="col-sm-6">
                  {/* [Card] 
                  <div className="card height-100">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-sm-12">
                            {/* [General Info] 
                            <div className="row mb-5">
                              <div className="col-12">
                                <div className="row">
                                  <div className="form-head w-100 card-top-filter-box">
                                    <p>General Information</p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(
                                          `/distributor/my-account/edit-company-profile`
                                        )
                                      }
                                      className="btn btn-purple"
                                    >
                                      Edit
                                    </button>
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      Business Name<sup>*</sup>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={retailerProfile.business_name === null ? "" : retailerProfile.business_name}
                                      placeholder="N/A"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      Group Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={retailerProfile.group_name === null ? "" : retailerProfile.group_name}
                                      disabled
                                      placeholder="N/A"

                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      Business Category
                                    </label>
                                    <select className="form-select" value={retailerProfile.business_category_id} disabled name="" id="">
                                      <option value="">Choose</option>
                                      {categoryList.map((c) => { return (<option key={c.id} value={c.id}>{c.name}</option>) })}
                                    </select>
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      Contact Email<sup>*</sup>
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      value={retailerProfile.contact_email === null ? "N/A" : retailerProfile.contact_email}
                                      placeholder="N/A"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">
                                      Public Mobile No.<sup>*</sup>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={retailerProfile.public_phone_number === null ? "N/A" : retailerProfile.public_phone_number}
                                      placeholder="N/A"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">
                                      Mobile No.<sup>*</sup>
                                    </label>
                                    <div className="w-100 d-flex">
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={retailerProfile.phone_number === null ? "N/A" : retailerProfile.phone_number}
                                        placeholder="N/A"
                                        disabled
                                      />

                                      <div
                                        className="uploadBtn ms-3"
                                        style={{ display: "none" }}
                                      >
                                        <input type="file" id="upload" hidden />
                                        <label htmlFor="upload">
                                          Choose file&nbsp;&nbsp;
                                          <img src={uploadImg} alt="Upload" />
                                        </label>
                                      </div>
                                    </div>
                                    {/* {permitError !== "" ? <p className="error-label">{permitError}</p> : <></>} 
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">
                                      Contact Name<sup>*</sup>
                                    </label>
                                    <div className="w-100 d-flex">
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={retailerProfile.contact_name === null ? "N/A" : retailerProfile.contact_name}
                                        placeholder="N/A"
                                        disabled
                                      />

                                      <div
                                        className="uploadBtn ms-3"
                                        style={{ display: "none" }}
                                      >
                                        <input type="file" id="upload" hidden />
                                        <label htmlFor="upload">
                                          Choose file&nbsp;&nbsp;
                                          <img src={uploadImg} />
                                        </label>
                                      </div>
                                    </div>
                                    {/* {permitError !== "" ? <p className="error-label">{permitError}</p> : <></>} 
                                  </div>

                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">
                                      Website URL<sup>*</sup>
                                    </label>
                                    <div className="w-100 d-flex">
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={retailerProfile.website_url === null ? "N/A" : retailerProfile.website_url}
                                        placeholder="N/A"
                                        disabled
                                      />

                                      <div
                                        className="uploadBtn ms-3"
                                        style={{ display: "none" }}
                                      >
                                        <input type="file" id="upload" hidden />
                                        <label htmlFor="upload">
                                          Choose file&nbsp;&nbsp;
                                          <img src={uploadImg} />
                                        </label>
                                      </div>
                                    </div>
                                    {/* {permitError !== "" ? <p className="error-label">{permitError}</p> : <></>} 
                                  </div>
                                  <div className="w-100 d-flex align-items-center">
                                    <input
                                      disabled
                                      type="checkbox"
                                      className="me-2"
                                      checked={
                                        retailerProfile.business_name_status ===
                                          "0"
                                          ? false
                                          : true
                                      }
                                    />
                                    Show the business name on purchase orders
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* [/General Info] 

                            {/* [Billing Info] 
                            <div className="row">
                              <div className="col-12">
                                <div className="row">
                                  <div className="form-head w-100">
                                    <p>Billing Information</p>
                                  </div>
                                  {/* <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      Order Number Prefix
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        formData.user_billing_address &&
                                        formData.user_billing_address
                                          .order_number_prefix
                                          ? formData.user_billing_address
                                              .order_number_prefix
                                          : "N/A"
                                      }
                                      disabled
                                      placeholder="Enter Order Number"
                                    />
                                  </div> 
                                  <div className="col-sm-6 col-xl-6 mb-3">
                                    <label className="form-label">GST Tax</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={billingAddress.gst_registration_number !== null || billingAddress.gst_registration_number !== "" ? billingAddress.gst_registration_number : "N/A"}
                                      disabled
                                      placeholder="Enter GST tax"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6 col-xl-6 mb-3">
                                    <label className="form-label">
                                      QST Tax Regsitration
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={billingAddress.qst_registration_number !== null || billingAddress.qst_registration_number !== "" ? billingAddress.qst_registration_number : "N/A"}
                                      disabled
                                      placeholder="Enter QST tax regsitration"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* [/Billing Info] 
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* [/Card] 
                </div>
                {/* [/Left Grid] 

                {/* [Right Grid] 
                <div className="col-sm-6">
                  {/* [Card] 
                  <div className="card height-100">
                    <div className="card-body">
                      <form>
                        <div className="row">
                          <div className="col-sm-12">
                            {/* [Main Address] *
                            <div className="row mb-5">
                              <div className="col-12">
                                <div className="row">
                                  <div className="form-head w-100 card-top-filter-box">
                                    <p>Main Address</p>
                                    <button type="button" onClick={() => navigate(`/distributor/my-account/edit-company-address`)} className="btn btn-purple">Edit</button>
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      Address<sup>*</sup>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={mainAddress.address_1 === null ? "N/A" : mainAddress.address_1}
                                      placeholder="Enter address"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      Address 2
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={mainAddress.address_2 === null ? "N/A" : mainAddress.address_2}
                                      placeholder="Enter address"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      City Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={mainAddress.city === null ? "N/A" : mainAddress.city}
                                      placeholder="Enter city name"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      Postal Code
                                    </label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={mainAddress.postal_code === null ? "N/A" : mainAddress.postal_code}
                                      placeholder="Enter postal code"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">Country</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={mainAddress.country === null ? "N/A" : mainAddress.country}
                                      placeholder="Enter postal code"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">State</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={mainAddress.state === null ? "N/A" : mainAddress.state}
                                      placeholder="Enter postal code"
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* [/Main Address] *

                            {/* [Billing Address] *
                            <div className="row">
                              <div className="col-12">
                                <div className="row">
                                  <div className="form-head w-100">
                                    Billing Address
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">Company</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={billingAddress.company_name === null ? "N/A" : billingAddress.company_name}
                                      placeholder="Enter order number"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">Address</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={billingAddress.address_1 === null ? "N/A" : billingAddress.address_1}
                                      placeholder="Enter address"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      Address 2
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={billingAddress.address_2 === null ? "N/A" : billingAddress.address_2}
                                      placeholder="Enter address"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3">
                                    <label className="form-label">
                                      City Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={billingAddress.city === null ? "N/A" : billingAddress.city}
                                      placeholder="Enter city name"
                                      disabled
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">Country</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={billingAddress.country === null ? "N/A" : billingAddress.country}
                                      placeholder="Enter city name"
                                      disabled
                                    />
                                  </div>
                                  <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                    <label className="form-label">State</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={billingAddress.state === null ? "N/A" : billingAddress.state}
                                      placeholder="Enter city name"
                                      disabled
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* [/Billing Address] *
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* [/Card] *
                </div>
                {/* [/Right Grid] *
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
