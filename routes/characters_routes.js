const router = require("express").Router();
const CharacterController = require("../controllers/CharactersController");

router.get("/characters", CharacterController.getAll);
router.post("/characters", CharacterController.create);
router.delete("/characters/:id", CharacterController.delete);
router.put("/characters/:id", CharacterController.edit);
router.get("/characters/:id/detail", CharacterController.getCharacterDetail);
router.get("/characters/:name/name", CharacterController.getByName);
router.get("/characters/:age/age", CharacterController.getByAge);
router.get("/characters/:movieID/movie", CharacterController.getByMovie);


module.exports = router;

