import React from "react";
import {Link} from "react-router-dom"
import Skeleton from 'react-loading-skeleton';
import {FetchRestaurantswithSearch, CheckStoreInDatabase, GetUserWToken, FetchRestaurantswithLocation} from "../../API/Api"
import {openNotificationWithIcon} from "../../API/showNotication"
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import {ChangeLinkImage, TransHTML} from "../../API/pathname"
import ReactHtmlParser from 'react-html-parser';
import Slider from "react-slick";
import {Rate, Spin} from "antd"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class DetailStore extends React.Component{

    constructor(props) {
        super(props);
        this.autocomplete = null
        this.onLoadMap = this.onLoadMap.bind(this)
        this.onPlaceChanged = this.onPlaceChanged.bind(this)

        this.state = {
            textSearch: '',
            addressDetail: '',
            RestaurantSearchText: undefined,
            RestaurantLocation: undefined,
            isLoad: false
        }
    }

    componentDidMount(){
     
    }


    onSearch = () => {
        this.setState({isLoad: true, RestaurantSearchText: undefined})
        if(cookies.get('partner') != undefined){
            if(this.state.textSearch == ''){
                openNotificationWithIcon('error','Vui lòng nhập tên của cửa hàng', '', 'bottomRight')
                this.setState({isLoad: false})
            } else {
                FetchRestaurantswithSearch(this.state.textSearch).then(res => {
                    this.setState({RestaurantSearchText: res.data.message, isLoad: false})
                    //console.log(res.data)
                })
            }
        } else {
            openNotificationWithIcon('error','Đây không phải là tài khoản đối tác', 'Vui lòng thử lại', 'bottomRight')
            this.setState({isLoad: false})
        }
    }

    onLoadMap (autocomplete) {
        this.autocomplete = autocomplete
    }
    
    onPlaceChanged () {
        if (this.autocomplete !== null) {
            console.log(this.autocomplete.getPlace())
            //console.log('id: ', this.autocomplete.getPlace().geometry.location.lat(), this.autocomplete.getPlace().geometry.location.lng())
            this.setState({addressDetail: this.autocomplete.getPlace().formatted_address})
            this.onSearchLocation(this.autocomplete.getPlace().geometry.location.lng(), this.autocomplete.getPlace().geometry.location.lat())
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    onSearchLocation = (long, lat) => {
        this.setState({isLoad: true, RestaurantLocation: undefined})
        if(cookies.get('partner') != undefined){
            if(this.state.addressDetail == ''){
                openNotificationWithIcon('error','Vui lòng nhập địa chỉ của cửa hàng', '', 'bottomRight')
                this.setState({isLoad: false})
            } else {
                FetchRestaurantswithLocation(long,lat).then(res => {
                    this.setState({RestaurantLocation: res.data.stores, isLoad: false})
                    console.log(res.data.stores)
                }).catch(err => {
                    this.setState({isLoad: false, RestaurantLocation: []})
                })
            }
        } else {
            openNotificationWithIcon('error','Đây không phải là tài khoản đối tác', 'Vui lòng thử lại', 'bottomRight')
            this.setState({isLoad: false})
        }
    }
 
    onLoad = () => {
        if(this.state.isLoad == true)
            return (
                <div className="row mt-5">
                <div className="col-12">
                    <div className="text-center my-6">
                    <a className="text-success"><i className="bx bx-loader bx-spin font-size-18 align-middle mr-2" /> Đang tải..... </a>
                    </div>
                </div> {/* end col*/}
                </div>
            )
    }

    checkStoreInData = (idStore) => {
        if(cookies.get('partner')){
            GetUserWToken(cookies.get('partner')).then(res =>{
                console.log(res.user._id)
                CheckStoreInDatabase(idStore, res.user._id).then(res => {
                    if(res.status == 201){
                        openNotificationWithIcon('success','Cửa hàng bạn xác nhận đã thành công', 'Vui lòng đợi quản trị viên kiểm duyệt!', 'bottomRight')
                    } else openNotificationWithIcon('error','Lỗi', 'Vui lòng thử lại', 'bottomRight')
                }).catch(err => openNotificationWithIcon('error','Lỗi', 'Vui lòng thử lại', 'bottomRight'))
            }).catch(err => openNotificationWithIcon('error','Lỗi', 'Vui lòng thử lại', 'bottomRight'))
        }
    }


    showStorewithSearchText = () => {
        if(this.state.RestaurantSearchText != undefined) {
            if(this.state.RestaurantSearchText.length > 0){
                return(
                    <div className="table-responsive">
                    <table className="table project-list-table table-nowrap table-centered table-borderless">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: 100}}>#</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Danh mục</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            <>
                            {
                                this.state.RestaurantSearchText.map((item,index) => {
                                    return(
                                        <tr key={index}>
                                            <td><img src={item._source.list_images.length > 0 ? item._source.list_images[0] : ''}  className="avatar-sm" /></td>
                                            <td>
                                            <h5 className="text-truncate font-size-14"><a className="text-dark">{item._source.name}</a></h5>
                                            </td>
                                            <td>{item._source.category.name}</td>
                                            <td>{item._source.address.address_detail}</td>
                                            {
                                                item._source.ischeck_storepartner == 0 ? 
                                                <td><span className="badge badge-warning">Đợi xác nhận</span></td> : item._source.partner.length == 0 ? 
                                                <td><span className="badge badge-primary">Chưa có sở hữu</span></td> : <td><span className="badge badge-danger">Đã có đối tác</span></td>
                                            }
                                            <td>
                                            <div className="dropdown">
                                                <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="false">
                                                <i className="mdi mdi-dots-horizontal font-size-18" />
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                <Link target='_blank'  to={`/checkstore/${item._id}`} className="dropdown-item">Chi tiết cửa hàng</Link>
                                                {
                                                    item._source.ischeck_storepartner == 1 && item._source.partner.length == 0 && 
                                                    <a onClick={() => this.checkStoreInData(item._id)} className="dropdown-item">Xác nhận chủ sở hữu</a>
                                                }
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </>
                        }
    
                        </tbody>
                    </table>
                    </div>
                )
            } else {
                return(
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="text-center my-6">
                            <a className="text-success">Không tìm thấy cửa hàng bạn cần tìm </a>
                            </div>
                        </div> {/* end col*/}
                     </div>
                )
            }
        }
    }

    showStorewithSearchLocation = () => {
        if(this.state.RestaurantLocation != undefined) {
            if(this.state.RestaurantLocation.length > 0){
                return(
                    <div className="table-responsive">
                    <table className="table project-list-table table-nowrap table-centered table-borderless">
                        <thead>
                        <tr>
                            <th scope="col">Tên</th>
                            <th scope="col">Danh mục</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            <>
                            {
                                this.state.RestaurantLocation.map((item,index) => {
                                    return(
                                        <tr key={index}>
                                            
                                            <td>
                                            <h5 className="text-truncate font-size-14"><a className="text-dark">{item.name}</a></h5>
                                            </td>
                                            <td>{item.category.name}</td>
                                            <td>{item.address.address_detail}</td>
                                            {
                                                item.ischeck_storepartner == 0 ? 
                                                <td><span className="badge badge-warning">Đợi xác nhận</span></td> : item.partner.length == 0 ? 
                                                <td><span className="badge badge-primary">Chưa có sở hữu</span></td> : <td><span className="badge badge-danger">Đã có đối tác</span></td>
                                            }
                                            <td>
                                            <div className="dropdown">
                                                <a href="#" className="dropdown-toggle card-drop" data-toggle="dropdown" aria-expanded="false">
                                                <i className="mdi mdi-dots-horizontal font-size-18" />
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                <Link target='_blank'  to={`/checkstore/${item._id}`} className="dropdown-item">Chi tiết cửa hàng</Link>
                                                {
                                                    item.ischeck_storepartner == 1 && item.partner.length == 0 && 
                                                    <a onClick={() => this.checkStoreInData(item._id)} className="dropdown-item">Xác nhận chủ sở hữu</a>
                                                }
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </>
                        }
    
                        </tbody>
                    </table>
                    </div>
                )
            } else {
                return(
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="text-center my-6">
                            <a className="text-success">Không tìm thấy cửa hàng bạn cần tìm </a>
                            </div>
                        </div> {/* end col*/}
                     </div>
                )
            }
        }
    }

    render(){
    return(
        <div className="page-content">
            <div className="main-content">
                <div className="container-fluid">
             
                    <div className="row">
                        <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 font-size-18">Xác nhận cửa hàng</h4>
                            <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                                <li className="breadcrumb-item active">Xác nhận cửa hàng</li>
                            </ol>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* end page title */}
                    <div className="checkout-tabs">
                        <div className="row">
                        <div className="col-xl-2 col-sm-3">
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className="nav-link active" id="v-pills-shipping-tab" data-toggle="pill" href="#v-pills-shipping" role="tab" aria-controls="v-pills-shipping" aria-selected="false">
                                <i className="bx bx-store d-block check-nav-icon mt-4 mb-2" />
                                <p className="font-weight-bold mb-4">Tìm theo tên</p>
                            </a>
                            <a className="nav-link " id="v-pills-payment-tab" data-toggle="pill" href="#v-pills-payment" role="tab" aria-controls="v-pills-payment" aria-selected="true"> 
                                <i className="bx bx-map-pin d-block check-nav-icon mt-4 mb-2" />
                                <p className="font-weight-bold mb-4">Tìm theo địa chỉ</p>
                            </a>
                         
                            </div>
                        </div>

                        <div className="col-xl-10 col-sm-9">
                            
                                <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade active show" id="v-pills-shipping" role="tabpanel" aria-labelledby="v-pills-shipping-tab">
                                    <div className="card" style={{marginBottom: 0}}>
                                        <div className="card-body">
                                            <div className=" row ">
                                                <label htmlFor="billing-name" className="col-md-2 col-form-label">Tên cửa hàng</label>
                                                <div className="col-md-8 col-8">
                                                    <input type="text" className="form-control" id="billing-name" placeholder="Nhập tên cửa hàng bạn cần tìm"
                                                    value={this.state.textSearch} onChange={(e) => this.setState({textSearch: e.target.value})}/>
                                                </div>
                                                <div className="col-md-2 col-4">
                                                <button className="btn btn-primary btn-block inner" onClick={() => this.onSearch()}>Tìm</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {this.showStorewithSearchText()}
                                 
                                </div>
                                
                                <div className="tab-pane fade " id="v-pills-payment" role="tabpanel" aria-labelledby="v-pills-payment-tab">
                                    <div className="card" style={{marginBottom: 0}}>
                                            <div className="card-body">
                                                <div className=" row ">
                                                    <label htmlFor="billing-name" className="col-md-2 col-form-label">Địa chỉ</label>
                                                    <div className="col-md-10 col-8">
                                                    <LoadScript
                                                        googleMapsApiKey="AIzaSyCObmUDNsw4qthZE2wu2uCtNn776xy197U"
                                                        libraries={["places"]}
                                                        >
                                                            <Autocomplete
                                                                fields="geometry.location"
                                                                onLoad={this.onLoadMap}
                                                                onPlaceChanged={this.onPlaceChanged}
                                                            >
                                                                <input type="text" className="form-control" id="billing-name" placeholder="Nhập địa chỉ cửa hàng bạn cần tìm"
                                                                    value={this.state.addressDetail} onChange={(e) => this.setState({addressDetail: e.target.value})}/>
                                                            </Autocomplete>
                                                        </LoadScript>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        {this.showStorewithSearchLocation()}
                                </div>
                                </div>

                                {this.onLoad()}
                        </div>
                        </div>
                    </div>


        </div> {/* container-fluid */}
        </div>
        </div>
    )}
}