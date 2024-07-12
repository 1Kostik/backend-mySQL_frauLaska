const express = require("express");
const {
  uploadPhoto,
  uploadPhotos,
  deletePhoto,
  deletePhotos,
} = require("../../controllers");
const router = express.Router();
router.post("/upload-single", uploadPhoto);
router.post("/upload-multiple", uploadPhotos);
router.delete("/photo/:id", deletePhoto);
router.delete("/photos", deletePhotos);
module.exports = router;


// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;

// // Настройка Cloudinary
// cloudinary.config({
//     cloud_name: 'YOUR_CLOUD_NAME',
//     api_key: 'YOUR_API_KEY',
//     api_secret: 'YOUR_API_SECRET'
// });

// // Настройка хранения в Cloudinary
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'your_folder_name', // Папка в Cloudinary, куда будут сохраняться файлы
//         allowedFormats: ['jpg', 'png'],
//     },
// });

// const upload = multer({ storage: storage });

// const app = express();

// // Маршрут для загрузки одного файла
// app.post('/upload-single', upload.single('image'), (req, res) => {
//     res.json({ file: req.file });
// });

// // Маршрут для загрузки массива файлов
// app.post('/upload-multiple', upload.array('images', 10), (req, res) => {
//     res.json({ files: req.files });
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
// // Удаление одного файла
// app.delete('/photo/:id', async (req, res) => {
//     const publicId = req.params.id;

//     try {
//         const result = await cloudinary.uploader.destroy(publicId);
//         res.json({ result });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Удаление нескольких файлов
// app.delete('/photos', async (req, res) => {
//     const { ids } = req.body; // Ожидаем массив public_id в теле запроса

//     try {
//         const results = await Promise.all(ids.map(id => cloudinary.uploader.destroy(id)));
//         res.json({ results });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
