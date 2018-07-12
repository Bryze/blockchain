import React from 'react';
import ReactDOM from 'react-dom';
import './blockchain/main';
import './auth/authentication';
import {BrowserRouter, Route} from 'react-router-dom';
import ProjectSelector from "./components/ProjectSelector";

const RouteGroups = () => (
    <BrowserRouter>
        <Route path="/" component={ProjectSelector}/>
    </BrowserRouter>
);
ReactDOM.render(<RouteGroups />, document.getElementById('app'));
