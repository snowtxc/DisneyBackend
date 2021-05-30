
const { DataTypes } = require("sequelize");
const conexion = require("../database");


const Character = conexion.define('Character',{
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
Character.sync();
module.exports = Character;