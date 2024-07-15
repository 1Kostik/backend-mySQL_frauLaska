const db = require("../../db");
const cloudinary = require("../../cloudinaryConfig");

const {getAllProducts} = require("./getAllProducts");

const deleteImages = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteImageUrls(id);

    const allProducts = await getAllProducts();

    res.status(200).json({
      status: "success",
      code: 200,
      data: { productData: allProducts },
    });
  } catch (error) {
    console.error("Error in /deleteProductData:", error);
    res.status(500).send("Error deleting product data");
  }
};

const deleteImageUrls = async (id) => {
  const query = "SELECT img_url FROM imageUrls WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], async (err, rows) => {
      if (err) {
        console.error("Error selecting imageUrls:", err);
        return reject(err);
      }

      const deletePromises = rows.map(async (row) => {
        const startIndex = row.img_url.indexOf("products");
        let result = row.img_url.slice(startIndex);

        const public_id = result.split(".")[0];

        await cloudinary.uploader.destroy(public_id);
      });

      await Promise.all(deletePromises);

      const deleteQuery = "DELETE FROM imageUrls WHERE id = ?";

      db.query(deleteQuery, [id], (err, result) => {
        if (err) {
          console.error("Error deleting imageUrls:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  });
};

module.exports = deleteImages;
