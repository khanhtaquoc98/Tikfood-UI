import React from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import axios from 'axios'

const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  
  export default class FindAddress extends React.Component {
    constructor (props) {
        super(props)
    
        this.autocomplete = null
    
        this.onLoad = this.onLoad.bind(this)
        this.onPlaceChanged = this.onPlaceChanged.bind(this)
      }
    
      onLoad (autocomplete) {
       
        this.autocomplete = autocomplete
      }
    
      onPlaceChanged () {
        if (this.autocomplete !== null) {
          console.log(this.autocomplete.getPlace())
          console.log('id: ', this.autocomplete.getPlace().geometry.location.lat(), this.autocomplete.getPlace().geometry.location.lng())
        } else {
          console.log('Autocomplete is not loaded yet!')
        }
      }

    render() {
      return (
        <LoadScript
          googleMapsApiKey="AIzaSyCObmUDNsw4qthZE2wu2uCtNn776xy197U"
          libraries={["places"]}
        >
            <Autocomplete
                fields="geometry.location"
                onLoad={this.onLoad}
                onPlaceChanged={this.onPlaceChanged}
            >
                 <div className="form-group">
                                <label htmlFor="formrow-inputZip">Địa chỉ chi tiết</label>
                                
                                <input type="text" className="form-control"
                                 name="address_detail"  />
                                </div>
            </Autocomplete>
        </LoadScript>
      )
    }
  }
  