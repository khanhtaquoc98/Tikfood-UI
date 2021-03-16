import React from 'react';

import ReactDOM from 'react-dom';
import {addDisTrict} from '../../API/Api'
import {openNotificationWithIcon} from '../../API/showNotication'
import { Modal, Spin } from 'antd';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Add extends React.Component {
  constructor() {
    super();

    this.state = {
      nameCategory: undefined,
      loading: false
    }

  }

  setModal2Visible = (visible,update) => {
    if(update){
      if(cookies.get('admin') != undefined){
        this.setState({loading: true})
        addDisTrict(cookies.get('admin'), this.state.nameCategory).then(res => {
            this.setState({nameCategory: undefined, loading: false})
            this.props.setModalVisiable(visible, update)
            openNotificationWithIcon('success', 'Bạn vừa thêm danh mục thành công', '', 'bottomRight');
        }).catch(err => console.log(err))
    }
    } else {
      this.props.setModalVisiable(visible, update)
      this.setState({loading: false})
    }
  }

  onChangeContent = (event) => {
    this.setState({nameCategory : event.target.value})
  } 

  render() {
    return (
        <Modal
          title="Thêm khu vực"
          centered
          visible={this.props.visible}
          onOk={() => this.setModal2Visible(false, true)}
          onCancel={() => this.setModal2Visible(false, false)}
        >
          <Spin spinning={this.state.loading}>
          <div className="form-group row">
              <div className="col-3 col-form-label">
                Tên danh mục
              </div>
              <div className="col-9 ">
                  <input className="form-control" type="text" name="nameCategory"  onChange={this.onChangeContent}  value={this.state.nameCategory} placeholder="Vui lòng nhập tên danh mục"/>
              </div>
            </div></Spin>
        </Modal>
    );
  }
}