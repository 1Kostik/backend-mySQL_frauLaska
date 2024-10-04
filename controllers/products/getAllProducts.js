const pool = require("../../db");
const { getImages } = require("./getProduct");

const getCategoryIdByProductId = async (productId) => {
  const sql = `SELECT category_id FROM products WHERE id = ?`;
  const [results] = await pool.query(sql, [productId]);
  return results.length > 0 ? results[0].category_id : null;
};

const getProducts = async (
  categories,
  search,
  itemIds,
  sortField,
  sortOrder,
  limit,
  offset
) => {
  let sql = "";
  const queryParams = [];

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

  if (categories && categories.length > 0) {
    categories.forEach((category, index) => {
      const itemsForCategory = categoryItemsMap[category] || [];
      if (itemsForCategory.length > 0) {
        sql += `
          (
            SELECT p.*, v.price
            FROM products p
            LEFT JOIN (
              SELECT product_id, MIN(price) AS price
              FROM variations
              GROUP BY product_id
            ) v ON p.id = v.product_id
            WHERE p.category_id = ? AND p.id IN (${itemsForCategory
              .map(() => "?")
              .join(",")})
          )
        `;
        queryParams.push(
          Number(category),
          ...itemsForCategory.map((id) => Number(id))
        );
      } else {
        sql += `
          (
            SELECT p.*, v.price
            FROM products p
            LEFT JOIN (
              SELECT product_id, MIN(price) AS price
              FROM variations
              GROUP BY product_id
            ) v ON p.id = v.product_id
            WHERE p.category_id = ?
          )
        `;
        queryParams.push(Number(category));
      }

      if (index < categories.length - 1) {
        sql += " UNION ALL ";
      }
    });
  } else {
    sql = `
      SELECT p.*, v.price
      FROM products p
      LEFT JOIN (
        SELECT product_id, MIN(price) AS price
        FROM variations
        GROUP BY product_id
      ) v ON p.id = v.product_id
      WHERE 1=1
    `;

    if (itemIds && itemIds.length > 0) {
      sql += ` AND p.id IN (${itemIds.map(() => "?").join(",")})`;
      queryParams.push(...itemIds.map((id) => Number(id)));
    }
  }

  if (search) {
    search = search
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    sql +=
      (sql.includes("WHERE") ? " AND" : " WHERE") +
      " LOWER(REPLACE(REPLACE(p.title, '  ', ' '), '  ', ' ')) LIKE ?";
    queryParams.push(`%${search}%`);
  }

  if (sortField && sortOrder) {
    sql += ` ORDER BY ${sortField} ${sortOrder}`;
  } else {
    sql += ` ORDER BY p.id ASC`;
  }

  if (limit !== null && offset !== null) {
    sql += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);
  }

  const [data] = await pool.query(sql, queryParams);
  return data;
};

const getAllProducts = async (
  categories = null,
  search = null,
  itemIds = null,
  sortField = "price",
  sortOrder = "ASC",
  limit = null,
  page = null
) => {
  try {
    const offset = limit && page ? (page - 1) * limit : null;
    const products = await getProducts(
      categories,
      search,
      itemIds,
      sortField,
      sortOrder,
      limit,
      offset
    );
    const productDataPromises = products.map(async (product) => {
      const images = await getImages(product.id);
      const variations = await getVariations(product.id);
      const feedbacks = await getFeedbacks(product.id);

      return {
        ...product,
        imageUrls: [
          ...images.filter((item) => item.img_url.includes(product.main_image)),
          ...images.filter(
            (item) => !item.img_url.includes(product.main_image)
          ),
        ],
        variations: variations.map((item) => item),
        feedbacks: feedbacks.map((item) => item),
      };
    });

    const productData = await Promise.all(productDataPromises);
    return productData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getVariations = async (product_id) => {
  const sql = `SELECT id, price, discount, count, color, size FROM variations WHERE product_id = ?`;
  const [data] = await pool.query(sql, [product_id]);
  return data;
};

const getFeedbacks = async (product_id) => {
  const sql = `SELECT id, name, profession, review FROM feedbacks WHERE product_id = ?`;
  const [data] = await pool.query(sql, [product_id]);
  return data;
};

module.exports = {
  getAllProducts,
  getVariations,
  getFeedbacks,
  getImages,
  getCategoryIdByProductId,
};
