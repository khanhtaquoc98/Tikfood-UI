
import React from "react";
import Router from 'next/router'
import Select from 'react-select'
import {PathNameReplace} from "../../Api/pathname"
import {GetDistrict, GetCategory} from "../../Api/Api"
import { Rate, Slider } from 'antd';

const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data }) => {
      return {
        ...styles,
        textAlign: 'left'
      };
    },
  };

export default class FilterRestaurant extends React.Component {

  

    render(){
        console.log(this.props.query)
        return(
            <div className="listsearch-input-wrap lws_mobile fl-wrap" style={{display: this.props.isShowFilter ? "block" : "none", height: this.props.isShowFilter ? "100%" : "0%"}}>
                <div className="listsearch-input-wrap_contrl fl-wrap d-none d-md-block">
                    <div className="container">
                    <ul className="tabs-menu fl-wrap no-list-style">
                        <li className="current"><a> <i className="fal fa-sliders-h" /> Kết quả tìm kiếm: {this.props.query.text}  </a></li>
                    </ul>
                    </div>
                </div>
                <div className="clearfix" />
        </div>

        )
    }
}