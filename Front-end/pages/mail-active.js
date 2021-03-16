import React from "react";
import Head from 'next/head'
import Link from 'next/link'
import {checkMail} from '../Api/pathname'
import axios from 'axios'
import Router from "next/router";

export default class SentMailActive extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({
            email : undefined,
            isError: false,
            isSucces: false,
        })
    }

    componentDidMount(){
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
        //console.log(this.state.User)
    }

    handleSent = () => {
        if(this.state.email != undefined && checkMail(this.state.email))
        {
            //console.log(this.state)
            axios.post("http://localhost:8080/sendmailactiveuser",{"email" : this.state.email}).then(res => {
                
               // console.log(res)
                this.setState({isSucces: true})
                this.setState({isError: false})
            }).catch(err => {
                this.setState({isError: true})
            })
        } else {
            this.setState({isError: true})
        }
       
    }

    render() {
    return (
        <div id="wrapper">
              <Head>
                    <title>Kích hoạt tài khoản - TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
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
                            <h4 style={{fontSize: "3rem", color: "#fff"}}>Kích hoạt tài khoản</h4>
                        </div>
                        <p>Vui lòng cung cấp email để kích hoạt tài khoản.</p>
                        <div className="clearfix" />
                        {this.state.isError && <p style={{fontWeight: "700"}}>Email không đúng vui lòng kiểm tra lại!</p>}
                        {this.state.isSucces && <p style={{fontWeight: "700"}}>Bạn vui lòng vào email của bạn để được kích hoạt!</p>}
                        <div className="farme">
                        <input name="email" type="text" className="search" placeholder="Nhập email" 
                        value={this.state.email != undefined ? this.state.email : ''} 
                        onChange={this.handleChange}/>
                        <button className="search-submit color-bg" onClick={() => this.handleSent()}> Gửi </button>
                    </div>
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