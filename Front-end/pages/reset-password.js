import React from "react";
import Head from 'next/head'
import Link from 'next/link'
import {PutPasswordUser} from '../Api/Api'
import axios from 'axios'

export default class Email extends React.Component{

    constructor(props) {
        super(props);
        this.state = ({
            password : undefined,
            confirmpassword: undefined,
            isError: false,
            isSucces: false,
            isSentEmail: false,
        })
    }

    static getInitialProps({query}) {
        return {query}
      }

      componentDidUpdate(prevProps, prevState) {
        if(this.props.query.ref != prevProps.query.ref)
        {
            if(this.props.query.ref != undefined)
                {
                    axios.get('http://localhost:8080/nguoi-dung/thong-tin-ca-nhan/ref=' + this.props.query.ref).then(res => {
                        //console.log(res)
                        if(res.status == 201){
                            this.setState({user: res.data.user})
                            this.setState({active : res.data.user.active})
                        }
                    }).catch(err => this.setState({active: 3}))
                }
        }
      }
 

      componentDidMount(){
        if(this.props.query.ref != undefined)
        {
            axios.get('http://localhost:8080/nguoi-dung/thong-tin-ca-nhan/ref=' + this.props.query.ref).then(res => {
                //console.log(res)
                if(res.status == 201){
                    this.setState({user: res.data.user})
                    this.setState({active : res.data.user.active})
                }
            }).catch(err => this.setState({active: 3}))
        }
           
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
        //console.log(this.state.User)
    }

    handleSent = () => {
        if(this.state.password != undefined && this.state.confirmpassword != undefined)
        {
            if(this.state.password == this.state.confirmpassword){
                PutPasswordUser(this.props.query.ref, this.state.password, this.state.confirmpassword).then(res => {
                    this.setState({isSucces: true, isError: false})
                }).catch(err => this.setState({isError: true, isSucces: false}))
            } 
            else{ this.setState({isError: true, isSucces: false})}
        } 
        else{ this.setState({isError: true, isSucces: false})}
        
    } 
    
    setnMail = () => {
        axios.post("http://localhost:8080/sendmailactiveuser", {
            "email": this.state.user.email
        }).then(res => {this.setState({isSentEmail: true, isSucces: false, isError: false})})
    }

