const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  tokens: Joi.array().items(
    Joi.object({
      token: Joi.string().required(),
    })
  ),
  tasks: Joi.array().items(Joi.string()),
});

exports.validateUser = (user) => {
  return userSchema.validate(user);
};
