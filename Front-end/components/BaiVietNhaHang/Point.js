import React from "react";
import Skeleton from 'react-loading-skeleton';
import CountUp from 'react-countup';
import ReactHtmlParser from 'react-html-parser'

export default class Point extends React.Component{

    render(){
        const {Restaurant} = this.props;
       // const Restaurant = undefined
        if(Restaurant != undefined){
            if(Restaurant.length > 1)
            {
                return(                            
                        <div className="list-single-facts fl-wrap">
                        <div className="row">
                        <div className="col-md-4">
                            {/* inline-facts */}
                            <div className="inline-facts-wrap gradient-bg ">
                            <div className="inline-facts">
                                <i className="fal fa-users" />
                                <div className="milestone-counter">
                                <div className="stats animaper">
                                    <CountUp end={Restaurant[0].reviewer_quantity} className="num"/>  
                                </div>
                                </div>
                                <h6>Số người đánh giá</h6>
                            </div>
                            <div className="stat-wave">
                                <svg viewBox="0 0 100 25">
                                <path fill="#fff" d="M0 30 V12 Q30 17 55 2 T100 11 V30z" />
                                </svg>
                            </div>
                            </div>
                            {/* inline-facts end */}
                        </div>
                        <div className="col-md-4">
                            {/* inline-facts  */}
                            <div className="inline-facts-wrap gradient-bg ">
                            <div className="inline-facts">
                                <i className="fal fa-smile-plus" />
                                <div className="milestone-counter">
                                <div className="stats animaper">
                                    <CountUp end={Restaurant[0].star_s5_quantity} className="num"/>                               
                                </div>
                                </div>
                                <h6>Số người đánh giá cao</h6>
                            </div>
                            <div className="stat-wave">
                                <svg viewBox="0 0 100 25">
                                <path fill="#fff" d="M0 30 V12 Q30 17 55 12 T100 11 V30z" />
                                </svg>
                            </div>
                            </div>
                            {/* inline-facts end */}
                        </div>
                        <div className="col-md-4">
                            {/* inline-facts  */}
                            <div className="inline-facts-wrap gradient-bg ">
                            <div className="inline-facts">
                                <i className="fal fa-award" />
                                <div className="milestone-counter">
                                <div className="stats animaper">
                                 <div className="num">{Restaurant[0].average_stars}</div>
                                </div>
                                </div>
                                <h6>Điểm trung bình đánh giá</h6>
                            </div>
                            <div className="stat-wave">
                                <svg viewBox="0 0 100 25">
                                <path fill="#fff" d="M0 30 V12 Q30 12 55 5 T100 11 V30z" />
                                </svg>
                            </div>
                            </div>
                            {/* inline-facts end */}  
                        </div>
                        </div>
                    </div>
                )
            } else {
                return(
                    <div className="list-single-main-wrapper fl-wrap" id="sec4"> 
                        {/* list-single-main-item */} 
                        <div className="list-single-main-item fl-wrap block_box">
                            <div className="list-single-main-item-title">
                            <h3>Ưu đãi</h3>
                            </div>
                            <div className="list-single-main-item_content fl-wrap">
                             {ReactHtmlParser(Restaurant.menu)}
                            </div>
                        </div>
                        </div>
                )
            }
            
        } else 
        return(
            <div className="list-single-main-wrapper fl-wrap" id="sec4">                   
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