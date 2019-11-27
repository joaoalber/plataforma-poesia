const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./src/routes/web');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const port = 3000;
const methodOverride = require('method-override')

const app = express();

app.use(methodOverride('_method'))

require('./config/auth')(passport);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "plataformapoesia",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(routes);
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});