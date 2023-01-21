const express = require('express')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const session = require('express-session');

// Creates a database "myapp" and connects mongoose to our database
mongoose.connect('mongodb://127.0.0.1:27017/webSecurity', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', () => {
    console.log('Database connected');
});


// Url parser expressJS & session password setup
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'password' }));

// Sets the template engine to ejs and sets the default directory for our renders to 'views'
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

// Sets the static assets for our app
app.use(express.static(path.join(__dirname, 'public')));

// App routes
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/secret', async (req, res) => {
    res.render('secret');
});


//Exercise starts here
app.post('/register', async (req, res) => {
    /*Sign Up functionality here */
});

app.post('/login', async (req, res) => {
    /*Log in functionality here. */
});

app.post('/logout', (req, res) => {
    /*Logout functionality here. */
});





app.listen('3000', () => {
    console.log('Hosting on port 3000');
});