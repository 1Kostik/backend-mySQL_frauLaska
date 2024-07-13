const db = require("../../db");
const getAllProducts = require("./getAllProducts");

const updateVolumes = async (req, res, next) => {
  const { id } = req.params;
  const { volumes } = req.body;

  try {
    if (volumes && volumes.length > 0) {
      await updateTableVolumes(id, volumes);
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

const updateTableVolumes = async (product_id, volumes) => {
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

  return Promise.all(promises);
};
module.exports = updateVolumes;
