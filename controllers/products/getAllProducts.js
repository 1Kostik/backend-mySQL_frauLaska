const db = require("../../db");

const getCategoryIdByProductId = async (productId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT category_id FROM products WHERE id = ?`;
    db.query(sql, [productId], (err, results) => {
      if (err) return reject(err);
      resolve(results.length > 0 ? results[0].category_id : null);
    });
  });
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
  return new Promise(async (resolve, reject) => {
    let sql = '';
    const queryParams = [];

    // Разделяем itemIds по категориям
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

    if (categories && categories.length > 0) {
      categories.forEach((category, index) => {
        const itemsForCategory = categoryItemsMap[category] || [];
        if (itemsForCategory.length > 0) {
          // Если есть конкретные товары для текущей категории
          sql += `
            (
              SELECT p.*, v.price
              FROM products p
              LEFT JOIN (
                SELECT product_id, MIN(price) AS price
                FROM variations
                GROUP BY product_id
              ) v ON p.id = v.product_id
              WHERE p.category_id = ? AND p.id IN (${itemsForCategory.map(() => '?').join(',')})
            )
          `;
          queryParams.push(Number(category), ...itemsForCategory.map(id => Number(id)));
        } else {
          // Если нет конкретных товаров для текущей категории, выбираем все товары
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
          sql += ' UNION ALL ';
        }
      });
    } else {
      // Если категории не указаны, выбираем все продукты
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

      // Добавляем фильтрацию по идентификаторам товаров, если указаны
      if (itemIds && itemIds.length > 0) {
        sql += ` AND p.id IN (${itemIds.map(() => '?').join(',')})`;
        queryParams.push(...itemIds.map(id => Number(id)));
      }
    }

    // Добавляем фильтрацию по поисковому запросу
    if (search) {
      search = search.toLowerCase().replace(/_/g, " ").replace(/\s+/g, " ").trim();
      sql += (sql.includes('WHERE') ? ' AND' : ' WHERE') + " LOWER(REPLACE(REPLACE(p.title, '  ', ' '), '  ', ' ')) LIKE ?";
      queryParams.push(`%${search}%`);
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

    console.log("SQL:", sql);
    console.log("Query Params:", queryParams);

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
    const sql = `SELECT img_url, id FROM imageUrls WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getVariations = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, price, discount, count, color, size FROM variations WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getFeedbacks = async (product_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name, profession, review FROM feedbacks WHERE product_id = ?`;
    db.query(sql, [product_id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

module.exports = { getAllProducts, getVariations, getFeedbacks, getImages };
