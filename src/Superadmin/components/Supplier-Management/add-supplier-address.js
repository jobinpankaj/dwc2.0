import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useTranslation } from "react-i18next";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { toast } from "react-toastify";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const AddSupplierAddress = () => {
  const apis = useAuthInterceptor();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user_id } = useParams();
  const token = localStorage.getItem("admin_accessToken");
  const [showSidebar, setShowSidebar] = useState(false);
  const [mainInput, setMainInput] = useState("");
  const [mainAddress, setMainAddress] = useState("");
  const [mainAddressError, setMainAddressError] = useState("");
  const [mainAddress2, setMainAddress2] = useState("");
  const [mainCity, setMainCity] = useState("");
  const [mainState, setMainState] = useState("");
  const [mainPostal, setMainPostal] = useState("");
  const [mainCountry, setMainCountry] = useState("");
  const [mainPlaceId, setMainPlaceId] = useState("");
  const [mainLat, setMainLat] = useState("");
  const [mainLong, setMainLong] = useState("");
  const [billingInput, setBillingInput] = useState("");
  const [billingPlaceId, setBillingPlaceId] = useState("");
  const [billingCompany, setBillingCompany] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingAddress2, setBillingAddress2] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingLat, setBillingLat] = useState("");
  const [billingLong, setBillingLong] = useState("");
  const [sameAddress, setSameAddress] = useState(false);

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleMainAddressChange = (e) => {
    setMainAddress(e);
    setMainInput(e.label);
    setMainAddressError("");
    setMainCity("");
    setMainPostal("");
    setMainState("");
    setMainCountry("");
    setMainAddress2("");
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        setMainPlaceId(res[0].place_id);
        for (let i = 0; i < res[0].address_components.length; i++) {
          let target_area = res[0].address_components[i].types[0];
          let target_name = res[0].address_components[i].long_name;

          if (target_area == "locality") {
            setMainCity(target_name);
          } else if (target_area == "route") {
            setMainAddress2(target_name);
          } else if (target_area == "postal_code") {
            setMainPostal(target_name);
          } else if (target_area == "administrative_area_level_1") {
            setMainState(target_name);
          } else if (target_area == "country") {
            setMainCountry(target_name);
          }
        }

        getLatLng(res[0])
          .then((res) => {
            setMainLat(res.lat);
            setMainLong(res.lng);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };

  const handleBillingAddressChange = (e) => {
    setBillingAddress(e);
    setBillingInput(e.label);
    setBillingCity("");
    setBillingState("");
    setBillingCountry("");
    setBillingAddress2("");
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        setBillingPlaceId(res[0].place_id);
        for (let i = 0; i < res[0].address_components.length; i++) {
          let target_area = res[0].address_components[i].types[0];
          let target_name = res[0].address_components[i].long_name;

          if (target_area == "locality") {
            setBillingCity(target_name);
          } else if (target_area == "route") {
            setBillingAddress2(target_name);
          } else if (target_area == "administrative_area_level_1") {
            setBillingState(target_name);
          } else if (target_area == "country") {
            setBillingCountry(target_name);
          }
        }

        getLatLng(res[0])
          .then((res) => {
            setBillingLat(res.lat);
            setBillingLong(res.lng);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };

  const handleSave = (e) => {
    e.preventDefault();
    let addressValid = true;

    // if (mainAddress === "") {
    //   setMainAddressError("Address is required.")
    //   addressValid = false
    // }

    if (!addressValid) {
      console.log("Validation Error");
    } else {
      const bodyData = {
        main_address: mainInput,
        main_address_2: mainAddress2,
        main_city: mainCity,
        main_state: mainState,
        main_postal_code: mainPostal,
        main_country: mainCountry,
        main_latitude: mainLat,
        main_longitude: mainLong,
        place_id: mainPlaceId,
        user_id: user_id,
        billing_company_name: billingCompany,
        billing_address: billingInput,
        billing_latitude: billingLat,
        billing_longitude: billingLong,
        billing_address_2: billingAddress2,
        billing_city: billingCity,
        billing_state: billingState,
        billing_country: billingCountry,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          permission: "supplier-edit",
        },
      };

      if (mainAddress !== "" || billingAddress !== "") {
        apis
          .post("/addSupplierAddress", bodyData, config)
          .then((res) => {
            if (res.data.success === true) {
              toast.success("Address Information Added.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
              navigate(`/supplier-management/manage-permission/${user_id}`);
            } else {
              toast.error("Something went wrong. Please try again later.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
              });
            }
          })
          .catch((error) => {
            toast.error("Something went wrong. Please try again later.", {
              autoClose: 3000,
              position: toast.POSITION.TOP_CENTER,
            });
          });
      } else {
        navigate(`/supplier-management/manage-permission/${user_id}`);
      }
    }
  };

  const handleSameAddress = (e) => {
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      // setShow(false);
      setBillingInput(mainInput);

      setBillingAddress(mainAddress);
      setBillingAddress2(mainAddress2);
      setBillingCity(mainCity);
      // setBillingPostal(mainPostal);
      setBillingCountry(mainCountry);
      setBillingState(mainState);
    } else {
      // setShow(true)
      // setShow(false);
      setBillingInput("");

      setBillingAddress("");
      setBillingAddress2("");
      setBillingCity("");
      // setBillingPostal(mainPostal);
      setBillingCountry("");
      setBillingState("");
    }
  };

  return (
    <div class="container-fluid page-wrap add-supplier-info">
      <div class="row height-inherit">
        <Sidebar userType={"admin"} />

        <div class="col main p-0">
          <Header
            title={t("admin.supplier_management.add_third.title")}
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                <form>
                  {/* [Card] */}
                  <div className="card height-100">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="card shadow-none img-card">
                            <div className="card-body">
                              {/* [Main Address] */}
                              <div className="row mb-5">
                                <div className="col-xl-9 col-12">
                                  <div className="row">
                                    <div className="form-head w-100">
                                      {t(
                                        "admin.supplier_management.add_third.card_header_1"
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.address"
                                        )}
                                      </label>
                                      <GooglePlacesAutocomplete
                                        apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                        selectProps={{
                                          value: mainAddress,
                                          onChange: (e) =>
                                            handleMainAddressChange(e),
                                        }}
                                      />
                                      {mainAddressError !== "" ? (
                                        <p className="error-label">
                                          {mainAddressError}
                                        </p>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.address_2"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={mainAddress2}
                                        placeholder={t(
                                          "admin.supplier_management.add_third.address_2_ph"
                                        )}
                                        onChange={(e) =>
                                          setMainAddress2(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.city"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={mainCity}
                                        placeholder={t(
                                          "admin.supplier_management.add_third.city_ph"
                                        )}
                                        onChange={(e) =>
                                          setMainCity(e.target.value)
                                        }
                                      />
                                    </div>

                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.state"
                                        )}
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        value={mainState}
                                        onChange={(e) =>
                                          setMainState(e.target.value)
                                        }
                                        placeholder={t(
                                          "admin.supplier_management.add_third.state_ph"
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.postal"
                                        )}
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        value={mainPostal}
                                        onChange={(e) =>
                                          setMainPostal(e.target.value)
                                        }
                                        placeholder={t(
                                          "admin.supplier_management.add_third.postal_ph"
                                        )}
                                      />
                                    </div>

                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.country"
                                        )}
                                      </label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        value={mainCountry}
                                        onChange={(e) =>
                                          setMainCountry(e.target.value)
                                        }
                                        placeholder={t(
                                          "admin.supplier_management.add_third.country_ph"
                                        )}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* [/General Info] */}

                              {/* [Billing Address] */}
                              <div className="row">
                                <div className="col-xl-9 col-12">
                                  <div className="row">
                                    <div className="form-head w-100">
                                      {t(
                                        "admin.supplier_management.add_third.card_header_2"
                                      )}
                                    </div>
                                    <div className="w-100 d-flex align-items-start mb-3">
                                      <input
                                        type="checkbox"
                                        className="me-2 mt-1"
                                        value={sameAddress}
                                        onChange={(e) => handleSameAddress(e)}
                                      />
                                      <p className="m-0">
                                        {t(
                                          "admin.supplier_management.add_third.same_as"
                                        )}
                                      </p>
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.company"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={billingCompany}
                                        onChange={(e) =>
                                          setBillingCompany(e.target.value)
                                        }
                                        placeholder={t(
                                          "admin.supplier_management.add_third.company_ph"
                                        )}
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.address"
                                        )}
                                      </label>
                                      <GooglePlacesAutocomplete
                                        apiKey="AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                        selectProps={{
                                          value: billingAddress,
                                          onChange: (e) =>
                                            handleBillingAddressChange(e),
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.address_2"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={billingAddress2}
                                        placeholder={t(
                                          "admin.supplier_management.add_third.address_2_ph"
                                        )}
                                        onChange={(e) =>
                                          setBillingAddress2(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.city"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={billingCity}
                                        placeholder={t(
                                          "admin.supplier_management.add_third.city_ph"
                                        )}
                                        onChange={(e) =>
                                          setBillingCity(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.state"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={billingState}
                                        placeholder={t(
                                          "admin.supplier_management.add_third.state_ph"
                                        )}
                                        onChange={(e) =>
                                          setBillingState(e.target.value)
                                        }
                                      />
                                    </div>
                                    <div className="col-sm-6 mb-3 position-relative">
                                      <label className="form-label">
                                        {t(
                                          "admin.supplier_management.add_third.country"
                                        )}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={billingCountry}
                                        placeholder={t(
                                          "admin.supplier_management.add_third.country_ph"
                                        )}
                                        onChange={(e) =>
                                          setBillingCountry(e.target.value)
                                        }
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
                  </div>
                  {/* [/Card] */}
                  <div className="row mt-4">
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-outline-black me-3"
                        onClick={() => navigate("/supplier-management")}
                      >
                        {t("admin.supplier_management.add_third.cancel_button")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-purple"
                        onClick={(e) => handleSave(e)}
                      >
                        {t("admin.supplier_management.add_third.next_button")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplierAddress;
