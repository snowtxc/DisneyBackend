const { DataTypes } = require("sequelize");
const conexion = require("../database");


const Movie = conexion.define("Movie",{
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },

    qualification: {
        type: DataTypes.INTEGER,
        allowNull: false,                
        validate:{
            is: '^(0|[1-5][1-5]?|5)$',
        }
    },
    image: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },  
    generoID:{
        type: DataTypes.INTEGER,
        allowNull: false 
    }   
})


Movie.sync();
module.exports = Movie;