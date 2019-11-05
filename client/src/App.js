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

    getQuestion(id) {
        // Find the relevant question by id
        return this.state.questions.find(k => k._id === id);
    }

    render() {
        return (
            <div className="container">
                <Router>
                    <Question path="/question/:id" getQuestion={id => this.getQuestion(id)} />
                    <Questions path="/" questions={this.state.questions} />
                </Router>
            </div>
        );
    }
}

export default App;
