import React from "react";
import Router from "next/router"
import {checkMail} from '../../../Api/pathname'
import {UserRegister} from '../../../Api/Api'
import { Result, Button } from 'antd';
import axios from 'axios'

export default class DangKi extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isPasswordCheck: false,
            isMailCheck: false,
            isBoxCheck: false,
            isError: false,
            email: undefined,
            password: undefined,
            confirm: undefined,
            check: false,
            isSentMail: false,
        }
    }
    

    handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({[event.target.name] : value})
        //console.log(this.state.User)
    }

    handleSubmit = () =>  {
        //console.log(this.state);
        if(checkMail(this.state.email) == false){
            this.setState({isMailCheck: true})
        } else this.setState({isMailCheck: false})

        if( this.state.password != undefined || this.state.confirm != undefined){
            if(this.state.password == this.state.confirm) this.setState({isPasswordCheck: false})
            else  this.setState({isPasswordCheck: true})
        } else this.setState({isPasswordCheck: true})

        this.setState({isBoxCheck : !this.state.check})

        console.log(this.state)

        if(this.state.isMailCheck == false && this.state.isPasswordCheck == false && this.state.isBoxCheck == false){
            UserRegister(this.state.email, this.state.password).then(res => {
                if(res != null) {
                    axios.post('http://localhost:8080/sendmailactiveuser',{"email" : this.state.email}).then(res => {
                        this.setState({isSentMail: true})
                        this.setState({isPasswordCheck: false, isMailCheck: false, isBoxCheck: false,isError: false,
                            email: undefined,password: undefined, confirm: undefined, check: false})
                    }).catch(err => this.setState({isError: false}))
                }
            }).catch(err => this.setState({isError : true}))
        } else this.setState({isError: true});
      }
    

    render(){
        return(
            <div  className="tab-content first-tab">
            <div className="custom-form">
            <div>   
                {this.state.isError && <p style={{color: "#ef5350"}}>Email ???? c?? ng?????i s??? d???ng ho???c m???t kh???u kh??ng ph?? h???p. Vui l??ng th??? l???i</p> }   
                {this.state.isMailCheck && <p style={{color: "#ef5350"}}>Email kh??ng h???p l???. Vui l??ng th??? l???i</p> }    
                {this.state.isPasswordCheck && <p style={{color: "#ef5350"}}>M???t kh???u v?? x??c nh???n m???t kh???u kh??ng gi???ng nhau. Vui l??ng th??? l???i</p> }  
                {this.state.isBoxCheck && <p style={{color: "#ef5350"}}>B???n ch??a ch???p nh???n ??i???u kho???n s??? d???ng</p> }  
                {this.state.isErrrMail && <p style={{color: "#ef5350", fontWeight: "700"}}>L???i g???i mail</p> }  
                {
                    this.state.isSentMail == true &&   <Result
                    status="success"
                    title="????ng k?? th??nh c??ng!"
                    subTitle="Vui l??ng v??o email ???? ????ng k?? ????? ???????c k??ch ho???t t??i kho???n."
                    extra={[
                      <Button type="primary" key="console" onClick={() => Router.reload()}>
                        ????ng ????ng k??
                      </Button>,
                      <Button key="buy" onClick={() => this.setState({isSentMail: false})}>????ng k?? l???i</Button>,
                    ]}
                  />
                }
                {
                    this.state.isSentMail == false &&  <div  className="main-register-form" >
                    <label>?????a ch??? email <span>*</span> </label>
                    <input name="email" type="text" value={this.state.email} onChange={this.handleChange}  style={{marginBottom: ".8rem"}}/>
                    <label>M???t kh???u <span>*</span></label>
                    <input  type="password" name="password" value={this.state.password} onChange={this.handleChange} style={{marginBottom: ".8rem"}}/>
                    <label >Nh???p l???i m???t kh???u <span>*</span></label>
                    <input type="password" name="confirm"  value={this.state.confirm} onChange={this.handleChange}  style={{marginBottom: ".8rem"}}/>
                    <div className="filter-tags ft-list" style={{marginBottom: ".8rem"}} >
                        <input type="checkbox" name="check" value={this.state.check} onChange={this.handleChange} />
                        <label htmlFor="check-a2">B???n ?????ng ?? v???i c??c <a href="#">??i???u kho???n, ch??nh s??ch s??? d???ng</a></label>
                    </div>
                    <div className="clearfix" />
                    <button className="btn float-btn color2-bg" onClick={this.handleSubmit}> ????ng k??  <i className="fas fa-caret-right" /></button>
                    </div>
                }
              
                <div className="clearfix" />
                <div className="filter-tags">
                </div>
            </div>
           
            </div>
        </div>
        )
    }

}