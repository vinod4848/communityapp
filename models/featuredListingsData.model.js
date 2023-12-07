
const mongoose = require("../database/mongodb");
const featuredListingsSchema = mongoose.Schema(
  {
    url : { type: String, require: true  },
    fileType : { type: String, require: true  },
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
let featuredListingsInformation = null;
try {
    featuredListingsInformation = mongoose.model("featuredListingsData");
} catch (error) {
    featuredListingsInformation = mongoose.model("featuredListingsData", featuredListingsSchema);
}

const models = {
  dbGetFeaturedListingsData: async function (featuredListId) {
    let data
    let filter
    if(featuredListId) {
      filter = {
        _id: mongoose.Types.ObjectId(featuredListId),
        isActive : true
      }
      data = await featuredListingsInformation.find(filter);
    } else {
      filter = { isActive : true }     
      data = await featuredListingsInformation.find(filter).sort({"createdTimestamp": -1});
    }
    return data;
  },
  dbAddFeaturedListingsData: async function (body) {
    const featuredListData = new featuredListingsInformation(body);
    const data = await featuredListData.save();
    return data;
  },
  dbUpdateFeaturedListingsData : async  function (body) {
    try {
      const filter = { _id: mongoose.Types.ObjectId(body.featuredListId) };
      delete body.featuredListId;
      const update = { $set: { ...body } };
      const options = { returnOriginal: false, new: false, upsert: true };
      const result = await featuredListingsInformation.updateOne(filter, update, options);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  dbDeleteFeaturedListingsData : async  function ({featuredListId}) {
    try {
      const filter = { _id: mongoose.Types.ObjectId(featuredListId) };
      const update = { $set: {
        isActive : false
      } };
      const options = { returnOriginal: false, new: false, upsert: true };
      const result = await featuredListingsInformation.updateOne(filter, update, options);
      console.log("Result: ", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = models;
