/**
 * Created by Aseem on 23-07-2018.
 */
import React, {Component} from 'react';
import Button from "@material-ui/core//Button";
import PendingTransactions from "./PendingTransactions";
import MineBlock from "./MineBlock";

class Miner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: 'Fetching miner profile..',
            isLoading: true,
            minerProfile: null,
            isProfileButtonClicked: false,
            hasPendingTransactions: false
        };
    }

    componentDidMount() {
        const instance = this;
        Authentication.getInstance().getFDBO().ref('/voting/miners').child(instance.props.uid).once('value').then(
            snapshot => {
                if (!snapshot.val()) {
                    let data = {
                        minedBlocks: 0,
                        pendingTransactions: 0
                    };
                    Authentication.getInstance().getFDBO().ref('/voting/miners').child(instance.props.uid).set({...data},
                        function (error) {
                            if (error) {
                                instance.setState({
                                    displayText: 'Cannot create miner profile.',
                                    isLoading: false,
                                    minerProfile: {}
                                });
                            } else {
                                instance.setState({
                                    displayText: 'Miner profile created.',
                                    isLoading: false,
                                    minerProfile: data
                                });
                            }
                        })
                } else {
                    instance.setState({
                        displayText: 'Miner profile already exists.',
                        isLoading: false,
                        minerProfile: snapshot.val()
                    });
                }

            }
        )
    }

    handleProfileButtonClick = () => {
        this.setState({
            isProfileButtonClicked: true
        })
    };

    updatePendingTransactionStatus = (status) => {
        this.setState({
            hasPendingTransactions: status
        })
    };

    render() {
        return (
            <div>
                {this.state.displayText}
                {!this.state.isLoadign && <Button variant="contained" onClick={this.handleProfileButtonClick}>View Profile</Button>}
                {!this.state.isLoading && this.state.isProfileButtonClicked &&
                Object.keys(this.state.minerProfile).map((keys, index) => {
                    return <div key={index}>{keys + " " + this.state.minerProfile[keys]}</div>
                })
                }
                {!this.state.isLoading && <PendingTransactions {...this.props} updatePendingTransactions={this.updatePendingTransactionStatus}/>}
                {this.state.hasPendingTransactions && <MineBlock {...this.props} />}
            </div>
        )
    }
}

export default Miner;