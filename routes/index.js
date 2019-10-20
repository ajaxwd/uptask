const express = require('express');
const router = express.Router();

const { body } = require('express-validator');

const proyectosControllers = require('../controllers/proyectosControllers');
const tareasControllers = require('../controllers/tareasControllers');
const usuariosControllers = require('../controllers/usuariosControllers');

module.exports = function(){

    router.get('/', proyectosControllers.proyectosHome);
    router.get('/nuevo-proyecto', proyectosControllers.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosControllers.nuevoProyecto
    );
    router.get('/proyectos/:url', proyectosControllers.proyectosPorUrl);
    router.get('/proyectos/editar/:id', proyectosControllers.formularioEditar);
    router.post('/nuevo-proyecto/:id', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectosControllers.actualizarProyecto
    );
    router.delete('/proyectos/:url', proyectosControllers.eliminarProyecto);

    //Tareas
    router.post('/proyectos/:url', tareasControllers.agregarTareas);

    //Actualizar Tarea
    router.patch('/tareas/:id', tareasControllers.cambiarEstadoTarea);

    //Eliminar Tarea
    router.delete('/tareas/:id', tareasControllers.eliminarTarea);

    //Crar usuario
    router.get('/crear-cuenta', usuariosControllers.formCrearCuenta);
    router.post('/crear-cuenta', usuariosControllers.crearCuenta);

    return router;
}