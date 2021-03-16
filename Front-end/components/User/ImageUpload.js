import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import Head from 'next/head'
import axios from 'axios'

export default class ImageUpload extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
          };
    }
    

    avatarUpload = file => {
        //const userId = this.props.userdetail.data.data.id;
        const data = new FormData();
        data.append('file', file);
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        axios
          .post("http://localhost:8080/api/v2/uploadimage", data, config)
          .then(res =>{
                this.setState({imageUrl: res.data.data});
                this.props.setURL(res.data.data)})
          .catch(err => this.props.setURL(undefined));
      };


      beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }
 
    render(){
        const { loading, imageUrl } = this.state;
        const uploadButton1 = (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );

     
        return(
        <> 
           {<Upload
                name="avatar"
                showUploadList={false}
                listType="picture-card"
                className="avatar-uploader"
                action={this.avatarUpload}
                listType="picture-card"
                beforeUpload={this.beforeUpload}
                >
                 {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton1}
           </Upload>}
        </> 
        )
    }

}