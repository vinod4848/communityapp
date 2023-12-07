// ======================Controller========================
const adminPanelController = require("../controller/adminPanel");

// =============AuthorizationKey=====================
const checkAuthorizationKey = require("../config/jwt.config");

// ===================validator=====================
const adminPanelValidator = require("../validator/adminPanel.validator");

module.exports = function (app) {
  // ==============================blogs=========================
  app.route("/admin/eduwizer/getBlogs").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getBlogs
  );

  app
    .route("/admin/eduwizer/addBlogs")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addBlogs,
      adminPanelController.addBlogs
    );
  app
    .route("/admin/eduwizer/updateBlogs")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateBlogs,
      adminPanelController.updateBlogs
    );
  app
    .route("/admin/eduwizer/removeBlogs")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteBlogs,
      adminPanelController.removeBlogs
    );
  // ================================TeachersData====================
  app.route("/admin/eduwizer/getTeachers").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getTeachersData
  );

  app
    .route("/admin/eduwizer/addTeachers")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addTeachersData,
      adminPanelController.addTeachersData
    );
  app
    .route("/admin/eduwizer/updateTeachers")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateTeacherData,
      adminPanelController.updateTeachersData
    );
  app
    .route("/admin/eduwizer/removeTeachers")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteTeacherData,
      adminPanelController.deleteTeachersData
    );

  // ================================Featured Lists Data====================
  app.route("/admin/eduwizer/getFeaturedLists").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getFeaturedListingsData
  );

  app
    .route("/admin/eduwizer/addFeaturedLists")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addFeaturedListingsData,
      adminPanelController.addFeaturedListingsData
    );
  app
    .route("/admin/eduwizer/updateFeaturedLists")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateFeaturedListingData,
      adminPanelController.updateFeaturedListingsData
    );
  app
    .route("/admin/eduwizer/removeFeaturedLists")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteFeaturedListingData,
      adminPanelController.deleteFeaturedListingsData
    );

  // ================================Testimonials====================
  app.route("/admin/eduwizer/getTestimonials").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getTestimonialsData
  );

  app
    .route("/admin/eduwizer/addTestimonials")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addTestimonialsData,
      adminPanelController.addTestimonialsData
    );
  app
    .route("/admin/eduwizer/updateTestimonials")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateTestimonialData,
      adminPanelController.updateTestimonialsData
    );
  app
    .route("/admin/eduwizer/removeTestimonials")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteTestimonialData,
      adminPanelController.deleteTestimonialsData
    );

  // ================================Awards And Recognitions Data====================
  app.route("/admin/eduwizer/getAwardsAndRecognitions").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getAwardsAndRecognitionsData
  );

  app
    .route("/admin/eduwizer/addAwardsAndRecognitions")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addAwardsAndRecognitionsData,
      adminPanelController.addAwardsAndRecognitionsData
    );
  app
    .route("/admin/eduwizer/updateAwardsAndRecognitions")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateAwardsAndRecognitionData,
      adminPanelController.updateAwardsAndRecognitionsData
    );
  app
    .route("/admin/eduwizer/removeAwardsAndRecognitions")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteAwardsAndRecognitionData,
      adminPanelController.deleteAwardsAndRecognitionsData
    );

  // ================================About chancellors Data====================
  app.route("/admin/eduwizer/getAboutChancellors").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getAboutChancellorsData
  );

  app
    .route("/admin/eduwizer/addAboutChancellors")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addAboutChancellorsData,
      adminPanelController.addAboutChancellorsData
    );
  app
    .route("/admin/eduwizer/updateAboutChancellors")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateAboutChancellorData,
      adminPanelController.updateAboutChancellorsData
    );
  app
    .route("/admin/eduwizer/removeAboutChancellors")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteAboutChancellorData,
      adminPanelController.deleteAboutChancellorsData
    );

  // ================================Events====================

  app.route("/admin/eduwizer/getEvents").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getEvents
  );

  app
    .route("/admin/eduwizer/addEvents")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addEvents,
      adminPanelController.addEvents
    );
  app
    .route("/admin/eduwizer/updateEvents")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateEvents,
      adminPanelController.updateEvents
    );
  app
    .route("/admin/eduwizer/removeEvents")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteEvents,
      adminPanelController.deleteEvents
    );
};

