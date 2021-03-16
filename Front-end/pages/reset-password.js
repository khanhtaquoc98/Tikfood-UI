import React from "react";
import Head from 'next/head'
import Link from 'next/link'
import {PutPasswordUser} from '../Api/Api'
import axios from 'axios'

export default class Email extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({
            password : undefined,
            confirmpassword: undefined,
            isError: false,
            isSucces: false,
            isSentEmail: false,
        })
    }

    static getInitialProps({query}) {
        return {query}
      }

      componentDidUpdate(prevProps, prevState) {
        if(this.props.query.ref != prevProps.query.ref)
        {
            if(this.props.query.ref != undefined)
                {
                    axios.get('http://localhost:8080/nguoi-dung/thong-tin-ca-nhan/ref=' + this.props.query.ref).then(res => {
                        //console.log(res)
                        if(res.status == 201){
                            this.setState({user: res.data.user})
                            this.setState({active : res.data.user.active})
                        }
                    }).catch(err => this.setState({active: 3}))
                }
        }
      }
 

      componentDidMount(){
        if(this.props.query.ref != undefined)
        {
            axios.get('http://localhost:8080/nguoi-dung/thong-tin-ca-nhan/ref=' + this.props.query.ref).then(res => {
                //console.log(res)
                if(res.status == 201){
                    this.setState({user: res.data.user})
                    this.setState({active : res.data.user.active})
                }
            }).catch(err => this.setState({active: 3}))
        }
           
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
        //console.log(this.state.User)
    }

    handleSent = () => {
        if(this.state.password != undefined && this.state.confirmpassword != undefined)
        {
            if(this.state.password == this.state.confirmpassword){
                PutPasswordUser(this.props.query.ref, this.state.password, this.state.confirmpassword).then(res => {
                    this.setState({isSucces: true, isError: false})
                }).catch(err => this.setState({isError: true, isSucces: false}))
            } 
            else{ this.setState({isError: true, isSucces: false})}
        } 
        else{ this.setState({isError: true, isSucces: false})}
        
    } 
    
    setnMail = () => {
        axios.post("http://localhost:8080/sendmailactiveuser", {
            "email": this.state.user.email
        }).then(res => {this.setState({isSentEmail: true, isSucces: false, isError: false})})
    }

    render() {
        if(this.state.active == 1){
            return (
                <div id="wrapper">
                     <Head>
                    <title>Đổi mật khẩu - TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
                    <meta name="description" content="TikFood tìm nhà hàng online nhanh chóng và kèm nhiều ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:description" content="Đặt bàn nhà hàng trực tuyến. Gọi ngay tổng đài >> 1900 6005 để nhận được hỗ trợ đặt bàn PasGo, đặt chỗ nhà hàng online kèm ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:image" content="https://storage.googleapis.com/finalprojectuit/bg.jpg"></meta>
                    </Head>
                        {/* content*/}
                        <div className="content">
                            {/*  section  */}
                            <section className="parallax-section small-par" data-scrollax-parent="true">
                            <div className="bg" style={{backgroundImage: "url('/images/bg/hero/4.jpg')"}} data-scrollax="properties: { translateY: '30%' }" />
                            <div className="overlay op7" />
                            <div className="container">
                                <div className="error-wrap">
                                <div >
                                    <h4 style={{fontSize: "3rem", color: "#fff"}}>Thay đổi mật khẩu</h4>
                                </div>
                                {this.state.isSucces == false && (<p>Vui lòng nhập mật khẩu mới.</p>)}
                                
                                <div className="clearfix" />
                                {this.state.isError && <p style={{fontWeight: "700"}}>Vui lòng kiểm tra lại mật khẩu!</p>}
                                {this.state.isSucces && <p style={{fontWeight: "700"}}>Đổi mật khẩu thành công!</p>}
                                {this.state.isSucces == false && (
                                    <div className="farme">
                                    <input name="password" type="password" className="search" placeholder="Nhập mật khẩu mới" 
                                    value={this.state.password != undefined ? this.state.password : ''} 
                                    onChange={this.handleChange}/>
                                    
                                    <input name="confirmpassword" type="password" className="search" placeholder="Xác nhận lại mật khẩu" 
                                    value={this.state.confirmpassword != undefined ? this.state.confirmpassword : ''} 
                                    onChange={this.handleChange}/>
                                    
                                </div>
                                )}
                                
                            
                                <div className="clearfix" />
                                {this.state.isSucces == false && <a className="btn   color2-bg" onClick={() => this.handleSent()}> <i class="fal fa-angle-right"></i>Chấp nhận</a> }
                                 {this.state.isSucces == true &&  (<Link href="/"><a  className="btn   color2-bg">Trang chủ<i className="far fa-home-alt" /></a></Link>)}
                                
                               
                                </div>
                            </div>
                            </section>
                            {/*  section  end*/}
                        </div>
                        {/*content end*/}
                        </div>
                )
        } else {
            if(this.state.active == 0){
                return(
                    <div id="wrapper">
                    {/* content*/}
                    <div className="content">
                        {/*  section  */}
                        <section className="parallax-section small-par" data-scrollax-parent="true">
                        <div className="bg" style={{backgroundImage: "url('/images/bg/hero/4.jpg')"}} data-scrollax="properties: { translateY: '30%' }" />
                        <div className="overlay op7" />
                        <div className="container">
                            <div className="error-wrap">
                            <div className="bubbles">
                                <h4 style={{fontSize: "3rem", color: "#fff"}}>Thay đổi mật khẩu</h4>
                            </div>
                            <div className="clearfix" />
                            <p style={{fontSize: "1.5rem"}}>Tài khoản chưa được kích hoạt</p>
                            {this.state.isSentEmail == false && <p style={{fontSize: "1rem"}}>Vui lòng kiểm tra lại email kích hoạt hoặc gửi lại email kích hoạt</p>}
                            {this.state.isSentEmail && <p style={{fontSize: "1rem"}}>Chúng tôi vừa gửi mail kích hoạt. Vui lòng bạn kiểm tra lại trong email</p>}
                            <div className="clearfix" />
                            <a  className="btn color2-bg" style={{marginRight: ".4rem"}} onClick={() => this.setnMail()}>Gửi lại mail<i className="far fa-envelope" /></a>
                            <Link href="/"><a  className="btn   color2-bg">Trở về trang chủ<i className="far fa-home-alt" /></a></Link>
                            </div>
                        </div>
                        </section>
                        {/*  section  end*/}
                    </div>
                    {/*content end*/}
                    </div>
                )
            } else {
                return(
                    <div id="wrapper">
                    {/* content*/}
                    <div className="content">
                        {/*  section  */}
                        <section className="parallax-section small-par" data-scrollax-parent="true">
                        <div className="bg" style={{backgroundImage: "url('/images/bg/hero/4.jpg')"}} data-scrollax="properties: { translateY: '30%' }" />
                        <div className="overlay op7" />
                        <div className="container">
                            <div className="error-wrap">
                            <div className="bubbles">
                                <h2 style={{fontSize: "4rem"}}>Thay đổi mật khẩu</h2>
                            </div>
                            <div className="clearfix" />
                            <p style={{fontSize: "1.5rem"}}>Không tìm thấy tài khoản của bạn</p>
                            <div className="clearfix" />
                            <Link href="/"><a  className="btn   color2-bg">Trở về trang chủ<i className="far fa-home-alt" /></a></Link>
                            </div>
                        </div>
                        </section>
                        {/*  section  end*/}
                    </div>
                    {/*content end*/}
                    </div>
                )
            }
        }
   
    }
}