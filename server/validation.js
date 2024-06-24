const Joi = require("joi");

const registerValidation = (data) => {
  const Schema = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    email: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(6).max(20),
  });
  return Schema.validate(data);
};

const loginValidation = (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(6).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return Schema.validate(data);
};

const todoValidation = (data) => {
  const Schema = Joi.object({
    title: Joi.string().max(20).required(),
    description: Joi.string().max(50),
  });
  return Schema.validate(data);
};

const passwordValidation = (data) => {
  const Schema = Joi.object({
    password: Joi.string().min(6).max(20).required(),
  });
  return Schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.todoValidation = todoValidation;
module.exports.passwordValidation = passwordValidation;
