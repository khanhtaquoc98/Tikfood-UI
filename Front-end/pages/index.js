//Lib
import React from "react";
import Head from 'next/head'

//Components
import Banner from "../components/Home/Banner"
import RestaurantSlide from "../components/Home/RestaurantSlide"
import Featured from "../components/Home/Featured"
import Restaurant from "../components/Home/Restaurant"
import CustomerReview from "../components/Home/CustomerReview"
import Partner from "../components/Home/Partner"
import More from "../components/Home/More"

import {FetchTopReview, FetchTopStar} from '../Api/Api'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            listRestaurantTopView: null,
            listRestaurantTopStar: null
        })
    }
    

    componentDidMount(){
        this.GetRestaurantTopView();
        this.GetRestaurantTopStar();
    }

    GetRestaurantTopView = () => {
        FetchTopReview(1).then(res => {
            //console.log(res)
            if(res.status == 200){
               this.setState({listRestaurantTopView : res.data.stores})
              }
        })
    }

    GetRestaurantTopStar = () => {
        FetchTopStar(1).then(res => {
            //console.log(res)
            if(res.status == 200){
               this.setState({listRestaurantTopStar : res.data.stores})
              }
        })
    }

  render(){
    return (
        <div id="wrapper">
        <Head>
        <title>TikFood - Hỗ trợ, tư vấn các địa điểm quán ăn</title>
        <meta name="description" content="TikFood tìm nhà hàng online nhanh chóng và kèm nhiều ưu đãi, giảm giá mà không cần voucher"></meta>
        <meta property="og:description" content="Đặt bàn nhà hàng trực tuyến. Gọi ngay tổng đài >> 1900 6005 để nhận được hỗ trợ đặt bàn PasGo, đặt chỗ nhà hàng online kèm ưu đãi, giảm giá mà không cần voucher"></meta>
        <meta property="og:image" content="https://storage.googleapis.com/finalprojectuit/bg.jpg"></meta>
        </Head>
        {/* content*/}
        <div className="content">
            <Banner/>
            <RestaurantSlide 
            listRestaurant={this.state.listRestaurantTopView} 
            title={"Tops nhà hàng được đánh giá"}  
            sub={"Những nhà hàng được đánh giá tốt nhất trên TikFood."}/>
            <div className="sec-circle fl-wrap" />
            <Featured/>
            <Restaurant/>
            
            <More/>
            {/*section end*/} 
            <section className="parallax-section" data-scrollax-parent="true">
            <div className="bg par-elem " style={{backgroundImage: "url(/images/restaurateurs-join-us-51d450.jpg)"}} 
            data-scrollax="properties: { translateY: '30%' }" />
            <div className="overlay op7" />
            {/*container*/}
            <div className="container">
                <div className="video_section-title fl-wrap">
                <h4>TikFood together</h4>
                <h2>Hãy sẵn sàng để bắt đầu cuộc hành trình thú vị của bạn. <br /> chúng tôi sẽ dẫn bạn qua một thế giới hoàn thành </h2>
                </div>
            </div>
            </section>
            {/*section end*/}
            <section data-scrollax-parent="true">
                <RestaurantSlide 
                listRestaurant={this.state.listRestaurantTopStar}
                 title={"Những nhà hàng được sao cao nhất"}  
                 sub={"Những nhà hàng có số sao cao nhất trên TikFood."}/>
            </section>
            {/*section end*/}
            {/*section  */}
            <section className="gradient-bg hidden-section" data-scrollax-parent="true">
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                    <div className="colomn-text  pad-top-column-text fl-wrap">
                    <div className="colomn-text-title">
                        <h3>Cập nhật các địa điểm ăn uống mỗi ngày</h3>
                        <p>Hãy cùng chúng tôi chia sẻ đến nhiều người biết đến những địa điểm mà bạn cảm thấy yêu thích.</p>
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="collage-image">
                    <img src="images/api.png" className="main-collage-image"  />                               
                    <div className="images-collage-title color2-bg icdec"> <img src="images/logo.png"  /></div>
                    <div className="images-collage_icon green-bg" style={{right: '-20px', top: 120}}><i className="fal fa-thumbs-up" /></div>
                    <div className="collage-image-min cim_1"><img src="images/api/1.jpg"  /></div>
                    <div className="collage-image-min cim_2"><img src="images/api/2.jpg"  /></div>
                    <div className="collage-image-btn green-bg">Booking now</div>
                    <div className="collage-image-input">Search <i className="fa fa-search" /></div>
                    </div>
                </div>
                </div>
            </div>
            <div className="gradient-bg-figure" style={{right: '-30px', top: 10}} />
            <div className="gradient-bg-figure" style={{left: '-20px', bottom: 30}} />
            <div className="circle-wrap" style={{left: 270, top: 120}} data-scrollax="properties: { translateY: '-200px' }">
                <div className="circle_bg-bal circle_bg-bal_small" />
            </div>
            <div className="circle-wrap" style={{right: 420, bottom: '-70px'}} data-scrollax="properties: { translateY: '150px' }">
                <div className="circle_bg-bal circle_bg-bal_big" />
            </div>
            <div className="circle-wrap" style={{left: 420, top: '-70px'}} data-scrollax="properties: { translateY: '100px' }">
                <div className="circle_bg-bal circle_bg-bal_big" />
            </div>
            <div className="circle-wrap" style={{left: '40%', bottom: '-70px'}}>
                <div className="circle_bg-bal circle_bg-bal_middle" />
            </div>
            <div className="circle-wrap" style={{right: '40%', top: '-10px'}}>
                <div className="circle_bg-bal circle_bg-bal_versmall" data-scrollax="properties: { translateY: '-350px' }" />
            </div>
            <div className="circle-wrap" style={{right: '55%', top: 90}}>
                <div className="circle_bg-bal circle_bg-bal_versmall" data-scrollax="properties: { translateY: '-350px' }" />
            </div>
            </section>
            {/*section end*/}   
            {/*section  */}
            <CustomerReview/>
            <Partner/>
        </div>
        {/*content end*/}
        </div>
    )
  }
  }
 
