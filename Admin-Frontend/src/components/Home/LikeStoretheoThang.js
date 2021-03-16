import React from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {getYeuThichtheoThang} from '../../API/Api'
import Chart from "react-apexcharts";

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
export default class BinhLuanThang extends React.Component{

constructor(props) {
    super(props);
    
    this.state = {
        binhluan: undefined,
        thang: undefined,
        series: [],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                dataLabels: {
                    name: {
                    fontSize: '22px',
                    },
                    value: {
                    fontSize: '16px',
                    },
                    total: {
                    show: true,
                    label: 'Tiêu cực',
                    formatter: function (w) {
                        console.log(w)
                        return w.globals.series[0] + "%"
                    }
                    }
                }
                }
            },
            labels: ['Tiêu cực', 'Tích cực'],
            },
    }
}

componentDidMount(){
    let d = new Date();
    if(cookies.get('admin') != undefined){
       
        getBLtheoThang(cookies.get('admin'), formatter.format(Date.now())).then(res=>{
            this.state.series.push(parseInt(res.data.sentimet_comment_nagative/(res.data.count) * 100))
            this.state.series.push(parseInt(res.data.sentimet_comment_positive/(res.data.count) * 100))
           
            this.setState({binhluan: res.data})
      })
    }


  }

  onChangeMonth = (event) => {
      console.log(event.target.value)
      this.setState({series: [], binhluan: undefined})
    this.setState({thang: event.target.value})
    if(cookies.get('admin') != undefined){

        getBLtheoThang(cookies.get('admin'), event.target.value).then(res=>{
            this.state.series.push(parseInt(res.data.sentimet_comment_nagative/(res.data.count) * 100))
            this.state.series.push(parseInt(res.data.sentimet_comment_positive/(res.data.count) * 100))
           
            this.setState({binhluan: res.data})
      })
    }
  }

render(){
    let d = new Date();
    return (
        <div className="col-xl-4">
        <div className="card">
        <div className="card-body">
            <div className="float-right">
                <select value={this.state.thang != undefined ? this.state.thang : formatter.format(Date.now())} className="custom-select custom-select-sm ml-2" 
                onChange={this.onChangeMonth}>
                <option value={"Jan"} >Tháng 1</option>
                <option value={"Feb"}>Tháng 2</option>
                <option value={"Mar"}>Tháng 3</option>
                <option value={"Apr"}>Tháng 4</option>
                <option value={"May"} >Tháng 5</option>
                <option value={"Jun"}>Tháng 6</option>
                <option value={"Jul"}>Tháng 7</option>
                <option value={"Aug"}>Tháng 8</option>
                <option value={"Sep"} >Tháng 9</option>
                <option value={"Oct"}>Tháng 10</option>
                <option value={"Nov"}>Tháng 11</option>
                <option value={"Dec"}>Tháng 12</option>
                </select>
            </div>
            <h4 className="card-title mb-3">Lượt thích</h4>
            <Spin spinning={this.state.binhluan == undefined ? true : false} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <div className="row">
                <div >
                {this.state.binhluan  != undefined && <Chart options={this.state.options} series={this.state.series} type="radialBar" height={386} />}
                </div>
                <div className="col-lg-4 col-sm-6 align-self-center">
                <div>
                    <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 mr-2 text-danger" />Tổng số bình luận</p>
                    <h5>{this.state.binhluan != undefined ? this.state.binhluan.count : '0'}<span className="text-muted font-size-14"> bình luận</span></h5>
                </div>
                <div>
                    <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 mr-2 text-primary" />BL Tích cực</p>
                    <h5>{this.state.binhluan != undefined ? this.state.binhluan.sentimet_comment_positive : '0'}<span className="text-muted font-size-14"> bình luận</span></h5>
                </div>
                <div>
                    <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 mr-2 text-warning" /> BL Tiêu cực</p>
                    <h5>{this.state.binhluan != undefined ? this.state.binhluan.sentimet_comment_nagative : '0'}<span className="text-muted font-size-14"> bình luận</span></h5>
                </div>
                </div>
            </div></Spin>
            </div></div>
            </div>
    )
}

}