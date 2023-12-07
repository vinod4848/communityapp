const mongoose = require("../database/mongodb");
const usersSchemaNew = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced", "Widowed"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let userInformationIthoutStrict = null;
try {
  userInformationIthoutStrict = mongoose.model("users");
} catch (error) {
  userInformationIthoutStrict = mongoose.model("users", usersSchemaNew);
}

const models = {
  dbUpdateUser: async function (updatedFields) {
    try {
      const filter = { _id: mongoose.Types.ObjectId(updatedFields.userId) };
      const update = { $set: { ...updatedFields } };
      const options = { returnOriginal: false, new: false, upsert: true };

      console.log("Filter: ", filter);
      console.log("Update: ", update);
      console.log("Options: ", options);

      const result = await userInformationIthoutStrict.updateOne(
        filter,
        update,
        options
      );

      console.log("Result: ", result);

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  dbGetUsersData: async function (find, select, sort, skip, limit) {
    let data;
    try {
      data = await userInformationIthoutStrict
        .find(find)
        .select(select)
        .sort(sort)
        .skip(skip)
        .limit(limit);
    } catch (error) {
      console.error("error", error);
    }
    return data;
  },

  // Model
  dbDeleteUserData: async function (find) {
    try {
      // Use the 'deleteOne' method for deleting a single user matching the 'find' condition.
      // If you want to delete multiple users, use the 'deleteMany' method instead.
      const result = await userInformationIthoutStrict.deleteOne(find);
      return result;
    } catch (error) {
      console.error("error", error);
      throw error; // Re-throw the error to handle it in the caller function if needed.
    }
  },
};

module.exports = models;
