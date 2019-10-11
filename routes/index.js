const express = require('express');
const router = express.Router();
const proyectosControllers = require('../controllers/proyectosControllers');

module.exports = function(){

    router.get('/', proyectosControllers.proyectosHome);
    router.get('/nosotros', (req, res) => {
        res.render('nosotros');
    });
    return router;
}