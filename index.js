const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

const PORT = 3001;

app.use("/api", require("./routes/posts"));

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
