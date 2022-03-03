const Estudio = require('../models/Estudio');
const {validationResult} = require('express-validator');


exports.crearEstudio= async(req,res)=>{

    try {

    //Revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //crear estudio
    const estudio = new Estudio(req.body);

    //guardar usuario dueño del estudio
    estudio.usuario  = req.usuario.id;

    //guardar en bd
    await estudio.save();

     //mensaje de confirmacion
    res.json({estudio});


    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'hubo un error'});
        
    }

}

exports.obtenerEstudios= async(req,res)=>{
    
}