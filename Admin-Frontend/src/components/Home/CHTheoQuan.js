import React from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {getSLCHTheoQuan} from '../../API/Api'

import Chart from "react-apexcharts";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class CHTheoQuan extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          SLCHtheoQuan: undefined,
          series: [],
          options: {
            chart: {
              width: 580,
              type: 'donut',
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
          getSLCHTheoQuan(cookies.get('admin')).then(res=>{
            for(let i = 0; i < res.data.length; i++){
                this.state.series.push(res.data[i].count)
                this.state.options.labels.push(res.data[i].name)
            }
            this.setState({SLCHtheoQuan: res})
          })
        }
      }

    render(){
        return(
            <div className="col-xl-6">
              <Spin spinning={this.state.SLCHtheoQuan == undefined ? true : false} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <div className="card">
              <div className="card-body">
              <h4 className="card-title mb-4">Số lượng cửa hàng theo quận</h4>
              {this.state.SLCHtheoQuan == undefined && <div style={{marginBottom: "16rem"}}></div>}
              {this.state.SLCHtheoQuan != undefined &&
              <Chart options={this.state.options} series={this.state.series} type="donut"/>}
               </div>
            </div></Spin>
            </div>
        )
    }
}