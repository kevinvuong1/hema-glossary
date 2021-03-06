import React, {Component} from 'react';
import {FormControl, Button, FormGroup, Panel, ControlLabel} from 'react-bootstrap';
import axios from 'axios';

class AddTermForm extends Component {

    state = {
        word: '',
        trans: '',
        comments: '',
        lang: '',
        error: '',
    };

    submitForm = async (e) => {
        e.preventDefault();

        try {
            // Add term to database
            await axios.post('/terms', {
                word: this.state.word,
                trans: this.state.trans,
                comments: this.state.comments,
                lang: this.state.lang,
            });

            // Clear error message and form inputs
            this.setState({
                word: '',
                trans: '',
                comments: '',
                lang: '',
                error: '',
            });

        } catch (err) {
            this.setState({error: `Error submitting form ${err}`});
        }
    };

    renderAlert = () => (
        this.state.error ? <div>Error submitting {this.state.error}</div> : null
    );

    render(){
        return (
            <Panel header="Add a word to the glossary" bsStyle="primary">
                <form onSubmit={this.submitForm}>
                    <FormGroup bsSize="large">
                        <ControlLabel>Word:</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Word"
                            onChange={e => this.setState({word: e.target.value})}
                            value={this.state.word}
                            required
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Translation:</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Translation"
                            onChange={e => this.setState({trans: e.target.value})}
                            value={this.state.trans}
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Comments:</ControlLabel>
                        <FormControl
                            componentClass="textarea"
                            placeholder="Comments"
                            onChange={e => this.setState({comments: e.target.value})}
                            value={this.state.comments}
                        />
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <ControlLabel>Language</ControlLabel>
                        <FormControl
                            required
                            componentClass="select"
                            placeholder="Select"
                            onChange={e => this.setState({lang: e.target.value})}
                        >
                            <option value="">Select</option>
                            <option value="ITALIAN">Italian</option>
                            <option value="GERMAN">German</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="large">
                        <Button
                            type="submit"
                            className="btn btn-primary"
                            bsSize="lg"
                            disabled={this.props.isLoading}
                        >
                            Submit
                        </Button>
                        {this.renderAlert()}
                    </FormGroup>
                </form>
                <Button
                    onClick={this.props.getTerms}
                    className="btn btn-primary"
                    bsSize="lg"
                    disabled={this.props.isLoading}
                >Refresh Glossary</Button>
            </Panel>
        );
    }
}

export default AddTermForm;