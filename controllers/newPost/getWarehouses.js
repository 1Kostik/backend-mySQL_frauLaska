const axios = require("axios");

const npApiKey = process.env.NEW_POST_API_KEY;

const getWarehouses = async (req, res) => {
  const { cityRef } = req.body;
  console.log("cityRef", cityRef);
  try {
    const response = await axios.post("https://api.novaposhta.ua/v2.0/json/", {
      apiKey: npApiKey,
      modelName: "AddressGeneral",
      calledMethod: "getWarehouses",
      methodProperties: {
        CityRef: cityRef,
      },
    });
    console.log("response", response);
    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching warehouses" });
  }
};

module.exports = getWarehouses;
