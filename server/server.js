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

app.get("/test-webhook", (req, res) => {
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === "1234567890") {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

app.post("/test-webhook", (req, res) => {
  if (req.body) {
    console.log("Responses", req.body);
    res.json({ message: "Webhook received" }).status(200);
  }
});

app.listen(PORT, () => {
  console.log("App listening on port 3000!");
});
