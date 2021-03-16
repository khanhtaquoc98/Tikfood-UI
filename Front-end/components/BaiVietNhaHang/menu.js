import React from "react";
import Skeleton from 'react-loading-skeleton';
import ReactHtmlParser from 'react-html-parser';

export default class MenuRestaurant extends React.Component{

    render(){
        const {Restaurant} = this.props;
       // const Restaurant = undefined
        if(Restaurant != undefined){
            if(Restaurant.length > 1)
            {
                return(
                    <div className="list-single-main-wrapper fl-wrap" name="thucdon"> 
                    {/* list-single-main-item */} 
                    <div className="list-single-main-item fl-wrap block_box">
                        <div className="list-single-main-item-title">
                        <h3>Thực đơn</h3>
                        </div>
                        <div className="list-single-main-item_content fl-wrap">
                            {ReactHtmlParser(Restaurant[0].menu)}
                        </div>
                    </div>
                    </div>
                )
            } else {
                return(
                    <div className="list-single-main-wrapper fl-wrap" > 
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
            <div className="list-single-main-wrapper fl-wrap" name="thucdon">                   
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