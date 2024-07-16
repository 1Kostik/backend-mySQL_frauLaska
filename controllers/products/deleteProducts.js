const db = require("../../db");
const cloudinary = require("../../cloudinaryConfig");

const { getAllProducts } = require("./getAllProducts");

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVariations(id);
    await deleteFeedbacks(id);
    await deleteImageUrls(id);
    await deleteProduct(id);

    const productData = await getAllProducts();

    res.status(200).json(productData);
  } catch (error) {
    console.error("Error in /deleteProductData:", error);
    res.status(500).send("Error deleting product data");
  }
};

const deleteProduct = async (id) => {
  const query = "DELETE FROM products WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error deleting product:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const deleteVariations = async (product_id) => {
  const query = "DELETE FROM variations WHERE product_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [product_id], (err, result) => {
      if (err) {
        console.error("Error deleting variations:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const deleteFeedbacks = async (product_id) => {
  const query = "DELETE FROM feedbacks WHERE product_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [product_id], (err, result) => {
      if (err) {
        console.error("Error deleting feedbacks:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const deleteImageUrls = async (product_id) => {
  const query = "SELECT img_url FROM imageUrls WHERE product_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [product_id], async (err, rows) => {
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

      const deleteQuery = "DELETE FROM imageUrls WHERE product_id = ?";
      db.query(deleteQuery, [product_id], (err, result) => {
        if (err) {
          console.error("Error deleting imageUrls:", err);
          return reject(err);
        }
        resolve(result);
      });
    });
  });
};

module.exports = deleteProducts;
