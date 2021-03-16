import React from "react";
import {BrowserRouter as Router,Switch,Route,Link, Redirect,} from "react-router-dom";
import { createBrowserHistory } from 'history';
import routes from "../routes"
import Cookies from 'universal-cookie';
import Container from '../components/Fixlayout/Container'
import {GetUserWToken, CheckAdmin} from '../API/Api'

const cookies = new Cookies();
const history = createBrowserHistory();

export default class Layout extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false
        }
    }
    
    componentDidMount(){
        
    }

    showRoutes = (routes) => {
        var result = null;
        if (routes.length > 0) {
          result = routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            )
          })
        }
        return result;
      }

    render(){
        if(CheckAdmin() == true){
            return(
                <div id="layout-wrapper">
                <Container location = {this.props.location}/>
                <Switch>
                {this.showRoutes(routes)}
                </Switch>
      
                  <div className="rightbar-overlay"></div>
                </div>
            )
        } else {
            return <Redirect to="/login"/>
        }
            
        
    }
}