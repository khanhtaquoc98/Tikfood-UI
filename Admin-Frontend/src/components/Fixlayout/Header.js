import React from "react";
import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";



import {GetUserWToken} from "../../API/Api"

const cookies = new Cookies();
export default class Header extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,

        }
    }

    componentDidMount(){
        this.isLogin()
    }

    isLogin = () => {
        if(cookies.get('admin') != undefined){
            this.setState({isLogin: true})
            GetUserWToken(cookies.get('admin')).then(res => this.setState({User : res.user}))
        } 
        else this.setState({isLogin: false})
    }

    LogOut = () => {
        cookies.remove('admin');
     
        window.location.reload(); 
        this.isLogin()
    }


    render(){
        return(
          <>
         <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              {/* LOGO */}
              <div className="navbar-brand-box">
             
                <Link to="/"  className="logo logo-light">
                  <span className="logo-sm">
                    <img src="/assets\images\logo-light.svg"  height={22} />
                  </span>
                  <span className="logo-lg">
                    <img src="/assets\images\logo-light.png"  height={19} />
                  </span>
                </Link>
              </div>
              <button type="button" className="btn btn-sm px-3 font-size-16 header-item waves-effect item-bar" onClick={() => this.props.onClickShowMenu()}>
                <i className="fa fa-fw fa-bars" />
              </button>
              {/* App Search*/}
             
              
            </div>
            <div className="d-flex">
              <div className="dropdown d-inline-block">
                <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img className="rounded-circle header-profile-user" src="https://cdn4.vectorstock.com/i/thumb-large/52/38/avatar-icon-vector-11835238.jpg" alt="Header Avatar" />
                  <span className="d-none d-xl-inline-block ml-1">Admin</span>
                  <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  {/* item*/}
                  <a className="dropdown-item" ><i className="bx bx-user font-size-16 align-middle mr-1" /> Dashboards</a>
                  
                  <a className="dropdown-item text-danger" onClick={() => this.LogOut()}><i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger" /> Logout</a>
                </div>
              </div>
            </div>
          </div>
        </header>
        </>
        )
    }
}