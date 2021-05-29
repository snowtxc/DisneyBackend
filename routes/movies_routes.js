const router = require("express").Router();
const MoviesController = require("../controllers/MoviesControlles");

router.get("/movies",MoviesController.getAll);
router.post("/movies",MoviesController.create);
router.put("/movies/:id",MoviesController.edit);
router.delete("/movies/:id",MoviesController.delete);
router.get("/movies/:id/detail",MoviesController.getMovieDetail);
router.get("/movies/:id/:idGenero",MoviesController.getGenero);
router.get("/movies/:order", MoviesController.getAllOrder);


module.exports = router; 