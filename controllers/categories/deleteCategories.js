const pool = require("../../db");

const deleteCategories = async (req, res, next) => {
  const { id: categoryId } = req.params;

  try {
    const [products] = await pool.execute(
      "SELECT product_id FROM products WHERE category_id = ?",
      [categoryId]
    );

    const productIds = products.map((product) => product.product_id);

    if (productIds.length > 0) {
      await pool.execute("DELETE FROM imageUrls WHERE product_id IN (?)", [
        productIds,
      ]);
      await pool.execute("DELETE FROM variations WHERE product_id IN (?)", [
        productIds,
      ]);
      await pool.execute("DELETE FROM feedbacks WHERE product_id IN (?)", [
        productIds,
      ]);
    }

    await pool.execute("DELETE FROM products WHERE category_id = ?", [
      categoryId,
    ]);

    await pool.execute("DELETE FROM categories WHERE id = ?", [categoryId]);

    const [categories] = await pool.execute("SELECT * FROM categories");

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = deleteCategories;
