import React from "react";
import Skeleton from 'react-loading-skeleton';
import {Link, } from 'react-router-dom'
import Pagination from "react-js-pagination";
import {FetchUserDetail, PutActiveUser, FetchStoreofPartner, PostStoreofPartner, DeleteStoreofPartner, DeleteCommentforUser, PutUser} from "../../API/Api"
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
        if(cookies.get('admin') != undefined){
            FetchUserDetail(cookies.get('admin'), this.props.match.params.id).then(res => {
                this.setState({User: res.user})
            }).catch({  })
            FetchStoreofPartner(cookies.get('admin'), this.props.match.params.id).then(res => {
                this.setState({Store: res.user.list_store_partner})
            }).catch({  })
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
                {User.active == 0 && <p className="text-muted mb-0 text-truncate">TK ch??a k??ch h???at</p>}
               {User.active == 1 && <p className="text-muted mb-0 text-truncate">TK ???? k??ch h???at</p>}
               {User.active == 2 && <p className="text-muted mb-0 text-truncate">TK ???? b??? kh??a</p>}
               </>
            )
        } else {
        return(
            <Select style={{ width: 120 }} onChange={this.handleChangeActive} value={this.state.Active}>
            <Option value={0}>B??? k??ch ho???t</Option>
            <Option value={1}>K??ch ho???t</Option>
            <Option value={2}>
                Kh??a
            </Option>
            </Select>
        )
    }}

    
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
                openNotificationWithIcon('success', 'Ch???nh s???a th??ng tin th??nh c??ng','','bottomRight')
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

    showStore = () => {
        if(this.state.Store != undefined){
            if(this.state.Store.length == 0){
                return(<div>Ch??a c?? nh?? h??ng n??o qu???n l??</div>)
            } else {
                return(
                    <>
                        {
                            this.state.Store.map((item, index) => {
                                return(
                                    <div className="col-md-6" key={index}>
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
                                        <p className="text-muted">{item.address.address_detail}</p>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="card-footer bg-transparent border-top">
                                        <div className="contact-links d-flex font-size-20">
                                            <div className="flex-fill" style={{textAlign: "center"}}>
                                            <Tooltip placement="bottom" title="?????t b??n">
                                            <Link  to={`/partner/reserve/${item._id}`}><i className="bx bx-calendar-event" /></Link>
                                            {
                                                item.list_reserve.length > 0 && 
                                                <span className="badge badge-pill badge-soft-danger font-size-12" style={{position: "absolute", marginLeft: ".2rem", marginTop :".4rem"}}>
                                                { item.list_reserve.length}</span>
                                            }
                                            </Tooltip>
                                            </div>
                                            <div className="flex-fill" style={{textAlign: "center"}}>
                                            <Tooltip placement="bottom" title="Th??ng tin c???a h??ng">
                                            <Link to={`/stores/${item._id}`}><i className="bx bx-store-alt" /></Link>
                                            </Tooltip>
                                            </div>
                                            <div className="flex-fill" style={{textAlign: "center"}}>
                                            <Tooltip placement="bottom" title="Ch???nh s???a c???a h??ng">
                                            <Link to={`/stores/edit/${item._id}`}><i className="bx bx-edit" /></Link>
                                            </Tooltip>
                                            </div>
                                            <div className="flex-fill" style={{textAlign: "center"}}>
                                            <Tooltip placement="bottom" title="Xo?? c???a h??ng">
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
    }

    showFormAddStore = () => {
        return(
            <div className="col-md-12">
                             <div className="card mini-stats-wid">
                             <div className="card-body">
                                <h5 className="card-title mb-4">Th??m c???a h??ng</h5>
                                <div className="form-inline">
                                    <input onChange={(event) => this.setState({IDStorePost: event.target.value})} value={this.state.IDStorePost} style={{width: "70%"}} type="text" className="form-control mb-2 mr-sm-3"  placeholder="Nh???p ID c???a h??ng" />
                                    <button onClick={() => this.onAddStore(this.state.IDStorePost)} type="submit" className="btn btn-primary mb-2">Submit</button>
                                </div>
                                </div>
                             </div>
                         </div>
        )
    }

    onAddStore = (idStore) => {
        if(cookies.get('admin') != undefined){
            PostStoreofPartner(cookies.get('admin'),idStore,this.state.User._id).then(res => {
                if(res == null){
                    openNotificationWithIcon('error', 'Th??m th???t b???i', 'Kh??ng t??m th???y id c???a h??ng', 'bottomRight');
                } else {
                    openNotificationWithIcon('success', 'Th??m th??nh c??ng', '', 'bottomRight');
                    FetchStoreofPartner(cookies.get('admin'), this.props.match.params.id).then(res => {
                        this.setState({Store: res.user.list_store_partner})
                    }).catch({  })
                    this.setState({IDStorePost: undefined})
                }
                
            }).catch(err => {
                openNotificationWithIcon('error', 'Th??m th???t b???i', 'Kh??ng t??m th???y id c???a h??ng', 'bottomRight');
            })
        }
    }

    onDeleteStore = (idStore) => {
        if(cookies.get('admin') != undefined){
            DeleteStoreofPartner(cookies.get('admin'),idStore,this.state.User._id).then(res => {
                console.log(res)
                if(res == null){
                    openNotificationWithIcon('error', 'Xo?? th???t b???i', '', 'bottomRight');
                } else {
                    openNotificationWithIcon('success', 'X??a th??nh c??ng', '', 'bottomRight');
                    FetchStoreofPartner(cookies.get('admin'), this.props.match.params.id).then(res => {
                        this.setState({Store: res.user.list_store_partner})
                    }).catch({  })
                }
                
            }).catch(err => {
                openNotificationWithIcon('error', 'Th??m th???t b???i', '', 'bottomRight');
            })
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
                         <h4 className="mb-0 font-size-18">Th??ng tin ?????i t??c</h4>
                         <div className="page-title-right">
                             <ol className="breadcrumb m-0">
                             <li className="breadcrumb-item"><a>Trang ch???</a></li>
                             <li className="breadcrumb-item active">Th??ng tin ?????i t??c</li>
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
                                 <h5 className="text-primary">Xin ch??o!</h5>
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
                                 <img src={User.avatar != "Ch??a c???p nh???t" ? User.avatar : "/assets/avatar.jpg"}  className="img-thumbnail rounded-circle" />
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
                                     {User.role == "customer" && <p className="text-muted mb-0">Kh??ch h??ng</p>}
                                     {User.role == "partner" && <p className="text-muted mb-0">?????i t??c</p>}
                                     </div>
                                     <div className="col-6">
                                     <h5 className="font-size-15">C???p nh???t l???n cu???i</h5>
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
                             <h4 className="card-title mb-4">Th??ng tin c?? nh??n</h4>
                             <h4 className="card-title mb-4"><a onClick={() => this.setState({modal1Visible : true})} style={{color: "#556ee6"}}>Ch???nh s???a</a></h4>
                             </div>
                             
                             <Modal
                             centered
                            title="Ch???nh s???a th??ng tin c?? nh??n"
                            visible={this.state.modal1Visible}
                            onOk={() => this.setModal1Visible(false, true)}
                            onCancel={() => this.setModal1Visible(false, false)}
                            >
                                <Spin spinning={this.state.loading}>
                                        <div className="form-group row">
                                            <div className="col-3 col-form-label">
                                                T??n:
                                            </div>
                                            <div className="col-9 ">
                                                <input className="form-control" type="text" name="Ten" 
                                                 onChange={this.onChangeContent}  placeholder="Vui l??ng nh???p t??n c???a b???n"
                                                 value={this.state.Ten == undefined ? User.fullname : this.state.Ten} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3 col-form-label">
                                                Gi???i t??nh:
                                            </div>
                                            <div className="col-9 ">
                                            <Radio.Group onChange={this.onChangeGender} value={this.state.GioiTinh != undefined ? this.state.GioiTinh : User.gender}>
                                                <Radio value={0}>N???</Radio>
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
                                                 onChange={this.onChangeContent}  placeholder="Vui l??ng nh???p email c???a b???n"
                                                 value={this.state.Email == undefined ? User.email : this.state.Email} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3 col-form-label">
                                                ?????a ch???:
                                            </div>
                                            <div className="col-9 ">
                                                <input className="form-control" type="text" name="DiaChi" 
                                                 onChange={this.onChangeContent}  placeholder="Vui l??ng nh???p ?????a ch??? c???a b???n"
                                                 value={this.state.DiaChi == undefined ? User.address : this.state.DiaChi} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3 col-form-label">
                                                S??T:
                                            </div>
                                            <div className="col-9 ">
                                                <input className="form-control" type="text" name="DiaCSDThi" 
                                                 onChange={this.onChangeContent}  placeholder="Vui l??ng nh???p s??? ??i???n tho???i c???a b???n"
                                                 value={this.state.SDT == undefined ? User.phone : this.state.SDT} />
                                            </div>
                                        </div>
                                </Spin>
                            </Modal>
                             <div className="table-responsive">
                             <table className="table table-nowrap mb-0">
                                 <tbody>
                                 <tr>
                                     <th scope="row">T??n :</th>
                                     <td>{User.fullname}</td>
                                 </tr>
                                 <tr>
                                     <th scope="row">Gi???i t??nh :</th>
                                     <td>{User.gender == 1 ? "Nam" : "N???"}</td>
                                 </tr>
                                 <tr>
                                     <th scope="row">E-mail :</th>
                                     <td>{User.email}</td>
                                 </tr>
                                 <tr>
                                     <th scope="row">?????a ch??? :</th>
                                     <td>{User.address}</td>
                                 </tr>
                                 <tr>
                                     <th scope="row">S??T :</th>
                                     <td>{User.phone}</td>
                                 </tr>
                                 </tbody>
                             </table>
                             </div>
                         </div>
                         </div>
                         {/* end card */}

                         {/* end card */}
                     </div>         
                     <div className="col-xl-8">
                         <div className="row">
                         <div className="col-md-6">
                             <div className="card mini-stats-wid">
                             <div className="card-body">
                                 <div className="media">
                                 <div className="media-body">
                                     <p className="text-muted font-weight-medium">S??? l?????ng qu???n l?? c???a h??ng</p>
                                     <h4 className="mb-0">{User.list_store_partner.length} c???a h??ng</h4>
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
                                     <p className="text-muted font-weight-medium">S??? l?????ng ?????t b??n</p>
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
                         {this.showFormAddStore()}
                         </div>
                         <div className="row">
                         {this.showStore()}
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