import React, { Component } from 'react';
import { Link } from "@reach/router";
import PostAnswer from './PostAnswer';

class Question extends Component {
    constructor(props) {
        super(props);
        this.onVote = this.onVote.bind(this);
    }

    onVote(event) {
        this.props.onVote(this.props.id, event.currentTarget.dataset.id);
    }

    render() {
        const question = this.props.getQuestion(this.props.id);

        let content = <p>Loading</p>;
        if (question) {
            content =
                <React.Fragment>
                    <h1>{question.question}</h1>

                    <h3>Answers</h3>
                    <ul>
                        {question.answers.map(answer =>
                            <li key={answer._id}>
                                {answer.answer}<br />
                                Votes: {answer.votes}<br />
                                <button onClick={() => this.props.onVote(this.props.id, answer._id)}>Vote up</button><br />
                            </li>)}
                    </ul>

                    <PostAnswer
                        questionId={this.props.id}
                        postAnswer={(questionId, answer) => this.props.postAnswer(questionId, answer)}
                    />

                    <hr />

                    <Link to="/">Back</Link>
                </React.Fragment>
        }

        return content;
    }
}

export default Question;
