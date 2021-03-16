import React from "react";
import Skeleton from 'react-loading-skeleton';
import {Link, } from 'react-router-dom'
import Pagination from "react-js-pagination";
import {FetchUser, DeleteUser} from "../../API/Api"
import {openNotificationWithIcon} from "../../API/showNotication"
import queryString  from "query-string"
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class User extends React.Component{

      constructor(props) {
          super(props);
          this.state = {
            Users: undefined
          }
      }
      

    componentDidMount(){
        if(cookies.get('admin') != undefined){
            FetchUser(cookies.get('admin')).then(res => {
                this.setState({Users: res})
            }).catch({
                
            })
        }
    }

   showActive = (active) => {
        if(active == 0){
            return "Chưa kích hoạt"
        } else if (active == 1) return "Đã kích hoạt"
        else if(active == 2) return "Đã bị khoá"
   }

    show = (list) => {
        if(list.length > 0){
            return(
                <tbody>
                    {
                        list.map((item) => {
                            if(item.role == 'customer'){
                                return(
                                    <tr key={item._id}>
                                                
                                                <td><a className="text-body font-weight-bold">{item.email}</a> </td>
                                                <td>{item.fullname}</td>
                                                <td>
                                                    {this.showActive(item.active)}
                                                </td>
                                                <td>
                                                    {/* Button trigger modal */}
                                                    <button type="button" className="btn btn-primary btn-sm btn-rounded" onClick={() => this.props.history.push("user/" + item._id)}>
                                                        Chi tiết
                                                    </button>
                                                </td>
                                                <td>
                                                    <a  className="mr-3 text-primary" data-toggle="tooltip" data-placement="top"  data-original-title="Edit"><i className="mdi mdi-pencil font-size-18" /></a>
                                                    <a  className="text-danger" onclick={() => this.DeleteUser(item._id)}><i className="mdi mdi-close font-size-18" /></a>
                                                </td>
                                                </tr>
                                )
                            }
                           
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
                                <p>Không tìm thấy khách hàng.</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
    )
        }
       
       
    }

    DeleteUser = (id) => {
        if(cookies.get('admin') != undefined){
            DeleteUser(cookies.get('admin'), id).then(res => {
                openNotificationWithIcon('success', 'Xóa thành công', '', 'bottomRight');
                FetchUser(cookies.get('admin')).then(res => {
                    this.setState({Users: res})
                }).catch({
                    
                })
            })
        }
    }

    render() {
        const {Users} = this.state
        if(this.state.Users != undefined){
            return(
                <div className="page-content">
                <div className="main-content">
                <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                    <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">Khách hàng</h4>
                        <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active">Khách hàng</li>
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
                                
                                <th>Email</th>
                                <th>Tên</th>
                                <th>Active</th>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                            {this.show(Users.users)}
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
                                        <a  className="mr-3 text-primary" data-toggle="tooltip" data-placement="top"  data-original-title="Edit"><i className="mdi mdi-pencil font-size-18" /></a>
                                        <a  className="text-danger" data-toggle="tooltip" data-placement="top"  data-original-title="Delete"><i className="mdi mdi-close font-size-18" /></a>
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