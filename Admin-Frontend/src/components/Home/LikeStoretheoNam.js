import React from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {getYeuThichtheoNam, getYeuThichtheoThang} from '../../API/Api'
import Chart from "react-apexcharts";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class LikeStoretheoNam extends React.Component{

constructor(props) {
    super(props);
    
    this.state = {
        binhluan: undefined,
        nam: undefined,
        series: [{
            name: "lượt thích",
            data: []
          }],
          options: {
            chart: {
              type: 'area',
              height: 350,
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            labels: [],
            xaxis: {
              type: 'string',
            },
            yaxis: {
              opposite: true
            },
            legend: {
              horizontalAlign: 'left'
            }
          },
    }
}

componentDidMount(){
    let d = new Date();
    if(cookies.get('admin') != undefined){
       
        getYeuThichtheoNam(cookies.get('admin'), d.getFullYear()).then(res=>{
            for(let i = 0; i < res.data.length; i++){
                //console.log(res.data[i].count_likestore)
               this.state.series[0].data.push( res.data[i].count_likestore)
               this.state.options.labels.push(res.data[i].month)
            }
           
            this.setState({binhluan: '231'})
      })
    }
  }

  onChangeYear = (event) => {
      this.setState({series: [{
        name: "lượt thích",
        data: []
      }], binhluan: undefined})
      this.state.options.labels = [];
        this.setState({nam: event.target.value})
    if(cookies.get('admin') != undefined){
        getYeuThichtheoNam(cookies.get('admin'), event.target.value).then(res=>{
            for(let i = 0; i < res.data.length; i++){
                this.state.series[0].data.push( res.data[i].count_likestore)
               this.state.options.labels.push(res.data[i].month)
                
             }
           
             this.setState({binhluan: '231'})
      })
    }
  }

  showYear = () => {
    const year = (new Date()).getFullYear();
    this.years = Array.from(new Array(20),(val, index) => year - index );
    return(
        <select value={this.state.nam != undefined ? this.state.nam : year} className="custom-select custom-select-sm ml-2" 
        onChange={this.onChangeYear}>
            {
                this.years.map((year, index) => {
                    return <option key={`year${index}`} value={year}>{year}</option>
                })
                }
        </select>
    )
   
  }

render(){
  
    return (
        <div className="col-xl-8">
        <div className="card">
        <div className="card-body">
            <div className="float-right">
                {this.showYear()}
            </div>
            <h4 className="card-title mb-3">Lượt thích quán ăn theo năm</h4>
            <Spin spinning={this.state.binhluan == undefined ? true : false} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <div >
            {this.state.binhluan  == undefined && <div style={{marginBottom: "350px"}}></div>
                }
                {this.state.binhluan  != undefined && <Chart options={this.state.options} series={this.state.series} type="area" height={350}/>
                }
                </div></Spin>
            </div></div>
            </div>
    )
}

}