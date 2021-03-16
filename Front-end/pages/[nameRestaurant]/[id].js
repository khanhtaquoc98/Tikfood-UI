import React from 'react';
import Link from 'next/link'
import router from 'next/router'
import * as Scroll from "react-scroll";
import { Element } from "react-scroll";
import {StickyContainer,  Sticky} from 'react-sticky'
import Head from "next/head"
//api
import {FetchRestaurant, GetComment} from "../../Api/Api"; 
import axios from "axios"
import {ChangeLinkImage} from "../../Api/pathname"; 
//Component
import Banner from '../../components/BaiVietNhaHang/banner'
import Share from '../../components/BaiVietNhaHang/Share'
import Discount from '../../components/BaiVietNhaHang/discount'
import Description from '../../components/BaiVietNhaHang/description'
import ListImage from "../../components/BaiVietNhaHang/listImage"
import Point from '../../components/BaiVietNhaHang/Point'
import MenuRestaurant from '../../components/BaiVietNhaHang/menu'
import Comment from '../../components/BaiVietNhaHang/comment'
import Info from "../../components/BaiVietNhaHang/Info"
import Breadcrumb from "../../components/BaiVietNhaHang/breadcrumb"
import Router  from 'next/router';

export default class DetailRestaurant extends React.Component{
   
    static async getInitialProps({query}) {
        if(query.nameRestaurant != 'css' || query.nameRestaurant != 'js')
        {
            const res = await fetch('https://messbotthanhtin245.herokuapp.com/api/namelink?name_link='+ query.nameRestaurant)
            
            const data = await res.json()
            console.log(query, data)
            return {query, Store: data.store }
          
        }
       
     
    }
    
    constructor(props) {
        super(props);
        this.state = {
            Loading : true,
            Restaurant : undefined
        }
    }
    
 
   componentDidMount(){
        window.scrollTo(0,0);
        if(this.props.query != undefined )
        {
            FetchRestaurant(this.props.query.nameRestaurant, this.props.query.id).then(res => {
                if(res && res.store.length >= 1)
                   this.setState({Restaurant : res.store})
                    else 
                    Router.push("/khong-tim-thay");
            }).catch(err =>  Router.push("/khong-tim-thay"))
        } else Router.push("/khong-tim-thay")
        
      
   }
   

    render(){
        const {Store} = this.props
        const {Restaurant} = this.state
        let name = '';
        let description = '';
        let image = '';
        if(Store != undefined && Store.length > 0){
            name = Store[0].name == undefined ? '' : Store[0].name
             description = Store[0].short_decription == undefined ? '' : Store[0].name
             image = Store[0].list_images == undefined ? '' : ChangeLinkImage(Store[0].list_images[0])
        }
      

        return(
            <div id="wrapper">
                 <Head>
                     <title>{`${name} - TikFood`}</title>
                     <meta name="description" content={`${name} - ${description}`}></meta>
                     <meta property="og:description" content={`${name} - ${description} - TikFood`}></meta>
                     <meta property="og:image" content={image}></meta>
               </Head>
             {/* content*/}
             <div className="content">
                 
                 <Banner Restaurant={Restaurant} storeID = {this.props.query.id != undefined ? this.props.query.id : undefined}/>
 
                 <StickyContainer>
                     <Sticky topOffset={340}>
                         {({ style, isSticky }) => <Share style={style} isSticky={isSticky}  query={this.props.query}  Restaurant={Restaurant}/>}
                     </Sticky>
                 
                     <div className="gray-bg no-top-padding">
                     <div className="container">
                             <Breadcrumb Restaurant={Restaurant} query={this.props.query}/>
                         <div className="clearfix" />
                         <div className="row">
                         {/* list-single-main-wrapper-col */}
                         <div className="col-md-8">
                             
                             <ListImage Restaurant={Restaurant}/>   
 
                             <Discount Restaurant={Restaurant}/>
                             
                             <Description Restaurant={Restaurant}/>
                             
                             <Point Restaurant={Restaurant}/>
 
                             <MenuRestaurant Restaurant={Restaurant}/> 
 
                             <Comment storeID = {this.props.query.id != undefined ? this.props.query.id : undefined} />
                         
                         </div>
                         {/* list-single-main-wrapper-col end */}
 
                         <Info Restaurant={Restaurant} query={this.props.query}/>
                         
                         {/* list-single-sidebar end */}                                
                         </div>
                     </div>
                     </div>
                 
                 <div className="limit-box fl-wrap" />
                 </StickyContainer>
             </div>
             {/*content end*/}
             </div>
 
         )
       }
}