const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParse = require('body-parser');
const expressValidator = require('express-validator');

const helpers = require('./helpers');

const db = require('./config/db');

require('./model/Proyectos');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

const app = express();

app.use(expressValidator());

app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(bodyParse.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));

app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
})

app.use('/', routes());

app.listen(3000);