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

const addTodoValidation = (data) => {
  const Schema = Joi.object({
    check: Joi.boolean().required(),
    id: Joi.string().required(),
    text: Joi.string().max(50).required(),
    userID: Joi.objectId().required(),
  });
  return Schema.validate(data);
};

const editTodoValidation = (data) => {
  const Schema = Joi.object({
    check: Joi.boolean().required(),
    text: Joi.string().max(50).required(),
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
module.exports.addTodoValidation = addTodoValidation;
module.exports.editTodoValidation = editTodoValidation;
module.exports.passwordValidation = passwordValidation;
