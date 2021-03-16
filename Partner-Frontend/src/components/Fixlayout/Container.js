import React from "react";
import Header from "./Header"
import MenuLeft from "./MenuLeft"

export default class Container extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        }
    }

    onClickShowMenu = () => {
        this.setState({showMenu: !this.state.showMenu})
    }
    

    render() {
        return (
            <>
                 <Header onClickShowMenu = {() => this.onClickShowMenu()}/>
                    <div></div>
                <MenuLeft showMenu={this.state.showMenu} location = {this.props.location}/>
            </>
        );
    }
}       