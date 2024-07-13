const db = require("../../db");
const getAllProducts = require("./getAllProducts");

const deleteVolumes = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteVol(id);

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

const deleteVol = async (id) => {
  const query = "DELETE FROM volumes WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error deleting imageUrls:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = deleteVolumes;
