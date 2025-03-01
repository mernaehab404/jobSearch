import { model, Schema } from "mongoose";

const jobSchema = new Schema({
    jobTitle: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true,
        enum: ['onsite', 'remotely', 'hybrid']
    },
    workingTime: {
        type: String,
        required: true,
        enum: ['part-time', 'full-time']
    },
    seniorityLevel: {
        type: String,
        required: true,
        enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO']
    },
    jobDescription: {
        type: String,
        required: true
    },
    technicalSkills: {
        type: [String],
        required: true
    },
    softSkills: {
        type: [String],
        required: true
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // This refers to the User schema, specifically an HR user.
        required: true
    },
    // company: { type: Schema.Types.ObjectId, ref: 'Company' }
    

}, {
    strictPopulate: false // Disable strict populate
});

export const Job = model('Job', jobSchema);
