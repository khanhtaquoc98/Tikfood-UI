import React from "react";
import Skeleton from 'react-loading-skeleton';
import ReactHtmlParser from 'react-html-parser';

export default class Description extends React.Component{

    componentDidMount(){
    }

    replaceAll = (str, find, replace) => {
        return str.replace(new RegExp(find, 'g'), replace);
      }
 

    render(){
        const {Restaurant} = this.props;
       // const Restaurant = undefined
        if(Restaurant != undefined){
            if(Restaurant.length > 1)
            {
                //const str_main_1 = Restaurant[0].introduction.replace('src=\"../Assets','data-src=\"../Assets')
                //const str_main_2 = Restaurant[0].introduction.replace('data-src="https://','src="https://')
                const src_1 = 'src=\"../Assets'
                const data_src_1 = 'data-src=\"../Assets'
                const src_2 = 'src="https://'
                const data_src_2 = 'data-src="https://'
                const str_main_1 = this.replaceAll(Restaurant[0].introduction,src_1,data_src_1)
                const str_main_2 = this.replaceAll(str_main_1,data_src_2,src_2)
                return(
                    <div className="list-single-main-wrapper fl-wrap" id="gioithieu"> 
                    {/* list-single-main-item */} 
                    <div className="list-single-main-item fl-wrap block_box">
                        <div className="list-single-main-item-title">
                        <h3>Giới thiệu</h3>
                        </div>
                        <div className="list-single-main-item_content fl-wrap">
                            {ReactHtmlParser(str_main_2)}
                        </div>
                    </div>
                    </div>
                )
            } else {
               // const str_main_1 = Restaurant.introduction.replace('src=\"../Assets','data-src=\"../Assets')
               // const str_main_2 = Restaurant.introduction.replace('data-src="https://','src="https://')
                const src_1 = 'src=\"../Assets'
                const data_src_1 = 'data-src=\"../Assets'
                const src_2 = 'src="https://'
                const data_src_2 = 'data-src="https://'
                const str_main_1 = this.replaceAll(Restaurant[0].introduction,src_1,data_src_1)
                const str_main_2 = this.replaceAll(str_main_1,data_src_2,src_2)
                return(
                    <div className="list-single-main-wrapper fl-wrap" id="gioithieu"> 
                        {/* list-single-main-item */} 
                        <div className="list-single-main-item fl-wrap block_box">
                            <div className="list-single-main-item-title">
                            <h3>Giới thiệu</h3>
                            </div>
                            <div className="list-single-main-item_content fl-wrap">
                             {ReactHtmlParser(str_main_2)}
                            </div>
                        </div>
                        </div>
                )
            }
            
        } else 
        return(
            <div className="list-single-main-wrapper fl-wrap" id="gioithieu">                   
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