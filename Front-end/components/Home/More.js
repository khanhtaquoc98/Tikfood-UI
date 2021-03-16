import React from "react";
import Link from 'next/link'
import {Spin, Rate, Tooltip, notification } from 'antd'
import {GetCategory,FetchRestaurants, UserLikeStore} from '../../Api/Api'
import { LoadingOutlined } from '@ant-design/icons';
import {ChangeLinkImage} from '../../Api/pathname'
const antIcon = <LoadingOutlined style={{ fontSize: 40, margin: "10rem 0" }} spin />;
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class More extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            ListCategory: undefined,
            URL: '',
            ListRestaurant: undefined
        }
    }
    
    componentDidMount(){
        GetCategory().then(res => this.setState({ListCategory: res.list_category}))
        FetchRestaurants(1, '', '', '', '', '').then(res => this.setState({ListRestaurant: res.data.store}))
    }

    showPrice = (min, max)=>{
        if(this.props.isGridView){
            return(
            <div className="geodir-category-location fl-wrap"><a className="map-item"><i className="fal fa-clock" />Giá chỉ từ {(min*1).toLocaleString('vi', {style : 'currency', currency : 'VND'})} - {(max*1).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</a></div>
            )
        }
    }

    onClickCategory = (key) => {
        this.setState({ListRestaurant: undefined})
        FetchRestaurants(1, key, '', '', '', '').then(res => this.setState({ListRestaurant: res.data.store}))
        this.setState({URL : key})
    }

    LikeStore = (idStore) =>{
        if(cookies.get('user') != undefined){
            UserLikeStore(cookies.get('user'), idStore).then(res => {
                notification.success({
                    message: "Bạn vừa thích " + res.store,
                    placement: "bottomLeft"
                })
            }).catch(err => 
                notification.info({
                    message: 'Cửa hàng này bạn đã thích',
                    description: '',
                    placement: "bottomLeft",
                    style: {textAlign: "left"}
                })
                )
        } else {
            notification.warning({
                message: 'Bạn vui lòng đăng nhập',
                description: 'Vui lòng bạn đăng nhập mới có thể yêu thích cửa hàng',
                placement: "bottomLeft",
                style: {textAlign: "left"}
            })
        }
    }

    showCategory = () => {
        const {ListCategory, URL} = this.state
        if(ListCategory != undefined){
            return(
                ListCategory.slice(0,4).map((item, index) => {
                    return(
                        <a key={index} 
                        onClick = {() => this.onClickCategory(item.name_link)}
                        className={`gallery-filter ${URL == item.name_link ? "gallery-filter-active" : ""}`} >
                            {item.name} 
                        </a>
                    )
                })
            )
        }
    }

    showRestaurant = () => {
        const {ListRestaurant } = this.state
        if(ListRestaurant == undefined){
            return(
                <Spin indicator={antIcon} />       
            )
        } else {
            return(
                ListRestaurant.slice(0,8).map((item, index) => {
                    return(
                        <div key={index} className="gallery-item col-lg-4 col-md-6 col-12">
                        {/* listing-item  */}
                        <div className="listing-item">
                        <article className="geodir-category-listing fl-wrap" style={{height: "100%"}}>
                                        <div className="geodir-category-img">
                                        <div className="geodir-js-favorite_btn" onClick={() => this.LikeStore(item._id)}><i className="fal fa-heart" /><span>Yêu thích</span></div>
                                        <Link href={`/${item.name_linkurl_store}/${item._id}`}><a  className="geodir-category-img-wrap fl-wrap">
                                            <img src={ChangeLinkImage(item.list_images[0])} style={{height: "227px"}}/> 
                                        </a></Link>
                                        <div className="geodir-category-opt">
                                            <div className="listing-rating-count-wrap">
                                            <Rate disabled style={{fontSize: ".8rem"}} className="listing-rating card-popup-rainingvis" allowHalf defaultValue={item.average_score_comment  } />
                                            <br />
                                                <div className="reviews-count">{item.list_comment_id.length} đánh giá</div>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="geodir-category-content fl-wrap">
                                        <div className="geodir-category-content-title fl-wrap">
                                            <div className="geodir-category-content-title-item" style={{height: "106px" }}>
                                                <h3 className="title-sin_map nameStore">
                                                    <Link href={`/${item.name_linkurl_store}/${item._id}`}>
                                                    <a>{item.name.length > 34 ? item.name.slice(0,34) + "..." : item.name}</a>
                                                     </Link>
                                                </h3>
                                                {(item.partner != undefined  && item.partner.length > 0) &&<span class="verified-badge"><i class="fal fa-check"></i></span>}
                                                <div className="geodir-category-location fl-wrap"><a className="map-item"><i className="fas fa-map-marker-alt" />{item.address.address_detail}</a></div>
                                                <div className="geodir-category-location fl-wrap"><a className="map-item"><i className="fal fa-clock" />{item.time_open}</a></div>
                                                {this.showPrice(item.min_price, item.max_price)}
                                            </div>
                                        </div>
                                        <div className="geodir-category-text fl-wrap">
                                         <p className="small-text">{item.short_decription}</p>
                                           
                                        </div>
                                        <div className="geodir-category-footer fl-wrap">
                                        <a className="listing-item-category-wrap">
                                    
                                            <Tooltip placement="bottom" title="Danh mục" className="tooltip">
                                            <div className="listing-item-category red-bg"><i className="fas fa-utensils" /></div>
                                            <span>{item.category.name}</span>
                                            </Tooltip>
                                            <Tooltip placement="bottom" title="Bình luận tích cực" className="tooltip">
                                            <div className="listing-item-category" style={{background: "#81c784", marginLeft: ".8rem"}}><i className="fas fa-thumbs-up" /></div> 
                                            <span>{item.positive_sentimet_quantity}</span>
                                            </Tooltip>
                                            <Tooltip placement="bottom" title="Bình luận tiêu cực" className="tooltip">
                                            <div className="listing-item-category" style={{background: "#e57373", marginLeft: ".8rem"}}><i className="fas fa-thumbs-down" /></div> 
                                            <span>{item.nagative_sentimet_quantity}</span>
                                            </Tooltip>   
                                         </a>
                                        </div>
                                        </div>
                                    </article>
                        </div>              
                    </div>
                    )
                })
            )
        }
    }

    render(){
        return(
            <section>
            <div className="container big-container">
                <div className="section-title">
                <h2><span>Có thể bạn thích</span></h2>
                <div className="section-subtitle">Best Listings</div>
                <span className="section-separator" />
                <p>Nhà hàng mới trên tikfood.</p>
                </div>
                <div className="listing-filters gallery-filters fl-wrap">
                {this.state.ListCategory != undefined && 
                    <a className={`gallery-filter ${this.state.URL == '' ? "gallery-filter-active" : ""}`} 
                     onClick={() => this.onClickCategory('')}>Tất cả</a>}
                    {this.showCategory()}
                </div>
                <div className="grid-item-holder gallery-items fl-wrap row" style={{margin: "0 0 1.4rem 0"}}>
                {/*  gallery-item*/}
                    {this.showRestaurant()}                                                                                      
                </div>
                <Link href={this.state.URL == '' ? "/nha-hang?page=1" : `/nha-hang?page=1&category=${this.state.URL}`}><a className="btn  dec_btn  color2-bg">Xem thêm<i className="fal fa-arrow-alt-right" /></a></Link>
            </div>
            
            </section>
        )
    }
}