const db = require("../../db");
const cloudinary = require("../../cloudinaryConfig");

const getAllProducts = require("./getAllProducts");

const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVolumes(id);
    await deleteColors(id);
    await deleteImageUrls(id);
    await deleteProduct(id);

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

const deleteVolumes = async (product_id) => {
  const query = "DELETE FROM volumes WHERE product_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [product_id], (err, result) => {
      if (err) {
        console.error("Error deleting volumes:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

const deleteColors = async (product_id) => {
  const query = "DELETE FROM colors WHERE product_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [product_id], (err, result) => {
      if (err) {
        console.error("Error deleting colors:", err);
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
