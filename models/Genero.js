const { DataTypes } = require("sequelize");
const conexion = require("../database");

const Genero = conexion.define("Genero",{
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    imagen:{
        type: DataTypes.STRING,
        allowNull: false
    },
})


Genero.sync();
module.exports = Genero;