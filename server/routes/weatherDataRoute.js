const express = require("express");
const router = express.Router();
const weatherDataController = require("../controller/weatherDataController");

router.post("/weatherdata", weatherDataController.weatherData);

module.exports = router;
