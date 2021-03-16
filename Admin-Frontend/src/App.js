import React from "react";
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link,} from "react-router-dom";
import routes from "./routes"
import { createBrowserHistory } from 'history';

import Cookies from 'universal-cookie';

//Pages

import Login from "./pages/Login"
import Error from "./pages/404"
import Layout from "./pages/Layout"


const cookies = new Cookies();
const history = createBrowserHistory();

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount(){

  }

  render(){
      return (
        <Router>
        <Switch>
          <Route path="/login" exact={true} component={Login} />
          <Route path="/" component={Layout} />
        </Switch>
        </Router>
    )
    } 
}



