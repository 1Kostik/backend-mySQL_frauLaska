require("dotenv").config();
const path = require("path");

const express = require("express");
const cors = require("cors");
const app = express();

const productsRouter = require("./routes/api/products");
const categoriesRouter = require("./routes/api/categories");

app.use(cors());
app.use(express.json());

app.use("/api", productsRouter);
app.use("/api", categoriesRouter);

module.exports = app;

// const db = mysql.createConnection({
//   host: "MySQL-8.2",
//   user: "root",
//   password: "",
//   database: "frauLaska",
// });
// db.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }
//   console.log("Connected to the database.");
// });

// app.get("/", (req, res) => {
//   return res.json("From Backend Side");
// });

// app.get("/product", (req, res) => {
//   const sql = `
//          SELECT
//              p.id,
//              p.categoryId,
//              p.title,
//              p.description,
//              p.discount,
//              p.stockCount,
//              p.ranking,
//              p.benefit,
//              p.popularity,
//              p.productCode,
//              p.composition,
//              GROUP_CONCAT(DISTINCT i.imageUrl) AS imageUrls,
//              GROUP_CONCAT(DISTINCT c.color) AS colors,
//              GROUP_CONCAT(DISTINCT CONCAT(v.size, ':', v.price)) AS volumes
//          FROM
//              products p
//          LEFT JOIN
//              images i ON p.id = i.productId
//          LEFT JOIN
//              colors c ON p.id = c.productId
//          LEFT JOIN
//              volumes v ON p.id = v.productId
//          GROUP BY
//              p.id
//      `;
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
// app.use((req, res) => {
//   res.status(404).json({ message: "Not found page!" });
// });
// app.use((err, req, res, mext) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });
