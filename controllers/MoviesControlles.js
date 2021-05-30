//router.get("/movies", MoviesController.getAll); V
//router.post("/movies", MoviesController.create); V
//router.put("/movies/:id", MoviesController.edit); V
//router.delete("/movies/:id", MoviesController.delete); V
//router.get("/movies/:id/detail", MoviesController.getMovieDetail); V
//router.get("/movies/:title/detail",MoviesController.getByTitle); V
//router.get("/movies/:idGenero/:genero", MoviesController.getGenero); V
//router.get("/movies/:order", MoviesController.getAllOrder); V

//Functions
const checkIfIsImage = require("../functions/checkIfIsImage");
const handleFatalError = require("../functions/handleFatalError");

//Models
const MovieModel = require("../models/Cinematografia");
const CharacterModel = require("../models/Personaje");
const UserController = require("./UserController");

var MoviesController = {
    getAll: async function(request,response){
        MovieModel.findAll({attributes: ['image','title','createdAt']}).then((result) =>{
            if(result.length === 0){
                response.status(204).send("No movie found");
            }
            response.status(200).send(result);
        }).catch((error) =>{
            handleFatalError(error);
            response.status(500).send("Something broken!");
        })

    },

    create: async function (request, response) {
        const body = request.body;
        const file = request.files.image;
        const fileName = file.name;
        const extension = file.name.split(".")[1];
    
        if(checkIfIsImage(extension)){
            const newFileName = Math.floor(Date.now() / 1000).toString() +"."+extension;
            await file.mv("public/movieImages/"+newFileName);
            MovieModel.create({title: body.title, qualification: body.qualification, image: newFileName, generoID: body.generoID}).then((result) =>{
                response.status(200).send("Movie created succesfully!");
            }).catch((error) =>{
                handleFatalError(error);
                response.status(500).send("Something broken!");
            })
        }else{
            response.status(409).send("Invalid file,only allow image files");

        }
    },
    edit: async function (request, response) {
        const body = request.body;
        const idMovie = request.params.id;
    
        const file = request.files.image;
        const fileName = file.name;
        const extension = file.name.split(".")[1];
        if (checkIfIsImage(extension)) {
            const newFileName = Math.floor(Date.now() / 1000).toString() + "." + extension;
            await file.mv("public/movieImages/" + newFileName);
            MovieModel.update({ title: body.title, qualification: body.qualification, image: newFileName, generoID: body.generoID },{where: {id: idMovie}}).then((result) => {
                    if(result[0] === 0){
                        response.status(400).send("The movie you are trying to edit does not exist");
                    }
                    response.status(200).send("Movie edited succesfully");
            }).catch((error) => {
                handleFatalError(error);
                response.status(500).send("Something broken!");
            })
        } else {
            response.status(409).send("Invalid file,only allow image files");
        }
    },

    delete: function (request, response) {
        const idMovie = request.params.id;
        MovieModel.destroy({where:{id:idMovie}}).then(result =>{
            if(result === 0){
                response.status(400).send("The movie you are trying to deleted does not exist"); 
            }
            response.status(200).send("Movie deleted succesfully");
        }).catch((err) =>{
            handleFatalError(error);
            response.status(500).send("Something broken!");
        })

    },
    getMovieDetail: function (request, response) {
        const idMovie = request.params.id;

        MovieModel.findByPk(idMovie,{include: {
            model: CharacterModel
        }}).then((result) =>{
            if(result === null){
                response.status(400).send("The movie does not exist");
            }
            response.status(200).send(result); 
            
        }).catch((error) =>{
            handleFatalError(error);
            response.status(500).send("Something broken!");
        })

    },
    getByTitle: function(request,response){
        const title = request.params.title;
        MovieModel.findAll({where:{title: title}}).then((result) =>{
            if(result.length === 0){
                response.status(204).send("No movie with that title was found");
            }
            response.status(200).send(result);

        }).catch((error) =>{
            handleFatalError(error);
            response.status(500).send("Something broken!");
        });
    },
    getByGenero: function (request, response) {
        const idGenero = request.params.idGenero;
        MovieModel.findAll({ where: { generoID: idGenero } }).then((result) => {
            if (result.length === 0) {
                response.status(204).send("No movie with that genero was found");
            }
            response.status(200).send(result);

        }).catch((error) => {
            handleFatalError(error);
            response.status(500).send("Something broken!");
        });
    },

    getAllOrder: function (request, response) {
        const order = request.params.order;
        const orderUpper = order.toUpperCase();

    

        MovieModel.findAll({order: [['createdAt',orderUpper]]}).then((result) =>{
            console.log(result);
        }).catch((error) =>{
            handleFatalError(error);
            response.status(500).send("Something broken!");
        })

    }
}


module.exports = MoviesController;