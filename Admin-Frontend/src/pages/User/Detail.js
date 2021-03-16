import React from "react";
import Skeleton from 'react-loading-skeleton';
import {Link, } from 'react-router-dom'
import Pagination from "react-js-pagination";
import {FetchUserDetail, PutActiveUser, GetCommentOfUser, GetLikeStoreOfUser, DeleteLikeStoreOfUser, DeleteCommentforUser, PutUser} from "../../API/Api"
import {openNotificationWithIcon} from "../../API/showNotication"
import queryString  from "query-string"
import Cookies from 'universal-cookie';
import { Select,Modal,Spin, Radio  } from 'antd';

const { Option } = Select

const cookies = new Cookies();

export default class DetailUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            User: undefined,
            Active: 0,
            EditActive: false,
            Comments: undefined,
            ViewAllComment: false,
            LikeStore: undefined,
            ViewAllLikeStore: false,
            modal1Visible: false,
            loading: false,
            Ten: undefined,
            GioiTinh: undefined,
            SDT: undefined,
            Email: undefined,
            DiaChi: undefined,
        }
    }


    componentDidMount(){
        if(cookies.get('admin') != undefined){
            FetchUserDetail(cookies.get('admin'), this.props.match.params.id).then(res => {
                this.setState({User: res.user})
            }).catch({
                
            })
            GetCommentOfUser(cookies.get('admin'), this.props.match.params.id).then(res => {
              this.setState({Comments: res.comments})
            }).catch(err => console.log(err))
            GetLikeStoreOfUser(cookies.get('admin'), this.props.match.params.id).then(res => {
                this.setState({LikeStore: res.user.list_likestore_id})
              })
        }
    }

    handleChangeActive = (value) => {
        this.setState({Active: value})
    }

    PutActiveUser = () => {
        if(cookies.get('admin') != undefined){
            PutActiveUser(cookies.get('admin'), this.props.match.params.id, this.state.Active).then(res => {
                FetchUserDetail(cookies.get('admin'), this.props.match.params.id).then(res => {
                    this.setState({User: res.user})
                    this.setState({Active: 0, EditActive: false})
                }).catch({
                    
                })
            }).catch({
                
            })
        }
        
    }

    showEditActive = () => {
        const {User} = this.state
        if (this.state.EditActive == false){
            return(
                <>
                {User.active == 0 && <p className="text-muted mb-0 text-truncate">TK chưa kích họat</p>}
               {User.active == 1 && <p className="text-muted mb-0 text-truncate">TK đã kích họat</p>}
               {User.active == 2 && <p className="text-muted mb-0 text-truncate">TK đã bị khóa</p>}
               </>
            )
        } else {
        return(
            <Select style={{ width: 120 }} onChange={this.handleChangeActive} value={this.state.Active}>
            <Option value={0}>Bỏ kích hoạt</Option>
            <Option value={1}>Kích hoạt</Option>
            <Option value={2}>
                Khóa
            </Option>
            </Select>
        )
    }}

    showComment = () => {
        if(this.state.Comments != undefined){
            if(this.state.Comments.length == 0){
                return (
                    <div className="d-flex justify-content-center mt-1 mb-1">
                            Khách hàng chưa bình luận nào
                       </div>
                )
            } else {
                return(
                    <> 
                    { this.state.ViewAllComment == false &&
                    this.state.Comments.slice(0,5).map((item, index) => {
                        return (
                            <div className="card task-box" key={index}>
                            <div className="card-body">
                                <div className="float-right ml-2">
                                <a onClick={() => this.onDeleteComment(item._id)} style={{color: "#fff"}} className="btn btn-primary waves-effect waves-light btn-sm font-size-12">Xóa</a>
                                </div>
                                <div>
                                <h5 className="font-size-15" style={{marginBottom: "0px"}}><a  className="text-dark">{item.store_id.name}</a></h5>
                                <p className="text-muted">{item.created_at}</p>
                                </div>
                                <div className="list-inine pl-0 mb-4">
                                   {item.content}
                                </div>
                                <div className="team float-left">
                                <a  className="team-member d-inline-block">
                                   {item.star} <i style={{marginLeft: "2px", color: "#f1b44c"}} className="bx bxs-star"/>
                                </a>
                                </div>
                                <div className="text-right">
                                <h5 className="font-size-15 mb-1">
                                    {item.sentimet_comment == 0 && <span class="badge badge-pill badge-soft-success font-size-12">Tích cực</span>}
                                    {item.sentimet_comment == 1 && <span class="badge badge-pill badge-soft-danger font-size-12">Tiêu cực cực</span>}
                                </h5>
                                </div>
                            </div>
                        </div>
                        )
                    })
                    }

                    { this.state.ViewAllComment == true &&
                    this.state.Comments.map((item, index) => {
                        return (
                            <div className="card task-box" key={index}>
                            <div className="card-body">
                                <div className="float-right ml-2">
                                <a onClick={() => this.onDeleteComment(item._id)} style={{color: "#fff"}} className="btn btn-primary waves-effect waves-light btn-sm font-size-12">Xóa</a>
                                </div>
                                <div>
                                <h5 className="font-size-15" style={{marginBottom: "0px"}}><a  className="text-dark">{item.store_id.name}</a></h5>
                                <p className="text-muted">{item.created_at}</p>
                                </div>
                                <div className="list-inine pl-0 mb-4">
                                   {item.content}
                                </div>
                                <div className="team float-left">
                                <a  className="team-member d-inline-block">
                                   {item.star} <i style={{marginLeft: "2px", color: "#f1b44c"}} className="bx bxs-star"/>
                                </a>
                                </div>
                                <div className="text-right">
                                <h5 className="font-size-15 mb-1">
                                    {item.sentimet_comment == 0 && <span class="badge badge-pill badge-soft-success font-size-12">Tích cực</span>}
                                    {item.sentimet_comment == 1 && <span class="badge badge-pill badge-soft-danger font-size-12">Tiêu cực cực</span>}
                                </h5>
                                </div>
                            </div>
                        </div>

                        )
                    })
                    }

                    {this.state.ViewAllComment == false && 
                    <div className="text-center">
                        <a onClick={() => this.setState({ViewAllComment: true})} className="btn btn-primary btn-block mt-1 waves-effect waves-light" style={{color: "#fff"}}>
                            <i className="mdi mdi-plus mr-1" />Xem tất cả</a>
                        </div>
                        }

                    {this.state.ViewAllComment == true && 
                        <div className="text-center">
                        <a onClick={() => this.setState({ViewAllComment: false})} className="btn btn-primary btn-block mt-1 waves-effect waves-light" style={{color: "#fff"}}>
                    <i className="mdi mdi-close-thick mr-1" />Thu gọn</a>
                </div>
                }
                    </>
                )
                
            }
            
        } else {
          return(
           <div className="d-flex justify-content-center mt-5 mb-5">
               <div className="spinner-border text-primary m-1 " role="status">
                    <span className="sr-only">Loading...</span></div>
                  </div>
          )
        }
    }

    onDeleteComment = (id) => {
        if(cookies.get('admin') != undefined){
            DeleteCommentforUser(cookies.get('admin'), id).then(res => {
                openNotificationWithIcon('success', 'Xóa thành công','','bottomRight')
                GetCommentOfUser(cookies.get('admin'), this.props.match.params.id).then(res => {
                    this.setState({Comments: res.comments})
                  }).catch(err => console.log(err))
            }).catch(err => openNotificationWithIcon('error', 'Xóa thất bại','Vui lòng thử lại','bottomRight'))
        }
    }

    showLikeStore = () => {
        if(this.state.LikeStore == undefined){
            return(
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border text-primary m-1 " role="status">
                         <span className="sr-only">Loading...</span></div>
                       </div>
               )
        } else {
            if(this.state.LikeStore.length == 0){
                return (
                    <div className="d-flex justify-content-center mt-1 mb-1">
                            Khách hàng chưa thích nhà hàng nào
                       </div>)
            } else {
                return(
                    <>
                    <table className="table table-nowrap table-centered table-hover mb-0">
                        <tbody>
                            {
                               this.state.ViewAllLikeStore == false && this.state.LikeStore.slice(0,6).map((item, index) => {
                                    return(
                                        <>
                                        <tr key={index}>
                                            <td style={{width: 45}}>
                                            <div className="avatar-sm">
                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
                                                <img src={item.store_id.list_images[0]} style={{width: "100%", height: "100%", borderRadius: "48%"}}/>
                                                </span>
                                            </div>
                                            </td>
                                            <td>
                                            <h5 className="font-size-14 mb-1"><a className="text-dark">{item.store_id.name.length > 40 ? item.store_id.name.slice(0,40) + "..." : item.store_id.name}</a></h5>
                                            <small>{item.store_id.address.address_detail.length > 50 ? item.store_id.address.address_detail.slice(0,50) + "..." : item.store_id.address.address_detail}</small>
                                            </td>
                                            <td>
                                            <div className="text-center">
                                                <a onClick={() => this.onDeleteStore(item._id)}  className="text-dark"><i className="mdi mdi-close-thick h3 m-0" /></a>
                                            </div>
                                            </td>
                                        </tr>
                                        </>
                                    )
                                })
                            }

                            {
                               this.state.ViewAllLikeStore == true && this.state.LikeStore.map((item, index) => {
                                    return(
                                        <>
                                        <tr key={index}>
                                            <td style={{width: 45}}>
                                            <div className="avatar-sm">
                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
                                                <img src={item.store_id.list_images[0]} style={{width: "100%", height: "100%", borderRadius: "48%"}}/>
                                                </span>
                                            </div>
                                            </td>
                                            <td>
                                            <h5 className="font-size-14 mb-1"><a className="text-dark">{item.store_id.name.length > 40 ? item.store_id.name.slice(0,40) + "..." : item.store_id.name}</a></h5>
                                            <small>{item.store_id.address.address_detail.length > 50 ? item.store_id.address.address_detail.slice(0,50) + "..." : item.store_id.address.address_detail}</small>
                                            </td>
                                            <td>
                                            <div className="text-center">
                                                <a onClick={() => this.onDeleteStore(item._id)}  className="text-dark"><i className="mdi mdi-close-thick h3 m-0" /></a>
                                            </div>
                                            </td>
                                        </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {this.state.ViewAllLikeStore == false && 
                        <div className="text-center">
                        <a onClick={() => this.setState({ViewAllLikeStore: true})} className="btn btn-primary btn-block mt-1 waves-effect waves-light" style={{color: "#fff"}}>
                    <i className="mdi mdi-plus mr-1" />Xem tất cả</a>
                </div>
                }

                {this.state.ViewAllLikeStore == true && 
                        <div className="text-center">
                        <a onClick={() => this.setState({ViewAllLikeStore: false})} className="btn btn-primary btn-block mt-1 waves-effect waves-light" style={{color: "#fff"}}>
                    <i className="mdi mdi-close-thick mr-1" />Thu gọn</a>
                </div>
                }
                </>
                )
                } 
            }
        }

    onDeleteStore = (id) => {
        if(cookies.get('admin') != undefined){
            DeleteLikeStoreOfUser(cookies.get('admin'), id).then(res => {
                openNotificationWithIcon('success', 'Xóa thành công','','bottomRight')
                GetLikeStoreOfUser(cookies.get('admin'), this.props.match.params.id).then(res => {
                    this.setState({LikeStore: res.user.list_likestore_id})
                  })
            }).catch(err => openNotificationWithIcon('error', 'Xóa thất bại','Vui lòng thử lại','bottomRight'))
        }
    } 
    
    setModal1Visible(modal1Visible, update) {
        const {User} = this.state
        this.setState({loading: true})
        if(update == true){
            PutUser(cookies.get('admin'),User._id,
            this.state.GioiTinh == undefined ? User.gender : this.state.GioiTinh,
            this.state.DiaChi == undefined ? User.address : this.state.DiaChi,
            this.state.SDT == undefined ? User.phone : this.state.SDT,
            User.avatar,
            this.state.Ten == undefined ? User.fullname : this.state.Ten,
            ).then(res => {
                openNotificationWithIcon('success', 'Chỉnh sữa thông tin thành công','','bottomRight')
                FetchUserDetail(cookies.get('admin'), this.props.match.params.id).then(res => {
                    this.setState({User: res.user})
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }
        this.setState({ modal1Visible });
        this.setState({
            loading: false,
            Ten: undefined,
            GioiTinh: undefined,
            SDT: undefined,
            Email: undefined,
            DiaChi: undefined,
        })
    }

    onChangeContent = (event) => {
        this.setState({[event.target.name] : event.target.value})
      } 

    onChangeGender = (e) => {
        this.setState({GioiTinh: e.target.value})
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
                         <h4 className="mb-0 font-size-18">Thông tin tài khoản</h4>
                         <div className="page-title-right">
                             <ol className="breadcrumb m-0">
                             <li className="breadcrumb-item"><a>Trang chủ</a></li>
                             <li className="breadcrumb-item active">Thông tin tài khoản</li>
                             </ol>
                         </div>
                         </div>
                     </div>
                     </div>
                     {/* end page title */}
                     <div className="row">
                     <div className="col-xl-4">
                         <div className="card overflow-hidden">
                         <div className="bg-soft-primary">
                             <div className="row">
                             <div className="col-7">
                                 <div className="text-primary p-3">
                                 <h5 className="text-primary">Xin chào!</h5>
                                 <p></p>
                                 </div>
                             </div>
                             <div className="col-5 align-self-end">
                                 <img src="/assets/images/profile-img.png"  className="img-fluid" />
                             </div>
                             </div>
                         </div>
                         <div className="card-body pt-0">
                             <div className="row">
                             <div className="col-sm-4">
                                 <div className="avatar-md profile-user-wid mb-4">
                                 <img src={User.avatar != "Chưa cập nhật" ? User.avatar : "/assets/avatar.jpg"}  className="img-thumbnail rounded-circle" />
                                 </div>
                                 <h5 className="font-size-15 text-truncate">{User.fullname}</h5>
                                 {
                                     this.showEditActive()
                                 }
                             </div>
                             <div className="col-sm-8">
                                 <div className="pt-4">
                                 <div className="row">
                                     <div className="col-6">
                                     <h5 className="font-size-15">Role</h5>
                                     {User.role == "customer" && <p className="text-muted mb-0">Khách hàng</p>}
                                     {User.role == "admin" && <p className="text-muted mb-0">Quản trị viên</p>}
                                     </div>
                                     <div className="col-6">
                                     <h5 className="font-size-15">Cập nhật lần cuối</h5>
                                     <p className="text-muted mb-0">{User.updated_at}</p>
                                     </div>
                                 </div>
                                 <div class="mt-3">
                                     {this.state.EditActive == false && 
                                    <a class="btn btn-primary waves-effect waves-light btn-sm" 
                                        onClick={() => {this.setState({EditActive: true})}}
                                    style={{color: "#fff"}}><i class="bx bx-cog bx-spin"></i></a>}
                                    {this.state.EditActive == true && (
                                        <>
                                        <a class="btn btn-primary waves-effect waves-light btn-sm mt-2 mr-2" 
                                        onClick={() => {this.PutActiveUser()}}
                                    style={{color: "#fff"}}><i class="bx bxs-save"></i></a>
                                        <a class="btn btn-primary waves-effect waves-light btn-sm mt-2" 
                                        onClick={() => {this.setState({EditActive: false})}}
                                    style={{color: "#fff"}}><i class="mdi mdi-close "></i></a>
                                        </>
                                    )
                                    }
                                </div>
                                 </div>
                             </div>
                             </div>
                         </div>
                         </div>
                         {/* end card */}
                         <div className="card">
                         <div className="card-body">
                             <div className="row justify-content-between" style={{margin: "0"}}>
                             <h4 className="card-title mb-4">Thông tin cá nhân</h4>
                             <h4 className="card-title mb-4"><a onClick={() => this.setState({modal1Visible : true})} style={{color: "#556ee6"}}>Chỉnh sửa</a></h4>
                             </div>
                             
                             <Modal
                             centered
                            title="Chỉnh sửa thông tin cá nhân"
                            visible={this.state.modal1Visible}
                            onOk={() => this.setModal1Visible(false, true)}
                            onCancel={() => this.setModal1Visible(false, false)}
                            >
                                <Spin spinning={this.state.loading}>
                                        <div className="form-group row">
                                            <div className="col-3 col-form-label">
                                                Tên:
                                            </div>
                                            <div className="col-9 ">
                                                <input className="form-control" type="text" name="Ten" 
                                                 onChange={this.onChangeContent}  placeholder="Vui lòng nhập tên của bạn"
                                                 value={this.state.Ten == undefined ? User.fullname : this.state.Ten} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3 col-form-label">
                                                Giới tính:
                                            </div>
                                            <div className="col-9 ">
                                            <Radio.Group onChange={this.onChangeGender} value={this.state.GioiTinh != undefined ? this.state.GioiTinh : User.gender}>
                                                <Radio value={0}>Nữ</Radio>
                                                <Radio value={1}>Nam</Radio>
                                            </Radio.Group>

                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3 col-form-label">
                                                Email:
                                            </div>
                                            <div className="col-9 ">
                                                <input className="form-control" type="text" name="Email" 
                                                 onChange={this.onChangeContent}  placeholder="Vui lòng nhập email của bạn"
                                                 value={this.state.Email == undefined ? User.email : this.state.Email} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3 col-form-label">
                                                Địa chỉ:
                                            </div>
                                            <div className="col-9 ">
                                                <input className="form-control" type="text" name="DiaChi" 
                                                 onChange={this.onChangeContent}  placeholder="Vui lòng nhập địa chỉ của bạn"
                                                 value={this.state.DiaChi == undefined ? User.address : this.state.DiaChi} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3 col-form-label">
                                                SĐT:
                                            </div>
                                            <div className="col-9 ">
                                                <input className="form-control" type="text" name="DiaCSDThi" 
                                                 onChange={this.onChangeContent}  placeholder="Vui lòng nhập số điện thoại của bạn"
                                                 value={this.state.SDT == undefined ? User.phone : this.state.SDT} />
                                            </div>
                                        </div>
                                </Spin>
                            </Modal>
                             <div className="table-responsive">
                             <table className="table table-nowrap mb-0">
                                 <tbody>
                                 <tr>
                                     <th scope="row">Tên :</th>
                                     <td>{User.fullname}</td>
                                 </tr>
                                 <tr>
                                     <th scope="row">Giới tính :</th>
                                     <td>{User.gender == 1 ? "Nam" : "Nữ"}</td>
                                 </tr>
                                 <tr>
                                     <th scope="row">E-mail :</th>
                                     <td>{User.email}</td>
                                 </tr>
                                 <tr>
                                     <th scope="row">Địa chỉ :</th>
                                     <td>{User.address}</td>
                                 </tr>
                                 <tr>
                                     <th scope="row">SĐT :</th>
                                     <td>{User.phone}</td>
                                 </tr>
                                 </tbody>
                             </table>
                             </div>
                         </div>
                         </div>
                         {/* end card */}
                         <div className="card">
                            <div className="card-body">
                                <h4 className="card-title mb-4">Cửa hàng yêu thích</h4>
                                <div className="table-responsive">
                                    {this.showLikeStore()}
                                </div>
                            </div>
                            </div>

                         {/* end card */}
                     </div>         
                     <div className="col-xl-8">
                         <div className="row">
                         <div className="col-md-6">
                             <div className="card mini-stats-wid">
                             <div className="card-body">
                                 <div className="media">
                                 <div className="media-body">
                                     <p className="text-muted font-weight-medium">Bình luận cửa hàng</p>
                                     <h4 className="mb-0">{User.list_comment_id.length} lượt</h4>
                                 </div>
                                 <div className="mini-stat-icon avatar-sm align-self-center rounded-circle bg-primary">
                                     <span className="avatar-title">
                                     <i className="bx bx-like font-size-24" />
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
                                     <p className="text-muted font-weight-medium">Yêu thích cửa hàng</p>
                                     <h4 className="mb-0">{User.list_likestore_id.length} cửa hàng</h4>
                                 </div>
                                 <div className="avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary">
                                     <span className="avatar-title">
                                     <i className="bx bx-heart font-size-24" />
                                     </span>
                                 </div>
                                 </div>
                             </div>
                             </div>
                         </div>
                         </div>
                         <div className="card">
                         <div className="card-body">
                             <h4 className="card-title mb-4">Bình luận của user</h4>
                            {
                                this.showComment()
                            }
                         </div>
                         </div>
                         
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