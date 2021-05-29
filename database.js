const {Sequelize} = require("sequelize");
const configDB = require("./config");



 
const conexion = new Sequelize(configDB.database,configDB.user,configDB.password,{
    host: configDB.host,
    dialect: 'mysql'
})


conexion.authenticate();
console.log("conexion a la base de datos!");




module.exports = conexion;