const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("To Do", "In Progress", "Done").default("To Do"),
  userId: Joi.string().required(),
});

module.exports = (task) => {
  return taskSchema.validate(task);
};
