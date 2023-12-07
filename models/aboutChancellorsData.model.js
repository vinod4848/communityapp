
const mongoose = require("../database/mongodb");
const aboutChancellorsSchema = mongoose.Schema(
  {
    country: { type: String, require: true  },
    location: { type: String, require: true  },
    name: { type: String, require: true  },
    position: { type: String, require: true  },
    url : { type: String, require: true  },
    fileType : { type: String, require: true  },
    linkedIn: { type: String, require: false  },
    email: { type: String, require: false  },
    isActive : { type: Boolean, require: true , default : true },
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
let aboutChancellorsInformation = null;
try {
    aboutChancellorsInformation = mongoose.model("aboutChancellorsData");
} catch (error) {
    aboutChancellorsInformation = mongoose.model("aboutChancellorsData", aboutChancellorsSchema);
}

const models = {
  dbGetAboutChancellorsData: async function (aboutChancellorId) {
    let data
    let filter
    if(aboutChancellorId) {
      filter = {
        _id: mongoose.Types.ObjectId(aboutChancellorId),
        isActive : true
      }
      data = await aboutChancellorsInformation.find(filter);
    } else {
      filter = { isActive : true }     
      data = await aboutChancellorsInformation.find(filter).sort({"createdTimestamp": -1});
    }
    return data;
  },
  dbAddAboutChancellorsData: async function (body) {
    const aboutChancellorData = new aboutChancellorsInformation(body);
    const data = await aboutChancellorData.save();
    return data;
  },
  dbUpdateAboutChancellorsData : async  function (body) {
    try {
      const filter = { _id: mongoose.Types.ObjectId(body.aboutChancellorId) };
      delete body.aboutChancellorId;
      const update = { $set: { ...body } };
      const options = { returnOriginal: false, new: false, upsert: true };
      const result = await aboutChancellorsInformation.updateOne(filter, update, options);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  dbDeleteAboutChancellorsData : async  function ({aboutChancellorId}) {
    try {
      const filter = { _id: mongoose.Types.ObjectId(aboutChancellorId) };
      const update = { $set: {
        isActive : false
      } };
      const options = { returnOriginal: false, new: false, upsert: true };
      const result = await aboutChancellorsInformation.updateOne(filter, update, options);
      console.log("Result: ", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = models;
