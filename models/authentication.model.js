const mongoose = require("../database/mongodb");

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
/**
 * @type {mongoose.Model}
 */
let userInformation = null;
try {
  userInformation = mongoose.model("users");
} catch (error) {
  userInformation = mongoose.model("users", usersSchema);
}
const models = {
  dbAddUser: async function (body) {
    const userData = new userInformation(body);
    const data = await userData.save();
    return data;
  },
  getuserData: async function (find, select) {
    const data = await userInformation.findOne(find, select);
    return data;
  },
  updateUserData: async function (find, select, option) {
    const data = await userInformation.findOneAndUpdate(find, select, option);
    return data;
  },
};

module.exports = models;
