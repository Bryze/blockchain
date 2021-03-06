/**
 * Created by Aseem on 13-07-2018.
 */
import React, {Component} from 'react';
import Base from './Base';
import Registration from "./Registration";
import VoteScreen from "./VoteScreen";
import Miner from "./Miner";

class VoterSuccess extends Base {

    constructor(props) {
        super(props);
        this.state = {
            loadingText: 'Initializing Firebase...',
            isLoading: true,
            uid: null,
            role: null
        }
    }

    updateRole = (role) => {
        this.setState({
            role: role
        });
    };

    componentDidMount() {
        const instance = this;
        Authentication.getInstance().subscribeEvent('firebaseUserInit', function (response) {
            let uid = response.uid;
            Authentication.getInstance().getFDBO().ref('/voting').once('value').then(
                snapshot => {
                    if (!snapshot.val()) {
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
            );
            instance.setState({
                loadingText: 'Firebase has initialized..',
                uid: uid,
                isLoading: false
            })
        });
    }

    render() {
        return (
            <div>
                <div>Project Selected - Voting </div>
                <div>{this.state.loadingText}</div>
                {!this.state.isLoading && <Registration uid={this.state.uid} updateRole={this.updateRole} />}
                {this.state.role==='guest' && <VoteScreen />}
                {this.state.role==='miner' && <Miner uid={this.state.uid} />}
            </div>
        );
    }
}

export default VoterSuccess;