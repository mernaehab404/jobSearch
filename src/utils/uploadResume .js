import cloudinary from '../config/cloudinaryConfig.js';

export const uploadResume = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath, {
            resource_type: 'auto',
            folder: 'resumes',
            format: 'pdf'
        });
        return result.secure_url;
    } catch (error) {
        throw new Error('Failed to upload resume to Cloudinary');
    }
};
