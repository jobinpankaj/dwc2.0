import React, { useState } from "react";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import "../../assets/scss/dashboard.scss";
import useAuthInterceptor from "../../../utils/apis";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByPlaceId, getLatLng } from "react-places-autocomplete";

const RouteDetails = () => {
  const apis = useAuthInterceptor();
  const [routeName, setRouteName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [driverName, setDrivername] = useState("");
  const [truckDetails, setTruckDetails] = useState("");
  const [status, setStatus] = useState("0");
  const [noOfItems, setNoOfItems] = useState(0);
  const [routeNameError, setRouteNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [endAddressError, setEndAddressError] = useState("");
  const [startAddressError, setStartAddressError] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [startAddress, setStartAddress] = useState("");
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [startLat, setStartLat] = useState("");
  const [endLat, setEndLat] = useState("");
  const [startLong, setStartLong] = useState("");
  const [endLong, setEndLong] = useState("");
  const [startPlaceId, setStartPlaceId] = useState("");
  const [endPlaceId, setEndPlaceId] = useState("");
  const [descriptionfr, setDescriptionfr] = useState("");
  const [messagefr, setMessagefr] = useState("");
  const [descriptionErrorfr, setDescriptionErrorfr] = useState("");
  const [messageErrorfr, setMessageErrorfr] = useState("");
  const [driverNameError, setDriverNameError] = useState("");
  const [startError, setStartError] = useState("");
  const [endError, setEndError] = useState("");
  const [color, setColor] = useState("blue");

  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = localStorage.getItem("distributor_accessToken");

  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleRouteName = (e) => {
    setRouteName(e.target.value);
    setRouteNameError("");
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    setDescriptionError("");
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
    setMessageError("");
  };
  const handleDescriptionfr = (e) => {
    setDescriptionfr(e.target.value);
    setDescriptionErrorfr("");
  };
  const handleMessagefr = (e) => {
    setMessagefr(e.target.value);
    setMessageErrorfr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (routeName === "") {
      setRouteNameError(t("distributor.routes_management.route_name_is_required"));

      isValid = false;
    }
    if (routeName.length > 99) {
      setRouteNameError("Route name should be less than 100 character.");
      isValid = false;
    }
    if (driverName.length > 99) {
      setDriverNameError("Driver name should be less than 100 character.");
      isValid = false;
    }

    if (description === "") {
      setDescriptionError(t("distributor.routes_management.description_is_required"));
      isValid = false;
    } else if (description.length > 500) {
      setDescriptionError("Description should be less than 500 characters.");
      isValid = false;
    }
    if (descriptionfr === "") {
      setDescriptionErrorfr(t("distributor.routes_management.description_is_required"));
      isValid = false;
    } else if (descriptionfr.length > 500) {
      setDescriptionErrorfr("Description should be less than 500 characters.");
      isValid = false;
    }
    if (message === "") {
      setMessageError(t("distributor.routes_management.message_is_required"));
      isValid = false;
    } else if (message.length > 500) {
      setMessageError("Message should be less than 500 characters.");
      isValid = false;
    }
    if (messagefr === "") {
      setMessageErrorfr(t("distributor.routes_management.message_is_required"));
      isValid = false;
    } else if (messagefr.length > 500) {
      setMessageErrorfr("Message should be less than 500 characters.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "routes-edit",
      },
    };

    const bodyData = {
      name: routeName,
      route_description: [
        {
          language_id: 1,
          description: description,
          message: message,
        },
        {
          language_id: 2,
          description: descriptionfr,
          message: messagefr,
        },
      ],
      driver_name: driverName,
      truck_details: truckDetails,
      start_address: startInput,
      end_address: endInput,
      start_latitude: startLat,
      end_latitude: endLat,
      start_longitude: startLong,
      end_longitude: endLong,
      minimum_per_delivery_status: status,
      minimun_number_of_items: 0,
      colour: color,
    };

    console.log(bodyData);

    apis
      .post("distributor/routes/add", bodyData, config)
      .then((res) => {
        if (res.data.success) {
          toast.success("Route details have been saved successfully.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
          navigate("/distributor/route-management");
        } else {
          toast.error(res.data.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        if (err.response.data.data.name) {
          toast.error("The route name has already been taken.", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (err.response.data.data.driver_name) {
          toast.error(err.response.data.data.driver_name[0], {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(err.response.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          setLoading(false);
        }

        setLoading(false);
      }
      });
  };

  const handleStartAddressChange = (e) => {
    setStartAddressError("");
    setStartAddress(e);
    setStartInput(e.label);
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        setStartPlaceId(res[0].place_id);

        getLatLng(res[0])
          .then((res) => {
            setStartLat(res.lat);
            setStartLong(res.lng);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };
  const handleendAddressChange = (e) => {
    setEndAddressError("");
    setEndAddress(e);
    setEndInput(e.label);
    geocodeByPlaceId(e.value.place_id)
      .then((res) => {
        setEndPlaceId(res[0].place_id);

        getLatLng(res[0])
          .then((res) => {
            setEndLat(res.lat);
            setEndLong(res.lng);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div class="container-fluid page-wrap route-manage">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header
            title={t("distributor.routes_management.create_route")}
            updateSidebar={updateSidebar}
          />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col-12 mb-3">
                {/* [Card] One */}
                <div className="card user-card height-100">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-sm-12 col-12">
                        <form>
                          <div className="mb-3 row">
                            <div className="col-lg-6">
                              <label className="form-label">
                                {t("distributor.routes_management.route_name")}
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={routeName}
                                onChange={(e) => handleRouteName(e)}
                                placeholder="Enter Route Name"
                              />
                              {routeNameError !== "" ? (
                                <p className="error-label">{routeNameError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-lg-6 ">
                              <label className="form-label">{t("distributor.routes_management.route_color")}</label>
                              <select
                                className="form-select"
                                onChange={(e) => setColor(e.target.value)}
                              >
                                <option selected value="blue">
                                  Blue
                                </option>
                                <option value="red">Red</option>
                              </select>
                            </div>
                          </div>

                          <div className=" row mb-3">
                            <div className="col-lg-6">
                              <div className="d-flex align-items-center justify-content-between">
                                <label className="form-label">
                                  {t(
                                    "distributor.routes_management.description"
                                  )}
                                  *({t(
                                    "distributor.routes_management.english"
                                  )})
                                </label>
                              </div>
                              <textarea
                                className="form-control"
                                onChange={(e) => handleDescription(e)}
                                value={description}
                              ></textarea>
                              <p class="msg">
                                {t(
                                  "distributor.routes_management.discription_p"
                                )}
                              </p>
                              {descriptionError !== "" ? (
                                <p className="error-label">
                                  {descriptionError}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="d-flex align-items-center justify-content-between">
                                <label className="form-label">
                                  {t(
                                    "distributor.routes_management.description"
                                  )}
                                  *({t(
                                    "distributor.routes_management.french"
                                  )})
                                </label>
                              </div>
                              <textarea
                                className="form-control"
                                onChange={(e) => handleDescriptionfr(e)}
                                value={descriptionfr}
                              ></textarea>
                              <p class="msg">
                                {t(
                                  "distributor.routes_management.discription_p"
                                )}
                              </p>
                              {descriptionErrorfr !== "" ? (
                                <p className="error-label">
                                  {descriptionErrorfr}
                                </p>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-lg-6">
                              <div className="d-flex align-items-center justify-content-between">
                                <label className="form-label">
                                  {t("distributor.routes_management.message")}
                                  *({t(
                                    "distributor.routes_management.english"
                                  )})
                                </label>
                              </div>
                              <textarea
                                className="form-control"
                                onChange={(e) => handleMessage(e)}
                                value={message}
                              ></textarea>
                              <p class="msg">
                                {t("distributor.routes_management.message_p")}
                              </p>
                              {messageError !== "" ? (
                                <p className="error-label">{messageError}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                            <div className="col-lg-6">
                              <div className="d-flex align-items-center justify-content-between">
                                <label className="form-label">
                                  {t("distributor.routes_management.message")}
                                  *({t(
                                    "distributor.routes_management.french"
                                  )})
                                </label>
                              </div>
                              <textarea
                                className="form-control"
                                onChange={(e) => handleMessagefr(e)}
                                value={messagefr}
                              ></textarea>
                              <p class="msg">
                                {t("distributor.routes_management.message_p")}
                              </p>
                              {messageErrorfr !== "" ? (
                                <p className="error-label">{messageErrorfr}</p>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>

                          <div class="d-flex">
                            {loading ? (
                              <Oval
                                color="purple"
                                secondaryColor="purple"
                                width={40}
                                height={40}
                              />
                            ) : (
                              <button
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                                class="btn btn-purple width-auto me-2"
                              >
                                {t("distributor.routes_management.save")}
                              </button>
                            )}
                            <button
                              type="reset"
                              onClick={() =>
                                navigate("/distributor/route-management")
                              }
                              class="btn btn-outline-black width-auto"
                            >
                              {t("distributor.routes_management.cancel")}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* [/Card] */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetails;
