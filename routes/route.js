const authentication = require("../controller/authentication");
const profileController = require("../controller/profile");
const dashBoardCollectionController = require("../controller/dashboard");

// ===================================validator========================
const authenticationValidator = require("../validator/authentication.validator");
const dashboardValidator = require("../validator/dashboard.validation");
const profileValidator = require("../validator/profile.validator");
// const Package = require("../models/package.model");
//===================================Authentication========================
const checkAuthorizationKey = require("../config/jwt.config");

// ================================upload========================
// const  { upload  }= require("../helper/upload")
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const { upload } = require("../helper/upload")

module.exports = function (app) {
  //  ========================Authentication======================
  app.get(
    "/community/contact-messages",
    dashBoardCollectionController.getContactMessages
  );
  app
    .route("/community/login")
    .post(authenticationValidator.loginValidator, authentication.login);

  app
    .route("/community/signup")
    .post(authenticationValidator.signUpValidator, authentication.signUp);

  app.route("/community/loginGoogle").post(authentication.loginFromGoogle);
  app.route("/community/loginFacebook").post(authentication.loginFromLinkedin);

  // ============================profile ===========================

  app.route("/community/updateProfile").post(
    checkAuthorizationKey.checkToken,
    // profileValidator.updateProfile,
    profileController.updateProfile
  );

  app
    .route("/community/getProfile")
    .get(checkAuthorizationKey.checkToken, profileController.getProfile);
  app.route("/community/searchProfile").post(
    checkAuthorizationKey.checkToken,
    // profileValidator.searchProfile,
    profileController.serachProfile
  );
  app.route("/community/searchProfile").post(
    checkAuthorizationKey.checkToken,
    // profileValidator.searchProfile,
    profileController.serachProfile
  );

  //callbackurl
  app.route("/auth/google/callback").post(authentication.googleCallBack);
  app.route("/auth/linkedin/callback").post(authentication.linkedinCallBack);

  // otp verfification

  app
    .route("/community/send/otp")
    .post(authenticationValidator.sendOtp, authentication.sendOtp);
  app
    .route("/community/verify/otp")
    .post(authenticationValidator.verifyOtp, authentication.verifyOtp);

  //Vendor Package routes
  app.post("/createpackage", async (req, res) => {
    try {
      const { prize, specialPrize, user } = req.body;
      const newPackage = new Package({ prize, specialPrize, user });
      const savedPackage = await newPackage.save();
      res.status(201).json(savedPackage);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Could not create package", details: error.message });
    }
  });

  // READ all packages
  app.get("/packages", async (req, res) => {
    try {
      const packages = await Package.find();
      console.log(packages, "sfbshfbfh");
      res.json(packages);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Could not retrieve packages", details: error.message });
    }
  });

  app.get("/package/:id", async (req, res) => {
    try {
      const package = await Package.findById(req.params.id);
      console.log(package, "sfbshfbfh");
      if (!package) {
        res.status(404).json({ error: "Package not found" });
      } else {
        res.json(package);
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Could not retrieve package", details: error.message });
    }
  });

  // Fetch packages based on user
  app.get("/packages/:user", async (req, res) => {
    try {
      const { user } = req.params;
      // Use the "user" parameter to filter packages
      const packages = await Package.find({ user });

      if (packages.length === 0) {
        return res
          .status(404)
          .json({ error: "No packages found for this user" });
      }

      res.json(packages);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Could not retrieve packages", details: error.message });
    }
  });

  // READ a single package by ID

  // UPDATE a package by ID
  app.put("/updatepackage/:id", async (req, res) => {
    try {
      const { prize, specialPrize } = req.body;
      const updatedPackage = await Package.findByIdAndUpdate(
        req.params.id,
        { prize, specialPrize },
        { new: true }
      );
      if (!updatedPackage) {
        res.status(404).json({ error: "Package not found" });
      } else {
        res.json(updatedPackage);
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Could not update package", details: error.message });
    }
  });

  // DELETE a package by ID
  app.delete("/deletepackage/:id", async (req, res) => {
    try {
      const deletedPackage = await Package.findByIdAndRemove(req.params.id);
      if (!deletedPackage) {
        res.status(404).json({ error: "Package not found" });
      } else {
        res.json({ message: "Package deleted successfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Could not delete package", details: error.message });
    }
  });

  // susbcriber chanel
  app
    .route("/community/susbcribe")
    .post(
      dashboardValidator.susbcribe,
      dashBoardCollectionController.susbcribe
    );

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
    .route("/community/:userType")
    .get(checkAuthorizationKey.checkToken, profileController.serachProfile);
  app
    .route("/community/deleteUsers/:emailId")
    .delete(checkAuthorizationKey.checkToken, profileController.deleteUser);
  // app.route("/community/uploadImage").post(
  //     upload.single("resume"),profileController.uploadImage
  // );

  app.route("/community/contact-us").post(
    // checkAuthorizationKey.checkToken,
    dashboardValidator.contactUs,
    dashBoardCollectionController.contactUs
  );
};
