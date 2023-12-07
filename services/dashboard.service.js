const susbcribeModel = require("../models/subscribe.model");
const contactUs = require("../models/subscribe.model");
const services = {
  susbcribe: async function (body) {
    let addUser = {};
    try {
      addUser = await susbcribeModel.dbSubscribeUser(body);
    } catch (error) {
      console.error(error);
    }
    return addUser;
  },
  contactUs: async function (body) {
    let contactUs = {};
    console.log(contactUs, "coefspsfsbty");
    try {
      contactUs = await susbcribeModel.dbContactUs(body);
    } catch (error) {
      console.error(error);
    }
    return contactUs;
  },
  getContactMessages: async () => {
    try {
      const contactMessages = await susbcribeModel.getAllContactUsData();
      return contactMessages;
    } catch (error) {
      throw new Error("Error fetching contact messages: " + error.message);
    }
  },
};

module.exports = services;

