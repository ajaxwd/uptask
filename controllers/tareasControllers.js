const Proyectos = require('../model/Proyectos');
const Tareas = require('../model/Tareas');

exports.agregarTareas = async (req, res) => {
    
    // obtenemos el Proyecto actual
    const proyecto = await Proyectos.findOne({where: { url: req.params.url }});

    // leer el valor del input
    const {tarea} = req.body;

    // estado 0 = incompleto y ID de Proyecto
    const estado = 0;
    const proyectoId = proyecto.id;

    // Insertar en la base de datos
    const resultado = await Tareas.create({ tarea, estado, proyectoId});

    if(!resultado){
        return next();
    }

    // redireccionar
    res.redirect(`/proyectos/${req.params.url }`);


}

exports.cambiarEstadoTarea = async (req, res, next) => {
    const {id} = req.params;
    const tarea = await Tareas.findOne({where: {id}});

    let estado = 0;
    if(tarea.estado === estado){
        estado = 1;
    }

    tarea.estado = estado;

    const resultado = tarea.save();

    if(!resultado) return next();

    res.status(200).send('Actualizado');
}

exports.eliminarTarea = async (req, res, next) => {

    const {id} = req.params;

    const resultado = await Tareas.destroy({where: {id}});

    if (!resultado) return next();

    res.status(200).send('Eliminando...');
}