import Joi from "joi";

//validation signup schema
export const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    recoveryEmail: Joi.string(),
    DOB: Joi.date().iso().required(),
    mobileNumber: Joi.string().required(),
    role: Joi.string().valid("User", "Company_HR").required(),
    status: Joi.string().valid("online", "offline").required(),
  });

//validation signup schema
  export const signinSchema = Joi.object({
    identifier: Joi.string().required(), // This will accept either email or mobileNumber
    password: Joi.string().required(),
  });

  
