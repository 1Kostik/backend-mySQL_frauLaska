const db = require("../../db");
const {
  getAllProducts,
  getFeedbacks,
  getVariations,
} = require("./getAllProducts");

const { saveTableData, uploadImageToCloudinary } = require("./createProducts");

const updateProducts = async (req, res, next) => {
  const { id } = req.params;
  const {
    category_id,
    title,
    description,
    ranking,
    benefit,
    popularity,
    productCode,
    composition,
    variations,
    feedbacks,
  } = req.body;

  const productData = {
    id,
    category_id,
    title,
    description,
    ranking,
    benefit,
    popularity,
    productCode,
    composition,
  };
  const imageFiles = req.files;
  const product_id = id;
;
  try {
    if (
      title ||
      description ||
      ranking ||
      benefit ||
      popularity ||
      productCode ||
      composition
    ) {
      await updateTableProduct(productData);
    }
    if (imageFiles && imageFiles.length > 0) {
      const folder = `products`;
      const uploadPromises = imageFiles.map((file) =>
        uploadImageToCloudinary(file, folder)
      );
      const imageUrls = await Promise.all(uploadPromises);
      await saveTableData(
        "imageUrls",
        product_id,
        imageUrls,
        ["img_url"],
        (url) => [product_id, url]
      );
    }
    const idsVariations = variations.map(item => item.id).filter(Boolean);

    if (variations && variations.length > 0) {
      if (idsVariations.length > 0) {
        const variationsWithId = variations.filter(item => item.id);
        await updateTableVariations(product_id, variationsWithId);
      }
    
      const variationsWithoutId = variations.filter(item => !item.id);
      if (variationsWithoutId.length > 0) {
        await saveTableData(
          "variations",
          product_id,
          variationsWithoutId,
          ["price", "discount", "count", "color", "size"],
          (item) => [
            product_id,
            item.price,
            item.discount === "" ? undefined : item.discount,
            item.count,
            item.color,
            item.size,
          ]
        );
      }
    }
    const feedbackIds = feedbacks.map(item => item.id).filter(Boolean);

if (feedbacks && feedbacks.length > 0) {
  if (feedbackIds.length > 0) {
    const feedbacksWithId = feedbacks.filter(item => item.id);
    await updateTableFeedbacks(product_id, feedbacksWithId);
  }

  const feedbacksWithoutId = feedbacks.filter(item => !item.id);
  if (feedbacksWithoutId.length > 0) {
    await saveTableData(
      "feedbacks",
      product_id,
      feedbacksWithoutId,
      ["name", "profession", "review"],
      (item) => [product_id, item.name, item.profession, item.review]
    );
  }
}
    const result = await getAllProducts();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Помилка при оновленні даних");
  }
};
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

const updateTableVariations = async (product_id, variations) => {
  return new Promise((resolve, reject) => {
    if (!variations || !Array.isArray(variations) || variations.length === 0) {
      return reject("Invalid input");
    }

    const query = `
      UPDATE variations 
      SET 
        product_id = ?, 
        price = ?, 
        discount = ?, 
        count = ?, 
        color = ?, 
        size = ? 
      WHERE id = ?
    `;

    const promises = variations.map((item) => {
      return new Promise((res, rej) => {
        if (!item.id || item.price === undefined || item.count === undefined) {
          console.error("Missing required fields", item);
          return rej("Missing required fields");
        }
        const price = parseFloat(item.price);
        const count = parseInt(item.count, 10);
        const discount = item.discount === "" ? null : parseFloat(item.discount);
        const color = item.color === "" ? null : item.color;
        const size = item.size === "" ? null : item.size;  
        db.query(
          query,
          [product_id, price, discount, count, color, size, item.id],
          (err, result) => {
            if (err) {
              console.error("Error updating variation:", err);
              return rej(err);
            }           
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
const updateTableFeedbacks = async (product_id, feedbacks) => {
  return new Promise((resolve, reject) => {
    if (
      !product_id ||
      !feedbacks ||
      !Array.isArray(feedbacks) ||
      feedbacks.length === 0
    ) {
      return reject("Invalid input");
    }
    const query =
      "UPDATE feedbacks SET product_id = ?, name = ?, profession = ?, review = ? WHERE id = ?";
    const promises = feedbacks.map((item) => {
      return new Promise((res, rej) => {
        if (!item.id || !item.name || !item.profession || !item.review) {
          return rej("Missing required fields");
        }
        db.query(
          query,
          [product_id, item.name, item.profession, item.review, item.id],
          (err, result) => {
            if (err) return reject(err);
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
module.exports = updateProducts;