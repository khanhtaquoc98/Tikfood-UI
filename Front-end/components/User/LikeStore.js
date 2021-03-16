import React from "react";
import Router from 'next/router'
import Link from 'next/link'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import {notification} from 'antd'
import Skeleton from 'react-loading-skeleton';
import {GetUserWToken, GetLikeStoreforUser, DeleteLikeStoreforUser} from "../../Api/Api"

export default class LikeStore extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            User: undefined,
            ListLikeStore: undefined,
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
        } 
        else Router.push('/')
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
                        ListLikeStore.map((item,index) => {
                            return(
                                <div className="dashboard-list fl-wrap" key={index}>
                                <div className="dashboard-message">
                                <div className="booking-list-contr">
                                    <a onClick={() => this.onDeleteLikeStore(item._id)} className="red-bg tolt" data-microtip-position="left" data-tooltip="Xoá"><i className="fal fa-trash" /></a>
                                </div>
                                <div className="dashboard-message-text">
                                    <img src={item.store_id.list_images[0]}  />
                                    <h4><Link href={`/${item.store_id.name_linkurl_store}/${item.store_id._id}`}><a>{item.store_id.name}</a></Link></h4>
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


    render(){
        const {User} = this.state
        if(User != undefined){
            return(
                <>
                <div className="dashboard-title   fl-wrap">
                    <h3>Cửa hàng yêu thích</h3>
                </div>
               {this.showLikeStore()}
            
                </>
               )
        } else {
            return(<div>Loading.....</div>)
        }
    }

}