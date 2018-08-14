/**
 * Created by Aseem on 25-07-2018.
 */
import React, {Component} from 'react';
import Block from '../../blockchain/block';

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

    getMinerPendingTransactions = () => {
        return Authentication.getInstance().getFDBO().ref('/voting/miners/' + this.props.uid + '/pendingTransactions').once('value');
    };

    componentDidMount() {
        Authentication.getInstance().getFDBO().ref('/voting/blockChain').once('value').then(
            snapshot => {
                if (!snapshot.val()) {
                    this.getMinerPendingTransactions().then(
                        data => {
                            this.setState({
                                statusText: 'Transactions fetched. Mining transactions'
                            });
                            this.processPendingTransactions(data.val());
                            Authentication.getInstance().getFDBO().ref('/voting/miners').child(this.props.uid).update({
                                pendingTransactions: 0
                            });
                        }
                    );
                } else {
                    if(!App.getInstance().getBlockChainObject().getChain().length) {
                        for (let i = 1; i < snapshot.val().length; i++) {
                            let item = snapshot.val()[i];
                            let block = new Block(item.timeStamp, item.transactions, item.previousHash, item.hash, item.nonce);
                            App.getInstance().getBlockChainObject().syncBlocks(block);
                        }
                    }
                    this.getMinerPendingTransactions().then(
                        data => {
                            this.setState({
                                statusText: 'Transactions synced. Mining pending transactions'
                            });
                            this.processPendingTransactions(data.val());
                            Authentication.getInstance().getFDBO().ref('/voting/miners').child(this.props.uid).update({
                                pendingTransactions: 0
                            });
                        }
                    );
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