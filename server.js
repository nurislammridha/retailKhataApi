const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
//Connect Database//git
connectDB();
//Initial middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("API Running1"));
//Define Routes
//cors policy
app.use(cors());
app.options("*", cors());
app.use("/api/v1/daily-buy", require("./routes/api/dailyBuy"));
app.use("/api/v1/daily-sell", require("./routes/api/dailySell"));
app.use("/api/v1/buyer-info", require("./routes/api/buyerInfo"));
app.use("/api/v1/dealer-info", require("./routes/api/dealerInfo"));
app.use("/api/v1/product-info", require("./routes/api/productInfo"));
app.use("/api/v1/unit-info", require("./routes/api/unitInfo"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servet started on port ${PORT}`));
