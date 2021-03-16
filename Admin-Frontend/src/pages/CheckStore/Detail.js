import React from "react";
import Skeleton from 'react-loading-skeleton';
import {FetchDetailRestaurant, GetComment, deleteStore, checkOkStore , checkCancelStore, FetchUserDetail} from "../../API/Api"
import {openNotificationWithIcon} from "../../API/showNotication"
import {ChangeLinkImage, TransHTML} from "../../API/pathname"
import ReactHtmlParser from 'react-html-parser';
import Slider from "react-slick";
import {Rate} from "antd"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class DetailCheckStore extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            DetailRestaurant: undefined,
            onClickImage: undefined,
            Comments: undefined,
            Partner: undefined,
        }
    }

    componentDidMount(){
        if(this.props.match.params.id && cookies.get('admin') !== undefined){
            FetchDetailRestaurant(cookies.get('admin'), this.props.match.params.id ).then(res => {
                this.setState({DetailRestaurant: res.store})
                FetchUserDetail(cookies.get('admin'), res.store.partner).then(res => {
                    this.setState({Partner: res.user})
                })
            })
            GetComment(this.props.match.params.id).then(res => {
                this.setState({Comments: res.user})
            })
            
        }
    }

    next = () => {
        this.slider.slickNext();
      }

    previous = () => {
    this.slider.slickPrev();
    }

    showImage = (listImage) => {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            vertical: true,
            verticalSwiping: true,
          };
        return(
            <>
            <button type="button" className="btn btn-primary waves-effect waves-light mt-2 mr-1" onClick={this.previous}>
                    <i className="bx bx-up-arrow"/>
            </button>
            <Slider {...settings} ref={c => (this.slider = c)}>
                   {
                       listImage.map((item, index) => {
                           return(
                            <a className="nav-link " key={index} onClick={() => this.setState({onClickImage: item})}>
                                <img className="img-fluid mx-auto d-block rounded" src={item}/>
                            </a>
                           )
                       })
                   }
                </Slider>
                <button type="button" className="btn btn-primary waves-effect waves-light mt-2 mr-1" onClick={this.next}>
                    <i className="bx bx-down-arrow"/>
                </button></>
        )
    }

    showComment = () => {
       if(this.state.Comments != undefined){
           return(
               <>
               {
                this.state.Comments.map((item, index) => {
                    return(
                     <div className="media py-3 border-bottom" key={index}>
                     <img src={item.user_id.avatar == 'Chưa cập nhật' ? "data:image/jpeg;base64,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"
                     : item.user_id.avatar} className="avatar-xs mr-3 rounded-circle" alt="img" />
                     <div className="media-body">
                     <h5 className="mt-0 mb-1 font-size-15">{item.user_id.fullname == 'Chưa cập nhật' ? item.user_id.email : item.user_id.fullname }  
                     <Rate value={item.star} disabled style={{fontSize: "15px", marginLeft: "10px"}}/></h5>
                     <p className="text-muted">{item.content}</p>
                     <ul className="list-inline float-sm-right mb-sm-0">
                         <li className="list-inline-item">
                            {item.sentimet_comment == 0 ? <a><i className="far fa-thumbs-up mr-1" /> Tích cực</a> : <a><i className="far fa-thumbs-down mr-1" /> Tiêu cực</a>}
                         </li>
                         <li className="list-inline-item">
                         <a><i className="far fa-trash-alt mr-1" /> Xóa</a>
                         </li>
                     </ul>
                     <div className="text-muted font-size-12"><i className="far fa-calendar-alt text-primary mr-1" />{item.created_at}</div>
                     </div>
                 </div>)
                })
               }
               </>
           )
       }
    }

    onOkStore = (idStore) => {
        if(cookies.get('admin') != undefined){
            checkOkStore(cookies.get('admin'), idStore).then(res => {
                openNotificationWithIcon('success','Cửa hàng duyệt thành công', '', 'bottomRight')
                this.props.history.push('/checkstores')
            }).catch(err => {
                openNotificationWithIcon('error','Lỗi', 'Vui lòng thử lại', 'bottomRight')
            })
        }
    }

    onCancelStore = (idStore) => {
        if(cookies.get('admin') != undefined){
            checkCancelStore(cookies.get('admin'), idStore).then(res => {
                openNotificationWithIcon('success','Cửa hàng không được duyệt', '', 'bottomRight')
                this.props.history.push('/checkstores')
            }).catch(err => {
                openNotificationWithIcon('error','Lỗi', 'Vui lòng thử lại', 'bottomRight')
            })
        }
    }

    render(){
        const {DetailRestaurant} = this.state
          if(DetailRestaurant === undefined){
              return(<div></div>)
          } else {
            return(
                <div className="page-content">
                    <div className="main-content">
                      <div className="container-fluid">
                          {/* start page title */}
                          <div className="row">
                          <div className="col-12">
                              <div className="page-title-box d-flex align-items-center justify-content-between">
                              <h4 className="mb-0 font-size-18">Chi tiết cửa hàng</h4>
                              <div className="page-title-right">
                                  <ol className="breadcrumb m-0">
                                  <li className="breadcrumb-item"><a >Trang chủ</a></li>
                                  <li className="breadcrumb-item"><a >Cửa hàng</a></li>
                                  <li className="breadcrumb-item active">Chi tiết cửa hàng</li>
                                  </ol>
                              </div>
                              </div>
                          </div>
                          </div>
                          {/* end page title */}
                          <div className="row">
                          <div className="col-lg-12">
                              <div className="card">
                              <div className="card-body">
                                  <div className="row">
                                  <div className="col-xl-6">
                                      <div className="product-detai-imgs">
                                      <div className="row">
                                          <div className="col-md-2 col-sm-3 col-4">
                                          <div className="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                              {DetailRestaurant.list_images && this.showImage(DetailRestaurant.list_images)}
                                          </div>
                                          </div>
                                          <div className="col-md-10 col-sm-9 col-8">
                                          <div className="tab-content" >
                                              <div className="tab-pane fade show active" id="product-1" role="tabpanel" aria-labelledby="product-1-tab">
                                              <div>
                                                  {
                                                      DetailRestaurant.list_images.length > 0 &&  <img src={this.state.onClickImage == undefined ?
                                                        ChangeLinkImage(DetailRestaurant.list_images[0]) : ChangeLinkImage(this.state.onClickImage)} 
                                                        className="img-fluid mx-auto d-block" />
                                                  }
                                                 
                                              </div>
                                              </div>
                                              
                                          </div>
                                        
                                          </div>
                                      </div>
                                      </div>
                                  </div>
                                  <div className="col-xl-6">
                                      <div className="mt-4 mt-xl-3">
                                      <a  className="text-primary">{DetailRestaurant.category.name}</a>
                                      <h4 className="mt-1 mb-1">{DetailRestaurant.name}</h4>
                                      <p className="text-muted float-left mr-3">
                                         <Rate value={DetailRestaurant.average_stars} disabled style={{fontSize: "1rem"}}/>
                                      </p>
                                      <p className="text-muted mb-3" style={{marginTop: ".4rem"}}>( {DetailRestaurant.reviewer_quantity} người đánh giá)</p>

                                      <p className="mb-1"><b>Mô tả ngắn: </b>{DetailRestaurant.short_decription}</p>
                                      <p className="mb-1"><b>Địa chỉ: </b>{DetailRestaurant.address.address_detail}</p>
                                      <p className="mb-1"><b>Giờ mở cửa: </b>{DetailRestaurant.time_open}</p>
                                      <p className="mb-1"><b>Giá: </b>{DetailRestaurant.min_price} đến {DetailRestaurant.max_price} </p>
                                      <p className="mb-1"><b>ID đối tác xét duyệt: </b>{DetailRestaurant.partner} </p>
                                      {
                                          this.state.Partner && <p className="mb-1"><b>Tên đối tác xét duyệt: </b>{this.state.Partner.fullname} </p>
                                      }
                                       {
                                          this.state.Partner && <p className="mb-1"><b>Email đối tác xét duyệt: </b>{this.state.Partner.email} </p>
                                      }
                                     {
                                         /* <div className="row mb-3">
                                          <div className="col-md-6">
                                          <div>
                                              <p className="text-muted"><i className="bx bx-unlink font-size-16 align-middle text-primary mr-1" /> Wireless</p>
                                              <p className="text-muted"><i className="bx bx-shape-triangle font-size-16 align-middle text-primary mr-1" /> Wireless Range : 10m</p>
                                              <p className="text-muted"><i className="bx bx-battery font-size-16 align-middle text-primary mr-1" /> Battery life : 6hrs</p>
                                          </div>
                                          </div>
                                          <div className="col-md-6">
                                          <div>
                                              <p className="text-muted"><i className="bx bx-user-voice font-size-16 align-middle text-primary mr-1" /> Bass</p>
                                              <p className="text-muted"><i className="bx bx-cog font-size-16 align-middle text-primary mr-1" /> Warranty : 1 Year</p>
                                          </div>
                                          </div>
                                      </div>*/
                                     }
                                      
                                      <div >
                                        <button type="button" class="btn btn-success waves-effect waves-light mt-2 mr-1">
                                                    <i class="bx bx-check-double font-size-16 align-middle mr-2" onClick={() => this.onOkStore(this.props.match.params.id)}></i> Duyệt
                                                </button>
                                           
                                              <button type="button" className="btn btn-danger waves-effect  mt-2 waves-light" onClick={() => this.onCancelStore(this.props.match.params.id)}>
                                              <i className="bx bxs-trash-alt mr-2" /> Không duyệt
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                                  </div>

                                    <div className="mt-5">
                                        <h5 className="mb-3">Thông tin thêm :</h5>
                                        <div className="table-responsive">
                                            <table className="table mb-0 table-bordered">
                                            <tbody>
                                                <tr>
                                                <th scope="row" >Link map</th>
                                                <td><a target="_blank" href={DetailRestaurant.address.link_url}>{DetailRestaurant.address.link_url}</a></td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Latitude</th>
                                                <td>{DetailRestaurant.address.latitude}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Longtitude</th>
                                                <td>{DetailRestaurant.address.longtitude}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Ngày tạo</th>
                                                <td>{DetailRestaurant.created_at}</td>
                                                </tr>
                                                <tr>
                                                <th scope="row">Cập nhật lần cuối</th>
                                                <td>{DetailRestaurant.updated_at}</td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        </div>

                                  <div className="mt-5">
                                  <h5>Ưu đãi :</h5>
                                  <p> {ReactHtmlParser(TransHTML(DetailRestaurant.sale_detail))}</p>
                                  </div>

                                  <div className="mt-5">
                                  <h5>Giới thiệu:</h5>
                                  <p> {ReactHtmlParser(TransHTML(DetailRestaurant.introduction))}</p>
                                  </div>

                                  <div className="mt-5">
                                  <h5>Menu:</h5>
                                  <p> {ReactHtmlParser(TransHTML(DetailRestaurant.menu))}</p>
                                  </div>

                                      {/* end row */}
                                      <div className="mt-5">
                                  <h5 className="mb-3">Thông tin đánh giá:</h5>
                                      <div className="row justify-content-between">
                                            <div className="col-md-6">
                                            <div className="table-responsive">
                                                <h5 style={{textAlign: "center"}}>Đánh giá từ Google</h5>
                                            <table className="table mb-0 table-bordered">
                                      <tbody>
                                          <tr>
                                          <th scope="row">Người đánh giá</th>
                                          <td>{DetailRestaurant.reviewer_quantity} người</td>
                                          </tr>
                                          <tr>
                                          <th scope="row">Điểm</th>
                                          <td>{DetailRestaurant.average_stars}</td>
                                          </tr>
                                         <tr>
                                          <th scope="row">Đánh giá 5 sao</th>
                                          <td>{DetailRestaurant.star_s5_quantity} người</td>
                                          </tr>
                                          <tr>
                                          <th scope="row">Đánh giá 4 sao</th>
                                          <td>{DetailRestaurant.star_s4_quantity} người</td>
                                          </tr>
                                          <tr>
                                          <th scope="row">Đánh giá 3 sao</th>
                                          <td>{DetailRestaurant.star_s3_quantity} người</td>
                                          </tr>
                                          <tr>
                                          <th scope="row">Đánh giá 2 sao</th>
                                          <td>{DetailRestaurant.star_s2_quantity} người</td>
                                          </tr>
                                          <tr>
                                          <th scope="row">Đánh giá 1 sao</th>
                                          <td>{DetailRestaurant.star_s1_quantity} người</td>
                                          </tr>
                                      </tbody>
                                      </table>
                                            </div>
                                            </div>

                                            <div className="col-md-6"> 
                                            <div className="table-responsive">
                                            <h5 style={{textAlign: "center"}}>Đánh giá từ ứng dụng</h5>
                                            <table className="table mb-0 table-bordered">
                                      <tbody>
                                          <tr>
                                          <th scope="row">Người đánh giá</th>
                                          <td>{DetailRestaurant.list_comment_id.length} người</td>
                                          </tr>
                                          <tr>
                                          <th scope="row">Điểm</th>
                                          <td>{DetailRestaurant.average_score_comment}</td>
                                          </tr>
                                          <tr>
                                          <th scope="row">Đánh giá tích cực</th>
                                          <td>{DetailRestaurant.nagative_sentimet_quantity} người</td>
                                          </tr>
                                          <tr>
                                          <th scope="row">Đánh giá tiêu cực</th>
                                          <td>{DetailRestaurant.positive_sentimet_quantity} người </td>
                                          </tr>
                                      </tbody>
                                      </table>
                                            </div>
                                            </div>
                                      </div>
                                  </div>
                                  {/* end Specifications */}
                                  <div className="mt-5">
                                  <h5>Đánh giá người dùng :</h5>
                                     {this.showComment()}
                                  </div>
                              </div>
                              </div>
                              {/* end card */}
                          </div>
                          </div>
                        
                      </div> {/* container-fluid */}
                      </div>
                      </div>
            )}
    }
}