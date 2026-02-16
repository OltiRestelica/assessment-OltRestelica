const express = require("express");
const app = express();
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const { database, connectDatabase } = require("./database");

//tabelat
const models = require("./models");
const { User, Video, Annotation, Bookmark } = models;

//routes
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");

app.use("/user", userRoutes);
app.use("/video", videoRoutes);

database.sync();
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
  connectDatabase();
});
