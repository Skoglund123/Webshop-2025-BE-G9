const express = require('express');
const cors = require('cors');
require('dotenv').config();
const productRoutes = require('./src/routes/productsRoutes');
const authRoutes = require('./src/routes/authRoutes');
const connectDb = require('./src/config/dbConnection');
const apiDocs = require('./src/routes/apiDocs');


connectDb();



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors('*'));
app.use(express.json());

// API Documentation route
app.use('/api', apiDocs); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
});
