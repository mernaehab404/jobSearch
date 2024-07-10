import Joi from "joi";

// Define Joi schema for application validation
export const applicationSchema = Joi.object({
    jobId: Joi.string().required(),
    userId: Joi.string().required(),
    userTechSkills: Joi.array().items(Joi.string()).required(),
    userSoftSkills: Joi.array().items(Joi.string()).required(),
    userResume: Joi.string().required()
    // You can add more validations as per your schema
  });