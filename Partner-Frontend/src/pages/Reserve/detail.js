import React from "react";
import Skeleton from 'react-loading-skeleton';
import {Link, } from 'react-router-dom'
import Pagination from "react-js-pagination";
import {FetchAllReserve, DeleteReserver} from "../../API/Api"
import {openNotificationWithIcon} from "../../API/showNotication"
import queryString  from "query-string"
import Cookies from 'universal-cookie';
import { Select,Modal,Spin, Radio,Tooltip  } from 'antd';

const { Option } = Select

const cookies = new Cookies();

export default class ReserveDetail extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Reserve: undefined
        }
    }
    

    componentDidMount(){
        if(cookies.get('partner') != undefined){
            FetchAllReserve(cookies.get('partner'), this.props.match.params.id).then(res => {
                this.setState({Reserve: res.data.data.list_reserve})
            }).catch({  })
        }
    }

    onDeleteStore = (id) => {
        if(cookies.get('partner') != undefined){
            DeleteReserver(cookies.get('partner'),id).then(res => {
                if(res == null){
                    openNotificationWithIcon('error', 'Xoá thất bại', '', 'bottomRight');
                } else {
                    openNotificationWithIcon('success', 'Xóa thành công', '', 'bottomRight');
                    FetchAllReserve(cookies.get('admin'), this.props.match.params.id).then(res => {
                        this.setState({Reserve: res.data.data.list_reserve})
                    }).catch({  })
                }
                
            }).catch(err => {
                openNotificationWithIcon('error', 'Xoá thất bại', '', 'bottomRight');
            })
        }
    }

    showReserve = () => {
        if(this.state.Reserve != undefined) {
           return(
               <> 
               {
                    this.state.Reserve.map((item,index) => {
                        return(
                            <div className="col-xl-4 col-sm-6" key={index}>
                            <div className="card">
                            <div className="card-body">
                                <div className="row">
                                <div className="col-3">
                                    <a className="d-block text-primary mb-2">ID</a>
                                   
                                </div>
                                <div className="col-9">
                                    <div>
                                    <a className="d-block text-primary mb-2">#{item._id}</a>
                                   
                                    </div>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-3">
                                <p className="text-truncate">Tên</p>
                                </div>
                                <div className="col-9">
                                <p className="text-truncate">{item.name_user_reserve}</p>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-3">
                                <p className="text-truncate">SĐT</p>
                                </div>
                                <div className="col-9">
                                <p className="text-truncate">{item.phone}</p>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-3">
                                <p className="text-truncate">Số lượng</p>
                                </div>
                                <div className="col-9">
                                <p className="text-truncate">{item.quantity}</p>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-3">
                                <p className="text-truncate">Thời gian đặt</p>
                                </div>
                                <div className="col-9">
                                <p className="text-truncate">{item.time_coming}</p>
                                </div>
                                </div>
                               
                            </div>
                            <div className="card-footer bg-transparent border-top">
                                        <div className="contact-links d-flex font-size-20">
                                            <div className="flex-fill" style={{textAlign: "center"}}>
                                            <Tooltip placement="bottom" title="Xoá cửa hàng">
                                            <a onClick={() => this.onDeleteStore(item._id)}><i className="bx bx-window-close" /></a>
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

    render(){
        return(
           <div className="page-content">
               <div className="main-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">Chi tiết đặt bàn - {this.state.Reserve ? this.state.Reserve.length + " đơn đặt bàn" : "0 đơn đặt bàn"}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link to="/">Trang chủ</Link></li>
                            <li className="breadcrumb-item"><Link to="/reserve">Quản lý cửa hàng</Link></li>
                            <li className="breadcrumb-item active">Chi tiết đặt bàn</li>
                            </ol>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* end page title */}
                    <div className="row">
                        {this.showReserve()}
                       </div>
                    {/* end row */}
                    {/* end row */}
                </div> {/* container-fluid */}
                </div>
                </div>

        )
    }
}