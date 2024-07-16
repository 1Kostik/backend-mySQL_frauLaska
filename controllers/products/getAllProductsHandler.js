const { getAllProducts } = require("./getAllProducts");

const getAllProductsHandler = async (req, res, next) => {
  try {
    const productData = await getAllProducts();
    res.json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllProductsHandler;
