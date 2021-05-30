const router = require("express").Router();
const MoviesController = require("../controllers/MoviesControlles");

//Middlewares
const verifyToken = require("../middlewares/verifyToken");

router.get("/movies",MoviesController.getAll);
router.post("/movies",MoviesController.create);
router.put("/movies/:id",MoviesController.edit);
router.delete("/movies/:id",MoviesController.delete);
router.get("/movies/:id/detail",MoviesController.getMovieDetail);
router.get("/movies/:title/title",MoviesController.getByTitle);
router.get("/movies/:idGenero/genero",MoviesController.getByGenero);
router.get("/movies/:order", MoviesController.getAllOrder);


module.exports = router; 