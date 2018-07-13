/**
 * Created by Aseem on 13-07-2018.
 */
import React, {Component} from 'react';

class VoterLogin extends Component {
    componentDidMount() {
        Authentication.getInstance().createFirebaseLogin('/voter-success','#voter-auth-container');
    }

    render() {
        return (
            <div id="voter-auth-container"></div>
        );
    }
}

export default VoterLogin;