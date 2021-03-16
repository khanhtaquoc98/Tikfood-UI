
import React from "react";
import {GetUserWToken, SentMailBookTable} from "../../Api/Api"
import axios from 'axios'
import { notification } from 'antd';
import {  Slider, Tooltip, Spin } from 'antd';
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi)
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class BookTable extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            UserName: undefined,
            DateBook: undefined,
            Quantity: 1,
            Phone: undefined,
            Email: undefined,
            Loading: false,
        }
    }
    
    componentDidMount(){
        if(cookies.get('user') != undefined){
            this.setState({isLogin: true})
            GetUserWToken(cookies.get('user')).then(res => {
                this.setState({
                    UserName: res.user.fullname == "Chưa cập nhật" ? undefined :  res.user.fullname,
                    Phone: res.user.phone == "Chưa cập nhật" ? undefined :  res.user.phone,
                    Email: res.user.email == "Chưa cập nhật" ? undefined :  res.user.email
                })
            }).catch(err => console.log(err))
        } 
    }

    onbookTable = () => {
        const {UserName, DateBook, Quantity, Phone, Email} = this.state
        if(UserName == "" || Phone == "" , Email == "") {
            this.setState({
                UserName : undefined,
                Phone : undefined,
                Email : undefined,
            })
        }
        //console.log(UserName, DateBook, Quantity, Phone, Email)
        this.setState({Loading: true});
        if(UserName != undefined && Phone != undefined && Email != undefined){
            SentMailBookTable(Email, UserName, DateBook == undefined ? new Date().toLocaleString()  : DateBook, Quantity, Phone, this.props.name , this.props.query.id)
            .then(res => {
                if(res.status != undefined){
                    this.setState({Loading: false})
                    notification.success({
                        message: 'Đặt bàn thành công',
                        description: 'Vui lòng kiểm tra đơn đặt hàng trong email của bạn',
                        placement: "bottomLeft"
                    })
                } else {
                    this.setState({Loading: false})
                    notification.error({
                        message: 'Đặt bàn thất bại',
                        description: 'Vui lòng kiểm tra lại thông tin đặt bàn',
                        placement: "bottomLeft"
                    })
                }
            }).catch(err => {
                this.setState({Loading: false})
                notification.error({
                    message: 'Đặt bàn thất bại',
                    description: 'Vui lòng kiểm tra lại email của bạn',
                    placement: "bottomLeft"
                })
            })
        } else {
            notification.error({
                message: 'Đặt bàn thất bại',
                description: 'Vui lòng điền đầy đủ thông tin đặt bàn',
                placement: "bottomLeft"
            })
            this.setState({Loading: false});
        }
        
    }

    render(){
        console.log(this.state)
        return(
            <div className="box-widget-item fl-wrap block_box">
                    <div className="box-widget-item-header">
                        <h3>Đặt bàn</h3>
                    </div>
                    <Spin spinning={this.state.Loading}  tip="Đang gửi...">
                    <div className="box-widget">
                        <div className="box-widget-content">
                        <div  className="add-comment custom-form">
                            <label><i className="fal fa-user" /></label>
                            <input style={{marginBottom: "1rem"}} type="text" placeholder="Tên của bạn *" onChange={(e) => this.setState({UserName: e.target.value})}  value={this.state.UserName}/>
                            <div className="clearfix" />
                            <label><i className="fal fa-envelope" /></label>
                            <input style={{marginBottom: "1rem"}} type="text" placeholder="Email của bạn*" value={this.state.Email} onChange={(e) => this.setState({Email: e.target.value})}/>
                            <div className="clearfix" />
                            <label><i className="fal fa-phone" /></label>
                            <input style={{marginBottom: "1rem"}} type="text" placeholder="SĐT của bạn*" value={this.state.Phone} onChange={(e) => this.setState({Phone: e.target.value})}/>
                            <div className="quantity fl-wrap" style={{marginBottom: "1rem"}}>
                                <span><i className="fal fa-user-plus" />Số người </span>
                                <div className="quantity-item">
                                <input type="button" defaultValue="-" className="minus" style={{width: "40px", height: "40px"}} 
                                onClick={() => this.setState({Quantity: this.state.Quantity - 1 <= 1 ? 1 : this.state.Quantity - 1})}/>
                                <input type="text" name="Quantity" 
                                value={this.state.Quantity}
                                className="qty color-bg" 
                                data-min={1} data-max={3} data-step={1} defaultValue={1} style={{width: "50px", height: "40px"}}/>
                                <input type="button" defaultValue="+" className="plus" style={{width: "40px", height: "40px"}}
                                onClick={() => this.setState({Quantity: this.state.Quantity + 1})}/>
                                </div>
                            </div>
                            <div className="listsearch-input-item clact date-container2" style={{marginBottom: "1rem"}}>
                                <label><i className="fal fa-calendar" /></label>
                                <DatePicker  selected={this.state.DateBook == undefined ? Date.now() : this.state.DateBook }
                                            onChange={(date) => this.setState({DateBook: date})}
                                            locale="vi"
                                            timeInputLabel="Thời gian:"
                                            dateFormat=" dd/MM/yyyy - h:mm aa"
                                            showTimeInput/>
                                
                                
                               </div>
                            <button onClick={() => this.onbookTable()} type="submit" className="btn color2-bg url_btn float-btn" >Đặt bàn ngay <i className="fal fa-bookmark" /></button>
                        </div>
                        </div>
                    </div></Spin>
                    </div>
                  
        )
    }

}





                    