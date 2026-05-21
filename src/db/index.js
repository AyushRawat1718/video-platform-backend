import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    // Connect application with MongoDB database
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB Connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Handle database connection failure/errors
    console.log("MONGODB CONNECTION FAILED: ", error);

    // Stop application process if critical startup error occurs
    process.exit(1);
  }
};

// connectDB();
export default connectDB;
