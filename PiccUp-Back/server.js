const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const fetch = require('node-fetch');
const _ = require('lodash');
const mongoose = require('mongoose');

// Express
const app = express();
// Server
const server = http.createServer(app);
// Create socket with server
var io = (module.exports.io = require('socket.io')(server));

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb://localhost/abc',
    err => {
        if (err) throw err;
        console.log('Successfully connected');
    }
);

const login = require('./routes/login');
const signup = require('./routes/signup');
const yelp = require('./routes/yelp');
const SocketManager = require('./SocketManager');

// our localhost port
const port = 4001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Socket Events
io.on('connection', SocketManager);

// Routes
app.get('/', (req, res) => {
    res.send('app is running');
});
app.post('/login', (req, res) => {
    login.handleLogin(req, res);
});
app.post('/tokenlogin', (req, res) => {
    login.handleTokenLogin(req, res);
});
app.post('/signup', (req, res) => {
    signup.handleSignup(req, res);
});
app.post('/yelpbusinesssearch', (req, res) => {
    yelp.handleApiCall(req, res, fetch);
});

server.listen(process.env.PORT || port, () =>
    console.log(`Listening on port ${port}`)
);
