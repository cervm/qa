import React, { Component } from 'react';

class PostAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    onClick(event) {
        event.preventDefault();
        this.props.postAnswer(this.props.questionId, this.state.input)
    }

    render() {
        return (
            <React.Fragment>
                <h3>Post New Answer</h3>

                <input onChange={event => this.onChange(event)} type="text" />
                <button type="submit" onClick={event => this.onClick(event)}>Post Answer</button>
            </React.Fragment>
        );
    }
}

export default PostAnswer;
