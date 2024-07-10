import Joi from 'joi';

export const updateUserSchema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    mobileNumber: Joi.string(),
    recoveryEmail: Joi.string().email(),
    DOB: Joi.date().iso()
}).or('firstName', 'lastName', 'email', 'mobileNumber', 'recoveryEmail', 'DOB').required();

//validation updatePasswordSchema 
export  const updatePasswordSchema = Joi.object({
    userId: Joi.string().required(),
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).required(), // Adjust the minimum length as per your policy
  });