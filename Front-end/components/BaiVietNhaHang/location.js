import React from 'react';
import {withGoogleMaps} from '../NhaHang/GgMapApi/withGoogleMaps'
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const options = {
    scrollwheel: false,
    zoomControl: true,
    fullscreenControl: true,
    mapTypeControl: false,
    scaleControl: false,
    panControl: false,
    navigationControl: false,
    streetViewControl: false,
    styles: [{
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
            "color": "#f2f2f2"
        }]
    }],
  }

export default class location extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({
            mapRef: undefined,
        })
    }
    

    handleLoad = (map) => {
        this.state.mapRef = map;
      }

    render(){
        return(
            <div style={{height: '300px'}}>
                <LoadScript
                    googleMapsApiKey="AIzaSyCObmUDNsw4qthZE2wu2uCtNn776xy197U"
                    >
                    <GoogleMap
                        options={{...options}}
                        mapContainerStyle={containerStyle}
                        zoom={15}
                        center={{lng: this.props.lng , lat:this.props.lat  }}
                    >
                        <OverlayView        
                        position={{lng: this.props.lng , lat:this.props.lat}}              
                         mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <div className="label" 
                            style={{position: 'absolute', overflow: 'hidden', marginLeft: '-10px', marginTop: '-10px', left: 0, top: 0, zIndex: 1, display: 'block'}}>
                            </div>

                        </OverlayView>
                    </GoogleMap>
                </LoadScript>
            </div>
       
        )
    }

}