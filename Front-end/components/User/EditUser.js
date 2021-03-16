import React from "react";
import Router from 'next/router'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import Skeleton from 'react-loading-skeleton';
import {GetUserWToken, PutUser} from "../../Api/Api"
import { Radio } from 'antd';
import User from "../../pages/user/edit";

export default class EditUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            User: undefined
        }
    }
    

    componentDidMount(){
        this.GetUser()
    }

    GetUser = () => {
        if(cookies.get('user') != undefined){
            this.setState({isLogin: true})
            GetUserWToken(cookies.get('user')).then(res => this.setState({User : res.user}))
        } 
        else Router.push('/')
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
        //console.log(this.state.User)
    }

    onSubmit = () => {
        PutUser(cookies.get('user'), this.state.User._id, 
            this.state.gender == undefined ? "" : this.state.gender, 
            this.state.address == undefined ? "" : this.state.address,
            this.state.phone == undefined ? "" : this.state.phone,
            this.state.avatar == undefined ? "" : this.state.avatar,
            this.state.fullname == undefined ? "" : this.state.fullname).then(res=> {
                //console.log(res)
                this.setState({gender: undefined, address: undefined, phone: undefined, avatar: undefined, fullname: undefined})
                this.GetUser();
                Router.reload();
            })
    }


    render(){
        const {User} = this.state;
        if(User != undefined){
            return(
                <div className="profile-edit-container fl-wrap block_box">
                    <div className="custom-form">
                        <div className="row">
                        <div className="col-sm-6" style={{marginBottom: "8px"}}>
                            <label>Họ và tên <i className="fal fa-user" /></label>
                            <input name="fullname" type="text" placeholder="Tên của bạn...." 
                            value={this.state.fullname == undefined ? User.fullname : this.state.fullname} 
                            onChange={this.handleChange}/>                                                
                        </div>
                        <div className="col-sm-6" style={{marginBottom: "8px"}}>
                            <label>Địa chỉ <i className="fal fa-user" /></label>
                            <input name="address" type="text" placeholder="Địa chỉ của bạn"  
                            value={this.state.address == undefined ? User.address : this.state.address} 
                            onChange={this.handleChange}/>                                                
                        </div>
                        <div className="col-sm-6" style={{marginBottom: "8px"}}>
                            <label>Giới tính</label>
                            <Radio.Group name="gender" style={{display: "inline"}} 
                            value={this.state.gender == undefined ? User.gender : this.state.gender} 
                            onChange={this.handleChange}>
                                <Radio value={1}>Nam</Radio>
                                <Radio value={0}>Nữ</Radio>
                            </Radio.Group>                                          
                        </div>
                        <div className="col-sm-6" style={{marginBottom: "8px"}}>
                            <label>Số điện thoại<i className="far fa-phone" /></label>
                            <input name="phone" type="text" placeholder="090......."
                             value={this.state.phone == undefined ? User.phone : this.state.phone} 
                            onChange={this.handleChange}/>                                                
                        </div>
                       
                        </div>
                        <div >
                        <button onClick={this.onSubmit} className="btn color2-bg  float-btn">Lưu<i className="fal fa-save" /></button>
                        </div>
                    </div>
                    
                    </div>)
        } else {
            return(<div>Loading.....</div>)
        }
    }

}