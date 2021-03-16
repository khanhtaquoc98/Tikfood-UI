import React from "react";
import Skeleton from 'react-loading-skeleton';
import Lightbox from 'react-image-lightbox';
import {ChangeLinkImage} from '../../Api/pathname'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination} from 'swiper';

SwiperCore.use([Navigation, Pagination]);

export default class ListImage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            isOpen: false,
          };
    }

    LightboxImage = (url, listImages) => {
        this.setState({photoIndex: listImages.indexOf(url), isOpen: true})
    }
    

    ShowListImage = (listImages) => {
        const { photoIndex, isOpen } = this.state;

        const settings = {
            preloadImages: false,
            freeMode: true,
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
           centeredSlides: true,
            grabCursor: true,
            mousewheel: true,
          // observer: true,
            //observeParents: true,
            navigation: {
                nextEl: '.sc-next',
                prevEl: '.sc-prev',
            },
        }

        return(
            <>
            {isOpen && (
            <Lightbox
                mainSrc={ChangeLinkImage(listImages[photoIndex])}
                nextSrc={listImages[(photoIndex + 1) % listImages.length]}
                prevSrc={listImages[(photoIndex + listImages.length - 1) % listImages.length]}
                onCloseRequest={() => this.setState({ isOpen: false })}
                onMovePrevRequest={() =>
                this.setState({
                    photoIndex: (photoIndex + listImages.length - 1) % listImages.length,
                })
                }
                onMoveNextRequest={() =>
                this.setState({
                    photoIndex: (photoIndex + 1) % listImages.length,
                })
                }
            />
            )}

            <Swiper {...settings} className="single-carousel fl-wrap full-height">
            {
                listImages.map((item, index) => {
                    return(
                        <SwiperSlide key={index}>
                        <div className="swiper-slide">
                            <div className="box-item">
                            <img style={{height: '300px!important'}}  src={ChangeLinkImage(item)} />
                            <a  className="gal-link popup-image" onClick={() => this.LightboxImage(item, listImages)}><i className="fa fa-search"></i></a>
                            </div>
                        </div>
                    </SwiperSlide>
                    )
                })
            }
            <div className="sc-next sc-btn color2-bg"><i className="fas fa-caret-right" /></div>
            <div className="sc-prev sc-btn color2-bg"><i className="fas fa-caret-left" /></div>
           
        </Swiper></>)
    }

    render(){
        const {Restaurant} = this.props;

        if(Restaurant != undefined){
            if(Restaurant.length > 1)
            {
                return(
                    <div className="list-single-main-item fl-wrap block_box" name="hinhanh">
                    <div className="list-single-main-item-title">
                    <h3>Hình ảnh</h3>
                    </div>
                    <div className="list-single-main-item_content fl-wrap">
                    <div className="single-carousel-wrap fl-wrap lightgallery">
                        {this.ShowListImage(Restaurant[0].list_images)}
                    </div>
                    </div>
                </div>
                )
            } else {
                return(
                    <div className="list-single-main-item fl-wrap block_box" name="hinhanh">
                    <div className="list-single-main-item-title">
                    <h3>Hình ảnh</h3>
                    </div>
                    <div className="list-single-main-item_content fl-wrap">
                    <div className="single-carousel-wrap fl-wrap lightgallery lightgallery">
                            {this.ShowListImage(Restaurant[0].list_images)}
                    </div>
                    </div>
                </div>
                )
            }
            
        } else 
        return(
            <div className="list-single-main-wrapper fl-wrap" name="hinhanh">                   
                <div className="list-single-main-item fl-wrap block_box">
                    <div className="list-single-main-item-title">
                    <h3><Skeleton width={"30%"}/></h3>
                    </div>
                    <div className="list-single-main-item_content fl-wrap">
                    <p><Skeleton/></p>
                    <p><Skeleton/></p>
                    <p><Skeleton/></p>
                    </div>
                </div>
            </div>
        )
    }

}