const server = require("./server");
const PORT = 3703;

const database = require("./database");


const associate = require("./associates");
const { sequelize } = require("./models/Usuarios");
const { request } = require("express");

server.listen(PORT,function(){
    console.log("servidor iniciado!");
    sequelize.sync();
  
})



