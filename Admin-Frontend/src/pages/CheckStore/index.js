import React from "react";
import {Link} from "react-router-dom"
import Skeleton from 'react-loading-skeleton'; 
import Pagination from "react-js-pagination";
import {FetchRestaurantsPendding, checkCancelStore, checkOkStore} from "../../API/Api"
import {PathNameReplace} from "../../API/pathname"
import queryString  from "query-string"
import {openNotificationWithIcon} from "../../API/showNotication"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Stores extends React.Component{

      constructor(props) {
          super(props);
          this.state = {
            DataRestaurant: undefined
          }
      }
      

    componentDidMount(){
        FetchRestaurantsPendding().then(res => {
            this.setState({DataRestaurant: res.stores})
        })
    }


    showStore = (listStore) => {
        if(listStore.length > 0){
            return(
                <tbody>
                    {
                        listStore.map((item) => {
                            return(
                                <tr key={item._id}>
                                            <td><a className="text-body font-weight-bold">{item.name != undefined ? item.name : "Chưa cập nhật"}</a> </td>
                                            <td>{item.category.name != undefined ? item.category.name : "Chưa cập nhật"}</td>
                                            <td>
                                                {item.address.address_detail != undefined ? item.address.address_detail : "Chưa cập nhật"}
                                            </td>
                                            <td>
                                                {/* Button trigger modal */}
                                                <button type="button" className="btn btn-primary btn-sm btn-rounded" data-toggle="modal" onClick={() => this.props.history.push("/checkstores/" + item._id)}>
                                                Chi tiết
                                                </button>
                                            </td>
                                            <td>
                                                <a className="mr-3 text-primary" onClick={() => this.onOkStore(item._id)}>
                                                    <i className="bx bx-check-double font-size-18" /></a>
                                                <a  className="text-danger" onClick={() => this.onCancelStore(item._id)}>
                                                    <i className="mdi mdi-close font-size-18" /></a>
                                            </td>
                                            </tr>
                            )
                        })
                    }
                </tbody>
            )
        } else {
            return (
                <tbody>
                    <tr>
                        <td></td>
                    <td scope="row">
                            <div class="justify-content-center">
                                <p>Không tìm thấy hoặc đã hết cửa hàng.</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
    )
        }
       
       
    }

    onOkStore = (idStore) => {
        if(cookies.get('admin') != undefined){
            checkOkStore(cookies.get('admin'), idStore).then(res => {
                openNotificationWithIcon('success','Cửa hàng duyệt thành công', '', 'bottomRight')
                FetchRestaurantsPendding().then(res => {
                    this.setState({DataRestaurant: res.stores})
                })
            }).catch(err => {
                openNotificationWithIcon('error','Lỗi', 'Vui lòng thử lại', 'bottomRight')
            })
        }
    }

    onCancelStore = (idStore) => {
        if(cookies.get('admin') != undefined){
            checkCancelStore(cookies.get('admin'), idStore).then(res => {
                openNotificationWithIcon('success','Cửa hàng không được duyệt', '', 'bottomRight')
                FetchRestaurantsPendding().then(res => {
                    this.setState({DataRestaurant: res.stores})
                })
            }).catch(err => {
                openNotificationWithIcon('error','Lỗi', 'Vui lòng thử lại', 'bottomRight')
            })
        }
    }

    render() {
        const {DataRestaurant} = this.state
        if(this.state.DataRestaurant != undefined){
            return(
                <div className="page-content">
                <div className="main-content">
                <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                    <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">Cửa hàng đợi duyệt</h4>
                        <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active">Cửa hàng đợi duyệt</li>
                        </ol>
                        </div>
                    </div>
                    </div>
                </div>
                {/* end page title */}
                <div className="row">
                    <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-sm-4">
                            <div className="search-box mr-2 mb-2 d-inline-block">
                                <div className="position-relative">
                                <input type="text" className="form-control" placeholder="Search..." />
                                <i className="bx bx-search-alt search-icon" />
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-8">
                         
                            </div>{/* end col*/}
                        </div>
                        <div className="table-responsive">
                            <table className="table table-centered table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                <th>Tên</th>
                                <th>Danh mục</th>
                                <th>Địa chỉ</th>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                                {this.showStore(DataRestaurant)}
                            </table>
                        </div>
                        
                        
                        </div>
                    </div>
                    </div>
                </div>
                {/* end row */}
                </div> {/* container-fluid */}
                </div>
                </div>
            )
        }
        else {
            return (
                <div className="page-content">
                <div className="main-content">
                <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                    <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">Cửa hàng</h4>
                        <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active">Cửa hàng</li>
                        </ol>
                        </div>
                    </div>
                    </div>
                </div>
                {/* end page title */}
                <div className="row">
                    <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                        <div className="row mb-2">
                            <div className="col-sm-4">
                            <div className="search-box mr-2 mb-2 d-inline-block">
                                <div className="position-relative">
                                <input type="text" className="form-control" placeholder="Search..." />
                                <i className="bx bx-search-alt search-icon" />
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-8">
                            <div className="text-sm-right">
                            <Link to="/stores/add">
                                <button type="button" className="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2">
                                    <i className="mdi mdi-plus mr-1" /> 
                                    Thêm mới
                                </button></Link>
                            </div>
                            </div>{/* end col*/}
                        </div>
                        <div className="table-responsive">
                            <table className="table table-centered table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                <th style={{width: 20}}>
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">&nbsp;</label>
                                    </div>
                                </th>
                                <th>Tên</th>
                                <th>Danh mục</th>
                                <th>Địa chỉ</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td>
                                        <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                        <label className="custom-control-label" htmlFor="customCheck2">&nbsp;</label>
                                        </div>
                                    </td>
                                    <td><a className="text-body font-weight-bold"><Skeleton/></a> </td>
                                    <td><Skeleton/></td>
                                    <td>
                                     <Skeleton/>
                                    </td>
                                    <td>
                                         <button type="button" style={{marginRight: "3px"}} className="btn btn-primary btn-sm btn-rounded" data-toggle="modal" data-target=".exampleModal">
                                             Chi tiết
                                        </button>
                                        <a   className="mr-3 text-primary" ><i className="bx bx-check-double font-size-18" /></a>
                                        <a  className="text-danger" ><i className="mdi mdi-close font-size-18" /></a>
                                    </td>
                                    </tr>
                            </tbody>
                            </table>
                        </div>


                       
                        
                        </div>
                    </div>
                    </div>
                </div>
                {/* end row */}
                </div> {/* container-fluid */}
                </div>
                </div>
            )
        }
       
    }
}