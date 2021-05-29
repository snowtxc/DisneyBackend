const jwt = require("jsonwebtoken");
const UserModel = require("../models/Usuarios");
const handleFatalError = require("../functions/handleFatalError");

var UserController ={
    signUp:  function(request,response){
        const body = request.body;
        console.log(body);

        UserModel.create({email: body.email,password: body.password,username: body.username}).then((user) =>{
            const iduser = user.dataValues.id;
            const token = jwt.sign(iduser,"user_key");

            response.status(200).send({
                msg: "Usuario registrado correctamente",
                token: token
            })

        }).catch((error) =>{
            handleFatalError(error);
            console.log("Ha ocurrido un error!");
            response.status(500).send("Something broken!");
            
        })
    },


    signIn: function(request,response){
        const body = request.body;
        UserModel.prototype.validateUser(body.email,body.password,(err,authenticated,user) =>{

            if(err){ response.status(500).send("Something broken!"); }
              
            else if(!authenticated){ response.status(403).send("Invalid validation")}

            else if(authenticated) {
                 const token = jwt.sign(user.dataValues.id,"user_key");
                 response.status(200).send({
                         msg: "Succes Authenticate",
                         token: token

                 })
            }
        });


    }



}  

module.exports = UserController;   