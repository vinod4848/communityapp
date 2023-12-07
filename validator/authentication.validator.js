const Joi = require("./validator");

const validator = {
  loginValidator: async function (req, res, next) {
    try {
      const login = Joi.object({
        userName: Joi.string().max(100).optional(),
        email: Joi.string().lowercase().email().optional(),
        password: Joi.string().max(25).required(),
      }).xor("userName", "email");
      const { error } = await login.validateAsync(req.body);
      if (error) {
        throw error;
      }
      next();
    } catch (error) {
      res.status(400).json({ success: 0, data: [], message: error.message });
    }
  },

  signUpValidator: async function (req, res, next) {
    try {
      const signUpSchema = Joi.object({
        userName: Joi.string().max(25),
        email: Joi.string().email(),
        password: Joi.string().max(25),
        phone: Joi.number(),
        firstName: Joi.string().max(25),
        lastName: Joi.string().max(25),
        fatherName: Joi.string().max(25),
        motherName: Joi.string().max(25),
        url: Joi.string().required(),
        address: Joi.string().max(25),
        age: Joi.number(),
        maritalStatus: Joi.string().max(25),
        gender: Joi.string().max(25),

        // .valid('school', 'college', 'private institutions')
        // .error(new Error('Preference must be School, College, Private Institutions'))
      });

      const { error, value } = await signUpSchema.validateAsync(req.body);

      if (error) {
        throw error;
      }

      next();
    } catch (error) {
      res.status(400).json({ success: 0, data: [], message: error.message });
    }
  },

  sendOtp: async function (req, res, next) {
    try {
      const otp = Joi.object({
        userId: Joi.string().required(),
      });
      req.body = await otp.validateAsync(req.body);
      const { error, value } = await otp.validateAsync(req.body);
      if (error) {
        throw error;
      }
      next();
    } catch (error) {
      res.status(400).json({ success: 0, data: [], message: error.message });
    }
  },

  verifyOtp: async function (req, res, next) {
    try {
      const otp = Joi.object({
        code: Joi.number().required(),
        userId: Joi.string().required(),
      });
      req.body = await otp.validateAsync(req.body);
      const { error, value } = await otp.validateAsync(req.body);
      if (error) {
        throw error;
      }
      next();
    } catch (error) {
      res.status(400).json({ success: 0, data: [], message: error.message });
    }
  },
};
module.exports = validator;
