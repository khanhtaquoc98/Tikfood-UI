import React from 'react';
import Link from 'next/link'
import { Marker, OverlayView, InfoBox } from '@react-google-maps/api'
import {Rate} from 'antd'
import Item from 'antd/lib/list/Item';

const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height),
  })


export default class MarkerGoogleMap extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            markerRef: undefined
        }
    }

    handleLoadMarker = (marker) => {
        this.state.markerRef = marker;
    }

    onToggleClose = () => {
        this.props.onCloseInfo();
    }

    onToggleOpen = () => {  
        this.props.onClickMarker();
    }
    
    render(){
        const { isOpen,data } = this.props;
        return(
                <Marker
                    onLoad = {this.handleLoadMarker}
                    clusterer={this.props.clusterer}
                    opacity={100}
                    position={{ lng: this.props.lng*1, lat: this.props.lat*1 }}    
                    icon={{
                        url: "./favorite.svg",
                        scaledSize: new google.maps.Size(40, 40)
                    }}  
                    onClick={this.onToggleOpen}
                    >
                        {
                            isOpen && <InfoBox
                            options={{
                               pixelOffset: new window.google.maps.Size(-150, -360),
                               closeBoxURL: ``,
                               enableEventPropagation: true
                             }}
                             position={{  lng: this.props.lng*1, lat: this.props.lat*1 }} >
                                  < div className="map-popup-wrap">
                                    <div className="map-popup">
                                   <div className="infoBox-close" onClick={this.onToggleClose}>
                                        <i className="fal fa-times" />
                                   </div>

                                   <a className="listing-img-content fl-wrap">
                                   <img src={data.list_images[0]} />
                                   
                                   <div className="card-popup-raining map-card-rainting" >
                                        <Rate disabled defaultValue={data.average_score_comment} style={{fontSize: ".6rem"}}/>   
                                       <div className="map-popup-reviews-count">{data.list_comment_id.length} đánh giá</div>
                                   </div>
                                   </a> 
                                   <div className="listing-content">
                                   <div className="listing-content-item fl-wrap">
                                       
                                       <div className="listing-title fl-wrap">
                                       <h4>
                                       <Link href={`/${data.name_linkurl_store}/${data._id}`}>{data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}</Link>
                                       </h4>
                                       <div className="map-popup-location-info">
                                            <i className="fas fa-map-marker-alt" />{data.address.address_detail}</div>
                                       </div>
                                       <div className="map-popup-footer">
                                            <Link href={`/${data.name_linkurl_store}/${data._id}`}><a className="main-link">Chi tiết <i className="fal fa-long-arrow-right" />
                                                </a></Link>
                                       <a className="infowindow_wishlist-btn" onClick={() => this.props.LikeStore()}>
                                           <i className="fal fa-heart" />
                                       </a>
                                       </div>
                                   </div>
                                   </div>
                               </div>
                               </div>
                           </InfoBox>
                        }
                        
                    </Marker>

        )
    }

}