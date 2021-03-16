import React from "react";
import Link from "next/link"

export default class BreadCrumbs extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Restaurant : undefined,
        }
    }
    

    render(){
        const {Restaurant} = this.props;
        //const Restaurant = undefined
        if(Restaurant != undefined)
        {
            if(Restaurant.length > 1){
                return(
                    <div className="breadcrumbs inline-breadcrumbs fl-wrap" style={{marginTop: "25px"}}>
                    <Link href="/"><a>Trang chủ</a></Link>
                    <Link href="/nha-hang"><a>Nhà hàng</a></Link>
                    <Link href={`/nha-hang?page=1&category=${Restaurant.find(item => item._id == this.props.query.id).category.name_link}`}>
                        <a >{Restaurant.find(item => item._id == this.props.query.id).category.name}</a>
                        </Link>
                    <span>{Restaurant[0].name.slice(0,40)}</span> 
                    </div>
                )
            }
            else {
                return(
                    <div className="breadcrumbs inline-breadcrumbs fl-wrap" style={{marginTop: "25px"}}>
                    <Link href="/"><a>Trang chủ</a></Link>
                    <Link href="/nha-hang"><a>Nhà hàng</a></Link>
                <Link href={`/nha-hang?page=1&category=${Restaurant[0].category.name_link}`}><a >{Restaurant[0].category.name}</a></Link>
                    <span>{Restaurant[0].name.slice(0,40)}</span> 
                    </div>
                )
            }
            
        }
        else return(
            <div className="breadcrumbs inline-breadcrumbs fl-wrap" style={{marginTop: "25px"}}>
                      
            </div>
        )
    }
}