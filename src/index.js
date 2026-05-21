import express from "express";
import connectDB from "./db/index.js";

connectDB();

/*

const app = express();

// IIFE → Used to execute async startup code immediately
(async () => {
  try {

    // Connect application with database
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    // Listen for application-level errors/events
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });

  } catch (error) {

    // Handle errors occurring during application startup
    console.log("ERROR: ", error);
    throw error;
  }
})();

*/
