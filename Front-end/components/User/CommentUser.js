import React from "react";
import Router from 'next/router'
import Link from 'next/link'
import {Rate, notification} from 'antd'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import Skeleton from 'react-loading-skeleton';
import {GetUserWToken, GetCommentforUser, DeleteCommentforUser} from "../../Api/Api"

export default class User extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            User: undefined,
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
            GetCommentforUser(cookies.get('user')).then(res => this.setState({ListComment: res.user}))
        } 
        else Router.push('/')
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
                        ListComment.map((item,index) => {
                            return(
                               <div className="reviews-comments-item" key={index}>
                                <div className="reviews-comments-item-text fl-wrap">
                                    <div className="reviews-comments-header fl-wrap">
                                    <div className="reviews-comments-item-date" style={{textAlign: 'left'}}>
                                        <span style={{fontSize: "12px"}}> Điểm đánh giá: 
                                        <Rate disabled defaultValue={item.star} style={{fontSize: ".86rem", marginLeft: ".4rem"}}/>
                                        </span>
                                    </div>
                                    </div>
                                    <p>Nội dung: {item.content}</p>
                                    <div className="reviews-comments-item-footer fl-wrap">
                                    <div className="reviews-comments-item-date">
                                        <span>
                                    <i className="fal fa-store" /><Link href={`/${item.store_id.name_linkurl_store}/${item.store_id._id}`}><a>{item.store_id.name}</a></Link></span>
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
    
    onDeleteComment = (id) => {
        DeleteCommentforUser(id,cookies.get('user')).then(res => {
            notification.success({
                message: 'Đánh giá của bạn vừa được xoá',
                placement: "bottomLeft"
            })
            GetCommentforUser(cookies.get('user')).then(res => this.setState({ListComment: res.user}))
        })
    }

    render(){
        const {User} = this.state
        if(User != undefined){
            return(
                <>
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