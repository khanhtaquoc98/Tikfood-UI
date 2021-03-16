import React from "react";
import Router from 'next/router'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

import Skeleton from 'react-loading-skeleton';
import {GetUserWToken, PutPasswordUser} from "../../Api/Api"
import { Modal } from 'antd';
import User from "../../pages/user/edit";

export default class ResetPass extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            User: undefined,
            password: undefined,
            confirmpassword: undefined,
            isErrr: false
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
        if(this.state.password == this.state.confirmpassword && this.state.oldPassword != undefined  && this.state.password != undefined)
        {
           // console.log(this.state.User)
            PutPasswordUser(this.state.User._id, this.state.password, this.state.confirmpassword).then(res => {
                this.ModelSucces();
                this.setState({password: undefined,
                    confirmpassword: undefined})
            }).catch(err => this.ModelErr('Lỗi đổi mật khẩu', 'Lỗi đổi mật khẩu vui lòng thử lại sau'))
        } else {
            this.ModelErr('Lỗi đổi mật khẩu', 'Mật khẩu mới và xác nhận mật khẩu không giống nhau hoặc mật khẩu cũ chưa đúng.')
            this.setState({isErrr: true})
            this.setState({password: undefined,
                confirmpassword: undefined})
        }
        
    }

    ModelSucces = () => {
        Modal.success({
            content: 'Cập nhật mật khẩu thành công',
          });
    }

    ModelErr = (title, content) => {
        Modal.error({
            title: title,
            content: content,
          });
        
    }


    render(){
        const {User} = this.state;
        if(User != undefined){
            return(
               <div className="profile-edit-container fl-wrap block_box">
                    <div className="custom-form">
                        <div className="pass-input-wrap fl-wrap" style={{marginTop: "8px"}} >
                        <label>Mật khẩu hiện tại</label>
                        <input type="password" className="pass-input" name="oldPassword" onChange={this.handleChange} value={this.state.oldPassword}/>
                        </div>
                        <div className="pass-input-wrap fl-wrap" style={{marginTop: "8px"}}>
                        <label>Mật khẩu mới</label>
                        <input type="password" className="pass-input" name="password"  onChange={this.handleChange} value={this.state.password}/>
                        
                        </div>
                        <div className="pass-input-wrap fl-wrap" style={{marginTop: "8px"}}>
                        <label>Nhập lại mật khẩu mới</label>
                        <input type="password" className="pass-input"  name="confirmpassword" onChange={this.handleChange} value={this.state.confirmpassword}/>
                        </div>
                        <button className="btn    color2-bg  float-btn" onClick={this.onSubmit}>Lưu<i className="fal fa-save" /></button>
                    </div>
                    
                    </div>
)
        } else {
            return(<div>Loading.....</div>)
        }
    }

}