import React from "react";
import Head from 'next/head'
import FilterRestaurant from "./FilterRestaurant"
import ListRestaurant from "./ListRestaurant"


export default class ContainerRestaurant extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isGridView: true,
        };
    }

    HandleGridView = () => {
        this.setState({isGridView: !this.state.isGridView})
    }
    
    render() {
        return (
            <> 
            <FilterRestaurant  query = {this.props.query}
                                isShowFilter = {this.props.isShowFilter}
                                HandleGridView={this.HandleGridView} 
                                isGridView={this.state.isGridView}
                                FetchRestaurantsPage = {(pageNumber, category, district, average_stars, min_price, max_price) => this.props.FetchRestaurantsPage(pageNumber, category, district, average_stars, min_price, max_price)}
                                />
            <ListRestaurant isGridView={this.state.isGridView} 
                            pagination = {this.props.pagination}
                            markerID = {this.state.markerID}
                            onShowMarkerProps = {(id, lat, lng) => this.props.onShowMarkerProps(id, lat,lng)}
                            ListRestaurants={this.props.ListRestaurants} activePage={this.props.activePage}
                            FetchRestaurantsPageProps = {(pageNumber) => this.props.FetchRestaurantsPageProps(pageNumber)}
                            LikeStore = {(id) => this.props.LikeStore(id)}/>
            </>
        );
    }

}