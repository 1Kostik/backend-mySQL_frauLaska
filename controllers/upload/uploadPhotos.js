const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "your_folder_name",
    allowedFormats: ["jpg", "png"],
  },
});
const upload = multer({ storage: storage });

const uploadPhotos = async (req, res, next) => {
  upload.array("images", 10)(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ file: req.file });
  });
};
module.exports = uploadPhotos;
