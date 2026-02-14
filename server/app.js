const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
