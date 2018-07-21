/**
 * Created by Aseem on 21-07-2018.
 */
import React, {Component} from 'react';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class VoteScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pickedChoice: null,
            isSuccess: false,
            isError: false,
            isErrorText: null,
            isSuccessText: null,
            isSubmitted: false
        }
    }

    handleChange = (event) => {
        this.setState({
            pickedChoice: event.target.value,
            isSubmitted: false
        });
    };

    handleSubmit = () => {
        let data = {
            votedBy: Authentication.getInstance().getUser().email,
            votedTo: this.state.pickedChoice,
            time: Date.now()
        };
        Authentication.getInstance().getFDBO().ref('/voting/pendingTransactions').push({...data},
            error => {
                if (error) {
                    this.setState({
                        isError: true,
                        isErrorText: "Couldn't update your entry. Please try again later",
                        isSubmitted: true
                    })
                } else {
                    this.setState({
                        isSuccess: true,
                        isSuccessText: 'Successfully submitted your entry',
                        isSubmitted: true
                    })
                }
            });
    };

    render() {
        return (<div>
            <FormControl component="fieldset">
                <FormLabel component="legend">Vote For</FormLabel>
                <RadioGroup
                    aria-label="votingOption"
                    name="voteSelector"
                    value={this.state.pickedChoice}
                    onChange={this.handleChange}>
                    <FormControlLabel value="candidate_1" control={<Radio />} label="Candidate 1"/>
                    <FormControlLabel value="candidate_2" control={<Radio />} label="Candidate 2"/>
                </RadioGroup>
            </FormControl>
            {this.state.pickedChoice && !this.state.isSubmitted && <Button variant="contained" onClick={this.handleSubmit}>Submit</Button>}
            {this.state.isError && <div>{this.state.isErrorText}</div>}
            {this.state.isSuccess && <div>{this.state.isSuccessText}</div>}
        </div>)
    }
}

export default VoteScreen;