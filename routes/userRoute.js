const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUserById);
router.delete("/users/:id", UserController.deleteUserById);

module.exports = router;
