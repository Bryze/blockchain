/**
 * Created by Aseem on 13-07-2018.
 */
import React, {Component} from 'react';

class Base extends Component {
    constructor(props) {
        super(props);
        Authentication.getInstance().getFirebaseObject().auth().onAuthStateChanged((user) => {
            if(!user) {
                props.history.push('/');
            }
        })
    }
}

export default Base;