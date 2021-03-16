import React from "react";
import Head from 'next/head'
import Link from 'next/link'
import {StickyContainer, Sticky} from 'react-sticky'
var Scroll   = require('react-scroll');
var Element  = Scroll.Element;
var scroller = Scroll.scroller;
import $ from 'jquery'

export default class FAQ extends React.Component{

    componentDidMount(){
        $(".accordion a.toggle").on("click", function (a) {
            a.preventDefault();
            $(".accordion a.toggle").removeClass("act-accordion");
            if ($(this).next('div.accordion-inner').is(':visible')) {
                $(this).next('div.accordion-inner').slideUp();
            } else {
                $(".accordion a.toggle").next('div.accordion-inner').slideUp(); 
                $(this).addClass("act-accordion");
                $(this).next('div.accordion-inner').slideToggle();
            }
        });
    }

    onClickScroll = (name) => {
        scroller.scrollTo(name, {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: -100
          })
    }

    render(){
        return(
            <div id="wrapper">
                 <Head>
                    <title>FAQ - TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
                    <meta name="description" content="TikFood tìm nhà hàng online nhanh chóng và kèm nhiều ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:description" content="Đặt bàn nhà hàng trực tuyến. Gọi ngay tổng đài >> 1900 6005 để nhận được hỗ trợ đặt bàn PasGo, đặt chỗ nhà hàng online kèm ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:image" content="https://storage.googleapis.com/finalprojectuit/bg.jpg"></meta>
                    </Head>
                {/* content*/}
                <div className="content">
                    {/*  section  */}
                    <section className="parallax-section single-par" data-scrollax-parent="true">
                    <div className="bg par-elem " style={{backgroundImage: "url(/images/bg/18.jpg)"}} data-scrollax="properties: { translateY: '30%' }" />
                    <div className="overlay op7" />
                    <div className="container">
                        <div className="section-title center-align big-title">
                        <h2><span>Câu hỏi thường gặp</span></h2>
                        <span className="section-separator" />
                        <div className="breadcrumbs fl-wrap"><a href="#">Trang chủ</a><span>Câu hỏi thường gặp</span></div>
                        </div>
                    </div>
                    <div className="header-sec-link">
                        <a href="#sec1" className="custom-scroll-link"><i className="fal fa-angle-double-down" /></a> 
                    </div>
                    </section>
              
                    <StickyContainer className="gray-bg" style={{paddingBottom: "5rem"}}>
                    <div className="container">
                        <div className="section-title"  style={{marginTop: "2rem"}}>
                        <h2>Câu hỏi thường gặp  </h2>
                        <div className="section-subtitle">Popular Questions</div>
                        <span className="section-separator" />
                       <p>Hy vọng các chia sẻ này mang lại giá trị hữu ích cho quý vị thật nhiều!</p>
                        </div>
                        <div className="post-container fl-wrap">
                        <div className="row">
                            {/* blog content*/}
                            <div className="col-md-3">
                            <Sticky topOffset={300} bottomOffset={400}   >
                            {
                                ({ style, distanceFromTop}) => 
                                <div className="faq-nav help-bar" style={{position: distanceFromTop > -1597 ? style.position : 'absolute', top: distanceFromTop > -1597 ? '86px' : '1120px', transform: style.transform, width: style.width}}>
                                    <ul className="no-list-style">
                                        <li>
                                            <a onClick={ () => this.onClickScroll('user')}>
                                            <i className="fal fa-space-shuttle" />
                                            <span>Khách hàng</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={ () => this.onClickScroll('restaurant')}>
                                            <i className="fal fa-cart-arrow-down" />
                                            <span>Đối tác</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>}
                            </Sticky>
                            </div>
                            
                            {/* blog conten end*/}
                            {/* blog sidebar */}
                            <div className="col-md-9">
                            {/* faq-section */}
                            <Element name='user' className="faq-title faq-title_first fl-wrap">Các câu hỏi thường gặp dành cho thực khách</Element>
                            <div  className="faq-section fl-wrap" >
                                {/* accordion*/}
                                <div className="accordion">
                                <a className="toggle ">Đăng ký thành viên TikFood như thế nào?<span /></a>
                                <div className="accordion-inner ">
                                    <p>Để đăng kí thành viên TikFood, Anh/Chị vui lòng chọn tài khoản và chuyển sang đăng ký. Tất cả đều hoàn toàn miễn phí.</p>
                                </div>
                                <a className="toggle">Tôi muốn sửa thông tin đặt bàn thì phải làm sao? <span /></a>
                                <div className="accordion-inner">
                                    <p>Để đổi thông tin đặt bàn thì Anh/Chị có thể vui lòng liên hệ với fanpage để được đổi thông tin ạ.</p>
                                </div>
                                <a className="toggle"> Tôi quên mật khẩu đăng nhập thì phải làm sao ?<span /></a>
                                <div className="accordion-inner">
                                    <p>Đối với trường hợp Anh/Chị quên mật khẩu thì Anh/Chị vui chọn vào đăng nhập và nhấn vào quyên mật khẩu. Sau đó nhập vào email đăng ký. Và bạn sẽ nhận được email đổi lại mật khẩu.</p>
                                </div>
                                </div>
                                {/* accordion end */}                                               
                            </div>
                            {/* faq-section end */}
                            {/* faq-section */}
                            <Element name='restaurant' className="faq-title fl-wrap">Các câu hỏi thường gặp dành cho Đối tác</Element>
                            <div className="faq-section fl-wrap" id="fq2">
                                {/* accordion*/}
                                <div className="accordion">
                                <a className="toggle">Lợi ích của đối tác là gì ?<span /></a>
                                <div className="accordion-inner">
                                    <p>Nếu Anh/Chị là đối tác với TikFood thì sẽ được nhiều người biết đến, chỉnh sửa nội dung của cửa hàng cũng như theo dõi được thông tin đặt bàn từ người sử dụng.</p>
                                </div>
                               
                                </div>
                                <div className="accordion">
                                <a className="toggle">Đăng ký làm đối tác thì liên hệ ai?<span /></a>
                                <div className="accordion-inner">
                                    <p>Anh/Chị vui lòng liện hệ email của TikFood (tikfood@gmail.com) để biết thêm chi tiết đăng ký đối tác.</p>
                                </div>
                               
                                </div>
                                {/* accordion end */}                                               
                            </div>
                            {/* faq-section end */}
                           
                          
                            </div>
                            {/* blog sidebar end */}
                        </div>
                        </div>
                    </div>
                    </StickyContainer>
                    <div className="limit-box fl-wrap" />
                </div>
                {/*content end*/}
                </div>

        )
    }
}