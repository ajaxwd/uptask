const express = require('express');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require("express-validator");
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
//extraer variables .env
require('dotenv').config({ path: 'variables.env'});

const helpers = require('./helpers');

const db = require('./config/db');

//Importar modelos
require('./model/Proyectos');
require('./model/Tareas');
require('./model/Usuarios');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(error => console.log(error));

const app = express();

app.use(express.static('public'));

app.set('view engine', 'pug');

// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Agregamos express validator a toda la aplicación
// app.use(expressValidator());

app.set('views', path.join(__dirname, './views'));

//agregar flash
app.use(flash());

app.use(cookieParser());

// sesiones que utentican a los usuarios en distintas paginas
app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
})

app.use('/', routes());

//servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando');
});