const Usuario = require('../models/User');

exports.crearUsuario= async(req,res)=>{
    try {
        let usuario;

        //crea nuevo user
        usuario = new Usuario(req.body);

        //guardar usuario
        await usuario.save();

        console.log('Usuario creado correctamente');
        res.send('Usuario creado correctamente')
    } catch (error) {
        console.log(error);
        res.status(400).send('hubo un error');
        
    }
}