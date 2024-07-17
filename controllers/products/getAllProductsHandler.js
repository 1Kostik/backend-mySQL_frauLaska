const { getAllProducts } = require("./getAllProducts");

const getAllProductsHandler = async (req, res, next) => {
  try {
    const category = req.query.category || null;
    const search = req.query.search || null;
    const itemIds = req.query.items ? req.query.items.split(",") : null;
    const sortField = req.query.sortField || 'price';
    const sortOrder = req.query.sortOrder || 'ASC';
    const limit = parseInt(req.query.limit) || 12;
    const page = parseInt(req.query.page) || 1;

    const productData = await getAllProducts(
      category,
      search,
      itemIds,
      sortField,
      sortOrder,
      limit,
      page
    );
    res.json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllProductsHandler;


// const getAllProductsHandler = async (req, res, next) => {
//   try {
//     const productData = await getAllProducts();
//     res.json(productData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };