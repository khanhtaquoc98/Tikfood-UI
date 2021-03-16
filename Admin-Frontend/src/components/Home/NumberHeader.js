import React from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default class NumberHeader extends React.Component{

    render(){
        return(
           
            <div className="col-md-3">
                 <Spin spinning={this.props.data == undefined ? true : false} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <div className="card mini-stats-wid">
              <div className="card-body">
                <div className="media">
                  <div className="media-body">
                    <p className="text-muted font-weight-medium">{this.props.name}</p>
                    <h4 className="mb-0">{this.props.data}</h4>
                  </div>
                  <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                    <span className="avatar-title rounded-circle bg-primary">
                      <i className={`font-size-24 ${this.props.icon}`} />
                    </span>
                  </div>
                </div>
              </div>
            </div></Spin>
          </div>
        )
    }
}