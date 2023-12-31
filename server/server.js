const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const weatherDataroute = require("./routes/weatherDataRoute");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", weatherDataroute);

app.listen(PORT, () => {
  console.log("App listening on port 3000!");
});
