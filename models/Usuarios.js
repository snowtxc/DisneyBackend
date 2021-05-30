const { DataTypes, where } = require("sequelize");
const conexion = require("../database");

const bcrypt = require("bcrypt");
const handleFatalError = require("../functions/handleFatalError");
const e = require("express");
const saltRound = 10;

function generateHash(value){
    const hash = bcrypt.hashSync(value, saltRound);
    return hash;


}

const User = conexion.define("User",{
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { 
            isEmail: true,
        }
    },    
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        set(value){
            try{
               const hash = generateHash(value);
               this.setDataValue("password",hash);  
            }catch(err){
                console.log(err);
            }
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    timestamps: false
})


User.prototype.validateUser = function (email,password,callback) {
    let authenticated;
    Usuario.findOne({where: {email:email}}).then(async (result) =>{
        if(result){
            await bcrypt.compare(password, result.dataValues.password, (err, coinciden) => {
                authenticated = coinciden;
                callback(err, authenticated,result);
            })
        }else{
            callback(null,authenticated);
        }
        
        
    }).catch((err) =>{
         handleFatalError(err);
         callback(err,null);
    })
    //Usuario.find One({email: email, password: password});
    
    
}



User.sync();
module.exports = User;