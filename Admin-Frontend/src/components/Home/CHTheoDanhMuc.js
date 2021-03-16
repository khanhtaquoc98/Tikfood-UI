import React from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {getSLCHTheoDanhMuc} from '../../API/Api'
import Chart from "react-apexcharts";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class CHTheoDanhMuc extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          SLCHtheoDanhMuc: undefined,
          series: [],
            options: {
              chart: {
                width: 680,
                type: 'pie',
              },
              labels: [],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
        }
      }
      
  
      componentDidMount(){
        if(cookies.get('admin') != undefined){
          getSLCHTheoDanhMuc(cookies.get('admin')).then(res=>{
            for(let i = 0; i < res.data.length; i++){
                this.state.series.push(res.data[i].count)
                this.state.options.labels.push(res.data[i].name)
            }
            this.setState({SLCHtheoDanhMuc: res})
          })
        }
      }

    render(){
        return(
            <div className="col-xl-6">
                <Spin spinning={this.state.SLCHtheoDanhMuc == undefined ? true : false} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <div className="card">
              <div className="card-body">
              <h4 className="card-title mb-4">Số lượng cửa hàng theo danh mục</h4>
              {this.state.SLCHtheoDanhMuc == undefined && <div style={{marginBottom: "16rem"}}></div>}
              {this.state.SLCHtheoDanhMuc != undefined &&
              <Chart options={this.state.options} series={this.state.series} type="pie"/>}
               </div>
            </div></Spin>
          </div>
        )
    }
}