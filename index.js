const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./src/routes/web');
const port = 3000;


const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(routes);
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});