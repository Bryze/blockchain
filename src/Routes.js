/**
 * Created by Aseem on 13-07-2018.
 */
import React from 'react';
import {Route} from 'react-router-dom';
import ProjectSelector from './components/ProjectSelector';
import VoterLogin from './components/voter/VoterLogin';
import VoterSuccess from './components/voter/VoterSuccess';

const Routes = () => (
    <div>
        <Route path="/" component={ProjectSelector}/>
        <Route path="/vote" component={VoterLogin} />
        <Route path="/voter-success" component={VoterSuccess} />
    </div>
);

export default Routes;