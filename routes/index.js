const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const proyectosControllers = require('../controllers/proyectosControllers');

module.exports = function(){

    router.get('/', proyectosControllers.proyectosHome);
    router.get('/nuevo-proyecto', proyectosControllers.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosControllers.nuevoProyecto
    );
    router.get('/proyectos/:url', proyectosControllers.proyectosPorUrl);
    router.get('/proyectos/editar/:id', proyectosControllers.formularioEditar);
    return router;
}