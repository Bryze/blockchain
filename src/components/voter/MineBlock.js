/**
 * Created by Aseem on 25-07-2018.
 */
import React, {Component} from 'react';

class MineBlock extends Component
{
    constructor(props) {
        super(props);
    }

    processPendingTransactions = (data) => {
        console.log(data,'data');
    };

    componentDidMount() {
        Authentication.getInstance().getFDBO().ref('/voting/blockChain').once('value').then(
            snapshot => {
                if(!snapshot.val()) {
                    Authentication.getInstance().getFDBO().ref('/voting/miners/'+this.props.uid+'/pendingTransactions').once('value').then(
                        data => {
                            this.processPendingTransactions(data.val());
                        }
                    );
                } else {

                }
            }
        )
    }

    render() {
        return (
            <div>Block mined</div>
        )
    }
}

export default MineBlock;