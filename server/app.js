const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

/**** Configuration ****/
const appName = "QA App";
const port = (process.env.PORT || 8080);
const app = express();
const buildPath = path.join(__dirname, '..', 'client', 'build');

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(cors());
app.use(morgan('combined')); // Log all http requests to the console
app.use(express.static(buildPath)); // Serve React from build directory

/**** Database ****/
// The "QA Data Access Layer".
const qaDAL = require('./qa_dal')(mongoose);

/**** Routes ****/
app.get('/api/questions', (req, res) => {
  // Get all questions. Put questions into json response when it resolves.
  qaDAL.getQuestions().then(questions => res.json(questions));
});

app.get('/api/questions/:id', (req, res) => {
  let id = req.params.id;
  qaDAL.getQuestion(id).then(question => res.json(question));
});

app.post('/api/questions', (req, res) => {
  let question = {
    question: req.body.question,
    answers: []
  };
  qaDAL.createQuestion(question).then(newQuestion => res.json(newQuestion));
});

app.post("/api/questions/:id/answers", (req, res) => {
  let answer = {
    answer: req.body.answer,
    votes: 0
  };
  qaDAL.postAnswer(req.params.id, answer).then(question => res.json(question));
});

app.put("/api/questions/:questionId/answers/:answerId/upvote", (req, res) => {
  console.log(req.params);
  qaDAL.upvote(req.params.questionId, req.params.answerId).then(question => res.json(question));
});

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

/**** Start ****/
const url = (process.env.MONGO_URL || 'mongodb://localhost/qa-app');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await qaDAL.bootstrap(); // Fill in test data if needed.Start the API
    app.listen(port, () => console.log(`${appName} API running on port ${port}!`));
  })
  .catch(error => console.error(error));
