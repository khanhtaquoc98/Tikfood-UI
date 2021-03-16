
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination} from 'swiper';

SwiperCore.use([Navigation, Pagination]);

export default class Banner extends React.Component {

    constructor(props) {
      super(props);
      
    }

    render(){
        const settings = {
            preloadImages: false,
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: true,
        
            navigation: {
                nextEl: '.listing-carousel-button-next',
                prevEl: '.listing-carousel-button-prev',
            },
            breakpoints: {
                1064: {
                    slidesPerView: 3,
                },
                640: {
                    slidesPerView: 2,
                },
                0: {
                    slidesPerView: 1,
                }
            }
        }
        return(
            <section>
            <div className="container">
                <div className="section-title">
                <h2>TikFood với Khách hàng</h2>
                <div className="section-subtitle">Clients Reviews</div>
                <span className="section-separator" />
                </div>
            </div>
            <div className="clearfix" />

            <div className="testimonilas-carousel-wrap fl-wrap">
                <div className="listing-carousel-button listing-carousel-button-next"><i className="fas fa-caret-right" /></div>
                <div className="listing-carousel-button listing-carousel-button-prev"><i className="fas fa-caret-left" /></div>
                <div className="testimonilas-carousel">
                    <Swiper {...settings}>
                        <SwiperSlide>
                            <div className="swiper-slide">
                            <div className="testi-item fl-wrap">
                            <div className="testi-avatar"><img src="https://storage.googleapis.com/projectfinaluit-bucket/31948089_114330646105050_6859167504489512960_n.jpg"  /></div>
                            <div className="testimonilas-text fl-wrap">
                            <div className="listing-rating"  ></div>
                                <p>"Tôi thường xuyên phải đi kí kết hợp đồng với các đối tác. Từ ngày có TikFood tôi tiết kiệm được khá nhiều thời gian cho việc chọn địa điểm."</p>
                                <div className="testimonilas-avatar fl-wrap">
                                <h3>Huỳnh Quang Tín</h3>
                                <h4>CEO Food Delivery</h4>
                                </div>
                            </div>
                            </div>
                            </div>
                        </SwiperSlide>
                                
                        <SwiperSlide>
                            <div className="swiper-slide">
                            <div className="testi-item fl-wrap">
                            <div className="testi-avatar"><img src="https://pasgo.vn/Assets/Images/KhachHang/Hoang-Van-Đoan.png"/></div>
                            <div className="testimonilas-text fl-wrap">
                            <div className="listing-rating"  ></div>
                                <p>"Tôi thường xuyên phải sử dụng taxi khi đi công trình ở các tỉnh thành vì thế vấn đề chi phí là vấn đề tôi quan tâm hàng đầu. Với TikFood, tôi có thể đi taxi với giá phải chăng,vừa tiết kiệm lại an toàn."</p>
                                <div className="testimonilas-avatar fl-wrap">
                                <h3>Hoàng Văn Đoàn</h3>
                                <h4>Kỹ sư xây dựng Delta</h4>
                                </div>
                            </div>
                            </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className="swiper-slide">
                            <div className="testi-item fl-wrap">
                            <div className="testi-avatar"><img src="https://pasgo.vn/Assets/Images/KhachHang/NGUYỄN-TÀI-TUỆ.png"  /></div>
                            <div className="testimonilas-text fl-wrap">
                            <div className="listing-rating"  ></div>
                                <p>"Tôi đánh giá TikFood là một ứng dụng ưu việt tại Việt Nam. Nhờ TikFood, tôi có thể tiết kiệm được khoản tiền khá lớn khi tổ chức ăn liên hoan cho công ty tại các nhà hàng sang trọng."</p>
                                <div className="testimonilas-avatar fl-wrap">
                                <h3>Nguyễn Tài Tuệ</h3>
                                <h4>GĐ Clecard Việt Nam</h4>
                                </div>
                            </div>
                            </div>
                            </div>
                        </SwiperSlide>

                       
                        <SwiperSlide>
                            <div className="swiper-slide">
                            <div className="testi-item fl-wrap">
                            <div className="testi-avatar"><img src="https://pasgo.vn/Assets/Images/KhachHang/Hoàng-Thu-Thủy.png"  /></div>
                            <div className="testimonilas-text fl-wrap">
                                
                            <div className="listing-rating"  ></div>
                                
                                <p>"Tôi thường xuyên phải đi công tác để thu thập số liệu vì đặc thù công việc. Nhờ ứng dụng TikFood, tôi có thể đến những nhà hàng sang trọng, nơi vui chơi giải trí mà không lo việc phải trả những chi phí đắt đỏ."</p>
                                <div className="testimonilas-avatar fl-wrap">
                                <h3>Hoàng Thu Thủy</h3>
                                <h4>Vietnam Airlines</h4>
                                </div>
                            </div>
                            </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <div className="tc-pagination" />
                </div>
            </div>

            
            <div className="waveWrapper waveAnimation">
                <div className="waveWrapperInner bgMiddle">
                <div className="wave-bg-anim waveMiddle" style={{backgroundImage: 'url("images/wave-top.png")'}} />
                </div>
                <div className="waveWrapperInner bgBottom">
                <div className="wave-bg-anim waveBottom" style={{backgroundImage: 'url("images/wave-top.png")'}} />
                </div>
            </div> 						
            </section>
            
        )
    }
}