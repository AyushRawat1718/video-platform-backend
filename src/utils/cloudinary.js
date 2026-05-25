import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to upload local files to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", //Detect automatically what type of file is
    });

    //File is uploaded successfully
    console.log("File has been uploaded successfully on cloudinary !!");

    // Return uploaded file details/metadata
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };
