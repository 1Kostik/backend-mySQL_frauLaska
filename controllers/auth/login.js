const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../../db");
const { SECRET_KEY } = process.env;
const { HttpError } = require("../../utils");

const userFindById = async (id) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

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

const userFindAndUpdateToken = async (id, token) => {
  try {
    await pool.execute("UPDATE users SET token = ? WHERE id = ?", [token, id]);
  } catch (error) {
    console.error("Error updating user token:", error);
    throw new HttpError(500, "Internal Server Error");
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userFind({ email });

    if (!user) {
      return next(HttpError(401, "Email or password invalid!"));
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return next(HttpError(401, "Email or password invalid!"));
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "3h" });

    await userFindAndUpdateToken(user.id, token);

    res.json({
      token,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, userFindAndUpdateToken, userFind, userFindById };
