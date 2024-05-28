import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import emailIcon from "../../assets/images/emaiIcon.png";
import addressIcon from "../../assets/images/addressIcon.png";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import uploadImg from "../../assets/images/upload.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";

const RetailerDetails = () => {
  const apis = useAuthInterceptor();
  const token = localStorage.getItem("supplier_accessToken");
  const { user_id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");
  const [mapsrc, setMapSrc] = useState("");
  const [business, setBusiness] = useState("");
  const [group, setGroup] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessCategoryList, setBusinessCategoryList] = useState("");
  const [businessCat, setBusinessCat] = useState("");
  const [publicPhone, setPublicPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [website, setWebsite] = useState("");
  const [opc, setOpc] = useState("");
  const [hc, setHc] = useState("");

  const navigate = useNavigate();
  const formData = {};
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "retailer-view",
      },
    };
    apis
      .get(`/supplier/retailerList/${user_id}`, config)
      .then((res) => {
        if (res.data.success === true) {
          setEmail(res.data.data.email);
          if (res.data.data.user_main_address) {
            setAddress(res.data.data.user_main_address.address_1);
            let mapsource;
            if (res.data.data.user_main_address.place_id) {
              mapsource = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY&q=place_id:${res.data.data.user_main_address.place_id}`;
            }
            setMapSrc(mapsource);

            if (res.data.data.user_main_address.address_2) {
              setAddress2(res.data.data.user_main_address.address_2);
            }

            if (res.data.data.user_main_address.city) {
              setCity(res.data.data.user_main_address.city);
            }

            if (res.data.data.user_main_address.state) {
              setState(res.data.data.user_main_address.state);
            }

            if (res.data.data.user_main_address.country) {
              setCountry(res.data.data.user_main_address.country);
            }

            if (res.data.data.user_main_address.postal_code) {
              setPostal(res.data.data.user_main_address.postal_code);
            }
          }

          if (res.data.data.user_profile) {
            if (res.data.data.user_profile.business_name) {
              setBusiness(res.data.data.user_profile.business_name);
            }

            if (res.data.data.user_profile.group_name) {
              setGroup(res.data.data.user_profile.group_name);
            }

            if (res.data.data.user_profile.business_category_id) {
              setBusinessCat(res.data.data.user_profile.business_category_id);
            }

            if (res.data.data.user_profile.contact_email) {
              setContactEmail(res.data.data.user_profile.contact_email);
            }

            if (res.data.data.user_profile.public_phone_number) {
              setPublicPhone(res.data.data.user_profile.public_phone_number);
            }

            if (res.data.data.user_profile.phone_number) {
              setPhone(res.data.data.user_profile.phone_number);
            }

            if (res.data.data.user_profile.contact_name) {
              setContactName(res.data.data.user_profile.contact_name);
            }

            if (res.data.data.user_profile.website_url) {
              setWebsite(res.data.data.user_profile.website_url);
            }

            if (res.data.data.user_profile.opc_status) {
              setOpc(res.data.data.user_profile.opc_status);
            }

            if (res.data.data.user_profile.home_consumption) {
              setHc(res.data.data.user_profile.home_consumption);
            }
          }
        } else {
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error("Something went wrong. Please try again later.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });

    apis
      .get("/getBusinessCategories", config)
      .then((res) => {
        if (res.data.success === true) {
          setBusinessCategoryList(res.data.data);
        } else {
          toast.error(
            "Could not fetch Business Category List. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      })
      .catch((error) => {
        if(error.message !== "revoke"){
          toast.error(
            "Could not fetch Business Category List. Please try again later.",
            { autoClose: 3000, position: toast.POSITION.TOP_CENTER }
          );
        }
      });
  }, []);
  return (
    <div class="container-fluid page-wrap product-manage">
      <div class="row height-inherit">
        <Sidebar userType={"supplier"} />

        <div class="col main p-0">
          <Header title="Retailer Detail" updateSidebar={updateSidebar} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div className="row mb-3">
              <div className="col-12">
                {/* [Card] */}
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-5 mb-4 mb-sm-0">
                        <div className="card height-100 shadow-none">
                          <div className="card-body">
                            <ul class="list-group list-group-flush">
                              <li class="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                                <div class="ms-2 me-auto">
                                  <div class="fw-bold">Contact email</div>
                                  <div className="d-flex align-items-start">
                                    <span className="icon-wrap me-2">
                                      <img src={emailIcon} />
                                    </span>
                                    <p>{email}</p>
                                  </div>
                                </div>
                              </li>
                              <li class="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                                <div class="ms-2 me-auto">
                                  <div class="fw-bold">Consumption</div>
                                  On Site
                                </div>
                              </li>
                              <li class="list-group-item d-flex justify-content-between align-items-start border-0 px-0">
                                <div class="ms-2 me-auto">
                                  <div class="fw-bold">Address</div>
                                  <div className="d-flex align-items-start">
                                    <span className="icon-wrap me-2">
                                      <img src={addressIcon} />
                                    </span>
                                    {address !== "" && address
                                      ? address
                                      : "N/A"}
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      {address !== "" && address ? (
                        <div className="col-sm-7">
                          <div className="mapBox card p-3 h-100">
                            <iframe
                              src={mapsrc}
                              width="100%"
                              height="100%"
                              allowfullscreen=""
                              loading="lazy"
                              referrerpolicy="no-referrer-when-downgrade"
                            ></iframe>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
            </div>

            <div class="row">
              {/* [Left Grid] */}
              <div class="col-sm-6">
                {/* [Card] */}
                <div className="card height-100">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          {/* [General Info] */}
                          <div className="row mb-5">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100 card-top-filter-box">
                                  <p>General Information</p>
                                  {/* <button
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        `/retailer-management/edit-retailer-address/${user_id}`
                                      )
                                    }
                                    className="btn btn-purple"
                                  >
                                    Edit
                                  </button> */}
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    Business Name<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={business !== "" ? business : "N/A"}
                                    placeholder="Enter Business name"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Group Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter group name"
                                    value={group !== "" ? group : "N/A"}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Business Category
                                  </label>
                                  <select
                                    className="form-select"
                                    value={businessCat}
                                    disabled
                                    onChange={(e) =>
                                      setBusinessCat(e.target.value)
                                    }
                                  >
                                    <option value="">
                                      No Business Category Selected
                                    </option>
                                    {businessCategoryList &&
                                      businessCategoryList.map((ele) => {
                                        return (
                                          <option key={ele.id} value={ele.id}>
                                            {ele.name}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Contact E-Mail
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter group name"
                                    value={
                                      contactEmail !== "" ? contactEmail : "N/A"
                                    }
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Public Phone Number
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter group name"
                                    value={
                                      publicPhone !== "" ? publicPhone : "N/A"
                                    }
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Phone Number
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter group name"
                                    value={phone !== "" ? phone : "N/A"}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Contact Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter group name"
                                    value={
                                      contactName !== "" ? contactName : "N/A"
                                    }
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-6 mb-3">
                                  <label className="form-label">
                                    Website URL (Example :
                                    http://www.abc.com)
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter group name"
                                    value={website !== "" ? website : "N/A"}
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 mb-3">
                                  <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={opc == "1" ? true : false}
                                  />
                                  CSP

                                </div>
                                <div className="col-sm-6 mb-3">
                                  <input
                                    type="checkbox"
                                    className="me-2"
                                    checked={hc == "1" ? true : false}
                                  />
                                  Consommation à domicile (CAD)
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/General Info] */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
              {/* [/Left Grid] */}

              {/* [Right Grid] */}
              <div className="col-sm-6">
                {/* [Card] */}
                <div className="card height-100">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-sm-12">
                          {/* [Main Address] */}
                          <div className="row mb-5">
                            <div className="col-12">
                              <div className="row">
                                <div className="form-head w-100 card-top-filter-box">
                                  <p>Main Address</p>
                                  {/* <button
                                    type="button"
                                    onClick={() =>
                                      navigate(
                                        `/retailer-management/edit-retailer-address/${user_id}`
                                      )
                                    }
                                    className="btn btn-purple"
                                  >
                                    Edit
                                  </button> */}
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    Address<sup>*</sup>
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={address !== "" ? address : "N/A"}
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
                                    value={address2 !== "" ? address2 : "N/A"}
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
                                    value={city !== "" ? city : "N/A"}
                                    placeholder="Enter city name"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">State</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={state !== "" ? state : "N/A"}
                                    placeholder="Enter postal code"
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-xl-6 mb-3">
                                  <label className="form-label">
                                    Postal Code
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={postal !== "" ? postal : "N/A"}
                                    placeholder="Enter postal code"
                                    disabled
                                  />
                                </div>
                                <div className="col-sm-12 col-xl-6 mb-3 position-relative">
                                  <label className="form-label">Country</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    value={country !== "" ? country : "N/A"}
                                    placeholder="Enter postal code"
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* [/Main Address] */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
              {/* [/Right Grid] */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerDetails;
