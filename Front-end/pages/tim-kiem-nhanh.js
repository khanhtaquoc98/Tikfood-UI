
import React from "react";
import Head from 'next/head'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import ContainerRestaurant from "../components/TimKiem/ContainerRestaurant"
import MapRestaurant from "../components/TimKiem/GgMapApi/MapContainer"

import Router from 'next/router';

import {FetchTopStar, FetchRestaurants, UserLikeStore, FetchRestaurantswithSearch} from '../Api/Api'
import {PathNameReplace} from "../Api/pathname"

import { StickyContainer, Sticky } from 'react-sticky';
var Scroll   = require('react-scroll');
var Element  = Scroll.Element;
var scroller = Scroll.scroller;

class NhaHang extends React.Component {

    constructor(props) {
        super(props);
        this.state=({
            DataRestaurant : undefined,
            isShowMap: false, 
            isShowFilter : false,
            markerID: undefined
        })
        this.child = React.createRef();
    }
    
    static getInitialProps({query}) {
        return {query}
      }

    componentDidMount(){
        let text = this.props.query.text != undefined ? this.props.query.text : ''

        this.FetchRestaurantsPage(text)
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (prevProps.query !== this.props.query) {
            let text = this.props.query.text != undefined ? this.props.query.text : ''
    
            this.FetchRestaurantsPage(text)
        }
      }

    FetchRestaurantsPage = (text) => {
        this.setState({DataRestaurant : undefined})
        FetchRestaurantswithSearch(text).then(res => this.setState({DataRestaurant: res.data.message}))
        .catch(err => {
            Router.push("/nha-hang/khong-tim-thay");
        })
    }



    LikeStore = (idStore) =>{
        if(cookies.get('user') != undefined){
            UserLikeStore(cookies.get('user'), idStore).then(res => {
                notification.success({
                    message: "Bạn vừa thích " + res.store,
                    placement: "bottomLeft"
                })
            }).catch(err => 
                notification.info({
                    message: 'Cửa hàng này bạn đã thích',
                    description: '',
                    placement: "bottomLeft",
                    style: {textAlign: "left"}
                }))
        } else {
            notification.warning({
                message: 'Bạn vui lòng đăng nhập',
                description: 'Vui lòng bạn đăng nhập mới có thể yêu thích cửa hàng',
                placement: "bottomLeft",
                style: {textAlign: "left"}
            })
        }
    }

    closeMap = () => {
        this.setState({isShowMap : false})
    }

    onClickMarkerProps =  (id) => {
        scroller.scrollTo(id, {
            delay: 100,
            smooth: true,
            offset: -200,
          })
    }

    onShowMarkerProps = (id, lat, lng) => {
            this.child.current.onClickMarkerProps(lat, lng, id)
    }

    onShowFilter = () => {
        this.setState({isShowFilter : !this.state.isShowFilter})
    }

    render(){
        const {DataRestaurant} = this.state
        return(
            <div id="wrapper">
               <Head>
                    <title>Tìm kiếm nhanh - TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
                    <meta name="description" content="TikFood tìm nhà hàng online nhanh chóng và kèm nhiều ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:description" content="Đặt bàn nhà hàng trực tuyến. Gọi ngay tổng đài >> 1900 6005 để nhận được hỗ trợ đặt bàn PasGo, đặt chỗ nhà hàng online kèm ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:image" content="https://storage.googleapis.com/finalprojectuit/bg.jpg"></meta>
              </Head>
                
                <StickyContainer className="content">
                    <Sticky disableCompensation={true} bottomOffset={80}>
                        {(style) => (
                            <div className="map-container column-map right-pos-map fix-map hid-mob-map fixed-mobile" 
                            style={{top: style.style.top, 
                                right: `${this.state.isShowMap ? "0" : "-100%"}`,
                                transition: "all .2s",
                                marginTop: `${style.isSticky ? "80px" : "0"}`,
                                position: `${style.isSticky ? "fixed" : "absolute"}`}}>
                        <MapRestaurant 
                        style={style}
                        ref={this.child}
                        onClickMarkerProps = {(id) => this.onClickMarkerProps(id)}
                        closeMap = {() => this.closeMap()}
                        ListRestaurants = {DataRestaurant != undefined ? DataRestaurant : undefined}
                        LikeStore = {(id) => this.LikeStore(id)}/>
                        </div>
                         )}
                  
                   </Sticky>
               
                    <div className="col-list-wrap novis_to-top">
                        <div className="clearfix"></div>
                        <div className="container">
                            <div className= {`mob-nav-content-btn mncb_half color2-bg show-list-wrap-search fl-wrap ${this.state.isShowFilter ? "slsw_vis" : ""}` }
                                ><i className="fal fa-filter" />  Tìm kiếm</div>
                            <div className="mob-nav-content-btn mncb_half color2-bg schm  fl-wrap" onClick={() => this.setState({isShowMap: true})}><i className="fal fa-map-marker-alt" />  Bản đồ</div>
                            </div>
                        <div className="clearfix"></div>
                        
                       <ContainerRestaurant
                            pagination = {false}
                            query = {this.props.query}
                            markerID = {this.state.markerID}
                            isShowFilter = {this.state.isShowFilter}
                            onShowMarkerProps = {(id, lat, lng) => {this.onShowMarkerProps(id, lat, lng)}}
                            ListRestaurants = {DataRestaurant != undefined ? DataRestaurant : undefined} 
                            activePage={this.props.query.page != undefined ? this.props.query.page : 1}
                            FetchRestaurantsPage = {(pageNumber, category, district, average_stars, min_price, max_price) => this.FetchRestaurantsPage(pageNumber, category, district, average_stars, min_price, max_price)}
                            LikeStore = {(id) => this.LikeStore(id)}
                            />
                    </div>

                    <div className="limit-box fl-wrap" />
                    
                </StickyContainer>
                </div>
                
        )
    }
}

export default (NhaHang);