import React from "react";
import ReactDOM from "react-dom";
import { Upload, Modal, Button, Icon } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

export default class PicturesWall extends React.Component {

      Upload = file => {
        //const userId = this.props.userdetail.data.data.id;
        const data = new FormData();
        data.append('file', file);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        let arrayOld = this.props.fileList;
        
        axios
          .post("http://localhost:8080/api/v2/uploadimage", data, config)
          .then(res => {
            let key = arrayOld.length != undefined ? this.props.fileList.length : 0
            arrayOld.push({
                uid: key,
                name: 'image.png',
                status: 'done',
                url: res.data.data,
            })
            this.props.upload(arrayOld)
          })
          .catch(err => {
            let key = arrayOld.length != undefined ? this.props.fileList.length : 0
            arrayOld.push({
                uid: key,
                name: 'image.png',
                status: 'error',
                url: 'image.png',
            })
            this.props.upload(arrayOld)
          })
      }

      removeImage = (file) => {
        let arrayOld = this.props.fileList;
        let index = arrayOld.findIndex( item => item.url === file.url);
        if(index > -1){
            this.props.upload(arrayOld.splice(-index, 1))
        }
      }
    
      render() {
        const uploadButton = (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );
        return (
          <>
            <Upload
              action={this.Upload}
              listType="picture-card"
              fileList={this.props.fileList}
              onRemove = {this.removeImage}
            >
              {this.props.fileList.length >= 22 ? null : uploadButton}
            </Upload>
          </>
        );
      }
}