// const cloudinary = require('cloudinary').v2;

// (async function () {
//   // Configuration
//   cloudinary.config({
//     cloud_name: "drwfk1ks0",
//     api_key: "938627964384879",
//     api_secret: "UxNjpXZd0RbLlv-6b6x5eETXyVk", // Click 'View Credentials' below to copy your API secret
//   });

//   // Upload an image
//   const uploadResult = await cloudinary.uploader
//     .upload(
//       "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
//       {
//         public_id: "shoes",
//       }
//     )
//     .catch((error) => {
//       console.log(error);
//     });

//   console.log(uploadResult);

//   // Optimize delivery by resizing and applying auto-format and auto-quality
//   const optimizeUrl = cloudinary.url("shoes", {
//     fetch_format: "auto",
//     quality: "auto",
//   });

//   console.log(optimizeUrl);

//   // Transform the image: auto-crop to square aspect_ratio
//   const autoCropUrl = cloudinary.url("shoes", {
//     crop: "auto",
//     gravity: "auto",
//     width: 500,
//     height: 500,
//   });

//   console.log(autoCropUrl);
// })();

// /*
// Cloud name drwfk1ks0;
// Api key 938627964384879;
// Api secret UxNjpXZd0RbLlv-6b6x5eETXyVk;
// API environment variable CLOUDINARY_URL=cloudinary://938627964384879:UxNjpXZd0RbLlv-6b6x5eETXyVk@drwfk1ks0;
// */

// /*
// POST https://api.cloudinary.com/v1_1/demo/image/upload

// =====================================================

// Установка в виндовс переменная среды АПИ

// set CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
// ------------------------------------------------------------------------
// Настройка кладунари

// // Require the cloudinary library
// const cloudinary = require('cloudinary').v2;

// // Return "https" URLs by setting secure: true
// cloudinary.config({
//   secure: true
// });

// // Log the configuration
// console.log(cloudinary.config());
// -------------------------------------------------------------
// Загрузка изображения

// /////////////////////////
// // Uploads an image file
// /////////////////////////
// const uploadImage = async (imagePath) => {

//     // Use the uploaded file's name as the asset's public ID and 
//     // allow overwriting the asset with new versions
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };

//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload(imagePath, options);
//       console.log(result);
//       return result.public_id;
//     } catch (error) {
//       console.error(error);
//     }
// };
// -------------------------------------------------
// Получить и использовать детали изображения

// /////////////////////////////////////
// // Gets details of an uploaded image
// /////////////////////////////////////
// const getAssetInfo = async (publicId) => {

//     // Return colors in the response
//     const options = {
//       colors: true,
//     };

//     try {
//         // Get details about the asset
//         const result = await cloudinary.api.resource(publicId, options);
//         console.log(result);
//         return result.colors;
//         } catch (error) {
//         console.error(error);
//     }
// };
// -------------------------------------------------------
// Трансформируйте изображение

// //////////////////////////////////////////////////////////////
// // Creates an HTML image tag with a transformation that
// // results in a circular thumbnail crop of the image  
// // focused on the faces, applying an outline of the  
// // first color, and setting a background of the second color.
// //////////////////////////////////////////////////////////////
// const createImageTag = (publicId, ...colors) => {

//     // Set the effect color and background color
//     const [effectColor, backgroundColor] = colors;

//     // Create an image tag with transformations applied to the src URL
//     let imageTag = cloudinary.image(publicId, {
//       transformation: [
//         { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
//         { radius: 'max' },
//         { effect: 'outline:10', color: effectColor },
//         { background: backgroundColor },
//       ],
//     });

//     return imageTag;
// };
// ---------------------------------------------------------
// ЗАпуск кода созданных функций
// //////////////////
// //
// // Main function
// //
// //////////////////
// (async () => {

//     // Set the image to upload
//     const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

//     // Upload the image
//     const publicId = await uploadImage(imagePath);

//     // Get the colors in the image
//     const colors = await getAssetInfo(publicId);

//     // Create an image tag, using two of the colors in a transformation
//     const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

//     // Log the image tag to the console
//     console.log(imageTag);

// })();



// ==============================================
// приклад 1

// cloudinary.v2.uploader
// .upload("hat.jpg", { 
//   use_filename: true})
// .then(result=>console.log(result));

// приклад 2

// cloudinary.v2.uploader
// .upload("https://upload.wikimedia.org/wikipedia/commons/0/01/Charvet_shirt.jpg", { 
//   public_id: "wiki_shirt",
//   quality_analysis: true, 
//   colors: true, 
//   categorization: "google_tagging",
//   auto_tagging: true})
// .then(result=>console.log(result));

// */

// let st="https://res.cloudinary.com/drwfk1ks0/image/upload/v1720866398/products/35/flwvkoalhtn0lbmhd9jj.jpg"
// let pablic_id = st.split('/')
// let nw = pablic_id.indexOf("products")
// let as =  pablic_id.slice(-1)[0].split('.')[0]
// let fin = pablic_id.indexOf(as)
// console.log('pablic_id :>> ', pablic_id);
// console.log('as :>> ',as);
// console.log('fin :>> ',fin);
// console.log('nw :>> ',pablic_id.slice(nw));
// const url = "https://res.cloudinary.com/drwfk1ks0/image/upload/v1720866398/products/35/flwvkoalhtn0lbmhd9jj.jpg";
// const regex = /\/products\/([^\/]+)/;
// const match = url.match(regex);

// if (match) {
//   const productId = match[1]; // productId содержит "35/flwvkoalhtn0lbmhd9jj"
//   console.log(productId);
// } else {
//   console.log("Не удалось извлечь productId");
// }
// const url = "https://res.cloudinary.com/drwfk1ks0/image/upload/v1720866398/products/35/flwvkoalhtn0lbmhd9jj.jpg";

// // Разделение строки по '/' и выбор нужной части
// const parts = url.split('/');
// let nw = parts.indexOf("products")
// let aa= parts.slice(nw,-1).join('/')
// let bb = parts.slice(-1).join('.').split('.')[0]
// aa =aa.concat("/")
// let dd = aa.concat(bb);
// // const fn = parts.split('/').slice(-1).join('.').split('.')[0]
// console.log(parts); // Выведет "products/35/flwvkoalhtn0lbmhd9jj.jpg"
// console.log(aa)
// console.log(bb)
// console.log(dd)

const url = "https://res.cloudinary.com/drwfk1ks0/image/upload/v1720866398/products/flwvkoalhtn0lbmhd9jj.jpg";

const startIndex = url.indexOf("products"); // находим начало подстроки "products"

let result = url.slice(startIndex); // получаем "products/35/flwvkoalhtn0lbmhd9jj.jpg"
result = result.split('.')[0]; // получаем "products/35/flwvkoalhtn0lbmhd9jj"

console.log(result); // Выведет "products/35/flwvkoalhtn0lbmhd9jj"
