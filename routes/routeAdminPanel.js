// ======================Controller========================
const adminPanelController = require("../controller/adminPanel");

// =============AuthorizationKey=====================
const checkAuthorizationKey = require("../config/jwt.config");

// ===================validator=====================
const adminPanelValidator = require("../validator/adminPanel.validator");

module.exports = function (app) {
  // ==============================blogs=========================
  app.route("/admin/community/getBlogs").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getBlogs
  );

  app
    .route("/admin/community/addBlogs")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addBlogs,
      adminPanelController.addBlogs
    );
  app
    .route("/admin/community/updateBlogs")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateBlogs,
      adminPanelController.updateBlogs
    );
  app
    .route("/admin/community/removeBlogs")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteBlogs,
      adminPanelController.removeBlogs
    );
  // ================================TeachersData====================
  app.route("/admin/community/getTeachers").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getTeachersData
  );

  app
    .route("/admin/community/addTeachers")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addTeachersData,
      adminPanelController.addTeachersData
    );
  app
    .route("/admin/community/updateTeachers")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateTeacherData,
      adminPanelController.updateTeachersData
    );
  app
    .route("/admin/community/removeTeachers")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteTeacherData,
      adminPanelController.deleteTeachersData
    );

  // ================================Featured Lists Data====================
  app.route("/admin/community/getFeaturedLists").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getFeaturedListingsData
  );

  app
    .route("/admin/community/addFeaturedLists")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addFeaturedListingsData,
      adminPanelController.addFeaturedListingsData
    );
  app
    .route("/admin/community/updateFeaturedLists")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateFeaturedListingData,
      adminPanelController.updateFeaturedListingsData
    );
  app
    .route("/admin/community/removeFeaturedLists")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteFeaturedListingData,
      adminPanelController.deleteFeaturedListingsData
    );

  // ================================Testimonials====================
  app.route("/admin/community/getTestimonials").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getTestimonialsData
  );

  app
    .route("/admin/community/addTestimonials")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addTestimonialsData,
      adminPanelController.addTestimonialsData
    );
  app
    .route("/admin/community/updateTestimonials")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateTestimonialData,
      adminPanelController.updateTestimonialsData
    );
  app
    .route("/admin/community/removeTestimonials")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteTestimonialData,
      adminPanelController.deleteTestimonialsData
    );

  // ================================Awards And Recognitions Data====================
  app.route("/admin/community/getAwardsAndRecognitions").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getAwardsAndRecognitionsData
  );

  app
    .route("/admin/community/addAwardsAndRecognitions")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addAwardsAndRecognitionsData,
      adminPanelController.addAwardsAndRecognitionsData
    );
  app
    .route("/admin/community/updateAwardsAndRecognitions")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateAwardsAndRecognitionData,
      adminPanelController.updateAwardsAndRecognitionsData
    );
  app
    .route("/admin/community/removeAwardsAndRecognitions")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteAwardsAndRecognitionData,
      adminPanelController.deleteAwardsAndRecognitionsData
    );

  // ================================About chancellors Data====================
  app.route("/admin/community/getAboutChancellors").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getAboutChancellorsData
  );

  app
    .route("/admin/community/addAboutChancellors")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addAboutChancellorsData,
      adminPanelController.addAboutChancellorsData
    );
  app
    .route("/admin/community/updateAboutChancellors")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateAboutChancellorData,
      adminPanelController.updateAboutChancellorsData
    );
  app
    .route("/admin/community/removeAboutChancellors")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteAboutChancellorData,
      adminPanelController.deleteAboutChancellorsData
    );

  // ================================Events====================

  app.route("/admin/community/getEvents").get(
    // checkAuthorizationKey.checkToken,
    adminPanelController.getEvents
  );

  app
    .route("/admin/community/addEvents")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.addEvents,
      adminPanelController.addEvents
    );
  app
    .route("/admin/community/updateEvents")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.updateEvents,
      adminPanelController.updateEvents
    );
  app
    .route("/admin/community/removeEvents")
    .post(
      checkAuthorizationKey.checkToken,
      adminPanelValidator.deleteEvents,
      adminPanelController.deleteEvents
    );
};

