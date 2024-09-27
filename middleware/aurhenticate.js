const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils");
const { userFindById } = require("../controllers");
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await userFindById(id);
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, "Invalid token or user"));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(HttpError(401, "Token verification failed"));
  }
};

module.exports = authenticate;
