const bcrypt = require("bcryptjs");
const pool = require("../../db");
const { HttpError } = require("../../utils");

const userFind = async ({ email }) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

const createNewUser = async (name, email, password) => {
  try {
    await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
  } catch (error) {
    console.error("Error creating new user:", error);
    throw new HttpError(500, "Internal Server Error");
  }
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
