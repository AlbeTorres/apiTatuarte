const Estudio = require('../models/Estudio');
const {validationResult} = require('express-validator');

//Crea un estudio
exports.crearEstudio= async(req,res)=>{

    

    //Revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
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

//Obtiene todos los estudios
exports.obtenerEstudios= async(req,res)=>{
    try {
        const estudios= await Estudio.find();
        res.json({estudios});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'hubo un error'});
        
    }

}


//actualiza un estudio
exports.actualizarEstudio= async (req,res)=>{

    //Revisar si hay errores
    const errores = validationResult(req);
    
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    try {

        //comprobar que existe el estudio
        let estudiofind = await Estudio.findById(req.params.id);

        console.log(estudiofind)

        if(!estudiofind){
            return res.status(404).json({msg:"Estudio no found"});

        }

        //comprobar que el estudio pertenezca al user logueado
        if(estudiofind.usuario != req.usuario.id){
            return res.status(401).json({msg:'No tiene permisos para actualizar este estudio'});
        }


        //actualizar el estudio
        await Estudio.updateOne({_id:req.params.id},{$set:req.body});

        res.json({msg:"Estudio actualizado correctamente"})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'hubo un error'});
        
    }
}