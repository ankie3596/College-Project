const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const pg = require('pg');
const pgp = require('pg-promise');
const db = require('./config/database');

const app = express();
const port = 3000; //Port Number
const users = require('./routes/users');
const contact = require('./routes/abhishek');
app.use(cors()); //Cors Middleware

app.use(express.static(path.join(__dirname, 'public'))); //Set Static Folder
app.use(bodyParser.json()); //Body Parser Middleware
app.use(passport.initialize()); //Passport Middleware
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);
app.use('/abc', contact);

//Index route
app.get('/', (req, res) => {
    res.send('INVALID ENDPOINT');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port, () => {
    console.log('Server started on port', +port);
});