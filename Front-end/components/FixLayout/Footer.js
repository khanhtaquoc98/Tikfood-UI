import React from "react";

export default class Footer extends React.Component{

    render(){
        return(
            <footer className="main-footer fl-wrap">

            {/*footer-inner*/}
            <div className="footer-inner   fl-wrap">
                <div className="container">
                <div className="row">
                    {/* footer-widget*/}
                    <div className="col-md-4">
                    <div className="footer-widget fl-wrap">
                        <div className="footer-logo"><a href="index.html"><img src="/images/logo.png"  /></a></div>
                        <div className="footer-contacts-widget fl-wrap">
                        <p>Tikfood. </p>
                        <ul className="footer-contacts fl-wrap no-list-style">
                            <li><span><i className="fal fa-envelope" /> Mail :</span><a href="#" target="_blank">tikfood@gmail.ocm</a></li>
                            <li> <span><i className="fal fa-map-marker" /> Adress :</span><a href="#" target="_blank">UIT - ĐHQGHCM</a></li>
                            <li><span><i className="fal fa-phone" /> Phone :</span><a href="#">+84 934860931</a></li>
                        </ul>
                        <div className="footer-social">
                            <span>Tìm chúng tôi: </span>
                            <ul className="no-list-style">
                            <li><a href="#" target="_blank"><i className="fab fa-facebook-f" /></a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-twitter" /></a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-instagram" /></a></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* footer-widget end*/}
                    {/* footer-widget*
                    <div className="col-md-4">
                    <div className="footer-widget fl-wrap">
                        <h3>Our Last News</h3>
                        <div className="footer-widget-posts fl-wrap">
                        <ul className="no-list-style">
                            <li className="clearfix">
                            <a href="#" className="widget-posts-img"><img src="/images/all/4.jpg" className="respimg"  /></a>
                            <div className="widget-posts-descr">
                                <a href="#" >Vivamus dapibus rutrum</a>
                                <span className="widget-posts-date"><i className="fal fa-calendar" /> 21 Mar 09.05 </span> 
                            </div>
                            </li>
                            <li className="clearfix">
                            <a href="#" className="widget-posts-img"><img src="/images/all/2.jpg" className="respimg"  /></a>
                            <div className="widget-posts-descr">
                                <a href="#" > In hac habitasse platea</a>
                                <span className="widget-posts-date"><i className="fal fa-calendar" /> 7 Mar 18.21 </span> 
                            </div>
                            </li>
                            <li className="clearfix">
                            <a href="#" className="widget-posts-img"><img src="/images/all/7.jpg" className="respimg"  /></a>
                            <div className="widget-posts-descr">
                                <a href="#" >Tortor tempor in porta</a>
                                <span className="widget-posts-date"><i className="fal fa-calendar" /> 7 Mar 16.42 </span>
                            </div>
                            </li>
                        </ul>
                        <a href="blog.html" className="footer-link">Read all <i className="fal fa-long-arrow-right" /></a>
                        </div>
                    </div>
                    </div>
                    {/* footer-widget end*/}
                    {/* footer-widget  */}
                    <div className="col-md-4">
                  
                    </div>
                    {/* footer-widget end*/}
                </div>
                </div>
                {/* footer bg
                <div className="footer-bg"></div>*/}
                <div className="footer-wave">
                <svg viewBox="0 0 100 25">
                    <path fill="#fff" d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
                </svg>
                </div>
                {/* footer bg  end*/}
            </div>
            {/*footer-inner end */}
            {/*sub-footer*/}
            <div className="sub-footer  fl-wrap" >
                <div className="container" style={{paddingBottom: "1rem"}}>
                <div className="copyright"> © Tikfood 2020 .  All rights reserved.</div>
                <div className="lang-wrap">
                    
                </div>
                <div className="subfooter-nav">
                    <ul className="no-list-style">
                    <li><a href="#">Terms of use</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Blog</a></li>
                    </ul>
                </div>
                </div>
            </div>
            {/*sub-footer end */}
            </footer>

        )
    }
}