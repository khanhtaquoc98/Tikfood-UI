import React from "react";
import Link from "next/link"
import Router from 'next/router'

import Cookies from 'universal-cookie';
const cookies = new Cookies();
import ClickAwayListener from 'react-click-away-listener';
import {GetUserWToken, GetLikeStoreforUser, GetCategory} from "../../Api/Api"
import Login from './Login';

export default class Header extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            isClickUser: false,
            isClickWishList: false,
            isClickSearch: false,
            User: undefined,
            isClickLogin: false,
            ListLikeStore: undefined,
            ListCategory: undefined,
            TextSearch: '',
        }
    }
    

    componentDidMount(){
        GetCategory().then(res => this.setState({ListCategory: res.list_category}))
        this.isLogin()
    }

    isLogin = () => {
        if(cookies.get('user') != undefined){
            GetUserWToken(cookies.get('user')).then(res => {
              //  console.log(res)
                if(res.user.active == 0){
                    Router.push("/mail-active")
                } else {
                    this.setState({User : res.user, isLogin: true})
                    GetLikeStoreforUser(cookies.get('user')).then(res => this.setState({ListLikeStore: res.user}))
                }
            })
            
        } 
        else this.setState({isLogin: false})
    }

    LogOut = () => {
        cookies.remove('user', { path: '/' });
        
        //console.log(cookies.get('user'))
        this.isLogin()
        Router.reload();
    }

    handleClickUser = () => {
        this.setState({isClickUser: !this.state.isClickUser})
    }

    handleClickWishList = () => {
        this.setState({isClickWishList: !this.state.isClickWishList})
        GetLikeStoreforUser(cookies.get('user')).then(res => this.setState({ListLikeStore: res.user}))
    }

    handleClickOutSideWishList = () => {
        if(this.state.isClickWishList == true)
        {
            this.setState({isClickWishList: false})
        }
    }

    handleClickLogin = () => {
        this.setState({isClickLogin: !this.state.isClickLogin})
    }

    handleClickSearch = () => {
        this.setState({isClickSearch: !this.state.isClickSearch})
    }

    showName  = ()=> {
        const {User} = this.state;
        if(User != undefined){
            if(User.fullname == "Chưa cập nhật"){
                return(
                    <div  className={`header-user-name ${this.state.isClickUser ? "hu-menu-visdec" : ""}`}>
                    <span><img src={User.avatar == "Chưa cập nhật" ? "/images/avatar/avatar-bg.png" : User.avatar }  /></span>
                    Chào, {User.email.length > 14 ? User.email.slice(0,14) + "..." : User.email}
                    </div>
                )
            } else {
                return(
                    <div  className={`header-user-name ${this.state.isClickUser ? "hu-menu-visdec" : ""}`}>
                    <span><img src={User.avatar == "Chưa cập nhật" ? "/images/avatar/avatar-bg.png" : User.avatar }  /></span>
                    Chào, {User.fullname.length > 14 ? User.fullname.slice(0,14) + "..." : User.fullname}
                    </div>
                )
            }
        }
    }

    showUser = () => {
        if(this.state.isLogin && this.state.User != undefined){
            const {User} = this.state
            return(
                <>
                 <div className={`cart-btn show-header-modal ${this.state.isClickWishList ? "scwllink" : ""}`} onClick={this.handleClickWishList}>
                     <i className="fal fa-heart" />
                </div>
               
                <div className="header-user-menu" onClick={this.handleClickUser}>
                { this.showName() }
                    <ul className={this.state.isClickUser ? "hu-menu-vis" : ""}>
                        <li><Link href="/user"><a> Xem thông tin</a></Link></li>
                        <li><Link href="/user/edit"><a> Sửa thông tin</a></Link></li>
                        <li><Link href="/user/like-stores"><a> Danh sách yêu thích</a></Link></li>
                        <li><Link href="/user/comments"><a> Danh sách đánh giá</a></Link></li>
                        <li><a onClick={this.LogOut}>Đăng xuất</a></li>
                    </ul>
                    </div>
                </>
            )
        } else {
            return(
                <div className="show-reg-form modal-open avatar-img" data-srcav="images/avatar/3.jpg" onClick={this.handleClickLogin}><i className="fal fa-user"></i>Tài khoản</div>
            )
        }
    }

    showWishList = () => {
        return(
            <div className={`header-modal ${this.state.isClickWishList ? "vis-wishlist" : "novis_wishlist"}`}>
                {/* header-modal-container*/} 
                <div className="header-modal-container scrollbar-inner fl-wrap" >
                {/*widget-posts*/}
                <div className="widget-posts  fl-wrap">
                    <ul className="no-list-style">
                        {
                           this.state.ListLikeStore != undefined && (
                               this.state.ListLikeStore.slice(0, 8).map((item, index) => {
                                    return(
                                        <li key={index}>
                                        <div className="widget-posts-img"><a><img src={item.store_id.list_images[0]}  /></a>  
                                        </div>
                                        <div className="widget-posts-descr">
                                        <h4><Link  href={`/${item.store_id.name_linkurl_store}/${item.store_id._id}`}>{item.store_id.name}</Link></h4>
                                        <div className="geodir-category-location fl-wrap"><a><i className="fas fa-map-marker-alt" /> {item.store_id.address.address_detail}</a></div>
                                        <div className="widget-posts-descr-link"><a>{item.store_id.category.name} </a></div>
                                        <div className="widget-posts-descr-score">{item.store_id.average_stars}</div>
                                        <div className="clear-wishlist"><i className="fal fa-times-circle" /></div>
                                        </div>
                                    </li>
                                    )
                               })
                           )
                        }
                  
                    </ul>
                </div>
                {/* widget-posts end*/}
                </div>
                {/* header-modal-container end*/} 
                <div className="header-modal-top fl-wrap">
                <h4>Nhà hàng yêu thích ({this.state.ListLikeStore != undefined ? this.state.ListLikeStore.length : 0}) 
                <span style={{color: "#fff"}} onClick={() => this.setState({isClickWishList: false})}> <Link href="/user/like-stores" >
                    <a>Xem thêm</a></Link></span></h4>
                <div className="close-header-modal" onClick={this.handleClickWishList}><i className="far fa-times" /></div>
                </div>
            </div>
        )
    }

    showMenu = () => {
        if(this.state.ListCategory != undefined)
        return(
            this.state.ListCategory.map((item, index) => {
                return(
                <li key={index}><Link href={`/nha-hang?page=1&category=` + item.name_link} ><a>{item.name}</a></Link></li>
                )
            })
        )
        
    }

    Search = () => {
        this.handleClickSearch()
        if(this.state.TextSearch != ''){
            Router.push({
                pathname: '/tim-kiem-nhanh',
                query: {"text" : this.state.TextSearch}
            })
        }
    }

    handleChange = (event) => {
        //console.log(event.target.name ,event.target.value)
        this.setState({[event.target.name] : event.target.value})
    }

    render(){
        return(
            <ClickAwayListener onClickAway={this.handleClickOutSideWishList}>
          <header className="main-header">
             {/* logo*/}
            <Link href="/"><a  className="logo-holder"><img src="/images/logo.png"  /></a></Link>
            {/* logo end*/}
            {/* header-search_btn*/}         
            <div className="header-search_btn show-search-button" onClick={this.handleClickSearch}><i className="fal fa-search" /><span>Tìm kiếm</span></div>
            {/* header-search_btn end*/}
            {/* header opt */} 
            
            {this.showUser()}
            
            <div className="nav-button-wrap color-bg">
                <div className="nav-button">
                <span /><span /><span />
                </div>
            </div>
            {/* nav-button-wrap end*/}
            {/*  navigation */} 
            <div className="nav-holder main-menu">
                <nav>
                <ul className="no-list-style">
                    <li>
                    <Link href="/"><a>Trang chủ</a></Link>
                    </li>
                    <li>
                        <Link href="/nha-hang?page=1"><a>Danh mục <i className="fa fa-caret-down" /></a></Link>
                        <ul>
                            {this.showMenu()}
                        </ul>
                    </li>
                    <li>
                    <Link href="/about"><a>Về chúng tôi</a></Link>
                    </li>
                    <li>
                    <Link href="/contacts"><a>Liên hệ</a></Link>
                    </li>
                    <li>
                    <Link href="/faq"><a>FAQ</a></Link>
                    </li>
                </ul>
                </nav>
            </div>
            {/* navigation  end */}
            {/* header-search_container */}                     
            <div className={`header-search_container header-search ${this.state.isClickSearch ? "vis-head-search" : "vis-search"}`}> 
                <div className="container small-container">
                <div className="header-search-input-wrap fl-wrap">
                    {/* header-search-input */} 
                    <div className="header-search-input">
                    <label><i className="fal fa-keyboard" /></label>
                    <input type="text" placeholder="Tìm kiếm những gì bạn muốn?" onChange={this.handleChange} name="TextSearch"/>  
                    </div>
                  
                    <button className="header-search-button green-bg" onClick={this.Search}><i className="far fa-search" /> Tìm kiếm </button>
                </div>
                <div className="header-search_close color-bg" onClick={() => this.setState({isClickSearch : !this.state.isClickSearch})}><i className="fal fa-long-arrow-up" /></div>
                </div>
            </div>
            {/* header-search_container  end */} 
            {/* wishlist-wrap*/} 

            {this.showWishList()}
            
        </header>


        <Login handleClickLogin={() => this.handleClickLogin()} isClickLogin={this.state.isClickLogin}/>
        </ClickAwayListener >
        )
    }
}