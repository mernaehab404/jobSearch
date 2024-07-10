import { model, Schema } from "mongoose";

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userTechSkills: {
        type: [String],
        required: true
    },
    userSoftSkills: {
        type: [String],
        required: true
    },
    userResume: {
        type: String,
        required: true
    }
});

// Middleware to check file type for userResume (pdf only)
applicationSchema.pre('save', function(next) {
    if (this.userResume && !this.userResume.endsWith('.pdf')) {
        return next(new Error('Resume must be a PDF file'));
    }
    next();
});

export const Application = model('Application', applicationSchema);
