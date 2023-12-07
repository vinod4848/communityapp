
const profileModel = require('../models/profile.model')

const services = {
  updateProfile: async function (body) {
    let updateUser = {}
    try {
      console.log('body,,', body)
      updateUser = profileModel.dbUpdateUser(body)
    } catch (error) {
      console.error(error)
    }
    return updateUser
  },
  serachProfile: async function (find, select, sort, skip, limit) {
    let getProfile
    try {
      getProfile = profileModel.dbGetUsersData(find, select, sort, skip, limit)
    } catch (error) {
      console.error(error)
    }
    console.log(getProfile, "fsjssbfbshfsk")
    return getProfile
  },
  getProfile: async function (find, select, sort, skip, limit) {
    let getProfile
    try {
      getProfile = profileModel.dbGetUsersData(find, select, sort, skip, limit)
    } catch (error) {
      console.error(error)
    }
    return getProfile
  },
  deleteProfile: async function (filter) {
    let deleteProfile;
    try {
      // Assuming profileModel.dbDeleteUser(userId) is the function to delete the user from the database
      deleteProfile = await profileModel.dbDeleteUserData(filter);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete user');
    }
    return deleteProfile;
  }
}

module.exports = services
