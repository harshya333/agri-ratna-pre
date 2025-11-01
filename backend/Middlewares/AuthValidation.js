const Joi = require("joi");

// ✅ Signup validation
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name should have at least 3 characters",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(4).max(100).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password should be at least 4 characters long",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message, // ✅ Clear single error message
    });
  }
  next();
};

// ✅ Login validation
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please enter a valid email",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(4).max(100).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password should be at least 4 characters long",
    }),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message, // ✅ User-friendly error message
    });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
