const { getAllProducts, getCategoryIdByProductId } = require("./getAllProducts");
const db = require("../../db");

const getCountProducts = async (categories, itemIds, search) => {
  return new Promise(async (resolve, reject) => {
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
          return reject(err);
        }
      }
    }

    const queries = [];
    const queryParams = [];

    if (categories && categories.length > 0) {
      categories.forEach((category, index) => {
        const itemsForCategory = categoryItemsMap[category] || [];
        if (itemsForCategory.length > 0) {
          // Если есть конкретные товары для текущей категории
          let sql = `
            SELECT COUNT(*) AS total_products
            FROM products
            WHERE category_id = ? AND id IN (${itemsForCategory.map(() => '?').join(',')})
          `;
          if (search) {
            search = search.toLowerCase().replace(/_/g, " ").replace(/\s+/g, " ").trim();
            sql += ` AND LOWER(REPLACE(REPLACE(title, '  ', ' '), '  ', ' ')) LIKE ?`;
            queryParams.push(`%${search}%`);
          }
          queries.push(sql);
          queryParams.push([Number(category), ...itemsForCategory.map(id => Number(id))]);
        } else {
          // Если нет конкретных товаров для текущей категории, выбираем все товары
          let sql = `
            SELECT COUNT(*) AS total_products
            FROM products
            WHERE category_id = ?
          `;
          if (search) {
            search = search.toLowerCase().replace(/_/g, " ").replace(/\s+/g, " ").trim();
            sql += ` AND LOWER(REPLACE(REPLACE(title, '  ', ' '), '  ', ' ')) LIKE ?`;
            queryParams.push(`%${search}%`);
          }
          queries.push(sql);
          queryParams.push([Number(category)]);
        }
      });
    } else {
      // Если категории не указаны, выбираем все продукты
      let sql = `
        SELECT COUNT(*) AS total_products
        FROM products
        WHERE 1=1
      `;
      if (search) {
        search = search.toLowerCase().replace(/_/g, " ").replace(/\s+/g, " ").trim();
        sql += ` AND LOWER(REPLACE(REPLACE(title, '  ', ' '), '  ', ' ')) LIKE ?`;
        queryParams.push(`%${search}%`);
      }
      queries.push(sql);
    }

    try {
      const results = await Promise.all(
        queries.map((query, index) => 
          new Promise((resolve, reject) => {
            db.query(query, queryParams[index], (err, result) => {
              if (err) return reject(err);
              resolve(result[0].total_products);
            });
          })
        )
      );

      totalProducts = results.reduce((sum, count) => sum + count, 0);
      resolve([{ total_products: totalProducts }]);
    } catch (err) {
      reject(err);
    }
  });
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
    const totalProducts = await getCountProducts(categories,itemIds,search);
    const total_products = totalProducts[0].total_products;

    res.json({ productData, total_products});
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllProductsHandler;
