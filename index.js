const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error connecting to mongodb", error);
  });

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});

app.get("/health", (req, res) => {
  res.status(200).json("server is up and running");
});

const bookRoutes = require("./routes/BooksData");

const customerRoutes = require("./routes/Customer");

app.use("/api", bookRoutes);

app.use("/api", customerRoutes);
