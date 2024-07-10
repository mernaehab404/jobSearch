import Joi from "joi";
import { User } from "../../database/models/user.model.js";
import mongoose from 'mongoose';



const { ObjectId } = mongoose.Types;

// Custom validation function to check if the addedBy ID is a valid ObjectId and belongs to a Company_HR
export const isValidCompanyHRId = async (value) => {
    try {
        const user = await User.findById(value);
        if (!user || user.role !== 'Company_HR') {
            throw new Error('Only Company_HRs are allowed to add jobs');
        }
        return value;
    } catch (error) {
        console.error('Error validating Company_HR ID:', error);
        throw error; // Rethrow the error for proper handling
    }
};


//validation job schema
export const jobSchema = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().valid("onsite","remotely","hybrid").required(),
    workingTime: Joi.string().valid("part-time","full-time").required(),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
    jobDescription: Joi.string().required(),
    technicalSkills: Joi.array().items(Joi.string()).required(),
    softSkills: Joi.array().items(Joi.string()).required(),
    addedBy: Joi.string().required()
  });

export const updateJobSchema = Joi.object({
    jobTitle: Joi.string(),
    jobLocation: Joi.string().valid("onsite","remotely","hybrid"),
    workingTime: Joi.string().valid("part-time","full-time"),
    seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
    jobDescription: Joi.string(),
    technicalSkills: Joi.array().items(Joi.string()),
    softSkills: Joi.array().items(Joi.string()),
    addedBy: Joi.string().custom(isValidCompanyHRId)
}).or('jobTitle', 'jobLocation', 'workingTime', 'seniorityLevel', 'jobDescription', 'technicalSkills','softSkills','addedBy').required();
