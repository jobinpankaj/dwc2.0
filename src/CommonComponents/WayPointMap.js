/*global google*/
import { GoogleApiWrapper } from "google-maps-react";
import React, { useEffect, useState } from "react";

import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    DirectionsRenderer,
    Marker
} from "react-google-maps";
import { Oval } from "react-loader-spinner";

const Map = (props) => {
    const [directions, setDirections] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const directionsService = new google.maps.DirectionsService();

        const waypoints = props.waypoints;
        const origin = props.origin;
        const destination = waypoints.length > 0 ? waypoints[waypoints.length - 1] : origin;
        console.log(waypoints, origin, destination);
        const formattedArray = waypoints.map((waypoint) => {
            return {
                location: new google.maps.LatLng(waypoint),
            };
        });
        console.log(formattedArray, "Format");

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: formattedArray.slice(0, -1), // Exclude the destination from waypoints
                optimizeWaypoints: true, // Calculate the shortest path by optimizing the waypoints
                provideRouteAlternatives: true
            },
            (result, status) => {
                console.log({ result, status });
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(result);

                    setDirections(result);
                    setLoading(false);
                } else {
                    setLoading(true);
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }, [props.waypoints, props.origin]);

    const GoogleMapExample = withGoogleMap((props) => (
        <GoogleMap defaultCenter={props.origin} defaultZoom={10}>
            <DirectionsRenderer directions={directions} options={{
                polylineOptions: {
                    strokeColor: "red",
                    strokeWeight: 4,
                }
            }} />

        </GoogleMap>
    ));

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
    apiKey: 'AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY' // Replace with your actual API key
})(Map);


