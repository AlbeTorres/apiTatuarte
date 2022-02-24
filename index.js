const express = require("express");
const conectarDB = require("./config/db");

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//puerto de la app
const PORT = process.env.PORT || 4000;


//Corriendo el server
app.listen(PORT, ()=>{

    console.log(`Server corriendo en el puerto ${PORT}`);
});

