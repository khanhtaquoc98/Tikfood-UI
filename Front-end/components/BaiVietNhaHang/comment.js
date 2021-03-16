import React from "react";
import Skeleton from 'react-loading-skeleton';
import { Rate, notification } from 'antd';
import {  Slider, Tooltip, Spin } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import axios from "axios"
import {GetComment, PostCommentUser, DeleteCommentforUser, GetUserWToken} from "../../Api/Api"

export default class Comment extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            User: undefined,
            commentStore: undefined,
            quality: 4,
            location: 2,
            price: 5,
            space: 1,
            point : 3,
            isSent : false
        }
    }

    componentDidMount(){
        this.GetCommentStore();
        this.GetUser();
    }
    
    GetCommentStore = () => {
        if(this.props.storeID != undefined){
            GetComment(this.props.storeID).then(res =>{
                this.setState({commentStore: res})
               } )
        }
       
    }

    GetUser = () => {
        if(cookies.get('user') != undefined){
            this.setState({isLogin: true})
            GetUserWToken(cookies.get('user')).then(res => this.setState({User : res.user}))
        } 
    }

    onChangeQuality = value => {
        const { location, price, space} = this.state
        let Point = Math.ceil((value + location + price + space)/4)
        this.setState({
            quality : value,
            point : Point
        })
    };

    onChangeLocation = value => {
        const {quality, price, space} = this.state
        let Point = Math.ceil((value + quality + price + space)/4)
        this.setState({
            location : value,
            point : Point
        })
    };

    onChangePrice = value => {
        const {quality, location, space} = this.state
        let Point = Math.ceil((value + quality + space + location)/4)
        this.setState({
            price : value,
            point : Point
        })
    };

    onChangeSpace = value => {
        const {quality, location, price} = this.state
        let Point = Math.ceil((value + quality + location + price)/4)
        this.setState({
            space : value,
            point : Point
        })
    };

    onChangeContent = (event) => {
        this.setState({content : event.target.value})
    }

    onSubmit = async () => {
        if(this.state.content != undefined)
        {
            //url heruko: https://pacific-forest-91560.herokuapp.com/sentcomment
            this.setState({isSent: true})
            await axios.post("http://localhost:5000/sentcomment", {
                "text" : this.state.content
            }).then(res => {
                let pointAfter = (this.state.point*4 +  (res.data.result[0] == 0 ? 5 : 0)*1)/5
            
                PostCommentUser(cookies.get('user'), this.state.content, pointAfter , res.data.result[0], this.props.storeID).then(res => {
                    this.GetCommentStore();
                    notification.success({
                        message: 'Cảm ơn bạn vừa đánh giá',
                        placement: "bottomLeft"
                    })
                    this.setState({
                        quality: 4,
                        location: 2,
                        price: 5,
                        space: 1,
                        point : 3,
                        content: "",
                        isSent: false
                    })
                })
            }).catch((err) => {
                notification.error({
                    message: 'Bạn chưa có đặt bàn ở cửa hàng nên bạn chưa được bình luận ở đây',
                    placement: "bottomLeft"
                })
            })
            
        }
        
    }

    onDeletComment = (idComment) => {
        if(cookies.get('user') != undefined)
        {
            DeleteCommentforUser(idComment, cookies.get('user')).then(res => {
                this.GetCommentStore();
                notification.success({
                    message: 'Đánh giá của bạn vừa được xoá',
                    placement: "bottomLeft"
                })
            })
        }
        
    }

    showComment = (comments) => {
        return(
            comments.map((item,index) => {
                return(
                        <div className="reviews-comments-item" key={index} style={{paddingLeft: "90px"}}>
                            <div className="review-comments-avatar">
                                <img src={item.user_id.avatar == "Chưa cập nhật" ? "/images/avatar/avatar-bg.png" : item.user_id.avatar}  /> 
                            </div>
    
                        <div className="reviews-comments-item-text fl-wrap">
                                        <div className="reviews-comments-header fl-wrap">
                                        <h4 style={{marginBottom: "0px"}}>
                                         <a>{item.user_id.fullname == "Chưa cập nhật" ? item.user_id.email : item.user_id.fullname}</a>
                                          <Rate disabled defaultValue={item.star} style={{fontSize: "12px", marginLeft: ".4rem"}}/>
                                        </h4>
                                        {
                                            item.sentimet_comment != undefined && 
                                            <div className="review-score-user"> 
                                            <Tooltip placement="bottom" title={`${item.sentimet_comment == 0 ? "Bình luận tích cực" : "Bình luận tiêu cực"}`}>
                                            <span className="review-score-user_item" style = {{background: `${item.sentimet_comment == 0 ? "#81c784" : "#e57373"}`}}>
                                                <i className={`${item.sentimet_comment == 0 ? "fas fa-thumbs-up" : "fas fa-thumbs-down"}`} ></i></span>
                                           </Tooltip>
                                            </div>
                                        }
                                       
                                        
                                         <div className="reviews-comments-item-date"><span><i className="far fa-calendar-check" />{item.created_at}</span>
                                        {
                                            (  this.state.User != undefined && item.user_id._id == this.state.User._id ) 
                                            && <a style={{marginLeft: ".8rem"}} onClick={() => this.onDeletComment(item._id)}>Xoá</a>
                                        }
                                         </div>
                                        </div>
                                         <p>{item.content}</p>
                            </div>  
                        </div>
                )
            })
        )
    }

    Comment = () => {
        const {quality, location, price, space, point} = this.state
        if(cookies.get('user') != undefined){
            return(
                <div className="add-comment  custom-form" name="rangeCalc">
                     <Spin spinning={this.state.isSent}  tip="Đang gửi...">
                                <fieldset>
                                <div className="review-score-form fl-wrap">
                                    <div className="review-range-container">
                                    {/* review-range-item*/}
                                    <div className="review-range-item ">
                                        <div className="range-slider-title">Chất lượng</div>
                                        <div className="range-slider-wrap ">
                                            <Slider defaultValue={quality}  min={0} max={5} onChange={this.onChangeQuality}/>
                                        </div>
                                    </div>
                                    {/* review-range-item end */} 
                                    {/* review-range-item*/}
                                    <div className="review-range-item ">
                                        <div className="range-slider-title">Giá cả</div>
                                        <div className="range-slider-wrap ">
                                            <Slider defaultValue={price}  min={0} max={5} onChange={this.onChangePrice}/>
                                        </div>
                                    </div>
                                    {/* review-range-item end */} 
                                    {/* review-range-item*/}
                                    <div className="review-range-item ">
                                        <div className="range-slider-title">Vị trí</div>
                                        <div className="range-slider-wrap ">
                                            <Slider defaultValue={location}  min={0} max={5} onChange={this.onChangeLocation}/>
                                        </div>
                                    </div>
                                    {/* review-range-item end */} 
                                    {/* review-range-item*/}
                                    <div className="review-range-item ">
                                        <div className="range-slider-title">Không gian</div>
                                        <div className="range-slider-wrap ">
                                            <Slider defaultValue={space}  min={0} max={5} onChange={this.onChangeSpace}/>
                                        </div>
                                    </div>
                                    {/* review-range-item end */}                                     
                                    </div>
                                    <div className="review-total">
                                    <span style={{color:"#4DB7FE"}}>{ Math.ceil((space + quality + location + price)/4)}</span>    
                                
                                    <strong>Điểm nhận xét</strong>
                                    </div>
                                </div>
                                <div className="list-single-main-item_content fl-wrap">
                                    <textarea cols={40} rows={3} placeholder="Nhận xét của bạn:" 
                                    defaultValue={""} name="content" 
                                    value={this.state.content}
                                    onChange={this.onChangeContent}/>
                                    <div className="clearfix" />
                                
                                    <div className="clearfix" />
                                    <button onClick={this.onSubmit} className="btn  color2-bg  float-btn">Gửi <i className="fal fa-paper-plane" /></button>
                                </div>
                                </fieldset>
                                </Spin>
                            </div>
            )
        } else {
            return(<div style={{padding: "1rem"}}>Đăng nhập để đánh giá</div>)
        }
    }

    showStar = (number) => {
        let start = ''
        for(let i = 1; i <= number; i++){
            start = start + '<i className="fas fa-star"></i>'                                
        }
       return start
    }

    render(){
        const {commentStore, User} = this.state;
       // const Restaurant = undefined
       //console.log(commentStore ? commentStore.store.positive_sentimet_quantity/commentStore.store.list_comment_id.length * 100 : 0)
        if(commentStore != undefined ){
                return(
                    <>
                    <div className="list-single-main-item fl-wrap block_box" name="danhgia">
                        <div className="list-single-main-item-title">
                        <h3>Đánh giá từ Google - <span>{commentStore.store.star_s5_quantity} người</span></h3>
                            </div>
                            <div className="reviews-score-wrap fl-wrap">
                            <div className="review-score-total">
                                <span className="review-score-total-item">
                                {commentStore.store.average_stars}
                                </span>
                                <div className="listing-rating card-popup-rainingvis" data-starrating2="4">
                                    {ReactHtmlParser(this.showStar(commentStore.store.average_stars))}
                                    <div className="card-popup-rainingvis_bg">
                                        <span className="card-popup-rainingvis_bg_item"></span><span className="card-popup-rainingvis_bg_item">
                                            </span><span className="card-popup-rainingvis_bg_item"></span><span className="card-popup-rainingvis_bg_item"></span>
                                    <span className="card-popup-rainingvis_bg_item"></span><div></div></div></div>
                            </div>
                               
                                <div className="review-score-detail">
                                    {/* review-score-detail-list*/}
                                    <div className="review-score-detail-list">
                                    {/* rate item*/}
                                  
                                    {/* rate item end*/}
                                    {/* rate item*/}
                                    <div className="rate-item">
                                        <div className="rate-item-title"><span style={{color: "#FACC39"}}> <i className="fas fa-star"></i></span></div>
                                        <div className="rate-item-bg" data-percent="100%">
                                        <div className="rate-item-line gradient-bg" 
                                       style={{width: commentStore ? `${commentStore.store.star_s1_quantity/commentStore.store.reviewer_quantity * 100}%` : 0}} />
                                        </div>
                                        <div className="rate-item-percent">{commentStore.store.star_s1_quantity} đánh giá</div>
                                    </div>

                                    <div className="rate-item">
                                        <div className="rate-item-title"><span style={{color: "#FACC39"}}><i className="fas fa-star"></i><i className="fas fa-star"></i></span></div>
                                        <div className="rate-item-bg" data-percent="100%">
                                        <div className="rate-item-line gradient-bg" 
                                       style={{width: commentStore ? `${commentStore.store.star_s2_quantity/commentStore.store.reviewer_quantity * 100}%` : 0}} />
                                        </div>
                                        <div className="rate-item-percent">{commentStore.store.star_s2_quantity} đánh giá</div>
                                    </div>

                                    <div className="rate-item">
                                        <div className="rate-item-title"><span style={{color: "#FACC39"}}><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></span></div>
                                        <div className="rate-item-bg" data-percent="100%">
                                        <div className="rate-item-line gradient-bg" 
                                       style={{width: commentStore ? `${commentStore.store.star_s3_quantity/commentStore.store.reviewer_quantity* 100}%` : 0}} />
                                        </div>
                                        <div className="rate-item-percent">{commentStore.store.star_s3_quantity} đánh giá</div>
                                    </div>

                                    <div className="rate-item">
                                        <div className="rate-item-title"><span style={{color: "#FACC39"}}><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></span></div>
                                        <div className="rate-item-bg" data-percent="100%">
                                        <div className="rate-item-line gradient-bg" 
                                       style={{width: commentStore ? `${commentStore.store.star_s4_quantity/commentStore.store.reviewer_quantity* 100}%` : 0}} />
                                        </div>
                                        <div className="rate-item-percent">{commentStore.store.star_s4_quantity} đánh giá</div>
                                    </div>

                                    <div className="rate-item">
                                        <div className="rate-item-title"><span style={{color: "#FACC39"}}><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></span></div>
                                        <div className="rate-item-bg" data-percent="100%">
                                        <div className="rate-item-line gradient-bg" 
                                       style={{width: commentStore ? `${commentStore.store.star_s5_quantity/commentStore.store.reviewer_quantity * 100}%` : 0}} />
                                        </div>
                                        <div className="rate-item-percent">{commentStore.store.star_s5_quantity} đánh giá</div>
                                    </div>  
                                    
                                    </div>
                                    {/* review-score-detail-list end*/}
                                </div>
                                </div>
                        
                    </div>

                    <div className="list-single-main-item fl-wrap block_box">
                            <div className="list-single-main-item-title">
                             <h3>Đánh giá - <span>{commentStore.store.list_comment_id.length} người</span></h3>
                            </div>

                            <div className="reviews-score-wrap fl-wrap">
                                <div className="review-score-total">
                                    <span className="review-score-total-item">
                                        {commentStore.store.average_score_comment}
                                    </span>
                                   
                                </div>
                                <div className="review-score-detail">
                                    {/* review-score-detail-list*/}
                                    <div className="review-score-detail-list">
                                    {/* rate item*/}
                                    <div className="rate-item">
                                        <div className="rate-item-title"><span>Tích cực</span></div>
                                        <div className="rate-item-bg" data-percent="100%">
                                        <div className="rate-item-line gradient-bg" 
                                        style={{width: commentStore ? `${commentStore.store.positive_sentimet_quantity/commentStore.store.list_comment_id.length * 100}%` : 0}} />
                                        </div>
                                        <div className="rate-item-percent">{commentStore.store.positive_sentimet_quantity} đánh giá</div>
                                    </div>
                                    {/* rate item end*/}
                                    {/* rate item*/}
                                    <div className="rate-item">
                                        <div className="rate-item-title"><span>Tiêu cực</span></div>
                                        <div className="rate-item-bg" data-percent="100%">
                                        <div className="rate-item-line gradient-bg" 
                                       style={{width: commentStore ? `${commentStore.store.nagative_sentimet_quantity/commentStore.store.list_comment_id.length * 100}%` : 0}} />
                                        </div>
                                        <div className="rate-item-percent">{commentStore.store.nagative_sentimet_quantity} đánh giá</div>
                                    </div>
                                    
                                    </div>
                                    {/* review-score-detail-list end*/}
                                </div>
                                </div>


                            {/* reviews-score-wrap end */}                                             
                            <div className="list-single-main-item_content fl-wrap">
                            <div className="reviews-comments-wrap">
                                {this.showComment(commentStore.store.list_comment_id)}
                                                                                           
                            </div>
                            </div>
                        </div>

                        <div className="list-single-main-item fl-wrap block_box" name="vietdanhgia">
                            <div className="list-single-main-item-title fl-wrap">
                            <h3>Nhận xét của bạn</h3>
                            </div>
                            {/* Add Review Box */}
                            <div id="add-review" className="add-review-box">
                            {/* Review Comment */}
                                {this.Comment()}
                            </div>
                            {/* Add Review Box / End */}
                        </div>    
                    </>
                )
            
        } else 
        return(
            <div className="list-single-main-wrapper fl-wrap" id="danhgia">                   
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