const db = require("../../db");

const getProducts = async (
  categories,
  search,
  itemIds,
  sortField,
  sortOrder,
  limit,
  offset
) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT DISTINCT p.*, v.price
      FROM products p
      LEFT JOIN (
        SELECT product_id, MIN(price) AS price
        FROM variations
        GROUP BY product_id
      ) v ON p.id = v.product_id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const queryParams = [];

    // Добавляем фильтрацию по категориям
    if (categories) {
      if (Array.isArray(categories)) {
        if (categories.length > 0) {
          const placeholders = categories.map(() => "?").join(",");
          sql += ` AND c.id IN (${placeholders})`;
          queryParams.push(...categories.map((id) => Number(id)));
        }
      } else {
        sql += ` AND c.id = ?`;
        queryParams.push(Number(categories));
      }
    }
    if (search) {
      // Приводимо пошуковий запит до нижнього регістру та видаляємо додаткові пробіли
      search = search
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      // Приводимо назви продуктів у базі даних до нижнього регістру та видаляємо зайві пробіли
      sql +=
        " AND LOWER(REPLACE(REPLACE(p.title, '  ', ' '), '  ', ' ')) LIKE ?";
      queryParams.push(`%${search}%`);
    }

    // Добавляем фильтрацию по идентификаторам товаров
    if (itemIds && itemIds.length > 0) {
      const placeholders = itemIds.map(() => "?").join(",");
      sql += ` AND p.id IN (${placeholders})`;
      queryParams.push(...itemIds.map((id) => Number(id)));
    }

    // Добавляем сортировку
    if (sortField && sortOrder) {
      sql += ` ORDER BY ${sortField} ${sortOrder}`;
    } else {
      sql += ` ORDER BY p.id ASC`; // Сортировка по умолчанию
    }

    // Добавляем пагинацию, если limit и offset указаны
    if (limit !== null && offset !== null) {
      sql += ` LIMIT ? OFFSET ?`;
      queryParams.push(limit, offset);
    }

    db.query(sql, queryParams, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
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
        imageUrls: images.map((item) => item),
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

const getImages = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT img_url,id FROM imageUrls WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getVariations = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, price,discount,count,color,size FROM variations WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getFeedbacks = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id,name,profession,review FROM feedbacks WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

module.exports = { getAllProducts, getVariations, getFeedbacks, getImages };
