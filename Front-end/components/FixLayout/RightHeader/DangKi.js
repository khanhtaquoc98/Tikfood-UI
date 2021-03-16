import React from "react";
import Router from "next/router"
import {checkMail} from '../../../Api/pathname'
import {UserRegister} from '../../../Api/Api'
import { Result, Button } from 'antd';
import axios from 'axios'

export default class DangKi extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isPasswordCheck: false,
            isMailCheck: false,
            isBoxCheck: false,
            isError: false,
            email: undefined,
            password: undefined,
            confirm: undefined,
            check: false,
            isSentMail: false,
        }
    }
    

    handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({[event.target.name] : value})
        //console.log(this.state.User)
    }

    handleSubmit = () =>  {
        //console.log(this.state);
        if(checkMail(this.state.email) == false){
            this.setState({isMailCheck: true})
        } else this.setState({isMailCheck: false})

        if( this.state.password != undefined || this.state.confirm != undefined){
            if(this.state.password == this.state.confirm) this.setState({isPasswordCheck: false})
            else  this.setState({isPasswordCheck: true})
        } else this.setState({isPasswordCheck: true})

        this.setState({isBoxCheck : !this.state.check})

        console.log(this.state)

        if(this.state.isMailCheck == false && this.state.isPasswordCheck == false && this.state.isBoxCheck == false){
            UserRegister(this.state.email, this.state.password).then(res => {
                if(res != null) {
                    axios.post('http://localhost:8080/sendmailactiveuser',{"email" : this.state.email}).then(res => {
                        this.setState({isSentMail: true})
                        this.setState({isPasswordCheck: false, isMailCheck: false, isBoxCheck: false,isError: false,
                            email: undefined,password: undefined, confirm: undefined, check: false})
                    }).catch(err => this.setState({isError: false}))
                }
            }).catch(err => this.setState({isError : true}))
        } else this.setState({isError: true});
      }
    

    render(){
        return(
            <div  className="tab-content first-tab">
            <div className="custom-form">
            <div>   
                {this.state.isError && <p style={{color: "#ef5350"}}>Email đã có người sử dụng hoặc mật khẩu không phù hợp. Vui lòng thử lại</p> }   
                {this.state.isMailCheck && <p style={{color: "#ef5350"}}>Email không hợp lệ. Vui lòng thử lại</p> }    
                {this.state.isPasswordCheck && <p style={{color: "#ef5350"}}>Mật khẩu và xác nhận mật khẩu không giống nhau. Vui lòng thử lại</p> }  
                {this.state.isBoxCheck && <p style={{color: "#ef5350"}}>Bạn chưa chấp nhận điều khoản sử dụng</p> }  
                {this.state.isErrrMail && <p style={{color: "#ef5350", fontWeight: "700"}}>Lỗi gửi mail</p> }  
                {
                    this.state.isSentMail == true &&   <Result
                    status="success"
                    title="Đăng ký thành công!"
                    subTitle="Vui lòng vào email đã đăng ký để được kích hoạt tài khoản."
                    extra={[
                      <Button type="primary" key="console" onClick={() => Router.reload()}>
                        Đóng đăng kí
                      </Button>,
                      <Button key="buy" onClick={() => this.setState({isSentMail: false})}>Đăng kí lại</Button>,
                    ]}
                  />
                }
                {
                    this.state.isSentMail == false &&  <div  className="main-register-form" >
                    <label>Địa chỉ email <span>*</span> </label>
                    <input name="email" type="text" value={this.state.email} onChange={this.handleChange}  style={{marginBottom: ".8rem"}}/>
                    <label>Mật khẩu <span>*</span></label>
                    <input  type="password" name="password" value={this.state.password} onChange={this.handleChange} style={{marginBottom: ".8rem"}}/>
                    <label >Nhập lại mật khẩu <span>*</span></label>
                    <input type="password" name="confirm"  value={this.state.confirm} onChange={this.handleChange}  style={{marginBottom: ".8rem"}}/>
                    <div className="filter-tags ft-list" style={{marginBottom: ".8rem"}} >
                        <input type="checkbox" name="check" value={this.state.check} onChange={this.handleChange} />
                        <label htmlFor="check-a2">Bạn đồng ý với các <a href="#">điều khoản, chính sách sử dụng</a></label>
                    </div>
                    <div className="clearfix" />
                    <button className="btn float-btn color2-bg" onClick={this.handleSubmit}> Đăng kí  <i className="fas fa-caret-right" /></button>
                    </div>
                }
              
                <div className="clearfix" />
                <div className="filter-tags">
                </div>
            </div>
           
            </div>
        </div>
        )
    }

}