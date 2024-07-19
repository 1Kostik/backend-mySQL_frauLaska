const db = require("../../db");

const deleteCategories = async (req, res, next) => {
  const { id: categoryId } = req.params;
  const selectSql = `SELECT * FROM categories`;
  const deletePhotosQuery = `
  DELETE FROM imageUrls
  WHERE product_id IN (
    SELECT product_id
    FROM products
    WHERE category_id = ?
  )
`;
  const deleteVariationsQuery = `
  DELETE FROM variations
  WHERE product_id IN (
    SELECT product_id
    FROM products
    WHERE category_id = ?
  )
`;
  const deleteFeedbacksQuery = `
  DELETE FROM feedbacks
  WHERE product_id IN (
    SELECT product_id
    FROM products
    WHERE category_id = ?
  )
`;
  const deleteProductsQuery = `
  DELETE FROM products
  WHERE category_id = ?
`;
  const deleteCategoryQuery = `
  DELETE FROM categories
  WHERE id = ?
`;

  try {
    await executeQuery(deletePhotosQuery, [categoryId]);
    await executeQuery(deleteVariationsQuery, [categoryId]);
    await executeQuery(deleteFeedbacksQuery, [categoryId]);
    await executeQuery(deleteProductsQuery, [categoryId]);
    await executeQuery(deleteCategoryQuery, [categoryId]);

    const categories = await executeQuery(selectSql);

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};

const executeQuery = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = deleteCategories;
