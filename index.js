const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.static(__dirname + '/public'));

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'database'
    }
});

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res, next) => {
    res.render('index', {
        titulo: 'Poesie-se'
    });
});

app.listen(8080);