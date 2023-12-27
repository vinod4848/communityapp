const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const authController = require("../helper/sendmail");
const {
  authmiddleware,
  AproveAdmin,
  isAdmin,
} = require("../middleware/authmiddleware");

// const baseUserPath = "/users";

router.post("/signup", UserController.signUp);
router.post("/login", UserController.login);
router.get('/getUserbyId/:id', UserController.signUp);
router.put('/updateUser/:id', UserController.signUp);
router.delete('/deleteUser/:id', UserController.signUp);
router.get("/getAllUser", UserController.getAllUsers);

// router.route(baseUserPath).get(UserController.getAllUsers);

// router
//   .route(`${baseUserPath}/:id`)
//   .get(UserController.getUserById)
//   .put(UserController.updateUserById)
//   .delete(UserController.deleteUserById);

router.post("/admin-login", UserController.loginAdmin);
router.get("/admin-logout", UserController.logout);

router.post("/forgot-password", authController.forgotPassword);

router.put(
  "/user/approve/:userId",
  authmiddleware,
  AproveAdmin,
  isAdmin,
  UserController.approveuser
);

router.get("/refresh", UserController.handleRefreshToken);

module.exports = router;
