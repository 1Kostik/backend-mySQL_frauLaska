const { userFindAndUpdateToken } = require("./login");

const logout = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is missing' });
    }

    const { id } = req.user;
    await userFindAndUpdateToken(id, null);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

module.exports = logout;
