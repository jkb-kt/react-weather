import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

import './GoogleMap.css';

class GoogleMap extends Component {

    renderMarkers(map, maps) {
        let marker = new maps.Marker({
          position: {lat: this.props.lat, lng: this.props.lon},
          map
        });
        return marker;
      }
      
      render() {       
       return (
        
        <div className="map">
        
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'API_KEY' }}
            defaultCenter={{lat: this.props.lat, lng: this.props.lon}}
            defaultZoom={8}
            onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
            yesIWantToUseGoogleMapApiInternals
          >
          </GoogleMapReact>
        </div>
      );
    }
  }
   
  export default GoogleMap;