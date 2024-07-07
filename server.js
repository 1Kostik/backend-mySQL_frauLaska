const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "MySQL-8.2",
  user: "root",
  password: "",
  database: "frauLaska",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

app.get("/", (req, res) => {
  const sql = `SHOW TABLES`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});
app.get("/products", (req, res) => {
  const sql = `SELECT * FROM products`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});
app.get("/categories", (req, res) => {
  const sql = `SELECT * FROM categories`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});
app.get("/images", (req, res) => {
  const sql = `SELECT * FROM imageUrls`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});
app.get("/volumes", (req, res) => {
  const sql = `SELECT * FROM volumes`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});
app.get("/colors", (req, res) => {
  const sql = `SELECT * FROM colors`;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});
// app.get("/product", (req, res) => {
//   const sql = `
//         SELECT
//             p.id,
//             p.categoryId,
//             p.title,
//             p.description,
//             p.discount,
//             p.stockCount,
//             p.ranking,
//             p.benefit,
//             p.popularity,
//             p.productCode,
//             p.composition,
//             GROUP_CONCAT(DISTINCT i.imageUrl) AS imageUrls,
//             GROUP_CONCAT(DISTINCT c.color) AS colors,
//             GROUP_CONCAT(DISTINCT CONCAT(v.size, ':', v.price)) AS volumes
//         FROM
//             products p
//         LEFT JOIN
//             images i ON p.id = i.productId
//         LEFT JOIN
//             colors c ON p.id = c.productId
//         LEFT JOIN
//             volumes v ON p.id = v.productId
//         GROUP BY
//             p.id
//     `;
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);

//     const processedData = data.map((product) => ({
//       ...product,
//       imageUrls: product.imageUrls ? product.imageUrls.split(",") : [],
//       colors: product.colors ? product.colors.split(",") : [],
//       volumes: product.volumes
//         ? product.volumes.split(",").map((vol) => {
//             const [size, price] = vol.split(":");
//             return { size, price: parseFloat(price) };
//           })
//         : [],
//     }));

//     return res.json(processedData);
//   });
// });
app.post("/category", (req, res) => {
  const { title } = req.body;
  const sql = `INSERT INTO categories (title) VALUES(?)`;

  db.query(sql, [title], (err, data) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json(err);
    }
    return res.status(201).json({ id: data.insertId, title });
  });
});

app.post("/product", (req, res) => {
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
  } = req.body;
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
    (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json(err);
      }
      return res.status(201).json({
        id: data.insertId,
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
      });
    }
  );
});

