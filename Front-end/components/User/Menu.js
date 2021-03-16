import React from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import Link from 'next/link'

import Skeleton from 'react-loading-skeleton';
import {GetUserWToken} from "../../Api/Api"

export default class MenuUser extends React.Component{
    
    render(){
        return(
            <div className="col-md-3">
            <div className="mob-nav-content-btn color2-bg init-dsmen fl-wrap"><i className="fal fa-bars" /> Dashboard menu</div>
            <div className="clearfix" />
            <div className="fixed-bar fl-wrap" id="dash_menu">
            <div className="user-profile-menu-wrap fl-wrap block_box">
                {/* user-profile-menu*/}
                <div className="user-profile-menu">
                <h3>Menu</h3>
                <ul className="no-list-style">
                    <li><Link href="/user"><a><i className="fal fa-th-list" />Tài khoản </a></Link></li>
                    <li><Link href="/user/like-stores"><a><i className="fal fa-th-list" />Cửa hàng yêu thích </a></Link></li>
                    <li><Link href="/user/comments"><a ><i className="fal fa-comments-alt" />Đánh giá</a></Link></li>
                    <li><Link href="/user/edit"><a ><i className="fal fa-user-edit" /> Chỉnh sửa thông tin</a></Link></li>
                    <li><Link href="/user/reset-password"><a><i className="fal fa-key" />Thay đổi mật khẩu</a></Link></li>
                </ul>
                </div>
                {/* user-profile-menu end*/}
                {/* user-profile-menu*/}
              
                {/* user-profile-menu end*/}                               
            </div>
            </div>
           
            <div className="clearfix" />
        </div>
        )
    }
}