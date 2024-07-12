const createProducts = async (req, res, next) => {
  const {
    category_id,
    title,
    description,
    discount,
    stockCount,
    ranking,
    benefit,
    popularity,
    productCode,
    composition,
    volumes,
    colors,
    imageUrls,
  } = req.body;

  const productData = {
    category_id,
    title,
    description,
    discount,
    stockCount,
    ranking,
    benefit,
    popularity,
    productCode,
    composition,
  };

  try {
    const product_id = await saveTableProduct(productData);
    await saveTableImages(product_id, imageUrls);
    await saveTableColors(product_id, colors);
    await saveTableVolumes(product_id, volumes);

    const addedProductData = {
      ...productData,
      id: product_id,
      images: imageUrls,
      volumes: volumes,
      colors: colors,
    };

    res.status(200).json({
      message: "Дані успішно додані до всіх таблиць",
      product: addedProductData,
    });
  } catch (error) {
    console.error("Помилка при додаванні даних:", error);
    res.status(500).send("Помилка при додаванні даних");
  }

  const saveTableProduct = async (data) => {
    const {
      category_id,
      title,
      description,
      discount,
      stockCount,
      ranking,
      benefit,
      popularity,
      productCode,
      composition,
    } = data;
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO products (category_id,title,description,discount,stockCount,ranking,benefit,popularity,productCode,composition)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
      db.query(
        sql,
        [
          category_id,
          title,
          description,
          discount,
          stockCount,
          ranking,
          benefit,
          popularity,
          productCode,
          composition,
        ],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          const product_id = result.insertId;
          resolve(product_id);
        }
      );
    });
  };
  const saveTableImages = async (product_id, data) => {
    return new Promise((resolve, reject) => {
      if (data.length === 0) {
        return resolve("No images to insert");
      }
      const values = data.map((url) => [product_id, url]);
      const sql = `INSERT INTO imageUrls (product_id,img_url) VALUES ?`;
      db.query(sql, [values], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };

  const saveTableColors = async (product_id, data) => {
    return new Promise((resolve, reject) => {
      if (data.length === 0) {
        return resolve("No colors to insert");
      }
      const values = data.map((color) => [product_id, color]);
      const sql = `INSERT INTO colors (product_id,color) VALUES ?`;
      db.query(sql, [values], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };

  const saveTableVolumes = async (product_id, data) => {
    return new Promise((resolve, reject) => {
      if (data.length === 0) {
        return resolve("No volumes to insert");
      }
      const values = data.map((item) => [product_id, item.size, item.price]);
      const sql = `INSERT INTO volumes (product_id, size, price) VALUES ?`;
      db.query(sql, [values], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  };
};

module.exports = createProducts;
