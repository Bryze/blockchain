import React from 'react';
import ReactDOM from 'react-dom';
import './blockchain/main';
import './auth/authentication';
import {HashRouter,BrowserRouter, Route} from 'react-router-dom';
import Routes from './Routes';

const RouteGroups = () => (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
);
ReactDOM.render(<RouteGroups />, document.getElementById('app'));
