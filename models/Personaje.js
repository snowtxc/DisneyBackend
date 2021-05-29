
const { DataTypes } = require("sequelize");
const conexion = require("../database");






const Personaje = conexion.define('Personaje',{
    name : {
        type: DataTypes.STRING,
        allowNull: false,

    },
    urlimage: {
        type: DataTypes.STRING,
        allowNull: null
        
    }, 

    age: {
        type: DataTypes.INTEGER,
        allowNull: null
    },

    weight: {
        type: DataTypes.INTEGER,
        allowNull: null
    },

    historia: {
        type: DataTypes.STRING,
        DataTypes
    }
})


//Relationships.
Personaje.sync();
module.exports = Personaje;