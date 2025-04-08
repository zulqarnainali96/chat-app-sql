import Joi from "joi";

export const emailValidateRegister = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  username: Joi.string().required(),
});
export const emailValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
export const notificationSchema = Joi.object({
  id : Joi.string().required(),
  recipient_id: Joi.string().required(),
  message: Joi.string().required(),
  username: Joi.string().required(),

});