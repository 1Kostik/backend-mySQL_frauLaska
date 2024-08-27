const axios = require("axios");

const npApiKey = process.env.NEW_POST_API_KEY;

const searchSettlements = async (req, res) => {
  const { cityName } = req.body;

  try {
    const response = await axios.post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: npApiKey,
      modelName: "Address",
      calledMethod: "searchSettlements",
      methodProperties: {
        CityName: cityName,
        Limit: "10000",
      },
    });
    res.json(response.data.data[0].Addresses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching settlements" });
  }
};

module.exports = searchSettlements;
