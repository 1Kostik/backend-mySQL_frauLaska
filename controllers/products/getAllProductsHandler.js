const { getAllProducts } = require("./getAllProducts");

const getAllProductsHandler = async (req, res, next) => {
  try {
    let categories = null;
    if (req.query.categoryId) {
      categories = Array.isArray(req.query.categoryId)
        ? req.query.categoryId.map((cat) => parseInt(cat))
        : [parseInt(req.query.categoryId)];
    }

    const search = req.query.search || null;
    let itemIds = null;
    if (req.query.productId) {
      itemIds = Array.isArray(req.query.productId)
        ? req.query.productId.map((id) => parseInt(id))
        : [parseInt(req.query.productId)];
    }

    const sortField = req.query.sortField || "price";
    const sortOrder = req.query.sortOrder || "ASC";
    const limit = parseInt(req.query.limit) || 12;
    const page = parseInt(req.query.page) || 1;

    const productData = await getAllProducts(
      categories,
      search,
      itemIds,
      sortField,
      sortOrder,
      limit,
      page
    );

    res.json(productData);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllProductsHandler;