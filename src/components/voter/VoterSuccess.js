/**
 * Created by Aseem on 13-07-2018.
 */
import React, {Component} from 'react';
import Base from './Base';

class VoterSuccess extends Base {

    componentDidMount() {
        Authentication.getInstance().subscribeEvent('firebaseUserInit', function(response) {
            let uid = response.uid;
            Authentication.getInstance().getFDBO().ref('/voting').once('value').then(
                snapshot => {
                    if(!snapshot.val()) {
                        Authentication.getInstance().getFDBO().ref().child('voting').set(
                            {
                                'blockChain': 0,
                                'pendingTransactions': 0,
                                'miners': 0,
                                'roles': 0
                            }
                        );
                    }
                }
            )
        });
    }

    render() {
        return (
            <div>Hello</div>
        );
    }
}

export default VoterSuccess;