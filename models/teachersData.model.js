
const mongoose = require("../database/mongodb");
const teachersSchema = mongoose.Schema(
  {
    country: { type: String, require: true  },
    location: { type: String, require: true  },
    name: { type: String, require: true  },
    position: { type: String, require: true  },
    url : { type: String, require: true  },
    fileType : { type: String, require: true  },
    linkedIn: { type: String, require: false  },
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
let teachersInformation = null;
try {
    teachersInformation = mongoose.model("teachersData");
} catch (error) {
    teachersInformation = mongoose.model("teachersData", teachersSchema);
}

const models = {
  dbGetTeachersData: async function (teacherId) {
    let data
    let filter
    if(teacherId) {
      filter = {
        _id: mongoose.Types.ObjectId(teacherId),
        isActive : true
      }
      data = await teachersInformation.find(filter);
    } else {
      filter = { isActive : true }     
      data = await teachersInformation.find(filter).sort({"createdTimestamp": -1});
    }
    return data;
  },
  dbAddTeachersData: async function (body) {
    const teacherData = new teachersInformation(body);
    const data = await teacherData.save();
    return data;
  },
  dbUpdateTeachersData : async  function (body) {
    try {
      const filter = { _id: mongoose.Types.ObjectId(body.teacherId) };
      delete body.teacherId;
      const update = { $set: { ...body } };
      const options = { returnOriginal: false, new: false, upsert: true };
      const result = await teachersInformation.updateOne(filter, update, options);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  dbDeleteTeachersData : async  function ({teacherId}) {
    try {
      const filter = { _id: mongoose.Types.ObjectId(teacherId) };
      const update = { $set: {
        isActive : false
      } };
      const options = { returnOriginal: false, new: false, upsert: true };
      const result = await teachersInformation.updateOne(filter, update, options);
      console.log("Result: ", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

module.exports = models;
