const getOrderById = require("./getOrdersById");

const getOrderHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await getOrderById(id);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: error.message });
  }
};
module.exports = getOrderHandler;
