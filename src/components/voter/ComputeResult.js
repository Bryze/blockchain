/**
 * Created by Aseem on 14-08-2018.
 */
import React, {Component} from 'react';
import Block from '../../blockchain/block';
import Button from "@material-ui/core/Button";

export default class ComputeResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSyncSuccess: false,
            isResultClicked: false,
            firstCandidateResult: 0,
            secondCandidateResult: 0
        };
    }

    componentDidMount() {
        Authentication.getInstance().getFDBO().ref('/voting/blockChain').once('value').then(
            snapshot => {
                console.log(snapshot.val());
                if (snapshot.val()) {
                    for (let i = 1; i < snapshot.val().length; i++) {
                        let item = snapshot.val()[i];
                        let block = new Block(item.timeStamp, item.transactions, item.previousHash, item.hash, item.nonce);
                        App.getInstance().getBlockChainObject().syncBlocks(block);
                    }
                    this.setState({
                        isSyncSuccess: true
                    })
                } else {

                }
            }
        )
    }

    calculateResult = () => {
        let candidate1Result = App.getInstance().getBlockChainObject().getBalanceOfAddress('candidate_1');
        let candidate2Result = App.getInstance().getBlockChainObject().getBalanceOfAddress('candidate_2');
        this.setState({
            firstCandidateResult:candidate1Result,
            secondCandidateResult:candidate2Result,
            isResultClicked: true
        });
    };

    render() {
        return (
            <div>
                {this.state.isSyncSuccess && <Button onClick={this.calculateResult} variant="contained">Calculate Result</Button> }
                {this.state.isResultClicked && <div>First candidate votes - {this.state.firstCandidateResult}</div>}
                {this.state.isResultClicked && <div> Second candidate votes - {this.state.secondCandidateResult}</div>}
            </div>
        )
    }

}