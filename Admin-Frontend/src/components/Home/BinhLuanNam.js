import React from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {getBLtheoNam} from '../../API/Api'
import Chart from "react-apexcharts";

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
export default class BinhLuanNam extends React.Component{

constructor(props) {
    super(props);
    
    this.state = {
        binhluan: undefined,
        nam: undefined,
        series: [{
            name: 'Tổng bình luận',
            data: []
          },{
            name: 'BL tích cực',
            data: []
          }, {
            name: 'BL tiêu cực',
            data: []
          }],
          options: {
            chart: {
              type: 'bar',
              height: 350
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: [],
            },
            yaxis: {
              title: {
                text: 'Số lượng bình luận'
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + " bình luận"
                }
              }
            }
          },
    }
}

componentDidMount(){
    let d = new Date();
    if(cookies.get('admin') != undefined){
       
        getBLtheoNam(cookies.get('admin'), d.getFullYear()).then(res=>{
            for(let i = 0; i < res.data.length; i++){
               this.state.series[0].data.push(res.data[i].count_comment)
                this.state.series[1].data.push(res.data[i].sentimet_comment_positive)
                this.state.series[2].data.push(res.data[i].sentimet_comment_nagative)
               this.state.options.xaxis.categories.push(res.data[i].month)
            }
           
            this.setState({binhluan: res})
      })
    }
  }

  onChangeYear = (event) => {
      this.setState({series: [{
        name: 'Tổng bình luận',
        data: []
      },{
        name: 'BL tích cực',
        data: []
      }, {
        name: 'BL tiêu cực',
        data: []
      }], binhluan: undefined})
      this.state.options.xaxis.categories = [];
        this.setState({nam: event.target.value})
    if(cookies.get('admin') != undefined){
        getBLtheoNam(cookies.get('admin'), event.target.value).then(res=>{
            for(let i = 0; i < res.data.length; i++){
                console.log(res.data)
                this.state.series[0].data.push(res.data[i].count_comment)
                this.state.series[1].data.push(res.data[i].sentimet_comment_positive)
                this.state.series[2].data.push(res.data[i].sentimet_comment_nagative)
               this.state.options.xaxis.categories.push(res.data[i].month)
             }
           
            this.setState({binhluan: res})
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
            <h4 className="card-title mb-3">Bình luận năm</h4>
            <Spin spinning={this.state.binhluan == undefined ? true : false} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <div >
            {this.state.binhluan  == undefined && <div style={{marginBottom: "350px"}}></div>
                }
                {this.state.binhluan  != undefined && <Chart options={this.state.options} series={this.state.series} type="bar" height={350} />
                }
                </div></Spin>
            </div></div>
            </div>
    )
}

}