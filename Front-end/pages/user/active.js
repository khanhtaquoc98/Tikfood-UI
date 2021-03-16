import React from "react";
import Head from 'next/head'
import Link from 'next/link'

import axios from 'axios'
import Router  from "next/router";

export default class Active extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({
            active : undefined,
            user: undefined
        })
    }
    

    static getInitialProps({query}) {
        return {query}
      }

      componentDidUpdate(prevProps, prevState) {
        if(this.props.query.ref != prevProps.query.ref)
        {
            axios.get('http://localhost:8080/nguoi-dung/thong-tin-ca-nhan/ref=' + this.props.query.ref).then(res => {
                //console.log(res)
                if(res.status == 201){
                    this.setState({user: res.data.user})
                    this.setState({active : res.data.user.active})
                    if(res.data.user.active == 0){
                        axios.put('http://localhost:8080/user/activeuser/user_id=' + this.props.query.ref)
                    } 
                }
            }).catch(err => this.setState({active: 3}))
                   }
      }
 

      componentDidMount(){
          
        if(this.props.query.ref != undefined)
        {
            axios.get('http://localhost:8080/nguoi-dung/thong-tin-ca-nhan/ref=' + this.props.query.ref).then(res => {
                console.log(res)
                if(res.status == 201){
                    this.setState({user: res.data.user})
                    this.setState({active : res.data.user.active})
                    if(res.data.user.active == 0){
                        axios.put('http://localhost:8080/user/activeuser/user_id=' + this.props.query.ref)
                    } 
                }
            }).catch(err => this.setState({active: 3}))
        }
           
    }

    render() {
        const {active} = this.state
        if(active == 0)
        return (
           <div id="wrapper">
                 <Head>
                    <title>Kích hoạt- TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
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
                        <div className="bubbles">
                        <h2 style={{fontSize: "4rem"}}>Kích hoạt tài khoản</h2>
                        </div>
                        {this.state.user != undefined &&  <p style={{fontSize: "1.5rem"}}>Tài khoản {this.state.user.email} kích hoạt thành công.</p>}
                       
                        <div className="clearfix" />
                       
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
        else  if(active == 1) {
            return (
                <div id="wrapper">
                    <Head>
                    <title>Kích hoạt- TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
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
                             <div className="bubbles">
                             <h2 style={{fontSize: "4rem"}}>Kích hoạt tài khoản</h2>
                             </div>
                             <div className="clearfix" />
                             {this.state.user != undefined &&  <p style={{fontSize: "1.5rem"}}>Tài khoản {this.state.user.email} đã được kích hoạt.</p>}
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
        else return(
            <div id="wrapper">
                <Head>
                    <title>Kích hoạt- TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
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
                             <div className="bubbles">
                                 <h2 style={{fontSize: "4rem"}}>Kích hoạt tài khoản</h2>
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