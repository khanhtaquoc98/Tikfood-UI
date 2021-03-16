import React from "react";
import Skeleton from 'react-loading-skeleton';
import Location from "./location"
import More from "./moreRestaurants"
import Link from "next/link"
import BookTable from "./booktable"

export default class Info extends React.Component{

    constructor(props) {
        super(props);
    }
    

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(function(position) {
            if(position.coords != undefined){
                if (typeof localStorage !== "undefined") {
                    localStorage.setItem('latUser', position.coords.latitude)
                    localStorage.setItem('longUser', position.coords.longitude)
                 }
            }
        });
    }

    render(){
        const {Restaurant} = this.props;
        let UrlGG = undefined;
        if(Restaurant != undefined){
            if(Restaurant.length > 1)
            {
                if (typeof localStorage !== "undefined") {
                    if(localStorage.getItem('latUser') != undefined && localStorage.getItem('longUser') != undefined){
                        UrlGG = "https://www.google.com/maps/dir/" + localStorage.getItem('latUser') + "," + localStorage.getItem('longUser') +  "/" 
                        + (Restaurant[0].address.longtitude*1 > Restaurant[0].address.latitude*1 ? Restaurant[0].address.latitude*1 : Restaurant[0].address.longtitude*1)
                        + "," + (Restaurant[0].address.longtitude*1 > Restaurant[0].address.latitude*1 ? Restaurant[0].address.longtitude*1 : Restaurant[0].address.latitude*1)
                   }
                 }
                return(
                    <div className="col-md-4">
                      {/*box-widget-item */}                                       
                      <div className="box-widget-item fl-wrap block_box">
                    <div className="box-widget-item-header">
                        <h3 style={{marginBottom: 0}}>Thông tin thêm</h3>
                    </div>
                    <div className="box-widget">
                        <div className="map-container">
                        <Location 
                        lng={Restaurant[0].address.longtitude*1 > Restaurant[0].address.latitude*1 ? Restaurant[0].address.longtitude*1 : Restaurant[0].address.latitude*1}  
                        lat={Restaurant[0].address.longtitude*1 > Restaurant[0].address.latitude*1 ? Restaurant[0].address.latitude*1 : Restaurant[0].address.longtitude*1}  />
                        </div>
                        <div className="box-widget-content bwc-nopad">
                        <div className="list-author-widget-contacts list-item-widget-contacts bwc-padside">
                            <ul className="no-list-style">
                            <li><span><i className="fal fa-map-marker" /> Địa chỉ :</span>
                             <a href={(typeof localStorage !== "undefined" && localStorage.getItem('latUser') != undefined && localStorage.getItem('longUser') != undefined) 
                                    ?  UrlGG : (Restaurant[0].address.link_url) } target="_blank">
                                   
                                {Restaurant[0].address.address_detail}</a>
                            </li>
                            <li><span><i className="fal fa-map-marker" /> Giá khoảng :</span>
                             <a >
                                   {Restaurant[0].min_price.toLocaleString('vi', {style : 'currency', currency : 'VND'})} - {Restaurant[0].max_price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                                   </a>
                            </li>
                            <li><span><i className="fal fa-map-marker" /> Giờ hoạt động :</span>
                             <a >
                             {Restaurant[0].time_open.slice(2)}
                                   </a>
                            </li>
                           {/* <li><span><i className="fal fa-phone" /> Phone :</span> <a href="#">+7(123)987654</a></li>
                            <li><span><i className="fal fa-envelope" /> Mail :</span> <a href="#">AlisaNoory@domain.com</a></li>
                            <li><span><i className="fal fa-browser" /> Website :</span> <a href="#">themeforest.net</a></li>*/}
                            </ul>
                        
                        </div>
                        </div>
                    </div>
                    </div>
                    {/*box-widget-item end */}  
                    {/*box-widget-item end */}   
                        <BookTable query={this.props.query} name={Restaurant[0].name}/>                                           
                            
                                       
                   
                    {/*box-widget-item */}
                    <div className="box-widget-item fl-wrap block_box">
                    <div className="box-widget-item-header">
                        <h3 style={{marginBottom: 0}}>Cửa hàng liên quan:</h3>
                    </div>
                    <More restaurant={Restaurant}  query={this.props.query}/>
                    </div>
                    {/*box-widget-item end */}      
                    {/*box-widget-item */}
                    <div className="box-widget-item fl-wrap block_box">
                    <div className="box-widget-item-header">
                        <h3>Tags</h3>
                    </div>
                    <div className="box-widget opening-hours fl-wrap">
                        <div className="box-widget-content">
                        <div className="list-single-tags tags-stylwrap">
                                   
                            {
                                Restaurant.map((item, index)=> {
                                    return(
                                    <Link key={index} href={`/nha-hang?page=1&category=${item.category.name_link}`}><a >{item.category.name}</a></Link>
                                    )
                                })
                            }                                                                  
                        </div>
                        </div>
                    </div>
                    </div>
                    {/*box-widget-item end */}       
                </div>
                )
            } else {
                    if(localStorage.getItem('latUser') != undefined && localStorage.getItem('longUser') != undefined){
                        UrlGG = "https://www.google.com/maps/dir/" + localStorage.getItem('latUser') + "," + localStorage.getItem('longUser') +  "/" 
                        + (Restaurant[0].address.longtitude*1 > Restaurant[0].address.latitude*1 ? Restaurant[0].address.latitude*1 : Restaurant[0].address.longtitude*1)
                        + "," + (Restaurant[0].address.longtitude*1 > Restaurant[0].address.latitude*1 ? Restaurant[0].address.longtitude*1 : Restaurant[0].address.latitude*1)
                   }
                   return(
                       <div className="col-md-4">
                              <div className="box-widget-item fl-wrap block_box">
                    <div className="box-widget-item-header">
                        <h3 style={{marginBottom: 0}}>Thông tin thêm</h3>
                    </div>
                    <div className="box-widget">
                        <div className="map-container">
                        <Location 
                        lng={Restaurant[0].address.longtitude*1 > Restaurant[0].address.latitude*1 ? Restaurant[0].address.longtitude*1 : Restaurant[0].address.latitude*1}  
                        lat={Restaurant[0].address.longtitude*1 > Restaurant[0].address.latitude*1 ? Restaurant[0].address.latitude*1 : Restaurant[0].address.longtitude*1}  />
                        </div>
                        <div className="box-widget-content bwc-nopad">
                        <div className="list-author-widget-contacts list-item-widget-contacts bwc-padside">
                            <ul className="no-list-style">
                            <li><span><i className="fal fa-map-marker" /> Địa chỉ :</span>
                             <a href={(typeof localStorage !== "undefined" && localStorage.getItem('latUser') != undefined && localStorage.getItem('longUser') != undefined) 
                                    ?  UrlGG : (Restaurant[0].address.link_url) } target="_blank">
                                   
                                {Restaurant[0].address.address_detail}</a>
                            </li>
                            <li><span><i className="fal fa-map-marker" /> Giá khoảng :</span>
                             <a >
                                   {Restaurant[0].min_price.toLocaleString('vi', {style : 'currency', currency : 'VND'})} - {Restaurant[0].max_price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
                                   </a>
                            </li>
                            <li><span><i className="fal fa-map-marker" /> Giờ hoạt động :</span>
                             <a >
                             {Restaurant[0].time_open.slice(2)}
                                   </a>
                            </li>
                           {/* <li><span><i className="fal fa-phone" /> Phone :</span> <a href="#">+7(123)987654</a></li>
                            <li><span><i className="fal fa-envelope" /> Mail :</span> <a href="#">AlisaNoory@domain.com</a></li>
                            <li><span><i className="fal fa-browser" /> Website :</span> <a href="#">themeforest.net</a></li>*/}
                            </ul>
                        
                        </div>
                        </div>
                    </div>
                    </div>
                    {/*box-widget-item end */}  
                    {/*box-widget-item end */}   
                        <BookTable query={this.props.query} name={Restaurant[0].name}/>                                           
                            
                                       
                       {/*box-widget-item */}
                       <div className="box-widget-item fl-wrap block_box">
                            <div className="box-widget-item-header">
                                <h3 style={{marginBottom: 0}}>Cửa hàng liên quan:</h3>
                            </div>
                            <More restaurant={Restaurant}  query={this.props.query}/>
                        </div>
                       {/*box-widget-item end */}      
                       {/*box-widget-item */}
                       <div className="box-widget-item fl-wrap block_box">
                       <div className="box-widget-item-header">
                           <h3>Tags</h3>
                       </div>
                       <div className="box-widget opening-hours fl-wrap">
                           <div className="box-widget-content">
                           <div className="list-single-tags tags-stylwrap">
                                      
                               {
                                   Restaurant.map((item, index)=> {
                                       return(
                                        <Link key={index} href={`/nha-hang?page=1&category=${item.category.name_link}`}><a>{item.category.name}</a></Link>
                                       )
                                   })
                               }                                                                  
                           </div>
                           </div>
                       </div>
                       </div>
                       {/*box-widget-item end */}       
                   </div>
                   )
            }
        } else 
        return(
            <div className="list-single-main-wrapper fl-wrap" id="sec6">                   
                <div className="list-single-main-item fl-wrap block_box">
                    <div className="list-single-main-item-title">
                    <h3><Skeleton width={"30%"}/></h3>
                    </div>
                    <div className="list-single-main-item_content fl-wrap">
                    <p><Skeleton/></p>
                    <p><Skeleton/></p>
                    <p><Skeleton/></p>
                    <p><Skeleton/></p>
                    <p><Skeleton/></p>
                    </div>
                </div>
            </div>
        )
    }

}