const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post("/SignUp", UserController.SignUp);
router.post("/LogIn", UserController.LogIn);

module.exports = router;
