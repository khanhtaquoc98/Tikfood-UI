import React from "react";
import Link from "next/link"
import {FetchRestaurants} from '../../Api/Api'

export default class moreRestaunrants extends React.Component{

    static getInitialProps({query}) {
        return {query}
    }


    constructor(props) {
        super(props);
        this.state = {
            Restaurant : undefined,
        }
    }
    
    componentDidMount() {
      //  console.log(this.props.query)
        if(this.props.query.id != undefined )
        {
            let query =  this.props.restaurant.find(item => item._id == this.props.query.id)
            //console.log(query)
            FetchRestaurants(1,query.category.name_link, '', '', '', '', '').then(res => {
                this.setState({Restaurant : res.data})
            })
        }
        
    }

    showRes = (restaurant) => {
       
    }

    showData = (restaurant) => {
       return(
           <ul className="no-list-style">
              {
                   restaurant != undefined && (
                    restaurant.slice(0,4).map((item, index) => {
                        return(
                            <li key={index}>
                            <div className="widget-posts-img">
                                <Link href={`/${item.name_linkurl_store}/${item._id}`}><a> <img src={item.list_images[0]}></img></a></Link>
                            </div>
                            <div className="widget-posts-descr">
                                    <h4><Link href={`/${item.name_linkurl_store}/${item._id}`}><a>{item.name}</a></Link></h4>
                            <div className="geodir-category-location fl-wrap"><a><i className="fas fa-map-marker-alt" />{item.address.address_detail}</a></div>
                        <div className="widget-posts-descr-link"><a>{item.category.name}</a></div>
                            <div className="widget-posts-descr-score">{item.average_stars}</div>
                            </div>
                        </li>
                        )
                    })
                   )
              }
           </ul>
       )
    }

    render(){
       if(this.state.Restaurant != undefined){
           return(
            <div className="box-widget  fl-wrap">
            <div className="box-widget-content">
            {/*widget-posts*/}
            <div className="widget-posts  fl-wrap">
            
            {this.showData(this.state.Restaurant.store)}
           
                
        </div>
        {/* widget-posts end*/}
        </div>
    </div>
       )
       } else {
        return(
            <div className="box-widget  fl-wrap">
            <div className="box-widget-content">
            {/*widget-posts*/}
            <div className="widget-posts  fl-wrap">
               <ul className="no-list-style">
               <li>
                            <div className="widget-posts-img"><a href="listing-single.html"><img src="/images/gallery/thumbnail/1.png"  /></a>  
                            </div>
                            <div className="widget-posts-descr">
                            <h4><a href="listing-single.html">Iconic Cafe</a></h4>
                            <div className="geodir-category-location fl-wrap"><a href="#"><i className="fas fa-map-marker-alt" /> 40 Journal Square Plaza, NJ, USA</a></div>
                            <div className="widget-posts-descr-link"><a href="listing.html">Restaurants </a>   <a href="listing.html">Cafe</a></div>
                            <div className="widget-posts-descr-score">4.1</div>
                            </div>
                        </li>
               </ul>
        </div>
        {/* widget-posts end*/}
        </div>
    </div>
       )
       }
    }
}