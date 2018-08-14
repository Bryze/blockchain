/**
 * Created by Aseem on 23-07-2018.
 */
import React, {Component} from 'react';
import Button from "@material-ui/core/Button";

class PendingTransactions extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            hasPendingTransactions: false
        }
    }

    fetchPendingTransactions = () => {
      Authentication.getInstance().getFDBO().ref('/voting/pendingTransactions').once('value').then(
          snapshot => {
             if(snapshot.val()) {
                 Authentication.getInstance().getFDBO().ref('/voting/miners/').child(this.props.uid).update({
                     pendingTransactions: snapshot.val()
                 });
                 this.setState({
                    hasPendingTransactions: true
                 });
                 this.props.updatePendingTransactions(true);
                 Authentication.getInstance().getFDBO().ref('/voting').update({pendingTransactions:0});
             }
          }
      );
    };

    componentDidMount() {
        Authentication.getInstance().getFDBO().ref('/voting/miners').child(this.props.uid).once('value').then(
            snapshot => {
                if(snapshot.val().pendingTransactions!==0) {
                    this.setState({
                        hasPendingTransactions: true
                    });
                    this.props.updatePendingTransactions(true);
                }
            }
        )
    }

    render() {
        return (
            <div>
                {!this.state.hasPendingTransactions && <Button variant="contained" onClick={this.fetchPendingTransactions}>Fetch Pending Transactions</Button>}
                {this.state.hasPendingTransactions && <div>Mine your previous pending transactions first</div>}
            </div>
        )
    }
}

export default PendingTransactions;