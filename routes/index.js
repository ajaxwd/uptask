const express = require('express');
const router = express.Router();
const proyectosControllers = require('../controllers/proyectosControllers');

module.exports = function(){

    router.get('/', proyectosControllers.proyectosHome);
    router.get('/nuevo-proyecto', proyectosControllers.formularioProyecto);
    router.post('/nuevo-proyecto', proyectosControllers.nuevoProyecto);
    return router;
}