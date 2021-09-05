const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.use("/api", require("./routes/posts"));

app.listen(3000, () => {
  console.log(`El servidor esta funcionando en el puerto 3000`);
});

module.exports = app;