import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import './map.css';
import { Oval } from 'react-loader-spinner';

const mapStyles = {
    width: '100%',
    height: '100%',
        position: 'relative'
    };

const MapContainer = (props) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);

    const handleMarkerClick = () => {
        setShowInfoWindow(true);
    };

    const handleInfoWindowClose = () => {
        setShowInfoWindow(false);
    };

    useEffect(() => {
        const { google, latitude, longitude } = props;
        const geocoder = new google.maps.Geocoder();

        // Perform reverse geocoding to get the address based on the marker coordinates
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    setAddress(results[0].formatted_address);
                    setLoading(false);
                }
            }
        });
    }, [props.google, props.latitude, props.longitude]);

    const mapCenter = {
        lat: props.latitude,
        lng: props.longitude
    };

    return (
        loading ? (
            <div className="d-flex justify-content-center">
                <Oval color="purple" secondaryColor="purple" />
            </div>
        ) : (
            <Map
                className="map-fix"
                google={props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={mapCenter}
            >
                <Marker position={mapCenter} onClick={handleMarkerClick} />

                <InfoWindow
                    visible={showInfoWindow}
                    onClose={handleInfoWindowClose}
                    position={mapCenter}
                >
                    <div>
                        <h6>{props.name}'s Location</h6>
                        <p>{address}</p>
                    </div>
                </InfoWindow>
            </Map>
        )
    );

};






export default GoogleApiWrapper({
    apiKey: 'AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY' // Replace with your actual API key
})(MapContainer);
