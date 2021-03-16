import React from "react";
import Link from "next/link"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import Router from 'next/router'
import { Modal } from 'antd';
import Skeleton from 'react-loading-skeleton';
import {GetUserWToken, PutUser} from "../../Api/Api"
import UploadImage from './ImageUpload'

export default class HeaderUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            User: undefined,
            visible: false,
            url: undefined
        }
    }
    
    showModal = () => {
       // console.log('Model')
        this.setState({
          visible: true,
        });
      };

    handleOk = () => {
      //  console.log(url)
        if(this.state.url != undefined){
            PutUser(cookies.get('user'),this.state.User._id, "", "", "", this.state.url.toString(), "").then(res => {
               // console.log(res)
                this.setState({isLogin: true})
                GetUserWToken(cookies.get('user')).then(res => this.setState({User : res.user}))
            })
        }
        this.setState({
          visible: false,
        });
      };

    handleCancel = e => {
    //console.log(e);
    this.setState({
        visible: false,
    });
    };

    setURL = (urlimage) => {
        this.setState({url: urlimage});
    }
    

    componentDidMount(){
        if(cookies.get('user') != undefined){
            this.setState({isLogin: true})
            GetUserWToken(cookies.get('user')).then(res => this.setState({User : res.user}))
        } 
        else Router.push('/')
    }

    showAvatar = (User) => {
        if(User.avatar == "Chưa cập nhật"){
            return(<img src="https://mk0ntrauj6jy9vera.kinstacdn.com/wp-content/themes/Avada-Child-Theme/lib/img/default-avatar.png"/>)
        } else return(<img src={User.avatar}/>)
    }

    render(){
        const {User} = this.state
        if(this.state.User == undefined){
            return(
                <section className="parallax-section dashboard-header-sec gradient-bg" data-scrollax-parent="true">
                <div className="container">
                {/*<div  className="dashboard-breadcrumbs breadcrumbs"><a href="#">Home</a><a href="#">Dashboard</a><span>Main page</span></div>*/}
                </div>
                <div className="clearfix" />
                <div className="dashboard-header fl-wrap">
                <div className="container">
                    <div className="dashboard-header_conatiner fl-wrap">
                    <div className="dashboard-header-avatar">
                    <img src="https://mk0ntrauj6jy9vera.kinstacdn.com/wp-content/themes/Avada-Child-Theme/lib/img/default-avatar.png"/>
                            <a className="color-bg edit-prof_btn" ><i className="fal fa-edit" /></a>
                    </div> {/*  dashboard-header-stats-wrap end */}
                    <div className="dashboard-header_conatiner fl-wrap dashboard-header_title" >
                    <h1><Skeleton width={"30%"}/></h1>
                    </div>
                    </div>
                </div>
                </div>
               <div>
                <div className="gradient-bg-figure" style={{right: '-30px', top: 10}} />
                <div className="gradient-bg-figure" style={{left: '-20px', bottom: 30}} />
                <div className="circle-wrap" style={{left: 120, bottom: 120, transform: 'translateZ(0px) translateY(16.4103px)'}} data-scrollax="properties: { translateY: '-200px' }">
                    <div className="circle_bg-bal circle_bg-bal_small" />
                </div>
                <div className="circle-wrap" style={{right: 420, bottom: '-70px', transform: 'translateZ(0px) translateY(-12.3077px)'}} data-scrollax="properties: { translateY: '150px' }">
                    <div className="circle_bg-bal circle_bg-bal_big" />
                </div>
                <div className="circle-wrap" style={{left: 420, top: '-70px', transform: 'translateZ(0px) translateY(-8.20513px)'}} data-scrollax="properties: { translateY: '100px' }">
                    <div className="circle_bg-bal circle_bg-bal_big" />
                </div>
                <div className="circle-wrap" style={{left: '40%', bottom: '-70px'}}>
                    <div className="circle_bg-bal circle_bg-bal_middle" />
                </div>
                <div className="circle-wrap" style={{right: '40%', top: '-10px'}}>
                    <div className="circle_bg-bal circle_bg-bal_versmall" data-scrollax="properties: { translateY: '-350px' }" style={{transform: 'translateZ(0px) translateY(28.7179px)'}} />
                </div>
                <div className="circle-wrap" style={{right: '55%', top: 90}}>
                    <div className="circle_bg-bal circle_bg-bal_versmall" data-scrollax="properties: { translateY: '-350px' }" style={{transform: 'translateZ(0px) translateY(28.7179px)'}} />
                </div>
                </div>

                </section>
            ) }else {
                return(
                    <>
                    <section className="parallax-section dashboard-header-sec gradient-bg" data-scrollax-parent="true">
                        <div className="container">
                         {/*<div  className="dashboard-breadcrumbs breadcrumbs"><a href="#">Home</a><a href="#">Dashboard</a><span>Main page</span></div>*/}
                        </div>
                        <div className="clearfix" />
                        <div className="dashboard-header fl-wrap">
                        <div className="container">
                            <div className="dashboard-header_conatiner fl-wrap">
                            <div className="dashboard-header-avatar">
                                    {this.showAvatar(User)}
                                <a className="color-bg edit-prof_btn" onClick={this.showModal}><i className="fal fa-edit" /></a>
                            </div> {/*  dashboard-header-stats-wrap end */}
                            <div className="dashboard-header_conatiner fl-wrap dashboard-header_title" >
                            <h1 style={{color: "#000"}}>Chào <span>{User.fullname == "Chưa cập nhật" ? User.email : User.fullname}</span></h1>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div>
                <div className="gradient-bg-figure" style={{right: '-30px', top: 10}} />
                <div className="gradient-bg-figure" style={{left: '-20px', bottom: 30}} />
                <div className="circle-wrap" style={{left: 120, bottom: 120, transform: 'translateZ(0px) translateY(16.4103px)'}} data-scrollax="properties: { translateY: '-200px' }">
                    <div className="circle_bg-bal circle_bg-bal_small" />
                </div>
                <div className="circle-wrap" style={{right: 420, bottom: '-70px', transform: 'translateZ(0px) translateY(-12.3077px)'}} data-scrollax="properties: { translateY: '150px' }">
                    <div className="circle_bg-bal circle_bg-bal_big" />
                </div>
                <div className="circle-wrap" style={{left: 420, top: '-70px', transform: 'translateZ(0px) translateY(-8.20513px)'}} data-scrollax="properties: { translateY: '100px' }">
                    <div className="circle_bg-bal circle_bg-bal_big" />
                </div>
                <div className="circle-wrap" style={{left: '40%', bottom: '-70px'}}>
                    <div className="circle_bg-bal circle_bg-bal_middle" />
                </div>
                <div className="circle-wrap" style={{right: '40%', top: '-10px'}}>
                    <div className="circle_bg-bal circle_bg-bal_versmall" data-scrollax="properties: { translateY: '-350px' }" style={{transform: 'translateZ(0px) translateY(28.7179px)'}} />
                </div>
                <div className="circle-wrap" style={{right: '55%', top: 90}}>
                    <div className="circle_bg-bal circle_bg-bal_versmall" data-scrollax="properties: { translateY: '-350px' }" style={{transform: 'translateZ(0px) translateY(28.7179px)'}} />
                </div>
                </div>
                    </section>
                     <Modal
                     centered
                     title={'Chỉnh sửa avatar'}
                     visible={this.state.visible}
                     onOk={this.handleOk}
                     onCancel={this.handleCancel}
                     width={220}
                     >
                         <UploadImage setURL={this.setURL}/>
                     </Modal>
                    </>
                )
            }
        }
        
}