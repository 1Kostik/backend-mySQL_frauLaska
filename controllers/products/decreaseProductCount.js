const { decreaseVariationCount } = require("./updateProducts");

const decreaseProductCount = async (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  try {
    await decreaseVariationCount(id, count);
    res.status(200).json({ message: "Variation count updated" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Помилка при оновленні даних");
  }
};

module.exports = decreaseProductCount;
