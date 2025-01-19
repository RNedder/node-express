const express = require('express');
const morgan = require('morgan');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

const hostname = 'localhost';
const port = 3000;

// returns an express server application under app
const app = express(); 

// log using development version & will log request headers
app.use(morgan('dev')); 
// when the server receives requests with JSON, this will parse it
app.use(express.json());

// root paths for routers
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

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