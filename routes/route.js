const authentication = require("../controller/authentication");
const profileController = require("../controller/profile");
const authenticationValidator = require("../validator/authentication.validator");
const checkAuthorizationKey = require("../config/jwt.config");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

module.exports = function (app) {
  app
    .route("/community/login")
    .post(authenticationValidator.loginValidator, authentication.login);
  app
    .route("/community/signup")
    .post(authenticationValidator.signUpValidator, authentication.signUp);
  app
    .route("/uploadImage")
    .post(upload.single("file"), profileController.uploadImage);

  app
    .route("/community/getUsers/_Id")
    .get(checkAuthorizationKey.checkToken, profileController.getUsers);
  app
    .route("/community/getUsers")
    .get(checkAuthorizationKey.checkToken, profileController.getUsers);

  app
    .route("/community/deleteUsers/:emailId")
    .delete(checkAuthorizationKey.checkToken, profileController.deleteUser);


};
