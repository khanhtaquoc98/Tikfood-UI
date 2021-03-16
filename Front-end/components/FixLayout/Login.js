import React from "react";

import DangNhap from "./RightHeader/DangNhap"
import DangKi from "./RightHeader/DangKi"

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isPageLogin: true,
        }
    }
    

    render(){
        return(
            <div className="main-register-wrap modal" style={{display: `${this.props.isClickLogin ? "block" : "none"} `}}>
                <div className="reg-overlay" style={{display: `${this.props.isClickLogin ? "block" : "none"} `}}/>
                <div className="main-register-holder tabs-act">
                    <div className={`main-register fl-wrap  modal_main ${this.props.isClickLogin ? "vis_mr" : ""}`}>
                    <div className="main-register_title">Chào mừng đến với <span><strong>Tik</strong>Food<strong>.</strong></span></div>
                    <div className="close-reg" onClick={this.props.handleClickLogin}><i className="fal fa-times" /></div>
                    <ul className="tabs-menu fl-wrap no-list-style">
                        <li className={this.state.isPageLogin == true ? "current" : ""}><a onClick={() => this.setState({isPageLogin: true})}><i className="fal fa-sign-in-alt" /> Đăng nhập</a></li>
                        <li className={this.state.isPageLogin == false ? "current" : ""}><a onClick={() => this.setState({isPageLogin: false})}><i className="fal fa-user-plus" /> Đăng kí</a></li>
                    </ul>
                    {/*tabs */}                       
                    <div className="tabs-container" >
                        <div className="tab" style={{marginBottom: "3rem"}}>
                        {/*tab */}
                            {this.state.isPageLogin === true && <DangNhap handleClickLogin={() => this.props.handleClickLogin()}/>}
                            {this.state.isPageLogin === false && <DangKi />}
                        {/*tab end */}
                        {/*tab */}
                        {/*tab end */}
                        </div>
                        {/*tabs end */}
                        <div className="wave-bg">
                        <div className="wave -one" />
                        <div className="wave -two" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>

        )
    }

}