/**
 * Created by Aseem on 25-07-2018.
 */
import React, {Component} from 'react';

class MineBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusText: 'Checking for transactions',
            hashesComputed: 0
        }
    }

    processPendingTransactions = (data) => {
        let coin = App.getInstance();
        Object.keys(data).forEach(keys => {
            coin.getBlockChainObject().createTransaction(
                coin.getNewTransactionObject(data[keys].votedBy, data[keys].votedTo, 1)
            );
        });
        coin.getBlockChainObject().minePendingTransactions(this.props.uid);
        this.setState({
            statusText: 'Block mined!',
            hashesComputed: coin.getBlockChainObject().getHashesComputed()
        });
        Authentication.getInstance().getFDBO().ref('/voting').update({
            blockChain: coin.getBlockChainObject().getChain()
        });
    };

    componentDidMount() {
        Authentication.getInstance().getFDBO().ref('/voting/blockChain').once('value').then(
            snapshot => {
                if (!snapshot.val()) {
                    Authentication.getInstance().getFDBO().ref('/voting/miners/' + this.props.uid + '/pendingTransactions').once('value').then(
                        data => {
                            this.setState({
                                statusText: 'Transactions fetched. Mining transactions'
                            });
                            this.processPendingTransactions(data.val());
                        }
                    );
                } else {
                    //sync already existing blockchain object
                }
            }
        )
    }

    render() {
        return (
            <div>
                <div>{this.state.statusText}</div>
                <div>{this.state.hashesComputed + " hashes computed."}</div>
            </div>
        )
    }
}

export default MineBlock;