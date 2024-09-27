const { HttpError } = require("../../utils");
const { userFindAndUpdateToken } = require("./login");

const logout = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return next(HttpError(400));
    }
    const { id } = req.user;

    const token = null;
    await userFindAndUpdateToken(id, token);
    res.status(204).json();
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

module.exports = logout;
