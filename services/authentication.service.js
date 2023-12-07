
const userModel = require("../models/authentication.model")
const userOtpModel = require("../models/userOtp.model")

const services = {
    addUser : async function(body){
        let addUser = {}
        try {
           addUser = userModel.dbAddUser(body)
        } catch (error) {
            console.error(error)
        }
        return addUser;
    },
    getUserDetailsByUserId : async function (find,select) {
        let data = {}
        try {
            data = userModel.getuserData(find,select)
        } catch(error) {
            console.error(error)
        }
        return data
    },
    updateUserDetails : async  function (find,update,option){
        let data = {}
        try {
            data = userModel.updateUserData(find,update,option)
        } catch(error) {
            console.error(error)
        }
        return data
    },
    userOtpModel : async function (body) {
        let addUserOtpData = {}
        try {
            addUserOtpData = userOtpModel.dbAddUserOtp(body)
        } catch (error) {
            console.error(error)
        }
        return addUserOtpData;
    },
    getUserVerificationCode : async function(find,select,sort) {
        let data = {}
        try {
            data = userOtpModel.getuserData(find,select,sort)
        } catch(error) {
            console.error(error)
        }
        return data
    }
};

module.exports = services;
