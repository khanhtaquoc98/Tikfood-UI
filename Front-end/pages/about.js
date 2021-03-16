import React from "react";
import Head from 'next/head'
var Scroll   = require('react-scroll');
var Element  = Scroll.Element;
var scroller = Scroll.scroller;

export default class About extends React.Component{

    render(){
        return(
           <div id="wrapper">
                 <Head>
                    <title>Về chúng tôi - TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
                    <meta name="description" content="TikFood tìm nhà hàng online nhanh chóng và kèm nhiều ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:description" content="Đặt bàn nhà hàng trực tuyến. Gọi ngay tổng đài >> 1900 6005 để nhận được hỗ trợ đặt bàn PasGo, đặt chỗ nhà hàng online kèm ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:image" content="https://storage.googleapis.com/finalprojectuit/bg.jpg"></meta>
                    </Head>
                {/* content*/}
                <div className="content">
                    <div className="page-scroll-nav">
                    <nav className="scroll-init color2-bg">
                        <ul className="no-list-style">
                        <li><a className="act-scrlink tolt" href="#sec1" data-microtip-position="left" data-tooltip="Câu chuyện"><i className="fal fa-building" /></a></li>
                        
                        <li><a href="#sec3" className="tolt" data-microtip-position="left" data-tooltip="Chúng tôi"><i className="far fa-users-crown" /></a></li>
                        <li><a href="#sec4" className="tolt" data-microtip-position="left" data-tooltip="Tại sao chọn?"><i className="fal fa-user-astronaut" /></a></li>
                        </ul>
                    </nav>
                    </div>
                    {/*  section  */}
                    <section className="parallax-section single-par" data-scrollax-parent="true">
                    <div className="bg par-elem " style={{backgroundImage: "url(/images/bg/6.jpg)"}} data-scrollax="properties: { translateY: '30%' }" />
                    <div className="overlay op7" />
                    <div className="container">
                        <div className="section-title center-align big-title">
                        <h2><span>Về chúng tôi</span></h2>
                        <span className="section-separator" />
                        <div className="breadcrumbs fl-wrap"><a href="/">Trang chủ</a><span>Về chúng tôi</span></div>
                        </div>
                    </div>
                    <div className="header-sec-link">
                        <a href="#sec1" className="custom-scroll-link"><i className="fal fa-angle-double-down" /></a> 
                    </div>
                    </section>
                    {/*  section  end*/}
                    <section id="sec1" data-scrollax-parent="true">
                    <div className="container">
                        <div className="section-title">
                        <h2> TikFood là gì ?</h2>
                        <div className="section-subtitle">TikFood</div>
                        <span className="section-separator" />
                        </div>
                        {/*about-wrap */}
                        <div className="about-wrap">
                        <div className="row">
                            <div className="col-md-6">
                            <div className="list-single-main-media fl-wrap" style={{boxShadow: '0 9px 26px rgba(58, 87, 135, 0.2)'}}>
                                <img src="./images/all/55.jpg" className="respimg"  />
                                {/*<a href="https://vimeo.com/70851162" className="promo-link   image-popup"><i className="fal fa-video" /><span>Our Story</span></a>*/}
                            </div>
                            </div>
                            <div className="col-md-6">
                            <div className="ab_text">
                                <div className="ab_text-title fl-wrap">
                                <h3>Câu chuyện của chúng tôi</h3>
                                <span className="section-separator fl-sec-sep" />
                                </div>
                                <p>
                                Được xây dựng từ cuối năm 2020 tại TP. HCM, Việt Nam, TikFood là cộng đồng tin cậy cho mọi người có thể tìm kiếm, đánh giá, bình luận các địa điểm ăn uống: nhà hàng, quán ăn, cafe, bar, karaoke, tiệm bánh, khu du lịch... tại thành phố Hồ Chí Minh - từ website. Tất cả thành viên từ Bắc đến Nam, Foody kết nối những thực khách đến với các địa điểm ăn uống lớn nhỏ trên thành phố.
                                </p>
                                <p>Đến thời điểm hiện tại, TikFood với hàng trăm ngàn địa điểm và hàng trăm ngàn bình luận, hình ảnh tại Hồ Chí Minh. TikFood là cách dễ nhất để bạn có thể tìm kiếm và lựa chọn địa điểm tốt nhất cho mình và bạn bè.</p>
                                <a href="#sec3" className="btn color2-bg float-btn custom-scroll-link">Chúng tôi <i className="fal fa-users" /></a>
                            </div>
                            </div>
                        </div>
                        </div>
                        {/* about-wrap end  */} 
                        <span className="fw-separator" />
                        <div className=" single-facts bold-facts fl-wrap">
                         {/* inline-facts */}
              <div className="inline-facts-wrap">
                  <div className="inline-facts">
                  <div className="milestone-counter">
                      <div className="stats animaper">
                      <div className="num" data-content={0} data-num={1254}>1254</div>
                      </div>
                  </div>
                  <h6>Lượt truy cập mỗi tuần</h6>
                  </div>
              </div>
              {/* inline-facts end */}
              {/* inline-facts  */}
              <div className="inline-facts-wrap">
                  <div className="inline-facts">
                  <div className="milestone-counter">
                      <div className="stats animaper">
                      <div className="num" data-content={0} data-num={12168}>12168</div>
                      </div>
                  </div>
                  <h6>Số khách hàng mỗi năm</h6>
                  </div>
              </div>
              {/* inline-facts end */}
              {/* inline-facts  */}
              <div className="inline-facts-wrap">
                  <div className="inline-facts">
                  <div className="milestone-counter">
                      <div className="stats animaper">
                      <div className="num" data-content={0} data-num={2172}>2172</div>
                      </div>
                  </div>
                  <h6>Nhà hàng có mặt trên TikFood</h6>
                  </div>
              </div>
              {/* inline-facts end */}
              {/* inline-facts  */}
              <div className="inline-facts-wrap">
                  <div className="inline-facts">
                  <div className="milestone-counter">
                      <div className="stats animaper">
                      <div className="num" data-content={0} data-num={732}>732</div>
                      </div>
                  </div>
                  <h6>Người tương tác mỗi tuần</h6>
                  </div>
              </div>
              {/* inline-facts end */}
                        </div>
                    </div>
                    </section>
                  
                    {/*section */}  
                    <section id="sec3">
                    <div className="container">
                        <div className="section-title">
                        <h2> Chúng tôi</h2>
                        <div className="section-subtitle">the crew</div>
                        <span className="section-separator" />
                        </div>
                        <div className="about-wrap team-box2 fl-wrap justify-content-center">
                        {/* team-item */}
                        {/* team-item  end*/}
                        {/* team-item */}
                        <div className="team-box">
                            <div className="team-photo">
                            <img src="https://scontent.fvca1-2.fna.fbcdn.net/v/t1.0-1/p200x200/134707745_1567678440107013_3888696964469539133_o.jpg?_nc_cat=104&ccb=2&_nc_sid=7206a8&_nc_ohc=1qzG_YGVS_oAX9VPrLN&_nc_ht=scontent.fvca1-2.fna&tp=6&oh=90831b7cf8e72dd5f610969f432e3187&oe=60205F8E"  className="respimg" />
                            </div>
                            <div className="team-info fl-wrap">
                            <h3><a href="https://www.facebook.com/thanhtin.isme/" target="_blank">Dương Thạnh Tín</a></h3>
                            <h4>Backend Developer</h4>
                            <p>Sinh viên khoa Công Nghệ Phần Mềm khoá 2016.</p>
                            <div className="team-social">
                                <ul className="no-list-style">
                                <li><a href="https://www.facebook.com/thanhtin.isme/" target="_blank"><i className="fab fa-facebook-f" /></a></li>
                                <li><a href="#" target="_blank"><i className="fab fa-instagram" /></a></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        {/* team-item end  */}
                        {/* team-item */}
                        <div className="team-box">
                            <div className="team-photo">
                            <img src="https://scontent.fsgn1-1.fna.fbcdn.net/v/t31.0-8/30420127_763589353848866_8529487963853037883_o.jpg?_nc_cat=106&cb=846ca55b-311e05c7&ccb=2&_nc_sid=09cbfe&_nc_ohc=Cdv22CyGizgAX-3uAYl&_nc_ht=scontent.fsgn1-1.fna&oh=3c79f828ca23a1c01234835496a4fdbb&oe=60222460"  className="respimg" />
                            </div>
                            <div className="team-info fl-wrap">
                            <h3><a href="https://www.facebook.com/khanhtaquoc98/" target="_blank">Tạ Quốc Khánh</a></h3>
                            <h4>Frontend Developer</h4>
                            <p>Sinh viên khoa Công Nghệ Phần Mềm khoá 2016.</p>
                            <div className="team-social">
                                <ul className="no-list-style">
                                <li><a href="https://www.facebook.com/khanhtaquoc98/" target="_blank"><i className="fab fa-facebook-f" /></a></li>
                                <li><a href="#" target="_blank"><i className="fab fa-instagram" /></a></li>
                                </ul>
                            </div>
                            </div>
                        </div>
                        {/* team-item end  */}
                        </div>
                    </div>
                   						
                    </section>
                    {/*section end*/}  
                  
                    {/*section  */}  
                    <section className="parallax-section" data-scrollax-parent="true" id="sec4">
                    <div className="bg par-elem " style ={{backgroundImage: "url(/images/bg/6.jpg)"}} data-scrollax="properties: { translateY: '30%' }" />
                    <div className="overlay op7" />
                    {/*container*/}
                    <div className="container">
                        <div className="section-title center-align big-title">
                        <h2><span>Tại sao chọn chúng tôi</span></h2>
                        <span className="section-separator" />
                        </div>
                    </div>
                    </section>
                    {/*section end*/}  
                    {/*section  */}  
                    <section className="gray-bg absolute-wrap_section">
                    <div className="container">
                        <div className="absolute-wrap fl-wrap">
                        {/* features-box-container */} 
                        <div className="features-box-container fl-wrap">
                            <div className="row">
                            {/*features-box */} 
                            <div className="col-md-4">
                                <div className="features-box">
                                <div className="time-line-icon">
                                    <i className="fal fa-headset" />
                                </div>
                                <h3>Chat bot</h3>
                                <p>Hỗ trợ tư vấn địa điểm quán ăn 24/24.  </p>
                                </div>
                            </div>
                            {/* features-box end  */} 
                            {/*features-box */} 
                            <div className="col-md-4">
                                <div className="features-box gray-bg">
                                <div className="time-line-icon">
                                <i className="fal fa-store"></i>
                                </div>
                                <h3>Địa điểm quán ăn đa dạng</h3>
                                <p>Có hơn 1800 quán ăn trên thành phố Hồ Chí Minh</p>
                                </div>
                            </div>
                            {/* features-box end  */} 
                            {/*features-box */} 
                            <div className="col-md-4">
                                <div className="features-box ">
                                <div className="time-line-icon">
                                <i className="fal fa-comment-smile"></i>
                                </div>
                                <h3>Đánh giá từ người sử dụng</h3>
                                <p>Dữ liệu đánh giá qua nhiều tiêu chí khác nhau.</p>
                                </div>
                            </div>
                            {/* features-box end  */}  
                            </div>
                        </div>
                        {/* features-box-container end  */}                             
                        </div>
                        <div className="section-separator" />
                    </div>
                    </section>
                    {/*section end*/}  
                </div>
                {/*content end*/}
                </div>

        )
    }

}