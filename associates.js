//Modals
const UserModel = require("./models/Usuarios");
const Personaje = require("./models/Personaje"); 
const Genero = require("./models/Genero");
const Cinematografia = require("./models/Cinematografia");
const conexion = require("./database");


const {DataTypes} = require("sequelize");



//Relacion muchos a muchos entre personajes y cinematografia
const PersonajeCinematografia = conexion.define('Personaje_Cinematografia', {
    ///Relacion N a M entre Personaje y Cinematografia
}); 


Personaje.belongsToMany(Cinematografia,{
    through: 'Personaje_Cinematografia'
})

Cinematografia.belongsToMany(Personaje,{
    through: 'Personaje_Cinematografia',
    
}) 
   
    
//Relacion de 1 a muchos entre genero y pelicula.

Genero.hasMany(Cinematografia, { as: 'Genero', foreignKey: 'generoID'});
Cinematografia.belongsTo(Genero);
 

console.log("Asociaciones efectuadas!");  