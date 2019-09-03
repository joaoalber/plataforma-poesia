const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const routes = require('./src/routes');
const expressLayouts = require('express-ejs-layouts');
const port = 3000;

const app = express();

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'database'
    }
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(expressLayouts);

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});