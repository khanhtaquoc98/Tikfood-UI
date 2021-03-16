import React from "react";
import Head from 'next/head'
import Link from 'next/link'

export default class Error extends React.Component{

    render() {
        return (
           <div id="wrapper">
                 <Head>
                    <title>Không tìm thấy trang - TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
                    <meta name="description" content="TikFood tìm nhà hàng online nhanh chóng và kèm nhiều ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:description" content="Đặt bàn nhà hàng trực tuyến. Gọi ngay tổng đài >> 1900 6005 để nhận được hỗ trợ đặt bàn PasGo, đặt chỗ nhà hàng online kèm ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:image" content="https://storage.googleapis.com/finalprojectuit/bg.jpg"></meta>
                    </Head>
                {/* content*/}
                <div className="content">
                    {/*  section  */}
                    <section className="parallax-section small-par" data-scrollax-parent="true">
                    <div className="bg" data-bg="images/bg/hero/4.jpg" data-scrollax="properties: { translateY: '30%' }" />
                    <div className="overlay op7" />
                    <div className="container">
                        <div className="error-wrap">
                        <div className="bubbles">
                            <h2>404</h2>
                        </div>
                        <p>Xin lỗi bạn, trang này không được tìm thấy.</p>
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
        );
    }
}