    render() {
        if(this.state.active == 1){
            return (
                <div id="wrapper">
                     <Head>
                    <title>?????i m???t kh???u - TikFood - H??? tr???, t?? v???n c??c ?????a ??i???m qu??n ??n</title>
                    <meta name="description" content="TikFood t??m nh?? h??ng online nhanh ch??ng v?? k??m nhi???u ??u ????i, gi???m gi?? m?? kh??ng c???n voucher"></meta>
                    <meta property="og:description" content="?????t b??n nh?? h??ng tr???c tuy???n. G???i ngay t???ng ????i >> 1900 6005 ????? nh???n ???????c h??? tr??? ?????t b??n PasGo, ?????t ch??? nh?? h??ng online k??m ??u ????i, gi???m gi?? m?? kh??ng c???n voucher"></meta>
                    <meta property="og:image" content="https://storage.googleapis.com/finalprojectuit/bg.jpg"></meta>
                    </Head>
                        {/* content*/}
                        <div className="content">
                            {/*  section  */}
                            <section className="parallax-section small-par" data-scrollax-parent="true">
                            <div className="bg" style={{backgroundImage: "url('/images/bg/hero/4.jpg')"}} data-scrollax="properties: { translateY: '30%' }" />
                            <div className="overlay op7" />
                            <div className="container">
                                <div className="error-wrap">
                                <div >
                                    <h4 style={{fontSize: "3rem", color: "#fff"}}>Thay ?????i m???t kh???u</h4>
                                </div>
                                {this.state.isSucces == false && (<p>Vui l??ng nh???p m???t kh???u m???i.</p>)}
                                
                                <div className="clearfix" />
                                {this.state.isError && <p style={{fontWeight: "700"}}>Vui l??ng ki???m tra l???i m???t kh???u!</p>}
                                {this.state.isSucces && <p style={{fontWeight: "700"}}>?????i m???t kh???u th??nh c??ng!</p>}
                                {this.state.isSucces == false && (
                                    <div className="farme">
                                    <input name="password" type="password" className="search" placeholder="Nh???p m???t kh???u m???i" 
                                    value={this.state.password != undefined ? this.state.password : ''} 
                                    onChange={this.handleChange}/>
                                    
                                    <input name="confirmpassword" type="password" className="search" placeholder="X??c nh???n l???i m???t kh???u" 
                                    value={this.state.confirmpassword != undefined ? this.state.confirmpassword : ''} 
                                    onChange={this.handleChange}/>
                                    
                                </div>
                                )}
                                
                            
                                <div className="clearfix" />
                                {this.state.isSucces == false && <a className="btn   color2-bg" onClick={() => this.handleSent()}> <i class="fal fa-angle-right"></i>Ch???p nh???n</a> }
                                 {this.state.isSucces == true &&  (<Link href="/"><a  className="btn   color2-bg">Trang ch???<i className="far fa-home-alt" /></a></Link>)}
                                
                               
                                </div>
                            </div>
                            </section>
                            {/*  section  end*/}
                        </div>
                        {/*content end*/}
                        </div>
                )
        } else {
            if(this.state.active == 0){
                return(
                    <div id="wrapper">
                    {/* content*/}
                    <div className="content">
                        {/*  section  */}
                        <section className="parallax-section small-par" data-scrollax-parent="true">
                        <div className="bg" style={{backgroundImage: "url('/images/bg/hero/4.jpg')"}} data-scrollax="properties: { translateY: '30%' }" />
                        <div className="overlay op7" />
                        <div className="container">
                            <div className="error-wrap">
                            <div className="bubbles">
                                <h4 style={{fontSize: "3rem", color: "#fff"}}>Thay ?????i m???t kh???u</h4>
                            </div>
                            <div className="clearfix" />
                            <p style={{fontSize: "1.5rem"}}>T??i kho???n ch??a ???????c k??ch ho???t</p>
                            {this.state.isSentEmail == false && <p style={{fontSize: "1rem"}}>Vui l??ng ki???m tra l???i email k??ch ho???t ho???c g???i l???i email k??ch ho???t</p>}
                            {this.state.isSentEmail && <p style={{fontSize: "1rem"}}>Ch??ng t??i v???a g???i mail k??ch ho???t. Vui l??ng b???n ki???m tra l???i trong email</p>}
                            <div className="clearfix" />
                            <a  className="btn color2-bg" style={{marginRight: ".4rem"}} onClick={() => this.setnMail()}>G???i l???i mail<i className="far fa-envelope" /></a>
                            <Link href="/"><a  className="btn   color2-bg">Tr??? v??? trang ch???<i className="far fa-home-alt" /></a></Link>
                            </div>
                        </div>
                        </section>
                        {/*  section  end*/}
                    </div>
                    {/*content end*/}
                    </div>
                )
            } else {
                return(
                    <div id="wrapper">
                    {/* content*/}
                    <div className="content">
                        {/*  section  */}
                        <section className="parallax-section small-par" data-scrollax-parent="true">
                        <div className="bg" style={{backgroundImage: "url('/images/bg/hero/4.jpg')"}} data-scrollax="properties: { translateY: '30%' }" />
                        <div className="overlay op7" />
                        <div className="container">
                            <div className="error-wrap">
                            <div className="bubbles">
                                <h2 style={{fontSize: "4rem"}}>Thay ?????i m???t kh???u</h2>
                            </div>
                            <div className="clearfix" />
                            <p style={{fontSize: "1.5rem"}}>Kh??ng t??m th???y t??i kho???n c???a b???n</p>
                            <div className="clearfix" />
                            <Link href="/"><a  className="btn   color2-bg">Tr??? v??? trang ch???<i className="far fa-home-alt" /></a></Link>
                            </div>
                        </div>
                        </section>
                        {/*  section  end*/}
                    </div>
                    {/*content end*/}
                    </div>
                )
            }
        }
   
    }
}