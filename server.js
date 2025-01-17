const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

// returns an express server application under app
const app = express(); 

// log using development version & will log request headers
app.use(morgan('dev')); 
// when the server receives requests with JSON, this will parse it
app.use(express.json());

// catch-all for all http verbs
app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // pass control of routing to next relevant routing method
});

// campsites data endpoint
app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403; 
    res.end('PUT operation not supported on /campsites');
});

// restrict access to this later
app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

app.get('/campsites/:campsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.campsiteId} to you`);
});

app.post('/campsites/:campsiteId', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

// serves files from the public folder
// automatically serves index.html if you just request the host name
// __dirname is a special variable in Node - refers to the absolute path of current directory of the file it is in
app.use(express.static(__dirname + '/public')); 

// return a status 200 with the html code below for any request
app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

// create a server and listen to it
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});