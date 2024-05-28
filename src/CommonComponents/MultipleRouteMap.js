import { GoogleApiWrapper } from "google-maps-react";
import React, { useEffect, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { Oval } from "react-loader-spinner";
import { colors } from "./commonMethods";




const MultipleRouteMap = (props) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allPoints, setAllPoints] = useState([]);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false); // New state variable

console.log(selectedUser,"selected")


  useEffect(() => {
    const directionsService = new props.google.maps.DirectionsService();
    const routeRequests = [];
    setAllPoints(props.routes);
    // Loop through the array of routes and create separate requests for each route
    props.routes.forEach((route) => {
      const { transport_id, orders } = route;

      if (orders && orders.length > 0) {
        // Check if there are orders for this transport
        const waypoints = orders.map((order) => ({
          location: new props.google.maps.LatLng(
            order.orders.retailer_information.user_main_address.latitude,
            order.orders.retailer_information.user_main_address.longitude ||
              77.0671689
          ),
        }));
        // console.log(waypoints, "waypint");

        routeRequests.push({
          transportId: transport_id,
          request: {
            origin: waypoints[0].location, // First waypoint as the origin
            destination: waypoints[waypoints.length - 1].location, // Last waypoint as the destination
            travelMode: props.google.maps.TravelMode.DRIVING,
            waypoints: waypoints.slice(1, -1), // Exclude first and last waypoints
          },
        });
      }
    });
    console.log(routeRequests, "route");
    // Execute each route request and collect the results
    Promise.all(
      routeRequests.map((routeRequest) => {
        return new Promise((resolve) => {
          directionsService.route(routeRequest.request, (result, status) => {
            resolve({
              transportId: routeRequest.transportId,
              result,
              status,
            });
          });
        });
      })
    ).then((results) => {
      const validResults = results.filter(
        (result) => result.status === props.google.maps.DirectionsStatus.OK
      );
      setRoutes(validResults);
      setLoading(false);
    });
  }, [props.routes]);

  const handleMarkerClick = (user, e) => {
    setSelectedUser(user);
    setInfoWindowOpen(true); // Open the info window
  };

  const handleInfoWindowClose = () => {
    setSelectedUser(null);
    setInfoWindowOpen(false); // Close the info window
  };
  // console.log(allPoints, "allPoints");

  // Helper function to get random colors for polylines
  const getRandomColor = () => {
    const colors = ["red", "blue", "green", "orange", "purple", "yellow"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  props.onResult(routes);

  console.log(routes);
  const GoogleMapExample = withGoogleMap((props) => {
    // Create objects to map transport IDs to colors for routes and markers
    const routeColors = {};
    // const markerColors = {};

    // Initialize a variable to keep track of the route number
    let routeNumbers = {};
    return (
      <GoogleMap 
       defaultCenter={props.origin} 
       defaultZoom={10}>
        {routes.map((route, i) => {
          if (!routeColors[route.transportId]) {
            // Generate a random color if not assigned yet for this route
            routeColors[route.transportId] = colors[i];

            // Initialize the route number for this route if not assigned yet
            if (routeNumbers[route.transportId] === undefined) {
              routeNumbers[route.transportId] = 1;
            }
          }

          // Increment the route number for this route
          const routeNumber = routeNumbers[route.transportId]++;

          return (
            <React.Fragment key={route.transportId}>
              {/* DirectionsRenderer with the polyline */}
              <DirectionsRenderer 
                directions={route.result}
                options={{
                  polylineOptions: {
                    strokeColor: routeColors[route.transportId], // Use the route-specific color
                    strokeWeight: 4,
                  },
                }}
              />

              {/* Create a common marker for each waypoint */}
              {allPoints?.map((item, j) =>
                item?.orders?.map((ord, i) => (
                  <Marker
                    key={"marker" + j + i}
                    onClick={(e) =>
                      handleMarkerClick(ord.orders.retailer_information, e)
                    }
                    position={{
                      lat: ord.orders.retailer_information.user_main_address
                        .latitude,
                      lng: ord.orders.retailer_information.user_main_address
                        .longitude,
                    }}
                    icon={{
                      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                        `
                        <svg
                              width="30"
                              height="30"
                              viewBox="0 0 40 40"
                              fill="${colors[j]}"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="20" cy="20" r="16" />
                              <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="12">
                                ${i + 1}
                              </text>
                            </svg>`
                      )}`,
                    }}
                    label={{
                      text: i + 1,
                      color: "black",
                      fontWeight: "bold",
                    }}
                    optimized={true}
                    zIndex={1000}
                  />
                ))
              )}
            </React.Fragment>
          );
        })}
        {selectedUser &&  
        <InfoWindow
        
        // visible={selectedUser !== null ? true : false}
        onClose={handleInfoWindowClose}
        position={{
          // lat: parseFloat(
          //   selectedUser &&
          //     selectedUser?.retailer_information?.user_main_address?.latitude
          // ),
          lat: parseFloat(
            selectedUser && selectedUser?.user_main_address?.latitude
          ),
          lng: parseFloat(
            selectedUser && selectedUser?.user_main_address?.longitude
          ),
        }}
      >
        <div>
          <h6>{selectedUser && selectedUser?.full_name}'s Location</h6>
          <p>{selectedUser && selectedUser?.user_main_address?.address_1}</p>
          {/* Add additional user information here */}
        </div>
      </InfoWindow>
        }
        
      </GoogleMap>
    );
  });

  const handleGoogleMapLoaded = () => {
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Oval color="purple" secondaryColor="purple" />
        </div>
      ) : (
        <GoogleMapExample
          loadingElement={<div style={{ height: "100%", width: "100%" }} />}
          containerElement={<div style={{ height: "800px", width: "100%" }} />}
          mapElement={<div style={{ height: "100%", width: "100%" }} />}
          origin={props.origin}
          onGoogleMapLoad={handleGoogleMapLoaded}
        />
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY",
})(MultipleRouteMap);
