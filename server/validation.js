const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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

const newTodoValidation = (data) => {
  const Schema = Joi.object({
    check: Joi.boolean().required(),
    todoID: Joi.string().required(),
    text: Joi.string().max(50).required(),
    userID: Joi.objectId().required(),
    updatedAt: Joi.string().required(),
  });
  return Schema.validate(data);
};

const updateTodoValidation = (data) => {
  const Schema = Joi.object({
    check: Joi.boolean().required(),
    todoID: Joi.string().required(),
    text: Joi.string().max(50).required(),
    userID: Joi.objectId().required(),
    updatedAt: Joi.string().required(),
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
module.exports.newTodoValidation = newTodoValidation;
module.exports.updateTodoValidation = updateTodoValidation;
module.exports.passwordValidation = passwordValidation;
