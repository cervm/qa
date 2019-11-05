import React, { Component } from 'react';

class AskQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: ""
        };
    }
    onClick(event) {
        event.preventDefault();
        this.props.askQuestion(this.state.input)
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    render() {
        return (
            <React.Fragment>
                <h3>Ask New Question</h3>

                <input onChange={event => this.onChange(event)} type="text" />
                <button onClick={event => this.onClick(event)}>Ask Question</button>
            </React.Fragment>
        );
    }
}

export default AskQuestion;
