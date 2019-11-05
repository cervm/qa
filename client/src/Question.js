import React, { Component } from 'react';
import { Link } from "@reach/router";

class Question extends Component {

    render() {
        const question = this.props.getQuestion(this.props.id);

        let content = <p>Loading</p>;
        if (question) {
            content =
                <React.Fragment>
                    <h1>{question.question}</h1>

                    <h3>Hobbies</h3>
                    <ul>
                        {question.answers.map(answer => <li key={answer._id}>{answer.answer} | Votes: {answer.votes}</li>)}
                    </ul>

                    <Link to="/">Back</Link>
                </React.Fragment>
        }

        return content;
    }
}

export default Question;
