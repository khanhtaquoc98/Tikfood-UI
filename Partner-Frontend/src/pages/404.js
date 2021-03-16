import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class Error extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="frame-img-notfound container">
                <h1 className="text-err">404</h1>
                <h1 className="text-err-2">
                    <div>Page Not Found</div>
                </h1>

                <img className="img-notfound" src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="" />
                <div className="text-err-3 row justify-content-center">
                    <Link className="button button--active mt-3 mt-xl-4" to="/">Quay lại trang chủ</Link>
                </div>
            </div>
        );
    }
}

