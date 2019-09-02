const express = require('express');
const knex = require('knex');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res, next) => {
    res.render('index', {
        titulo: 'Poesie-se'
    });
});

app.listen(8080);