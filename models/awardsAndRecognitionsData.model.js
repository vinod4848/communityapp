
const mongoose = require("../database/mongodb");
const awardsAndRecognitionsSchema = mongoose.Schema(
  {
    url : { type: String, require: true  },
    fileType : { type: String, require: true  },
    title : { type: String, require: true  },
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
let awardsAndRecognitionsInformation = null;
try {
    awardsAndRecognitionsInformation = mongoose.model("awardsAndRecognitionsData");
} catch (error) {
    awardsAndRecognitionsInformation = mongoose.model("awardsAndRecognitionsData", awardsAndRecognitionsSchema);
}

const models = {
  dbGetAwardsAndRecognitionsData: async function (awardsAndRecognitionId) {
    let data
    let filter
    if(awardsAndRecognitionId) {
      filter = {
        _id: mongoose.Types.ObjectId(awardsAndRecognitionId),
        isActive : true
      }
      data = await awardsAndRecognitionsInformation.find(filter);
    } else {
      filter = { isActive : true }     
      data = await awardsAndRecognitionsInformation.find(filter).sort({"createdTimestamp": -1});
    }
    return data;
  },
  dbAddAwardsAndRecognitionsData: async function (body) {
    const awardsAndRecognitionData = new awardsAndRecognitionsInformation(body);
    const data = await awardsAndRecognitionData.save();
    return data;
  },
  dbUpdateAwardsAndRecognitionsData : async  function (body) {
    try {
      const filter = { _id: mongoose.Types.ObjectId(body.awardsAndRecognitionId) };
      delete body.awardsAndRecognitionId;
      const update = { $set: { ...body } };
      const options = { returnOriginal: false, new: false, upsert: true };
      const result = await awardsAndRecognitionsInformation.updateOne(filter, update, options);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  dbDeleteAwardsAndRecognitionsData : async  function ({awardsAndRecognitionId}) {
    try {
      const filter = { _id: mongoose.Types.ObjectId(awardsAndRecognitionId) };
      const update = { $set: {
        isActive : false
      } };
      const options = { returnOriginal: false, new: false, upsert: true };
      const result = await awardsAndRecognitionsInformation.updateOne(filter, update, options);
      console.log("Result: ", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = models;
