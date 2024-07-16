const db = require("../../db");
const { getAllProducts } = require("./getAllProducts");

const deleteFeedbacks = async (req, res) => {
  const { id } = req.params;

  try {
    await removeFeedbacks(id);

    const productData = await getAllProducts();

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).send("Error deleting feedbacks data");
  }
};

const removeFeedbacks = async (id) => {
  const query = "DELETE FROM feedbacks WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = deleteFeedbacks;
