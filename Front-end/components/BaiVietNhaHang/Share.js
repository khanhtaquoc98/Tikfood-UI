import React from "react";
import * as Scroll from "react-scroll";
import { Link, Element, scroller } from "react-scroll";
import {
    FacebookIcon,
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TwitterShareButton,
    TwitterIcon,
  } from "react-share";

  import {notification} from 'antd'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import {UserLikeStore} from '../../Api/Api'

export default class Share extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            report: false,
            share: false,
        }
    }
    
    onClickReport = () => {
        this.setState({report: !this.state.report})
    }

    onClickShare = () => {
        this.setState({share: !this.state.share})
    }

    onClickEl = () => {
        scroller.scrollTo('danhgia', {
            duration: 1500,
            delay: 100,
            smooth: true,
            offset: 50
          })
    }

    LikeStore = (idStore) =>{
        //console.log(idStore)
        if(idStore != undefined)
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

    render(){
        const {isSticky, style, } = this.props

       if(this.props.query != undefined && this.props.Restaurant != undefined)
       var check = this.props.Restaurant.find(item => item._id == this.props.query.id)
       //console.log(check)
        return(
            <div className="scroll-nav-wrapper fl-wrap" style={{position: isSticky? style.position : "", top: isSticky == true ? 80 : 0, zIndex: '10' }}>
                <div className="container">
                    <nav className="scroll-nav scroll-init">
                    <ul className="no-list-style">
                        <li><Link activeClass="act-scrlink" spy={true} to="nhahang"  smooth={true} offset={-100}><i className="fal fa-images" /> Nhà hàng</Link></li>
                        <li><Link activeClass="act-scrlink" spy={true} to="hinhanh" smooth={true} offset={-150}><i className="fal fa-image" />Hình ảnh</Link></li>
                        <li><Link activeClass="act-scrlink" spy={true} to="uudai" smooth={true} offset={-150}><i className="fal fa-tags" />Ưu đãi</Link></li>
                        <li><Link activeClass="act-scrlink" spy={true} to="gioithieu" smooth={true} offset={-150}><i className="fal fa-info" />Giới thiệu</Link></li>
                        <li><Link activeClass="act-scrlink" spy={true} to="thucdon"  smooth={true} offset={-150}><i className="fal fa-utensils" />Thực đơn</Link></li>
                        <li><Link activeClass="act-scrlink" spy={true} to="danhgia"  smooth={true} offset={-150}><i className="fal fa-comments-alt" />Đánh giá</Link></li>
                    </ul>
                    </nav>
                    <div className="scroll-nav-wrapper-opt">
                    {(check != undefined && check.partner.length == 0) && <a className="scroll-nav-wrapper-opt-btn" target="_blank" href={`http://localhost:4000/checkstore/${this.props.query.id}`}> <i className="fas fa-check"> </i>Xác nhận sở hữu</a>}
                        <a className="scroll-nav-wrapper-opt-btn" onClick={() => this.LikeStore(this.props.query.id)}> <i className="far fa-heart"></i> Yêu thích </a>
                        <a className={`scroll-nav-wrapper-opt-btn showshare ${this.state.share ? "vis-butsh" : ""}`} onClick={() => this.onClickShare()}> <i className="fas fa-share"></i> Chia sẻ </a>
                   
                    <div className="share-holder hid-share ">
                         <div className={`share-container d-flex ${this.state.share ? "visshare" : "isShare" }`}>
                            <label style={{margin: "0 .2rem", lineHeight: "26px"}}>
                                <FacebookShareButton
                                 url={'https://foodreview.vercel.app/'+this.props.query.nameRestaurant + "/" + this.props.query.id}
                                className="Demo__some-network__share-button"
                            >
                                <FacebookIcon size={26} round></FacebookIcon>
                                </FacebookShareButton>
                            </label>
                            <label style={{margin: ".4rem .2rem"}}>
                                <FacebookMessengerShareButton
                                url={'https://foodreview.vercel.app/'+this.props.query.nameRestaurant + "/" + this.props.query.id}
                                appId="105584204499199"
                                className="Demo__some-network__share-button"
                                >
                                <FacebookMessengerIcon size={26} round></FacebookMessengerIcon>
                                </FacebookMessengerShareButton>
                            </label>
                        </div>
                    </div>
                    <div className="show-more-snopt" onClick={() => this.onClickReport()}><i className="fal fa-ellipsis-h" /></div>
                    <div className={`show-more-snopt-tooltip ${this.state.report == true ? 'show-more-snopt-tooltip_vis' : ''}`}>
                        <Link to="vietdanhgia" spy={true} to="danhgia"  smooth={true} >
                            <i className="fas fa-comment-alt" /> Đánh giá
                        </Link>
                    </div>
                    </div>
                </div>
                </div>
        )
    }
}