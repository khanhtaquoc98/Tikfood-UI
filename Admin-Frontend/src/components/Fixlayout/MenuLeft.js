import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink, 
    Link
  } from "react-router-dom";
const Menus = [
    {
        name: "Dashboards",
        icon: "bx bx-home-circle",
        link: "/",
        subMenu: undefined
    },
    {
        name: "Danh mục",
        icon: "bx bx-food-menu",
        link: "/category",
        subMenu: undefined
    },
    {
        name: "Khu vực",
        icon: "bx bxs-map-alt",
        link: "/district",
        subMenu: undefined
    },
    {
        name: "Cửa hàng duyệt",
        icon: "bx bx-store",
        link: "/checkstores" ,
        subMenu: undefined
    },
    {
        name: "Cửa hàng",
        icon: "bx bx-store",
        link: "/stores" ,
        subMenu: [
            {
                name: "DS Cửa hàng",
                link: "/stores?page=1",
                show: false,
            },
            {
                name: "Thêm cửa hàng",
                link: "/stores/add",
                show: false
            }
        ]
    },
   
    {
        name: "Khách hàng",
        icon: "bx bx-user",
        link: "/users",
        subMenu: undefined
    },
    {
        name: "Đối tác",
        icon: "bx bx-user-check",
        link: "/partner",
        subMenu: undefined
    },
]

export default class MenuLeft extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            MenuClick: 'Dashboards',
            MenuActive: undefined,
        }
    }
    
   
    componentDidMount(){
      this.setState({MenuActive: Router.route})
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
      }

    onClickMenu = (name) => {
        if(this.state.MenuClick == name){
            this.setState({MenuClick: undefined})
        } else {
            this.setState({MenuClick: name})
        }
    }

    showMenu = () => {
        return(
            <li>
                {
                    Menus.map((item, index) => {
                        let MenuLink = this.props.location.pathname.toString();
                        let MenuLinkReplace  = MenuLink.indexOf('/', 2) != -1 ? MenuLink.slice(0, MenuLink.indexOf('/', 2)) : MenuLink;
                        //console.log(item.link == MenuLinkReplace, item.link)
                        return(
                            <li key={index} >
                            {
                                item.subMenu == undefined && (
                                    <Link  to={item.link}
                                             className={`waves-effect ${item.subMenu != undefined ? "has-arrow" : ""} 
                                                                    ${item.name == this.state.MenuClick ? "open" : ""}
                                                                    ${item.link == MenuLinkReplace ? "mm-active" : ""}`} 
                                            onClick={() => this.onClickMenu(item.name)}>
                                            <i className={item.icon}/>
                                            <span>{item.name}</span>
                                        </Link >
                                )
                            }
                            {
                                item.subMenu != undefined && (
                                    <a  className={`waves-effect ${item.subMenu != undefined ? "has-arrow" : ""}  ${item.name == this.state.MenuClick ? "open" : ""}  ${item.link == MenuLinkReplace ? "mm-active" : ""}`} 
                                    onClick={() => this.onClickMenu(item.name)}>
                                    <i className={item.icon}/>
                                    <span>{item.name}</span>
                                </a>
                                )
                            }
                           {
                                (item.subMenu != undefined) && (
                                    <ul className={`sub-menu ${item.name == this.state.MenuClick ? "" : "mm-collapse"}`}  >
                                        {
                                             item.subMenu.map((subItem, index) => {
                                                return(
                                                    <li key={index} className="mm-active">
                                                        <NavLink exact activeClassName="active" to={subItem.link} >{subItem.name}</NavLink>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    )
                           }
                            </li>
                        )
                    })
                }
            </li>
        )
    }

    render(){
        return(
          <div className={`${this.props.showMenu ? 'open-vertical-menu' : ""} vertical-menu`} >
            <div  className="h-100">
                {/*- Sidemenu */}
                <div id="sidebar-menu">
                {/* Left Menu Start */}
                <ul className="metismenu list-unstyled" id="side-menu">
                    <li className="menu-title">Menu</li>
                    {
                        this.showMenu()
                    }
                   
                </ul>
                
                </div>
                {/* Sidebar */}
            </div>
            </div>

        )
    }
}