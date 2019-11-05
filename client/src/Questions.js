import React, { Component } from 'react';
import { Link } from "@reach/router";

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
            </React.Fragment>
        );
    }

}

export default Questions;
