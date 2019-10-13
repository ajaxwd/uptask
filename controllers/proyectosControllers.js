const Proyectos = require('../model/Proyectos');
const slug = require('slug');

exports.proyectosHome = (req, res) => {
    res.render('index', {
        nombrePagina : 'Proyectos' 
    });
}

exports.formularioProyecto = (req, res) => {
    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo Proyecto'
    });
}

exports.nuevoProyecto = async (req, res) => {
    
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agregar un nombre proyecto'})
    }

    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores
        })
    } else {
        
        const proyecto = await Proyectos.create({ nombre });
        res.redirect('/');
    }
}