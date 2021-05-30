const router = require("express").Router();
const CharacterController = require("../controllers/CharactersController");


const verifyToken = require("../middlewares/verifyToken");



router.get("/characters",verifyToken, CharacterController.getAll);
router.post("/characters", verifyToken, CharacterController.create);
router.delete("/characters/:id", verifyToken,CharacterController.delete);
router.put("/characters/:id", verifyToken,CharacterController.edit);
router.get("/characters/:id/detail",verifyToken,CharacterController.getCharacterDetail);
router.get("/characters/:name/name",verifyToken, CharacterController.getByName);
router.get("/characters/:age/age",verifyToken, CharacterController.getByAge);
router.get("/characters/:movieID/movie",verifyToken, CharacterController.getByMovie);


module.exports = router;

