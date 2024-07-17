const db = require("../../db");

const getProducts = async (
  category,
  search,
  itemIds,
  sortField,
  sortOrder,
  limit,
  offset
) => {
  return new Promise((resolve, reject) => {
    let sql = `
      SELECT DISTINCT p.*, v.price, i.img_url
      FROM products p
      LEFT JOIN (
        SELECT product_id, MIN(price) AS price
        FROM variations
        GROUP BY product_id
      ) v ON p.id = v.product_id
      LEFT JOIN (
        SELECT product_id, GROUP_CONCAT(img_url SEPARATOR ', ') AS img_url
        FROM imageUrls
        GROUP BY product_id
      ) i ON p.id = i.product_id
      LEFT JOIN categories c ON p.category_id = c.id  -- Соединяем с таблицей категорий
    `;
    const queryParams = [];

    // Добавляем фильтрацию по категории
    if (category) {
      sql += " WHERE c.id = ?";  // Используем поле title из таблицы categories
      queryParams.push(category);
    }

    // Добавляем поиск по названию продукта
    if (search) {
      sql += category ? " AND p.name LIKE ?" : " WHERE p.name LIKE ?";
      queryParams.push(`%${search}%`);
    }

    // Добавляем фильтрацию по идентификаторам товаров
    if (itemIds && itemIds.length > 0) {
      const placeholders = itemIds.map(() => "?").join(",");
      sql +=
        category || search
          ? ` AND p.id IN (${placeholders})`
          : ` WHERE p.id IN (${placeholders})`;
      queryParams.push(...itemIds);
    }

    // Добавляем сортировку
    if (sortField && sortOrder) {
      sql += ` ORDER BY ${sortField} ${sortOrder}`;
    } else {
      sql += ` ORDER BY p.id ASC`; // Сортировка по умолчанию
    }

    // Добавляем пагинацию
    sql += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    db.query(sql, queryParams, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};


const getAllProducts = async (
  category = null,
  search = null,
  itemIds = null,
  sortField = "price",
  sortOrder = "ASC",
  limit = 12,
  page = 1
) => {
  try {
    const offset = (page - 1) * limit;
    const products = await getProducts(
      category,
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
/*

// Маршрут для получения продуктов с пагинацией, сортировкой, фильтрацией и поиском
app.get('/items', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sortField = req.query.sortField || 'id'; // Поле для сортировки, по умолчанию 'id'
  const sortOrder = req.query.sortOrder || 'ASC'; // Порядок сортировки, по умолчанию 'ASC'
  const category = req.query.category; // Категория для фильтрации
  const search = req.query.search; // Строка поиска
  const items = req.query.items ? req.query.items.split(',') : null; // Массив идентификаторов товаров

  let baseQuery = 'SELECT * FROM items';
  let countQuery = 'SELECT COUNT(*) AS count FROM items';
  const queryParams = [];
  const countParams = [];

  // Если указана категория, добавляем ее в запрос
  if (category) {
    baseQuery += ' WHERE category = ?';
    countQuery += ' WHERE category = ?';
    queryParams.push(category);
    countParams.push(category);
  }

  // Если указана строка поиска, добавляем условие для поиска по названию
  if (search) {
    if (category) {
      baseQuery += ' AND name LIKE ?';
      countQuery += ' AND name LIKE ?';
    } else {
      baseQuery += ' WHERE name LIKE ?';
      countQuery += ' WHERE name LIKE ?';
    }
    queryParams.push(`%${search}%`);
    countParams.push(`%${search}%`);
  }

  // Если указан массив идентификаторов товаров, добавляем условие для фильтрации по товарам
  if (items && items.length > 0) {
    const placeholders = items.map(() => '?').join(',');
    if (category || search) {
      baseQuery += ` AND id IN (${placeholders})`;
      countQuery += ` AND id IN (${placeholders})`;
    } else {
      baseQuery += ` WHERE id IN (${placeholders})`;
      countQuery += ` WHERE id IN (${placeholders})`;
    }
    queryParams.push(...items);
    countParams.push(...items);
  }

  // Добавляем сортировку и пагинацию
  baseQuery += ' ORDER BY ?? ?? LIMIT ? OFFSET ?';
  queryParams.push(sortField, sortOrder, limit, offset);

  // Подсчет общего количества записей с учетом фильтрации и поиска
  pool.query(countQuery, countParams, (err, countResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const totalItems = countResult[0].count;
    const totalPages = Math.ceil(totalItems / limit);

    // Запрос на получение данных с учетом фильтрации, сортировки и пагинации
    pool.query(baseQuery, queryParams, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({
        page,
        limit,
        totalPages,
        totalItems,
        items: results,
      });
    });
  });
});


======================================================================================
const getProducts = async (category, search, itemIds, sortField, sortOrder, limit, offset) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM products`;
    const queryParams = [];

    // Добавляем фильтрацию по категории
    if (category) {
      sql += ' WHERE category = ?';
      queryParams.push(category);
    }

    // Добавляем поиск по названию
    if (search) {
      sql += category ? ' AND name LIKE ?' : ' WHERE name LIKE ?';
      queryParams.push(`%${search}%`);
    }

    // Добавляем фильтрацию по идентификаторам товаров
    if (itemIds && itemIds.length > 0) {
      const placeholders = itemIds.map(() => '?').join(',');
      sql += (category || search) ? ` AND id IN (${placeholders})` : ` WHERE id IN (${placeholders})`;
      queryParams.push(...itemIds);
    }

    // Добавляем сортировку
    if (sortField && sortOrder) {
      sql += ` ORDER BY ?? ??`;
      queryParams.push(sortField, sortOrder);
    } else {
      sql += ` ORDER BY id ASC`; // Сортировка по умолчанию
    }

    // Добавляем пагинацию
    sql += ` LIMIT ? OFFSET ?`;
    queryParams.push(limit, offset);

    db.query(sql, queryParams, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const getAllProducts = async (category = null, search = null, itemIds = null, sortField = 'id', sortOrder = 'ASC', limit = 10, page = 1) => {
  try {
    const offset = (page - 1) * limit;
    const products = await getProducts(category, search, itemIds, sortField, sortOrder, limit, offset);
    const productDataPromises = products.map(async (product) => {
      const images = await getImages(product.id);
      const variations = await getVariations(product.id);
      const feedbacks = await getFeedbacks(product.id);
      return {
        ...product,
        imageUrls: images.map(item => item),
        variations: variations.map(item => item),
        feedbacks: feedbacks.map(item => item),
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

const getAllProductsHandler = async (req, res, next) => {
  try {
    const category = req.query.category || null;
    const search = req.query.search || null;
    const itemIds = req.query.items ? req.query.items.split(',') : null;
    const sortField = req.query.sortField || 'id';
    const sortOrder = req.query.sortOrder || 'ASC';
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const productData = await getAllProducts(category, search, itemIds, sortField, sortOrder, limit, page);
    res.json(productData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

======================================================================================
GET http://localhost:3000/items?page=1&limit=10&sortField=name&sortOrder=ASC&category=electronics&search=phone&items=1,2,3

*/
