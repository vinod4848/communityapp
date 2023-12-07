const authenticationService = require('../services/authentication.service')
const jwtConfig = require('../config/jwt.config')
const sgMail = require('@sendgrid/mail')
const controllers = {
  login: async function (req, res) {
    let response
    let find
    if (req.body.userName) {
      find = { email: req.body.userName }
    } else if (req.body.email) {
      find = { email: req.body.email }
    } else {
      throw new Error('Internal server Error')
    }
    const select = {
      _id: 1,
      email: 1,
      password: 1,
      userType: 1,
      emailVerified: 1,
      phoneVerified: 1
    }

    try {
      const data = await authenticationService.getUserDetailsByUserId(
        find,
        select
      )

      if (data) {
        // if (data.emailVerified > 0) {
          if (data && data.password && data.password == req.body.password) {
            const dataForJwt = {
              userId: data._id,
              userType: data.userType,
              email: data.email
            }

            const generateSession = await jwtConfig.generateToken(
              dataForJwt,
              process.env.secret
            )

            response = {
              success: 1,
              data: data,
              session: generateSession,
              message: 'SucessFully Login'
            }
          } else {
            throw new Error('Invalid Crdentials')
          }
        // } else {
        //   throw new Error('Email has not been verified')
        // }
      } else {
        throw new Error('User Not Exists')
      }
    } catch (error) {
      console.error(error)
      response = {
        success: 0,
        data: [],
        message: error.message
      }
    }
    return res.send(response)
  },

  signUp: async function (req, res) {
    let response
    try {
      req.body.email = req.body.email.toLowerCase()
      const find = {
        email: req.body.email.toLowerCase()
      }
      const select = {
        _id: 0
      }
      const checked = await authenticationService.getUserDetailsByUserId(
        find,
        select
      )
      if (checked) {
        throw new Error('User Already Exists')
      } else {
        const data = await authenticationService.addUser(req.body)
        response = {
          success: 1,
          data: data,
          message: 'Sccesfully Singup'
        }
      }
    } catch (error) {
      console.error(error)
      response = {
        success: 0,
        data: [],
        message: error.message
      }
    }
    return res.send(response)
  },

  sendOtp: async function (req, res) {
    let response
    try {
      const find = { _id: req.body.userId }
      const select = {
        __v: 0
      }
      const userData = await authenticationService.getUserDetailsByUserId(
        find,
        select
      )
      if (userData) {
        const otp = Math.floor(100000 + Math.random() * 9000)
        const apiKey = sgMail.setApiKey(
          process.env.EMAIL_PROVIDER_AUTH_PASSWORD
        )
        const msg = {
          to: userData.email, // Change to your recipient
          from: 'ngeduwizer@gmail.com', // Change to your verified sender
          subject: 'Eduwizer',
          text: `Please enter the OTP: ${otp}`,
          html: `Eduwizer Education :- Please enter the OTP: ${otp}`
        }
        
        const data = await apiKey.send(msg)

        console.log('data', data)
        
        if (data && data.length) {
          const obj = {
            userId: req.body.userId,
            verificationCode: otp,
            emailId: userData.email
          }
          const addUserVerificationCode =
            await authenticationService.userOtpModel(obj)
          response = {
            success: 1,
            data: { userdata: addUserVerificationCode, otpData: data[0] },
            message: 'SucessFully Send Otp'
          }
        } else {
          throw new Error('Internal Server Error')
        }
      } else {
        throw new Error('User Not Exists')
      }
    } catch (error) {
      console.error(error)
      response = {
        success: 0,
        data: [],
        message: error.message
      }
    }
    return res.send(response)
  },

  verifyOtp: async function (req, res) {
    // let userId = req.user
    const { code, userId } = req.body
    const find = {
      userId: userId,
      verificationCode: code
    }
    const select = {
      _id: 0,
      __v: 0
    }
    const sort = {
      _id: -1
    }
    let response
    try {
      const userData = await authenticationService.getUserVerificationCode(
        find,
        select,
        sort
      )
      if (userData && userData.verificationCode === code) {
        const findUpdate = {
          _id: userId,
          email: userData.emailId
        }
        const updateData = {
          $set: {
            emailVerified: 1
          }
        }
        const option = {
          new: true
        }
        console.log('query', findUpdate, updateData, option)
        const update = await authenticationService.updateUserDetails(
          findUpdate,
          updateData,
          option
        )
        console.log('update', update)
        if (update) {

          const dataForJwt = {
            userId: userId,
            userType: userData.userType,
            email: userData.email
          }

          const generateSession = await jwtConfig.generateToken(
            dataForJwt,
            process.env.secret
          )

          // update.token = generateSession

          response = {
            success: 1,
            data: update,
            token: generateSession,
            message: 'sucessFully verifyOtp'
          }
        } else {
          throw new Error('Internal Server Error')
        }
      } else {
        throw new Error('Invalid Information')
      }
    } catch (error) {
      console.error(error)
      response = {
        success: 0,
        data: [],
        message: error.message
      }
    }
    return res.send(response)
  },
  loginFromGoogle: async function () { },

  loginFromLinkedin: async function () { },
  googleCallBack: async function () { },
  linkedinCallBack: async function () { }
}

module.exports = controllers
