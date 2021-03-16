import React from "react";
import {LoginUser, CheckAdmin} from "../API/Api"
import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";
import {openNotificationWithIcon} from '../API/showNotication'
const cookies = new Cookies();

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isError: false,
            isLogin: false,
        }
    }

    componentDidMount(){
        this.setState({error : true})
    }
    
    onSubmitLogin = () => {
        LoginUser(this.state.email, this.state.password).then(res => {
            if(res.role == "partner") {
                cookies.set('partner', res.token);
                this.setState({isLogin: true})
            } else this.setState({error : true, isLogin: false})
        }).catch(err => {
            this.setState({error : true, isLogin: false})
            openNotificationWithIcon('error', 'Lỗi đăng nhập', 'tên đăng nhập hoặc mặt khẩu chưa đúng vui lòng đăng nhập lại','bottomRight')
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    render(){
        if(cookies.get('admin') != undefined || this.state.isLogin == true){
            return <Redirect to="/" />
        } else
            return(
                <div className="account-pages my-5 pt-sm-5">
                    <div className="container">
                        <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-6 col-xl-5">
                            <div className="card overflow-hidden">
                            <div className="bg-soft-primary">
                                <div className="row">
                                <div className="col-7">
                                    <div className="text-primary p-4">
                                    <h5 className="text-primary">Welcome Back !</h5>
                                    <p>Sign in to continue to TikFood.</p>
                                    </div>
                                </div>
                                <div className="col-5 align-self-end">
                                    <img src="/assets\images\profile-img.png"  className="img-fluid" />
                                </div>
                                </div>
                            </div>
                            <div className="card-body pt-0"> 
                                <div>
                                <a href="index.html">
                                    <div className="avatar-md profile-user-wid mb-4">
                                    <span className="avatar-title rounded-circle bg-light">
                                        <img src="/assets\images\logo.svg"  className="rounded-circle" height={34} />
                                    </span>
                                    </div>
                                </a>
                                </div>
                                <div className="p-2">
                                <div className="form-horizontal" >
                                    <div className="form-group">
                                    <label htmlFor="username">Email</label>
                                    <input type="text" className="form-control"  name="email" placeholder="xyz@gmail.com" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="userpassword">Mật khẩu</label>
                                    <input type="password" className="form-control" name="password" placeholder="*******" onChange={this.handleChange}/>
                                    </div>
                            
                                    <div className="mt-3">
                                    <button className="btn btn-primary btn-block waves-effect waves-light" type="submit" onClick={() => this.onSubmitLogin()}>Đăng nhập</button>
                                    </div>
                                    <div className="mt-4 text-center">
                                   
                                    </div>
                                   
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="mt-5 text-center">
                            <div>
                                <p>© 2020 TikFood.</p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
        )
    
        }
       
}