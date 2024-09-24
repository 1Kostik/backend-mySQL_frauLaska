const { userFind } = require("./login");
const bcrypt = require("bcrypt");
const db = require("../../db");
const { HttpError } = require("../../utils");

const createNewUser = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.query(sql, [name, email, password], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await userFind({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await createNewUser(name, email, hashPassword);
    res.status(201).json({ status: "success" });
  } catch (error) {
    console.log("Error :>> ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = register;
