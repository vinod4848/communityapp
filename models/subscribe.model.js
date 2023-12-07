const mongoose = require("../database/mongodb");
const usersSchema = mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
  },
  {
    timestamps: {
      createdAt: "createdTimestamp",
      updatedAt: false,
    },
  }
);
const contactUsSchema = mongoose.Schema(
  {
    email: { type: String, require: true },
    phone: { type: Number, require: true },
    name: { type: String, require: true },
    message: { type: String, require: true },
  },
  {
    timestamps: {
      createdAt: "createdTimestamp",
      updatedAt: false,
    },
  }
);
/**
 * @type {mongoose.Model}
 */
let subscribeInformation = null;
try {
  subscribeInformation = mongoose.model("subscribeInformation");
} catch (error) {
  subscribeInformation = mongoose.model("subscribeInformation", usersSchema);
}

/**
 * @type {mongoose.Model}
 */
let contactUs = null;
try {
  contactUs = mongoose.model("contactUs");
} catch (error) {
  contactUs = mongoose.model("contactUs", contactUsSchema);
}
const models = {
  dbSubscribeUser: async function (body) {
    const subscribeData = new subscribeInformation(body);
    const data = await subscribeData.save();
    return data;
  },
  dbContactUs: async function (body) {
    const contactUsData = new contactUs(body);
    const data = await contactUsData.save();
    return data;
  },
  getAllContactUsData: async function () {
    try {
      const data = await contactUs.find({}); // Use the model directly to find data
      return data;
    } catch (error) {
      // Handle errors appropriately
      throw new Error("Error fetching contactUs data: " + error.message);
    }
  },
};

module.exports = models;

