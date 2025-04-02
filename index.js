const express = require("express");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./src/routes/productsRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const userRoutes = require("./src/routes/userRoutes");
const connectDb = require("./src/config/dbConnection");
const apiDocs = require("./src/routes/apiDocs");

connectDb();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors("*"));
app.use(express.json());

// API Documentation route
app.use("/api", apiDocs);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
