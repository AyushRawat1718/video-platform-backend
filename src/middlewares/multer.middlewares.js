import multer from "multer";

const storage = multer.diskStorage({
  // Define temporary folder destination for uploaded files
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },

  // Define filename for stored uploaded file
  filename: function (req, file, cb) {
    // Store file using original uploaded filename
    cb(null, file.originalname);
  },
});

// Create and export multer upload middleware instance
export const upload = multer({
  storage,
});
