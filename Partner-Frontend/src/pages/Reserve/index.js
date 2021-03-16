import React from "react";
import Skeleton from 'react-loading-skeleton';
import {Link, } from 'react-router-dom'
import Pagination from "react-js-pagination";
import {FetchUserDetail, PutActiveUser, FetchStoreofPartner, PostStoreofPartner, PutUser} from "../../API/Api"
import {openNotificationWithIcon} from "../../API/showNotication"
import queryString  from "query-string"
import Cookies from 'universal-cookie';
import { Select,Modal,Spin, Radio,Tooltip  } from 'antd';

const { Option } = Select

const cookies = new Cookies();

export default class DetailUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            User: undefined,
            Store: undefined,
            Active: 0,
            EditActive: false,
            modal1Visible: false,
            loading: false,
            Ten: undefined,
            GioiTinh: undefined,
            SDT: undefined,
            Email: undefined,
            DiaChi: undefined,
            IDStorePost: undefined,
        }
    }


    componentDidMount(){
        if(cookies.get('partner') != undefined){
            FetchUserDetail(cookies.get('partner')).then(res => {
                this.setState({User: res.user})
            }).catch({  })
            FetchStoreofPartner(cookies.get('partner')).then(res => {
                this.setState({Store: res.user})
            }).catch({  })
        }
    }


    showStore = () => {
        if(this.state.Store != undefined){
            if(this.state.Store.length == 0){
                return(<div>Chưa có nhà hàng nào quản lí</div>)
            } else {
                return(
                    <>
                        {
                            this.state.Store.map((item, index) => {
                                return(
                                    <div className="col-md-4" key={index}>
                                <div className="card">
                                    <div className="card-body">
                                    <div className="media">
                                        <div className="avatar-md mr-4">
                                        <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                                            <img src={item.list_images[0]} height={30} />
                                        </span>
                                        </div>
                                        <div className="media-body overflow-hidden">
                                        <h5 className="text-truncate font-size-15"><a href="#" className="text-dark">{item.name}</a></h5>
                                        <p className="text-muted" style={{marginBottom: "0"}}>{item.category.name}</p>
                                        <p className="text-muted" style={{textOverflow:"ellipsis",whiteSpace:"nowrap", overflow:"hidden"}}>
                                            {item.address.address_detail} đơn</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="card-footer bg-transparent border-top">
                                        <div className="contact-links d-flex font-size-20">
                                            <div className="flex-fill" style={{textAlign: "center"}}>
                                            <Tooltip placement="bottom" title="Đặt bàn">
                                            <Link  to={`/reserve/${item._id}`}><i className="bx bx-calendar-event" /></Link>
                                            {
                                                item.list_reserve.length > 0 && 
                                                <span className="badge badge-pill badge-soft-danger font-size-12" style={{position: "absolute", marginLeft: ".2rem", marginTop :".4rem"}}>
                                                { item.list_reserve.length}</span>
                                            }
                                            </Tooltip>
                                            </div>
                                            <div className="flex-fill" style={{textAlign: "center"}}>
                                            <Tooltip placement="bottom" title="Thông tin cửa hàng">
                                            <Link to={`/stores/${item._id}`}><i className="bx bx-store-alt" /></Link>
                                            </Tooltip>
                                            </div>
                                            <div className="flex-fill" style={{textAlign: "center"}}>
                                            <Tooltip placement="bottom" title="Chỉnh sửa cửa hàng">
                                            <Link to={`/stores/edit/${item._id}`}><i className="bx bx-edit" /></Link>
                                            </Tooltip>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                                </div>
                                )
                            })
                        } 
                    </>
                )
               
            }
        }
    }

    render(){
       // console.log(this.props.match.params)
        const {User} = this.state
       if(User != undefined){
        return(
            <div className="page-content">
                <div className="main-content">
                 <div className="container-fluid">
                     {/* start page title */}
                     <div className="row">
                     <div className="col-12">
                         <div className="page-title-box d-flex align-items-center justify-content-between">
                         <h4 className="mb-0 font-size-18">Quản lý cửa hàng</h4>
                         <div className="page-title-right">
                             <ol className="breadcrumb m-0">
                             <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                             <li className="breadcrumb-item"><a >Quản lý cửa hàng</a></li>
                             </ol>
                         </div>
                         </div>
                     </div>
                     </div>
                     {/* end page title */}
                     <div>
                         <div className="row">
                         <div className="col-md-6">
                             <div className="card mini-stats-wid">
                             <div className="card-body">
                                 <div className="media">
                                 <div className="media-body">
                                     <p className="text-muted font-weight-medium">Số lượng quản lý cửa hàng</p>
                                     <h4 className="mb-0">{this.state.Store ? this.state.Store.length : 0} cửa hàng</h4>
                                 </div>
                                 <div className="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                     <span className="avatar-title">
                                     <i className="bx bxs-store font-size-24" />
                                     </span>
                                 </div>
                                 </div>
                             </div>
                             </div>
                         </div>
                         <div className="col-md-6">
                             <div className="card mini-stats-wid">
                             <div className="card-body">
                                 <div className="media">
                                 <div className="media-body">
                                     <p className="text-muted font-weight-medium">Số lượng đặt bàn</p>
                                     <h4 className="mb-0">{User.list_reserve_store.length}</h4>
                                 </div>
                                 <div className="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
                                     <span className="avatar-title">
                                     <i className="bx bx-calendar-event font-size-24" />
                                     </span>
                                 </div>
                                 </div>
                             </div>
                             </div>
                         </div>
                         </div>
                         <div className="row">
                         {this.showStore()}
                         </div>
                         
                     </div>
                     {/* end row */}
                 </div> {/* container-fluid */}
                 </div>
                 </div>
          )
       } else {
            return (
                <></>
            )
       }
    }
}