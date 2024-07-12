const deleteProducts = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVolumes(id);
    await deleteColors(id);
    await deleteImageUrls(id);
    await deleteProduct(id);

    res.status(200).send("Deletion successful");
  } catch (error) {
    console.error("Error in /deleteProductData:", error);
    res.status(500).send("Error deleting product data");
  }

  const deleteProduct = async (id, category_id) => {
    const query = "DELETE FROM products   WHERE id = ?";
    return new Promise((res, rej) => {
      db.query(query, [id], (err, result) => {
        if (err) {
          console.error("Error deleting product:", err);
          return rej(err);
        }
        res(result);
      });
    });
  };
  const deleteVolumes = async (product_id) => {
    return new Promise((resolve, reject) => {
      if (!product_id) {
        return reject("Invalid input");
      }

      const query = "DELETE FROM volumes WHERE product_id = ?";
      const promises = data.map((item) => {
        return new Promise((res, rej) => {
          if (!item.id) {
            return rej("Missing required fields");
          }
          db.query(query, [product_id], (err, result) => {
            if (err) return rej(err);
            res(result);
          });
        });
      });

      Promise.all(promises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  };
  const deleteColors = async (product_id) => {
    return new Promise((resolve, reject) => {
      if (!product_id) {
        return reject("Invalid input");
      }

      const query = "DELETE FROM colors WHERE product_id = ?";
      const promises = data.map((item) => {
        return new Promise((res, rej) => {
          if (!item.id) {
            return rej("Missing required fields");
          }
          db.query(query, [product_id], (err, result) => {
            if (err) return rej(err);
            res(result);
          });
        });
      });

      Promise.all(promises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  };
  const deleteImageUrls = async (product_id) => {
    return new Promise((resolve, reject) => {
      if (!product_id) {
        return reject("Invalid input");
      }

      const query = "DELETE FROM imageUrls WHERE product_id = ?";
      const promises = data.map((item) => {
        return new Promise((res, rej) => {
          if (!item.id) {
            return rej("Missing required fields");
          }
          db.query(query, [product_id], (err, result) => {
            if (err) return rej(err);
            res(result);
          });
        });
      });

      Promise.all(promises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  };
};
module.exports = deleteProducts;

/*
const deleteProducts = async (req, res) => {
  const { id, product, category_id, volumes, colors, imageUrls } = req.body;

  try {
    if (volumes && volumes.length !== 0) {
      await deleteVolumes(id, volumes);
    }
    if (colors && colors.length !== 0) {
      await deleteColors(id, colors);
    }
    if (imageUrls && imageUrls.length !== 0) {
      await deleteImageUrls(id, imageUrls);
    }
    if (product !== "") {
      await deleteProduct(id, category_id);
    }
    res.status(200).send("Deletion successful");
  } catch (error) {
    console.error("Error in /deleteProductData:", error);
    res.status(500).send("Error deleting product data");
  }

  const deleteProduct = async (id, category_id) => {
    const query = "DELETE FROM products   WHERE id = ? AND category_id = ?";
    return new Promise((res, rej) => {
      db.query(query, [id, category_id], (err, result) => {
        if (err) {
          console.error("Error deleting product:", err);
          return rej(err);
        }
        res(result);
      });
    });
  };
  const deleteVolumes = async (product_id, data) => {
    return new Promise((resolve, reject) => {
      if (!product_id || !data || !Array.isArray(data) || data.length === 0) {
        return reject("Invalid input");
      }

      const query = "DELETE FROM volumes WHERE product_id = ? AND id = ?";
      const promises = data.map((item) => {
        return new Promise((res, rej) => {
          if (!item.id) {
            return rej("Missing required fields");
          }
          db.query(query, [product_id, item.id], (err, result) => {
            if (err) return rej(err);
            res(result);
          });
        });
      });

      Promise.all(promises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  };
  const deleteColors = async (product_id, data) => {
    return new Promise((resolve, reject) => {
      if (!product_id || !data || !Array.isArray(data) || data.length === 0) {
        return reject("Invalid input");
      }

      const query = "DELETE FROM colors WHERE product_id = ? AND id = ?";
      const promises = data.map((item) => {
        return new Promise((res, rej) => {
          if (!item.id) {
            return rej("Missing required fields");
          }
          db.query(query, [product_id, item.id], (err, result) => {
            if (err) return rej(err);
            res(result);
          });
        });
      });

      Promise.all(promises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  };
  const deleteImageUrls = async (product_id, data) => {
    return new Promise((resolve, reject) => {
      if (!product_id || !data || !Array.isArray(data) || data.length === 0) {
        return reject("Invalid input");
      }

      const query = "DELETE FROM imageUrls WHERE product_id = ? AND id = ?";
      const promises = data.map((item) => {
        return new Promise((res, rej) => {
          if (!item.id) {
            return rej("Missing required fields");
          }
          db.query(query, [product_id, item.id], (err, result) => {
            if (err) return rej(err);
            res(result);
          });
        });
      });

      Promise.all(promises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  };
};
module.exports = deleteProducts;
*/
