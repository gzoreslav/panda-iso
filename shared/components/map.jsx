import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';

export default React.createClass({
    getInitialState() {
        return {
            center: {
                lat: 48.922633,
                lng: 24.71111700000006
            },
            marker: {
                position: new google.maps.LatLng(48.922633, 24.71111700000006),
                showInfo: true
            }
        }
    },
    getCoordinates() {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': this.props.location}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                this.setState({
                    center: results[0].geometry.location,
                    marker: {
                        position: results[0].geometry.location
                    }
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    },
    componentWillReceiveProps(newProps) {
        this.getCoordinates();
    },
    componentDidMount() {
        this.getCoordinates();
    },
    render() {
        return (
            <section style={{height: '350px'}}>
                <GoogleMapLoader
                    containerElement={
                        <div
                           {...this.props}
                            style={{
                                height: '100%',
                            }}
                        />
                    }
                    googleMapElement={
                        <GoogleMap
                            defaultZoom={6}
                            center={{...this.state.center}}
                        >
                            <Marker
                                {...this.state.marker}
                            />
                        </GoogleMap>
                    }
                />
            </section>
        );
    }
});
