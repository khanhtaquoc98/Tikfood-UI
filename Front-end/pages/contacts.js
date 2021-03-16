import React from "react";
import Head from 'next/head'
import Link from 'next/link'

export default class About extends React.Component{
    
    render(){
        return(
          <div id="wrapper">
                <Head>
                    <title>Liên hệ - TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
                    <meta name="description" content="TikFood tìm nhà hàng online nhanh chóng và kèm nhiều ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:description" content="Đặt bàn nhà hàng trực tuyến. Gọi ngay tổng đài >> 1900 6005 để nhận được hỗ trợ đặt bàn PasGo, đặt chỗ nhà hàng online kèm ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:image" content="https://storage.googleapis.com/finalprojectuit/bg.jpg"></meta>
                    </Head>
            {/* content*/}
            <div className="content">
                {/*  section  */}
                <section className="parallax-section single-par" data-scrollax-parent="true">
                <div className="bg par-elem " style={{backgroundImage: "url(/images/bg/19.jpg)"}} data-scrollax="properties: { translateY: '30%' }" />
                <div className="overlay op7" />
                <div className="container">
                    <div className="section-title center-align big-title">
                    <h2><span>Liên hệ</span></h2>
                    <span className="section-separator" />
                    <div className="breadcrumbs fl-wrap"><a href="/">Trang chủ</a><span>Liên hệ</span></div>
                    </div>
                </div>
                <div className="header-sec-link">
                    <a href="#sec1" className="custom-scroll-link"><i className="fal fa-angle-double-down" /></a> 
                </div>
                </section>
                {/*  section  end*/}               
                {/*  section  */}
                <section id="sec1" data-scrollax-parent="true">
                <div className="container">
                    {/*about-wrap */}
                    <div className="about-wrap">
                    <div className="row">
                        <div className="col-md-4">
                        <div className="ab_text-title fl-wrap">
                            <h3>Thông tin liên hệ</h3>
                            <span className="section-separator fl-sec-sep" />
                        </div>
                        {/*box-widget-item */}                                       
                        <div className="box-widget-item fl-wrap block_box">
                            <div className="box-widget">
                            <div className="box-widget-content bwc-nopad">
                                <div className="list-author-widget-contacts list-item-widget-contacts bwc-padside">
                                <ul className="no-list-style">
                                    <li><span><i className="fal fa-map-marker" /> Địa chỉ :</span><a className="custom-scroll-link">ĐH Công Nghệ Thông Tin TP.HCM</a></li>
                                    <li><span><i className="fal fa-phone" /> SĐT :</span> <a href="#">+84 93486 0931</a></li>
                                    <li><span><i className="fal fa-envelope" /> Mail :</span> <a href="#">thanhtin@gmail.com.com</a></li>
                                </ul>
                                </div>
                                {/**
                                <div className="list-widget-social bottom-bcw-box  fl-wrap">
                                <ul className="no-list-style">
                                    <li><a href="#" target="_blank"><i className="fab fa-facebook-f" /></a></li>
                                    <li><a href="#" target="_blank"><i className="fab fa-twitter" /></a></li>
                                    <li><a href="#" target="_blank"><i className="fab fa-vk" /></a></li>
                                    <li><a href="#" target="_blank"><i className="fab fa-instagram" /></a></li>
                                </ul>
                                </div> */}
                            </div>
                            </div>
                        </div>
                        {/*box-widget-item end */}  
                        {/*box-widget-item 
                        <div className="box-widget-item fl-wrap" style={{marginTop: 20}}>
                            <div className="banner-wdget fl-wrap">
                            <div className="overlay op4" />
                            <div className="bg" data-bg="images/bg/18.jpg" />
                            <div className="banner-wdget-content fl-wrap">
                                <h4>Participate in our loyalty program. Refer a friend and get a discount.</h4>
                                <a href="#" className="color-bg">Read more</a>
                            </div>
                            </div>
                        </div>*/}
                        {/*box-widget-item end */}                                            
                        </div>
                        <div className="col-md-8">
                        <div className="ab_text">
                            <div className="ab_text-title fl-wrap">
                            <h3>Liên hệ</h3>
                            <span className="section-separator fl-sec-sep" />
                            </div>
                            <p>Nếu bạn có thắc mắc trong quá trình sử dụng trang web, mời bạn liên lạc cho chúng tôi theo địa chỉ dưới đây. Các chuyên viên tư vấn của PasGo sẽ trả lời bạn trong vòng 24 giờ.</p>
                            <div id="contact-form">
                            <div id="message" />
                            <form className="custom-form" action="http://townhub.kwst.net/php/contact.php" name="contactform" id="contactform">
                                <fieldset>
                                <label ><i className="fal fa-user" /></label>
                                <input type="text" name="name" id="name" placeholder="Tên của bạn" style={{marginBottom: "8px"}} />
                                <div className="clearfix" />
                                <label ><i className="fal fa-envelope" /></label>
                                <input type="text" name="email" id="email" placeholder="Email của bạn"  style={{marginBottom: "8px"}}/>
                                <textarea name="comments" id="comments" cols={40} rows={3} placeholder="Lời nhắn của bạn....."  style={{marginBottom: "8px"}}/>
                                </fieldset>
                                <button className="btn float-btn color2-bg" id="submit">Gửi thông tin<i className="fal fa-paper-plane" /></button>
                            </form>
                            </div>
                            {/* contact form  end*/} 
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* about-wrap end  */} 
                </div>
                </section>
           
            </div>
            {/*content end*/}
            </div>

        )
    }
}