require("dotenv").config();
const axios = require("axios");

const api_key = process.env.WEATHER_API_KEY;
const weatherData = async (req, res) => {
  if (req.body) {
    const { city } = req.body;
    if (city) {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`
        );
        res.json(response.data);
      } catch (error) {
        res.json("no city found");
      }
    }
  }
};

module.exports = {
  weatherData,
};
