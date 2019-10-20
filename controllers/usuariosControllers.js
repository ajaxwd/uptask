const Usuarios = require('../model/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en Uptask'
    })
}

exports.formIniciarSesion = (req, res) => {
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar sesion en Uptask'
    })
}

exports.crearCuenta = async (req, res) => {

    //Leer datos
    const {email, password} = req.body;

    //crear usuario
    try {
        await Usuarios.create({
            email,
            password
        });
        res.redirect('/iniciar-sesion');
    } catch (error) {
        req.flash('error', error.errors.map(error => error.message));
        res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta en Uptask',
            email,
            password
        })
    }
}