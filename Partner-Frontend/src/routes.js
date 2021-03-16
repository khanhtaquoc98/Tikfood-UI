import React from 'react';
import queryString from 'query-string'

import Home from "./pages/Home"
import AddStore from "./pages/Stores/Add"
import StoreEdit from "./pages/Stores/Edit"
import StoreDetail from "./pages/Stores/Detail"

import Reserve from "./pages/Reserve/index"
import ReserveDetails from "./pages/Reserve/detail"

import CheckStore from "./pages/CheckStores/index"
import CheckStoreDetail from "./pages/CheckStores/Detail"

import Login from "./pages/Login"

//
import PicturesWall from "./components/Editor/Upload"

import NotFoundPage from "./pages/404"

const routes = [
    {
        path: '/',
        exact: true,
        main: ({ history }) => <Home history={history} />
    },
    {
        path: '/checkstore',
        exact: true,
        main: ({ location,history }) => <CheckStore history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/checkstore/:id',
        exact: true,
        main: ({ location,history,match }) => <CheckStoreDetail match={match} history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/addstore',
        exact: true,
        main: ({ location,history }) => <AddStore history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/stores/edit/:id',
        exact: true,
        main: ({ location,history,match }) => <StoreEdit match={match} history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/stores/:id',
        exact: true,
        main: ({ location,history,match }) => <StoreDetail match={match} history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/stores',
        exact: true,
        main: ({ location,history }) => <Reserve history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/reserve/:id',
        exact: true,
        main: ({ location,history,match }) => <ReserveDetails match={match} history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/NotFound',
        exact: false,
        main: ({ history }) => <NotFoundPage history={history} />
    },
    {
        path: '',
        exact: false,
        main: ({ history }) => <NotFoundPage history={history} />
    }
    
];

export default routes;