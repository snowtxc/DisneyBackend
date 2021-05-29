const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");

const app = new express();



//Archivos de rutas

const user_routes  = require("./routes/user_routes");
const characters_routes = require("./routes/characters_routes");
const movies_routes = require("./routes/movies_routes");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());


//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Rutas
app.use("/api", user_routes);
app.use("/api", characters_routes);
app.use("/api", movies_routes);


//Exportacion.


module.exports = app;