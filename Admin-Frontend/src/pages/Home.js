import React from "react";
import {getSoLuong} from "../API/Api"
import NumberHeader from "../components/Home/NumberHeader"
import CHTheoDanhMuc from "../components/Home/CHTheoDanhMuc"
import CHTheoQuan from "../components/Home/CHTheoQuan"
import BinhLuanThang from "../components/Home/BinhLuanThang"
import BinhLuanNam from "../components/Home/BinhLuanNam"
import LikeStoretheoNam from "../components/Home/LikeStoretheoNam"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Home extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        Soluong: undefined,
        SLCHtheoQuan: undefined,
        SLCHtheoDanhMuc: undefined
      }
    }
    

    componentDidMount(){
      if(cookies.get('admin') != undefined){
        getSoLuong(cookies.get('admin')).then(res => {
          this.setState({Soluong: res})
        })
      }
    }

    render(){
      const {Soluong} = this.state
        return(
            <div className="page-content">
            <div className="main-content">
              <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-flex align-items-center justify-content-between">
                      <h4 className="mb-0 font-size-18">Dashboard</h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item"><a >Dashboards</a></li>
                          <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end page title */}
                <div className="row">
                  <div className="col-xl-12">
                    <div className="row">
                      <NumberHeader 
                      data={Soluong != undefined ? Soluong.category : undefined} 
                      name={"Danh mục"} icon={"bx bx-food-menu"}/>
                      <NumberHeader 
                      data={Soluong != undefined ? Soluong.store : undefined} 
                      name={"Cửa hàng"} icon={"bx bx-store"}/>
                      <NumberHeader 
                      data={Soluong != undefined ? Soluong.user : undefined} 
                      name={"Khách hàng"} icon={"bx bx-user"}/>
                      <NumberHeader 
                      data={Soluong != undefined ? Soluong.comment + "/" + Soluong.likestore : undefined} 
                      name={"Đánh giá/ Yêu thích"} icon={"bx bx-comment-dots"}/>
                     </div>
                  </div>
                </div>
                <div className="row">
                    <CHTheoDanhMuc />
                    <CHTheoQuan />
                  </div>
                {/* end row */}
                <div className="row">
                    <BinhLuanThang />
                    <BinhLuanNam/>
                </div>
                <div className="row">
                  <LikeStoretheoNam/>
                  </div>

               {/* end row */}
              </div>
              {/* container-fluid */}
            </div>
            {/* End Page-content */}
           
          </div>
          
        )
    }
}