const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productsRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDb = require('./config/dbConnection');
const apiDocs = require('./routes/apiDocs');

dotenv.config();
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
