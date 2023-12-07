const adminDashboardService = require("../services/adminPanel.service");

const controllers = {
  addBlogs: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.addBlogs(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully added Blogs",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While adding Blogs",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  getBlogs: async function (req, res) {
    let response;
    try {
      let { blogId } = req.query;

      let data = await adminDashboardService.getBlogs(blogId);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Gets Blogs",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: [],
        message: error.message,
      };
    }
    return res.send(response);
  },
  updateBlogs: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.updateBlogs(req.body);

      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Update Blogs",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  removeBlogs: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.removeBlogs(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Deleted Blogs",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  addTeachersData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.addTeachersData(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully added Teachers Data",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While adding Teachers Data",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  getTeachersData: async function (req, res) {
    let response;
    try {
      let { teacherId } = req.query;
      // console.log("teacherId===", teacherId);
      let data = await adminDashboardService.getTeachersData(teacherId);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Gets Techers",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: [],
        message: error.message,
      };
    }
    return res.send(response);
  },
  updateTeachersData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.updateTeachersData(req.body);

      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Update Techers SucessFully",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  deleteTeachersData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.deleteTeachersData(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Deleted Blogs",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },

  // about chancellors
  addAboutChancellorsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.addAboutChancellorsData(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully added AboutChancellors Data",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While adding AboutChancellors Data",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  getAboutChancellorsData: async function (req, res) {
    let response;
    try {
      let { aboutChancellorId } = req.query;
      // console.log("aboutChancellorId===", aboutChancellorId);
      let data = await adminDashboardService.getAboutChancellorsData(
        aboutChancellorId
      );
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Gets AboutChancellors",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: [],
        message: error.message,
      };
    }
    return res.send(response);
  },
  updateAboutChancellorsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.updateAboutChancellorsData(
        req.body
      );

      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Update AboutChancellors SucessFully",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  deleteAboutChancellorsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.deleteAboutChancellorsData(
        req.body
      );
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Deleted AboutChancellors",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },

  // testimonials
  addTestimonialsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.addTestimonialsData(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully added Testimonials Data",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While adding Testimonials Data",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  getTestimonialsData: async function (req, res) {
    let response;
    try {
      let { testimonialId } = req.query;
      // console.log("testimonialId===", testimonialId);
      let data = await adminDashboardService.getTestimonialsData(testimonialId);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Gets Testimonials",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: [],
        message: error.message,
      };
    }
    return res.send(response);
  },
  updateTestimonialsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.updateTestimonialsData(req.body);

      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Update Testimonials SucessFully",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  deleteTestimonialsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.deleteTestimonialsData(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Deleted Testimonials",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },

  // featured listings

  addFeaturedListingsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.addFeaturedListingsData(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully added Featured Listings Data",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While adding Featured Listings Data",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  getFeaturedListingsData: async function (req, res) {
    let response;
    try {
      let { featuredListId } = req.query;
      // console.log("featuredListId===", featuredListId);
      let data = await adminDashboardService.getFeaturedListingsData(
        featuredListId
      );
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Gets Featured Listings",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: [],
        message: error.message,
      };
    }
    return res.send(response);
  },
  updateFeaturedListingsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.updateFeaturedListingsData(
        req.body
      );

      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Update FeaturedListings SucessFully",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  deleteFeaturedListingsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.deleteFeaturedListingsData(
        req.body
      );
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Deleted FeaturedListings",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },

  // awards and recognitions

  addAwardsAndRecognitionsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.addAwardsAndRecognitionsData(
        req.body
      );
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully added AwardsAndRecognitions Data",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While adding AwardsAndRecognitions Data",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  getAwardsAndRecognitionsData: async function (req, res) {
    let response;
    try {
      let { awardsAndRecognitionId } = req.query;
      // console.log("awardsAndRecognitionId===", awardsAndRecognitionId);
      let data = await adminDashboardService.getAwardsAndRecognitionsData(
        awardsAndRecognitionId
      );
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Gets AwardsAndRecognitions",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: [],
        message: error.message,
      };
    }
    return res.send(response);
  },
  updateAwardsAndRecognitionsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.updateAwardsAndRecognitionsData(
        req.body
      );

      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Update AwardsAndRecognitions SucessFully",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  deleteAwardsAndRecognitionsData: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.deleteAwardsAndRecognitionsData(
        req.body
      );
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Deleted AwardsAndRecognitions",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  addEvents: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.addEvents(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully added Events",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While adding Events",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  getEvents: async function (req, res) {
    let response;
    try {
      let { eventId } = req.query;

      let data = await adminDashboardService.getEvents(eventId);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Gets Events",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: [],
        message: error.message,
      };
    }
    return res.send(response);
  },
  updateEvents: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.updateEvents(req.body);

      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Update Blogs",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
  deleteEvents: async function (req, res) {
    let response;
    try {
      let data = await adminDashboardService.removeEvents(req.body);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Deleted Events",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "!No Records Found",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
    }
    return res.send(response);
  },
};

module.exports = controllers;

