import React from "react";
import Skeleton from 'react-loading-skeleton';
import {FetchCategory, FetchDistrict, addStore, FetchDetailRestaurant, putStore} from "../../API/Api"
import {openNotificationWithIcon} from "../../API/showNotication"
import queryString  from "query-string"
import {Spin} from 'antd'

import EditorFroala from "../../components/Editor/EditorFroala"
import UploadImage from "../../components/Editor/Upload"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class EditStore extends React.Component{

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
       // this.props.match.params.id
        if(this.props.match.params.id && cookies.get('admin') !== undefined){
            this.setState({loading: true})
            FetchCategory(cookies.get('admin')).then(res => {
                this.setState({Categoryes: res.categories})
            })

            FetchDistrict().then(res => {
                this.setState({Districts: res.list_district})
            })
            
            FetchDetailRestaurant(cookies.get('admin'), this.props.match.params.id ).then(res => {
                //console.log(res)
                let array = []
                if(res.store.list_images.length > 0){
                   res.store.list_images.map((item, index) => {
                        array.push({
                            uid: index,
                            name: 'image.png',
                            status: 'done',
                            url: item,
                        })
                   })
                }
                this.setState({name: res.store.name,  min_price: res.store.min_price,
                    max_price: res.store.max_price,
                    address_detail: res.store.address.address_detail,
                    district_id: res.store.district_id,
                    district: res.store.address.district,
                    category_id: res.store.category._id,
                    longtitude: res.store.address.longtitude,
                    latitude: res.store.address.latitude,
                    time_open: res.store.time_open,
                    short_decription: res.store.short_decription,
                    list_images: res.store.list_images,
                    introduction: res.store.introduction,
                    sale_detail: res.store.sale_detail,
                    uploadImage: array,
                    menu: res.store.menu})
                    this.setState({loading: false})
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
        console.log(this.state)
      }

    handleSubmit = (event) => {
        event.preventDefault();
        const {name, min_price,max_price, address_detail, district_id,district, category_id, longtitude, latitude, time_open, 
            short_decription, introduction, sale_detail, menu} = this.state
        
        this.setState({loading: true})
        var list_images = [];
        if(this.state.uploadImage.length > 0){
            for(let i = 0; i < this.state.uploadImage.length; i ++){
                list_images.push(this.state.uploadImage[i].url)
            }
        }
        console.log(this.state.uploadImage)
        console.log(list_images)
        if(cookies.get('admin') !== undefined){
            if(name != '' && this.props.match.params.id){
                putStore(cookies.get('admin'),this.props.match.params.id ,name, min_price, max_price, address_detail, district_id, district, category_id,
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
                 
                   this.props.history.push('/stores/' + this.props.match.params.id)
                   openNotificationWithIcon('success', 'S???a th??nh c??ng','','bottomRight')
                }).catch(err =>  {
                    this.setState({loading: false})
                    openNotificationWithIcon('error', 'S???a th???t b???i','Vui l??ng ki???m tra l???i th??ng tin','bottomRight')
                })
            }else {
                openNotificationWithIcon('error', 'Vui l??ng ??i???n ?????y ????? th??ng tin','','bottomRight')
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
                    <h4 className="mb-0 font-size-18">S???a C???a h??ng</h4>
                    <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item"><a href="/">C???a h??ng</a></li>
                        <li className="breadcrumb-item active">S???a</li>
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
                    <label htmlFor="projectbudget" className="col-form-label col-lg-2">T??n c???a h??ng</label>
                    <div className="col-lg-10">
                        <input name="name" onChange = {this.handleChange} value={this.state.name}
                        type="text" placeholder="Nh???p t??n c???a h??ng" className="form-control" />
                    </div>
                    </div>
                    <div className="form-group row mb-4">
                        <label className="col-form-label col-lg-2">Th??ng tin th??m</label>
                        <div className="col-md-10">
                       <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="formrow-inputState">Qu???n</label>
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
                                <label htmlFor="formrow-inputZip">?????a ch??? chi ti???t</label>
                                <input type="text" className="form-control"
                                 name="address_detail" onChange = {this.handleChange} value={this.state.address_detail} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="formrow-inputState">Danh m???c</label>
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
                                <label htmlFor="formrow-inputZip">Gi??? m??? c???a</label>
                                <input type="text" className="form-control" 
                                name="time_open" onChange = {this.handleChange} value={this.state.time_open} />
                                </div>
                            </div>
                            
                            <div className="col-md-4">
                                <div className="form-group">
                                <label htmlFor="formrow-inputZip">M?? t??? ng???n</label>
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
                                <label htmlFor="formrow-inputZip">Gi?? t???i thi???u</label>
                                <input type="number" className="form-control" 
                                name="min_price" onChange = {this.handleChange} value={this.state.min_price} />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                <label htmlFor="formrow-inputZip">Gi?? t???i ??a</label>
                                <input type="number" className="form-control" 
                                name="max_price" onChange = {this.handleChange} value={this.state.max_price} />
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="form-group row mb-4">
                    <label htmlFor="projectdesc" className="col-form-label col-lg-2">H??nh ???nh</label>
                    <div className="col-lg-10">
                        <UploadImage fileList={this.state.uploadImage} upload={(listImage) => this.handleChangeListImage(listImage)}/>
                    </div>
                    </div>
                    <div className="form-group row mb-4">
                    <label htmlFor="projectdesc" className="col-form-label col-lg-2">??u ????i</label>
                    <div className="col-lg-10">
                        <EditorFroala name="sale_detail" content = {this.state.sale_detail} handleChange={(value) => this.handleChangeUuDai(value)}/>
                    </div>
                    </div>
                    <div className="form-group row mb-4">
                    <label htmlFor="projectdesc" className="col-form-label col-lg-2">Gi???i thi???u</label>
                    <div className="col-lg-10">
                        <EditorFroala name="introduction" content = {this.state.introduction} handleChange={(value) => this.handleChangeGioiThieu(value)}/>
                    </div>
                    </div>
                    <div className="form-group row mb-4">
                    <label htmlFor="projectdesc" className="col-form-label col-lg-2">Th???c ????n</label>
                    <div className="col-lg-10">
                        <EditorFroala name="menu" content = {this.state.menu} handleChange={(value) => this.handleChangeThucdon(value)}/> 
                    </div>
                    </div>
                    <div className="row justify-content-end">
                    <div className="col-lg-10">
                    <button type="submit" value="Submit" className="btn btn-primary">L??u</button>
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