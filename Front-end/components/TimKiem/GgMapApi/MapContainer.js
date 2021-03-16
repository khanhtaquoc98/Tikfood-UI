import React from 'react';
import {withGoogleMaps} from './withGoogleMaps'
import { GoogleMap, MarkerClusterer, Marker } from '@react-google-maps/api'
import  MarkerGoogleMap  from "./MarkerGoogleMap"
import axios from 'axios'
import * as $ from 'jquery';

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

  const clusterStyles = [
    {
      textColor: 'white',
      url: '',
      height: 50,
      width: 50,
      className: 'cluster-visible'
    }
  ];

 class MapContainer extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      LngInfoWindow: 106.674079,
      LatInfoWindow: 10.789913,
      mapRef: undefined,
      clustererRef: undefined,
      markerID : undefined,
    }
    
  }

  componentDidMount(){
    this.helloLoad();


    if (typeof window !== 'undefined') {
      navigator.geolocation.getCurrentPosition(function(position) {
          if(position.coords != undefined){
              localStorage.setItem('latUser', position.coords.latitude)
              localStorage.setItem('longUser', position.coords.longitude)
          }
        });
  }
  
    const {ListRestaurants} = this.props
    if(ListRestaurants != undefined){
      this.setState({LatInfoWindow: ListRestaurants[0]._source.address.longtitude*1 > ListRestaurants[0]._source.address.latitude*1 ? ListRestaurants[0]._source.address.latitude*1 : ListRestaurants[0]._source.address.longtitude*1,
                    LngInfoWindow: ListRestaurants[0]._source.address.longtitude*1 > ListRestaurants[0]._source.address.latitude*1 ? ListRestaurants[0]._source.address.longtitude*1 : ListRestaurants[0]._source.address.latitude*1})
                  
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.ListRestaurants != prevProps.ListRestaurants ){
      if(this.props.ListRestaurants != undefined && this.props.ListRestaurants.length > 0)
      {
        let lat =  this.props.ListRestaurants[0]._source.address.longtitude*1 > this.props.ListRestaurants[0]._source.address.latitude*1 ? this.props.ListRestaurants[0]._source.address.latitude*1 : this.props.ListRestaurants[0]._source.address.longtitude*1
        let long  = this.props.ListRestaurants[0]._source.address.longtitude*1 > this.props.ListRestaurants[0]._source.address.latitude*1 ? this.props.ListRestaurants[0]._source.address.longtitude*1 : this.props.ListRestaurants[0]._source.address.latitude*1
        if(this.state.LatInfoWindow != lat|| this.state.LngInfoWindow != long)
        if(this.state.mapRef != undefined) this.state.mapRef.panTo({lat: lat, lng: long})
        this.setState({LatInfoWindow: lat, LngInfoWindow: long})
      }
    
    
    }
  }

  helloLoad = () => {
    
    $(".map-container.column-map").css({
      height: $(window).outerHeight(true) - 80 + "px"
    });
 
    if($(window).width() < 1064){
      $(".map-container.fw-map.big_map.hid-mob-map").css({
        "right": "-100%"
    });

    $(".map-container.column-map.hid-mob-map").css({
        "right": "-100%"
    });

      $(".map-container.fw-map.big_map.hid-mob-map").css({
        height: $(window).outerHeight(true) - 110 + "px"
    });
    } else {
      $(".map-container.fw-map.big_map.hid-mob-map").css({
        "right": "0"
    });
    $(".map-container.column-map.hid-mob-map").css({
        "right": "0"
    });
      $(".map-container.fw-map.big_map.hid-mob-map").css({
        height: 550 + "px"
    });
    }
    $('.map-close').on("click", function (e) {
      $(".hid-mob-map").css({
          right: "-100%"
      }, 500, "easeInOutExpo").removeClass("fixed-mobile");
    });
    
  }

  handleLoad = (map) => {
    this.state.mapRef = map;
    this.props.onLoadMap
  }

  handleLoadClusterer = (clusterer) => {
    this.state.clustererRef = clusterer;
  }

  onMarkerClustererClick = (markerClusterer) => {
    const clickedMarkers = this.state.clustererRef.getMarkers()
  }

  onClickMarker =  (lat, lng, id) => {
    //console.log(lat, lng)
      this.setState({markerID: id})
      this.props.onClickMarkerProps(id);
      this.setState({LatInfoWindow: lat, LngInfoWindow: lng})
      this.state.mapRef.zoom = 15;
      this.state.mapRef.panTo({lat: lat, lng: lng})
  }

  onClickMarkerProps =  (lat, lng, id) => {
    console.log(id)
    this.setState({markerID: id})
    this.setState({LatInfoWindow: lat*1, LngInfoWindow: lng*1})
    //this.state.mapRef.zoom = 15;
    this.state.mapRef.panTo({lat: lat*1, lng: lng*1})
    //console.log(this.state.mapRef)
}

  onClickUserLocation = () =>{
    if(localStorage.getItem('latUser') != undefined && localStorage.getItem('longUser') != undefined){
      //console.log(localStorage.getItem('latUser'), localStorage.getItem('longUser'))
      this.state.mapRef.panTo({lat: localStorage.getItem('latUser')*1, lng: localStorage.getItem('longUser')*1})
    }
  }

  onCloseInfo = (id) => {
    this.setState({markerID: undefined})
  }

  showUser = () => {
    if(localStorage.getItem('latUser') != undefined && localStorage.getItem('longUser') != undefined)
    return(
      <Marker
      position={{ lng: localStorage.getItem('longUser')*1, lat: localStorage.getItem('latUser')*1 }}
      icon={{
         url: "./iconMarkerUser.svg",
         scaledSize: new google.maps.Size(40, 40)
      }}  
      />
    )
  }


  render(){
    const {ListRestaurants, style} = this.props
      return (  
        <>
         
           
        <GoogleMap
        onLoad={this.handleLoad}
        mapContainerStyle={containerStyle}
        options={{...options,  zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
          }}}
        zoom={15}
        center={{ lat: this.state.LatInfoWindow, lng: this.state.LngInfoWindow}}
        onClick = {() => this.onCloseInfo()}
        > 
        {this.showUser()}
          <MarkerClusterer
           averageCenter = {true}
           enableRetinaIcons
           ignoreHidden={true}
           gridSize={60}
           minimumClusterSize={2} 
           styles={clusterStyles}
           maxZoom={15}
          >
             {(clusterer) => {
               if(ListRestaurants){
                return(
                  ListRestaurants.map((item, index) =>{
                    let long = item._source.address.longtitude*1 > item._source.address.latitude*1 ? item._source.address.longtitude*1 : item._source.address.latitude*1;
                    let lat = item._source.address.longtitude*1 > item._source.address.latitude*1 ? item._source.address.latitude*1 : item._source.address.longtitude*1;
                    if(this.state.markerID != undefined){
                      if(item._id == this.state.markerID){
                        return(
                          <MarkerGoogleMap key={index} 
                            isOpen = {true}
                            lat={lat} 
                            lng={long}  
                            onClickMarker={()=>this.onClickMarker(lat, long, item._id)}
                            onCloseInfo = {() => this.onCloseInfo(item._id)}
                            data = {item._source} clusterer={clusterer}
                            LikeStore = {() => this.props.LikeStore(item._id)}/>
                        )
                      } else return (
                        <MarkerGoogleMap key={index} 
                        isOpen = {false}
                        lat={lat} 
                        lng={long}   
                        onClickMarker={()=>this.onClickMarker(lat, long,item._id)}  
                        onCloseInfo = {() => this.onCloseInfo(item._id)}
                        data = {item._source} clusterer={clusterer}/>
                      )
                    } else
                    return(
                      <MarkerGoogleMap key={index} 
                      isOpen = {false}
                      lat={lat} 
                      lng={long}    
                      onClickMarker={()=>this.onClickMarker(lat, long,item._id)}
                      onCloseInfo = {() => this.onCloseInfo(item._id)} 
                      data = {item._source} clusterer={clusterer}/>
                    )
                  })
                 )
               } else
                return null
             }  
            }
          </MarkerClusterer>
        </GoogleMap>
        <div onClick={() => this.onClickUserLocation()} className="location-btn geoLocation tolt" data-microtip-position="top-left" data-tooltip="Vị trí của bạn"><span><i className="fal fa-location" /></span></div>
        <div className="map-close" onClick={() => this.props.closeMap()}><i className="fas fa-times" /></div>
          
        </>
    )}
}

export default withGoogleMaps(MapContainer);
//export default MapContainer;