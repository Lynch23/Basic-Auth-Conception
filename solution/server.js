const express = require('express')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const User = require('./models/User');
const flash = require('connect-flash');
const session = require('express-session');

// Creates a database "myapp" and connects mongoose to our database
mongoose.connect('mongodb://127.0.0.1:27017/webSecurity', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Authentication function
const requireLogin = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));
db.once('open', () => {
    console.log('Database connected');
});


// Url parser expressJS & session password setup
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'password', saveUninitialized: true, resave: true }));

// Middleware for flashing messages
app.use(flash());
app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
});
app.use((req, res, next) => {
    res.locals.errors = req.flash('errors');
    next();
});

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
app.get('/secret', requireLogin, async (req, res) => {
    res.render('secret');
});


app.post('/register', async (req, res) => {
    const { username, password } = req.body.user;
    const user = new User({ username, password });
    await user.save();
    req.session.userId = user._id;
    res.redirect('/secret');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body.user;
    const foundUser = await User.findAndAuthenticate(username, password);
    if (foundUser) {
        req.session.userId = foundUser._id;
        req.flash('success', 'You have successfully logged in');
        res.redirect('/secret');
    }
    else {
        req.flash('errors', 'Wrong password or username, try again');
        res.redirect('/login');
    }
});

app.post('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect('/');
});





app.listen('3000', () => {
    console.log('Hosting on port 3000');
});