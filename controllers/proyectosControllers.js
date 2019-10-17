const Proyectos = require('../model/Proyectos');
const Tareas = require('../model/Tareas');

exports.proyectosHome = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos 
    });
}

exports.formularioProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        nombrePagina : 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agregar un nombre proyecto'})
    }

    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        
        await Proyectos.create({ nombre });
        res.redirect('/');
    }
}

exports.proyectosPorUrl = async(req, res, next) => {
    const proyectosPromise = await Proyectos.findAll();
    const proyectoPromise = await Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

       // Consultar tareas del Proyecto actual

       const tareas = await Tareas.findAll({
        where: {
            proyectoId : proyecto.id
        },
        // include: [
        //     { model: Proyectos }
        // ]
    });

    if(!proyecto) return next();

    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async (req, res) => {
    const proyectosPromise = Proyectos.findAll();

    const proyectoPromise = Proyectos.findOne({
        where: {
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req, res) => {
    const proyectos = await Proyectos.findAll();
    
    const { nombre } = req.body;

    let errores = [];

    if(!nombre){
        errores.push({'texto': 'Agregar un nombre proyecto'})
    }

    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        await Proyectos.update(
            { nombre: nombre },
            { where: {id: req.params.id}
        });
        res.redirect('/');
    }
}

exports.eliminarProyecto = async (req, res, next) => {
    // req, query o params
    // console.log(req.query);
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: { url : urlProyecto}});

    if(!resultado){
        return next();
    }

    res.status(200).send('Proyecto Eliminado Correctamente');
}