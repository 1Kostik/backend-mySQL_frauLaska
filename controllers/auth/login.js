const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../db");
const { SECRET_KEY } = process.env;

const userFind = async ({ email }) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], (err, data) => {
      if (err) return reject(err);
      resolve(data[0]);
    });
  });
};
const userFindAndUpdateToken = async (id, token) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE users SET token = ? WHERE id = ?`;
    db.query(sql, [token, id], (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userFind({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid!");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
 
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid!");
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1min" });
  await userFindAndUpdateToken(user.id, token);

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
    } else {
      console.log('Decoded token:', decoded);
    }
  });
  res.json({
    status: "success",
    code: 200,
    token,
    user: {
      name: user.name,
    },
  });
};
module.exports = {login,userFindAndUpdateToken};

// const updatePassword = async (id,password)=>{
//     return new Promise((resolve, reject) => {
//         const sql = `UPDATE users SET password = ? WHERE id = ?`;
//         db.query(sql, [password,id], (err, data) => {
//           if (err) return reject(err);
//           resolve(data);
//         });
//       });
// }

// const hashPassword = await bcrypt.hash(password, 10);
// const newPassword = await updatePassword(id, hashPassword);
