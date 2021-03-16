import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay} from 'swiper';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default class Banner extends React.Component {

    render(){
        const settings = {
            preloadImages: false,
            freeMode: false,
            slidesPerView: 5,
            spaceBetween: 10,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            navigation: {
                nextEl: '.cc-next',
                prevEl: '.cc-prev',
            },
            breakpoints: {
                1064: {
                    slidesPerView: 5,
                },
                768: {
                    slidesPerView: 3,
                },
                520: {
                    slidesPerView: 2,
                }, 0: {slidesPerView: 1}
            }
        }
        return(
            <section className="gray-bg">
            <div className="container">
                <div className="clients-carousel-wrap fl-wrap">
                <div className="cc-btn cc-prev"><i className="fal fa-angle-left" /></div>
                <div className="cc-btn cc-next"><i className="fal fa-angle-right" /></div>
                <div className="clients-carousel">
                    <Swiper {...settings} autoplay={true}>
                        <SwiperSlide>
                        <div className="swiper-slide">
                        <a href="#" className="client-item"><img src="https://pasgo.vn/Upload/anh-doi-tac/redsun-2769645304.jpg"  /></a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="swiper-slide">
                        <a href="#" className="client-item"><img src="https://pasgo.vn/Upload/anh-doi-tac/golden-gate-2769727305.jpg"  /></a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="swiper-slide">
                        <a href="#" className="client-item"><img src="https://pasgo.vn/Upload/anh-doi-tac/the-gioi-hai-san-276975167.jpg"  /></a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="swiper-slide">
                        <a href="#" className="client-item"><img src="https://pasgo.vn/Upload/anh-doi-tac/hai-san-bien-dong-276997071.jpg"  /></a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="swiper-slide">
                        <a href="#" className="client-item"><img src="https://pasgo.vn/Upload/anh-doi-tac/food-cente-2770729315.jpg"  /></a>
                        </div>
                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="swiper-slide">
                        <a href="#" className="client-item"><img src="https://pasgo.vn/Upload/anh-doi-tac/nijyumaru-2770499311.jpg"  /></a>
                        </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="cc-btn cc-prev"><i className="fal fa-angle-left" /></div>
                <div className="cc-btn cc-next"><i className="fal fa-angle-right" /></div>
                </div>
            </div>
            </section>
            
            )
    }
}