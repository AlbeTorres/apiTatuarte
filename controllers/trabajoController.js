const Trabajo = require('../models/Trabajo');
const Estudio = require('../models/Estudio');
const {validationResult} = require('express-validator');


//Crea un trabajo
exports.crearTrabajo= async(req,res)=>{

    //Revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer estudio y comprobar que existe
    const {estudio} = req.body;

    try {
    
    const estudiob = await Estudio.findById(estudio);

    if(!estudiob){
        return res.status(404).json({msg:'Estudio no encontrado'});
    }

    //Comprobar que el estudio corresponde al usuario logueado

    if(estudiob.usuario != req.usuario.id){
        return res.status(401).json({msg:'No tiene permisos para actualizar este estudio'});
    }

     //crear trabajo
    const trabajo = new Trabajo(req.body);

     //guardar en bd
    await trabajo.save();

      //mensaje de confirmacion
    res.json({trabajo});


    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'hubo un error'});
        
    }

}

//obtiene los trabajos por estudio
exports.obtenerTrabajos= async(req,res)=>{

    //Extraer estudio y comprobar que existe
    const {estudio} = req.body;

    try {

        const estudiob = await Estudio.findById(estudio);

        if(!estudiob){
            return res.status(404).json({msg:'Estudio no encontrado'});
        }

        //encontrar los trabajos de ese estudio
        const trabajos= await Trabajo.find({estudio:estudio});
        res.json({trabajos});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'hubo un error'});
        
    }


}

//actualiza un trabajo
exports.actualizarTrabajo = async(req,res)=>{

    
}