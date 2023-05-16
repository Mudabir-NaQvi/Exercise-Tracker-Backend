const mongoose = require("mongoose");
require("dotenv").config();

const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to the db successfully"))
    .catch((error) => console.log(error));
};

connection();
