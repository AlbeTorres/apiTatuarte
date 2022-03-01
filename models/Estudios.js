const mongoose = require('mongoose');

const EstudioSchema= mongoose.Schema({
    nombre:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
        trim:true,
    },
    registro:{
        type:Date,
        default:Date.now()
    },
    movil:{
        type:Number,
        require: true,
    },
    provincia:{
        type:String,
        
    },
    municipio:{
        type:String,

    },
    ubicacion:{
        type:String,

    },
    logo:{
        type:String,

    },
    instagram:{
        type:String,
    },
    twitter:{
        type:String,
    },
    facebook:{
        type:String,
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
    }

});

module.exports = mongoose.model('Estudio',EstudioSchema);