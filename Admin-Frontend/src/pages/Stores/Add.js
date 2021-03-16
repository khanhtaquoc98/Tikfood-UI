import React from "react";
import Skeleton from 'react-loading-skeleton';
import {FetchCategory, FetchDistrict, addStore} from "../../API/Api"
import {openNotificationWithIcon} from "../../API/showNotication"
import queryString  from "query-string"
import {Spin} from 'antd'

import EditorFroala from "../../components/Editor/EditorFroala"
import UploadImage from "../../components/Editor/Upload"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class AddStore extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Categoryes:undefined,
            Districts: undefined,
            uploadImage: [],
            loading: false,

            name: '',
            min_price: 0,
            max_price: 0,
            address_detail: '',
            district_id: '5f8927d2e3a5cd3bb47b4d04',
            district: 'Q. 1',
            category_id: '5f506101e28e756628293c03',
            longtitude: 0,
            latitude: 0,
            time_open: '',
            short_decription: '',
            list_images: [],
            introduction: '',
            sale_detail: '',
            menu: '',
        }
    }

    componentDidMount(){
        if(cookies.get('admin') != undefined){
            FetchCategory(cookies.get('admin')).then(res => {
                this.setState({Categoryes: res.categories})
            })

            FetchDistrict().then(res => {
                this.setState({Districts: res.list_district})
            })
        }
    }

    handleChangeListImage = (listImage) => {
        this.setState({uploadImage: listImage})
    }
    
    handleChangeGioiThieu = (value ) => {
        this.setState({'introduction': value})
    }
    handleChangeUuDai = (value ) => {
        this.setState({'sale_detail': value})
    }
    handleChangeThucdon = (value ) => {
        this.setState({'menu': value})
    }

    handleChange = (event) => {
        //console.log(event.target.name)
        if(event.target.name == "district_id"){
            this.setState({district_id: event.target.value})
            var index = event.nativeEvent.target.selectedIndex;
            this.setState({district: event.nativeEvent.target[index].text})
        }
        else {
            this.setState({[event.target.name]: event.target.value});
        }
       
      }

    handleSubmit = (event) => {
        event.preventDefault();
        const {name, min_price,max_price, address_detail, district_id,district, category_id, longtitude, latitude, time_open, 
            short_decription, list_images, introduction, sale_detail, menu} = this.state
        this.setState({loading: true})
        if(this.state.uploadImage.length > 0){
            for(let i = 0; i < this.state.uploadImage.length; i ++){
                this.state.list_images.push(this.state.uploadImage[i].url)
            }
        }
        if(cookies.get('admin') !== undefined){
            if(name != ''){
                addStore(cookies.get('admin'), name, min_price, max_price, address_detail, district_id, district, category_id,
                longtitude, latitude, time_open, short_decription, list_images, introduction, sale_detail, menu).then(res => {
                   this.setState({
                       name: '',
                       min_price: 0,
                       max_price: 0,
                       address_detail: '',
                       district_id: '5f8927d2e3a5cd3bb47b4d04',
                       district: 'Q. 1',
                       category_id: '5f506101e28e756628293c03',
                       longtitude: 0,
                       latitude: 0,
                       time_open: '',
                       short_decription: '',
                       list_images: [],
                       introduction: '',
                       sale_detail: '',
                       menu: '',
                       uploadImage: []
                   })
                   this.setState({loading: false})
                   this.props.history.push('/stores/' + res.data.store._id)
                }).catch(err =>  {
                    this.setState({loading: false})
                    openNotificationWithIcon('error', 'Thêm thất bại','Vui lòng kiểm tra lại thông tin','bottomRight')
                })
            }else {
                openNotificationWithIcon('error', 'Vui lòng điền đầy đủ thông tin','','bottomRight')
            } 
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
                    <h4 className="mb-0 font-size-18">Thêm Cửa hàng</h4>
                    <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href="/">Cửa hàng</a></li>
                        <li className="breadcrumb-item active">Thêm</li>
                    </ol>
                    </div>
                </div>
                </div>
            </div>
            {/* end page title */}
            <Spin tip="Loading..." spinning={this.state.loading}>
            <div className="card">
           <div className="card-body">
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group row mb-4">
                    <label htmlFor="projectbudget" className="col-form-label col-lg-2">Tên cửa hàng</label>
                    <div className="col-lg-10">
                        <input name="name" onChange = {this.handleChange} value={this.state.name}
                        type="text" placeholder="Nhập tên cửa hàng" className="form-control" />
                    </div>
                    </div>
                    <div className="form-group row mb-4">
                        <label className="col-form-label col-lg-2">Thông tin thêm</label>
                        <div className="col-md-10">
                       <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="formrow-inputState">Quận</label>
                                <select className="form-control" name="district_id" onChange = {this.handleChange} value={this.state.district_id}>
                                    {this.state.Districts != undefined && 
                                        this.state.Districts.map((item,index) => {
                                            return(
                                                <option key={index} value={item._id}>{item.district_name}</option>
                                            )
                                        })}
                                </select>
                                </div>
                            </div>
                            
                            <div className="col-md-8">
                                <div className="form-group">
                                <label htmlFor="formrow-inputZip">Địa chỉ chi tiết</label>
                                <input type="text" className="form-control"
                                 name="address_detail" onChange = {this.handleChange} value={this.state.address_detail} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="formrow-inputState">Danh mục</label>
                                <select className="form-control"
                                name="category_id" onChange = {this.handleChange} value={this.state.category_id} >
                                   {this.state.Categoryes != undefined && 
                                   this.state.Categoryes.map((item,index) => {
                                       return(
                                           <option key={index} value={item._id}>{item.name}</option>
                                       )
                                   })}
                                </select>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="formrow-inputZip">Giờ mở cửa</label>
                                <input type="text" className="form-control" 
                                name="time_open" onChange = {this.handleChange} value={this.state.time_open} />
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="formrow-inputZip">Mô tả ngắn</label>
                                <input type="text" className="form-control" 
                                name="short_decription" onChange = {this.handleChange} value={this.state.short_decription} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-group">
                                <label htmlFor="formrow-inputZip">Latitude</label>
                                <input type="text" className="form-control" 
                                name="latitude" onChange = {this.handleChange} value={this.state.latitude} />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                <label htmlFor="formrow-inputZip">Longtitude</label>
                                <input type="text" className="form-control" 
                                name="longtitude" onChange = {this.handleChange} value={this.state.longtitude} />
                                </div>
                            </div>
                            
                            <div className="col-md-3">
                                <div className="form-group">
                                <label htmlFor="formrow-inputZip">Giá tối thiểu</label>
                                <input type="number" className="form-control" 
                                name="min_price" onChange = {this.handleChange} value={this.state.min_price} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                <label htmlFor="formrow-inputZip">Giá tối đa</label>
                                <input type="number" className="form-control" 
                                name="max_price" onChange = {this.handleChange} value={this.state.max_price} />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="form-group row mb-4">
                    <label htmlFor="projectdesc" className="col-form-label col-lg-2">Hình ảnh</label>
                    <div className="col-lg-10">
                        <UploadImage fileList={this.state.uploadImage} upload={(listImage) => this.handleChangeListImage(listImage)}/>
                    </div>
                    </div>
                    <div className="form-group row mb-4">
                    <label htmlFor="projectdesc" className="col-form-label col-lg-2">Ưu đãi</label>
                    <div className="col-lg-10">
                        <EditorFroala name="sale_detail" content = {this.state.sale_detail} handleChange={(value) => this.handleChangeUuDai(value)}/>
                    </div>
                    </div>
                    <div className="form-group row mb-4">
                    <label htmlFor="projectdesc" className="col-form-label col-lg-2">Giới thiệu</label>
                    <div className="col-lg-10">
                        <EditorFroala name="introduction" content = {this.state.introduction} handleChange={(value) => this.handleChangeGioiThieu(value)}/>
                    </div>
                    </div>
                    <div className="form-group row mb-4">
                    <label htmlFor="projectdesc" className="col-form-label col-lg-2">Thực đơn</label>
                    <div className="col-lg-10">
                        <EditorFroala name="menu" content = {this.state.menu} handleChange={(value) => this.handleChangeThucdon(value)}/> 
                    </div>
                    </div>
                    <div className="row justify-content-end">
                    <div className="col-lg-10">
                    <button type="submit" value="Submit" className="btn btn-primary">Lưu</button>
                    </div>
                </div>
                </form>
               
                </div>
                </div>
            {/* end row */}</Spin>
            </div> {/* container-fluid */}
            </div>
            </div>
        )
    }
}