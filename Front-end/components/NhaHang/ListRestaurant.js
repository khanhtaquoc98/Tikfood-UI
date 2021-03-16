import React from "react";
import Head from 'next/head'
import Router from 'next/router'
import {ChangeLinkImage} from '../../Api/pathname'
import Link from 'next/link'
import {Rate, Spin, Tooltip} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import Pagination from "react-js-pagination";
var Scroll   = require('react-scroll');
var Element  = Scroll.Element;
var scroll   = Scroll.animateScroll;

export default class ListRestaurant extends React.Component{

    static getInitialProps({query}) {
        return {query}
      }

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    showTitle = (title) => {
            if(this.props.isGridView){
                if(title.length > 35) return <a >{title.slice(0,34) + "..."}</a>;
                  else return <a >{title}</a>;
            } else {
                if(title.length > 42) return <a >{title.slice(0,42) + "..."}</a>;
                else return <a>{title}</a>;
            }
    }

    showPrice = (min, max)=>{
        if(this.props.isGridView){
            return(
            <div className="geodir-category-location fl-wrap"><a className="map-item"><i className="fal fa-clock" />Giá chỉ từ {(min*1).toLocaleString('vi', {style : 'currency', currency : 'VND'})} - {(max*1).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</a></div>
            )
        }
    }

    handlePageChange(pageNumber) {       
        this.props.FetchRestaurantsPageProps(pageNumber)
        scroll.scrollToTop();
      }
    
    LikeStore = (id) => {
        this.props.LikeStore(id)
    }

    showMarker = (id, lat, lng) => {
        let latA = lat < lng ? lat : lng;
        let lngA = lat < lng ? lng : lat;
        this.props.onShowMarkerProps(id, latA, lngA);
    }

    render(){
        const {ListRestaurants} = this.props
        if(ListRestaurants != undefined){
            return(
                <div className="listing-item-container init-grid-items fl-wrap">
                     <div className="container">
                         {
                             ListRestaurants.store.map((item, index)=> {
                                 return(
                                    <Element name={item._id} key={index} className={`listing-item ${this.props.isGridView ? "has_two_column" : "has_one_column"}`} style={{height: this.props.isGridView ? '464px' : 'auto'}}>
                                    <article className="geodir-category-listing fl-wrap" style={{height: "100%"}}>
                                        <div className="geodir-category-img">
                                        <div className="geodir-js-favorite_btn" onClick={() => this.LikeStore(item._id)}><i className="fal fa-heart" /><span>Yêu thích</span></div>
                                       {/**
                                        *  <div style={{top: "60px"}} className="geodir-js-favorite_btn" ><i className="fab fa-google-plus-g"></i><span>{item.average_stars}/5</span></div>
                                        * 
                                        */}
                                       
                                        <Link href={`/${item.name_linkurl_store}/${item._id}`}><a  className="geodir-category-img-wrap fl-wrap">
                                            <img src={ChangeLinkImage(item.list_images[0])} style={{maxHeight: "227px"}}/> 
                                        </a></Link>
                                        <div className="geodir-category-opt">
                                            <div className="listing-rating-count-wrap">
                                            <Rate disabled style={{fontSize: ".8rem"}} className="listing-rating card-popup-rainingvis" allowHalf defaultValue={item.average_score_comment} />
                                            <br />
                                                <div className="reviews-count">{item.list_comment_id.length} đánh giá</div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="geodir-category-content fl-wrap">
                                        <div className="geodir-category-content-title fl-wrap">
                                            <div className="geodir-category-content-title-item" style={{height: this.props.isGridView ?  "106px" : "83px"}}>
                                                <h3 className="title-sin_map">
                                                    <Link href={`/${item.name_linkurl_store}/${item._id}`}>
                                                     {  this.showTitle(item.name) }
                                                     </Link>
                                                     {(item.partner != undefined  && item.partner.length > 0) &&<span class="verified-badge"><i class="fal fa-check"></i></span>}</h3>
                                                <div className="geodir-category-location fl-wrap"><a className="map-item"><i className="fas fa-map-marker-alt" />{item.address.address_detail}</a></div>
                                                <div className="geodir-category-location fl-wrap"><a className="map-item"><i className="fal fa-clock" />{item.time_open}</a></div>
                                                {this.showPrice(item.min_price, item.max_price)}
                                            </div>
                                        </div>
                                        <div className="geodir-category-text fl-wrap">
                                         <p className="small-text">{item.short_decription}</p>
                                           
                                        </div>
                                        <div className="geodir-category-footer fl-wrap">
                                        <a className="listing-item-category-wrap">
                                    
                                    <Tooltip placement="bottom" title="Danh mục" className="tooltip">
                                    <div className="listing-item-category red-bg"><i className="fas fa-utensils" /></div>
                                    <span>{item.category.name}</span>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title="Bình luận tích cực" className="tooltip">
                                    <div className="listing-item-category" style={{background: "#81c784", marginLeft: ".8rem"}}><i className="fas fa-thumbs-up" /></div> 
                                    <span>{item.positive_sentimet_quantity}</span>
                                    </Tooltip>
                                    <Tooltip placement="bottom" title="Bình luận tiêu cực" className="tooltip">
                                    <div className="listing-item-category" style={{background: "#e57373", marginLeft: ".8rem"}}><i className="fas fa-thumbs-down" /></div> 
                                    <span>{item.nagative_sentimet_quantity}</span>
                                    </Tooltip>   
                                 </a>
                                            <div className="geodir-opt-list">
                                            <ul className="no-list-style">
                                                <li><a className="map-item"><i className="fal fa-map-marker-alt" onMouseOver={() => this.showMarker(item._id, item.address.latitude, item.address.longtitude)}/> </a></li>
                                                <li>
                                                </li>
                                            </ul>
                                            </div>
                                            <div className="price-level geodir-category_price">
                                            <span className="price-level-item" data-pricerating={3} />
                                            <span className="price-name-tooltip">Pricey</span>
                                            </div>
                                            <div className="geodir-category_contacts">
                                            <div className="close_gcc"><i className="fal fa-times-circle" /></div>
                                            <ul className="no-list-style">
                                                <li><span><i className="fal fa-phone" /> Call : </span><a href="#">+38099231212</a></li>
                                                <li><span><i className="fal fa-envelope" /> Write : </span><a href="#">yourmail@domain.com</a></li>
                                            </ul>
                                            </div>
                                        </div>
                                        </div>
                                    </article>
                                    </Element >
                                 )
                             })
                         }
                                           
                         
                         {/* listing-item end */}
                         {
                             this.props.pagination && <Pagination
                             activePage={this.props.activePage != undefined ? this.props.activePage*1 : 1}
                             itemsCountPerPage={20}
                             totalItemsCount={this.props.ListRestaurants  != undefined ? this.props.ListRestaurants.length : 1}
                             pageRangeDisplayed={5}
                             onChange={this.handlePageChange.bind(this)}
                             itemClassNext = {"nextposts-link"}
                             itemClassPrev = {"prevposts-link"}
                             prevPageText= {<div style={{padding: "0 30px"}}><i className="fas fa-caret-left" /><span style={{marginLeft: "5px"}}>Trước</span></div>}
                             nextPageText = { <div style={{padding: "0 30px"}}><span style={{marginRight: "5px"}}>Sau</span><i className="fas fa-caret-right" /></div>}
                             activeLinkClass = "current-page"
                             hideFirstLastPages = {true}
                             />  
                         }                                                                                 
                     </div>
                     </div>
             )
        } else 
            {
                return(
                    <Spin indicator={(
                        <LoadingOutlined style={{ fontSize: 46, marginTop: "30vh", color: "#2e3f6e!important" }} spin />
                    )}>
                     
                    </Spin>
                  
                )
            }
       
    }
}