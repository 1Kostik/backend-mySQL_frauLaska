const db = require("../../db");
const getAllProducts = require("./getAllProducts");

const updateImages = async (req, res, next) => {
  const { id } = req.params;
  const { imageUrls } = req.body;

  try {
    if (imageUrls && imageUrls.length > 0) {
      await updateTableImages(id, imageUrls);
    }

    const allProducts = await getAllProducts();

    res.status(200).json({
      status: "success",
      code: 200,
      data: { productData: allProducts },
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Помилка при оновленні даних");
  }
};

const updateTableImages = async (product_id, images) => {
  const query = "UPDATE imageUrls SET product_id = ?, img_url = ? WHERE id = ?";
  const promises = images.map((image) => {
    return new Promise((res, rej) => {
      if (!image.id || !image.img_url) {
        return rej("Missing required fields");
      }
      db.query(query, [product_id, image.img_url, image.id], (err, result) => {
        if (err) return rej(err);
        res(result);
      });
    });
  });

  return Promise.all(promises);
};

module.exports = updateImages;
