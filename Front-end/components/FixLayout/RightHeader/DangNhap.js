import React from "react";
import Router from 'next/router';
import Link from 'next/link'
import {LoginUser} from '../../../Api/Api'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class DangNhap extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({
            email : "",
            password : "",
            error: false,
        })
    }
    

    handleChange = (event) => {
        //console.log(event.target.name ,event.target.value)
        this.setState({[event.target.name] : event.target.value})
    }

    onSubmitLogin = () => {
        //console.log(this.state)
        LoginUser(this.state.email, this.state.password).then(res => {
            cookies.set('user', res.token);
            this.setState({email: "", password: "", error: false})
            Router.reload(window.location.pathname);
        }).catch(err => {this.setState({error : true})})
    }

    

    render(){
        const {error} = this.state
        return(
            <div  className="tab-content first-tab">
                            <div className="custom-form">
                            <div>   
                                {error ? <label style={{color: "#ef5350"}}>Sai email hoặc mật khẩu. Vui lòng thử lại</label> : <label></label>}    
                                <label>Email của bạn <span>*</span> </label>
                                <input name="email" type="text" style={{marginBottom: ".8rem"}} onChange={this.handleChange}/>
                                <label>Mật khẩu <span>*</span> </label>
                                <input name="password" type="password" style={{marginBottom: "1rem"}} onChange={this.handleChange}/>
                                <div className="lost_password">
                                <Link href="/reset-password-with-email"><a  onClick={() => this.props.handleClickLogin()}>Quên mật khẩu?</a></Link>
                                 </div>
                                <button className="btn float-btn color2-bg"  onClick={this.onSubmitLogin}
                                > Đăng nhập <i className="fas fa-caret-right"/></button>
                                <div className="clearfix" />
                                <div className="filter-tags">
                                </div>
                            </div>
                           
                            </div>
                        </div>
        )
    }

}