import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localPath) => {
    try{
        if(!localPath) return null;
        const response = await cloudinary.uploader.upload(localPath,{
            resource_type: 'auto'
        });
        //file has been uploaded succesfully
        console.log('file is uploaded to cloudinary ', response.url);
        return response;
    }catch(err){
        fs.unlinkSync(localPath); // remove the locally saved temp file as the upload operation got failed
        return null
    }
};

export { uploadOnCloudinary }