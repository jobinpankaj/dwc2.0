import React, { memo, useEffect, useRef, useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Oval } from "react-loader-spinner";
import ReactDOM from 'react-dom';

const mapStyles = {
  width: "100%",
  height: "500px",
  position: "relative",
};

const MapContainer = ({ google, userInformation,setSupplierId1,showModal }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);
  console.log(userInformation,"userInformation")
  
// console.log(setSupplierId1,showModal, "setSupplierId,showModal")
  useEffect(() => {
    setLoading(false);
    // Fetch latitudes and longitudes from userInformation data list
    const fetchedMarkers =
    (
      userInformation.map((user) => {
      return(
        {
          lat:
            parseFloat(
              user?.user_main_address?.latitude
            ) || 0,
          lng:
            parseFloat(
              user?.user_main_address?.longitude
            ) || 0,
          id: user?.id,
          status: user?.supplier_data?.length < 1 ? "4" : user?.supplier_data?.status,
          
        }
        )})) ||
      [];
    setMarkers(fetchedMarkers);
    setLoading(false);
  }, [userInformation]);

  const handleMarkerClick = (user) => {
    setSelectedUser(user);
  };

  const handleInfoWindowClose = () => {
    setSelectedUser(null);
  };
const openModal = (e,id)=>{
  e.preventDefault()
  showModal(true);
  setSupplierId1(id)
}
function onInfoWindowOpen(id, e) {
  const button = (<button class="btn btn-purple" onClick={e => openModal(e,id)}>Send Request</button>);
  ReactDOM.render(React.Children.only(button), document.getElementById("iwc"));
}

  const generateMarkerColor = (status) => {
    switch (status) {
      case "0":
        return "red";
      case "1":
        return "green";
      case "2":
        return "orange"; //pending
      default:
        return "purple";
    }
  };

  console.log('markers',markers);
  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Oval color="purple" secondaryColor="purple" />
        </div>
      ) : (
        <Map
          className="map-fix"
          google={google}
          zoom={2}
          style={mapStyles}
          initialCenter={
            markers.length > 0 && {
              lat: 56.7204076,                     //56.7204076,-128.1897812
              lng: -128.1897812,
            }
          }
        >
          
          {markers.length > 0 &&
            markers.map((marker, index) =>
             (
              <Marker
                key={index}
                position={marker}
                onClick={() => handleMarkerClick(userInformation[index])}
                icon={{
                  url: `https://maps.google.com/mapfiles/ms/micons/${generateMarkerColor(
                    marker.status
                  )}-dot.png`,
                  scaledSize: new google.maps.Size(32, 32),
                }}
              ></Marker>
            ))}

          <InfoWindow
            visible={selectedUser ? true : false}
            onOpen={e => {
              onInfoWindowOpen( selectedUser.id, e);
            }}
            onClose={handleInfoWindowClose}
            position={{
              lat: parseFloat(
                selectedUser &&
                  selectedUser?.user_main_address
                    ?.latitude
              ),
              lng: parseFloat(
                selectedUser &&
                  selectedUser?.user_main_address
                    ?.longitude
              ),
            }}
          >
            <div>
              <h6>
                {selectedUser && selectedUser.full_name}
                {/* Location */}
              </h6>
              <p>
                {selectedUser &&
                  selectedUser.user_main_address?.address_1}
              </p>
              {/* console.log(object) */}
              <div id="iwc">
              {/* <button   type="button" onClick={() => openModal(selectedUser.supplier_information.id)}>Send request</button> */}
              </div>
              {/* Add additional user information here */}
            </div>
          </InfoWindow>
        </Map>
      )}
    </div>
  );
};

export default memo( GoogleApiWrapper({
  apiKey: "AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY", // Replace with your actual API key
})(MapContainer));
