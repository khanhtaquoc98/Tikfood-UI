
import React from "react";
import Head from 'next/head'

//Component
import HeaderUser from '../../components/User/Header'
import MenuUser from '../../components/User/Menu'
import UserData from '../../components/User/User'


export default class UserIndex extends React.Component {

    render(){
        return(
          <div id="wrapper">
              <Head>
                 <link type="text/css" rel="stylesheet" href="/css/dashboard-style.css"/>
                    <title>Tài khoản - TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
                    <meta name="description" content="TikFood tìm nhà hàng online nhanh chóng và kèm nhiều ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:description" content="Đặt bàn nhà hàng trực tuyến. Gọi ngay tổng đài >> 1900 6005 để nhận được hỗ trợ đặt bàn PasGo, đặt chỗ nhà hàng online kèm ưu đãi, giảm giá mà không cần voucher"></meta>
                    <meta property="og:image" content="https://storage.googleapis.com/finalprojectuit/bg.jpg"></meta>
              </Head>
            {/* content*/}
            <div className="content">
            {/*  section  */}
                <HeaderUser/>
            {/*  section  end*/}
            {/*  section  */}
            <section className="gray-bg main-dashboard-sec" id="sec1">
                <div className="container">
                {/*  dashboard-menu*/}
                <MenuUser/>
                {/* dashboard-menu  end*/}
                {/* dashboard content*/}
                <div className="col-md-9">
                    {/* profile-edit-container*/} 
                    <UserData/>                               
                </div>
                {/* dashboard content end*/}
                </div>
            </section>
            {/*  section  end*/}
            <div className="limit-box fl-wrap" />
            </div>
            {/*content end*/}
            </div>
        )
    }

}