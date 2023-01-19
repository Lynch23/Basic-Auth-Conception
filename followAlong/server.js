const express = require('express')
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
// const bcrypt = require('bcrypt');

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

const hashPassword = async (pw) => {
    return await bcrypt.hash(pw, 12);
};

const login = async (pw, hash) => {
    const result = await bcrypt.compare(pw, hash);
    if (result) {
        console.log('Logged in successfully')
    }
    else {
        console.log('Incorrect password')
    }
}

// login('monkeY', '$2b$11$YDXF76xU67f5VuOoXNrAFuGT.ejinr06FUiAfuMhVRSfVfynd5Jf.')

// hashPassword('monkey');
// Url parser expressJS
app.use(express.urlencoded({ extended: true }));
// Sets the template engine to ejs and sets the default directory for our renders to 'views'
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
// Sets the static assets for our app
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Homepage');
});


app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/secret', (req, res) => {
    res.render('secret');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body.user;
    const hash = await hashPassword(password);
    const user = new User({username, password: hash});
    await user.save();
    res.send(user);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body.user;
    const user = await User.findOne({ username });
    const validPassword = await login(password, user.password);
    // const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword) {
        res.redirect('/secret');
    }
    else {
        res.redirect('/login');
    }
})


















app.listen('3000', () => {
    console.log('Hosting on port 3000');
});