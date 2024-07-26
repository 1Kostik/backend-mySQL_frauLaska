const getProduct = require("./getProduct");

const getProductHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const productData = await getProduct(id);
    res.status(200).json(productData);
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProductHandler;
