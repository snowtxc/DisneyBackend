const server = require("./server");
const PORT = 3703;

const database = require("./database");

const associate = require("./associates");
const { sequelize } = require("./models/Usuarios");

server.listen(PORT,function(){
    console.log("servidor iniciado!");
    sequelize.sync();
  
})



