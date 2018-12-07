import React, { PureComponent } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class Map extends PureComponent {
    render() {
        const { lat, lng } = this.props;
        const Map = withGoogleMap(props => (
            <GoogleMap
                defaultOptions={{
                    disableDefaultUI: true,
                    scrollwheel: false,
                    draggable: false
                    // clickable: false
                }}
                defaultZoom={15}
                defaultCenter={{ lat, lng }}
            >
                {props.isMarkerShown && <Marker position={{ lat, lng }} />}
            </GoogleMap>
        ));
        return lat && lng ? (
            <Map
                isMarkerShown
                // googleMapURL="https://www.yelp.com/biz/t4-story-road-san-jose?adjust_creative=9fyNtpJy38-AxsbvwP-zrg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=9fyNtpJy38-AxsbvwP-zrg"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={
                    <div
                        // classNames="lobby-map"
                        style={{ height: `100%`, width: '100%' }}
                    />
                }
                mapElement={<div style={{ height: `100%` }} />}
            />
        ) : null;
    }
}
export default Map;
