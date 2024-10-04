const {
  getAllProducts,
  getCategoryIdByProductId,
} = require("./getAllProducts");
const pool = require("../../db");

const getCountProducts = async (categories, itemIds, search) => {
  let totalProducts = 0;
  const categoryItemsMap = {};

  if (itemIds && itemIds.length > 0) {
    for (const id of itemIds) {
      const productId = Number(id);
      try {
        const categoryId = await getCategoryIdByProductId(productId);
        if (categoryId) {
          if (!categoryItemsMap[categoryId]) {
            categoryItemsMap[categoryId] = [];
          }
          categoryItemsMap[categoryId].push(productId);
        }
      } catch (err) {
        throw err;
      }
    }
  }

  const queries = [];
  const queryParamsList = [];

  if (categories && categories.length > 0) {
    categories.forEach((category) => {
      const itemsForCategory = categoryItemsMap[category] || [];
      let sql = `SELECT COUNT(*) AS total_products FROM products WHERE category_id = ?`;
      const queryParams = [Number(category)];

      if (itemsForCategory.length > 0) {
        sql += ` AND id IN (${itemsForCategory.map(() => "?").join(",")})`;
        queryParams.push(...itemsForCategory.map((id) => Number(id)));
      }

      if (search) {
        search = search
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        sql += ` AND LOWER(REPLACE(REPLACE(title, '  ', ' '), '  ', ' ')) LIKE ?`;
        queryParams.push(`%${search}%`);
      }

      queries.push(sql);
      queryParamsList.push(queryParams);
    });
  } else {
    let sql = `SELECT COUNT(*) AS total_products FROM products WHERE 1=1`;
    const queryParams = [];

    if (search) {
      search = search
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      sql += ` AND LOWER(REPLACE(REPLACE(title, '  ', ' '), '  ', ' ')) LIKE ?`;
      queryParams.push(`%${search}%`);
    }

    queries.push(sql);
    queryParamsList.push(queryParams);
  }

  try {
    const results = await Promise.all(
      queries.map((query, index) => pool.query(query, queryParamsList[index]))
    );

    totalProducts = results.reduce(
      (sum, result) => sum + result[0][0].total_products,
      0
    );

    return [{ total_products: totalProducts }];
  } catch (err) {
    throw err;
  }
};

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
    let limit = null;
    let page = null;
    if (req.query.limit && req.query.page) {
      limit = parseInt(req.query.limit);
      page = parseInt(req.query.page);
    }

    const productData = await getAllProducts(
      categories,
      search,
      itemIds,
      sortField,
      sortOrder,
      limit,
      page
    );

    const totalProducts = await getCountProducts(categories, itemIds, search);
    const total_products = totalProducts[0].total_products;

    res.json({ productData, total_products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllProductsHandler;
