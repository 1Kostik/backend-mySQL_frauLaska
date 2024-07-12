const updateProducts = async (req, res, next) => {
  const {
    id,
    category_id,
    title,
    description,
    discount,
    stockCount,
    ranking,
    benefit,
    popularity,
    productCode,
    composition,
    volumes,
    colors,
    imageUrls,
  } = req.body;

  const productData = {
    id,
    category_id,
    title,
    description,
    discount,
    stockCount,
    ranking,
    benefit,
    popularity,
    productCode,
    composition,
  };

  try {
    if (
      title ||
      description ||
      discount ||
      stockCount ||
      ranking ||
      benefit ||
      popularity ||
      productCode ||
      composition
    ) {
      await updateTableProduct(productData);
    }

    if (imageUrls && imageUrls.length !== 0) {
      await updateTableImages(id, imageUrls);
    }

    if (volumes && volumes.length !== 0) {
      await updateTableVolumes(id, volumes);
    }

    if (colors && colors.length !== 0) {
      await updateTableColors(id, colors);
    }

    res.status(200).send("Дані успішно оновлено у відповідних таблицях");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Помилка при оновленні даних");
  }
  const updateTableProduct = async (data) => {
    return new Promise((resolve, reject) => {
      let query = "UPDATE products SET ";
      const fields = [];
      const values = [];
      for (const key in data) {
        if (key !== "id" && data[key] !== undefined) {
          fields.push(`${key} = ?`);
          values.push(data[key]);
        }
      }
      if (fields.length === 0) {
        return reject("No fields to update");
      }
      query += fields.join(", ") + " WHERE id = ?";
      values.push(data.id);

      db.query(query, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  };
  const updateTableImages = async (product_id, images) => {
    return new Promise((resolve, reject) => {
      if (
        !product_id ||
        !images ||
        !Array.isArray(images) ||
        images.length === 0
      ) {
        return reject("Invalid input");
      }

      const query =
        "UPDATE imageUrls SET product_id = ?, img_url = ? WHERE id = ?";
      const promises = images.map((image) => {
        return new Promise((res, rej) => {
          if (!image.id || !image.img_url) {
            return rej("Missing required fields");
          }
          db.query(
            query,
            [product_id, image.img_url, image.id],
            (err, result) => {
              if (err) return rej(err);
              res(result);
            }
          );
        });
      });

      Promise.all(promises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  };
  const updateTableVolumes = async (product_id, volumes) => {
    return new Promise((resolve, reject) => {
      if (
        !product_id ||
        !volumes ||
        !Array.isArray(volumes) ||
        volumes.length === 0
      ) {
        return reject("Invalid input");
      }
      const query =
        "UPDATE volumes SET product_id = ?,size = ?, price = ? WHERE id = ?";
      const promises = volumes.map((item) => {
        return new Promise((res, rej) => {
          if (!item.id || !item.size || !item.price) {
            return rej("Missing required fields");
          }
          db.query(
            query,
            [product_id, item.size, item.price, item.id],
            (err, result) => {
              if (err) return rej(err);
              res(result);
            }
          );
        });
      });

      Promise.all(promises)
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });
  };
  const updateTableColors = async (product_id, colors) => {
    return new Promise((resolve, reject) => {
      if (
        !product_id ||
        !colors ||
        !Array.isArray(colors) ||
        colors.length === 0
      ) {
        return reject("Invalid input");
      }
      const query = "UPDATE colors SET product_id = ?, color = ?  WHERE id = ?";
      const promises = colors.map((item) => {
        return new Promise((res, rej) => {
          if (!item.id || !item.color) {
            return rej("Missing required fields");
          }
          db.query(query, [product_id, item.color, item.id], (err, result) => {
            if (err) return reject(err);
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

module.exports = updateProducts;
