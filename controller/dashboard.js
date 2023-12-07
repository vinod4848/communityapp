const dashboardService = require("../services/dashboard.service");
const sgMail = require("@sendgrid/mail");

const controllers = {
  susbcribe: async function (req, res) {
    let response;
    try {
      let { email } = req.body;
      let postBody = {
        email: email,
      };
      let data = await dashboardService.susbcribe(postBody);
      if (data) {
        response = {
          success: 1,
          data: data,
          message: "Sucessfully Subscribe User",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While Subscribing User",
        };
      }
    } catch (error) {
      console.error(error);
      response = {
        success: 0,
        data: {},
        message: error.message,
      };
      if (
        error &&
        error.message &&
        error.message.includes("E11000 duplicate key error collection")
      ) {
        response.message = "User Already Subscribed";
      }
    }
    return res.send(response);
  },
  contactUs: async function (req, res) {
    let response;
    try {
      let data = await dashboardService.contactUs(req.body);

      if (data) {
        const apiKey = sgMail.setApiKey(
          process.env.EMAIL_PROVIDER_AUTH_PASSWORD
        );

        const msg = {
          to: process.env.SUPPORT_EMAIL, // support Email
          from: process.env.EMAIL, // Change to your verified sender
          subject: "Eduwizer Contact Us",
          text: `Contact Person`,
          html: `Name: ${req.body.name} .  
          Email:  ${req.body.email} . 
          Message: ${req.body.message} . Phone: ${req.body.phone}`,
        };

        const messageSendData = await apiKey.send(msg);

        console.log("data", data);

        console.log("messageSendData", messageSendData);

        response = {
          success: 1,
          data: messageSendData,
          message: "Sucessfully Send Message",
        };
      } else {
        response = {
          success: 0,
          data: data,
          message: "Error While  Send Message",
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
  getContactMessages: async (req, res) => {
    try {
      const contactMessages = await dashboardService.getContactMessages();
      res.status(200).json(contactMessages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = controllers;

