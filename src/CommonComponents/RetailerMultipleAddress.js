import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Oval } from 'react-loader-spinner';

const mapStyles = {
    width: '100%',
    height: '700px',
    position: 'relative'
};

const MapContainer = ({ google, userInformation, selected, color }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        setLoading(false);
        // Fetch latitudes and longitudes from userInformation data list

        const fetchedMarkers = userInformation.map(user => ({
            lat: user?.user_main_address?.latitude || 0,
            lng: user?.user_main_address?.longitude || 0,
            id: user.id,
            status: user.status || 0,
        }));
        setMarkers(fetchedMarkers);
        // setSelectedUser(selected)
    }, [userInformation, selected]);

    const handleMarkerClick = (user) => {
        setSelectedUser(user);
        console.log(user)
    };

    const handleInfoWindowClose = () => {
        setSelectedUser(null);
    };

    const generateMarkerColor = (status) => {
        if (color === null || color === "") {
            switch (status) {
                case '0':
                    return 'red';
                case '1':
                    return 'green';
                case '2':
                    return 'green';

                default:
                    return 'black';
            }
        }
        return color;

    };
    console.log(selected)
    console.log(selectedUser)
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
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{ lat: markers[0]?.lat, lng: markers[0]?.lng }}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker}
                            onClick={() => handleMarkerClick(userInformation[index])}
                            icon={{
                                url: `https://maps.google.com/mapfiles/ms/micons/${generateMarkerColor(marker.status)}-dot.png`,
                                scaledSize: new google.maps.Size(32, 32),

                            }}
                        >

                        </Marker>
                    ))}

                    <InfoWindow
                        visible={selectedUser ? true : false}
                        onClose={handleInfoWindowClose}
                        position={{
                            lat: selectedUser && selectedUser.user_main_address.latitude,
                            lng: selectedUser && selectedUser.user_main_address.longitude
                        }}
                    >
                        <div>
                            <h6>{selectedUser && selectedUser.full_name}'s Location</h6>
                            <p>{selectedUser && selectedUser.user_main_address.address_1}</p>
                            {/* Add additional user information here */}
                        </div>
                    </InfoWindow>


                </Map>
            )}
        </div>
    );
};






export default GoogleApiWrapper({
    apiKey: 'AIzaSyBLkLSPnlPCzCfWun-oexkLi9DT7ijQXeY' // Replace with your actual API key
})(MapContainer);
