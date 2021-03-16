import React from 'react';
import queryString from 'query-string'

import Home from "./pages/Home"

import CheckStores from "./pages/CheckStore/index"
import CheckDetailStores from "./pages/CheckStore/Detail"
import CheckEditStores from "./pages/CheckStore/Edit"
//Stores
import Stores from "./pages/Stores/index"
import StoreAdd from "./pages/Stores/Add"
import StoreDetail from "./pages/Stores/Detail"
import StoreEdit from "./pages/Stores/Edit"

//User
import User from "./pages/User/index"
import UserDetail from "./pages/User/Detail"

//Partner
import Partner from "./pages/Partner/index"
import PartnerDetail from "./pages/Partner/Detail"
import Reserve from "./pages/Partner/Reserve"

//Category
import Category from "./pages/Category/index"

//Category
import District from "./pages/District/index"

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
        path: '/checkstores',
        exact: true,
        main: ({ location,history }) => <CheckStores history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/checkstores/:id',
        exact: true,
        main: ({ location,history,match }) => <CheckDetailStores match={match} history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/checkstores/edit/:id',
        exact: true,
        main: ({ location,history,match }) => <CheckEditStores match={match} history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/stores',
        exact: true,
        main: ({ location,history }) => <Stores history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/stores/add',
        exact: true,
        main: ({ location,history }) => <StoreAdd history={history} location={location} query={queryString.parse(location.search)}/>
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
        path: '/partner',
        exact: true,
        main: ({ location,history }) => <Partner history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/partner/reserve/:id',
        exact: true,
        main: ({ location,history,match }) => <Reserve match={match} history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/partner/:id',
        exact: true,
        main: ({ location,history,match }) => <PartnerDetail match={match} history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/users',
        exact: true,
        main: ({ location,history }) => <User history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/user/:id',
        exact: true,
        main: ({ location,history,match }) => <UserDetail match={match} history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/category',
        exact: true,
        main: ({ location,history }) => <Category history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/district',
        exact: true,
        main: ({ location,history }) => <District history={history} location={location} query={queryString.parse(location.search)}/>
    },
    {
        path: '/Upload',
        exact: true,
        main: ({ location,history }) => <PicturesWall history={history} location={location} query={queryString.parse(location.search)}/>
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