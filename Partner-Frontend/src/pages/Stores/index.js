import React from "react";
import {Link} from "react-router-dom"
import Skeleton from 'react-loading-skeleton'; 
import Pagination from "react-js-pagination";
import {FetchRestaurants, deleteStore} from "../../API/Api"
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
      this.GetRestaurant()
    }

    GetRestaurant = () => {
    let page = this.props.query.page != undefined ? this.props.query.page : 1;
    let category = this.props.query.category != undefined ? this.props.query.category : '';
    let district = this.props.query.district != undefined ? this.props.query.district : '';
    let average_stars = this.props.query.average_stars != undefined ? this.props.query.average_stars : '';
    let min_price = this.props.query.min_price != undefined ? this.props.query.min_price : '';
    let max_price = this.props.query.max_price != undefined ? this.props.query.max_price : '';

    if(this.props.query.page != undefined)
    {
        this.FetchRestaurantsPage(page, category, district, average_stars, min_price, max_price)
    }
    else 
        this.FetchRestaurantsPage(1, category, district, average_stars, min_price, max_price)

    let query = PathNameReplace(page, category, district, min_price, max_price, average_stars);
    let search = queryString.stringify(query)

    this.props.history.push({
        pathname: '/stores',
        search: search
        })
    }

    FetchRestaurantsPage = (page, category, district, average_stars, min_price, max_price) => {
        //console.log(pageNumber, category, district, average_stars, min_price, max_price)
        this.setState({DataRestaurant : undefined})

        FetchRestaurants(page, category, district, average_stars, min_price, max_price).then(res => {
            if(res.status == 200){
                this.setState({DataRestaurant : res.data})
            }
        }).catch(err => {this.setState({DataRestaurant : null})})
       
    }

    FetchRestaurantsPageProps = (pageNumber) => {
        let page = this.props.query.page != undefined ? this.props.query.page : 1;
        let category = this.props.query.category != undefined ? this.props.query.category : '';
        let district = this.props.query.district != undefined ? this.props.query.district : '';
        let average_stars = this.props.query.average_stars != undefined ? this.props.query.average_stars : '';
        let min_price = this.props.query.min_price != undefined ? this.props.query.min_price : '';
        let max_price = this.props.query.max_price != undefined ? this.props.query.max_price : '';

        let query = PathNameReplace(pageNumber, category, district, min_price, max_price, average_stars);
        let search = queryString.stringify(query)

        FetchRestaurants(pageNumber, category, district, average_stars, min_price, max_price).then(res => {
            if(res.status == 200){
                this.setState({DataRestaurant : res.data})
                this.props.history.push({
                    pathname: '/stores',
                    search: search
                  })
            } else {
                this.setState({DataRestaurant : null})
            }
        }).catch(err => {
            this.setState({DataRestaurant : null})
        })
    }

    handlePageChange(pageNumber) {       
        this.FetchRestaurantsPageProps(pageNumber)
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
                                                <button type="button" className="btn btn-primary btn-sm btn-rounded" data-toggle="modal" onClick={() => this.props.history.push("/stores/" + item._id)}>
                                                Chi tiết
                                                </button>
                                            </td>
                                            <td>
                                                <Link to={`/stores/edit/` + item._id} className="mr-3 text-primary"><i className="mdi mdi-pencil font-size-18" /></Link>
                                                <a  className="text-danger" onClick={() => this.onDeleteStore(item._id)} data-original-title="Delete"><i className="mdi mdi-close font-size-18" /></a>
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

    onDeleteStore = (idStore) => {
        if(cookies.get('admin') != undefined){
            deleteStore(cookies.get('admin'), idStore).then(res => {
                openNotificationWithIcon('success','Xóa cửa hàng thành công', '', 'bottomRight')
            }).catch(err => {
                openNotificationWithIcon('error','Xóa cửa hàng thất bại', 'Vui lòng thử lại', 'bottomRight')
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
                                <th>Tên</th>
                                <th>Danh mục</th>
                                <th>Địa chỉ</th>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                                {this.showStore(DataRestaurant.store)}
                            </table>
                        </div>
                        <Pagination
                        innerClass="pagination pagination-rounded justify-content-end mb-2"
                        activePage={this.props.query.page != undefined ? this.props.query.page*1 : 1}
                        itemsCountPerPage={20}
                        totalItemsCount={2000}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                        itemClassNext = {"next"}
                        itemClassPrev = {"prev"}
                        prevPageText= {<a className="page-link"><i className="mdi mdi-chevron-left" /></a>}
                        nextPageText = { <a className="page-link"><i className="mdi mdi-chevron-right" /></a>}
                        itemClass="page-item"
                        activeClass = "active"
                        linkClass="page-link"
                        hideFirstLastPages = {true}
                        />
                        
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
                                        <a  className="mr-3 text-primary" data-toggle="tooltip" data-placement="top" title data-original-title="Edit"><i className="mdi mdi-pencil font-size-18" /></a>
                                        <a  className="text-danger" data-toggle="tooltip" data-placement="top" title data-original-title="Delete"><i className="mdi mdi-close font-size-18" /></a>
                                    </td>
                                    </tr>
                            </tbody>
                            </table>
                        </div>


                        <Pagination
                        innerClass="pagination pagination-rounded justify-content-end mb-2"
                        activePage={this.props.query.page != undefined ? this.props.query.page*1 : 1}
                        itemsCountPerPage={20}
                        totalItemsCount={2000}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                        itemClassNext = {"next"}
                        itemClassPrev = {"prev"}
                        prevPageText= {<a className="page-link"><i className="mdi mdi-chevron-left" /></a>}
                        nextPageText = { <a className="page-link"><i className="mdi mdi-chevron-right" /></a>}
                        itemClass="page-item"
                        activeClass = "active"
                        linkClass="page-link"
                        hideFirstLastPages = {true}
                        />
                        
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