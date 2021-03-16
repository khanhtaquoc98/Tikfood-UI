import React from "react";
//import Swiper from 'react-id-swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import {notification,Tooltip} from 'antd'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import Link from 'next/link'
import {ChangeLinkImage} from '../../Api/pathname'
import {UserLikeStore} from '../../Api/Api'

SwiperCore.use([Navigation, Pagination]);

export default class RestaurantSlide extends React.Component{    
    constructor(props) {
        super(props);
        this.state = {
            listRestaurant : null,
        }
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
                })
                )
        } else {
            notification.warning({
                message: 'Bạn vui lòng đăng nhập',
                description: 'Vui lòng bạn đăng nhập mới có thể yêu thích cửa hàng',
                placement: "bottomLeft",
                style: {textAlign: "left"}
            })
        }
    }

    ShowRestaurant = (list) => {

        const settings = {
            preloadImages: false,
            slidesPerView: 4,
            spaceBetween: 15,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: false,
           // pagination: {
            //    el: '.tc-pagination2',
            //    clickable: true,
             //   dynamicBullets: true,
           // },
            navigation: {
                nextEl: '.listing-carousel-button-next2',
                prevEl: '.listing-carousel-button-prev2',
              },
            breakpoints: {
                1650: {
                    slidesPerView: 4,
                    spaceBetween: 15,
                },
                1270: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                850: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                0: {
                    slidesPerView: 1,
                    spaceBetween: 15,
                }
            }
        }


        return(
           
            <Swiper {...settings}>
            {
                list && list.map((item,index)=> {
                    
                    return(
                        <SwiperSlide key={index}>
                        {/* listing-item  */}
                        <div className="listing-item listing_carditem">
                        <article className="geodir-category-listing fl-wrap">
                            <div className="geodir-category-img">
                            <div className="geodir-js-favorite_btn" onClick={() => this.LikeStore(item._id)}>
                                <i className="fal fa-heart" /><span>Yêu thích</span>
                                </div>
                            <Link href={`/${item.name_linkurl_store}/${item._id}`} >
                                <a className="geodir-category-img-wrap fl-wrap">
                                    <img src={ChangeLinkImage(item.list_images[0])}  /> 
                                </a>
                            </Link>
                            <div className="geodir_status_date gsd_open"><i className="fal fa-lock-open" />{item.time_open}</div>
                            <div className="geodir-category-opt">
                                <div className="geodir-category-opt_title">
                             <h4><Link href={`/${item.name_linkurl_store}/${item._id}`}><a className="nameStore"><span>{item.name.length > 30 ? item.name.slice(0, 30) + "..." : item.name}  
                                 {(item.partner != undefined  && item.partner.length > 0) &&<span class="verified-badge"><i class="fal fa-check"></i></span>}</span></a></Link>
                                
                             </h4>
                                <div className="geodir-category-location"><a href="#"><i className="fas fa-map-marker-alt" />  
                                {item.address.address_detail.length > 46 ? item.address.address_detail.slice(0,46) + "..." : item.address.address_detail}</a></div>
                                </div>
                                <div className="listing-rating-count-wrap">
                                <div className="review-score">{item.average_score_comment}</div>
                                <div className="listing-rating card-popup-rainingvis" data-starrating2={4} />
                                <br />
                                <div className="reviews-count">{item.list_comment_id.length} đánh giá</div>
                                </div>
                                <div className="listing_carditem_footer fl-wrap">
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
                                <a className="listing-item-category-wrap">
                                
                                    
                                </a>
                                
                                </div>
                            </div>
                            </div>
                        </article>
                        </div>
                        {/* listing-item end */} 
                    </SwiperSlide>
                    )
                })
            }
            <div className="listing-carousel-button listing-carousel-button-next2"><i className="fas fa-caret-right"></i></div>
                <div className="listing-carousel-button listing-carousel-button-prev2"><i className="fas fa-caret-left"></i></div>
        </Swiper>
        )
    }

    render(){
        const {listRestaurant} = this.props
        return(
            <section className="slw-sec" id="sec1">
                <div className="section-title">
                <h2>{this.props.title}</h2>
                    <div className="section-subtitle">Top restaurant</div>
                    <span className="section-separator" />
                    <p>{this.props.sub}</p>
                </div>
                <div className="listing-slider-wrap fl-wrap">
                    <div className="listing-slider fl-wrap">
                     
                    { this.ShowRestaurant(listRestaurant)}

                        <div className="tc-pagination_wrap">
                            <div className="tc-pagination2" />
                        </div>

                    </div>
                </div>
            </section>
           
        )
    }
}

