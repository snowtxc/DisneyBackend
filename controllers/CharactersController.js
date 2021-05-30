//router.get("/characters", CharacterController.getAll);    V
//router.post("/characters", CharacterController.create);   V
//router.delete("/characters/:id", CharacterController.delete);  V
//router.put("/characters/:id", CharacterController.edit); V
//router.get("characters/:id/detail", CharacterController.getCharacterDetail); V
//router.get("characters/:name/name", CharacterController.getByName); V
//router.get("characters/:age/age", CharacterController.getByAge); V
//router.get("characters/:movieID/movie", CharacterController.getByMovie); V

//functions
const handleFatalError = require("../functions/handleFatalError");
const checkIfIsImage = require("../functions/checkIfIsImage");

//Models
const CharacterModel = require("../models/Personaje");
const MovieModel = require("../models/Cinematografia");
const e = require("express");
const UserController = require("./UserController");


var CharacterController = {

    getAll: async function(request,response){
        await CharacterModel.findAll({attributes: ['name','urlimage']}).then((result) =>{
            response.status(200).send(result)
        }).catch((error) =>{
            handleFatalError(err);
        })
    },


    create: async function (request, response) {
        const body = request.body;
        const image = request.files.image;
        const fileName = image.name;
        
        const extension = fileName.split(".")[1];
        if(checkIfIsImage(extension)){
            const newFileName = Math.floor(Date.now() / 1000).toString();

            await image.mv("public/charactersImages/"+newFileName+"."+extension);
            CharacterModel.create({name:body.name,urlimage:newFileName,age:body.age,weight:body.weight,historia:body.history}).then((result) =>{
                response.status(200).send("Successfully created character!");
            }).catch((err) =>{
                handleFatalError(err);
                response.status(500).send("Something broken!");
            })
        }else{
            response.status(409).send("Invalid file,only allow image files");
        }
    },
    delete: async function (request, response) {
        const idCharacter = request.params.id;
        CharacterModel.destroy({where: {id:idCharacter}}).then((result) =>{
            if(result == 0){
                response.status(400).send("The character you are trying to edit does not exist");
            }
            response.status(200).send("Character succesfuly deleted!")
        }).catch((error) =>{
            handleFatalError(err);
            response.status(500).send("Somethiing broken!");
        })
    },

    edit: async function (request, response) {
        const body = request.body;
        const idCharacter =  request.params.id;
        const image = request.files.image;
        const fileName = image.name;
        const extension = fileName.split(".")[1];
        if (checkIfIsImage(extension)) {
            const newFileName = Math.floor(Date.now() / 1000).toString();
            await image.mv("public/charactersImages/" + newFileName + "." + extension);

            CharacterModel.update({name:body.name,urlimage:newFileName,age:body.age,weight:body.weight,historia:body.history},
                {where: {id: idCharacter}}).then((result) =>{
                    if(result[0] === 0){ response.status(400).send("The character you are trying to remove does not exist"); }   
                    response.status(200).send("Character succesfuly edited");
                 }).catch((error) =>{
                    handleFatalError(error);
                    response.status(500).send("Something broken!");
                })
        }else{
            response.status(409).send("Invalid file,only allow image files");
        }
    },

    getCharacterDetail: async function (request, response) {
        const idCharacter = request.params.id;
        CharacterModel.findByPk(idCharacter,{include: {model: MovieModel}}).then((result) =>{
            if(result == null){
                 response.status(400).send("The character you are trying to find does not exist"); 
            }
            response.status(200).send(result.dataValues);

        }).catch((error) =>{
            handleFatalError(error);
            response.status(500).send("Something broken!");
        })
    },
    getByName: async function (request, response) {
        const nameCharacter = request.params.name;
        CharacterModel.findAll({where:{name: nameCharacter}}).then((result) =>{
            if(result.length == 0){
                response.status(204).send("The character you are trying to find does not exist");
            }
            response.status(200).send(result);
        }).catch((error) =>{
            handleFatalError(err);
            response.status(500).send("Something broken!");
        })

    },
    getByAge: async function (request, response) {
        const ageCharacter = request.params.age;
        CharacterModel.findAll({ where: { age: ageCharacter } }).then((result) => {
            if (result.length == 0) {
                response.status(204).send("The character you are trying to find through his name does not exist");
            }
            response.status(200).send(result);
        }).catch((error) => {
            handleFatalError(err);
            response.status(500).send("Something broken!");
        })
    },


    getByMovie: async function (request, response) {
        const idMovie = request.params.movieID;
        CharacterModel.findAll({include: {
            model: MovieModel,
            where: {
                id: idMovie
            }
        }}).then((result) =>{
            if(result.length == 0){
                response.status(204).send("There are no characters associated with this movie ");
            }
            response.status(200).send(result);
        }).catch(err =>{
            handleFatalError(err);
            response.status(500).send("Something broken!");
        })
    }
}

module.exports = CharacterController;