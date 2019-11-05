import React, { Component } from 'react';
import { Link } from "@reach/router";
import AskQuestion from './AskQuestion';

class Questions extends Component {

    render() {
        return (
            <React.Fragment>
                <h1>Questions</h1>
                <ol>
                    {this.props.questions.map(question =>
                        <li key={question._id}>
                            <Link to={`/question/${question._id}`}>{question.question}</Link>
                        </li>)}
                </ol>
                <AskQuestion askQuestion={question => this.props.askQuestion(question)} />
            </React.Fragment>
        );
    }

}

export default Questions;
