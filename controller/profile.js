const profileService = require("../services/profile.service");

const AWS = require("aws-sdk");

const mongoose = require("mongoose");

const fs = require("fs");
const sgMail = require("@sendgrid/mail");

const controllers = {
  updateProfile: async function (req, res) {
    let response;
    try {
      req.body.userId = req.payload.userId;

      let data = await profileService.updateProfile(req.body);

      if (data && data.nModified > 0) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Updated User",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While Updating User",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
      if (response.message.includes("E11000 duplicate key error collection")) {
        response.message = "Email Already Exists";
      }
    }
    return res.send(response);
  },

  serachProfile: async function (req, res) {
    let response;
    try {
      let { preference, educationBoard, location, expectedCtc, age, userType } =
        req.body;
      const arrayOfFilters = [];
      if (preference) {
        arrayOfFilters.push({
          preference: { $regex: new RegExp(preference, "i") },
        });
        // arrayOfFilters.push({ preference: { $regex: new RegExp(preference, "i") } });
      }
      if (educationBoard) {
        arrayOfFilters.push({
          educationBoard: { $regex: new RegExp(educationBoard, "i") },
        });
      }
      if (location) {
        arrayOfFilters.push({
          location: { $regex: new RegExp(location, "i") },
        });
      }
      if (expectedCtc) {
        arrayOfFilters.push({
          expectedCtc: { $regex: new RegExp(expectedCtc, "i") },
        });
      }
      if (age) {
        arrayOfFilters.push({ age: { $regex: new RegExp(age, "i") } });
      }
      if (userType) {
        arrayOfFilters.push({
          userType: { $regex: new RegExp(userType, "i") },
        });
      }
      let find = {};
      if (arrayOfFilters && arrayOfFilters.length) {
        find = {
          $and: arrayOfFilters,
        };
      }

      let select = {
        _id: 0,
        password: 0,
      };

      let sort = {
        _id: -1,
      };

      let skip = 0;
      let limit = 100;

      let data = await profileService.serachProfile(
        find,
        select,
        sort,
        skip,
        limit
      );

      if (data && data.length > 0) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Fetched User",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Sucesfully Fetched User",
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

  getProfile: async function (req, res) {
    let response;
    try {
      console.log("req.payload.userId", req.payload.userId);
      let find = {
        _id: req.payload.userId,
      };
      let select = {
        _id: 0,
        password: 0,
      };
      let data = await profileService.getProfile(find, select);

      if (data && data.length > 0) {
        response = {
          success: 1,
          data: data[0] || {},
          message: "Sucessfully Fetched User",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Sucesfully Fetched User",
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

  // this.getProfile

  uploadResume: async function (req, res) {
    const bucketName = process.env.AWS_BUCKET_NAME;

    const region = "AP-SOUTH-1";
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;

    const s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });
    if (req.file == null) {
      return res.status(400).json({ message: "Please choose the file" });
    }

    var file = req.file;

    const uploadImage = async (file) => {
      return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(file.path);

        const params = {
          Bucket: bucketName,
          Key: file.originalname,
          Body: fileStream,
        };

        s3.upload(params, function (err, data) {
          if (err) {
            console.log("err :>> ", err);
            reject(err);
          }
          console.log("data :>> ", data);
          resolve(data.Location);
        });
      });
    };
    const url = await uploadImage(file);

    if (req.body.admin) {
      const response = {
        success: 0,
        data: url,
        message: "Successfully Uploaded",
      };
      return res.send(response);
    }

    if (req.payload && req.payload.userId) {
      await profileService.updateProfile({
        userId: req.payload.userId,
        resumeURL: url,
      });
  
      const apiKey = sgMail.setApiKey(process.env.EMAIL_PROVIDER_AUTH_PASSWORD);
  
      const msg = {
        to: process.env.SUPPORT_EMAIL, // support Email
        from: process.env.EMAIL, // Change to your verified sender
        subject: "Eduwizer New User Signup",
        text: `New user signup`,
        html: `New user has signed up. UserId: ${req.payload.userId}. His resume: ${url}`,
      };
  
      await apiKey.send(msg);
    }

    const response = {
      success: 0,
      data: url,
      message: "Successfully Uploaded",
    };
    return res.send(response);
  },
  uploadResume: async function (req, res) {
    const bucketName = process.env.AWS_BUCKET_NAME;

    const region = "AP-SOUTH-1";
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;

    const s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
    });
    if (req.file == null) {
      return res.status(400).json({ message: "Please choose the file" });
    }

    var file = req.file;

    const uploadImage = async (file) => {
      return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(file.path);

        const params = {
          Bucket: bucketName,
          Key: file.originalname,
          Body: fileStream,
        };

        s3.upload(params, function (err, data) {
          if (err) {
            console.log("err :>> ", err);
            reject(err);
          }
          console.log("data :>> ", data);
          resolve(data.Location);
        });
      });
    };
    const resume = await uploadImage(file);

    if (req.body.admin) {
      const response = {
        success: 0,
        data: resume,
        message: "Successfully Uploaded",
      };
      return res.send(response);
    }

    if (req.payload && req.payload.userId) {
      await profileService.updateProfile({
        userId: req.payload.userId,
        resume: resume,
      });
  
      const apiKey = sgMail.setApiKey(process.env.EMAIL_PROVIDER_AUTH_PASSWORD);
  
      const msg = {
        to: process.env.SUPPORT_EMAIL, // support Email
        from: process.env.EMAIL, // Change to your verified sender
        subject: "Eduwizer New User Signup",
        text: `New user signup`,
        html: `New user has signed up. UserId: ${req.payload.userId}. His resume: ${resume}`,
      };
  
      await apiKey.send(msg);
    }

    const response = {
      success: 0,
      data: resume,
      message: "Successfully Uploaded",
    };
    return res.send(response);
  },

  // uploadResume: async function (req, res) {
  //   res.send( req.file.location + '/index.html')
  // }

  // admin

  getUsers: async function (req, res) {
    let response;
    try {
      let find = {};
      let select = {
        _id: 0,
        // resumeURL: 0,
      };
      let data = await profileService.getProfile(find, select);

      if (data && data.length > 0) {
        response = {
          success: 1,
          data: data || {},
          message: "Sucessfully Fetched Users",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Succesfully Fetched Users",
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

  deleteUser: async function (req, res) {
    let response;
    try {
      const emailId = req.params.emailId;

      const filter = { email: emailId }; // Create the filter object with the appropriate field name (e.g., "_id")
      const deletedUser = await profileService.deleteProfile(filter);
      console.log(deletedUser, "user dedgedbmdfbsejfbf sfsnv de;ldete");
      if (deletedUser) {
        response = {
          success: 1,
          data: deletedUser,
          message: "Successfully deleted user",
        };
      } else {
        response = {
          success: 0,
          data: {},
          message: "User not found or deletion failed",
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

