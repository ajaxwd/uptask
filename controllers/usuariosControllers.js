Const Usuarios = require('../model/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta en Uptask'
    })
}

exports.crearCuenta = (req, res) => {

    //Leer datos
    const {id, password} = req.body;

    //crear usuario
    Usuarios.created({
        email,
        password
    })
    .theb(() => {
        res.redirect('/iniciar-sesion')
    })
}