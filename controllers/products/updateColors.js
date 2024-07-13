const db = require("../../db");
const getAllProducts = require("./getAllProducts");

const updateColors = async (req, res, next) => {
  const { id } = req.params;
  const { colors } = req.body;

  try {
    if (colors && colors.length > 0) {
      await updateTableColors(id, colors);
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
const updateTableColors = async (product_id, colors) => {
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
  return Promise.all(promises);
};
module.exports = updateColors;
