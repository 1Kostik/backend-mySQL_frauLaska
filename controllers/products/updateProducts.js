const pool = require("../../db");
const { saveTableData, uploadImageToCloudinary } = require("./createProducts");
const { getProduct } = require("./getProduct");

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const {
    category_id,
    title,
    description,
    benefit,
    popularity,
    product_code,
    composition,
    variations,
    feedbacks,
    main_image,
  } = req.body;

  const productData = {
    id: Number(id),
    category_id: Number(category_id),
    title,
    description,
    benefit,
    popularity: Number(popularity),
    product_code,
    composition,
    main_image,
  };

  const imageFiles = req.files;

  try {
    if (Object.values(productData).some((field) => field !== undefined)) {
      await updateTableProduct(productData);
    }

    if (imageFiles && imageFiles.length > 0) {
      const folder = `products`;
      const uploadPromises = imageFiles.map((file) =>
        uploadImageToCloudinary(file, folder)
      );
      const imageUrls = await Promise.all(uploadPromises);
      await saveTableData("imageUrls", imageUrls, ["img_url"], (url) => [
        id,
        url,
      ]);
    }

    const idsVariations = variations.map((item) => item.id).filter(Boolean);

    if (variations && variations.length > 0) {
      if (idsVariations.length > 0) {
        const variationsWithId = variations.filter((item) => item.id);
        await updateTableVariations(id, variationsWithId);
      }

      const variationsWithoutId = variations.filter((item) => !item.id);
      if (variationsWithoutId.length > 0) {
        await saveTableData(
          "variations",
          variationsWithoutId,
          ["price", "discount", "count", "color", "size"],
          (item) => [
            id,
            item.price,
            item.discount === "" || Number.isNaN(Number(item.discount))
              ? null
              : item.discount,
            item.count,
            item.color === "" ? null : item.color,
            item.size === "" ? null : item.size,
          ]
        );
      }
    }

    const feedbackIds = feedbacks
      ? feedbacks.map((item) => item.id).filter(Boolean)
      : null;

    if (feedbacks && feedbacks.length > 0) {
      if (feedbackIds.length > 0) {
        const feedbacksWithId = feedbacks.filter((item) => item.id);
        await updateTableFeedbacks(id, feedbacksWithId);
      }

      const feedbacksWithoutId = feedbacks.filter((item) => !item.id);
      if (feedbacksWithoutId.length > 0) {
        await saveTableData(
          "feedbacks",
          feedbacksWithoutId,
          ["name", "profession", "review"],
          (item) => [id, item.name, item.profession, item.review]
        );
      }
    }

    const result = await getProduct(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Error updating data");
  }
};

const updateTableProduct = async (data) => {
  try {
    const fieldsToUpdate = Object.keys(data).filter(
      (key) => key !== "id" && data[key] !== undefined
    );

    if (fieldsToUpdate.length === 0) {
      throw new Error("No fields to update");
    }

    const sql = `
      UPDATE products
      SET ${fieldsToUpdate.map((field) => `${field} = ?`).join(", ")}
      WHERE id = ?
    `;

    const values = fieldsToUpdate.map((field) => data[field]);
    values.push(data.id);

    await pool.execute(sql, values);
  } catch (err) {
    throw err;
  }
};

const updateTableVariations = async (product_id, variations) => {
  try {
    if (!variations || !Array.isArray(variations) || variations.length === 0) {
      throw new Error("Invalid input");
    }

    const connection = await pool.getConnection();

    const updates = variations.map((item) => {
      if (!item.id || item.price === undefined || item.count === undefined) {
        console.error("Missing required fields", item);
        throw new Error("Missing required fields");
      }
      const price = parseFloat(item.price);
      const count = parseInt(item.count, 10);
      const discount =
        item.discount === "" || Number.isNaN(Number(item.discount))
          ? null
          : parseFloat(item.discount);
      const color = item.color === "" ? null : item.color;
      const size = item.size === "" ? null : item.size;

      const query = `
        UPDATE variations 
        SET product_id = ?, price = ?, discount = ?, count = ?, color = ?, size = ? 
        WHERE id = ?
      `;

      return connection.query(query, [
        product_id,
        price,
        discount,
        count,
        color,
        size,
        item.id,
      ]);
    });

    const results = await Promise.all(updates);

    await connection.release();

    return results;
  } catch (error) {
    console.error("Error updating variations:", error);
    throw error;
  }
};

const updateTableFeedbacks = async (product_id, feedbacks) => {
  if (!feedbacks || !Array.isArray(feedbacks) || feedbacks.length === 0) return;

  const updatePromises = feedbacks.map((item) => {
    if (!item.id) return Promise.resolve();

    const { name, profession, review, id } = item;
    return pool.query(
      "UPDATE feedbacks SET product_id = ?, name = ?, profession = ?, review = ? WHERE id = ?",
      [product_id, name, profession, review, id]
    );
  });

  await Promise.all(updatePromises);

  const newFeedbacks = feedbacks.filter((item) => !item.id);
  if (newFeedbacks.length > 0) {
    await saveTableData(
      "feedbacks",
      product_id,
      newFeedbacks,
      ["name", "profession", "review"],
      (item) => [product_id, item.name, item.profession, item.review]
    );
  }
};

const getVariationCount = async (id) => {
  const sql = `SELECT count FROM variations WHERE id = ?`;
  const [data] = await pool.query(sql, [id]);
  return data[0].count;
};

const getPopularity = async (id) => {
  const sql = `SELECT popularity FROM products WHERE id = ?`;
  const [data] = await pool.query(sql, [id]);
  return data[0].popularity;
};

const increaseVariationCount = async (variation_id, count) => {
  const prevCount = await getVariationCount(variation_id);
  const newCount = prevCount + count;

  if (!variation_id || typeof newCount !== "number") {
    throw new Error("Invalid input");
  }

  const query = "UPDATE variations SET count = ? WHERE id = ?";
  await pool.query(query, [newCount, variation_id]);
};

const decreaseVariationCount = async (variation_id, count) => {
  const prevCount = await getVariationCount(variation_id);
  const newCount = prevCount - count;

  if (!variation_id || typeof newCount !== "number") {
    throw new Error("Invalid input");
  }

  const query = "UPDATE variations SET count = ? WHERE id = ?";
  await pool.query(query, [newCount, variation_id]);
};

const increasePopularity = async (product_id) => {
  const prevCount = await getPopularity(product_id);
  const newCount = prevCount + 1;

  if (!product_id) {
    throw new Error("Invalid input");
  }

  const query = "UPDATE products SET popularity = ? WHERE id = ?";
  await pool.query(query, [newCount, product_id]);
};

module.exports = {
  updateProducts,
  increaseVariationCount,
  decreaseVariationCount,
  increasePopularity,
};
