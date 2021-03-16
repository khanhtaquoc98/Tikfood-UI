import React from "react";
import Router from 'next/router'
import Link from 'next/link'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import {notification} from 'antd'

import Skeleton from 'react-loading-skeleton';
import {GetUserWToken, GetLikeStoreforUser, GetCommentforUser, DeleteCommentforUser, DeleteLikeStoreforUser} from "../../Api/Api"

export default class User extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            User: undefined,
            ListLikeStore: undefined,
            ListComment: undefined
        }
    }
    

    componentDidMount(){
        this.GetUser()
    }

    GetUser = () => {
        if(cookies.get('user') != undefined){
            this.setState({isLogin: true})
            GetUserWToken(cookies.get('user')).then(res => this.setState({User : res.user}))
            GetLikeStoreforUser(cookies.get('user')).then(res => this.setState({ListLikeStore: res.user}))
            GetCommentforUser(cookies.get('user')).then(res => this.setState({ListComment: res.user}))
        } 
        else Router.push('/')
    }

    onDeleteComment = (id) => {
        DeleteCommentforUser(id,cookies.get('user')).then(res => {
            notification.success({
                message: 'Đánh giá của bạn vừa được xoá',
                placement: "bottomLeft"
            })
            GetLikeStoreforUser(cookies.get('user')).then(res => this.setState({ListLikeStore: res.user}))
        })
    }

    onDeleteLikeStore = (id) => {
        DeleteLikeStoreforUser(id,cookies.get('user')).then(res => {
            notification.success({
                message: 'Cửa hàng bạn thích vừa được xoá',
                placement: "bottomLeft"
            })
            GetLikeStoreforUser(cookies.get('user')).then(res => this.setState({ListLikeStore: res.user}))
        })
    }


    showLikeStore = () => {
        const {ListLikeStore} = this.state
        if(ListLikeStore == undefined){
            return(
                <div className="dashboard-list-box  fl-wrap">
                    Bạn chưa thích cửa hàng nào
                </div>
            )} else {
                return(
                    <div className="dashboard-list-box  fl-wrap">
                        {
                        ListLikeStore.slice(0,4).map((item,index) => {
                            return(
                                <div className="dashboard-list fl-wrap" key={index}>
                                <div className="dashboard-message">
                                <div className="booking-list-contr">
                                    <a onClick={() => this.onDeleteLikeStore(item._id)} className="red-bg tolt" data-microtip-position="left" data-tooltip="Xoá"><i className="fal fa-trash" /></a>
                                </div>
                                <div className="dashboard-message-text">
                                    <img src={item.store_id.list_images[0]}  />
                                    <h4><Link  href={`/${item.store_id.name_linkurl_store}/${item.store_id._id}`}><a>{item.store_id.name}</a></Link></h4>
                                    <div className="geodir-category-location clearfix"><a >{item.store_id.address.address_detail}</a></div>
                                </div>
                                </div>
                            </div>
                            )
                        })
                        }
                </div>
                   
                )
            }
        }


    showComment = () => {
        const {ListComment} = this.state
        if(ListComment == undefined){
            return(
                <div className="dashboard-list-box  fl-wrap">
                    Bạn chưa đánh giá
                </div>
            )} else {
                return(
                    <div className="profile-edit-container fl-wrap block_box">
                        {
                        ListComment.slice(0,4).map((item,index) => {
                            return(
                               <div className="reviews-comments-item" key={index}>
                               
                                <div className="reviews-comments-item-text fl-wrap">
                                    <div className="reviews-comments-header fl-wrap">
                                    <div className="review-score-user">
                                        <div className="listing-rating card-popup-rainingvis" data-starrating2={4}><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><div className="card-popup-rainingvis_bg"><span className="card-popup-rainingvis_bg_item" /><span className="card-popup-rainingvis_bg_item" /><span className="card-popup-rainingvis_bg_item" /><span className="card-popup-rainingvis_bg_item" /><span className="card-popup-rainingvis_bg_item" /><div /></div></div>
                                    </div>
                                    </div>
                                    <p>{item.content}</p>
                                    <div className="reviews-comments-item-footer fl-wrap">
                                    <div className="reviews-comments-item-date">
                                        <span>
                                    <i className="far fa-calendar-check" />{item.store_id.name}</span>
                                    </div>
                                    <a onClick={() => this.onDeleteComment(item._id)} className="rate-review"><i className="fal fa-reply" />  Xoá </a>
                                    </div>
                                </div>
                                </div>

                            )
                        })
                        }
                </div>
                    
                )
            }
        }
    

    render(){
        const {User} = this.state
       // console.log(this.state)
        if(User != undefined){
            return(
                <>
                <div className="dashboard-title   fl-wrap">
                    <h3>Cửa hàng yêu thích</h3>
                </div>
               {this.showLikeStore()}
               <div className="dashboard-title   fl-wrap" style={{marginTop: "1.5rem"}}>
                    <h3>Đánh giá của bạn</h3>
                </div>
                {this.showComment()}
                </>
               )
        } else {
            return(<div>Loading.....</div>)
        }
    }

}