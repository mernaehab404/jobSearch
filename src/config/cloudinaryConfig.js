import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret'
});

// Function to upload resume to Cloudinary
const uploadResume = async (filePath) => {
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
