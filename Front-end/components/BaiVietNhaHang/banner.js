import React from "react";
import { Spin } from 'antd';
import { Rate } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {ChangeLinkImage} from '../../Api/pathname'

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

export default class Banner extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Restaurant : undefined,
        }
    }
    

    render(){
        const {Restaurant} = this.props;
        if(Restaurant != undefined)
        {
            let Comment = Restaurant.find(item => item._id == this.props.storeID)
            console.log(Comment)
            if(Restaurant.length > 1){
                return(
                    <section className="listing-hero-section hidden-section" data-scrollax-parent="true" name="nhahang" >          
                        <div className="bg-parallax-wrap">
                            <div className="bg par-elem " style={{backgroundAttachment: "fixed",  backgroundImage: `url(${Restaurant[0] != undefined ? ChangeLinkImage(Restaurant[0].list_images[0]) : ""})`}} />
                            <div className="overlay" />
                        </div>
                        <div className="container">
                            <div className="list-single-header-item  fl-wrap">
                            <div className="row">
                                <div className="col-md-9">
                                <h1>{Restaurant[0].name } 
                                {Comment.partner.length > 0 && <span className="verified-badge">
                                <i className="fal fa-check" />
                                    </span> }
                                </h1>
                                <div className="geodir-category-location fl-wrap"><a href={Restaurant[0].address.link_url}><i className="fas fa-map-marker-alt" />  {Restaurant[0].address.address_detail}</a> <a href="#"> <i className="fal fa-phone" />1900 6005</a> </div>
                                </div>
                                <div className="col-md-3">
                                <a className="fl-wrap list-single-header-column custom-scroll-link " href="#sec5">
                                    <div className="listing-rating-count-wrap single-list-count">
                                    <div className="listing-rating card-popup-rainingvis">
                                        <Rate disabled defaultValue={Comment.average_score_comment} style={{fontSize: ".86rem"}}/>
                                    </div>
                                    <br />                                                
                                    <div className="reviews-count">{Comment.list_comment_id.length} đánh giá</div>
                                    </div>
                                </a>
                                </div>
                            </div>
                            </div>
                            <div className="list-single-header_bottom fl-wrap">
                            <a className="listing-item-category-wrap" href="#">
                                <div className="listing-item-category  red-bg"><i className="fal fa-utensils-alt" /></div>
                                {
                                    Restaurant.map((item, index)=> {
                                        return(
                                        <span key={index}>{item.category.name}</span>
                                        )
                                    })
                                }
                                
                            </a>
                           
                        {/*<div className="geodir_status_date gsd_open"><i className="fal fa-lock-open" />{Restaurant[0].time_open}</div>
                            <div className="list-single-stats">
                                <ul className="no-list-style">
                                <li><span className="viewed-counter"><i className="fas fa-eye" /> Viewed -  156 </span></li>
                                <li><span className="bookmark-counter"><i className="fas fa-heart" /> Bookmark -  24 </span></li>
                                </ul>
                            </div>*/}
                            </div>
                        </div>
                        </section>
                )
            }
            else {
                return(
                    <section className="listing-hero-section hidden-section" data-scrollax-parent="true" id="sec1" >          
                        <div className="bg-parallax-wrap">
                            <div className="bg par-elem " style={{backgroundAttachment: "fixed",  backgroundImage: `url(${Restaurant != undefined ? ChangeLinkImage(Restaurant[0].list_images[0]) : ""})`}} />
                            <div className="overlay" />
                        </div>
                        <div className="container">
                            <div className="list-single-header-item  fl-wrap">
                            <div className="row">
                                <div className="col-md-9">
                                <h1>{Restaurant[0].name } <span className="verified-badge"><i className="fal fa-check" /></span></h1>
                                <div className="geodir-category-location fl-wrap"><a href={Restaurant[0].address.link_url}><i className="fas fa-map-marker-alt" />  {Restaurant[0].address.address_detail}</a> <a > <i className="fal fa-phone" />1900 6005</a> </div>
                                </div>
                                <div className="col-md-3">
                                <a className="fl-wrap list-single-header-column custom-scroll-link " href="#sec5">
                                    <div className="listing-rating-count-wrap single-list-count">
                                    <div className="listing-rating card-popup-rainingvis">
                                        <Rate disabled defaultValue={Restaurant[0].average_stars} style={{fontSize: ".86rem"}}/>
                                    </div>
                                    <br />                                                
                                    <div className="reviews-count">{Restaurant[0].reviewer_quantity} đánh giá</div>
                                    </div>
                                </a>
                                </div>
                            </div>
                            </div>
                            <div className="list-single-header_bottom fl-wrap">
                            <a className="listing-item-category-wrap" href="#">
                            <div className="listing-item-category  red-bg"><i className="fal fa-utensils-alt" /></div>
                                <span>{Restaurant[0].category.name}</span>
                            </a>
                           
                        <div className="geodir_status_date gsd_open"><i className="fal fa-lock-open" />{Restaurant[0].time_open}</div>
                            <div className="list-single-stats">
                                <ul className="no-list-style">
                                <li><span className="viewed-counter"><i className="fas fa-eye" /> Viewed -  156 </span></li>
                                <li><span className="bookmark-counter"><i className="fas fa-heart" /> Bookmark -  24 </span></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        </section>
                )
            }
            
        }
        else return(
            <section  data-scrollax-parent="true" id="sec1"  style={{padding: "200px", backgroundColor: "#f6f6f6"}} > 
                <Spin indicator={antIcon} />         
            </section>
        )
    }
}