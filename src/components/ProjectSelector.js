/**
 * Created by Aseem on 12-07-2018.
 */

import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class ProjectSelector extends Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleMenuItemClick = (route) => {
        this.props.history.push(route);
        this.handleClose();
    };

    componentDidMount() {
        let redirectTo = new URLSearchParams(window.location.search).get('redirectTo');
        switch(redirectTo) {
            case 'voter-success':
                this.props.history.push('/voter-success');
                break;
        }
    }

    render() {
        const {anchorEl} = this.state;

        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    Choose Project
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={() => this.handleMenuItemClick('vote')}>Voting</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default ProjectSelector;