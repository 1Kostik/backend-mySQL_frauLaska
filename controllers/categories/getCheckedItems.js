const pool = require("../../db");

const getCheckedItems = async (req, res, next) => {
  const idsArr = req.body.idsArr;
  console.log(idsArr);
  try {
    const [rows] = await pool.execute(
      `
      SELECT category_id AS id, id AS productsId
      FROM products
      WHERE id IN (${idsArr.join(",")})  -- Явно преобразуем массив в строку
      `
    );

    const checkedItems = rows.reduce((acc, { id, productsId }) => {
      const category = acc.find((item) => item.id === id);
      if (category) {
        category.productsId.push(productsId);
      } else {
        acc.push({ id, productsId: [productsId] });
      }
      return acc;
    }, []);

    res.status(200).json(checkedItems);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCheckedItems;
