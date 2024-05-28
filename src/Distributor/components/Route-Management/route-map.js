import React, { useEffect, useState } from "react";
import MapImg from "../../assets/images/route-map.png";
import "../../../CommonComponents/map.css";
import Sidebar from "../../../CommonComponents/Sidebar/sidebar";
import Header from "../../../CommonComponents/Header/header";
import MapContainer from "../../../CommonComponents/Map";
import WaypointMap from "../../../CommonComponents/WayPointMap";
import MultipleMap from "../../../CommonComponents/RetailerMultipleAddress";

import "../../assets/scss/dashboard.scss";
import { toast } from "react-toastify";
import useAuthInterceptor from "../../../utils/apis";

const RouteMap = (props) => {
  const apis = useAuthInterceptor();
  const [showSidebar, setShowSidebar] = useState(false);
  const token = localStorage.getItem("distributor_accessToken");
  const [startLat, setStartLat] = useState("");
  const [routeName, setRouteName] = useState("");
  const [endLat, setEndLat] = useState("");
  const [startLong, setStartLong] = useState("");
  const [endLong, setEndLong] = useState("");
  const [userData, setUserData] = useState([]);
  const [waypoints, setWaypoint] = useState([]);
  const [color, setColor] = useState("");
  const query = new URLSearchParams(window.location.search);
  const route_id = query.get("id");
  console.log(route_id, "Route");
  const updateSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  console.log(props.loading, "props");
  const origin = { lat: parseFloat(startLat), lng: parseFloat(startLong) }; // New York, NY
  // const waypoints = [
  //     { lat: 28.539864, lng: 77.3383307 }, // Chicago, IL
  //     { lat: 26.539864, lng: 76.3383307 }, // Los Angeles, CA
  // ];
  const destination = { lat: parseFloat(endLat), lng: parseFloat(endLong) };
  console.log(waypoints, origin);
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        permission: "routes-view",
      },
    };
    apis
      .get(`distributor/routes/${route_id}`, config)
      .then((res) => {
        if (res.data.success) {
          const route = res.data.data;
          setRouteName(route.name);
          setEndLat(route.end_latitude);
          setEndLong(route.end_longitude);
          setStartLat(route.start_latitude);
          setStartLong(route.start_longitude);
          setUserData(route.route_users);
          setColor(route.colour);
        } else {
          toast.error(res.data.data.message, {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        if(err.message !== "revoke"){
        toast.error(err.response.data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      });
  }, []);

  useEffect(() => {
    let waypoints = [];

    if (userData.length > 0) {
      waypoints = userData.map((user) => ({
        lat: user?.user_main_address?.latitude,
        lng: user?.user_main_address?.longitude,
      }));
      console.log(waypoints);
      setWaypoint(waypoints);
    }
  }, [userData]);

  return (
    <div class="container-fluid page-wrap route-manage">
      <div class="row height-inherit">
        <Sidebar userType={"distributor"} />

        <div class="col main p-0">
          <Header title="Route Map" updateSidebar={updateSidebar} />
          <div class="container-fluid page-content-box px-3 px-sm-4">
            <div class="row">
              <div class="col">
                {/* [Card] */}
                <div className="card user-card height-100">
                  <div className="card-body p-0">
                    <div className="row">
                      <div className="col">
                        <div className="card-top-filter-box p-3">
                          <h6>{routeName}</h6>
                          {/* [Table Search] */}
                          {/* <div className="search-table">
                                                        <div className="form-group">
                                                            <input type="text" className="search-input" placeholder="Search Here..."></input>
                                                        </div>
                                                    </div> */}
                          {/* [/Table Search] */}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="mapBox px-3">
                          {/* <img className="img-fluid " src={MapImg} alt="" /> */}
                          {/* <WaypointMap origin={origin} waypoints={waypoints} /> */}
                          {/* <WaypointMap
                                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY"
                                                        loadingElement={<div style={{ height: `100%` }} />}
                                                    /> */}
                          <MultipleMap
                            userInformation={userData}
                            color={color}
                          />
                        </div>
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

export default RouteMap;