app.post("/colors", (req, res) => {
  const sql = `       
  INSERT INTO colors (product_id,color)
  VALUES(1,"white")
    `;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/images", (req, res) => {
  const sql = `       
  INSERT INTO imageUrls (product_id,img_url)
  VALUES(1,"https://hbdeadsea.com.ua/image/catalog/blog/078921698ab7212e1e476289afga--materialy-dlya-tvorchestva-kosmeticheskie-osnovy-pr-vo-angliy.jpg")
    `;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.post("/volumes", (req, res) => {
  const sql = `       
  INSERT INTO volumes (size,price,product_id)
  VALUES(50,400,1)
    `;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});
/*===================================== 1 request ========================================================= */

app.post("/addProductData", async (req, res) => {
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
});

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

app.put("/updateProductData", async (req, res) => {
  const {
    id,
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
    id,
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
    if (
      title ||
      description ||
      discount ||
      stockCount ||
      ranking ||
      benefit ||
      popularity ||
      productCode ||
      composition
    ) {
      await updateTableProduct(productData);
    }

    if (imageUrls && imageUrls.length !== 0) {
      await updateTableImages(id, imageUrls);
    }

    if (volumes && volumes.length !== 0) {
      await updateTableVolumes(id, volumes);
    }

    if (colors && colors.length !== 0) {
      await updateTableColors(id, colors);
    }

    res.status(200).send("Дані успішно оновлено у відповідних таблицях");
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Помилка при оновленні даних");
  }
});

const updateTableProduct = async (data) => {
  return new Promise((resolve, reject) => {
    let query = "UPDATE products SET ";
    const fields = [];
    const values = [];
    for (const key in data) {
      if (key !== "id" && data[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    }
    if (fields.length === 0) {
      return reject("No fields to update");
    }
    query += fields.join(", ") + " WHERE id = ?";
    values.push(data.id);

    db.query(query, values, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
const updateTableImages = async (product_id, images) => {
  return new Promise((resolve, reject) => {
    if (
      !product_id ||
      !images ||
      !Array.isArray(images) ||
      images.length === 0
    ) {
      return reject("Invalid input");
    }

    const query =
      "UPDATE imageUrls SET product_id = ?, img_url = ? WHERE id = ?";
    const promises = images.map((image) => {
      return new Promise((res, rej) => {
        if (!image.id || !image.img_url) {
          return rej("Missing required fields");
        }
        db.query(
          query,
          [product_id, image.img_url, image.id],
          (err, result) => {
            if (err) return rej(err);
            res(result);
          }
        );
      });
    });

    Promise.all(promises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};
const updateTableVolumes = async (product_id, volumes) => {
  return new Promise((resolve, reject) => {
    if (
      !product_id ||
      !volumes ||
      !Array.isArray(volumes) ||
      volumes.length === 0
    ) {
      return reject("Invalid input");
    }
    const query =
      "UPDATE volumes SET product_id = ?,size = ?, price = ? WHERE id = ?";
    const promises = volumes.map((item) => {
      return new Promise((res, rej) => {
        if (!item.id || !item.size || !item.price) {
          return rej("Missing required fields");
        }
        db.query(
          query,
          [product_id, item.size, item.price, item.id],
          (err, result) => {
            if (err) return rej(err);
            res(result);
          }
        );
      });
    });

    Promise.all(promises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};
const updateTableColors = async (product_id, colors) => {
  return new Promise((resolve, reject) => {
    if (
      !product_id ||
      !colors ||
      !Array.isArray(colors) ||
      colors.length === 0
    ) {
      return reject("Invalid input");
    }
    const query = "UPDATE colors SET product_id = ?, color = ?  WHERE id = ?";
    const promises = colors.map((item) => {
      return new Promise((res, rej) => {
        if (!item.id || !item.color) {
          return rej("Missing required fields");
        }
        db.query(query, [product_id, item.color, item.id], (err, result) => {
          if (err) return reject(err);
          res(result);
        });
      });
    });
    Promise.all(promises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};
app.delete("/deleteProductData", async (req, res) => {
  const { id, product, category_id, volumes, colors, imageUrls } = req.body;

  try {
    if (volumes && volumes.length !== 0) {
      await deleteVolumes(id, volumes);
    }
    if (colors && colors.length !== 0) {
      await deleteColors(id, colors);
    }
    if (imageUrls && imageUrls.length !== 0) {
      await deleteImageUrls(id, imageUrls);
    }
    if (product !== "") {
      await deleteProduct(id, category_id);
    }
    res.status(200).send("Deletion successful");
  } catch (error) {
    console.error("Error in /deleteProductData:", error);
    res.status(500).send("Error deleting product data");
  }
});

const deleteProduct = async (id, category_id) => {
  const query = "DELETE FROM products   WHERE id = ? AND category_id = ?";
  return new Promise((res, rej) => {
    db.query(query, [id, category_id], (err, result) => {
      if (err) {
        console.error("Error deleting product:", err);
        return rej(err);
      }
      res(result);
    });
  });
};
const deleteVolumes = async (product_id, data) => {
  return new Promise((resolve, reject) => {
    if (!product_id || !data || !Array.isArray(data) || data.length === 0) {
      return reject("Invalid input");
    }

    const query = "DELETE FROM volumes WHERE product_id = ? AND id = ?";
    const promises = data.map((item) => {
      return new Promise((res, rej) => {
        if (!item.id) {
          return rej("Missing required fields");
        }
        db.query(query, [product_id, item.id], (err, result) => {
          if (err) return rej(err);
          res(result);
        });
      });
    });

    Promise.all(promises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });
};
const deleteColors = async (product_id, data) => {
  return new Promise((resolve, reject) => {
    if (!product_id || !data || !Array.isArray(data) || data.length === 0) {
      return reject("Invalid input");
    }

    const query = "DELETE FROM colors WHERE product_id = ? AND id = ?";
    const promises = data.map((item) => {
      return new Promise((res, rej) => {
        if (!item.id) {
          return rej("Missing required fields");
        }
        db.query(query, [product_id, item.id], (err, result) => {
          if (err) return rej(err);
          res(result);
        });
      });
    });

    Promise.all(promises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });


};
const deleteImageUrls = async (product_id, data) => {
  return new Promise((resolve, reject) => {
    if (!product_id || !data || !Array.isArray(data) || data.length === 0) {
      return reject("Invalid input");
    }

    const query = "DELETE FROM imageUrls WHERE product_id = ? AND id = ?";
    const promises = data.map((item) => {
      return new Promise((res, rej) => {
        if (!item.id) {
          return rej("Missing required fields");
        }
        db.query(query, [product_id, item.id], (err, result) => {
          if (err) return rej(err);
          res(result);
        });
      });
    });

    Promise.all(promises)
      .then((results) => resolve(results))
      .catch((error) => reject(error));
  });

};

app.listen(8081, () => {
  console.log("Listening");
});

/* 
app.post("/category", (req, res) => {
  const sql = `       
  INSERT INTO categories (title)
  VALUES("Догляд за обличчям")
    `;
  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    // const processedData = data.map((product) => ({
    //   ...product,
    //   imageUrls: product.imageUrls ? product.imageUrls.split(",") : [],
    //   colors: product.colors ? product.colors.split(",") : [],
    //   volumes: product.volumes
    //     ? product.volumes.split(",").map((vol) => {
    //         const [size, price] = vol.split(":");
    //         return { size, price: parseFloat(price) };
    //       })
    //     : [],
    // }));

    return res.json(data);
  });
}); */
