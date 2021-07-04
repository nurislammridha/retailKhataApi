const express = require("express");
const connectDB = require("./config/db");
const app = express();
//Connect Database
connectDB();
//Initial middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API Running"));
//Define Routes
app.use("/api/v1/admin", require("./routes/api/admin"));
app.use("/api/v1/category", require("./routes/api/category"));
app.use("/api/v1/writter", require("./routes/api/writter"));
app.use("/api/v1/news", require("./routes/api/news"));
app.use("/api/v1/test", require("./routes/api/test"));
app.use("/api/v1/newsImg", require("./routes/api/newsImg"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servet started on port ${PORT}`));
