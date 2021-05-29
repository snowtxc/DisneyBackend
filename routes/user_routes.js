const router  = require("express").Router();
const UserController = require("../controllers/UserController");


router.post("/auth/login",UserController.signIn);
router.post("/auth/register",UserController.signUp);

module.exports = router;   
