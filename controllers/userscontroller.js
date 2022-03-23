const Usuario = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator')
const jwt= require('jsonwebtoken');

exports.crearUsuario= async(req,res)=>{

    //Revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    //extraer mail y password
    const {email, password}= req.body;

    try {
        let usuario= await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }

        //crea nuevo user
        usuario = new Usuario(req.body);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);

        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //crear y firmar el jwt
        const payload= {
            usuario:{id:usuario.id}
        };

        //firmar el token
        jwt.sign(payload,process.env.SECRETA,{expiresIn:3600 //1 hora
        },(error,token)=>{

            if(error)throw error;

            //mensaje de confirmacion
            res.json({token});
        });

        console.log('Usuario creado correctamente');

    } catch (error) {
        console.log(error);
        res.status(400).json({msg:'hubo un error'});
        
    }
}


//Obtiene todos los usuarios
//obtiene un usuario filtrado /usuario?_id=id
exports.obtenerUsuarios= async(req,res)=>{
    //extraer los filtros del req
    const filters = req.query;

    try {
        //comprobar si los filtros están vacíos
        if (filters !={}){
            
            //comprobar que existan usuarios con esos filtros
            const user= await Usuario.find(filters);

            if(!user){
                return res.status(404).json({msg:'No existe ese usuario'});
            }

            //retornar usuarios
            return res.json({user});
        }

        //comprobar que existe el usuario
        const user = await Usuario.find();

        if(!user){
            return res.status(404).json({msg:'No existen usuarios'});
        }

        //retornar los usuarios
        res.json({user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'hubo un error'});
        
    }

}

exports.modificarUsuario= async(req,res)=>{

     //Revisar si hay errores
     const errores = validationResult(req);

     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()});
     }

     try {

        //comprobar que existe el usuario
        const user = await Usuario.findById(req.params.id);

        if(!user){
            return res.status(404).json({msg:'No existe ese usuario'});
        }

        //comprobar que el usuario pertenezca al user logueado
        if(user._id != req.usuario.id){
            return res.status(401).json({msg:'No tiene permisos para actualizar este usuario'});
        }

        //extraer password
        const {password}= req.body;

        //crea nuevo user
       const usuario = req.body;


        //hashear el password
        const salt = await bcryptjs.genSalt(10);

        usuario.password = await bcryptjs.hash(password, salt);

        console.log(usuario)
        //actualizar usuario
        await Usuario.updateOne({_id:req.params.id},{$set:usuario});

        res.json({msg:"Usuario actualizado correctamente"})

         
     } catch (error) {
        console.log(error);
        res.status(400).json({msg:'hubo un error'});
     }

    

}

exports.eliminarUsuario= async(req,res)=>{

    try {

        //comprobar que existe el usuario
        const user = await Usuario.findById(req.params.id);

        if(!user){
            return res.status(404).json({msg:'No existe ese usuario'});
        }

        //comprobar que el usuario pertenezca al user logueado
        if(user._id != req.usuario.id){
            return res.status(401).json({msg:'No tiene permisos para eliminar este usuario'});
        }

        //actualizar usuario
        await Usuario.findOneAndRemove({_id:req.params.id});

        res.json({msg:"Usuario eliminado correctamente"})

         
     } catch (error) {
        console.log(error);
        res.status(400).json({msg:'hubo un error'});
     }


}