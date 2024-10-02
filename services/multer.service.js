const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  try {
    let allowedFileTypes = []; // Add more file types as needed
    switch (file.fieldname) {
      case "listningImage":
        allowedFileTypes = [".jpg", ".png", ".jpeg", ".jfif"]; // Add more file types as needed
        break;
      default:
        break;
    }
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(extname)) {
      return cb(null, true);
    } else {
      return cb(new Error(responseModel.validationError("Invalid Image Type")));  
    }
  } catch (error) {
    return cb(new Error(responseModel.validationError("Something Went Wrong")));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "listningImage":
        cb(null, path.join(__dirname, "../uploads/listningImages"));
        break;
      default:
        break;
    }
  },
  filename: (req, file, cb) => {
    const originalname = file.originalname.replace(/\s+/g, "_"); // Replace spaces with underscores
    cb(null, Date.now() + "-" + originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
