/**
 * Created by Aseem on 18-07-2018.
 */
import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialText: 'Checking for roles..',
            showRolesButton: false,
            anchorEl: null,
            roleSelected: 'Pick Role'
        };
    }

    componentDidMount() {
        const instance = this;
        Authentication.getInstance().getFDBO().ref('voting/roles').child(instance.props.uid).once('value').then(
            snapshot => {
                if (!snapshot.val()) {
                    instance.setState({
                        initialText: 'No role found.',
                        showRolesButton: true
                    })
                } else {
                    instance.setState({
                        initialText: 'Current assigned role - ' + snapshot.val()
                    })
                }
            }
        );
    }

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleMenuItemClick = (role) => {
        this.setState({
            roleSelected: role
        });
        this.handleClose();
    };

    componentDidUpdate(nextProps, prevState) {
        if(this.state.roleSelected !== prevState.roleSelected) {
            this.registerUserRole(this.state.roleSelected);
        }
    }

    registerUserRole = (role) => {
        const instance = this;
        instance.setState({
            initialText: 'Updating Role...'
        });
        Authentication.getInstance().getFDBO().ref('voting/roles').set({
            [instance.props.uid]: role
        }, function(error) {
            if(error) {
                instance.setState({
                    initialText: 'Could not update role'
                })
            } else {
                instance.setState({
                    initialText: 'Role updated to -- '+role
                })
            }
        })
    };

    render() {
        const { anchorEl, roleSelected } = this.state;
        return (
            <div>
                <div>{this.state.initialText}</div>
                {this.state.showRolesButton &&
                <div>
                    <Button
                        aria-owns={anchorEl ? 'simple-menu' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        {roleSelected}
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={() => this.handleMenuItemClick('guest')}>Guest</MenuItem>
                        <MenuItem onClick={() => this.handleMenuItemClick('miner')}>Miner</MenuItem>
                    </Menu>
                </div>}
            </div>

        )
    }
}

export default Registration;