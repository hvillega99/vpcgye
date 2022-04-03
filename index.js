require('dotenv').config();
const path = require('path');
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')

const Connection = require('./src/models/connection');
require('./src/passport/localAuth');

const app = express();
new Connection();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(express.static(path.join(__dirname, '/src/public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./src/routes/index.routes'));

app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando en puerto ${process.env.PORT}`);
})
