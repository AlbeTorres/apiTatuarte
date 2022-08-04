const mongoose = require('mongoose');

const EstudioSchema= mongoose.Schema({
    nombre:{
        type: String,
        required:true,
        trim:true
    },
    registro:{
        type:Date,
        default:Date.now()
    },
    movil:{
        type:Number,
    },
    ubicacion:{
        type:String,
    },
    img:{
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
    },
    provincia:{
        type:String,
        
    },
    municipio:{
        type:String,

    },

});

module.exports = mongoose.model('Estudio',EstudioSchema);