const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const { database, connectDatabase } = require("./database");

//tabelat
const models = require("./models");
const { User, Video, Annotation, Bookmark } = models;

//routes
const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

database.sync();
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
  connectDatabase();
});
