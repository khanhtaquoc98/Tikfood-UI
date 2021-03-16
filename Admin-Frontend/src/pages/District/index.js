import React from "react";
import Skeleton from 'react-loading-skeleton';
import {Link, } from 'react-router-dom'
import {FetchDisTrict, deleteDisTrict} from "../../API/Api"
import Cookies from 'universal-cookie';
import {openNotificationWithIcon} from '../../API/showNotication'
import AddCategory from "../../components/District/Add"
import EditCategory from "../../components/District/Edit"


const cookies = new Cookies();

export default class District extends React.Component{

      constructor(props) {
          super(props);
          this.state = {
            Categoryes: undefined,
            modalVisible: false,
            CategoryEdit: undefined
          }
      }

    componentDidMount(){
        if(cookies.get('admin') != undefined){
            FetchDisTrict(cookies.get('admin')).then(res => {
                this.setState({Categoryes: res.district})
            })
        }
    }

    setModalVisible(modalVisible, update) {
        this.setState({ modalVisible });
        if(update == true) {
            FetchDisTrict(cookies.get('admin')).then(res => {
                this.setState({Categoryes: res.district})
            })
        }
    }

    deleteCategory = (idCategory) => {
        if(cookies.get('admin') != undefined){
            deleteDisTrict(cookies.get('admin'), idCategory).then(res => {
               if(res.message == 'Success Delete'){
                FetchDisTrict(cookies.get('admin')).then(res => {
                    this.setState({Categoryes: res.district})
                     openNotificationWithIcon('success', 'Xóa thành công', '', 'bottomRight');
                })
               } else  openNotificationWithIcon('error', 'Xóa thất bại', '', 'bottomRight');
               
            }).catch(err => console.log(err))
           
        }
    }

    editCategory = (idCategoryEdit) => {
        this.setState({CategoryEdit: idCategoryEdit})
        this.setState({modalVisible: true})
    }
   
    show = (list) => {
        if(list.length > 0){
            return(
                <tbody>
                    {
                        list.map((item) => {
                            return(
                                <tr key={item._id}>
                                            <td><a className="text-body font-weight-bold">{item.district_name}</a> </td>
                                            <td>
                                                <a className="mr-3 text-primary" onClick={() => this.editCategory(item._id)}><i className="mdi mdi-pencil font-size-18" /></a>
                                                <a className="text-danger" onClick={() => this.deleteCategory(item._id)}><i className="mdi mdi-close font-size-18" /></a>
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
                                <p>Không tìm thấy khách hàng.</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
    )
        }
       
       
    }

    render() {
        const {Categoryes} = this.state
        if(this.state.Categoryes != undefined){
            return(
                <div className="page-content">
                    {this.state.CategoryEdit == undefined &&
                        <AddCategory 
                            visible={this.state.modalVisible} 
                            setModalVisiable = {(modalVisible, update) => this.setModalVisible(modalVisible, update)}/>
                    }

                    {this.state.CategoryEdit != undefined &&
                        <EditCategory CategoryEdit={this.state.CategoryEdit} 
                        visible={this.state.modalVisible} 
                        setModalVisiable = {(modalVisible, update) => this.setModalVisible(modalVisible, update)}/>
                    }
                    
                   
                <div className="main-content">
                <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                    <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                        <h4 className="mb-0 font-size-18">Danh mục</h4>
                        <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                            <li className="breadcrumb-item active">Khu vực</li>
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
                                <input type="text" className="form-control" placeholder="Tìm kiếm" />
                                <i className="bx bx-search-alt search-icon" />
                                </div>
                            </div>
                            </div>
                            <div className="col-sm-8">
                            <div className="text-sm-right">
                                <button type="button" className="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2"
                                onClick={() => this.setState({modalVisible: true, CategoryEdit: undefined})}>
                                    <i className="mdi mdi-plus mr-1" /> Thêm khu vực</button>
                            </div>
                            </div>{/* end col*/}
                        </div>
                        <div className="table-responsive">
                            <table className="table table-centered table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                <th>Tên khu vực</th>
                                <th></th>
                                </tr>
                            </thead>
                            {this.show(Categoryes)}
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
                        <h4 className="mb-0 font-size-18">Khu vực </h4>
                        <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active">Khu vực</li>
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
                                <button type="button" className="btn btn-success btn-rounded waves-effect waves-light mb-2 mr-2">
                                    <i className="mdi mdi-plus mr-1" /> Thêm khu vực</button>
                            </div>
                            </div>{/* end col*/}
                        </div>
                        <div className="table-responsive">
                            <table className="table table-centered table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                <th>Tên khu vực</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td><a className="text-body font-weight-bold"><Skeleton/></a> </td>
                                    
                                    <td>
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