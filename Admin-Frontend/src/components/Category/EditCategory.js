import React from 'react';
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';
import {putCategory, getDetailCategory} from '../../API/Api'
import {openNotificationWithIcon} from '../../API/showNotication'
import { Modal, Spin } from 'antd';

const cookies = new Cookies();

export default class EditCategory extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      nameCategory: undefined
    }
  }

  componentDidMount(){
  }



  setModal2Visible = (visible,update) => {
    if(update){
      if(cookies.get('admin') != undefined){
        this.setState({loading: true})
        putCategory(cookies.get('admin'),this.props.CategoryEdit, this.state.nameCategory).then(res => {
            this.setState({nameCategory: undefined, loading: false})
            this.props.setModalVisiable(visible, update)
            openNotificationWithIcon('success', 'Bạn vừa chỉnh sửa danh mục thành công', '', 'bottomRight');
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
    console.log(this.props)
    return (
        <Modal
          title="Chỉnh sửa danh mục"
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
                  <input className="form-control" type="text" name="nameCategory"  onChange={this.onChangeContent}  value={this.state.nameCategory} placeholder="Vui lòng nhập tên danh mục mới"/>
              </div>
            </div></Spin>
        </Modal>
    );
  }
}