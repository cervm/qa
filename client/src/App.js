import React, { Component } from 'react';
import { Router } from "@reach/router";
import Question from "./Question";
import Questions from "./Questions";

class App extends Component {
    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            questions: []
        };
    }

    componentDidMount() {
        // Get everything from the API
        this.getQuestions().then(() => console.log("Questions gotten!"));
    }

    async getQuestions() {
        let url = `${this.API_URL}/questions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            questions: json
        })
    }

    async askQuestion(question) {
        let url = `${this.API_URL}/questions/`;
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                question: question
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        this.getQuestions();
    }

    async postAnswer(questionId, answer) {
        let url = `${this.API_URL}/questions/`
            .concat(questionId)
            .concat("/answers");

        await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                answer: answer
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        this.getQuestions();
    }

    async upvoteAnswer(questionId, answerId) {
        let url = `${this.API_URL}/questions/${questionId}/answers/${answerId}/upvote`
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        this.getQuestions();
    }

    getQuestion(id) {
        // Find the relevant question by id
        return this.state.questions.find(k => k._id === id);
    }

    onVote(questionId, answerId) {
        this.upvoteAnswer(questionId, answerId);
    }

    render() {
        return (
            <div className="container">
                <Router>
                    <Question
                        path="/question/:id"
                        getQuestion={id => this.getQuestion(id)}
                        postAnswer={(questionId, answer) => this.postAnswer(questionId, answer)}
                        onVote={(questionId, answerId) => this.onVote(questionId, answerId)} />
                    <Questions
                        path="/"
                        questions={this.state.questions}
                        askQuestion={question => this.askQuestion(question)} />
                </Router>
            </div>
        );
    }
}

export default App;
