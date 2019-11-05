/**** External libraries ****/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

/**** Configuration ****/
const appName = "MERN Heroku Example";
const port = (process.env.PORT || 8080);
const app = express();
const buildPath = path.join(__dirname, '..', 'client', 'build');

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all http requests to the console
app.use(express.static(buildPath)); // Serve React from build directory

app.use((req, res, next) => {
    // Additional headers for the response to avoid trigger CORS security errors in the browser
    // Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // Intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      // Always respond with 200
      console.log("Allowing OPTIONS");
      res.send(200);
    } else {
      next();
    }
});

/**** Routes ****/
app.get('/api/hello', (req, res) => res.json({msg: "Hello from the API"}));

/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));